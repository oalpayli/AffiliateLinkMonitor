import type { Metadata } from 'next';
import AudiencePage from '@/components/AudiencePage';

export const metadata: Metadata = {
    title: 'Affiliate Link Monitor for YouTube Creators — Protect Description Link Commissions',
    description: 'Monitor your YouTube description affiliate links automatically. Get instant alerts when Amazon products go out of stock or links return 404. Free plan available.',
    keywords: ['affiliate link monitor youtube', 'youtube creator affiliate link checker', 'youtube description affiliate link monitoring', 'youtube affiliate broken link alert'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/for/youtube-creators' },
    openGraph: {
        title: 'Affiliate Link Monitor for YouTube Creators',
        description: 'Protect your YouTube affiliate income. Monitor description links and get instant alerts when products break.',
        url: 'https://www.affiliatelinkmonitoring.com/for/youtube-creators',
    },
};

const config = {
    audienceName: 'YouTube Creators',
    slug: 'youtube-creators',
    headline: 'Affiliate Link Monitor for YouTube Creators',
    subheadline: 'YouTube videos rank for years. The affiliate links in your descriptions keep earning — until they don\'t. Products go out of stock, Amazon ASINs change, and you have no idea. We monitor every link and alert you the moment one fails.',
    badge: 'Built for YouTube Affiliates',
    painPoints: [
        { title: 'Old videos, new broken links', desc: 'A product review video from 18 months ago still gets daily views. The product it recommends was discontinued 6 months ago. Every viewer who clicks earns you nothing — and nobody told you.' },
        { title: 'Amazon products in descriptions are especially fragile', desc: 'Amazon links in YouTube descriptions are some of the highest-earning — and most likely to break. Product availability changes frequently, and Amazon doesn\'t notify affiliates.' },
        { title: 'Description links are set and forgotten', desc: 'You\'re focused on your next video, not auditing old descriptions. Manual checking across hundreds of videos is unrealistic. Automated monitoring catches everything passively.' },
    ],
    features: [
        'Monitor Amazon and any affiliate link from YouTube descriptions',
        'Detect out-of-stock products (not just 404 errors)',
        'Alert on ASIN changes and product discontinuation',
        'Email alert within 60 seconds of any link failure',
        'Hourly monitoring for videos currently in promotion (Pro)',
        'Bulk CSV import — upload all your description links at once',
        'Works with Amazon, B&H, Adorama, and any affiliate program',
        'Free tool: check any URL instantly without signup',
        'Free plan: 10 monitors, daily scans, no credit card',
    ],
    relatedTool: { label: 'Try Free Amazon Link Checker', href: '/tools/amazon-broken-link-checker' },
    relatedBlog: { label: 'Why Amazon Associates Links Stop Working (and How to Fix Them)', href: '/blog/amazon-associates-links-stop-working' },
    relatedMonitor: { label: 'Amazon Affiliate Link Monitoring Guide', href: '/monitor/amazon-affiliate-links' },
    canonicalUrl: 'https://www.affiliatelinkmonitoring.com/for/youtube-creators',
};

export default function YouTubeCreatorsPage() {
    return <AudiencePage config={config} />;
}
