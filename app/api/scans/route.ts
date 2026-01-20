import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
    try {
        const user = await requireAuth();

        // Get user's monitor IDs to filter scans
        const userMonitors = await prisma.monitor.findMany({
            where: { userId: user.id },
            select: { id: true }
        });

        const monitorIds = userMonitors.map(m => m.id);

        // Fetch only scans belonging to user's monitors
        const scans = await prisma.scan.findMany({
            where: {
                OR: [
                    { monitorId: { in: monitorIds } },
                    { monitorId: null } // Include orphaned scans if needed
                ]
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 50,
            include: {
                _count: {
                    select: { links: true },
                },
            },
        });

        return NextResponse.json(scans);
    } catch (error) {
        console.error('API Error:', error);

        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch scans' },
            { status: 500 }
        );
    }
}
