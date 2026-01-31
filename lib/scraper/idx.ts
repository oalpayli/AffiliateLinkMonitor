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
  'bit.ly',
  // New additions
  'cna.st',
  'howl.me',
  'skimresources.com',
  'viglink.com',
  'rstyle.me',
  'shopstyle.com',
  'list-manage.com'
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

import { scrapeDynamicContent } from './browser.ts';

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

function detectStockStatus(html: string): 'in_stock' | 'out_of_stock' | 'unknown' {
  if (!html) return 'unknown';
  const lowerHtml = html.toLowerCase();

  // 1. Check Schema.org FIRST (most reliable if present and correct)
  if (lowerHtml.includes('schema.org/outofstock')) {
    return 'out_of_stock';
  }
  if (lowerHtml.includes('schema.org/instock')) {
    return 'in_stock';
  }

  // 2. Parse HTML to check VISIBLE text only (avoids matching JSON/Script variables)
  const $ = cheerio.load(html);
  $('script').remove();
  $('style').remove();
  $('noscript').remove();

  // Get visible text, collapse whitespace
  const visibleText = $('body').text().replace(/\s+/g, ' ').toLowerCase();

  // 3. Check for specific keywords in visible text
  const oosKeywords = [
    'currently unavailable',
    'out of stock',
    'sold out',
    'temporarily out of stock',
    'no longer available',
    // Turkish keywords
    'stokta yok',
    'tükendi',
    'temin edilememektedir',
    'satışa kapalı',
    'bu ürün şu an satılamamaktadır'
  ];

  // Specific check for "Currently Unavailable" to avoid geolocation false positives?
  // If we see "cannot be shipped to", we might want to be careful.
  // But for now, just checking visible text solves the JSON match issue.

  if (oosKeywords.some(keyword => visibleText.includes(keyword))) {
    // Special check: If "Currently Unavailable" is found, but it might be due to shipping...
    // For now, let's assume if it says unavailable, it is.
    return 'out_of_stock';
  }

  return 'unknown';
}

function detectAmazonErrorPage(html: string, url: string): boolean {
  // Only check for Amazon domains
  if (!url.includes('amazon.') && !url.includes('amzn.')) {
    return false;
  }

  const lowerHtml = html.toLowerCase();

  // Amazon error page indicators
  const errorIndicators = [
    'looking for something',
    'web address you entered is not a functioning page',
    'page you requested cannot be found',
    'sorry, we couldn\'t find that page',
    'dogs of amazon'  // 503 Service Unavailable error page
  ];

  return errorIndicators.some(indicator => lowerHtml.includes(indicator));
}

