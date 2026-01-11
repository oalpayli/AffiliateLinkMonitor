import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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
    } catch (error: any) {
        console.error('[API] Error deleting monitor:', error);
        return NextResponse.json(
            { error: `Server Error: ${error.message || 'Unknown'}` },
            { status: 500 }
        );
    }
}
