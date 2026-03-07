import type { Metadata } from 'next';
import MonitorPlatformPage from '@/components/MonitorPlatformPage';

export const metadata: Metadata = {
    title: 'AWIN Affiliate Link Monitor — Automated Broken Link Detection',
    description: 'Monitor your AWIN affiliate links 24/7. Get instant alerts when advertisers leave, products are removed, or tracking links stop working. Free plan available.',
    keywords: ['awin affiliate link monitor', 'awin link checker', 'monitor awin links', 'awin broken link detection', 'awin affiliate monitoring'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor/awin-links' },
    openGraph: {
        title: 'AWIN Affiliate Link Monitor — Automated Broken Link Detection',
        description: 'Instant alerts when your AWIN affiliate links break or advertisers leave the network.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor/awin-links',
    },
};

const config = {
    platformName: 'AWIN',
    slug: 'awin-links',
    headline: 'Monitor AWIN Affiliate Links — Never Miss a Broken Link',
    subheadline: 'AWIN advertisers pause programs, remove products, and restructure sites without alerting publishers. We scan every link automatically and notify you the moment one fails.',
    badge: 'AWIN Publisher Link Monitoring',
    whatBreaks: [
        { title: 'Advertisers pause or close programs', desc: 'AWIN advertisers can pause or close their affiliate programs at any time. When they do, your tracking links stop generating commissions — often without any notification to publishers.' },
        { title: 'Product pages removed or restructured', desc: 'Advertisers regularly update their site structure and remove product pages. Your deep link may now return a 404 or redirect to a category page with no direct conversion path.' },
        { title: 'Regional program changes', desc: 'AWIN operates across many regions. Advertisers may deactivate their program in your target region while leaving others active — breaking location-specific links silently.' },
    ],
    features: [
        'Monitor AWIN deep links and custom tracking links',
        'Detect 404 errors and redirect-to-homepage failures',
        'Alert when advertiser programs are paused or closed',
        'Track link health across all your AWIN advertisers',
        'Support for all AWIN regional markets (UK, DE, FR, US, etc.)',
        'Hourly, daily, or weekly scan frequency',
        'Email alert within 60 seconds of detection',
        'Bulk CSV import for publishers with hundreds of links',
        'Platform-agnostic — monitor AWIN and other networks together',
        'Free plan with 10 monitors — no credit card required',
    ],
    relatedTool: { label: 'Try Free Link Scanner', href: '/tools/link-health-scanner' },
    relatedBlog: { label: 'How Often Should You Check Your Affiliate Links?', href: '/blog/how-often-to-check-affiliate-links' },
    relatedAudience: { label: 'Affiliate Link Monitor for Affiliate Agencies', href: '/for/affiliate-agencies' },
    faq: [
        { question: 'Does this work with AWIN tracking links?', answer: 'Yes. We follow AWIN\'s redirect chain and check the health of the final destination URL. If the merchant\'s product page returns a 404 or has been removed, you\'ll get an immediate alert.' },
        { question: 'Does it work across all AWIN regions?', answer: 'Yes. We check the actual destination URLs regardless of region. Whether your AWIN links point to UK, German, French, or US merchant sites, we monitor them all.' },
        { question: 'Can I monitor AWIN and other network links together?', answer: 'Yes. Affiliate Link Monitor is entirely network-agnostic. AWIN, ShareASale, CJ, Amazon — all in one dashboard.' },
    ],
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/monitor/awin-links',
};

export default function AWINLinkMonitorPage() {
    return <MonitorPlatformPage config={config} />;
}
