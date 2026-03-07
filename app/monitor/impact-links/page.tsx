import type { Metadata } from 'next';
import MonitorPlatformPage from '@/components/MonitorPlatformPage';

export const metadata: Metadata = {
    title: 'Impact Affiliate Link Monitor — Automated Broken Link Detection',
    description: 'Monitor your Impact (impact.com) affiliate links 24/7. Get instant alerts when partners leave, product pages break, or tracking links fail. Free plan available.',
    keywords: ['impact affiliate link monitor', 'impact.com link checker', 'monitor impact affiliate links', 'impact radius broken link detection'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor/impact-links' },
    openGraph: {
        title: 'Impact Affiliate Link Monitor — Automated Broken Link Detection',
        description: 'Instant alerts when your Impact affiliate links break or brand partners change their programs.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor/impact-links',
    },
};

const config = {
    platformName: 'Impact',
    slug: 'impact-links',
    headline: 'Monitor Impact Affiliate Links — Catch Breaks Before Losing Commissions',
    subheadline: 'Impact.com brand partners restructure sites, remove products, and close programs without notifying publishers. We monitor every link and alert you within 60 seconds of any failure.',
    badge: 'impact.com Link Monitoring',
    whatBreaks: [
        { title: 'Brand partners restructure sites', desc: 'Impact partners (often large consumer brands) regularly redesign websites and update URL structures. Your deep links break without any notification sent to publishers.' },
        { title: 'Partnership contract changes', desc: 'Impact partnerships operate on contracts that can expire or be changed. If your partnership terms change or aren\'t renewed, tracking may stop silently.' },
        { title: 'Product or promotion pages removed', desc: 'Impact is commonly used for promoting specific deals and promotions. These pages have a limited lifespan — when they expire, your links 404 immediately.' },
    ],
    features: [
        'Monitor Impact tracking links and deep links',
        'Detect 404 errors and redirect failures',
        'Alert when partner promotion pages expire',
        'Track links across multiple Impact brand partners',
        'Hourly, daily, or weekly monitoring frequency',
        'Email alerts within 60 seconds of detection',
        'Bulk CSV import for publishers with large catalogs',
        'Works alongside your Impact dashboard',
        'Platform-agnostic — combine with Amazon, ShareASale, and more',
        'Free plan with 10 monitors — no credit card required',
    ],
    relatedTool: { label: 'Try Free Link Scanner', href: '/tools/link-health-scanner' },
    relatedBlog: { label: 'How Often Should You Check Your Affiliate Links?', href: '/blog/how-often-to-check-affiliate-links' },
    relatedAudience: { label: 'Affiliate Link Monitor for Affiliate Agencies', href: '/for/affiliate-agencies' },
    faq: [
        { question: 'Does this work with Impact (impact.com) tracking links?', answer: 'Yes. We monitor any URL, including Impact\'s tracking links. We follow the redirect chain and verify the health of the final destination page.' },
        { question: 'Impact partners are major brands — do they really break?', answer: 'Yes. Even large brands remove product pages, run limited-time promotions with expiry dates, and restructure their sites. These changes break affiliate deep links just as readily as smaller merchants.' },
        { question: 'Can I monitor Impact links alongside other networks?', answer: 'Yes. You can add Impact links, Amazon links, and links from any other affiliate network to the same Affiliate Link Monitor dashboard.' },
    ],
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/monitor/impact-links',
};

export default function ImpactLinkMonitorPage() {
    return <MonitorPlatformPage config={config} />;
}
