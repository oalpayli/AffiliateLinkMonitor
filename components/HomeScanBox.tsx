'use client';

import { useState } from 'react';
import { ArrowRight, Zap, AlertCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import Link from 'next/link';
import UpgradeDialog from '@/components/UpgradeDialog';

interface ScanResult {
    url: string;
    totalLinks: number;
    affiliateLinks: number;
    brokenLinks: number;
    oosLinks: number;
    links: Array<{
        href: string;
        status: string;
        statusCode?: number;
    }>;
}

export default function HomeScanBox() {
    const posthog = usePostHog();
    const [scanUrl, setScanUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState('');
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
    const [upgradeMessage, setUpgradeMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [scanStartTime, setScanStartTime] = useState<number>(0);

    const handleScan = async () => {
        if (!scanUrl.trim()) return;

        const startTime = Date.now();
        setScanStartTime(startTime);
        posthog?.capture('scan_started', {
            url_length: scanUrl.length,
            is_amazon_link: scanUrl.includes('amazon') || scanUrl.includes('amzn'),
            page: 'landing'
        });

        setIsScanning(true);
        setError('');
        setScanResult(null);

        try {
            const res = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: scanUrl })
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

            const totalLinks = data.links?.length || 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const brokenLinks = data.links?.filter((l: any) => l.status === 'broken').length || 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const oosLinks = data.links?.filter((l: any) => l.stockStatus === 'out_of_stock').length || 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const affiliateLinks = data.links?.filter((l: any) =>
                l.href?.includes('amazon') ||
                l.href?.includes('shareasale') ||
                l.href?.includes('cj.com') ||
                l.href?.includes('affiliate')
            ).length || 0;

            const result = {
                url: data.url,
                totalLinks,
                affiliateLinks,
                brokenLinks,
                oosLinks,
                links: data.links || []
            };

            setScanResult(result);

            posthog?.capture('scan_completed', {
                total_links: totalLinks,
                broken_links: brokenLinks,
                healthy_links: totalLinks - brokenLinks,
                out_of_stock: oosLinks,
                affiliate_links: affiliateLinks,
                scan_duration_ms: Date.now() - scanStartTime,
                has_broken_links: brokenLinks > 0,
                page: 'landing'
            });
        } catch (err) {
            if (err instanceof Response && err.status === 429) {
                const errorData = await err.json();
                setUpgradeMessage(errorData.error || 'Scan limit reached. Sign up for more scans!');
                setIsAuthenticated(errorData.isAuthenticated || false);
                setShowUpgradeDialog(true);
            } else {
                setError('Scan failed. Please enter a valid URL.');
            }
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <>
            {/* Magic Box */}
            <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-2 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 shadow-2xl shadow-violet-500/5">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="url"
                            placeholder="https://yourblog.com/article"
                            value={scanUrl}
                            onFocus={() => posthog?.capture('scan_input_focused', { page: 'landing' })}
                            onChange={(e) => {
                                setScanUrl(e.target.value);
                                if (e.target.value.length > 5) {
                                    posthog?.capture('scan_url_entered', {
                                        url_length: e.target.value.length,
                                        is_amazon_link: e.target.value.includes('amazon') || e.target.value.includes('amzn'),
                                        page: 'landing'
                                    });
                                }
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                            disabled={isScanning}
                            className="flex-1 px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all disabled:opacity-50"
                        />
                        <button
                            onClick={handleScan}
                            disabled={isScanning || !scanUrl.trim()}
                            className="btn-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[160px]"
                        >
                            {isScanning ? (
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Scanning...</span>
                                    </div>
                                    <span className="text-xs opacity-75 animate-pulse">
                                        Checking links
                                    </span>
                                </div>
                            ) : (
                                <>
                                    Check Link
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Try Example Button */}
                    <div className="mt-3 flex items-center justify-center gap-2">
                        <button
                            onClick={() => {
                                const exampleUrl = 'https://www.amazon.com/dp/B0BSHF7WHW';
                                setScanUrl(exampleUrl);
                                posthog?.capture('try_example_clicked', { page: 'landing' });
                                setTimeout(() => {
                                    if (!isScanning) {
                                        handleScan();
                                    }
                                }, 100);
                            }}
                            disabled={isScanning}
                            className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed py-4"
                        >
                            <Zap className="h-3.5 w-3.5" />
                            Try with example link
                        </button>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-xs text-slate-500">No signup required</span>
                    </div>
                </div>
                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
            </div>

            {/* Scan Result Modal */}
            {scanResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setScanResult(null)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl shadow-violet-500/20" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setScanResult(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <XCircle className="h-6 w-6" />
                        </button>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                                Scan Complete
                            </h3>
                            <p className="text-sm text-slate-400 break-all">{scanResult.url}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                <div className="text-3xl font-bold text-white mb-1">{scanResult.totalLinks}</div>
                                <div className="text-sm text-slate-400">Total Links</div>
                            </div>
                            <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-1">{scanResult.oosLinks}</div>
                                <div className="text-sm text-yellow-200">Out of Stock</div>
                            </div>
                            <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                <div className="text-3xl font-bold text-violet-400 mb-1">{scanResult.affiliateLinks}</div>
                                <div className="text-sm text-slate-400">Affiliate Links</div>
                            </div>
                            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                                <div className="text-3xl font-bold text-red-400 mb-1">{scanResult.brokenLinks}</div>
                                <div className="text-sm text-red-200">Broken Links</div>
                            </div>
                        </div>

                        {scanResult.brokenLinks > 0 && (
                            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-200 text-sm flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                    <span><strong>{scanResult.brokenLinks} broken links found!</strong> These links are dead ends.</span>
                                </p>
                            </div>
                        )}

                        {scanResult.oosLinks > 0 && (
                            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                <p className="text-yellow-200 text-sm flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                    <span><strong>{scanResult.oosLinks} products out of stock!</strong> Your visitors can&apos;t buy these.</span>
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/dashboard"
                                onClick={() => posthog?.capture('cta_clicked', {
                                    cta_location: 'scan_results',
                                    cta_text: 'Start Monitoring Free',
                                    has_broken_links: scanResult.brokenLinks > 0,
                                    broken_links_count: scanResult.brokenLinks,
                                    page: 'landing'
                                })}
                                className="flex-1 px-6 py-3 btn-primary rounded-xl font-semibold transition-all text-center flex items-center justify-center gap-2"
                            >
                                Start Monitoring Free
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <button
                                onClick={() => setScanResult(null)}
                                className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <UpgradeDialog
                isOpen={showUpgradeDialog}
                onClose={() => setShowUpgradeDialog(false)}
                isAuthenticated={isAuthenticated}
                message={upgradeMessage}
            />
        </>
    );
}
