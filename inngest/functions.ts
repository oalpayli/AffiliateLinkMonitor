import { inngest } from "./client";
import { prisma } from "@/lib/db";
import { performFullScan } from "@/lib/scraper/service";
import { sendAlertEmail } from "@/lib/email";

// 1. Scheduler Function: Runs every 10 minutes to check for pending scans
export const scheduler = inngest.createFunction(
    { id: "scheduler-cron" },
    { cron: "*/10 * * * *" }, // Run every 10 minutes
    async ({ step }) => {
        const monitors = await step.run("fetch-pending-monitors", async () => {
            return await prisma.monitor.findMany({
                where: {
                    isActive: true,
                    nextRun: { lte: new Date() }
                },
                select: { id: true, url: true }
            });
        });

        if (!monitors.length) {
            return { message: "No monitors due for scan" };
        }

        const events = monitors.map(monitor => ({
            name: "monitor/scan-requested",
            data: {
                monitorId: monitor.id,
                url: monitor.url
            }
        }));

        await step.sendEvent("dispatch-scan-events", events);

        return { count: monitors.length, monitors };
    }
);

// 2. Worker Function: Performs the actual scan for a single monitor
export const scanMonitor = inngest.createFunction(
    { id: "scan-monitor", concurrency: 10 }, // Limit concurrent scans to avoid overloading
    { event: "monitor/scan-requested" },
    async ({ event, step }) => {
        const { monitorId, url } = event.data;

        // Verify monitor still exists and is active
        const monitor = await step.run("verify-monitor", async () => {
            return await prisma.monitor.findUnique({
                where: { id: monitorId }
            });
        });

        if (!monitor || !monitor.isActive) {
            return { message: "Monitor not found or inactive", monitorId };
        }

        // Perform the scan
        const scan = await step.run("perform-scan", async () => {
            return await performFullScan(url, monitorId);
        });

        // Update monitor schedules
        await step.run("update-schedule", async () => {
            const now = new Date();
            const nextRun = new Date();

            if (monitor.frequency === 'hourly') nextRun.setHours(nextRun.getHours() + 1);
            else if (monitor.frequency === 'weekly') nextRun.setDate(nextRun.getDate() + 7);
            else nextRun.setDate(nextRun.getDate() + 1); // default daily

            await prisma.monitor.update({
                where: { id: monitorId },
                data: {
                    lastRun: now,
                    nextRun
                }
            });
        });

        // Check for alerts
        await step.run("check-alerts", async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const brokenLinks = scan.links.filter((l: any) => l.status === 'broken');

            if (brokenLinks.length > 0 && monitor.alertEmail) {
                await sendAlertEmail(monitor.alertEmail, {
                    monitorUrl: monitor.url,
                    scanId: scan.id,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    brokenLinks: brokenLinks.map((l: any) => ({
                        href: l.href,
                        statusCode: l.statusCode || 0
                    }))
                });
                return { alertSent: true };
            }
            return { alertSent: false };
        });

        return { status: "success", scanId: scan.id };
    }
);
