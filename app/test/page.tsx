export const dynamic = 'force-dynamic';

export default async function TestPage() {
    return (
        <div className="p-10 font-mono text-sm bg-black text-green-400 min-h-screen">
            <h1 className="text-xl font-bold mb-4">Basic Test Page</h1>
            <p>If you see this, Next.js is working!</p>
            <p>Time: {new Date().toISOString()}</p>
            <p>Node Version: {process.version}</p>
            <p>DATABASE_URL exists: {process.env.DATABASE_URL ? 'YES' : 'NO'}</p>
            <p>CLERK_SECRET_KEY exists: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'YES' : 'NO'}</p>
        </div>
    );
}
