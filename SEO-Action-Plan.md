# SEO Action Plan — affiliatelinkmonitoring.com
**Prepared:** March 3, 2026
**Audited by:** Claude SEO (6-agent parallel audit)
**For:** Antigravity
**Overall SEO Health Score: 62 / 100** — Needs Improvement

---

## Overview

This document contains all findings and fixes from a comprehensive SEO audit. Issues are grouped by priority. Fix Critical items first — they directly block indexing, suppress pages from Google, and harm conversion performance.

**Stack context:** Next.js (App Router) on Vercel. Most fixes are in `next.config.js` or individual `page.tsx` metadata exports.

---

## Score Breakdown

| Category | Score | Status |
|---|---|---|
| Technical SEO | 17 / 25 | Needs Improvement |
| Content Quality | 14 / 25 | Needs Improvement |
| On-Page SEO | 14 / 20 | Needs Improvement |
| Schema / Structured Data | 5 / 10 | Needs Improvement |
| Performance (Core Web Vitals) | 6.2 / 10 | Needs Improvement |
| Images | 3.5 / 5 | Needs Improvement |
| AI Search Readiness | 2.5 / 5 | Poor |

---

## 🔴 Critical — Fix Immediately

---

### C-1. Homepage Bails Out to Client-Side Rendering

**What:** `BAILOUT_TO_CLIENT_SIDE_RENDERING` is present in the homepage HTML. Despite Next.js static generation being active, a component using `useSearchParams()` or a browser-only API without a `<Suspense>` boundary forces the entire page content to render in the browser. The hero section, features, pricing, and FAQ are **not in the initial HTML response**.

**Impact:**
- Googlebot indexes a near-empty shell instead of full page content
- LCP (Largest Contentful Paint) is estimated at 2.8s–4.2s — outside the "Good" threshold
- All homepage content depends on JavaScript before it becomes visible or crawlable

**Fix:** Wrap the offending component in a `Suspense` boundary in `app/page.tsx`:

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      {/* Static sections rendered server-side */}
      <HeroSection />
      {/* Wrap only the client component that uses useSearchParams */}
      <Suspense fallback={null}>
        <ComponentUsingSearchParams />
      </Suspense>
    </>
  )
}
```

**How to find the culprit:** Search the codebase for `useSearchParams` — the component using it on the homepage without a Suspense boundary is the cause. Also check for `useRouter`, `window`, or `localStorage` usage in components that render on the homepage.

**Expected improvement:** LCP drops by an estimated 0.8s–1.5s, pushing it into the "Good" range. Googlebot can immediately index all homepage content.

---

### C-2. /pricing Page Has Wrong Canonical Tag (Points to Homepage)

**What:** The canonical tag on `/pricing` points to the homepage instead of itself:

```html
<!-- Current — WRONG -->
<link rel="canonical" href="https://affiliatelinkmonitoring.com"/>

<!-- Correct -->
<link rel="canonical" href="https://www.affiliatelinkmonitoring.com/pricing"/>
```

The page also inherits the homepage `<title>` and `<meta name="description">` — Google sees `/pricing` as a duplicate of the homepage.

**Impact:** Google will not index `/pricing` independently. It cannot rank for pricing-intent queries ("affiliate link monitor pricing", "affiliate monitor free plan", etc.), which are high-conversion search terms.

**Fix:** Add a `metadata` export to `app/pricing/page.tsx`:

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Affiliate Link Monitor | Free & Pro Plans',
  description: 'Start free with 10 monitors. Upgrade to Pro for $12/month with hourly scans, bulk import, and priority support. No credit card required.',
  alternates: {
    canonical: 'https://www.affiliatelinkmonitoring.com/pricing',
  },
  openGraph: {
    title: 'Pricing — Affiliate Link Monitor',
    url: 'https://www.affiliatelinkmonitoring.com/pricing',
  },
}
```

---

### C-3. Three Team Member Images Are Broken

**What:** `founder.png`, `member1.png`, and `member2.png` all return 0×0 dimensions — the image files are missing or the paths in `components/Team.tsx` are incorrect. The "Meet the Team" section renders broken image slots on the live site.

