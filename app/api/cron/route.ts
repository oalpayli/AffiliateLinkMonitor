import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { performFullScan } from '@/lib/scraper/service';
import { sendAlertEmail } from '@/lib/email';

export const maxDuration = 60; // Allow 1 minute max for Vercel Hobby/Pro.

export async function GET() {
    try {
        const now = new Date();

        // 1. Find monitors due for a run
        const pendingMonitors = await prisma.monitor.findMany({
            where: {
                isActive: true,
                nextRun: { lte: now }
            },
            take: 5 // Process max 5 at a time to avoid timeout
        });

        if (pendingMonitors.length === 0) {
            return NextResponse.json({ message: 'No monitors due' });
        }

        const results = [];

        // 2. Process each monitor
        for (const monitor of pendingMonitors) {
            try {
                console.log(`Running scheduled scan for: ${monitor.url}`);
                const scan = await performFullScan(monitor.url, monitor.id);

                // 3. Calculate next run
                let nextRun = new Date();
                if (monitor.frequency === 'hourly') nextRun.setHours(nextRun.getHours() + 1);
                else if (monitor.frequency === 'weekly') nextRun.setDate(nextRun.getDate() + 7);
                else nextRun.setDate(nextRun.getDate() + 1); // default daily

                // 4. Update monitor
                await prisma.monitor.update({
                    where: { id: monitor.id },
                    data: {
                        lastRun: now,
                        nextRun
                    }
                });

                // Check for broken links and send alert
                const brokenLinks = scan.links.filter(l => l.status === 'broken');
                if (brokenLinks.length > 0 && monitor.alertEmail) {
                    await sendAlertEmail(monitor.alertEmail, {
                        monitorUrl: monitor.url,
                        scanId: scan.id,
                        brokenLinks: brokenLinks.map(l => ({ href: l.href, statusCode: l.statusCode || 0 }))
                    });
                }

                results.push({ url: monitor.url, status: 'success', scanId: scan.id, alertsSent: brokenLinks.length });
            } catch (error) {
                console.error(`Failed to scan ${monitor.url}`, error);
                results.push({ url: monitor.url, status: 'failed' });
            }
        }

        return NextResponse.json({
            message: `Processed ${results.length} monitors`,
            results
        });
    } catch (error) {
        console.error('Cron Error:', error);
        return NextResponse.json(
            { error: 'Failed to run cron' },
            { status: 500 }
        );
    }
}
