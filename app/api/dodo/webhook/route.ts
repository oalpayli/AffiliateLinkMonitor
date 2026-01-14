import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdByEmail } from '@/lib/supabase-admin';

export async function POST(req: Request) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get('dodo-signature') as string;

    let event;

    try {
        // Parse the webhook payload
        // Note: Dodo Payments webhook signature verification will be added
        // when we have the webhook secret
        event = JSON.parse(body);
    } catch (error: any) {
        console.error('Webhook parsing failed:', error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const data = event.data || event;
    const eventType = event.event_name || event.type;

    console.log('[DODO WEBHOOK]', eventType, data);

    try {
        // Handle payment success / subscription created
        if (eventType === 'payment.succeeded' || eventType === 'subscription.created') {
            const payment = data;

            // Try multiple fields where userId might be
            let userId = payment.client_reference_id ||
                payment.custom_data?.userId ||
                payment.metadata?.userId ||
                payment.metadata?.client_reference_id;

            console.log('[WEBHOOK] Looking for userId in:', {
                client_reference_id: payment.client_reference_id,
                custom_data: payment.custom_data,
                metadata: payment.metadata,
                customer_email: payment.customer?.email,
                found: userId
            });

            // If no userId in metadata, try to find user by email via Supabase Admin
            if (!userId && payment.customer?.email) {
                console.log('[WEBHOOK] No userId in metadata, looking up by email:', payment.customer.email);
                userId = await getUserIdByEmail(payment.customer.email);
            }

            if (!userId) {
                console.error('No userId in payment metadata and could not find user by email');
                console.error('Full payment object:', JSON.stringify(payment, null, 2));
                return new NextResponse("User id is required", { status: 400 });
            }

            // Calculate period end (assuming monthly subscription)
            const currentPeriodEnd = new Date();
            currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

            await prisma.userSubscription.upsert({
                where: { userId },
                create: {
                    userId,
                    dodoCustomerId: payment.customer?.customer_id || payment.customer?.email,
                    dodoSubscriptionId: payment.subscription_id || payment.id,
                    dodoProductId: payment.product_id,
                    dodoVariantId: payment.variant_id,
                    dodoCurrentPeriodEnd: currentPeriodEnd,
                    dodoStatus: 'active',
                    dodoCancelAtPeriodEnd: false,
                },
                update: {
                    dodoCustomerId: payment.customer?.customer_id || payment.customer?.email,
                    dodoSubscriptionId: payment.subscription_id || payment.id,
                    dodoProductId: payment.product_id,
                    dodoVariantId: payment.variant_id,
                    dodoCurrentPeriodEnd: currentPeriodEnd,
                    dodoStatus: 'active',
                    dodoCancelAtPeriodEnd: false,
                },
            });

            console.log('[WEBHOOK] Subscription activated for user:', userId);
        }

        // Handle subscription updated
        if (eventType === 'subscription.updated') {
            const subscription = data;

            await prisma.userSubscription.updateMany({
                where: { dodoSubscriptionId: subscription.subscription_id },
                data: {
                    dodoStatus: subscription.status || 'active',
                    dodoCancelAtPeriodEnd: subscription.cancel_at_period_end || false,
                },
            });

            console.log('[WEBHOOK] Subscription updated:', subscription.subscription_id);
        }

        // Handle subscription cancelled
        if (eventType === 'subscription.cancelled') {
            const subscription = data;

            await prisma.userSubscription.updateMany({
                where: { dodoSubscriptionId: subscription.subscription_id },
                data: {
                    dodoStatus: 'cancelled',
                    dodoCancelAtPeriodEnd: true,
                },
            });

            console.log('[WEBHOOK] Subscription cancelled:', subscription.subscription_id);
        }

        // Handle subscription expired
        if (eventType === 'subscription.expired') {
            const subscription = data;

            await prisma.userSubscription.updateMany({
                where: { dodoSubscriptionId: subscription.subscription_id },
                data: {
                    dodoStatus: 'expired',
                },
            });

            console.log('[WEBHOOK] Subscription expired:', subscription.subscription_id);
        }

        return new NextResponse(null, { status: 200 });

    } catch (error: any) {
        console.error('[WEBHOOK ERROR]', error);
        return new NextResponse(`Webhook handler failed: ${error.message}`, { status: 500 });
    }
}
