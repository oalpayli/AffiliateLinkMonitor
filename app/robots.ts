import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dashboard/', '/settings/', '/scans/', '/debug/', '/test/', '/test-page/'],
            },
        ],
        sitemap: 'https://affiliatelinkmonitoring.com/sitemap.xml',
    };
}