**Impact:** Direct trust damage — broken images in a credibility section undermine the authority signals that the team section is intended to provide.

**Fix:** Verify image files exist at the paths referenced in `components/Team.tsx` and upload any missing files to `/public/images/team/`.

---

### C-4. AggregateRating Value Mismatch (Schema vs On-Page)

**What:** Two different rating values are shown:
- `components/TrustSignals.tsx` (line 21): displays **4.9★**
- JSON-LD schema in `app/layout.tsx`: declares **`"ratingValue": "4.8"`**

Google can detect this inconsistency and may ignore the schema or flag it as misleading.

**Impact:** Star ratings in search results (rich results) may be suppressed. Google's quality raters also check for inconsistencies as a trust signal.

**Fix:** Align both values to the same number. Ideally, integrate a third-party review platform (G2, Capterra, or Trustpilot) and link the `AggregateRating` schema to that verified source:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "ratingCount": "120",
  "bestRating": "5",
  "worstRating": "1"
}
```

Also update `TrustSignals.tsx` line 21 to show `"4.8★"`.

---

### C-5. Unsubstantiated "SOC 2 Certified" Claim

**What:** `components/FAQ.tsx` (line 30) states: *"We're GDPR compliant and SOC 2 certified."* No certificate link, audit report, third-party badge, or compliance documentation page exists anywhere on the site.

**Impact:** Under Google's September 2025 Quality Rater Guidelines, unverifiable security/compliance claims are a direct Trustworthiness red flag. Human quality raters evaluating the site for YMYL-adjacent queries (financial security, data privacy) will mark this down.

**Fix (choose one):**
1. Obtain actual SOC 2 certification and publish the audit report or badge on a `/security` page, then link to it from the FAQ answer
2. Remove "SOC 2 certified" from the FAQ answer until certification is achieved

---

## 🟠 High Priority — Fix Within 1 Week

---

### H-1. Non-WWW to WWW Redirect Is Temporary (307), Not Permanent (301/308)

**What:** `https://affiliatelinkmonitoring.com` returns `HTTP 307 Temporary Redirect` to `https://www.affiliatelinkmonitoring.com`. A 307 tells crawlers the redirect may not be permanent — Google does not treat it as a definitive canonical signal and passes reduced link equity.

**Impact:** Every backlink to the non-www domain (which many external sites link to) does not pass full PageRank to the www version. This compounds over time as you build more links.

**Fix — `next.config.js`:**

```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'affiliatelinkmonitoring.com' }],
      destination: 'https://www.affiliatelinkmonitoring.com/:path*',
      permanent: true, // emits 308
    },
  ]
},
```

Alternatively, set this directly in the Vercel Dashboard under **Domains → Configure → Redirect**.

---

### H-2. Missing Critical Security Headers

**What:** None of the following headers are present on any response:
- `Content-Security-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`

The existing `Strict-Transport-Security` header is missing `includeSubDomains` and `preload`.

**Impact:** For a SaaS that handles user authentication and payment flows, these are meaningful attack surface gaps. They are also evaluated by security-focused SEO tools and can affect trust signals in competitive SaaS search results.

**Fix — add to `next.config.js`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Add a basic CSP and tighten over time:
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us.i.posthog.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https://sentry.io https://us.i.posthog.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

---

### H-3. Logo Is a 470 KB PNG — Replace With SVG + Fix Dimensions

**What:** `logo.png` is preloaded on every page at 470 KB with `cache-control: max-age=0` (no long-term caching). Both instances (header and footer) use raw `<img>` tags with no `width`/`height` attributes.

**Impact:**
- 470 KB is downloaded on every page visit, directly contributing to LCP delay
- Missing `width`/`height` causes CLS (layout shift) during image load on every page
- `max-age=0` means the browser cannot cache it — it re-downloads on every navigation

**Fix:**

1. Convert `logo.png` to SVG (typically <5 KB) or WebP. Save as `/public/logo.svg`
2. Give the output file a content-hash in its filename for immutable caching
3. Replace raw `<img>` tags with `next/image` in the header and footer components:

