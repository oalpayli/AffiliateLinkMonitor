import { prisma } from './db';
import { getCurrentUser } from './auth';

const ANON_LIMIT = 2;
const FREE_LIMIT = 5;

export async function getIdentifier(request: Request, user?: { id: string } | null): Promise<string> {
    if (user) {
        return `user:${user.id}`;
    }

    // Get IP from headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'unknown';

    return `ip:${ip}`;
}

export async function checkScanLimit(identifier: string, isPro: boolean): Promise<{ allowed: boolean; remaining: number; limit: number }> {
    if (isPro) {
        return { allowed: true, remaining: -1, limit: -1 }; // Unlimited
    }

    const isUser = identifier.startsWith('user:');
    const limit = isUser ? FREE_LIMIT : ANON_LIMIT;

    // Get today's date (UTC midnight)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const usage = await prisma.scanUsage.findUnique({
        where: {
            identifier_date: {
                identifier,
                date: today
            }
        }
    });

    const currentCount = usage?.count || 0;
    const remaining = Math.max(0, limit - currentCount);

    return {
        allowed: currentCount < limit,
        remaining,
        limit
    };
}

export async function incrementScanCount(identifier: string): Promise<void> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await prisma.scanUsage.upsert({
        where: {
            identifier_date: {
                identifier,
                date: today
            }
        },
        update: {
            count: { increment: 1 }
        },
        create: {
            identifier,
            date: today,
            count: 1
        }
    });
}
