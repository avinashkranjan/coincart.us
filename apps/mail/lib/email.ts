export function getTemplateName(templateId: string): string {
  const templates: Record<string, string> = {
    crypto_email: "Norton LifeLock Invoice Email",
  };
  return templates[templateId] || "Template";
}

export function getTemplateSubject(templateId: string): string {
  const subjects: Record<string, string> = {
    crypto_email: "Norton LifeLock Invoice",
  };
  return subjects[templateId] || "Email Subject";
}

export function getTemplateContent(templateId: string): string {
  const contents: Record<string, string> = {
    crypto_email: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Norton LifeLock Invoice</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background: white; border-collapse: collapse;">
                <tr>
                    <td style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td>
                                    <table role="presentation" style="border-collapse: collapse;">
                                        <tr>
                                            <td style="vertical-align: middle;">
                                                <img src="https://cdn-icons-png.flaticon.com/512/2489/2489237.png" alt="Shield" style="width: 32px; height: 32px;">
                                            </td>
                                            <td style="padding-left: 8px; vertical-align: middle;">
                                                <span style="font-size: 20px; font-weight: bold;">NortonLifeLock</span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="text-align: right;">
                                    <span style="color: #4b5563; margin-right: 24px;">My Bill</span>
                                    <span style="color: #4b5563;">+1 (888) 343-6571</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td style="padding: 24px;">
                        <h2 style="color: #374151; font-weight: 500; margin: 0;">Dear Valued Customer,</h2>
                        <p style="color: #4b5563; margin-top: 8px;">
                            We appreciate having you as a part of the Norton LifeLock™ family. Your security and digital protection remain our top priority.
                        </p>

                        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 24px 0;">
                            <h3 style="font-size: 18px; margin: 0;">We have Charged Your Account: $499.99</h3>
                            <p style="color: #4b5563; margin: 8px 0;">
                                Stay protected with <strong>real-time security, identity theft protection, and AI-driven cyber safety measures.</strong>
                            </p>
                            <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 8px 24px; text-decoration: none; border-radius: 4px; margin-top: 16px;">Manage Your Protection</a>
                        </div>

                        <table role="presentation" style="width: 100%; margin: 24px 0; border-collapse: collapse;">
                            <tr>
                                <td style="width: 50%;">
                                    <table role="presentation" style="border-collapse: collapse;">
                                        <tr>
                                            <td style="vertical-align: middle;">
                                                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Users" style="width: 24px; height: 24px;">
                                            </td>
                                            <td style="padding-left: 8px; vertical-align: middle; color: #4b5563; font-size: 14px;">
                                                Trusted by 90M+ Users
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width: 50%; text-align: right;">
                                    <table role="presentation" style="border-collapse: collapse; margin-left: auto;">
                                        <tr>
                                            <td style="vertical-align: middle;">
                                                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828743.png" alt="Fingerprint" style="width: 24px; height: 24px;">
                                            </td>
                                            <td style="padding-left: 8px; vertical-align: middle; color: #4b5563; font-size: 14px;">
                                                Biometric Security
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; margin: 24px 0;">
                            <thead>
                                <tr style="background-color: #f9fafb;">
                                    <th style="text-align: left; padding: 12px 16px; color: #4b5563;">Product</th>
                                    <th style="text-align: left; padding: 12px 16px; color: #4b5563;">Operating System</th>
                                    <th style="text-align: center; padding: 12px 16px; color: #4b5563;">Qty</th>
                                    <th style="text-align: right; padding: 12px 16px; color: #4b5563;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 16px;">
                                        <table role="presentation" style="border-collapse: collapse;">
                                            <tr>
                                                <td style="vertical-align: middle;">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/2489/2489237.png" alt="Shield" style="width: 20px; height: 20px;">
                                                </td>
                                                <td style="padding-left: 8px; vertical-align: middle;">
                                                    <div style="font-weight: 500;">Norton™ Security</div>
                                                    <div style="font-size: 14px; color: #6b7280;">2-months subscription for 5 devices</div>
                                                    <div style="font-size: 14px; color: #6b7280;">Product Key: RHDS567376</div>
                                                    <div style="font-size: 14px; color: #6b7280;">Serial Number: #789456</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="padding: 16px; font-size: 14px; color: #4b5563;">
                                        <div>Windows® 11 / 10 / 8.1 / 8 / 7 / Vista® / XP</div>
                                        <div>Mac OS® (current and previous two versions)</div>
                                        <div>Android™ 2.3 or later / iOS® 6 or later</div>
                                    </td>
                                    <td style="padding: 16px; text-align: center;">1</td>
                                    <td style="padding: 16px; text-align: right; font-weight: 500;">$499.99</td>
                                </tr>
                            </tbody>
                        </table>

                        <div style="margin: 24px 0;">
                            <h3 style="font-size: 18px; margin: 0;">Billing Summary</h3>
                            <table role="presentation" style="width: 100%; margin-top: 8px; border-collapse: collapse;">
                                <tr>
                                    <td style="color: #4b5563;">Billing Date: 16th March 2025</td>
                                    <td style="text-align: right;">
                                        <span style="font-size: 18px; font-weight: 500;">Total Amount: <span style="color: #dc2626;">$499.99</span></span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <p style="color: #4b5563;">
                            Thank you for your purchase. Your Norton™ Security subscription is now active and will automatically renew unless canceled. 
                            <span style="color: #dc2626;">For immediate cancellation or an instant refund</span>, please contact our support team.
                        </p>

                        <div style="text-align: center; margin: 24px 0;">
                            <a href="tel:+18883436571" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 32px; text-decoration: none; border-radius: 4px; font-size: 18px;">
                                +1 (888) 343-6571
                            </a>
                        </div>

                        <table role="presentation" style="width: 100%; margin: 24px 0; padding: 24px 0; border-top: 1px solid #e5e7eb; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: center; width: 33%;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2489/2489237.png" alt="Shield" style="width: 24px; height: 24px;">
                                    <div style="font-size: 14px; color: #4b5563; margin-top: 8px;">Trusted by Symantec</div>
                                </td>
                                <td style="text-align: center; width: 33%;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/483/483408.png" alt="Lock" style="width: 24px; height: 24px;">
                                    <div style="font-size: 14px; color: #4b5563; margin-top: 8px;">Secure Transaction</div>
                                </td>
                                <td style="text-align: center; width: 33%;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="Check" style="width: 24px; height: 24px;">
                                    <div style="font-size: 14px; color: #4b5563; margin-top: 8px;">100% Protection Guarantee</div>
                                </td>
                            </tr>
                        </table>

                        <div style="text-align: center; font-size: 14px; color: #6b7280;">
                            <p style="margin: 8px 0;">© 2025 NortonLifeLock Inc. All rights reserved. NortonLifeLock, the NortonLifeLock Logo, and Norton are trademarks of NortonLifeLock Inc.</p>
                            <p style="margin: 8px 0;">This is an automated email—please do not reply.</p>
                        </div>
                    </td>
                </tr>
            </table>
        </body>
        </html>
      `,
  };
  return contents[templateId] || "<p>Email content goes here.</p>";
}
