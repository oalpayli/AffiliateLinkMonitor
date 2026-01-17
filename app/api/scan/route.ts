import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { performFullScan } from '@/lib/scraper/service';
import { getCurrentUser } from '@/lib/auth';
import { checkSubscription } from '@/lib/subscription';
import { getIdentifier, checkScanLimit, incrementScanCount } from '@/lib/rate-limit';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        // Check rate limits
        const user = await getCurrentUser();
        const isPro = user ? await checkSubscription() : false;
        const identifier = await getIdentifier(request, user);

        const { allowed, remaining } = await checkScanLimit(identifier, isPro);

        if (!allowed) {
            const isAuthenticated = !!user;

            return NextResponse.json(
                {
                    error: isAuthenticated
                        ? 'Daily scan limit reached. Upgrade to Pro for unlimited scans!'
                        : 'Scan limit reached. Sign up for more scans!',
                    limitReached: true,
                    isAuthenticated
                },
                { status: 429 }
            );
        }

        // Increment usage counter
        await incrementScanCount(identifier);

        // Perform the scan
        // Try to find an existing monitor for this user and url to link the scan
        let monitorId = undefined;
        if (user) {
            const monitor = await prisma.monitor.findFirst({
                where: {
                    userId: user.id,
                    url: url
                },
                select: { id: true }
            });
            if (monitor) {
                monitorId = monitor.id;
            }
        }

        const scan = await performFullScan(url, monitorId);

        return NextResponse.json({ ...scan, remaining }, { status: 201 });
    } catch (error) {
        console.error('[API /scan] Error occurred:', error);
        console.error('[API /scan] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        console.error('[API /scan] Error message:', error instanceof Error ? error.message : String(error));
        return NextResponse.json(
            { error: 'Failed to perform scan' },
            { status: 500 }
        );
    }
}
