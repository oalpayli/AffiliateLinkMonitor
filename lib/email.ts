import nodemailer from 'nodemailer';

export interface AlertDetails {
    monitorUrl: string;
    scanId: string;
    brokenLinks: Array<{ href: string; statusCode: number }>;
}

export async function sendAlertEmail(to: string, details: AlertDetails) {
    const { monitorUrl, scanId, brokenLinks } = details;
    const hostname = new URL(monitorUrl).hostname;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const reportUrl = `${appUrl}/scans/${scanId}`;

    const subject = `[ALERT] ${brokenLinks.length} Broken Affiliate Link${brokenLinks.length > 1 ? 's' : ''} Found on ${hostname}`;

    // Create HTML body with professional styling
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">⚠️ Affiliate Link Alert</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                                We detected <strong style="color: #dc2626;">${brokenLinks.length} broken link${brokenLinks.length > 1 ? 's' : ''}</strong> on your monitored page:
                            </p>
                            
                            <div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 16px; margin: 20px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #6b7280; font-size: 14px; font-weight: 500;">MONITORED URL</p>
                                <p style="margin: 8px 0 0; color: #111827; font-size: 14px; word-break: break-all;">${monitorUrl}</p>
                            </div>

                            <h2 style="margin: 30px 0 16px; color: #111827; font-size: 18px; font-weight: 600;">Broken Links:</h2>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                ${brokenLinks.map((link, index) => `
                                <tr>
                                    <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                                        <div style="display: flex; align-items: flex-start;">
                                            <span style="display: inline-block; background-color: #fee2e2; color: #dc2626; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-right: 12px;">
                                                ${link.statusCode || '???'}
                                            </span>
                                            <span style="color: #6b7280; font-size: 14px; word-break: break-all; line-height: 1.5;">
                                                ${link.href}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                `).join('')}
                            </table>

                            <div style="margin: 30px 0; text-align: center;">
                                <a href="${reportUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                    View Full Report →
                                </a>
                            </div>

                            <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 16px; margin: 20px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                                    <strong>💡 Action Required:</strong> These broken links may be causing revenue loss. We recommend fixing them as soon as possible to maintain your affiliate income.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-align: center;">
                                Sent by <strong>LinkMonitor</strong> • Scan ID: ${scanId}
                            </p>
                            <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                                <a href="${appUrl}/settings" style="color: #667eea; text-decoration: none;">Manage alerts</a> • 
                                <a href="${appUrl}/support" style="color: #667eea; text-decoration: none;">Get support</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    // Create plain text fallback
    const linksList = brokenLinks.map(l => `- ${l.href} (Status: ${l.statusCode || 'Error'})`).join('\n');
    const text = `
Affiliate Link Monitor Alert
============================

We found ${brokenLinks.length} broken or suspicious link${brokenLinks.length > 1 ? 's' : ''} on your monitored page:

MONITORED URL:
${monitorUrl}

BROKEN LINKS:
${linksList}

ACTION REQUIRED:
These broken links may be causing revenue loss. Please review and fix them as soon as possible.

View full report:
${reportUrl}

---
Scan ID: ${scanId}
Manage your alerts: ${appUrl}/settings
`;

    // Check if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            const senderEmail = process.env.SMTP_FROM_EMAIL || 'info@affiliatelinkmonitoring.com';
            const senderName = process.env.SMTP_FROM_NAME || 'LinkMonitor Alerts';

            await transporter.sendMail({
                from: `"${senderName}" <${senderEmail}>`,
                to,
                subject,
                text,
                html,
            });
            console.log(`📧 Alert email sent to ${to}`);
        } catch (error) {
            console.error('Failed to send alert email:', error);
        }
    } else {
        // Fallback: Log to console (Simulation Mode)
        console.log('\n================ EMAIL ALERT SIMULATION ================');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log('Body:');
        console.log(text);
        console.log('========================================================\n');
    }
}

export async function sendSupportEmail(fromEmail: string, fromName: string, subject: string, message: string) {
    const adminEmail = 'info@affiliatelinkmonitoring.com';
    const finalSubject = `[SUPPORT] ${subject}`;

    const text = `
New Support Request
-------------------
From: ${fromName} (${fromEmail})
Subject: ${subject}

Message:
${message}
    `;

    // 1. Check if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            const senderEmail = process.env.SMTP_FROM_EMAIL || 'info@affiliatelinkmonitoring.com';
            const senderName = process.env.SMTP_FROM_NAME || 'LinkMonitor Support';

            await transporter.sendMail({
                from: `"${senderName}" <${senderEmail}>`,
                to: adminEmail,
                replyTo: fromEmail,  // User's email for easy reply
                subject: finalSubject,
                text,
            });
            console.log(`📧 Support email sent to admin from ${fromEmail}`);
        } catch (error) {
            console.error('Failed to send support email:', error);
            throw new Error('Failed to send email');
        }
    } else {
        // 2. Fallback: Log to console
        console.log('\n================ SUPPORT EMAIL SIMULATION ================');
        console.log(`To Admin: ${adminEmail}`);
        console.log(`Reply-To: ${fromEmail}`);
        console.log(`Subject: ${finalSubject}`);
        console.log('Body:');
        console.log(text);
        console.log('==========================================================\n');
    }
}