```tsx
import Image from 'next/image'

// In header component:
<Image
  src="/logo.svg"
  alt="Affiliate Link Monitor Logo"
  width={32}
  height={32}
  priority
/>

// In footer component:
<Image
  src="/logo.svg"
  alt="Affiliate Link Monitor Logo"
  width={32}
  height={32}
/>
```

---

### H-4. og:url Is Wrong on /blog and Other Secondary Pages

**What:** The blog index page (`/blog`) and likely other secondary pages have `og:url` pointing to `https://affiliatelinkmonitoring.com` (the homepage) instead of their own URL.

**Impact:** When users share a blog post on Facebook, LinkedIn, or Twitter, the platform treats it as a homepage share rather than a blog article share. Social share counts and link previews reference the wrong page.

**Fix:** Add `openGraph.url` to each page's `metadata` export. Example for `app/blog/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Affiliate Marketing Blog — Tips, Guides & Link Monitoring Insights',
  description: 'Expert guides on affiliate link monitoring, Amazon Associates best practices, and protecting your affiliate revenue.',
  alternates: {
    canonical: 'https://www.affiliatelinkmonitoring.com/blog',
  },
  openGraph: {
    url: 'https://www.affiliatelinkmonitoring.com/blog',
  },
}
```

Apply the same pattern to all blog posts and feature pages.

---

### H-5. Both Blog Posts Are Thin Content — Below Minimum Word Count

**What:**
- Article 1 ("Why Amazon Associates Links Stop Working"): ~900–1,000 words
- Article 2 ("Does Linktree Hurt Your Affiliate Commissions?"): ~700–800 words

The minimum for informational blog content in a competitive SaaS niche is 1,500 words. Competitors publish 2,500–5,000 word guides on the same topics. Both articles also lack named author bylines — they attribute authorship to the organization, which is a weak E-E-A-T signal.

**Impact:** Google may classify both articles as thin content. They cannot compete for informational queries where competitors publish comprehensive, well-authored guides.

**Fix:**

**Article 1 — expand with:**
- Source for the "15% of affiliate links break in 6 months" stat (or replace with your own data)
- Screenshots of real 404 / out-of-stock detection examples
- A step-by-step walkthrough with images
- A section on Amazon's link cloaking policy

**Article 2 — expand with:**
- A real-data comparison (e.g., "We monitored 500 Linktree pages and found X% had at least one broken link")
- A comparison table: Linktree vs. Beacons vs. Stan.store vs. direct linking
- A Linktree-specific best practices checklist

**Both articles — add:**
- A named author byline with full name, role, and a link to their LinkedIn profile
- A visible publication date and "Last updated" date on the page
- Change `author: { '@type': 'Organization' }` in article schema to `author: { '@type': 'Person', 'name': 'Full Name', 'url': 'https://linkedin.com/...' }`

---

### H-6. SoftwareApplication Schema Missing Required Fields for Rich Results

**What:** The `SoftwareApplication` schema is missing `image` (required by Google for rich result eligibility) and `availability` on each `Offer` object (required by Google's structured data validator).

**Fix — updated schema for `app/layout.tsx` (homepage only):**

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Affiliate Link Monitor",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://affiliatelinkmonitoring.com",
  "image": "https://affiliatelinkmonitoring.com/logo.png",
  "description": "24/7 affiliate link monitoring tool that detects broken links and out-of-stock products. Get instant email alerts when your affiliate links break.",
  "offers": [
    {
      "@type": "Offer",
      "name": "Free Plan",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-01-01"
    },
    {
      "@type": "Offer",
      "name": "Pro Plan",
      "price": "12",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-01-01"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "120",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

**Important:** Move this schema block to the homepage only (`app/page.tsx` or homepage layout). It should not appear on `/blog`, `/pricing`, `/privacy`, or `/terms` pages.

---

### H-7. OG / Twitter Social Card Image Is Wrong Size

**What:** `og:image` uses `logo.png` at 512×512 pixels. The `twitter:card` is set to `summary_large_image`, which requires a minimum of 1200×630 pixels. Social shares on Twitter/X and LinkedIn will render a small square thumbnail instead of a large preview card.

**Fix:** Create a dedicated social card image at **1200×630 pixels** saved as `/public/og-image.png`. Update all pages:

```typescript
openGraph: {
  images: [{
    url: 'https://www.affiliatelinkmonitoring.com/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Affiliate Link Monitor — 24/7 Broken Link & Out-of-Stock Detection',
  }],
},
twitter: {
  card: 'summary_large_image',
  images: ['https://www.affiliatelinkmonitoring.com/og-image.png'],
},
```

---

## 🟡 Medium Priority — Fix Within 1 Month

---

### M-1. /login and /signup Pages Should Be Noindexed

**What:** Both pages return 200 with `robots: index, follow` but their canonical tags point to the homepage (so they will not rank independently). They are not in the sitemap but are crawlable, wasting crawl budget on app authentication pages.

**Fix:** Add `noindex, nofollow` to the login and signup page metadata:

```typescript
// app/login/page.tsx and app/signup/page.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