export async function checkLinkHealth(url: string): Promise<{ status: 'healthy' | 'broken' | 'error', statusCode: number, stockStatus: 'in_stock' | 'out_of_stock' | 'unknown' }> {
  try {
    const response = await axios.head(url, {
      headers: { 'User-Agent': USER_AGENT },
      validateStatus: () => true, // Don't throw on 404
      timeout: 5000,
      maxRedirects: 5
    });

    // If HEAD is successful, return early BUT we still need to check stock status if possible
    // For now, if we want stock status, we MUST do a GET request.
    // Optimization: Only do GET if it looks like a product page? For now, let's just do GET if HEAD suggests it's OK.
    if (response.status >= 200 && response.status < 400) {
      // Perform GET to check stock status
      try {
        const getResponse = await axios.get(url, {
          headers: { 'User-Agent': USER_AGENT },
          validateStatus: () => true,
          timeout: 8000
        });

        const stockStatus = detectStockStatus(getResponse.data);

        // Check if this is an Amazon error page
        if (detectAmazonErrorPage(getResponse.data, url)) {
          return {
            status: 'broken',
            statusCode: getResponse.status,
            stockStatus: 'unknown'
          };
        }

        return {
          status: 'healthy',
          statusCode: response.status,
          stockStatus
        };

      } catch (e) {
        // If GET fails but HEAD worked, we just return healthy but unknown stock
        return { status: 'healthy', statusCode: response.status, stockStatus: 'unknown' };
      }
    }

    // If HEAD failed with 405 (Method Not Allowed), 403 (Forbidden), or 503 (Service Unavailable - common for Amazon bots), try GET or Browser
    if ([405, 403, 503, 999].includes(response.status)) {
      try {
        // First try simple GET
        const getResponse = await axios.get(url, {
          headers: { 'User-Agent': USER_AGENT },
          validateStatus: () => true,
          timeout: 8000,
          maxRedirects: 5
        });

        // If GET also fails with 403, use Browser
        if (getResponse.status === 403) {
          console.log(`[LinkCheck] 403 Forbidden with Axios for ${url}, trying Browser...`);
          try {
            const { fetchPageContent } = await import('./browser.ts');
            const html = await fetchPageContent(url);

            // Check if this is an Amazon error page
            if (detectAmazonErrorPage(html, url)) {
              return {
                status: 'broken',
                statusCode: 200,
                stockStatus: 'unknown'
              };
            }

            const stockStatus = detectStockStatus(html);
            return {
              status: 'healthy', // If browser loads it, it exists
              statusCode: 200,
              stockStatus
            };
          } catch (browserErr) {
            console.error('[LinkCheck] Browser fallback failed:', browserErr);
            return {
              status: 'broken',
              statusCode: 403,
              stockStatus: 'unknown'
            };
          }
        }

        const stockStatus = detectStockStatus(getResponse.data);

        // Check if this is an Amazon error page
        if (getResponse.status >= 200 && getResponse.status < 400 && detectAmazonErrorPage(getResponse.data, url)) {
          return {
            status: 'broken',
            statusCode: getResponse.status,
            stockStatus: 'unknown'
          };
        }

        return {
          status: getResponse.status >= 200 && getResponse.status < 400 ? 'healthy' : 'broken',
          statusCode: getResponse.status,
          stockStatus: (getResponse.status >= 200 && getResponse.status < 400) ? stockStatus : 'unknown'
        };

      } catch (e) {
        // ... (rest of error handling same as before or fall back to browser here too if needed)
        return {
          status: 'broken',
          statusCode: response.status,
          stockStatus: 'unknown'
        };
      }
    }

    return {
      status: 'broken',
      statusCode: response.status,
      stockStatus: 'unknown'
    };
  } catch (error) {
    // If HEAD failed with a network error, try GET as a last resort (some servers reject HEAD immediately)
    try {
      const getResponse = await axios.get(url, {
        headers: { 'User-Agent': USER_AGENT },
        validateStatus: () => true,
        timeout: 8000
      });
      const stockStatus = detectStockStatus(getResponse.data);

      // Check if this is an Amazon error page
      if (getResponse.status >= 200 && getResponse.status < 400 && detectAmazonErrorPage(getResponse.data, url)) {
        return {
          status: 'broken',
          statusCode: getResponse.status,
          stockStatus: 'unknown'
        };
      }

      return {
        status: getResponse.status >= 200 && getResponse.status < 400 ? 'healthy' : 'broken',
        statusCode: getResponse.status,
        stockStatus: (getResponse.status >= 200 && getResponse.status < 400) ? stockStatus : 'unknown'
      };
    } catch (getError: any) {
      // If Axios completely fails (Network Error, Timeout, ECONNRESET, etc.) or returns 403
      // Try Browser as last resort
      console.log(`[LinkCheck] Request failed for ${url} (Error: ${getError.message || 'Unknown'}), trying Browser...`);
      try {
        const { fetchPageContent } = await import('./browser.ts');
        const html = await fetchPageContent(url);

        // Check if this is an Amazon error page
        if (detectAmazonErrorPage(html, url)) {
          return {
            status: 'broken',
            statusCode: 200,
            stockStatus: 'unknown'
          };
        }

        const stockStatus = detectStockStatus(html);
        return {
          status: 'healthy',
          statusCode: 200,
          stockStatus
        };
      } catch (browserErr) {
        console.error('[LinkCheck] Browser fallback checking failed:', browserErr);

        if (axios.isAxiosError(getError) && getError.response) {
          return {
            status: 'broken',
            statusCode: getError.response.status,
            stockStatus: 'unknown'
          };
        }
        return {
          status: 'broken',
          statusCode: 0, // Network error or timeout
          stockStatus: 'unknown'
        };
      }
    }
  }
}
