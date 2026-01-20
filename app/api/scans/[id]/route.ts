import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await requireAuth();
        const { id } = await params;

        const scan = await prisma.scan.findUnique({
            where: { id },
            include: {
                links: true,
                monitor: true // For ownership validation
            },
        });

        if (!scan) {
            return NextResponse.json(
                { error: 'Scan not found' },
                { status: 404 }
            );
        }

        // Validate ownership
        if (scan.monitor && scan.monitor.userId !== user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        return NextResponse.json(scan);
    } catch (error) {
        console.error('API Error:', error);

        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch scan' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await requireAuth();
        const { id } = await params;

        // Find scan with ownership check in the query itself
        const scan = await prisma.scan.findFirst({
            where: {
                id,
                monitor: {
                    userId: user.id // Only find if belongs to user
                }
            },
            include: { monitor: true }
        });

        if (!scan) {
            return NextResponse.json(
                { error: 'Scan not found or unauthorized' },
                { status: 404 }
            );
        }

        await prisma.scan.delete({ where: { id } });
        return NextResponse.json({ message: 'Scan deleted' });

    } catch (error) {
        console.error('API Error:', error);

        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete scan' },
            { status: 500 }
        );
    }
}
