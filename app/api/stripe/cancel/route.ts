import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST() {
    try {
        const user = await requireAuth();
        const userId = user.id;

        // Get user's subscription
        const userSubscription = await prisma.userSubscription.findUnique({
            where: { userId }
        });

        if (!userSubscription || !userSubscription.stripeSubscriptionId) {
            return NextResponse.json(
                { error: 'No active subscription found' },
                { status: 404 }
            );
        }

        // Handle forced/fake subscriptions (Dev only)
        if (userSubscription.stripeSubscriptionId.startsWith('sub_force_pro_test_')) {
            await prisma.userSubscription.update({
                where: { userId },
                data: {
                    stripeCancelAtPeriodEnd: true
                }
            });

            return NextResponse.json({
                success: true,
                periodEnd: userSubscription.stripeCurrentPeriodEnd
            });
        }

        // Cancel subscription at period end
        const subscription = await stripe.subscriptions.update(
            userSubscription.stripeSubscriptionId,
            {
                cancel_at_period_end: true
            }
        );

        // Update database
        await prisma.userSubscription.update({
            where: { userId },
            data: {
                stripeCancelAtPeriodEnd: true
            }
        });

        return NextResponse.json({
            success: true,
            periodEnd: userSubscription.stripeCurrentPeriodEnd
        });
    } catch (error: any) {
        console.error('Cancel subscription error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to cancel subscription' },
            { status: 500 }
        );
    }
}
