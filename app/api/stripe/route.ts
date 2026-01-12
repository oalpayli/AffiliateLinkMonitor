import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { stripe, absoluteUrl } from '@/lib/stripe';
import { PRO_PRICE_ID } from '@/lib/constants';

const RETURN_URL = absoluteUrl('/');

export async function POST() {
    try {
        const user = await requireAuth();
        const userId = user.id;

        if (!user.email) {
            return new NextResponse("Email required", { status: 400 });
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: { userId }
        });

        // 1. If user already has a Stripe Customer ID, create a Portal Session (Manage Subscription)
        if (userSubscription && userSubscription.stripeCustomerId) {
            // Handle forced/fake subscriptions (Dev only)
            if (userSubscription.stripeCustomerId.startsWith('cus_force_pro_test_')) {
                return NextResponse.json({ url: absoluteUrl('/settings') });
            }

            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: RETURN_URL,
            });

            return NextResponse.json({ url: stripeSession.url });
        }

        // 2. Otherwise, create a Checkout Session (Upgrade)
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: RETURN_URL,
            cancel_url: RETURN_URL,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.email,
            line_items: [
                {
                    price: PRO_PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });

        return NextResponse.json({ url: stripeSession.url });

    } catch (error: any) {
        console.error("[STRIPE_POST]", error);
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
