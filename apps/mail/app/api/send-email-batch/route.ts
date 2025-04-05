import { type NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);

export async function POST(request: NextRequest) {
  try {
    const { personalizedBatch, batchIndex, totalBatches, senderName } =
      await request.json();

    if (!personalizedBatch || personalizedBatch.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const messages = personalizedBatch.map(
      (item: { email: any; subject: any; content: any }) => ({
        to: item.email,
        from: {
          email: "buycrypto@coincart.us",
          name: senderName || "Coincart",
        },
        subject: item.subject,
        html: item.content,
      })
    );

    const results = {
      successful: [] as string[],
      failed: [] as { email: string; reason: string }[],
    };

    const sgBatchSize = 100;

    for (let i = 0; i < messages.length; i += sgBatchSize) {
      const sgBatch = messages.slice(i, i + sgBatchSize);
      try {
        await sgMail.send(sgBatch);

        sgBatch.forEach((msg: { to: string | string[] }) => {
          results.successful.push(
            typeof msg.to === "string" ? msg.to : msg.to[0]
          );
        });
      } catch (error: any) {
        if (
          error.response &&
          error.response.body &&
          error.response.body.errors
        ) {
          const sgErrors = error.response.body.errors;

          sgBatch.forEach((msg: { to: any[] }, idx: string | number) => {
            const email = typeof msg.to === "string" ? msg.to : msg.to[0];
            const errorMsg = sgErrors[idx]?.message || "Unknown error";
            results.failed.push({ email, reason: errorMsg });
          });
        } else {
          sgBatch.forEach((msg: { to: any[] }) => {
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
    });
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
