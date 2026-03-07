import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, Activity, Zap, TrendingUp, Globe, Mail, Target, BarChart3, AlertCircle, Check } from "lucide-react";
import type { Metadata } from "next";
import Testimonials from '@/components/Testimonials';
import TrustSignals from '@/components/TrustSignals';
import FAQ from '@/components/FAQ';
import Team from '@/components/Team';
import ServiceAreas from '@/components/ServiceAreas';
import LeadMagnet from '@/components/LeadMagnet';
import HomeScanBox from '@/components/HomeScanBox';

const BASE_URL = "https://www.affiliatelinkmonitoring.com";

export const metadata: Metadata = {
    alternates: {
        canonical: BASE_URL,
    },
    openGraph: {
        url: BASE_URL,
    },
};

// WebApplication schema — homepage only
const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}/#app`,
    name: "Affiliate Link Monitor",
    applicationCategory: "BusinessApplication",
    browserRequirements: "Requires JavaScript. Any modern browser.",
    operatingSystem: "Any",
    url: BASE_URL,
    image: `${BASE_URL}/logo.png`,
    description:
        "24/7 affiliate link monitoring tool that detects broken links and out-of-stock products. Get instant email alerts when your affiliate links break.",
    featureList:
        "24/7 automated link monitoring, broken link detection, out-of-stock product alerts, instant email notifications, Amazon link monitoring, Linktree link monitoring, Pinterest link monitoring, international link support, 60-second scan frequency, bulk import",
    offers: [
        {
            "@type": "Offer",
            name: "Free Plan",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2027-01-01",
            url: `${BASE_URL}/dashboard`,
        },
        {
            "@type": "Offer",
            name: "Pro Plan",
            price: "12",
            priceCurrency: "USD",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "12",
                priceCurrency: "USD",
                unitText: "MONTH",
            },
            availability: "https://schema.org/InStock",
            priceValidUntil: "2027-01-01",
            url: `${BASE_URL}/dashboard`,
        },
    ],
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "120",
        bestRating: "5",
        worstRating: "1",
    },
    review: [
        {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            author: { "@type": "Person", name: "Sarah Mitchell" },
            reviewBody:
                "Found 14 broken Amazon links in my first scan! Would've lost hundreds in commissions if I hadn't caught them. This tool pays for itself immediately.",
        },
        {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            author: { "@type": "Person", name: "Marcus Chen" },
            reviewBody:
                "I was manually checking links every week. Now I just get an email when something breaks. Saved me 5+ hours per month and never miss a broken link again.",
        },
        {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            author: { "@type": "Person", name: "Jessica Torres" },
            reviewBody:
                "The out-of-stock detection is a game-changer. I update my content immediately and my audience trusts me more. My CTR increased by 23% since using this.",
        },
    ],
    potentialAction: {
        "@type": "RegisterAction",
        target: `${BASE_URL}/dashboard`,
        name: "Sign up free",
        description: "Create a free account to start monitoring your affiliate links",
    },
};

