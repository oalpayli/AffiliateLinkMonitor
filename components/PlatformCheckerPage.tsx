'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Loader2, CheckCircle2, XCircle, AlertCircle, Zap, Shield, Clock, Mail, Lock } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import UpgradeDialog from '@/components/UpgradeDialog';

interface PlatformFAQ {
    question: string;
    answer: string;
}

interface PlatformConfig {
    platformName: string;
    slug: string;
    headline: string;
    subheadline: string;
    description: string;
    exampleUrl: string;
    exampleLabel: string;
    features: string[];
    faqs: PlatformFAQ[];
    jsonLd: object;
}

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

export default function PlatformCheckerPage({ config }: { config: PlatformConfig }) {
    const posthog = usePostHog();
    const [scanUrl, setScanUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState('');
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
    const [upgradeMessage, setUpgradeMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Email capture state
    const [captureEmail, setCaptureEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailSubmitting, setEmailSubmitting] = useState(false);

    const handleEmailCapture = async () => {
        if (!captureEmail.trim() || !captureEmail.includes('@')) return;

        setEmailSubmitting(true);
        try {
            posthog?.identify(captureEmail, {
                email: captureEmail,
                source: `tool_scan_${config.slug}`,
                broken_links: scanResult?.brokenLinks || 0,
                oos_links: scanResult?.oosLinks || 0,
                scanned_url: scanResult?.url || scanUrl,
            });
            posthog?.capture('scan_email_captured', {
                platform: config.slug,
                email: captureEmail,
                broken_links: scanResult?.brokenLinks || 0,
                oos_links: scanResult?.oosLinks || 0,
            });
            setEmailSubmitted(true);
        } catch {
            // Silently fail — PostHog will retry
        } finally {
            setEmailSubmitting(false);
        }
    };

    const handleScan = async () => {
        if (!scanUrl.trim()) return;

        posthog?.capture('platform_scan_started', {
            platform: config.slug,
            url_length: scanUrl.length,
            page: config.slug,
        });

        setIsScanning(true);
        setError('');
        setScanResult(null);

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
            const totalLinks = data.links?.length || 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const brokenLinks = data.links?.filter((l: any) => l.status === 'broken').length || 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const oosLinks = data.links?.filter((l: any) => l.stockStatus === 'out_of_stock').length || 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const affiliateLinks = data.links?.filter((l: any) =>
                l.href?.includes('amazon') || l.href?.includes('shareasale') || l.href?.includes('affiliate')
            ).length || 0;

            setScanResult({ url: data.url, totalLinks, affiliateLinks, brokenLinks, oosLinks, links: data.links || [] });

            posthog?.capture('platform_scan_completed', {
                platform: config.slug,
                total_links: totalLinks,
                broken_links: brokenLinks,
                page: config.slug,
            });
        } catch {
            setError('Scan failed. Please enter a valid URL.');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
                            <Activity className="h-4 w-4" />
                            Free {config.platformName} Link Checker
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                            {config.headline}
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            {config.subheadline}
                        </p>

                        {/* Scanner Box */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-2 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 shadow-2xl shadow-violet-500/5">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="url"
                                        placeholder={config.exampleUrl}
                                        value={scanUrl}
                                        onChange={(e) => setScanUrl(e.target.value)}
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
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>Scanning...</span>
                                            </div>
                                        ) : (
                                            <>
                                                Check Now
                                                <ArrowRight className="h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="mt-3 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            setScanUrl(config.exampleUrl);
                                            posthog?.capture('platform_try_example', { platform: config.slug });
                                        }}
                                        disabled={isScanning}
                                        className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 disabled:opacity-50"
                                    >
                                        <Zap className="h-3.5 w-3.5" />
                                        {config.exampleLabel}
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
                    </div>
                </section>

                {/* Scan Result */}
                {scanResult && (
                    <section className="pb-16">
                        <div className="container mx-auto px-4 max-w-2xl">
                            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                                    Scan Complete
                                </h3>
                                <p className="text-sm text-slate-400 break-all mb-6">{scanResult.url}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-center">
                                        <div className="text-2xl font-bold text-white">{scanResult.totalLinks}</div>
                                        <div className="text-xs text-slate-400">Total Links</div>
                                    </div>
                                    <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-center">
                                        <div className="text-2xl font-bold text-violet-400">{scanResult.affiliateLinks}</div>
                                        <div className="text-xs text-slate-400">Affiliate</div>
                                    </div>
                                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                                        <div className="text-2xl font-bold text-red-400">{scanResult.brokenLinks}</div>
                                        <div className="text-xs text-red-200">Broken</div>
                                    </div>
                                    <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-center">
                                        <div className="text-2xl font-bold text-yellow-400">{scanResult.oosLinks}</div>
                                        <div className="text-xs text-yellow-200">Out of Stock</div>
                                    </div>
                                </div>

                                {/* Revenue loss warning */}
                                {(scanResult.brokenLinks > 0 || scanResult.oosLinks > 0) && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                        <p className="text-sm text-red-200 text-center">
                                            ⚠️ <strong className="text-red-100">{scanResult.brokenLinks + scanResult.oosLinks} problematic link{scanResult.brokenLinks + scanResult.oosLinks !== 1 ? 's' : ''}</strong> could be costing you
                                            <strong className="text-red-100"> ~${(scanResult.brokenLinks + scanResult.oosLinks) * 15}/month</strong> in missed commissions.
                                        </p>
                                    </div>
                                )}

                                {/* Email capture */}
                                {!emailSubmitted ? (
                                    <div className="space-y-3">
                                        <p className="text-sm text-slate-300 text-center font-medium">
                                            {scanResult.brokenLinks > 0
                                                ? `We\'ll watch these ${scanResult.brokenLinks} broken link${scanResult.brokenLinks !== 1 ? 's' : ''} — get alerted when they\'re fixable.`
                                                : 'All clear! Get an email if any of these links break in the future.'}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-2">
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
                                                        Watch My Links
                                                        <ArrowRight className="h-4 w-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                                            <Lock className="h-3 w-3" />
                                            No spam. Only broken link alerts. Unsubscribe anytime.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-3">
                                        <div className="flex items-center justify-center gap-2 text-emerald-400">
                                            <CheckCircle2 className="h-5 w-5" />
                                            <span className="font-semibold">You&apos;re all set!</span>
                                        </div>
                                        <p className="text-sm text-slate-400">We&apos;ll email you at <strong className="text-slate-300">{captureEmail}</strong> when any of these links break.</p>
                                        <Link
                                            href="/dashboard"
                                            className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                                        >
                                            Or set up full monitoring now →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Features */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                            Why use our {config.platformName} link checker?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <Shield className="h-6 w-6 text-violet-400" />, title: "99.9% Accurate", desc: "Advanced detection with real browser rendering" },
                                { icon: <Clock className="h-6 w-6 text-indigo-400" />, title: "24/7 Monitoring", desc: "Hourly, daily, or weekly automated checks" },
                                { icon: <Mail className="h-6 w-6 text-blue-400" />, title: "Instant Alerts", desc: "Email notification within 60 seconds" },
                                { icon: <Zap className="h-6 w-6 text-yellow-400" />, title: "Free Plan", desc: "Monitor up to 10 links for free, forever" },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all">
                                    <div className="mb-4 p-2 bg-slate-950/50 rounded-lg w-fit border border-slate-800">{f.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                                    <p className="text-slate-400 text-sm">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Platform-specific features */}
                <section className="py-24 relative bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                            What we check for {config.platformName}
                        </h2>
                        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">{config.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {config.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                    <span className="text-slate-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                            Frequently Asked Questions about {config.platformName} Links
                        </h2>
                        <div className="space-y-4">
                            {config.faqs.map((faq, i) => (
                                <div key={i} className="border border-slate-800 rounded-xl bg-slate-900/50 hover:border-violet-500/30 transition-all overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left gap-4"
                                    >
                                        <span className="font-semibold text-white">{faq.question}</span>
                                        <span className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="px-6 pb-4 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 relative bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Stop losing money to broken {config.platformName} links
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Set up monitoring in 30 seconds. No credit card required.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 btn-primary px-10 py-4 rounded-xl font-semibold text-lg transition-all"
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(config.jsonLd) }}
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
