import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { stripe, absoluteUrl } from '@/lib/stripe';
import { PRO_PRICE_ID } from '@/lib/constants';

const RETURN_URL = absoluteUrl('/');

export async function POST() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: { userId }
        });

        // 1. If user already has a Stripe Customer ID, create a Portal Session (Manage Subscription)
        if (userSubscription && userSubscription.stripeCustomerId) {
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
            customer_email: user.emailAddresses[0].emailAddress,
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
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
