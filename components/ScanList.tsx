import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ExternalLink, Calendar, Link as LinkIcon } from 'lucide-react';
import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';
import RescanButton from './RescanButton';

async function getRecentScans() {
    const scans = await prisma.scan.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
            links: {
                select: { status: true, stockStatus: true }
            }
        }
    });
    return scans;
}

export default async function ScanList() {
    const scans = await getRecentScans();

    if (scans.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500">
                <p>No scans yet. Try your first one above!</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-violet-400" />
                Recent Scans
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
                {scans.map((scan) => {
                    const healthyCount = scan.links.filter(l => l.status === 'healthy').length;
                    const brokenCount = scan.links.filter(l => l.status === 'broken').length;
                    const totalCount = scan.links.length;

                    return (
                        <div
                            key={scan.id}
                            className="glass-card p-5 rounded-xl hover:bg-slate-800/80 transition-colors group relative"
                        >
                            <Link
                                href={`/scans/${scan.id}`}
                                className="absolute inset-0 z-0 rounded-xl"
                            >
                                <span className="sr-only">View scan details</span>
                            </Link>

                            <div className="relative z-10 pointer-events-none">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-medium truncate max-w-[200px] text-slate-200 group-hover:text-white" title={scan.url}>
                                        {scan.url.replace(/^https?:\/\//, '')}
                                    </h3>
                                    <div className="flex items-center gap-1 pointer-events-auto">
                                        <RescanButton url={scan.url} />
                                        <CopyButton text={scan.url} />
                                        <DeleteButton id={scan.id} />
                                        <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-violet-400 ml-1" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <LinkIcon className="h-3.5 w-3.5" />
                                        <span>{totalCount}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-700" />
                                    <div className="text-emerald-400">
                                        {healthyCount} <span className="text-slate-500 text-xs">OK</span>
                                    </div>
                                    <div className="text-rose-400">
                                        {brokenCount} <span className="text-slate-500 text-xs">Broken</span>
                                    </div>
                                    {/* @ts-expect-error - Prisma types */}
                                    {scan.links.some((l: any) => l.stockStatus === 'out_of_stock') && (
                                        <>
                                            <div className="h-4 w-px bg-slate-700" />
                                            <div className="text-amber-400">
                                                {/* @ts-expect-error - Prisma types */}
                                                {scan.links.filter((l: any) => l.stockStatus === 'out_of_stock').length} <span className="text-slate-500 text-xs">OOS</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="mt-3 text-xs text-slate-600">
                                    {new Date(scan.createdAt).toLocaleDateString()} at {new Date(scan.createdAt).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
