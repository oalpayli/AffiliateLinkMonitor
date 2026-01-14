import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { dodo } from '@/lib/dodo';

/**
 * List Dodo Payments for current user
 * Serves as "Billing History"
 */
export async function GET() {
    try {
        const user = await requireAuth();

        const subscription = await prisma.userSubscription.findUnique({
            where: { userId: user.id },
            select: { dodoCustomerId: true }
        });

        if (!subscription?.dodoCustomerId) {
            return NextResponse.json({ invoices: [] });
        }

        // Fetch payments list from Dodo
        const response = await dodo.payments.list({
            customer_id: subscription.dodoCustomerId,
            page_size: 20 // Last 20 payments
        });

        // Map to simpler format for UI
        // @ts-ignore - SDK types might be intricate, usually it's items or data
        const payments = response.items || response.data || [];

        const invoices = payments.map((payment: any) => ({
            id: payment.payment_id,
            amount: payment.total_amount / 100, // Convert cents to dollars
            currency: payment.currency,
            status: payment.status,
            date: payment.created_at,
            receipt_url: null // payment_link might be available but typically for paying, not receipt
        }));

        return NextResponse.json({ invoices });

    } catch (error: any) {
        console.error('[DODO_INVOICES]', error);
        if (error.message === 'Unauthorized') {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse(`Failed to fetch invoices: ${error.message}`, { status: 500 });
    }
}
