'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle2, XCircle, AlertCircle, Zap, Search, Lock, Shield, Clock, BarChart3 } from 'lucide-react';
import { useSafePostHog } from '@/hooks/useSafePostHog';
import UpgradeDialog from '@/components/UpgradeDialog';

interface LinkResult {
    href: string;
    status: string;
    statusCode?: number;
    stockStatus?: string;
}

export default function LinkHealthScanner() {
    const posthog = useSafePostHog();
    const [scanUrl, setScanUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [links, setLinks] = useState<LinkResult[]>([]);
    const [scannedUrl, setScannedUrl] = useState('');
    const [error, setError] = useState('');
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
    const [upgradeMessage, setUpgradeMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const MAX_VISIBLE = 3; // Show only 3 results for free

    const handleScan = async () => {
        if (!scanUrl.trim()) return;

        posthog?.capture('health_scanner_started', {
            url_length: scanUrl.length,
            page: 'link-health-scanner',
        });

        setIsScanning(true);
        setError('');
        setLinks([]);
        setScannedUrl('');

        try {
            const res = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: scanUrl }),
            });

            if (!res.ok) {
                if (res.status === 429) {
                    const data = await res.json();
                    setUpgradeMessage(data.error || 'Scan limit reached. Sign up for more scans!');
                    setIsAuthenticated(data.isAuthenticated || false);
                    setShowUpgradeDialog(true);
                    setIsScanning(false);
                    return;
                }
                throw new Error('Scan failed');
            }

            const data = await res.json();
            setScannedUrl(data.url || scanUrl);
            setLinks(data.links || []);

            posthog?.capture('health_scanner_completed', {
                total_links: data.links?.length || 0,
                page: 'link-health-scanner',
            });
        } catch {
            setError('Scan failed. Please enter a valid URL.');
        } finally {
            setIsScanning(false);
        }
    };

    const totalLinks = links.length;
    const brokenLinks = links.filter(l => l.status === 'broken').length;
    const oosLinks = links.filter(l => l.stockStatus === 'out_of_stock').length;
    const healthyLinks = totalLinks - brokenLinks;
    const healthScore = totalLinks > 0 ? Math.round((healthyLinks / totalLinks) * 100) : 0;

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/15 rounded-[100%] blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10">
                {/* Hero */}
                <section className="pt-32 pb-16">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-8">
                            <Search className="h-4 w-4" />
                            100% Free Tool — No Signup Required
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Affiliate Link{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                Health Scanner
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Paste a direct affiliate link to check its health and stock status, or paste a blog post to scan all its links at once. Find 404s and out-of-stock products instantly.
                        </p>

                        {/* Scanner */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-2 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-2xl shadow-emerald-500/5">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="url"
                                        placeholder="https://amzn.to/xyz OR https://yourblog.com/article"
                                        value={scanUrl}
                                        onChange={(e) => setScanUrl(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                                        disabled={isScanning}
                                        className="flex-1 px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                                    />
                                    <button
                                        onClick={handleScan}
                                        disabled={isScanning || !scanUrl.trim()}
                                        className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[180px] bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                                    >
                                        {isScanning ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>Scanning...</span>
                                            </div>
                                        ) : (
                                            <>
                                                Scan Now — Free
                                                <ArrowRight className="h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="mt-3 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            setScanUrl('https://www.amazon.com/dp/B0BSHF7WHW');
                                            posthog?.capture('health_scanner_try_example');
                                        }}
                                        disabled={isScanning}
                                        className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                                    >
                                        <Zap className="h-3.5 w-3.5" />
                                        Try with example URL
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Results */}
                {links.length > 0 && (
                    <section className="pb-16">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                                {/* Health Score */}
                                <div className="text-center mb-8">
                                    <div className={`text-6xl font-bold mb-2 ${healthScore >= 80 ? 'text-emerald-400' : healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {healthScore}%
                                    </div>
                                    <p className="text-slate-400">Link Health Score</p>
                                    <p className="text-xs text-slate-500 mt-1">{scannedUrl}</p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-4 gap-3 mb-8">
                                    <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 text-center">
                                        <div className="text-xl font-bold">{totalLinks}</div>
                                        <div className="text-xs text-slate-400">Total</div>
                                    </div>
                                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                                        <div className="text-xl font-bold text-emerald-400">{healthyLinks}</div>
                                        <div className="text-xs text-emerald-200">Healthy</div>
                                    </div>
                                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                                        <div className="text-xl font-bold text-red-400">{brokenLinks}</div>
                                        <div className="text-xs text-red-200">Broken</div>
                                    </div>
                                    <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-center">
                                        <div className="text-xl font-bold text-yellow-400">{oosLinks}</div>
                                        <div className="text-xs text-yellow-200">Out of Stock</div>
                                    </div>
                                </div>

                                {/* Link List (Limited) */}
                                <h3 className="text-lg font-semibold mb-4">Link Details</h3>
                                <div className="space-y-2 mb-4">
                                    {links.slice(0, MAX_VISIBLE).map((link, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                                            {link.status === 'broken' ? (
                                                <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                            ) : (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                            )}
                                            <span className="text-sm text-slate-300 truncate flex-1">{link.href}</span>
                                            <span className={`text-xs font-mono px-2 py-0.5 rounded ${link.status === 'broken' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                                {link.statusCode || (link.status === 'broken' ? 'ERR' : 'OK')}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Blurred / Locked Results */}
                                {totalLinks > MAX_VISIBLE && (
                                    <div className="relative">
                                        <div className="space-y-2 opacity-20 blur-sm pointer-events-none">
                                            {links.slice(MAX_VISIBLE, MAX_VISIBLE + 3).map((link, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                                                    <CheckCircle2 className="h-5 w-5 text-slate-400 flex-shrink-0" />
                                                    <span className="text-sm text-slate-300 truncate">{link.href}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Lock className="h-8 w-8 text-violet-400 mb-3" />
                                            <p className="text-white font-semibold mb-1">
                                                +{totalLinks - MAX_VISIBLE} more links found
                                            </p>
                                            <p className="text-slate-400 text-sm mb-4">
                                                Sign up free to see the full report & get daily monitoring
                                            </p>
                                            <Link
                                                href="/signup"
                                                onClick={() => posthog?.capture('health_scanner_signup_cta', { total_links: totalLinks })}
                                                className="btn-primary px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
                                            >
                                                Unlock Full Report — Free
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Why Use This Tool */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                            Why scan your affiliate links?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <Shield className="h-6 w-6 text-emerald-400" />, title: "Protect Revenue", desc: "Every broken link is lost commission money" },
                                { icon: <BarChart3 className="h-6 w-6 text-violet-400" />, title: "Health Score", desc: "Get an instant overall link health percentage" },
                                { icon: <Clock className="h-6 w-6 text-indigo-400" />, title: "Takes 10 Seconds", desc: "Paste URL, click scan, see results instantly" },
                                { icon: <Zap className="h-6 w-6 text-yellow-400" />, title: "100% Free", desc: "No signup needed for instant scans" },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
                                    <div className="mb-4 p-2 bg-slate-950/50 rounded-lg w-fit border border-slate-800">{f.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                                    <p className="text-slate-400 text-sm">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 relative bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl font-bold mb-6">Want automatic daily monitoring?</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Set up 24/7 link monitoring and get email alerts when links break. Free plan includes 10 monitors.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 btn-primary px-10 py-4 rounded-xl font-semibold text-lg"
                        >
                            Start Free Monitoring
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </section>
            </div>

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Affiliate Link Health Scanner',
                        url: 'https://affiliatelinkmonitoring.com/tools/link-health-scanner',
                        applicationCategory: 'UtilitiesApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        description: 'Free online tool to scan any webpage for broken affiliate links, 404 errors, and out-of-stock products.',
                    }),
                }}
            />

            <UpgradeDialog
                isOpen={showUpgradeDialog}
                onClose={() => setShowUpgradeDialog(false)}
                isAuthenticated={isAuthenticated}
                message={upgradeMessage}
            />
        </div>
    );
}
