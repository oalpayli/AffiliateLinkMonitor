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
            // Only fetch active monitors due for a check
            return await prisma.monitor.findMany({
                where: {
                    nextRun: { lte: now },
                    isActive: true
                },
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
        const brokenLinks = result.links.filter((l: any) => l.status === 'broken');
        const oosLinks = result.links.filter((l: any) => l.stockStatus === 'out_of_stock');

        if (brokenLinks.length > 0 || oosLinks.length > 0) {
            await step.run("send-alert", async () => {
                if (alertEmail) {
                    await sendAlertEmail(alertEmail, {
                        monitorUrl: url,
                        scanId: result.id,
                        brokenLinks: brokenLinks.map(l => ({
                            href: l.href,
                            statusCode: l.statusCode || 0
                        })),
                        oosLinks: oosLinks.map(l => ({
                            href: l.href,
                            statusCode: l.statusCode || 0
                        }))
                    });
                }
            });
        }

        // Schedule next run
        await step.run("update-schedule", async () => {
            const nextRun = new Date();
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

// 3. Upgrade Follow-Up Email (48 hours after limit reached)
export const upgradeFollowUp = inngest.createFunction(
    { id: "upgrade-follow-up-email" },
    { event: "upgrade/follow-up" },
    async ({ event, step }) => {
        const { userId, email } = event.data;

        // Wait 48 hours before sending
        await step.sleep("wait-48h", "48h");

        // Check if user is still on free plan (they may have upgraded)
        const stillFree = await step.run("check-subscription", async () => {
            const subscription = await prisma.userSubscription.findFirst({
                where: {
                    userId,
                    dodoStatus: { in: ['active', 'trialing'] }
                }
            });
            return !subscription;
        });

        if (!stillFree) {
            return { status: "skipped", reason: "user already upgraded" };
        }

        // Send the follow-up email
        await step.run("send-follow-up", async () => {
            const { sendUpgradeFollowUpEmail } = await import("@/lib/email");
            await sendUpgradeFollowUpEmail(email);
        });

        return { status: "sent", email };
    }
);
