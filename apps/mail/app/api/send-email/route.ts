import { type NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { subject, content, recipients, senderName, batchId } =
      await request.json();

    if (!subject || !content || !recipients || !recipients.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailsToProcess = recipients;

    const batchSize = 100;

    const messages = emailsToProcess.map((recipient: any) => ({
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

    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      try {
        await sgMail.send(batch);
        batch.forEach((msg: { to: string | string[] }) => {
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

          batch.forEach((msg: { to: any[] }, idx: string | number) => {
            const email = typeof msg.to === "string" ? msg.to : msg.to[0];
            const errorMsg = sgErrors[idx]?.message || "Unknown error";
            results.failed.push({ email, reason: errorMsg });
          });
        } else {
          batch.forEach((msg: { to: any[] }) => {
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
      results: results,
      totalProcessed: results.successful.length + results.failed.length,
      totalSuccessful: results.successful.length,
      totalFailed: results.failed.length,
    });
  } catch (error: any) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
