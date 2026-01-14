import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { checkSubscription } from '@/lib/subscription';

/**
 * Simple API to check if user is Pro
 * Used for polling after checkout
 */
export async function GET() {
    try {
        const user = await requireAuth();
        const isPro = await checkSubscription();

        return NextResponse.json({ isPro });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}
