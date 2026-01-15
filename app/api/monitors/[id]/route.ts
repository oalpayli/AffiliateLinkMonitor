import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await requireAuth();
        const userId = user.id;

        const { id } = await params;

        // Verify the monitor belongs to the user
        const monitor = await prisma.monitor.findUnique({
            where: { id }
        });

        if (!monitor) {
            return NextResponse.json({ error: 'Monitor not found' }, { status: 404 });
        }

        if (monitor.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Delete associated links first (scans will cascade delete links, but let's be explicit)
        await prisma.link.deleteMany({
            where: {
                scan: {
                    monitorId: id
                }
            }
        });

        await prisma.scan.deleteMany({
            where: { monitorId: id }
        });

        // Delete the monitor
        await prisma.monitor.delete({
            where: { id }
        });

        return NextResponse.json({ success: true }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('[API] Error deleting monitor:', error);
        return NextResponse.json(
            { error: `Server Error: ${error.message || 'Unknown'}` },
            { status: 500 }
        );
    }
}
