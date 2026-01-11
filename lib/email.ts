import nodemailer from 'nodemailer';

export interface AlertDetails {
    monitorUrl: string;
    scanId: string;
    brokenLinks: Array<{ href: string; statusCode: number }>;
}

export async function sendAlertEmail(to: string, details: AlertDetails) {
    const { monitorUrl, scanId, brokenLinks } = details;

    const subject = `[ALERT] Broken Affiliate Links Found on ${new URL(monitorUrl).hostname}`;

    // Create text body
    const linksList = brokenLinks.map(l => `- ${l.href} (Status: ${l.statusCode})`).join('\n');
    const text = `
Affiliate Link Monitor Alert
----------------------------

We found ${brokenLinks.length} broken or suspicious links on your monitored page:
${monitorUrl}

Broken Links:
${linksList}

View full report:
http://localhost:3000/scans/${scanId}
`;

    // 1. Check if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            await transporter.sendMail({
                from: '"Affiliate Monitor" <alerts@affiliatemonitor.com>',
                to,
                subject,
                text,
            });
            console.log(`📧 Email sent to ${to}`);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    } else {
        // 2. Fallback: Log to console (Simulation Mode)
        console.log('\n================ EMAIL ALERT SIMULATION ================');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log('Body:');
        console.log(text);
        console.log('========================================================\n');
    }
}
