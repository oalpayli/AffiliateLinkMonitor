import type { Metadata } from 'next';
import MonitorPlatformPage from '@/components/MonitorPlatformPage';

export const metadata: Metadata = {
    title: 'Linktree Affiliate Link Monitor — Detect Broken Bio Links Automatically',
    description: 'Monitor every affiliate link in your Linktree 24/7. Get instant alerts when product pages go out of stock, links return 404, or destination URLs change. Free plan available.',
    keywords: ['linktree affiliate link monitor', 'monitor linktree links', 'linktree broken link checker', 'linktree link monitoring', 'bio link affiliate monitor'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor/linktree-links' },
    openGraph: {
        title: 'Linktree Affiliate Link Monitor — Detect Broken Bio Links Automatically',
        description: 'Instant alerts when your Linktree affiliate links break or products go out of stock.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor/linktree-links',
    },
};

const config = {
    platformName: 'Linktree',
    slug: 'linktree-links',
    headline: 'Monitor Linktree Affiliate Links — One Broken Link Costs You Everything',
    subheadline: 'Your Linktree is the only link your followers see. If any affiliate link on it breaks, you\'re losing traffic from every platform. We monitor every destination URL and alert you within 60 seconds.',
    badge: 'Bio Link Monitoring',
    whatBreaks: [
        { title: 'Products go out of stock', desc: 'Your top-performing Linktree affiliate link points to an Amazon or brand product that suddenly goes out of stock. Every follower who clicks earns you nothing — and you have no idea.' },
        { title: 'Destination URLs change', desc: 'Brands and retailers restructure their sites and change product URLs. Your Linktree link still shows the old URL — now a dead page or a generic redirect.' },
        { title: 'Affiliate tracking codes expire', desc: 'Promotional affiliate links have expiry dates. The link in your Linktree may still appear to work but the tracking code is dead — your sales go unattributed.' },
    ],
    features: [
        'Monitor all affiliate links in your Linktree profile',
        'Detect 404 errors and expired destination URLs',
        'Alert on out-of-stock product pages in your bio links',
        'Check Amazon, brand, and retailer links automatically',
        'Hourly, daily, or weekly monitoring options',
        'Email alerts within 60 seconds of any failure',
        'Works with Linktree, Later, Koji, and any bio link tool',
        'Free tool: scan your Linktree profile instantly',
        'Free plan with 10 monitors — no credit card required',
    ],
    relatedTool: { label: 'Try Free Linktree Link Checker', href: '/tools/linktree-link-checker' },
    relatedBlog: { label: 'Does Linktree Hurt Your Affiliate Commissions?', href: '/blog/does-linktree-hurt-affiliate-commissions' },
    relatedAudience: { label: 'Affiliate Link Monitor for Instagram Creators', href: '/for/instagram-creators' },
    faq: [
        { question: 'Why are my Linktree affiliate links breaking?', answer: 'Linktree itself is fine — it\'s the destination URLs that break. Products go out of stock, brands change their URLs, and affiliate tracking codes expire. Your Linktree profile just keeps pointing to the old (now broken) URL.' },
        { question: 'How often should I check my Linktree links?', answer: 'Daily minimum. If you\'re running promotional or seasonal affiliate links, hourly monitoring is recommended because product availability can change quickly.' },
        { question: 'Does this work with bio link tools other than Linktree?', answer: 'Yes. We monitor any URL — you can add links from Linktree, Later Link in Bio, Koji, Beacons, or any bio link tool. Just paste the destination affiliate URLs.' },
        { question: 'Will you alert me if just one of my Linktree links breaks?', answer: 'Yes. Each link is monitored individually. If one breaks, you get an immediate alert specifying exactly which link failed and why.' },
    ],
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/monitor/linktree-links',
};

export default function LinktreeLinkMonitorPage() {
    return <MonitorPlatformPage config={config} />;
}
