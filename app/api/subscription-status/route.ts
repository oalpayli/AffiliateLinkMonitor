import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { checkSubscription } from '@/lib/subscription';

/**
 * Simple API to check if user is Pro
 * Used for polling after checkout
 */
export async function GET() {
    try {
        await requireAuth();
        const isPro = await checkSubscription();

        return NextResponse.json({ isPro });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}
