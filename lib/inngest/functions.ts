import { inngest } from "./client";
import { prisma } from "@/lib/db";
import { performFullScan } from "@/lib/scraper/service";
import { sendAlertEmail } from "@/lib/email";

// 1. The Cron Trigger (Runs every hour)
export const cronTrigger = inngest.createFunction(
    { id: "monitor-cron-trigger" },
    { cron: "0 * * * *" }, // Run hourly at minute 0
    async ({ step }) => {

        // Step A: Find monitors due for a check
        const monitorsToCheck = await step.run("fetch-monitors", async () => {
            const now = new Date();
            // Simple logic: If 'nextRun' is in the past, it's due
            return await prisma.monitor.findMany({
                where: { nextRun: { lte: now } },
                select: { id: true, url: true, alertEmail: true, frequency: true }
            });
        });

        if (monitorsToCheck.length === 0) {
            return { message: "No monitors due for check" };
        }

        // Step B: Fan-out! Trigger a separate job for each monitor
        // This allows them to run in parallel and retry independently
        const events = monitorsToCheck.map((monitor) => ({
            name: "monitor/check",
            data: {
                monitorId: monitor.id,
                url: monitor.url,
                alertEmail: monitor.alertEmail,
                frequency: monitor.frequency
            },
        }));

        await step.sendEvent("fan-out-checks", events);

        return { triggered: monitorsToCheck.length };
    }
);

// 2. The Worker (Runs for each monitor)
export const checkMonitor = inngest.createFunction(
    { id: "check-single-monitor" },
    { event: "monitor/check" },
    async ({ event, step }) => {
        const { monitorId, url, alertEmail, frequency } = event.data;

        const result = await step.run("perform-scan", async () => {
            // Re-use our existing logic!
            return await performFullScan(url, monitorId);
        });

        // Handle Alerts
        if (result.links.some(l => l.status === 'broken')) {
            await step.run("send-alert", async () => {
                if (alertEmail) {
                    await sendAlertEmail(alertEmail, url, result.links.filter(l => l.status === 'broken'));
                }
            });
        }

        // Schedule next run
        await step.run("update-schedule", async () => {
            let nextRun = new Date();
            if (frequency === 'hourly') nextRun.setHours(nextRun.getHours() + 1);
            if (frequency === 'daily') nextRun.setDate(nextRun.getDate() + 1);
            if (frequency === 'weekly') nextRun.setDate(nextRun.getDate() + 7);

            await prisma.monitor.update({
                where: { id: monitorId },
                data: { nextRun }
            });
        });

        return { status: "success", linksFound: result.links.length };
    }
);
