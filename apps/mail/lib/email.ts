export function getTemplateName(templateId: string): string {
  const templates: Record<string, string> = {
    crypto_email_norton: "Norton LifeLock Invoice Email",
    crypto_email: "Coincart Crypto Transaction Email",
    crypto_email_new: "Coincart Crypto Transaction Email",
  };
  return templates[templateId] || "Template";
}

export function getTemplateSubject(templateId: string): string {
  const subjects: Record<string, string> = {
    crypto_email_norton: "Norton LifeLock Invoice",
    crypto_email: "Coincart Crypto Transaction",
    crypto_email_new: "Coincart Crypto Transaction",
  };
  return subjects[templateId] || "Email Subject";
}

export function getTemplateContent(templateId: string): string {
  const contents: Record<string, string> = {
    crypto_email_norton: `
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
                                    <span style="color: #4b5563;">+1 (800) 697-1570</span>
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
                            <a href="tel:+18006971570" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 32px; text-decoration: none; border-radius: 4px; font-size: 18px;">
                                +1 (800) 697-1570
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
    crypto_email: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="color-scheme" content="light">
            <meta name="supported-color-schemes" content="light">
            <!--[if mso]>
            <noscript>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
            </noscript>
            <![endif]-->
            <title>Transaction Confirmation</title>
            <style>
                /* Reset */
                body, #bodyTable, #bodyCell {
                    height: 100% !important;
                    margin: 0;
                    padding: 0;
                    width: 100% !important;
                }
                table {
                    border-collapse: collapse;
                }
                img, a img {
                    border: 0;
                    outline: none;
                    text-decoration: none;
                }
                h1, h2, h3, h4, h5, h6 {
                    margin: 0;
                    padding: 0;
                }
                p {
                    margin: 1em 0;
                }

                /* Client-specific */
                .ReadMsgBody { width: 100%; }
                .ExternalClass { width: 100%; }
                .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
                    line-height: 100%;
                }
                table, td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
                #outlook a {
                    padding: 0;
                }
                img {
                    -ms-interpolation-mode: bicubic;
                }
                body, table, td, p, a, li, blockquote {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }

                /* Layout */
                .emailBody {
                    background-color: #f5f7fa;
                    width: 100%;
                }
                .emailContainer {
                    background-color: #ffffff;
                    border-radius: 8px;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .headerCell {
                    padding: 20px;
                    text-align: center;
                    background-color: #f5f7fa;
                }
                .contentCell {
                    padding: 30px 20px;
                    text-align: center;
                }
                .successIcon {
                    background-color: #10b981;
                    border-radius: 50%;
                    color: #ffffff;
                    display: inline-block;
                    font-size: 24px;
                    height: 60px;
                    line-height: 60px;
                    margin: 0 auto 20px;
                    text-align: center;
                    width: 60px;
                }
                .detailsTable {
                    width: 100%;
                    margin: 30px 0;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                }
                .detailsTable td {
                    padding: 12px 16px;
                    border-bottom: 1px solid #e5e7eb;
                }
                .detailsLabel {
                    background-color: #f9fafb;
                    color: #6b7280;
                    font-weight: 500;
                    text-align: left;
                    width: 40%;
                }
                .detailsValue {
                    color: #111827;
                    text-align: right;
                }
                .button {
                    background-color: #3b82f6;
                    border-radius: 6px;
                    color: #ffffff;
                    display: inline-block;
                    font-family: sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 50px;
                    text-align: center;
                    text-decoration: none;
                    width: 200px;
                    -webkit-text-size-adjust: none;
                }
                .footerCell {
                    background-color: #f9fafb;
                    border-top: 1px solid #e5e7eb;
                    color: #6b7280;
                    font-size: 14px;
                    padding: 20px;
                    text-align: center;
                }
                .appLink img {
                    height: 40px;
                    margin: 0 5px;
                }

                /* Typography */
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    line-height: 1.6;
                }
                h1 {
                    color: #111827;
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 20px;
                }
                .highlight {
                    color: #111827;
                    font-weight: 600;
                }
                
                /* Mobile */
                @media screen and (max-width: 600px) {
                    .emailContainer {
                        width: 100% !important;
                        border-radius: 0 !important;
                    }
                    .contentCell {
                        padding: 20px 15px !important;
                    }
                    .detailsTable td {
                        display: block;
                        width: 100%;
                        text-align: left;
                    }
                    .detailsValue {
                        text-align: left;
                        padding-top: 0 !important;
                    }
                    .button {
                        width: 100% !important;
                    }
                }
            </style>
        </head>
        <body>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="emailBody">
                <tr>
                    <td align="center" valign="top">
                        <!-- Preheader -->
                        <div style="display: none; max-height: 0px; overflow: hidden;">
                            Your BTC purchase of {{ amount }} BTC ({{ total }} USD) has been initiated and will be available by {{availableDate}}.
                        </div>
                        
                        <!-- Container -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="emailContainer">
                            <!-- Header -->
                            <tr>
                                <td class="headerCell">
                                    <h1 style="font-size:40px;">Coincart</h1>
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td class="contentCell">
                                    <div class="successIcon">✓</div>
                                    
                                    <h1>Your purchase for {{ total }} USD of BTC has started</h1>
                                    <p>Your funds will be available by</p>
                                    <p class="highlight">{{availableDate}}</p>
                                    <p>We're unable to cancel started orders.</p>
                                    <p><a href="https://coincart.com/learn/purchases?utm_source=email&utm_medium=transaction&utm_campaign=purchase_confirmation" style="color: #3b82f6;">Read more about why here</a></p>

                                    <!-- Transaction Details -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="detailsTable">
                                        <tr>
                                            <td class="detailsLabel">Reference code:</td>
                                            <td class="detailsValue">{{referenceCode}}</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Payment method:</td>
                                            <td class="detailsValue">PayPal</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Start date:</td>
                                            <td class="detailsValue">{{startDate}}</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Estimated payout:</td>
                                            <td class="detailsValue">{{availableDate}}</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Amount:</td>
                                            <td class="detailsValue">{{amount}} BTC</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Exchange rate:</td>
                                            <td class="detailsValue">{{ exchangeRate }} USD</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Subtotal:</td>
                                            <td class="detailsValue">{{ subtotal }}</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Fee:</td>
                                            <td class="detailsValue">{{ fee }}</td>
                                        </tr>
                                        <tr>
                                            <td class="detailsLabel">Total:</td>
                                            <td class="detailsValue">{{ total }}</td>
                                        </tr>
                                    </table>

                                    <!-- CTA Button -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto;">
                                        <tr>
                                            <td>
                                                <a href="tel:+18883816810" class="button" style="color:white;">+1 (888) 381-6810</a>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- FAQ Section -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 40px; border-top: 1px solid #e5e7eb;">
                                        <tr>
                                            <td style="padding: 20px 0; text-align: left;">
                                                <h3 style="color: #111827; font-size: 18px; margin-bottom: 16px;">Frequently asked questions</h3>
                                                <p><a href="https://coincart.com/faq/purchase-time?utm_source=email" style="color: #3b82f6; text-decoration: none; display: block; margin-bottom: 10px;">How long does a purchase or deposit take to complete?</a></p>
                                                <p><a href="https://coincart.com/faq/fees?utm_source=email" style="color: #3b82f6; text-decoration: none; display: block; margin-bottom: 10px;">How are fees applied when I buy or sell digital currency?</a></p>
                                                <p><a href="https://coincart.com/faq/cancel?utm_source=email" style="color: #3b82f6; text-decoration: none; display: block; margin-bottom: 10px;">Can I cancel my purchase?</a></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td class="footerCell">
                                    <p>For customer service inquiries, please contact <a href="mailto:support@coincart.com" style="color: #3b82f6;">customer support</a>.</p>
                                    <p>Please include your reference code: {{referenceCode}}</p>
                                    <p>Coincart, Inc. 123 Market St., #2000, San Francisco, CA 94105</p>
                                    <p>© Coincart {{year}}</p>

                                    <!-- App Links -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 20px;">
                                        <tr>
                                            <td style="text-align: center;">
                                                <p style="margin-bottom: 10px;">Get the latest Coincart App for your phone</p>
                                                <a href="https://apps.apple.com/app/coincart?utm_source=email" class="appLink" style="text-decoration: none;">
                                                    <img src="https://cdn.freebiesupply.com/logos/large/2x/download-on-the-app-store-apple-logo-png-transparent.png" alt="App Store" width="120" style="margin: 0 5px;">
                                                </a>
                                                <a href="https://play.google.com/store/apps/details?id=com.coincart&utm_source=email" class="appLink" style="text-decoration: none;">
                                                    <img src="https://freelogopng.com/images/all_img/1664287128google-play-store-logo-png.png" alt="Play Store" width="120" style="margin: 0 5px;">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Verification -->
                                    <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                                        This email was sent to {{email}}. If you did not create this account, please contact us immediately.
                                    </p>

                                    <!-- Unsubscribe -->
                                    <div style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                                        <p>You're receiving this email because you made a transaction on Coincart.</p>
                                        <p>To update your email preferences or unsubscribe from marketing emails, <a href="https://coincart.com/email-preferences?email={{encodedEmail}}&token={{unsubscribeToken}}&utm_source=email" style="color: #9ca3af; text-decoration: underline;">click here</a>.</p>
                                        <p>Please note that you cannot unsubscribe from transaction and security emails.</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!-- Email tracking pixel -->
            <img src="https://coincart.com/email-track/{{messageId}}.png" alt="" width="1" height="1" border="0" style="height:1px!important;width:1px!important;border-width:0!important;margin:0!important;padding:0!important;">
        </body>
        </html>
      `,
    crypto_email_new: `
        <!doctype html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Payment Confirmation - CoinCart</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
            }
            .header {
                background-color: #198754;
                color: white;
                text-align: center;
                padding: 20px 0;
            }
            .content {
                padding: 20px;
                color: #333;
            }
            .button {
                display: inline-block;
                background-color: #198754;
                color: white;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #999;
                padding: 20px;
            }
            a {
                color: #198754;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="header">
                <h2>Payment Received - $10.00</h2>
            </div>
            <div class="content">
                <p>
                We’ve successfully received your payment of
                <strong>$10.00 USD</strong> to your CoinCart account.
                </p>

                <h3>Transaction Details:</h3>
                <ul>
                <li><strong>Amount:</strong> $10.00 USD</li>
                <li><strong>Date:</strong> {{startDate}}</li>
                <li><strong>Transaction ID:</strong> {{referenceCode}}</li>
                <li><strong>Payment Method:</strong> PayPal</li>
                </ul>

                <p>
                You can view this transaction and your account balance at any time by
                logging into your dashboard:
                </p>
                <p style="text-align: center">
                <a href="https://coincart.us/dashboard" class="button"
                    >View Dashboard</a
                >
                </p>

                <h4>Need Help?</h4>
                <p>
                If you have any questions or believe this transaction was made in
                error, please contact our support team within 24 hours.
                </p>
                <p><a href="https://coincart.us/support">Contact Support</a></p>

                <hr />
                <h4>Important Disclosures:</h4>
                <p>
                This is a transactional email and not promotional in nature. The
                $10.00 received has been credited to your CoinCart wallet for future
                use. CoinCart is not a financial institution. Your funds are stored in
                your account for use within our ecosystem only, subject to our
                <a href="https://coincart.us/terms">Terms of Service</a> and
                <a href="https://coincart.us/privacy-policy">Privacy Policy</a>.
                </p>
            </div>
            <div class="footer">
                <p>
                &copy; 2025 CoinCart, Inc. | 123 Crypto Lane, Block City, BC 12345
                </p>
                <p>
                You can manage your communication preferences or
                <a href="https://coincart.us/unsubscribe?email=[User Email]"
                    >unsubscribe</a
                >
                here.
                </p>
            </div>
            </div>
        </body>
        </html>
    `,
  };
  return contents[templateId] || "<p>Email content goes here.</p>";
}
