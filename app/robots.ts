import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Explicit permission for AI crawlers — improves GEO visibility
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'CCBot', allow: '/' },
            { userAgent: 'anthropic-ai', allow: '/' },
            { userAgent: 'Google-Extended', allow: '/' },
            // General crawlers
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/dashboard/',
                    '/settings/',
                    '/scans/',
                    '/debug/',
                    '/test/',
                    '/test-page/',
                    '/login',
                    '/signup',
                ],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
