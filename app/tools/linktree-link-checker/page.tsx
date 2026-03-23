import type { Metadata } from 'next';
import PlatformCheckerPage from '@/components/PlatformCheckerPage';

export const metadata: Metadata = {
    title: 'Check Linktree Links — Free Linktree Link Checker Tool',
    description:
        'Free Linktree link checker. Verify every link in your Linktree profile works. Detect broken URLs, expired pages, and dead links.',
    keywords: [
        'check linktree links',
        'linktree link checker',
        'linktree broken links',
        'linktree link monitor',
        'verify linktree links',
        'linktree url checker',
        'linktree affiliate link checker',
    ],
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/tools/linktree-link-checker',
    },
    openGraph: {
        title: 'Check Linktree Links — Free Linktree Link Checker Tool',
        description: 'Free tool to verify every link in your Linktree profile works. Detect broken URLs and dead links.',
        url: 'https://www.affiliatelinkmonitoring.com/tools/linktree-link-checker',
    },
};

const config = {
    platformName: 'Linktree',
    slug: 'check-linktree-links',
    headline: 'Check Every Link in Your Linktree for Errors — Free',
    subheadline:
        'Paste your Linktree URL and we\'ll verify every single link on your profile page is still working.',
    description:
        'Your Linktree is often the only link in your social media bio. If any link on it is broken, you\'re losing traffic, followers, and revenue. Our tool scans every link on your Linktree page in seconds and tells you what\'s broken.',
    exampleUrl: 'https://linktr.ee/yourusername',
    exampleLabel: 'Try with a Linktree link',
    features: [
        'Check every link on your Linktree profile',
        'Detect 404 errors and expired pages',
        'Verify affiliate links in your Linktree',
        'Check shortened URLs and redirect chains',
        'Monitor Linktree links daily or hourly',
        'Detect links to out-of-stock products',
        'Validate social media profile links',
        'Get email alerts when any Linktree link breaks',
    ],
    faqs: [
        {
            question: 'Does Linktree hurt my affiliate commissions?',
            answer: 'Linktree itself doesn\'t hurt commissions, but having broken links on your Linktree definitely does. If a visitor clicks a dead link, you lose that potential sale forever. Regular monitoring ensures every link on your Linktree leads to a working page.',
        },
        {
            question: 'How do I check if my Linktree links work?',
            answer: 'Simply paste your Linktree URL (e.g., linktr.ee/yourusername) into our scanner above. We\'ll automatically check every link on your Linktree page and show you which ones are broken, redirecting, or pointing to out-of-stock products.',
        },
        {
            question: 'Can I monitor my Linktree links automatically?',
            answer: 'Yes! After scanning, you can set up automatic monitoring. We\'ll check your Linktree links daily (free plan) or hourly (Pro plan) and send you an email alert the moment any link breaks.',
        },
        {
            question: 'What types of Linktree links can you check?',
            answer: 'We check all types of links: affiliate links, social media profiles, website URLs, product pages, download links, and any other URL on your Linktree page. If it\'s a link, we can check it.',
        },
        {
            question: 'Is the Linktree link checker free?',
            answer: 'Yes! You can scan your Linktree page for free right now without creating an account. For ongoing daily monitoring, sign up for our free plan (10 monitors included).',
        },
    ],
    jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://www.affiliatelinkmonitoring.com/tools/linktree-link-checker#webpage',
                url: 'https://www.affiliatelinkmonitoring.com/tools/linktree-link-checker',
                name: 'Check Linktree Links — Free Linktree Link Checker Tool',
                description: 'Free Linktree link checker. Verify every link in your Linktree profile works. Detect broken URLs and dead links.',
                isPartOf: { '@id': 'https://www.affiliatelinkmonitoring.com/#website' },
                publisher: { '@id': 'https://www.affiliatelinkmonitoring.com/#organization' },
                inLanguage: 'en-US',
                breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com' },
                        { '@type': 'ListItem', position: 2, name: 'Check Linktree Links', item: 'https://www.affiliatelinkmonitoring.com/tools/linktree-link-checker' },
                    ],
                },
            },
            {
                '@type': 'WebApplication',
                '@id': 'https://www.affiliatelinkmonitoring.com/tools/linktree-link-checker#tool',
                name: 'Linktree Link Checker',
                url: 'https://www.affiliatelinkmonitoring.com/tools/linktree-link-checker',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Any',
                description: 'Free tool to verify every link in your Linktree profile. Detect broken URLs and dead pages instantly.',
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

export default function CheckLinktreeLinksPage() {
    return <PlatformCheckerPage config={config} />;
}
