import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { checkSubscription } from '@/lib/subscription';

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        console.log('[API] POST /api/monitors - User:', userId);

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { url, frequency = 'daily', alertEmail } = body;
        console.log('[API] Body:', { url, frequency, alertEmail });

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Check subscription/limits
        const isPro = await checkSubscription();
        const count = await prisma.monitor.count({
            where: { userId }
        });
        console.log('[API] Check:', { isPro, count });

        if (!isPro && count >= 3) {
            return NextResponse.json(
                { error: 'Free tier limit reached. Upgrade to Pro for more monitors.' },
                { status: 403 }
            );
        }

        const monitor = await prisma.monitor.create({
            data: {
                url,
                frequency,
                alertEmail,
                userId,
                nextRun: new Date() // Run immediately/soon
            }
        });

        return NextResponse.json(monitor, { status: 201 });
    } catch (error: any) {
        console.error('[API] Error creating monitor:', error);
        return NextResponse.json(
            { error: `Server Error: ${error.message || 'Unknown'}` },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const monitors = await prisma.monitor.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { scans: true }
                }
            }
        });

        return NextResponse.json(monitors);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch monitors' },
            { status: 500 }
        );
    }
}
