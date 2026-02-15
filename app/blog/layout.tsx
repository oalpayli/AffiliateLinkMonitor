import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Blog',
        template: '%s | Affiliate Link Monitor Blog',
    },
    description: 'Tips, guides, and insights for affiliate marketers. Learn how to protect your revenue, fix broken links, and grow your affiliate income.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
