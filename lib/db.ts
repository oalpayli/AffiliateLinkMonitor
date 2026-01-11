import { PrismaClient } from '@prisma/client';

// Ensure env vars are loaded when running as script
// In Next.js this is automatic, but for scripts we might need it if not running via next/script
// However, let's assume process.env is populated or we rely on Next's loading if we imported 'dotenv'
// For now, let's try to just pass the url.

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
