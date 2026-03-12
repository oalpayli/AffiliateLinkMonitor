import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { checkSubscription } from '@/lib/subscription';
import { MAX_FREE_MONITORS, MAX_PRO_MONITORS } from '@/lib/constants';
import {
    sendUpgradeLimitApproachingEmail,
    sendUpgradeLimitReachedEmail
} from '@/lib/email';

export async function POST(request: Request) {
    try {
        const user = await requireAuth();
        const userId = user.id;
        console.log('[API] POST /api/monitors - User:', userId);

        const body = await request.json();
        const { url, urls, frequency = 'daily', alertEmail } = body;

        let urlsToProcess: string[] = [];

        if (urls && Array.isArray(urls)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            urlsToProcess = urls.filter((u: any) => typeof u === 'string' && u.trim().length > 0);
        } else if (url && typeof url === 'string') {
            urlsToProcess = [url];
        }

        if (urlsToProcess.length === 0) {
            return NextResponse.json({ error: 'At least one URL is required' }, { status: 400 });
        }

        // Check subscription/limits (consolidated - single check)
        const isPro = await checkSubscription();
        const limit = isPro ? MAX_PRO_MONITORS : MAX_FREE_MONITORS;
        const currentCount = await prisma.monitor.count({
            where: { userId }
        });

        console.log('[API] Check:', { isPro, currentCount, limit });

        if (currentCount + urlsToProcess.length > limit) {
            return NextResponse.json(
                { error: `Limit reached. You can only have ${limit} monitors. You are trying to add ${urlsToProcess.length} but have space for ${limit - currentCount}.` },
                { status: 403 }
            );
        }

        // Filter out duplicates that already exist to avoid errors
        const existingMonitors = await prisma.monitor.findMany({
            where: {
                userId,
                url: { in: urlsToProcess }
            },
            select: { url: true }
        });

        const existingUrls = new Set(existingMonitors.map(m => m.url));
        const newUrls = urlsToProcess.filter(u => !existingUrls.has(u));

        if (newUrls.length === 0) {
            // All requested URLs already exist
            return NextResponse.json({ message: "All monitors already exist", monitors: [] }, { status: 200 });
        }

        // Create monitors
        await prisma.monitor.createMany({
            data: newUrls.map(u => ({
                url: u,
                frequency,
                alertEmail,
                userId,
                nextRun: new Date()
            }))
        });

        const createdMonitors = await prisma.monitor.findMany({
            where: {
                userId,
                url: { in: newUrls }
            }
        });

        // Trigger immediate scan for new monitors (non-blocking)
        const { inngest } = await import('@/lib/inngest/client');

        const events = createdMonitors.map((monitor) => ({
            name: "monitor/check",
            data: {
                monitorId: monitor.id,
                url: monitor.url,
                alertEmail: monitor.alertEmail,
                frequency: monitor.frequency
            },
        }));

        // Fire and forget - don't block response
        inngest.send(events).catch(error => {
            console.error('[API] Failed to trigger initial scan:', error);
        });
        console.log(`[API] Queued initial scan for ${events.length} monitors`);

        // ─── Upgrade Email Triggers (non-blocking) ───
        if (!isPro) {
            const newCount = currentCount + newUrls.length;
            const crossedApproaching = currentCount < 8 && newCount >= 8 && newCount < limit;
            const crossedLimit = newCount >= limit;

            if (crossedLimit || crossedApproaching) {
                // Count broken links from past scans for personalization
                (async () => {
                    try {
                        const brokenLinksFound = await prisma.link.count({
                            where: {
                                scan: {
                                    monitor: { userId }
                                },
                                status: 'broken'
                            }
                        });

                        const emailData = {
                            monitorCount: newCount,
                            monitorLimit: limit,
                            brokenLinksFound,
                        };

                        if (crossedLimit) {
                            // Limit reached — send Email 2
                            await sendUpgradeLimitReachedEmail(user.email!, emailData);
                            console.log(`[API] Sent limit-reached email to ${user.email}`);

                            // Schedule 48h follow-up via Inngest
                            await inngest.send({
                                name: 'upgrade/follow-up',
                                data: {
                                    userId,
                                    email: user.email,
                                },
                            });
                            console.log(`[API] Scheduled 48h follow-up for ${user.email}`);
                        } else if (crossedApproaching) {
                            // Approaching limit — send Email 1
                            await sendUpgradeLimitApproachingEmail(user.email!, emailData);
                            console.log(`[API] Sent limit-approaching email to ${user.email}`);
                        }
                    } catch (emailError) {
                        console.error('[API] Failed to send upgrade email:', emailError);
                    }
                })();
            }
        }

        return NextResponse.json(createdMonitors, { status: 201 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('[API] Error creating monitor:', error);
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json(
            { error: `Server Error: ${error.message || 'Unknown'}` },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await requireAuth();
        const userId = user.id;

        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
        }

        // To safely bulk delete, we must clean up related records first because
        // cascading deletes might not be fully configured on the Monitor relation in Prisma Schema.
        await prisma.$transaction(async (tx) => {
            // 1. Delete all Links associated with Scans that belong to these Monitors
            // (Links cascade on Scan delete usually, but let's be safe if they don't)
            // Actually, schema says Scan->Link is Cascade. But Monitor->Scan is optional/set null?
            // Schema: monitor Monitor? @relation...
            // Wait, if Monitor is deleted, Scan.monitorId might just become null if not Cascade?
            // But we want to delete the Scans too.

            // Find scans to delete
            const scans = await tx.scan.findMany({
                where: { monitorId: { in: ids } },
                select: { id: true }
            });
            const scanIds = scans.map(s => s.id);

            if (scanIds.length > 0) {
                await tx.link.deleteMany({
                    where: { scanId: { in: scanIds } }
                });

                await tx.scan.deleteMany({
                    where: { id: { in: scanIds } }
                });
            }

            // 2. Delete the Monitors
            await tx.monitor.deleteMany({
                where: {
                    userId,
                    id: { in: ids }
                }
            });
        });

        return NextResponse.json({ success: true, count: ids.length });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('[API] Bulk Delete Error:', error);
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json(
            { error: `Server Error: ${error.message || 'Unknown'}` },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const user = await requireAuth();
        const userId = user.id;

        // Parallel execution for better performance
        const [monitors, isPro] = await Promise.all([
            prisma.monitor.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: {
                        select: { scans: true }
                    }
                }
            }),
            checkSubscription()
        ]);

        const limit = isPro ? MAX_PRO_MONITORS : MAX_FREE_MONITORS;

        return NextResponse.json({
            monitors,
            isPro,
            limit,
            count: monitors.length
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json(
            { error: 'Failed to fetch monitors' },
            { status: 500 }
        );
    }
}
