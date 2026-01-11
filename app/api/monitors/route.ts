import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, frequency = 'daily', alertEmail } = body;

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        const monitor = await prisma.monitor.create({
            data: {
                url,
                frequency,
                alertEmail,
                nextRun: new Date() // Run immediately/soon
            }
        });

        return NextResponse.json(monitor, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to create monitor' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const monitors = await prisma.monitor.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { scans: true }
                }
            }
        });

        return NextResponse.json(monitors);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch monitors' },
            { status: 500 }
        );
    }
}
