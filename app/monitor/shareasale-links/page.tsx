import type { Metadata } from 'next';
import MonitorPlatformPage from '@/components/MonitorPlatformPage';

export const metadata: Metadata = {
    title: 'ShareASale Affiliate Link Monitor — Automated Broken Link Alerts',
    description: 'Monitor your ShareASale affiliate links 24/7. Get instant alerts when merchants leave, products are removed, or links redirect incorrectly. Free plan available.',
    keywords: ['shareasale affiliate link monitor', 'monitor shareasale links', 'shareasale broken link checker', 'shareasale link monitoring'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor/shareasale-links' },
    openGraph: {
        title: 'ShareASale Affiliate Link Monitor — Automated Broken Link Alerts',
        description: 'Instant alerts when your ShareASale links break, merchants leave the network, or products are removed.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor/shareasale-links',
    },
};

const config = {
    platformName: 'ShareASale',
    slug: 'shareasale-links',
    headline: 'Monitor ShareASale Affiliate Links — Catch Breaks Before They Cost You',
    subheadline: 'ShareASale merchants come and go, and product pages get removed without warning. We watch every link 24/7 and send you an instant alert the moment something goes wrong.',
    badge: 'ShareASale Link Monitoring',
    whatBreaks: [
        { title: 'Merchants leave the network', desc: 'When a ShareASale merchant exits the program, all their affiliate links stop working instantly. Without monitoring, you won\'t know until a reader tells you.' },
        { title: 'Product pages removed', desc: 'Merchants remove products from their site regularly. Your affiliate link now returns a 404 or redirects to a homepage — no commission possible.' },
        { title: 'Affiliate program deactivated', desc: 'Merchants can deactivate their affiliate program at any time. Links may still resolve but tracking and commissions stop silently.' },
    ],
    features: [
        'Detect 404 errors on ShareASale merchant pages',
        'Alert when merchant programs are deactivated',
        'Monitor product page availability in real time',
        'Detect redirect chain changes on ShareASale links',
        'Track link health across multiple ShareASale merchants',
        'Hourly, daily, or weekly scan frequency',
        'Email alert within 60 seconds of a failure',
        'Bulk CSV import for large affiliate sites',
        'Works alongside your ShareASale dashboard',
        'Free plan with 10 monitors — no credit card required',
    ],
    relatedTool: { label: 'Try Free Link Scanner', href: '/tools/link-health-scanner' },
    relatedBlog: { label: 'How Often Should You Check Your Affiliate Links?', href: '/blog/how-often-to-check-affiliate-links' },
    relatedAudience: { label: 'Affiliate Link Monitor for Bloggers', href: '/for/bloggers' },
    faq: [
        { question: 'Does Affiliate Link Monitor work with ShareASale links?', answer: 'Yes. We monitor any URL — including ShareASale affiliate links with tracking parameters. We check the final destination URL health, not just the redirect.' },
        { question: 'How do I know when a ShareASale merchant leaves?', answer: 'When a merchant\'s program closes, their links usually return 404s or redirect to a generic page. Our tool detects both and sends you an immediate email alert.' },
        { question: 'Can I monitor all my ShareASale links at once?', answer: 'Yes. Use our bulk CSV import (Pro plan) to upload all your ShareASale links at once. We\'ll start monitoring them immediately.' },
        { question: 'How is this different from ShareASale\'s own dashboard?', answer: 'ShareASale\'s dashboard shows your commissions. It doesn\'t proactively alert you when individual links on your site break. We do — within 60 seconds.' },
    ],
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/monitor/shareasale-links',
};

export default function ShareASaleLinkMonitorPage() {
    return <MonitorPlatformPage config={config} />;
}
