import axios from 'axios';
import * as cheerio from 'cheerio';

interface ScraperResult {
  url: string;
  totalLinks: number;
  affiliateLinks: Array<{
    href: string;
    text: string;
    status: 'unchecked' | 'healthy' | 'broken';
    statusCode?: number;
  }>;
}

// Common affiliate networks to look for
// Common affiliate networks to look for
const AFFILIATE_DOMAINS = [
  'amzn.to',
  'amazon.com',
  'shareasale.com',
  'cj.com',
  'rakuten.com',
  'impact.com',
  'clickbank.net',
  'avangate.com',
  'refexion.com',
  'partnerstack.com',
  'geni.us',
  'bit.ly'
];

// Common affiliate query parameters
const AFFILIATE_PARAMS = [
  'ref',
  'aff',
  'affiliate',
  'tag', // Amazon
  'partner',
  'via',
  'utm_source=affiliate'
];

// Common affiliate URL path patterns
const AFFILIATE_PATHS = [
  '/go/',
  '/out/',
  '/ref/',
  '/recommend/',
  '/referral/',
  '/aff/'
];

function isAffiliateLink(href: string): boolean {
  try {
    const url = new URL(href);
    const lowerHref = href.toLowerCase();

    // 1. Check known domains
    if (AFFILIATE_DOMAINS.some(domain => url.hostname.includes(domain))) {
      return true;
    }

    // 2. Check query parameters
    if (AFFILIATE_PARAMS.some(param => url.searchParams.has(param) || lowerHref.includes(param + '='))) {
      return true;
    }

    // 3. Check path patterns
    if (AFFILIATE_PATHS.some(path => url.pathname.includes(path))) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

import { scrapeDynamicContent } from './browser';

export async function scrapeAffiliateLinks(url: string): Promise<ScraperResult> {
  // Strategy: Try Fast Scraper (Axios) -> Fallback to Slow Scraper (Puppeteer)
  let links: Array<{ href: string; text: string }> = [];

  try {
    // 1. Fast Path
    console.log(`[Scraper] Attempting fast scrape for: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AffiliateLinkMonitor/1.0; +http://localhost)'
      },
      timeout: 5000 // Short timeout for fast path
    });

    const $ = cheerio.load(response.data);
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      const text = $(element).text().trim();
      if (href && (href.startsWith('http') || href.startsWith('https'))) {
        links.push({ href, text });
      }
    });

  } catch (error) {
    console.warn(`[Scraper] Fast scrape failed for ${url}, switching to browser...`);
  }

  // 2. Check Quality of Fast Scraper Results
  const affiliateLinksFoundFast = links.filter(l => isAffiliateLink(l.href));

  // If we found nothing useful, or if it failed completely, use the Browser
  if (affiliateLinksFoundFast.length === 0) {
    console.log(`[Scraper] Fast scraper found no affiliate links. Launching Browser for: ${url}`);
    try {
      links = await scrapeDynamicContent(url);
    } catch (browserError) {
      console.error(`[Scraper] Browser scrape also failed:`, browserError);
      // If both fail, we just return empty list (or whatever partial links we had)
    }
  }

  // Filter for affiliate links
  const affiliateLinks = links.filter(link => {
    try {
      return isAffiliateLink(link.href);
    } catch (e) {
      return false;
    }
  }).map(link => ({
    ...link,
    status: 'unchecked' as const
  }));

  return {
    url,
    totalLinks: links.length,
    affiliateLinks
  };
}

// Browser-like User Agent to avoid bot detection (especially Amazon)
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export async function checkLinkHealth(url: string): Promise<{ status: 'healthy' | 'broken' | 'error', statusCode: number }> {
  try {
    const response = await axios.head(url, {
      headers: { 'User-Agent': USER_AGENT },
      validateStatus: () => true, // Don't throw on 404
      timeout: 5000,
      maxRedirects: 5
    });

    // If HEAD is successful, return early
    if (response.status >= 200 && response.status < 400) {
      return { status: 'healthy', statusCode: response.status };
    }

    // If HEAD failed with 405 (Method Not Allowed), 403 (Forbidden), or 503 (Service Unavailable - common for Amazon bots), try GET
    if ([405, 403, 503, 999].includes(response.status)) {
      const getResponse = await axios.get(url, {
        headers: { 'User-Agent': USER_AGENT },
        validateStatus: () => true,
        timeout: 8000, // Slightly longer timeout for GET
        maxRedirects: 5
      });
      return {
        status: getResponse.status >= 200 && getResponse.status < 400 ? 'healthy' : 'broken',
        statusCode: getResponse.status
      };
    }

    return {
      status: 'broken',
      statusCode: response.status
    };
  } catch (error) {
    // If HEAD failed with a network error, try GET as a last resort (some servers reject HEAD immediately)
    try {
      const getResponse = await axios.get(url, {
        headers: { 'User-Agent': USER_AGENT },
        validateStatus: () => true,
        timeout: 8000
      });
      return {
        status: getResponse.status >= 200 && getResponse.status < 400 ? 'healthy' : 'broken',
        statusCode: getResponse.status
      };
    } catch (getError) {
      if (axios.isAxiosError(getError) && getError.response) {
        return {
          status: 'broken',
          statusCode: getError.response.status
        };
      }
      return {
        status: 'broken',
        statusCode: 0 // Network error or timeout
      };
    }
  }
}
