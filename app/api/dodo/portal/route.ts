import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { dodo } from '@/lib/dodo';

/**
 * Generate Dodo Payments Customer Portal Link
 * Redirects user to Dodo dashboard to manage their subscription
 */
export async function POST() {
    try {
        const user = await requireAuth();

        const subscription = await prisma.userSubscription.findUnique({
            where: { userId: user.id },
        });

        if (!subscription?.dodoCustomerId) {
            return new NextResponse("No active customer found", { status: 404 });
        }

        // Create portal session
        const session = await dodo.customers.customerPortal.create(subscription.dodoCustomerId);

        return NextResponse.json({ url: session.link });

    } catch (error: any) {
        console.error('[DODO_PORTAL]', error);
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse(`Failed to create portal: ${error.message}`, { status: 500 });
    }
}
