import type { Metadata } from 'next';
import AudiencePage from '@/components/AudiencePage';

export const metadata: Metadata = {
    title: 'Affiliate Link Monitor for Agencies — Manage Client Link Health at Scale',
    description: 'Monitor affiliate links across multiple client sites automatically. Bulk import, instant alerts, and link health dashboards for affiliate content agencies. Free plan available.',
    keywords: ['affiliate link monitor agencies', 'agency affiliate link checker', 'client affiliate link monitoring', 'affiliate content agency link health'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/for/affiliate-agencies' },
    openGraph: {
        title: 'Affiliate Link Monitor for Affiliate Agencies',
        description: 'Monitor client affiliate links at scale. Bulk import, instant alerts, and health dashboards across multiple sites.',
        url: 'https://www.affiliatelinkmonitoring.com/for/affiliate-agencies',
    },
};

const config = {
    audienceName: 'Affiliate Agencies',
    slug: 'affiliate-agencies',
    headline: 'Affiliate Link Monitor for Affiliate Agencies',
    subheadline: 'Managing affiliate content for multiple clients means hundreds of links across dozens of sites. One broken link costs a client revenue — and your reputation. We give you a scalable way to monitor every link and get alerts before clients notice problems.',
    badge: 'Built for Affiliate Content Agencies',
    painPoints: [
        { title: 'Client link health is your responsibility', desc: 'When a client\'s affiliate links break and they lose commissions, they blame the agency managing their content. You need a proactive way to catch issues before clients notice.' },
        { title: 'Manual audits don\'t scale', desc: 'With multiple clients and hundreds of links each, manual link audits are impossible to maintain. By the time you find a broken link, it\'s been losing commissions for weeks.' },
        { title: 'No single tool covers all affiliate networks', desc: 'Your clients may use Amazon, ShareASale, CJ, AWIN, and Impact — all at once. You need one tool that monitors all of them in a single dashboard.' },
    ],
    features: [
        'Monitor links across Amazon, ShareASale, CJ, AWIN, Impact, and more',
        'Bulk CSV import for efficient onboarding of new client sites',
        'Email alerts within 60 seconds — reach clients before issues escalate',
        'Dashboard showing link health across all monitored sites',
        'Detect out-of-stock products, 404 errors, and redirect failures',
        'Hourly scans for high-priority client content (Pro)',
        'Platform-agnostic — works with any CMS or affiliate network',
        'Pro plan at $12/month — 60 monitors per account',
        'Simple URL-based setup — no plugin installs for clients',
        '14-day money-back guarantee',
    ],
    relatedTool: { label: 'Try Free Link Health Scanner', href: '/tools/link-health-scanner' },
    relatedBlog: { label: 'Best Affiliate Link Monitoring Tools 2026', href: '/blog/best-affiliate-link-monitoring-tools' },
    relatedMonitor: { label: 'Multi-Network Monitoring: ShareASale Guide', href: '/monitor/shareasale-links' },
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/for/affiliate-agencies',
};

export default function AffiliateAgenciesPage() {
    return <AudiencePage config={config} />;
}
