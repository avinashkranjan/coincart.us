import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { subject, content, batch, batchIndex, totalBatches, senderName } =
      await request.json();

    if (!subject || !content || !batch || batch.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const limitCheckResponse = await fetch(
      new URL("/api/email-limits", request.url),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: batch.length }),
      }
    );

    const limitData = await limitCheckResponse.json();

    if (!limitCheckResponse.ok) {
      if (limitData.allowed > 0) {
        const partialBatch = batch.slice(0, limitData.allowed);
        return await processBatch(
          partialBatch,
          subject,
          content,
          senderName,
          batchIndex,
          totalBatches,
          true
        );
      }

      return NextResponse.json(
        {
          error: "Daily sending limit exceeded",
          details: limitData,
          dailyLimitExceeded: true,
        },
        { status: 429 }
      );
    }

    return await processBatch(
      batch,
      subject,
      content,
      senderName,
      batchIndex,
      totalBatches,
      false
    );
  } catch (error: any) {
    console.error("Error sending email batch:", error);

    return NextResponse.json(
      {
        error: "Failed to send email batch",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function processBatch(
  batch: string[],
  subject: string,
  content: string,
  senderName: string,
  batchIndex: number,
  totalBatches: number,
  isPartialBatch: boolean
) {
  const messages = batch.map((recipient) => ({
    to: recipient,
    from: {
      email: "buycrypto@coincart.us",
      name: senderName || "Coincart",
    },
    subject: subject,
    html: content,
  }));

  const results = {
    successful: [] as string[],
    failed: [] as { email: string; reason: string }[],
  };

  const sgBatchSize = 100;

  for (let i = 0; i < messages.length; i += sgBatchSize) {
    const sgBatch = messages.slice(i, i + sgBatchSize);
    try {
      await sgMail.send(sgBatch);

      sgBatch.forEach((msg) => {
        results.successful.push(
          typeof msg.to === "string" ? msg.to : msg.to[0]
        );
      });
    } catch (error: any) {
      if (error.response && error.response.body && error.response.body.errors) {
        const sgErrors = error.response.body.errors;

        sgBatch.forEach((msg, idx) => {
          const email = typeof msg.to === "string" ? msg.to : msg.to[0];
          const errorMsg = sgErrors[idx]?.message || "Unknown error";
          results.failed.push({ email, reason: errorMsg });
        });
      } else {
        sgBatch.forEach((msg) => {
          const email = typeof msg.to === "string" ? msg.to : msg.to[0];
          results.failed.push({
            email,
            reason: error.message || "Failed to send",
          });
        });
      }
    }
  }

  return NextResponse.json({
    success: true,
    batchIndex,
    totalBatches,
    results: results,
    totalProcessed: results.successful.length + results.failed.length,
    totalSuccessful: results.successful.length,
    totalFailed: results.failed.length,
    isPartialBatch: isPartialBatch,
  });
}
