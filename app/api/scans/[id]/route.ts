import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const scan = await prisma.scan.findUnique({
            where: { id },
            include: {
                links: true,
            },
        });

        if (!scan) {
            return NextResponse.json(
                { error: 'Scan not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(scan);
    } catch (error) {
        console.error('API Error:', error);
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
        const { id } = await params;
        await prisma.scan.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Scan deleted' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to delete scan' },
            { status: 500 }
        );
    }
}
