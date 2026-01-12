import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // Handle Subscription Creation
    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        ) as any;

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 });
        }

        // Fix type access by checking if subscription is valid
        const currentPeriodEnd = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000)
            : new Date();

        await prisma.userSubscription.upsert({
            where: {
                userId: session.metadata.userId,
            },
            create: {
                userId: session.metadata.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: currentPeriodEnd,
            },
            update: {
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: currentPeriodEnd,
            },
        });
    }

    // Handle Subscription Renewal/Update
    if (event.type === 'invoice.payment_succeeded') {
        const invoice = event.data.object as Stripe.Invoice;

        const subscription = await stripe.subscriptions.retrieve(
            (invoice as any).subscription as string
        ) as any;

        const currentPeriodEnd = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000)
            : new Date();

        // We must update based on customer_id, because if they resubscribed via Portal,
        // the old subscription ID might be different or null.
        // We assume one subscription per customer for this app.
        await prisma.userSubscription.update({
            where: {
                stripeCustomerId: subscription.customer as string,
            },
            data: {
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: currentPeriodEnd,
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
