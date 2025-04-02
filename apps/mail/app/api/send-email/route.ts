import { type NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { subject, content, recipients, senderName } = await request.json();

    if (!subject || !content || !recipients || !recipients.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const messages = recipients.map((recipient: any) => ({
      to: recipient,
      from: {
        email: "buycrypto@coincart.us",
        name: senderName || "Coincart",
      },
      subject: subject,
      html: content,
    }));

    const batchSize = 100;
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      await sgMail.send(batch);
    }

    return NextResponse.json({
      success: true,
      count: recipients.length,
      message: `Successfully sent ${recipients.length} emails`,
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
