import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
    let dbStatus = 'Pending';
    let dbError = null;
    let userCount = -1;

    try {
        userCount = await prisma.userSubscription.count();
        dbStatus = 'Connected';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        dbStatus = 'Failed';
        dbError = e.message + '\n' + e.stack;
    }

    return (
        <div className="p-10 font-mono text-sm">
            <h1 className="text-xl font-bold mb-4">System Diagnostics</h1>

            <div className="mb-4">
                <strong>Database Status:</strong> {dbStatus}
            </div>

            {dbError && (
                <div className="bg-red-900/50 p-4 rounded mb-4 whitespace-pre-wrap">
                    <strong className="text-red-300">DB Error:</strong>
                    {dbError}
                </div>
            )}

            <div>
                <strong>Subscription Count:</strong> {userCount}
            </div>

            <div className="mt-8 text-xs text-slate-500">
                Env Check: {process.env.DATABASE_URL ? 'URL Present' : 'URL Missing'}
            </div>
        </div>
    );
}
