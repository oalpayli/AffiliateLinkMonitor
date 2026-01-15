import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { dodo } from '@/lib/dodo';

/**
 * Initiate Payment Method Update
 * Returns a URL to update payment details
 */
export async function POST(req: Request) {
    try {
        const user = await requireAuth();
        const { returnUrl } = await req.json();

        const subscription = await prisma.userSubscription.findUnique({
            where: { userId: user.id },
            select: { dodoSubscriptionId: true }
        });

        if (!subscription?.dodoSubscriptionId) {
            return new NextResponse("No active subscription", { status: 404 });
        }

        // Create payment method update session
        // Note: Using type 'new' to prompt for new card details
        const response = await dodo.subscriptions.updatePaymentMethod(
            subscription.dodoSubscriptionId,
            {
                type: 'new',
                return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/settings`
            }
        );

        // The response structure might vary, logging it to be sure
        console.log('[DODO_UPDATE_PAYMENT]', response);

        // If SDK types are correct, we should check what response contains.
        // Based on SDK: it returns SubscriptionUpdatePaymentMethodResponse
        // Let's assume it has a link/url, otherwise we might need to check SDK docs/types again.
        // For now returning the whole response or trying to find the link.

        // Dodo returns { payment_link: string, ... }
        // We return { url: payment_link } to match frontend expectation
        return NextResponse.json({
            url: response.payment_link
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('[DODO_UPDATE_PAYMENT]', error);
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse(`Failed to init update: ${error.message}`, { status: 500 });
    }
}
