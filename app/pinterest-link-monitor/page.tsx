import type { Metadata } from 'next';
import PlatformCheckerPage from '@/components/PlatformCheckerPage';

export const metadata: Metadata = {
    title: 'Pinterest Link Monitor — Check Your Pin Links',
    description:
        'Free Pinterest link checker tool. Verify that your Pinterest pin destination URLs still work. Detect broken links, redirects, and dead pages. No signup required.',
    keywords: [
        'pinterest link monitor',
        'pinterest link checker',
        'check pinterest links',
        'pinterest broken links',
        'pinterest pin link checker',
        'pinterest affiliate link monitor',
        'pinterest url checker',
    ],
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/pinterest-link-monitor',
    },
    openGraph: {
        title: 'Pinterest Link Monitor — Check Your Pin Links',
        description: 'Free tool to verify your Pinterest pin destination URLs. Detect broken links and dead pages instantly.',
        url: 'https://www.affiliatelinkmonitoring.com/pinterest-link-monitor',
    },
};

const config = {
    platformName: 'Pinterest',
    slug: 'pinterest-link-monitor',
    headline: 'Check Your Pinterest Links for Broken URLs and Dead Pages',
    subheadline:
        'Paste your Pinterest profile or pin URL and we\'ll verify every destination link is still working.',
    description:
        'Pinterest pins drive traffic for months — sometimes years — after you post them. But the destination URLs can break over time. A broken link means wasted traffic and lost affiliate commissions. Our tool checks every link so you can fix issues fast.',
    exampleUrl: 'https://pinterest.com/yourusername',
    exampleLabel: 'Try with a Pinterest link',
    features: [
        'Verify destination URLs from Pinterest pins',
        'Detect 404 errors and dead landing pages',
        'Check affiliate links in pin descriptions',
        'Monitor links across entire Pinterest boards',
        'Detect redirect chain issues',
        'Find pins linking to out-of-stock products',
        'Track broken links on Pinterest profile pages',
        'Get email alerts when Pinterest links break',
    ],
    faqs: [
        {
            question: 'Why should I monitor my Pinterest links?',
            answer: 'Pinterest pins can drive traffic for months or years after posting. During that time, destination URLs can break — products get removed, pages get deleted, or domains expire. Monitoring ensures your pins always lead to working pages so you never waste that valuable Pinterest traffic.',
        },
        {
            question: 'Can Pinterest shadowban me for broken links?',
            answer: 'While Pinterest doesn\'t officially confirm shadowbanning, multiple broken links can reduce your pin distribution and reach. Pinterest prioritizes high-quality content and working links. Keeping your links healthy is one way to maintain strong pin performance.',
        },
        {
            question: 'How do I check links on a Pinterest board?',
            answer: 'Simply paste your Pinterest board URL into our scanner. We\'ll crawl the page and check every destination link on that board for errors, broken pages, and availability issues.',
        },
        {
            question: 'Do you support Pinterest affiliate links?',
            answer: 'Yes! We check all types of links found on Pinterest pages, including direct affiliate links, shortened URLs, and redirect links. If the final destination returns an error, we\'ll catch it.',
        },
        {
            question: 'Is the Pinterest link checker free?',
            answer: 'Yes! Scan any Pinterest URL for free right now. For ongoing monitoring, our free plan includes 10 monitors. Pro plan ($12/month) supports 60 monitors with hourly checks.',
        },
    ],
    jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://www.affiliatelinkmonitoring.com/pinterest-link-monitor#webpage',
                url: 'https://www.affiliatelinkmonitoring.com/pinterest-link-monitor',
                name: 'Pinterest Link Monitor — Check Your Pin Links for Errors',
                description: 'Free Pinterest link checker tool. Verify that your Pinterest pin destination URLs still work.',
                isPartOf: { '@id': 'https://www.affiliatelinkmonitoring.com/#website' },
                publisher: { '@id': 'https://www.affiliatelinkmonitoring.com/#organization' },
                inLanguage: 'en-US',
                breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com' },
                        { '@type': 'ListItem', position: 2, name: 'Pinterest Link Monitor', item: 'https://www.affiliatelinkmonitoring.com/pinterest-link-monitor' },
                    ],
                },
            },
            {
                '@type': 'WebApplication',
                '@id': 'https://www.affiliatelinkmonitoring.com/pinterest-link-monitor#tool',
                name: 'Pinterest Link Monitor',
                url: 'https://www.affiliatelinkmonitoring.com/pinterest-link-monitor',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                description: 'Free tool to verify Pinterest pin destination URLs. Detect broken links and dead pages instantly.',
                isPartOf: { '@id': 'https://www.affiliatelinkmonitoring.com/#app' },
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                },
            },
        ],
    },
};

export default function PinterestLinkMonitorPage() {
    return <PlatformCheckerPage config={config} />;
}
