import { prisma } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, ExternalLink, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ScanPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const scan = await prisma.scan.findUnique({
        where: { id },
        include: { links: true }
    });

    if (!scan) {
        notFound();
    }

    const links = scan.links;
    const affiliateLinks = links.length;
    const healthyLinks = links.filter(l => l.status === 'healthy').length;
    const brokenLinks = links.filter(l => l.status === 'broken').length;
    const errorLinks = links.filter(l => l.status === 'error').length;

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header */}
            <header className="border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Dashboard</span>
                    </Link>
                    <div className="font-mono text-sm text-slate-500">
                        ID: {scan.id}
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Overview Card */}
                <div className="glass-card rounded-2xl p-8 mb-8 border-violet-500/20 shadow-violet-500/5">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 break-all text-white">
                        {scan.url}
                    </h1>
                    <p className="text-slate-400 mb-6">
                        Scanned on {new Date(scan.createdAt).toLocaleString()}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                            <div className="text-slate-400 text-sm mb-1">Total Affiliate Links</div>
                            <div className="text-2xl font-bold text-white">{affiliateLinks}</div>
                        </div>
                        <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-900/50">
                            <div className="text-emerald-400 text-sm mb-1">Healthy</div>
                            <div className="text-2xl font-bold text-emerald-400">{healthyLinks}</div>
                        </div>
                        <div className="bg-rose-950/30 rounded-xl p-4 border border-rose-900/50">
                            <div className="text-rose-400 text-sm mb-1">Broken</div>
                            <div className="text-2xl font-bold text-rose-400">{brokenLinks}</div>
                        </div>
                        <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-900/50">
                            <div className="text-amber-400 text-sm mb-1">Errors</div>
                            <div className="text-2xl font-bold text-amber-400">{errorLinks}</div>
                        </div>
                    </div>
                </div>

                {/* Links List */}
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-violet-400" />
                    Affiliate Links Found
                </h2>

                <div className="space-y-3">
                    {links.length === 0 ? (
                        <div className="glass-card p-8 rounded-xl text-center text-slate-500">
                            No affiliate links found on this page.
                        </div>
                    ) : (
                        links.map((link) => (
                            <div key={link.id} className="glass-card p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4 group hover:bg-slate-800/80 transition-colors">
                                <div className="flex-shrink-0">
                                    {link.status === 'healthy' && <CheckCircle className="h-6 w-6 text-emerald-500" />}
                                    {link.status === 'broken' && <XCircle className="h-6 w-6 text-rose-500" />}
                                    {link.status === 'error' && <AlertCircle className="h-6 w-6 text-amber-500" />}
                                </div>

                                <div className="flex-grow min-w-0">
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-200 font-medium hover:text-violet-400 hover:underline truncate block transition-colors">
                                        {link.href}
                                    </a>
                                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                        <span className="uppercase tracking-wider font-semibold">
                                            {link.status}
                                        </span>
                                        {link.statusCode && (
                                            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                                                HTTP {link.statusCode}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <a href={link.href} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-violet-600 hover:text-white text-slate-400 transition-colors">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