Or add these paths to `robots.txt`:
```
Disallow: /login
Disallow: /signup
```

---

### M-2. Sitemap lastmod Dates Are Identical and Synthetic

**What:** All 15 URLs in `sitemap.xml` have the exact same timestamp: `2026-02-15T14:19:20.294Z`. This is a build-time placeholder. Google ignores `lastmod` when it appears fabricated.

Also remove the deprecated `changefreq` and `priority` tags — Google has confirmed it ignores both.

**Fix:** Update the sitemap generation to use real per-page modification dates:

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.affiliatelinkmonitoring.com',
      lastModified: new Date('2026-02-15'), // actual last edit date
    },
    {
      url: 'https://www.affiliatelinkmonitoring.com/pricing',
      lastModified: new Date('2026-02-15'),
    },
    {
      url: 'https://www.affiliatelinkmonitoring.com/blog/amazon-associates-links-stop-working',
      lastModified: new Date('2026-02-15'), // use post.updatedAt from CMS
    },
    // etc. — no changefreq, no priority
  ]
}
```

---

### M-3. Add WebSite and BreadcrumbList Schema

**What:** The site has no `WebSite` schema (needed for entity graph coherence and the `@id` anchor) and no `BreadcrumbList` schema on nested pages (needed for breadcrumb-enhanced SERP appearances).

**Fix — add WebSite to `app/layout.tsx`:**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://affiliatelinkmonitoring.com/#website",
  "name": "Affiliate Link Monitor",
  "url": "https://affiliatelinkmonitoring.com",
  "publisher": {
    "@id": "https://affiliatelinkmonitoring.com/#organization"
  }
}
```

**Fix — add BreadcrumbList to all nested pages (`/blog/*`, `/alternative/*`, `/tools/*`):**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://affiliatelinkmonitoring.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://affiliatelinkmonitoring.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "[Article Title]", "item": "[Article URL]" }
  ]
}
```

Also update the `Organization` schema to use an `ImageObject` for `logo` and add an `@id`:

```json
{
  "@type": "Organization",
  "@id": "https://affiliatelinkmonitoring.com/#organization",
  "name": "Affiliate Link Monitor",
  "alternateName": "LinkMonitor",
  "logo": {
    "@type": "ImageObject",
    "url": "https://affiliatelinkmonitoring.com/logo.png",
    "width": 512,
    "height": 512
  }
}
```

---

### M-4. Add BlogPosting Schema to Each Blog Article

**What:** Blog articles lack `BlogPosting` schema with required fields. The current `Article` schema uses `author: { '@type': 'Organization' }` which is a weak E-E-A-T signal.

**Fix — add to each blog post page:**

```typescript
const blogPostSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.publishedAt,  // '2026-02-15'
  dateModified: post.updatedAt,     // '2026-02-15'
  author: {
    '@type': 'Person',
    name: 'Alex M.',  // replace with full name when available
    url: 'https://www.affiliatelinkmonitoring.com/about/alex',
  },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://affiliatelinkmonitoring.com/#organization',
    name: 'Affiliate Link Monitor',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': post.url,
  },
}
```

---

### M-5. Fix Mobile Touch Targets (3 Categories Failing)

**What:** Three categories of interactive elements are below the 48px minimum touch target height on mobile:

| Element | Current Height | Target |
|---|---|---|
| Logo link (nav) | 40px | 48px+ |
| "Try with example link" helper | 20px | 48px+ |
| All footer navigation links | 17px | 48px+ |

**Fix:**
- Logo: Add `py-2` to the logo container in the nav component
- "Try with example link": Add `py-4` or `className="py-4 block"` to the element
- Footer links: Add `py-2` to all `<a>` tags in the footer column lists

---

### M-6. robots.txt Sitemap Declaration Should Use www

**What:** `robots.txt` declares `Sitemap: https://affiliatelinkmonitoring.com/sitemap.xml` (non-www) but the live site serves from `https://www.affiliatelinkmonitoring.com`.