// WebPage schema — homepage
const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "Affiliate Link Monitor — 24/7 Broken Link & Out-of-Stock Detection",
    description:
        "Never lose commissions to broken links & out-of-stock products again. Monitor your Amazon, Linktree, Pinterest and any affiliate links 24/7. Get instant email alerts. Free plan available.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#app` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-US",
    dateModified: "2026-03-05",
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-violet-500/30">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />

            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50 animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10">

                {/* Hero Section */}
                <section className="min-h-screen flex flex-col justify-center pt-20 pb-32 relative">
                    <div className="container mx-auto px-4 md:px-6 z-20">
                        <div className="max-w-4xl mx-auto text-center relative z-20">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                                24/7 Affiliate Link Monitoring <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">for Content Creators Worldwide</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto">
                                Never lose commissions to broken links &amp; out-of-stock products again. We monitor 24/7 and alert you instantly.
                            </p>

                            {/* Interactive scan box — client component */}
                            <Suspense fallback={
                                <div className="max-w-2xl mx-auto mb-6">
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-2 h-[88px] flex items-center justify-center">
                                        <span className="text-slate-500 text-sm">Loading scanner...</span>
                                    </div>
                                </div>
                            }>
                                <HomeScanBox />
                            </Suspense>

                            {/* Social Proof */}
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <div className="flex -space-x-2">
                                    <Image
                                        src="/avatars/user1.png"
                                        alt="Affiliate marketer using Affiliate Link Monitor"
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 rounded-full border-2 border-slate-950 object-cover"
                                    />
                                    <Image
                                        src="/avatars/user2.png"
                                        alt="Affiliate marketer using Affiliate Link Monitor"
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 rounded-full border-2 border-slate-950 object-cover"
                                    />
                                    <Image
                                        src="/avatars/user3.png"
                                        alt="Affiliate marketer using Affiliate Link Monitor"
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 rounded-full border-2 border-slate-950 object-cover"
                                    />
                                </div>
                                <p className="text-xs text-slate-400">
                                    <span className="text-white font-semibold">1,200+</span> creators monitoring links
                                </p>
                            </div>

                            <p className="text-sm text-slate-500 mb-8">
                                No credit card required • 10 monitors free • Setup in 30 seconds
                            </p>

                            {/* Trust Signals */}
                            <div className="mt-8">
                                <TrustSignals />
                            </div>
                        </div>
                    </div>
                </section>

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
                                description="checks any link on any page — with Amazon stock detection"
                            />
                            <StatCard
                                stat="$$$"
                                description="1 broken link = dozens of lost sales per month"
                            />
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-500/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-bl-full blur-2xl"></div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">How much money are you silently losing?</h3>
                            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                                Every out-of-stock product and broken link directly impacts your bottom line. Use our free calculator to see your true monthly revenue loss.
                            </p>
                            <Link href="/tools/revenue-loss-calculator" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold shadow-lg shadow-violet-500/25 transition-all">
                                <Activity className="h-5 w-5" /> Calculate Your Loss Now
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Lead Magnet */}
                <LeadMagnet />

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
                                description="Finds Amazon, Linktree, and any affiliate link on your page automatically."
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

                {/* Platform + Audience strip */}
                <section className="py-16 border-t border-white/5">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-6">Monitor by Platform</h2>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { label: 'Amazon', href: '/monitor/amazon-affiliate-links' },
                                        { label: 'Pinterest', href: '/monitor/pinterest-affiliate-links' },
                                        { label: 'Linktree', href: '/monitor/linktree-links' },
                                    ].map((p) => (
                                        <Link key={p.href} href={p.href} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-400 hover:text-white hover:border-violet-500/30 transition-all">
                                            {p.label}
                                        </Link>
                                    ))}
                                    <Link href="/monitor" className="px-3 py-1.5 rounded-lg text-sm text-violet-400 hover:text-violet-300 transition-colors">
                                        All platforms →
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-6">Built For</h2>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { label: 'Bloggers', href: '/for/bloggers' },
                                        { label: 'Amazon Associates', href: '/for/amazon-associates' },
                                        { label: 'Pinterest Creators', href: '/for/pinterest-creators' },
                                        { label: 'Instagram Creators', href: '/for/instagram-creators' },
                                        { label: 'YouTube Creators', href: '/for/youtube-creators' },
                                        { label: 'TikTok Creators', href: '/for/tiktok-creators' },
                                        { label: 'Niche Sites', href: '/for/niche-sites' },
                                        { label: 'Agencies', href: '/for/affiliate-agencies' },
                                    ].map((a) => (
                                        <Link key={a.href} href={a.href} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-400 hover:text-white hover:border-violet-500/30 transition-all">
                                            {a.label}
                                        </Link>
                                    ))}
                                    <Link href="/for" className="px-3 py-1.5 rounded-lg text-sm text-violet-400 hover:text-violet-300 transition-colors">
                                        All use cases →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
