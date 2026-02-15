import { MetadataRoute } from 'next';

const BASE_URL = 'https://affiliatelinkmonitoring.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/support`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/manual`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Programmatic SEO pages (Platform Checkers)
    const platformPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/amazon-broken-link-checker`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/pinterest-link-monitor`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/check-linktree-links`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // Free tool pages
    const toolPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/tools/link-health-scanner`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // Alternative/Competitor pages
    const alternativePages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/alternative/amz-watcher`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/alternative/lasso`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Blog pages
    const blogPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/amazon-associates-links-stop-working`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/blog/does-linktree-hurt-affiliate-commissions`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    return [...staticPages, ...platformPages, ...toolPages, ...alternativePages, ...blogPages];
}
