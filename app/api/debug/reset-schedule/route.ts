import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const result = await prisma.monitor.updateMany({
            data: {
                nextRun: new Date(0) // Set to past (1970)
            }
        });

        return NextResponse.json({
            message: 'Reset all monitors to be due now',
            count: result.count
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
