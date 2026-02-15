import type { Metadata } from 'next';
import PlatformCheckerPage from '@/components/PlatformCheckerPage';

export const metadata: Metadata = {
    title: 'Amazon Broken Link Checker — Find Dead Affiliate Links Instantly',
    description:
        'Free Amazon affiliate link checker. Scan your pages for broken Amazon links, out-of-stock products, and 404 errors. Get instant alerts when links break. No signup required.',
    keywords: [
        'amazon broken link checker',
        'amazon affiliate link checker',
        'check amazon links',
        'amazon associates link monitor',
        'broken amazon links',
        'amazon out of stock checker',
        'amazon product link checker',
    ],
    alternates: {
        canonical: 'https://affiliatelinkmonitoring.com/amazon-broken-link-checker',
    },
    openGraph: {
        title: 'Amazon Broken Link Checker — Find Dead Affiliate Links Instantly',
        description: 'Free tool to scan your pages for broken Amazon affiliate links and out-of-stock products. Get instant alerts.',
        url: 'https://affiliatelinkmonitoring.com/amazon-broken-link-checker',
    },
};

const config = {
    platformName: 'Amazon',
    slug: 'amazon-broken-link-checker',
    headline: 'Find Broken Amazon Affiliate Links Before You Lose Money',
    subheadline:
        'Paste any page URL and we\'ll instantly check every Amazon link for 404 errors, removed products, and out-of-stock items.',
    description:
        'Amazon frequently removes products, changes URLs, and updates stock status without warning. A single broken Amazon link can cost you dozens of missed commissions every month. Our tool catches these issues before your visitors do.',
    exampleUrl: 'https://www.amazon.com/dp/B0BSHF7WHW',
    exampleLabel: 'Try with an Amazon link',
    features: [
        'Detect Amazon 404 and removed product pages',
        'Check Amazon product stock status (in stock / out of stock)',
        'Find broken Amazon Associates tag links',
        'Scan blog posts with multiple Amazon links at once',
        'Monitor Amazon links across all country stores (US, UK, DE, TR, etc.)',
        'Detect Amazon redirect chains and URL changes',
        'Track ASIN validity and product availability',
        'Get instant email alerts when Amazon links break',
    ],
    faqs: [
        {
            question: 'Why do my Amazon affiliate links stop working?',
            answer: 'Amazon links break for many reasons: products get discontinued, sellers remove listings, ASINs become invalid, or Amazon restructures their URLs. About 15% of Amazon affiliate links become broken within 6 months. Regular monitoring catches these issues automatically.',
        },
        {
            question: 'How often should I check my Amazon affiliate links?',
            answer: 'We recommend at least daily checks for high-traffic pages. Our free plan offers daily or weekly scans, and our Pro plan supports hourly monitoring. Amazon product availability can change multiple times per day.',
        },
        {
            question: 'Can I check Amazon links from any country?',
            answer: 'Yes! We support Amazon links from all countries including amazon.com, amazon.co.uk, amazon.de, amazon.com.tr, and all other Amazon domains. Our tool works with any Amazon product URL format.',
        },
        {
            question: 'Do you detect out-of-stock Amazon products?',
            answer: 'Yes. Beyond simple broken link detection, we check if Amazon products are currently in stock. Out-of-stock products won\'t earn you commissions, so we alert you so you can recommend alternatives.',
        },
        {
            question: 'Is the Amazon link checker free?',
            answer: 'Yes! You can scan any page for free right now without signing up. For ongoing monitoring, our free plan includes 10 monitors with daily scans. Our Pro plan ($12/month) offers 60 monitors with hourly scans.',
        },
    ],
    jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Why do my Amazon affiliate links stop working?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Amazon links break for many reasons: products get discontinued, sellers remove listings, ASINs become invalid, or Amazon restructures their URLs. About 15% of Amazon affiliate links become broken within 6 months.',
                },
            },
            {
                '@type': 'Question',
                name: 'How often should I check my Amazon affiliate links?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We recommend at least daily checks for high-traffic pages. Amazon product availability can change multiple times per day.',
                },
            },
            {
                '@type': 'Question',
                name: 'Do you detect out-of-stock Amazon products?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Beyond simple broken link detection, we check if Amazon products are currently in stock and alert you so you can recommend alternatives.',
                },
            },
            {
                '@type': 'Question',
                name: 'Is the Amazon link checker free?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! You can scan any page for free right now without signing up. For ongoing monitoring, our free plan includes 10 monitors with daily scans.',
                },
            },
        ],
    },
};

export default function AmazonBrokenLinkCheckerPage() {
    return <PlatformCheckerPage config={config} />;
}
