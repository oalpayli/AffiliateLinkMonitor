import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages — use actual last edit dates, not build-time timestamps
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date('2026-03-03'),
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: new Date('2026-03-03'),
        },
        {
            url: `${BASE_URL}/support`,
            lastModified: new Date('2026-02-15'),
        },
        {
            url: `${BASE_URL}/manual`,
            lastModified: new Date('2026-02-15'),
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date('2026-02-15'),
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date('2026-02-15'),
        },
    ];

    // Programmatic SEO pages (Platform Checkers)
    const platformPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/amazon-broken-link-checker`,
            lastModified: new Date('2026-02-15'),
        },
        {
            url: `${BASE_URL}/pinterest-link-monitor`,
            lastModified: new Date('2026-02-15'),
        },
        {
            url: `${BASE_URL}/check-linktree-links`,
            lastModified: new Date('2026-02-15'),
        },
    ];

    // Free tool pages
    const toolPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/tools/link-health-scanner`,
            lastModified: new Date('2026-02-15'),
        },
        {
            url: `${BASE_URL}/tools/revenue-loss-calculator`,
            lastModified: new Date('2026-03-03'),
        },
    ];

    // Author / About pages
    const aboutPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/about/alex`,
            lastModified: new Date('2026-03-05'),
        },
    ];

    // Alternative/Competitor pages
    const alternativePages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/alternative/amz-watcher`,
            lastModified: new Date('2026-02-15'),
        },
        {
            url: `${BASE_URL}/alternative/lasso`,
            lastModified: new Date('2026-02-15'),
        },
    ];

    // Blog pages
    const blogPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/blog/amazon-associates-links-stop-working`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/blog/does-linktree-hurt-affiliate-commissions`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/blog/affiliate-links-on-pinterest`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/blog/amazon-products-out-of-stock-affiliate-guide`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/blog/how-often-to-check-affiliate-links`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/blog/does-cloaking-affiliate-links-affect-seo`,
            lastModified: new Date('2026-03-05'),
        },
        {
            url: `${BASE_URL}/blog/best-affiliate-link-monitoring-tools`,
            lastModified: new Date('2026-03-05'),
        },
    ];

    return [...staticPages, ...platformPages, ...toolPages, ...aboutPages, ...alternativePages, ...blogPages];
}
