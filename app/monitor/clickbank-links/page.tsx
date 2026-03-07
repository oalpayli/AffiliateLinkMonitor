import type { Metadata } from 'next';
import MonitorPlatformPage from '@/components/MonitorPlatformPage';

export const metadata: Metadata = {
    title: 'ClickBank Affiliate Link Monitor — Detect Broken Hoplinks Instantly',
    description: 'Monitor your ClickBank hoplinks 24/7. Get instant alerts when products are removed from the marketplace, vendors deactivate, or links stop working. Free plan available.',
    keywords: ['clickbank affiliate link monitor', 'clickbank hoplink checker', 'monitor clickbank links', 'clickbank broken link detection'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor/clickbank-links' },
    openGraph: {
        title: 'ClickBank Affiliate Link Monitor — Detect Broken Hoplinks Instantly',
        description: 'Instant alerts when your ClickBank hoplinks break or products are removed from the marketplace.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor/clickbank-links',
    },
};

const config = {
    platformName: 'ClickBank',
    slug: 'clickbank-links',
    headline: 'Monitor ClickBank Hoplinks — Instant Alerts When Products Disappear',
    subheadline: 'ClickBank vendors discontinue products, deactivate accounts, and remove marketplace listings without warning. We watch every hoplink and alert you the moment one breaks.',
    badge: 'ClickBank Hoplink Monitoring',
    whatBreaks: [
        { title: 'Vendors remove products', desc: 'ClickBank vendors pull their products from the marketplace regularly — for refunds, updates, or business decisions. Your hoplinks stop converting immediately.' },
        { title: 'Sales page URLs change', desc: 'Vendors redesign their sales funnels and change page URLs without notifying affiliates. Your hoplink may redirect to a dead page or the ClickBank marketplace.' },
        { title: 'Affiliate program suspended', desc: 'If a vendor\'s ClickBank account is suspended, all affiliate hoplinks for their products stop working and commission tracking ends.' },
    ],
    features: [
        'Monitor ClickBank hoplinks for 404s and redirect failures',
        'Detect when vendor sales pages are removed or changed',
        'Alert on ClickBank marketplace listing removals',
        'Track hoplink health through ClickBank\'s redirect chain',
        'Monitor digital product and physical product links',
        'Hourly, daily, or weekly scan frequency',
        'Email alerts within 60 seconds of a break',
        'Works with any ClickBank product category (health, finance, software)',
        'Free plan with 10 monitors — no credit card required',
    ],
    relatedTool: { label: 'Try Free Link Scanner', href: '/tools/link-health-scanner' },
    relatedBlog: { label: 'How Often Should You Check Your Affiliate Links?', href: '/blog/how-often-to-check-affiliate-links' },
    relatedAudience: { label: 'Affiliate Link Monitor for Bloggers', href: '/for/bloggers' },
    faq: [
        { question: 'Does this work with ClickBank hoplinks?', answer: 'Yes. We monitor the full redirect chain behind ClickBank hoplinks and alert you when the final destination — the vendor\'s sales page — returns an error or is removed.' },
        { question: 'How quickly do I get alerted when a ClickBank link breaks?', answer: 'Pro plan users get alerted within 60 seconds. Free plan users are checked daily. For digital product affiliates where sales can spike any time, hourly monitoring is recommended.' },
        { question: 'Can I monitor links from ClickBank and other networks together?', answer: 'Yes. Affiliate Link Monitor is platform-agnostic. You can monitor ClickBank hoplinks, Amazon links, and ShareASale links all from the same dashboard.' },
    ],
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/monitor/clickbank-links',
};

export default function ClickBankLinkMonitorPage() {
    return <MonitorPlatformPage config={config} />;
}
