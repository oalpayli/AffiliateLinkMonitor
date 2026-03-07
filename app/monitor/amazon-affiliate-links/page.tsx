import type { Metadata } from 'next';
import MonitorPlatformPage from '@/components/MonitorPlatformPage';

export const metadata: Metadata = {
    title: 'Amazon Affiliate Link Monitor — Automated 24/7 Broken Link Alerts',
    description: 'Automatically monitor your Amazon affiliate links 24/7. Get instant email alerts when a product goes out of stock, returns a 404, or an ASIN changes. Free plan available.',
    keywords: ['amazon affiliate link monitor', 'monitor amazon affiliate links', 'amazon broken link alert', 'amazon associates link monitoring', 'amazon asin change alert'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor/amazon-affiliate-links' },
    openGraph: {
        title: 'Amazon Affiliate Link Monitor — Automated 24/7 Broken Link Alerts',
        description: 'Get instant alerts when your Amazon affiliate links break, go out of stock, or change ASIN. Monitor 24/7 automatically.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor/amazon-affiliate-links',
    },
};

const config = {
    platformName: 'Amazon',
    slug: 'amazon-affiliate-links',
    headline: 'Monitor Amazon Affiliate Links — 24/7 Automatic Alerts',
    subheadline: 'Amazon products go out of stock, get discontinued, and change ASINs without warning. We watch your links around the clock and email you within 60 seconds when something breaks.',
    badge: 'Amazon Associates Monitoring',
    whatBreaks: [
        { title: 'Products go out of stock', desc: 'Amazon shows "Currently Unavailable" — your link still loads but earns zero commissions. This is the #1 silent revenue killer for Amazon affiliates.' },
        { title: 'ASIN changes or discontinuation', desc: 'The seller replaces the product with a new model under a different ASIN. Your link now leads to a dead page or the wrong product.' },
        { title: '404 errors and removed listings', desc: 'Amazon permanently removes the product listing. Every click is a wasted visit with no chance of a commission.' },
    ],
    features: [
        'Detect Amazon "Currently Unavailable" (out-of-stock) pages',
        'Alert on ASIN changes and product discontinuation',
        'Find 404 errors and removed product listings',
        'Check affiliate tag validity in every URL',
        'Monitor Amazon links across all country stores (US, UK, DE, TR, etc.)',
        'Hourly, daily, or weekly scan frequency',
        'Email alert within 60 seconds of a failure',
        'Bulk import via CSV for sites with hundreds of links',
        'Dashboard showing all link statuses at a glance',
        'Free plan with 10 monitors — no credit card required',
    ],
    relatedTool: { label: 'Try Free Amazon Checker', href: '/tools/amazon-broken-link-checker' },
    relatedBlog: { label: 'Why Amazon Associates Links Stop Working (and How to Fix Them)', href: '/blog/amazon-associates-links-stop-working' },
    relatedAudience: { label: 'Affiliate Link Monitor for Amazon Associates', href: '/for/amazon-associates' },
    faq: [
        { question: 'How often does Affiliate Link Monitor check my Amazon links?', answer: 'Free plan: daily or weekly. Pro plan ($12/month): hourly, daily, or weekly. Hourly is recommended for high-traffic pages because Amazon product availability can change multiple times per day.' },
        { question: 'Does it detect out-of-stock products, not just 404s?', answer: 'Yes. Most link checkers only catch 404s. We also detect Amazon\'s "Currently Unavailable" status, which silently kills commissions — the product page loads fine but no purchase is possible.' },
        { question: 'Does it work with all Amazon country stores?', answer: 'Yes. We support amazon.com, amazon.co.uk, amazon.de, amazon.fr, amazon.com.tr, and all other Amazon regional domains.' },
        { question: 'What happens when a broken link is detected?', answer: 'You get an email within 60 seconds with the exact URL, the error type (404, out-of-stock, ASIN change), and a link to your dashboard where you can update or replace the link.' },
    ],
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/monitor/amazon-affiliate-links',
};

export default function AmazonAffiliateLinkMonitorPage() {
    return <MonitorPlatformPage config={config} />;
}
