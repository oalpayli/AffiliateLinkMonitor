import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkSubscription } from '@/lib/subscription';

// MOCK AUTH for debugging
const auth = () => ({ userId: 'debug_real_test_user' });

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        console.log('[DEBUG API] START - User:', userId);

        const body = await request.json();
        const { url, frequency = 'daily', alertEmail } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Check subscription/limits
        // We need to bypass checkSubscription auth() call or mock it?
        // checkSubscription calls auth() internally as well... 

        // Let's manually check subscription here to match logic, 
        // OR we just assume subscription check is part of the problem.

        // REPLICATING checkSubscription logic manually to avoid auth() import conflict
        const userSubscription = await prisma.userSubscription.findUnique({
            where: { userId },
        });
        const isPro = userSubscription &&
            userSubscription.dodoStatus === 'active' &&
            userSubscription.dodoCurrentPeriodEnd &&
            userSubscription.dodoCurrentPeriodEnd.getTime() > Date.now();

        const count = await prisma.monitor.count({
            where: { userId }
        });

        console.log('[DEBUG API] Check:', { isPro, count });

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
                nextRun: new Date()
            }
        });

        console.log('[DEBUG API] Success:', monitor);
        return NextResponse.json(monitor, { status: 201 });
    } catch (error: any) {
        console.error('[DEBUG API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to create monitor', details: error.message, stack: error.stack },
            { status: 500 }
        );
    }
}
