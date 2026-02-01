'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, Zap, TrendingUp, Globe, Mail, Target, BarChart3, Loader2, CheckCircle2, XCircle, AlertCircle, Check } from "lucide-react";
import { usePostHog } from 'posthog-js/react';
import UpgradeDialog from '@/components/UpgradeDialog';
import Testimonials from '@/components/Testimonials';
import TrustSignals from '@/components/TrustSignals';
import FAQ from '@/components/FAQ';
import Team from '@/components/Team';
import ServiceAreas from '@/components/ServiceAreas';

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

export default function LandingPage() {
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

        // Track scan started
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

            // Track scan completed
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
            // Check if it's a rate limit error (429)
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
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-violet-500/30">

            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50 animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10">

                {/* Hero Section with Magic Box */}
                <section className="min-h-screen flex flex-col justify-center pt-20 pb-32 relative">
                    <div className="container mx-auto px-4 md:px-6 z-20">
                        <div className="max-w-4xl mx-auto text-center relative z-20">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                                24/7 Affiliate Link Monitoring <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">for Content Creators Worldwide</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto">
                                Never lose commissions to broken links & out-of-stock products again. We monitor 24/7 and alert you instantly.
                            </p>

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
                                            className="btn-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                        >
                                            {isScanning ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    Scanning...
                                                </>
                                            ) : (
                                                <>
                                                    Check Link
                                                    <ArrowRight className="h-5 w-5" />
                                                </>
                                            )}
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

                            <p className="text-sm text-slate-500 mb-8">
                                No credit card required • 10 monitors free • Setup in 30 seconds
                            </p>

                            {/* Trust Signals (Moved Above Fold) */}
                            <div className="mt-8">
                                <TrustSignals />
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[600px] z-10 pointer-events-none">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/hero-face.png"
                                    alt="Content Creator"
                                    fill
                                    className="object-contain drop-shadow-2xl opacity-80 mix-blend-lighten"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Logo Marquee */}
                <div className="w-full py-10 border-y border-slate-800/50 bg-slate-950/30 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10" />

                    <div className="flex gap-16 animate-scroll whitespace-nowrap min-w-full items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Duplicated list for infinite scroll effect */}
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-16 items-center">
                                <span className="text-2xl font-bold tracking-tighter">amazon</span>
                                <span className="text-xl font-bold tracking-wide">Hepsiburada</span>
                                <span className="text-2xl font-bold italic">TRENDYOL</span>
                                <span className="text-xl font-bold">BestBuy</span>
                                <span className="text-2xl font-serif">WIRED</span>
                                <span className="text-xl font-bold tracking-tight">Vogue</span>
                                <span className="text-2xl font-bold">ShareASale</span>
                                <span className="text-xl font-extrabold tracking-tighter">CommisionJunction</span>
                                <span className="text-2xl font-bold">ClickBank</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Problem Section */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Did you know?</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                stat="15%"
                                description="of affiliate links break within 6 months"
                            />
                            <StatCard
                                stat="404"
                                description="Amazon changes product URLs without warning"
                            />
                            <StatCard
                                stat="100%"
                                description="support for Amazon, Hepsiburada, BestBuy & Schema.org"
                            />
                            <StatCard
                                stat="$$$"
                                description="1 broken link = dozens of lost sales per month"
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-24 relative bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How it works</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <StepCard
                                number="1"
                                title="Paste Your URL"
                                description="Add pages you want monitored in seconds"
                                icon={<Globe className="h-8 w-8 text-violet-400" />}
                            />
                            <StepCard
                                number="2"
                                title="We Monitor 24/7"
                                description="Our bots check every link hourly or daily"
                                icon={<Activity className="h-8 w-8 text-indigo-400" />}
                            />
                            <StepCard
                                number="3"
                                title="Get Instant Alerts"
                                description="Email alert when something breaks"
                                icon={<Zap className="h-8 w-8 text-yellow-400" />}
                            />
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Everything you need to protect your income</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard
                                title="Never manually check again"
                                description="Automated hourly or daily scans run in the background while you sleep."
                                icon={<Activity className="h-6 w-6 text-violet-400" />}
                            />
                            <FeatureCard
                                title="Finds 404s & Out-of-Stock"
                                description="Advanced detection catches broken links and sold-out products."
                                icon={<AlertCircle className="h-6 w-6 text-red-400" />}
                            />
                            <FeatureCard
                                title="Get notified within 60 seconds"
                                description="Email alerts arrive instantly when a link status changes."
                                icon={<Mail className="h-6 w-6 text-blue-400" />}
                            />
                            <FeatureCard
                                title="Auto-detects affiliate links"
                                description="Recognizes Amazon, CJ, ShareASale patterns automatically."
                                icon={<Target className="h-6 w-6 text-emerald-400" />}
                            />
                            <FeatureCard
                                title="Broken links hurt rankings"
                                description="We prevent SEO damage by catching issues before Google does."
                                icon={<TrendingUp className="h-6 w-6 text-indigo-400" />}
                            />
                            <FeatureCard
                                title="Track all monitors in one view"
                                description="Dead-simple dashboard shows status at a glance."
                                icon={<BarChart3 className="h-6 w-6 text-violet-400" />}
                            />
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <Testimonials />

                {/* Service Areas */}
                <ServiceAreas />

                {/* Team */}
                <Team />

                {/* FAQ */}
                <FAQ />

                {/* Pricing */}
                <section className="py-24 relative bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
                            <p className="text-slate-400 text-lg">Start free. No credit card required. Upgrade when you grow.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <PricingCard
                                tier="Free"
                                price="$0"
                                period="forever"
                                features={[
                                    "10 monitors",
                                    "5 one-time scans per day",
                                    "Daily or Weekly scans",
                                    "Email alerts"
                                ]}
                                cta="Start Free"
                                href="/dashboard"
                            />
                            <PricingCard
                                tier="Pro"
                                price="$12"
                                period="per month"
                                features={[
                                    "60 monitors",
                                    "Unlimited scans",
                                    "Hourly, Daily, or Weekly scans",
                                    "Email alerts",
                                    "Bulk import"
                                ]}
                                cta="Upgrade"
                                href="/dashboard"
                                highlighted
                            />
                        </div>
                    </div>
                </section>

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
                                    <span><strong>{scanResult.oosLinks} products out of stock!</strong> Your visitors can't buy these.</span>
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
        </div>
    );
}

function StatCard({ stat, description }: { stat: string, description: string }) {
    return (
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all">
            <div className="text-4xl font-bold text-violet-400 mb-3">{stat}</div>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function StepCard({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mb-6">
                {icon}
            </div>
            <div className="text-sm font-mono text-violet-400 mb-2">Step {number}</div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group">
            <div className="mb-4 p-2 bg-slate-950/50 rounded-lg w-fit border border-slate-800 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function PricingCard({ tier, price, period, features, cta, href, highlighted }: { tier: string, price: string, period: string, features: string[], cta: string, href: string, highlighted?: boolean }) {
    return (
        <div className={`p-8 rounded-2xl border relative ${highlighted ? 'bg-gradient-to-b from-violet-500/10 to-slate-900/50 border-violet-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
            {highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                </div>
            )}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-bold">{price}</span>
                    <span className="text-slate-400">/{period.split(' ')[0]}</span>
                </div>
                <p className="text-sm text-slate-500">{period.split(' ')[1] || ''}</p>
            </div>
            <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                        <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Link
                href={href}
                className={`block text-center px-6 py-3 rounded-xl font-semibold transition-all ${highlighted ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
            >
                {cta}
            </Link>
        </div>
    );
}
