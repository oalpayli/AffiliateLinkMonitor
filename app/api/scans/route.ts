import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const scans = await prisma.scan.findMany({
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
        return NextResponse.json(
            { error: 'Failed to fetch scans' },
            { status: 500 }
        );
    }
}
