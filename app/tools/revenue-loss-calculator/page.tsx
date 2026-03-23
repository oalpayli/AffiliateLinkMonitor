import type { Metadata } from 'next';
import RevenueLossCalculator from './RevenueLossCalculator';

export const metadata: Metadata = {
    title: 'Affiliate Revenue Loss Calculator — How Much Are Broken Links Costing You?',
    description:
        'Free calculator to estimate how much revenue you lose from broken affiliate links. Enter your traffic, conversion rate, and commission to see your monthly and annual loss instantly.',
    keywords: [
        'affiliate revenue loss calculator',
        'broken affiliate link calculator',
        'affiliate link revenue calculator',
        'how much do broken links cost',
        'affiliate commission loss estimator',
        'affiliate link monitoring roi',
    ],
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator',
    },
    openGraph: {
        title: 'Affiliate Revenue Loss Calculator — See What Broken Links Are Costing You',
        description:
            'Adjust sliders for your traffic, conversion rate, and commission. Instantly see how much broken affiliate links are costing you per month and per year.',
        url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebPage',
            '@id': 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#webpage',
            url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator',
            name: 'Affiliate Revenue Loss Calculator — How Much Are Broken Links Costing You?',
            description:
                'Free calculator to estimate how much revenue you lose from broken affiliate links. Enter your traffic, conversion rate, and commission to see your monthly and annual loss instantly.',
            isPartOf: { '@id': 'https://www.affiliatelinkmonitoring.com/#website' },
            publisher: { '@id': 'https://www.affiliatelinkmonitoring.com/#organization' },
            inLanguage: 'en-US',
            breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://www.affiliatelinkmonitoring.com',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Tools',
                        item: 'https://www.affiliatelinkmonitoring.com/tools',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'Revenue Loss Calculator',
                        item: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator',
                    },
                ],
            },
        },
        {
            '@type': 'WebApplication',
            '@id': 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#tool',
            name: 'Affiliate Revenue Loss Calculator',
            url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            description:
                'Free interactive calculator that estimates monthly and annual affiliate commission loss caused by broken links. Adjust sliders for monthly traffic, conversion rate, average commission, number of links, and broken link percentage.',
            isPartOf: { '@id': 'https://www.affiliatelinkmonitoring.com/#app' },
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
            },
            featureList: [
                'Instant revenue loss calculation',
                'Adjustable sliders for traffic, conversion rate, and commission',
                'Broken link percentage estimation',
                'Monthly and annual loss projections',
                'Free to use — no credit card required',
            ],
            creator: {
                '@id': 'https://www.affiliatelinkmonitoring.com/#organization',
            },
        },
        {
            '@type': 'HowTo',
            '@id': 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#howto',
            name: 'How to Calculate Your Affiliate Revenue Loss from Broken Links',
            description:
                'Use this free calculator to estimate how much commission revenue your affiliate site is losing each month due to broken links, out-of-stock products, and dead pages.',
            totalTime: 'PT1M',
            tool: [
                {
                    '@type': 'HowToTool',
                    name: 'Affiliate Revenue Loss Calculator',
                    url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator',
                },
            ],
            step: [
                {
                    '@type': 'HowToStep',
                    position: 1,
                    name: 'Set your monthly site traffic',
                    text: 'Use the "Monthly Site Traffic" slider to enter the total number of unique visitors your affiliate site receives per month. The industry average for monetised blogs is between 5,000 and 50,000 visitors.',
                    url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#step-traffic',
                },
                {
                    '@type': 'HowToStep',
                    position: 2,
                    name: 'Enter your affiliate conversion rate',
                    text: 'Adjust the "Affiliate Conversion Rate" slider to match the percentage of visitors who click a link and complete a purchase. Amazon Associates sites typically see 1–3% conversion rates.',
                    url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#step-conversion',
                },
                {
                    '@type': 'HowToStep',
                    position: 3,
                    name: 'Set your average commission per sale',
                    text: 'Use the "Average Commission Per Sale" slider to enter the average dollar amount you earn per completed sale. Amazon affiliate commissions average $2–$5 per sale depending on product category.',
                    url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#step-commission',
                },
                {
                    '@type': 'HowToStep',
                    position: 4,
                    name: 'Enter the number of affiliate links on your site',
                    text: 'Set the "Number of Affiliate Links" slider to the total count of monetised links across your site. Include Amazon links, affiliate program links, and any other tracked URLs.',
                    url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#step-links',
                },
                {
                    '@type': 'HowToStep',
                    position: 5,
                    name: 'Estimate the percentage of broken links',
                    text: 'Use the "% of Links That Are Broken" slider to estimate how many of your links are currently broken, out of stock, or returning errors. Industry data shows ~15% of Amazon affiliate links break within 6 months.',
                    url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#step-broken',
                },
                {
                    '@type': 'HowToStep',
                    position: 6,
                    name: 'Review your estimated monthly and annual revenue loss',
                    text: 'The results panel updates in real time showing your estimated monthly revenue lost, annual revenue lost, number of broken links, and wasted clicks per month.',
                    url: 'https://www.affiliatelinkmonitoring.com/tools/revenue-loss-calculator#step-results',
                },
                {
                    '@type': 'HowToStep',
                    position: 7,
                    name: 'Fix broken links with automated monitoring',
                    text: 'Start a free Affiliate Link Monitor account to automatically detect broken links, out-of-stock products, and invalid affiliate tags. Get email alerts within 60 seconds of a link breaking so you can fix it before losing more commissions.',
                    url: 'https://www.affiliatelinkmonitoring.com/dashboard',
                },
            ],
        },
    ],
};

export default function RevenueLossCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <RevenueLossCalculator />
        </>
    );
}
