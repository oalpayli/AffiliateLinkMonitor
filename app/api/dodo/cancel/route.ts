import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

/**
 * Cancel Dodo Payments subscription
 * Note: For full cancellation, user should cancel via Dodo Dashboard
 * This marks subscription as "will cancel at period end" in our database
 */
export async function POST() {
    try {
        const user = await requireAuth();
        const userId = user.id;

        const subscription = await prisma.userSubscription.findUnique({
            where: { userId },
        });

        if (!subscription?.dodoSubscriptionId) {
            return new NextResponse("No active subscription", { status: 404 });
        }

        // Update local database to mark as "will cancel"
        await prisma.userSubscription.update({
            where: { userId },
            data: {
                dodoCancelAtPeriodEnd: true,
            },
        });

        console.log('[DODO_CANCEL] Subscription marked for cancellation:', {
            userId,
            subscriptionId: subscription.dodoSubscriptionId,
            periodEnd: subscription.dodoCurrentPeriodEnd
        });

        return NextResponse.json({
            success: true,
            periodEnd: subscription.dodoCurrentPeriodEnd,
            message: 'To fully cancel, please visit Dodo Payments dashboard'
        });

    } catch (error: any) {
        console.error('[DODO_CANCEL]', error);
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse(`Failed to cancel: ${error.message}`, { status: 500 });
    }
}
