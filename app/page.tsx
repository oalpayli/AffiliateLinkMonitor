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

// SoftwareApplication schema — homepage only
const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Affiliate Link Monitor",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: BASE_URL,
    image: `${BASE_URL}/logo.png`,
    description:
        "24/7 affiliate link monitoring tool that detects broken links and out-of-stock products. Get instant email alerts when your affiliate links break.",
    offers: [
        {
            "@type": "Offer",
            name: "Free Plan",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2027-01-01",
        },
        {
            "@type": "Offer",
            name: "Pro Plan",
            price: "12",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2027-01-01",
        },
    ],
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "120",
        bestRating: "5",
        worstRating: "1",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How accurate is the affiliate link monitoring?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Our monitoring system checks your links multiple times per day using advanced detection algorithms. We verify HTTP status codes, detect redirects, and check product availability. We maintain 99.9% accuracy in detecting broken links and out-of-stock items.",
            },
        },
        {
            "@type": "Question",
            name: "What happens when an affiliate link breaks?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You'll receive an instant email alert within 60 seconds of detection. The alert includes the broken link URL, the page it's on, and the error type (404, out-of-stock, etc.). You can then quickly update your content before losing any significant commissions.",
            },
        },
        {
            "@type": "Question",
            name: "How often do you scan my affiliate links?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Free users get daily or weekly scans. Pro users can choose hourly, daily, or weekly monitoring frequency. You can set different frequencies for different monitors based on your needs.",
            },
        },
        {
            "@type": "Question",
            name: "Can I monitor international affiliate programs?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely! We support monitoring any link on any website worldwide. If it's a URL, we can monitor it — including Amazon links from any country, Linktree pages, Pinterest pins, and any blog or website.",
            },
        },
        {
            "@type": "Question",
            name: "Is my data secure with Affiliate Link Monitor?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We use enterprise-grade encryption and secure cloud infrastructure. We only store the URLs you want monitored — we never store your page content, images, or any other private data.",
            },
        },
        {
            "@type": "Question",
            name: "Why do affiliate links break?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Affiliate links break for several reasons: products get discontinued, merchants change URL structures, Amazon removes listings, affiliate programs shut down, or websites restructure their pages.",
            },
        },
    ],
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
