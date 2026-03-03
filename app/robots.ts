import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
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
