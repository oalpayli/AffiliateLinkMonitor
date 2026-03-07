import type { Metadata } from 'next';
import MonitorPlatformPage from '@/components/MonitorPlatformPage';

export const metadata: Metadata = {
    title: 'Pinterest Affiliate Link Monitor — Detect Broken Pin Links Automatically',
    description: 'Monitor your Pinterest affiliate links 24/7. Get instant alerts when products go out of stock, pages return 404, or destination URLs change. Free plan available.',
    keywords: ['pinterest affiliate link monitor', 'monitor pinterest affiliate links', 'pinterest broken link checker', 'pinterest pin link monitoring'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor/pinterest-affiliate-links' },
    openGraph: {
        title: 'Pinterest Affiliate Link Monitor — Detect Broken Pin Links Automatically',
        description: 'Instant alerts when your Pinterest affiliate links break, products go out of stock, or destination pages return 404s.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor/pinterest-affiliate-links',
    },
};

const config = {
    platformName: 'Pinterest',
    slug: 'pinterest-affiliate-links',
    headline: 'Monitor Pinterest Affiliate Links — Protect Your Pin Traffic',
    subheadline: 'Pinterest pins live for years. A product link that worked when you pinned it can break 6 months later when the item goes out of stock. We watch every destination URL and alert you instantly.',
    badge: 'Pinterest Creator Link Monitoring',
    whatBreaks: [
        { title: 'Products go out of stock', desc: 'A pin linking to an Amazon or retailer product page stays live on Pinterest forever — but the product can go out of stock at any time. Clicks land on a dead-end page with zero commission potential.' },
        { title: 'Retailer pages removed or restructured', desc: 'Retailers update URLs and remove product pages constantly. Your evergreen pins now link to 404s, category pages, or homepages — ruining the conversion path.' },
        { title: 'Affiliate links expire or become invalid', desc: 'Affiliate tracking codes can expire, especially on time-limited promotions. Your pin still gets impressions but earns nothing because the tracking is dead.' },
    ],
    features: [
        'Monitor Pinterest pin destination URLs for 404s',
        'Detect out-of-stock product pages linked from pins',
        'Alert when product affiliate links expire',
        'Check Amazon, retailer, and direct affiliate links from pins',
        'Monitor evergreen pins from months or years ago',
        'Hourly, daily, or weekly scan frequency',
        'Email alerts within 60 seconds of a failure',
        'Works with LTK, Amazon, and any retailer link',
        'Free tool available: scan any URL instantly',
        'Free plan with 10 monitors — no credit card required',
    ],
    relatedTool: { label: 'Try Free Pinterest Link Monitor', href: '/tools/pinterest-link-monitor' },
    relatedBlog: { label: 'Can You Use Affiliate Links on Pinterest? Rules & Best Practices', href: '/blog/affiliate-links-on-pinterest' },
    relatedAudience: { label: 'Affiliate Link Monitor for Pinterest Creators', href: '/for/pinterest-creators' },
    faq: [
        { question: 'Why do Pinterest affiliate links break?', answer: 'Pinterest pins are permanent, but the products they link to are not. Products go out of stock, retailers remove pages, and affiliate tracking codes expire — while the pin keeps getting seen and clicked.' },
        { question: 'Can I monitor Amazon links that my Pinterest pins point to?', answer: 'Yes. If your Pinterest pins link to Amazon product pages (directly or via LTK), we monitor those destination URLs and alert you when they go out of stock or return errors.' },
        { question: 'How often should I check my Pinterest affiliate links?', answer: 'At minimum, weekly. For high-traffic pins on trending products (fashion, home decor, seasonal items), daily or hourly monitoring is recommended.' },
        { question: 'Does Affiliate Link Monitor work with LTK links on Pinterest?', answer: 'Yes. We can monitor any URL — including LTK destination links. If the product page the LTK link resolves to is broken, we\'ll alert you.' },
    ],
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/monitor/pinterest-affiliate-links',
};

export default function PinterestAffiliateLinkMonitorPage() {
    return <MonitorPlatformPage config={config} />;
}
