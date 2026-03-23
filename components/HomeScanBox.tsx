'use client';

import { useState } from 'react';
import { ArrowRight, Zap, AlertCircle, CheckCircle2, XCircle, Loader2, Lock, Mail } from 'lucide-react';
import { useSafePostHog } from '@/hooks/useSafePostHog';
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
    const posthog = useSafePostHog();
    const [scanUrl, setScanUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState('');
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
    const [upgradeMessage, setUpgradeMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [scanStartTime, setScanStartTime] = useState<number>(0);
    const [wasExampleScan, setWasExampleScan] = useState(false);

    // Email capture state (Gated Results)
    const [captureEmail, setCaptureEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailSubmitting, setEmailSubmitting] = useState(false);

    const handleEmailCapture = async () => {
        if (!captureEmail.trim() || !captureEmail.includes('@')) return;

        setEmailSubmitting(true);
        try {
            posthog?.identify(captureEmail, {
                email: captureEmail,
                source: 'homepage_scan',
                broken_links: scanResult?.brokenLinks || 0,
                oos_links: scanResult?.oosLinks || 0,
                scanned_url: scanResult?.url || scanUrl,
            });
            posthog?.capture('scan_email_captured', {
                page_name: 'homepage',
                broken_links: scanResult?.brokenLinks || 0,
                oos_links: scanResult?.oosLinks || 0,
            });
            setEmailSubmitted(true);
            posthog?.capture('scan_results_unlocked', {
                page_name: 'homepage',
            });
        } catch {
            // Silently fail — PostHog will retry
        } finally {
            setEmailSubmitting(false);
        }
    };

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
        setEmailSubmitted(false);
        setCaptureEmail('');

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
                            placeholder="https://amzn.to/xyz OR https://yourblog.com/article"
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
                                setWasExampleScan(true);
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
                        <span className="text-xs text-slate-400">No signup required</span>
                    </div>
                </div>
                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
            </div>

            {/* Scan Result Modal — Gated */}
            {scanResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setScanResult(null)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl shadow-violet-500/20" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => { setScanResult(null); setWasExampleScan(false); }}
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

                        {/* Summary Stats — Always Visible */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                <div className="text-3xl font-bold text-white mb-1">{scanResult.totalLinks}</div>
                                <div className="text-sm text-slate-400">Total Links</div>
                            </div>
                            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                                <div className="text-3xl font-bold text-red-400 mb-1">{scanResult.brokenLinks}</div>
                                <div className="text-sm text-red-200">Broken Links</div>
                            </div>
                            <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-1">{scanResult.oosLinks}</div>
                                <div className="text-sm text-yellow-200">Out of Stock</div>
                            </div>
                        </div>

                        {/* Revenue Loss Warning */}
                        {(scanResult.brokenLinks > 0 || scanResult.oosLinks > 0) && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <p className="text-sm text-red-200 text-center">
                                    ⚠️ <strong className="text-red-100">{scanResult.brokenLinks + scanResult.oosLinks} problematic link{scanResult.brokenLinks + scanResult.oosLinks !== 1 ? 's' : ''}</strong> could be costing you
                                    <strong className="text-red-100"> ~${(scanResult.brokenLinks + scanResult.oosLinks) * 15}/month</strong> in missed commissions.
                                </p>
                            </div>
                        )}

                        {/* GATED SECTION: Email capture or full results */}
                        {!emailSubmitted ? (
                            /* Phase 1: Email Gate */
                            <div className="space-y-4">
                                <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-center">
                                    <Mail className="h-8 w-8 text-violet-400 mx-auto mb-3" />
                                    <p className="text-sm text-slate-300 font-medium mb-1">
                                        {scanResult.brokenLinks > 0
                                            ? `Get the full breakdown of your ${scanResult.brokenLinks} broken link${scanResult.brokenLinks !== 1 ? 's' : ''} + automatic monitoring alerts.`
                                            : 'Get notified instantly if any of these links break in the future.'}
                                    </p>
                                    <p className="text-xs text-slate-500 mb-4">
                                        Enter your email to unlock full results and start free monitoring.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                                        <input
                                            type="email"
                                            placeholder="you@email.com"
                                            value={captureEmail}
                                            onChange={(e) => setCaptureEmail(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleEmailCapture()}
                                            className="flex-1 px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                                        />
                                        <button
                                            onClick={handleEmailCapture}
                                            disabled={emailSubmitting || !captureEmail.trim()}
                                            className="btn-primary px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                                        >
                                            {emailSubmitting ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    Unlock Results
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                                        <Lock className="h-3 w-3" />
                                        No spam. Only broken link alerts. Unsubscribe anytime.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => posthog?.capture('cta_clicked', {
                                            cta_location: 'scan_results_gated',
                                            cta_text: 'Skip — Start Monitoring Free',
                                            page_name: 'homepage'
                                        })}
                                        className="text-sm text-slate-500 hover:text-violet-400 transition-colors"
                                    >
                                        Skip — Start Monitoring Free →
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            /* Phase 2: Full Results Unlocked */
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span className="font-semibold">Results unlocked!</span>
                                </div>

                                {/* Detailed Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 text-center">
                                        <div className="text-2xl font-bold text-violet-400">{scanResult.affiliateLinks}</div>
                                        <div className="text-xs text-slate-400">Affiliate Links</div>
                                    </div>
                                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                                        <div className="text-2xl font-bold text-emerald-400">{scanResult.totalLinks - scanResult.brokenLinks}</div>
                                        <div className="text-xs text-emerald-200">Healthy Links</div>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-400 text-center">
                                    We&apos;ll email you at <strong className="text-slate-300">{captureEmail}</strong> when any of these links break.
                                </p>

                                {/* Post-Example CTA (Aksiyon 2) */}
                                {wasExampleScan && (
                                    <div className="p-4 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl text-center">
                                        <p className="text-sm text-white font-medium mb-2">
                                            👆 That was just an example.
                                        </p>
                                        <p className="text-xs text-slate-400 mb-3">
                                            Your real links could be costing you $200+/month right now. Paste your blog URL above and find out.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setScanResult(null);
                                                setScanUrl('');
                                                setWasExampleScan(false);
                                                posthog?.capture('post_example_cta_clicked', { page_name: 'homepage' });
                                            }}
                                            className="text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                                        >
                                            Scan your own site now →
                                        </button>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => posthog?.capture('cta_clicked', {
                                            cta_location: 'scan_results_unlocked',
                                            cta_text: 'Start Monitoring Free',
                                            has_broken_links: scanResult.brokenLinks > 0,
                                            broken_links_count: scanResult.brokenLinks,
                                            page_name: 'homepage'
                                        })}
                                        className="flex-1 px-6 py-3 btn-primary rounded-xl font-semibold transition-all text-center flex items-center justify-center gap-2"
                                    >
                                        Start Monitoring Free
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={() => { setScanResult(null); setWasExampleScan(false); }}
                                        className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
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