**Fix:** Update `public/robots.txt` or the robots.txt generation:

```
Sitemap: https://www.affiliatelinkmonitoring.com/sitemap.xml
```

---

### M-7. Add FAQ Section to /pricing Page

**What:** The standalone `/pricing` page has no FAQ. The money-back guarantee is only mentioned in the homepage FAQ, not on the pricing page where users make the purchase decision.

**Fix:** Add a FAQ block to `/pricing` with these questions at minimum:
- How does the free plan work?
- Can I upgrade or downgrade anytime?
- Is there a money-back guarantee? *(Answer: Yes, 14-day)*
- Do you support team accounts?
- What payment methods do you accept?

Also add the money-back guarantee text visibly on the pricing page itself (not just in the homepage FAQ).

---

### M-8. Source All Statistics — Required for AI Citation Readiness

**What:** "15% of affiliate links break within 6 months" appears on the homepage and in a blog post with no citation. AI search engines (Google AI Overviews, ChatGPT Search, Perplexity) will not cite unsourced statistics.

**Fix options:**
1. Analyze your own link monitoring data across all users and publish the findings as a data page (e.g., `/research/affiliate-link-health-report-2026`). This is the highest-value approach — original research gets cited and linked extensively.
2. If using a third-party stat, link directly to the original study.

Either way, make the stat citeable with an attribution source visible on the page.

---

### M-9. Add Pricing Link to Mobile Navigation

**What:** The mobile nav shows only: Logo | Sign In | Start Free. "Pricing" — a high-intent page — is not accessible from mobile without scrolling the full page.

**Fix:** Add a "Pricing" link to the mobile nav, or add it as a secondary element in the mobile header row. Alternative: add a sticky footer bar on mobile with "Pricing" and "Start Free" as the two actions.

---

## 🔵 Low Priority — Backlog

| # | Issue | Fix |
|---|---|---|
| L-1 | `x-powered-by: Next.js` header exposed | Add `poweredByHeader: false` to `next.config.js` |
| L-2 | `access-control-allow-origin: *` on HTML responses | Restrict CORS to API routes only |
| L-3 | Organization name inconsistency ("LinkMonitor" vs "Affiliate Link Monitor") | Use "Affiliate Link Monitor" as primary in schema; add `alternateName: "LinkMonitor"` |
| L-4 | No `/alternatives` hub page | Create a hub page at `/alternatives` linking to `/alternative/amz-watcher` and `/alternative/lasso` |
| L-5 | Avatar images use generic alt text "User" | Use "Affiliate marketer using LinkMonitor" or similar descriptive text |
| L-6 | Logo alt text inconsistent (header vs footer) | Standardize to "Affiliate Link Monitor Logo" in both locations |
| L-7 | Stats row not visible at 1366×768 (laptop viewport) | Reduce hero section padding so the stats bar is visible above the fold at laptop size |
| L-8 | PostHog initialized on page load (blocks main thread) | Defer PostHog init until first user interaction using `pointerdown` event listener |
| L-9 | Brotli compression not confirmed on Vercel | Verify `content-encoding: br` in response headers; Vercel should support it by default |
| L-10 | Sentry SDK bundled with main chunk | Move Sentry to its own async chunk to reduce main bundle parse time |
| L-11 | Team member full names not shown | Expand to full names (or at minimum full first name + last name) with LinkedIn links |
| L-12 | Testimonial companies not linked | Link "TheDailyEdit.com", "GadgetGuru", "SmartShopperHub" to their actual sites |

