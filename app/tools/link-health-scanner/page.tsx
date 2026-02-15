import type { Metadata } from 'next';
import LinkHealthScanner from './LinkHealthScanner';

export const metadata: Metadata = {
    title: 'Free Affiliate Link Health Scanner — Check Any Page Instantly',
    description:
        'Free online tool to scan any webpage for broken affiliate links, 404 errors, and out-of-stock products. Get a full link health report in seconds. No signup required.',
    keywords: [
        'affiliate link health scanner',
        'free link checker',
        'broken link scanner',
        'affiliate link checker free',
        'website link health check',
        'free broken link checker',
        'link health report',
        'scan affiliate links',
    ],
    alternates: {
        canonical: 'https://affiliatelinkmonitoring.com/tools/link-health-scanner',
    },
    openGraph: {
        title: 'Free Affiliate Link Health Scanner',
        description: 'Scan any webpage for broken links, 404 errors, and out-of-stock products. Free & instant.',
        url: 'https://affiliatelinkmonitoring.com/tools/link-health-scanner',
    },
};

export default function LinkHealthScannerPage() {
    return <LinkHealthScanner />;
}
