import { NextResponse } from 'next/server';
import { sendSupportEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Simple validation
        if (!name || !email || !subject || !message) {
            console.error('Missing fields:', { name, email, subject, message });
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send email
        await sendSupportEmail(email, name, subject, message);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in contact route:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
