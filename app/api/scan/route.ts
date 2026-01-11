import { NextResponse } from 'next/server';
import { performFullScan } from '@/lib/scraper/service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        const scan = await performFullScan(url);

        return NextResponse.json(scan, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to perform scan' },
            { status: 500 }
        );
    }
}
