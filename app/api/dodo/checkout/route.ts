import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { absoluteUrl } from '@/lib/dodo';

// Get this URL from Dodo Dashboard → Products → Pro → Create Payment Link
const PAYMENT_LINK_URL = process.env.DODO_PAYMENT_LINK || process.env.DODO_PAYMENT_LINK_URL || 'https://dodopayments.com/checkout/YOUR_LINK_ID';
const RETURN_URL = absoluteUrl('/');

export async function POST() {
    try {
        const user = await requireAuth();

        // Check if user already has an active subscription
        const existingSubscription = await prisma.userSubscription.findUnique({
            where: { userId: user.id },
        });

        if (existingSubscription && existingSubscription.dodoStatus === 'active') {
            // If active, prevent creating a new checkout session
            return new NextResponse("User already has an active subscription", { status: 409 });
        }

        const userId = user.id;

        if (!user.email) {
            return new NextResponse("Email required", { status: 400 });
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: { userId }
        });

        // If user has active subscription, redirect to settings
        if (userSubscription?.dodoCustomerId && userSubscription.dodoStatus === 'active') {
            return NextResponse.json({ url: absoluteUrl('/settings') });
        }

        // Use Payment Link with minimal parameters to avoid redirect loops
        const checkoutUrl = new URL(PAYMENT_LINK_URL);

        // Only add parameters that Dodo Payment Links support
        if (user.email) {
            checkoutUrl.searchParams.set('prefilled_email', user.email);
        }
        checkoutUrl.searchParams.set('client_reference_id', userId);

        console.log('[DODO_CHECKOUT] Redirecting to:', checkoutUrl.toString());
        return NextResponse.json({ url: checkoutUrl.toString() });

    } catch (error: any) {
        console.error("[DODO_CHECKOUT]", error);
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}

