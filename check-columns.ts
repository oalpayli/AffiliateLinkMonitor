
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const result = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'UserSubscription';
    `;
        console.log("Columns in UserSubscription table:", result);
    } catch (e: any) {
        console.log("Error checking columns:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
