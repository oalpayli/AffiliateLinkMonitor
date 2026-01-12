import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';

// This should be an environment variable in a real app, 
// using a hardcoded placeholder or env var for now.
// For testing, create a Price in Stripe Dashboard and put the ID here.
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!;

const settingsUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST() {
    try {
        const user = await requireAuth();
        const userId = user.id;

        if (!user.email) {
            return new NextResponse('Email required', { status: 400 });
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: { userId },
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: `${settingsUrl}/settings`,
            });

            return NextResponse.json({ url: stripeSession.url });
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${settingsUrl}/pricing?success=true`,
            cancel_url: `${settingsUrl}/pricing?canceled=true`,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.email,
            line_items: [
                {
                    price: STRIPE_PRICE_ID, // Use your correct price ID here
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });

        return NextResponse.json({ url: stripeSession.url });

    } catch (error) {
        console.log('[STRIPE_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