---

## Quick Wins — Can Ship in a Single Session

These require minimal development time and have immediate positive impact:

1. **Add `width={32} height={32}` to both logo `<img>` tags** — eliminates CLS on every page load
2. **Add `poweredByHeader: false`** to `next.config.js` — 1-line change
3. **Add `X-Content-Type-Options` and `X-Frame-Options` headers** via `next.config.js` — 5-line change
4. **Fix `/pricing` metadata** — add unique title, description, and correct canonical
5. **Fix `og:url` on `/blog` page** — add `openGraph.url` to the blog metadata export
6. **Align `AggregateRating` values** — change `TrustSignals.tsx` to display "4.8★" to match schema
7. **Remove deprecated `changefreq` and `priority` from sitemap** — clean up ignored tags
8. **Update `robots.txt` sitemap URL** to use `https://www.affiliatelinkmonitoring.com/sitemap.xml`
9. **Remove or qualify "SOC 2 certified" from FAQ** until certification is obtained

---

## Canonical Domain Decision Required

The site currently has a conflict that should be resolved before anything else:

| Element | Current Value |
|---|---|
| Live serving domain | `https://www.affiliatelinkmonitoring.com` (www) |
| All canonical tags | `https://affiliatelinkmonitoring.com` (non-www) |
| All sitemap URLs | `https://affiliatelinkmonitoring.com` (non-www) |
| Non-www redirect | 307 Temporary → www |

**Recommended decision:** Canonicalize on **www** (since the server already serves it natively without a redirect):

1. Update all `metadata.alternates.canonical` to use `https://www.affiliatelinkmonitoring.com/...`
2. Update all `og:url` values to use www
3. Update sitemap URLs to use www
4. Update `robots.txt` Sitemap declaration to use www
5. Change the 307 non-www redirect to a permanent 308

This resolves the domain ambiguity in a single pass.

---

## File Reference Map

| File | Issues Referenced |
|---|---|
| `next.config.js` | H-1 (307→308 redirect), H-2 (security headers), L-1 (poweredByHeader) |
| `app/page.tsx` | C-1 (CSR bailout Suspense fix) |
| `app/pricing/page.tsx` | C-2 (canonical + metadata), M-7 (add FAQ section) |
| `app/blog/page.tsx` | H-4 (og:url fix), M-2 (metadata export) |
| `app/blog/*/page.tsx` | H-5 (content expansion), M-4 (BlogPosting schema) |
| `app/login/page.tsx` | M-1 (noindex) |
| `app/signup/page.tsx` | M-1 (noindex) |
| `app/sitemap.ts` | M-2 (real lastmod dates, remove deprecated tags) |
| `app/layout.tsx` | H-6 (schema fix), M-3 (add WebSite + Organization @id), C-4 (rating alignment) |
| `public/robots.txt` | M-6 (sitemap URL), M-1 (add login/signup disallow) |
| `components/TrustSignals.tsx` (line 21) | C-4 (rating value 4.9 → 4.8) |
| `components/Team.tsx` | C-3 (broken team images) |
| `components/FAQ.tsx` (line 30) | C-5 (remove SOC 2 claim) |
| `components/Testimonials.tsx` | L-12 (link testimonial companies) |
| Header component (logo) | H-3 (replace logo, add dimensions) |
| Footer component (logo) | H-3 (replace logo, add dimensions), L-6 (alt text) |
| `/public/` | H-7 (create og-image.png 1200×630), H-3 (add logo.svg) |

---

*Generated by Claude SEO — 6-agent parallel audit on March 3, 2026*
