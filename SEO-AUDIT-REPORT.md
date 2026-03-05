# SEO Audit Report — affiliatelinkmonitoring.com
**Date:** 2026-03-06
**Auditor:** Claude Code SEO Audit
**Pages Audited:** 23 (all sitemap URLs)

---

## SEO Health Score: 71 / 100

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 62% | 25% | 15.5 |
| Content Quality | 80% | 25% | 20.0 |
| On-Page SEO | 72% | 20% | 14.4 |
| Schema / Structured Data | 65% | 10% | 6.5 |
| Performance (CWV) | 70% | 10% | 7.0 |
| Images | 60% | 5% | 3.0 |
| AI Search Readiness | 85% | 5% | 4.25 |
| **Total** | | | **70.65 ≈ 71** |

---

## Executive Summary

affiliatelinkmonitoring.com is a focused SaaS tool with solid content foundations and a clean site structure. The most critical issue found was a **www vs non-www canonical mismatch** across 6 pages, which has been fixed. Additional issues include a duplicate brand name in the pricing page title, schema data inconsistencies, and internal linking gaps between blog posts. AI search readiness is strong (all major AI bots allowed in robots.txt).

### Top 5 Critical Issues Found (& Fixed)
1. **[FIXED] Canonical www/non-www mismatch** — 6 pages pointed to non-www canonical while base URL is www
2. **[FIXED] Pricing page title duplication** — "Affiliate Link Monitor" appeared twice due to title template
3. **[FIXED] foundingDate inconsistency** — layout.tsx said 2024, about page said 2025
4. **[FIXED] Invalid WebSite SearchAction schema** — `/search?q=` endpoint doesn't exist
5. **[ACTION NEEDED] Internal blog cross-linking** — blog posts don't link to each other

### Top 5 Quick Wins (Unfixed)
1. Add table of contents to long blog posts (>1,500 words)
2. Add page-specific OG images per page type
3. Add `SoftwareApplication` / `Product` schema to the Pricing page
4. Cross-link blog posts to each other (topic clusters)
5. Add `Review` / `CompetitorPage` schema to alternative pages

---

## Technical SEO

### Robots.txt — PASS
- All major AI crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended)
- Internal routes correctly blocked: `/api/`, `/dashboard/`, `/settings/`, `/scans/`, `/debug/`, `/test/`, `/login`, `/signup`
- Sitemap URL correctly declared and points to www version

### Sitemap — PASS
- 23 URLs — full coverage of all public pages
- All URLs have `<lastmod>` dates
- No nested sitemaps (site is small enough this is fine)
- **Gap:** `/about/alex` is in sitemap which is good for E-E-A-T, keep it

### Canonical URLs — FIXED (was CRITICAL)
The following 6 pages had non-www canonicals while the site's canonical base is `https://www.affiliatelinkmonitoring.com`:

| Page | Old Canonical | Status |
|---|---|---|
| `/amazon-broken-link-checker` | `https://affiliatelinkmonitoring.com/...` | Fixed |
| `/pinterest-link-monitor` | `https://affiliatelinkmonitoring.com/...` | Fixed |
| `/check-linktree-links` | `https://affiliatelinkmonitoring.com/...` | Fixed |
| `/tools/link-health-scanner` | `https://affiliatelinkmonitoring.com/...` | Fixed |
| `/alternative/amz-watcher` | `https://affiliatelinkmonitoring.com/...` | Fixed |
| `/alternative/lasso` | `https://affiliatelinkmonitoring.com/...` | Fixed |

All blog posts and about/pricing pages already had correct www canonicals.

**Recommendation:** Use the `BASE_URL` constant (already defined in most pages as `https://www.affiliatelinkmonitoring.com`) for ALL canonical and OG URL values instead of hardcoding strings.

### Core Web Vitals — ESTIMATED MODERATE RISK
- Site is Next.js 14 (App Router) — SSR/SSG favorable for LCP
- Heavy background blur effects (large CSS blur radii on fixed elements) may impact CLS/paint
- No explicit font preloading detected
- `<Analytics />` (Vercel) is lightweight — no concern
- **Action:** Run PageSpeed Insights on homepage and tool pages specifically; blur backgrounds with large `blur-[120px]` may cause GPU paint pressure

### Security Headers — NOT TESTED LIVE
- Vercel hosting typically includes: X-Frame-Options, X-Content-Type-Options
- Recommendation: Verify Content-Security-Policy header is present

---

## On-Page SEO

### Title Tags

| Page | Title | Status |
|---|---|---|
| Homepage | "Affiliate Link Monitor — 24/7 Broken Link & Out-of-Stock Detection" (55 chars) | Good |
| Pricing | "Pricing — Free & Pro Plans \| Affiliate Link Monitor" (52 chars) | Fixed (was duplicated) |
| Blog | "Affiliate Marketing Blog — Tips, Guides & Link Monitoring Insights \| Affiliate Link Monitor" (91 chars) | **Too long** (>70 chars) |
| Amazon Checker | "Amazon Broken Link Checker — Find Dead Affiliate Links Instantly \| Affiliate Link Monitor" (90 chars) | **Too long** |
| Pinterest Monitor | "Pinterest Link Monitor — Check Your Pin Links for Errors \| Affiliate Link Monitor" (82 chars) | **Too long** |
| AMZ Watcher Alt | "AMZ Watcher Alternative — Free Amazon Link Monitoring \| Affiliate Link Monitor" (79 chars) | **Borderline** |
| Best Tools Blog | "Best Affiliate Link Monitoring Tools 2026 (Honest Comparison) \| Affiliate Link Monitor Blog" | **Too long** + double "Blog" |

**Action:** Shorten titles over 60-65 characters. Google truncates at ~600px width.

### Meta Descriptions
All pages have unique, relevant meta descriptions within 150-160 character range — PASS.

### H1 Tags
- Homepage: "24/7 Affiliate Link Monitoring for Content Creators Worldwide" — Good
- Blog: "Affiliate Marketing Blog" — Good
- Pricing: "Simple, transparent pricing" — Good but could be more keyword-rich
- Tool pages: H1 detected in config data (rendered client-side via PlatformCheckerPage component) — needs verification via rendered DOM

### Heading Hierarchy
- Blog posts have proper H1 > H2 > H3 structure — Good
- Tool pages use config-driven headings (risk of rendering issues for crawlers)

---

## Content Quality

### Blog Posts — GOOD
- Word count range: 1,200–3,000 words (appropriate depth)
- Real author (Alex Miller) with LinkedIn profile and author page — strong E-E-A-T
- Data-backed claims (e.g., "15% of Amazon links break within 6 months")
- BlogPosting + FAQPage schema on all posts
- BreadcrumbList on blog posts — Good
- **Gap:** No table of contents on posts over 1,500 words

### Tool Pages — MODERATE
- Estimated 800-1,000 words each — sufficient but could be deeper
- FAQPage schema present
- Content rendered via shared `PlatformCheckerPage` component — risk of thin/duplicate content signals between similar pages

### About Page — GOOD
- Strong E-E-A-T signals: founder story, user metrics (1,200+ users, 50,000+ daily links), LinkedIn
- Person schema for Alex Miller — Good
- AboutPage schema — Good

### Internal Linking — WEAK
- Blog posts link to: dashboard, pricing, amazon-broken-link-checker, blog index
- Blog posts do NOT link to: each other, tool pages like link-health-scanner, revenue-loss-calculator, or alternative pages
- **Priority fix:** Create a topic cluster map and add 2-3 relevant internal links per blog post

---

## Schema / Structured Data

### Current Implementation

| Schema Type | Pages | Status |
|---|---|---|
| Organization | All pages (via layout.tsx) | Good |
| WebSite | All pages (via layout.tsx) | Fixed (removed invalid SearchAction) |
| SoftwareApplication | Homepage | Good |
| FAQPage | Homepage, tool pages, blog posts | Good |
| BlogPosting | All blog posts | Good |
| BreadcrumbList | Blog posts | Good (missing on blog index) |
| AboutPage | /about | Good |
| Person | /about/alex | Good |

### Issues Found & Fixed

**[FIXED] WebSite SearchAction** — `potentialAction.SearchAction` pointed to `/search?q={search_term_string}` but no search functionality exists. Removed from layout.tsx.

**[FIXED] foundingDate inconsistency** — `layout.tsx` had `2024`, `about/page.tsx` had `2025`. Both now set to `2025`.

### Missing Schema Opportunities

**HIGH: Pricing page** — No product/pricing schema. Recommend adding:
```json
{
  "@type": "SoftwareApplication",
  "name": "Affiliate Link Monitor",
  "offers": [
    { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free Plan" },
    { "@type": "Offer", "price": "12", "priceCurrency": "USD", "priceValidUntil": "2027-01-01", "name": "Pro Plan" }
  ]
}
```

**MEDIUM: Alternative pages** — No `Review` or comparison schema. Consider adding `ItemList` with `ListItem` for the comparison table.

**LOW: Blog index page** — Missing BreadcrumbList (Home > Blog).

---

## Internal Linking Analysis

### Current State
```
Homepage ←→ Pricing ←→ Dashboard
Homepage → Tool pages (Amazon, Pinterest, Linktree, Link Scanner)
Homepage → Alternative pages
Blog posts → Homepage, Pricing, Amazon Checker
Blog posts ✗ → Other blog posts
Blog posts ✗ → Revenue Loss Calculator
Alternative pages → Dashboard, Pricing
```

### Recommended Topic Clusters

**Amazon Cluster:**
- Hub: `/amazon-broken-link-checker`
- Spokes: `/blog/amazon-associates-links-stop-working`, `/blog/amazon-products-out-of-stock-affiliate-guide`, `/alternative/amz-watcher`
- Action: Cross-link all spokes to each other and to the hub

**Pinterest Cluster:**
- Hub: `/pinterest-link-monitor`
- Spoke: `/blog/affiliate-links-on-pinterest`
- Action: Add links between these two pages

**Tools Cluster:**
- Hub: `/tools/link-health-scanner`
- Related: `/tools/revenue-loss-calculator`
- Action: Cross-link tools, add from blog posts about link checking frequency

---

## AI Search Readiness — STRONG

- robots.txt allows: GPTBot, ClaudeBot, PerplexityBot, CCBot, anthropic-ai, Google-Extended — Excellent
- Structured data coverage (FAQ, BlogPosting, Organization) aids AI citation
- Data-backed claims improve citability
- Author attribution (Alex Miller) helps establish expertise for AI answers
- **Gap:** No explicit `speakable` schema for AI text extraction
- **Gap:** Blog posts could include more direct question-answer formatting for featured snippet capture

---

## Images

- OG image (`/og-image.png`): All pages use the same image
  - **Action:** Create page-type specific OG images (blog, tools, pricing) for better CTR on social sharing
- Alt text: Cannot verify without DOM inspection — recommend manual check of tool page screenshots
- Format: Recommend WebP for any content images

---

## Sitemap Quality

| Metric | Value | Status |
|---|---|---|
| Total URLs | 23 | Good |
| URLs with lastmod | 23/23 | Pass |
| Dynamic app pages excluded | Yes (/dashboard, /settings) | Pass |
| Blog posts included | 7/7 | Pass |
| Tool pages included | 2/2 | Pass |
| Alternative pages included | 2/2 | Pass |
| About/author pages | 2/2 | Pass |

**No sitemap issues found.**

---

## Priority Action Plan

### CRITICAL — Fix Immediately (Already Fixed in This Session)
- [x] **Canonical www/non-www mismatch** — 6 pages fixed
- [x] **Pricing page title duplication** — Fixed
- [x] **foundingDate schema conflict** — Fixed (now 2025 everywhere)
- [x] **Invalid WebSite SearchAction** — Removed

### HIGH — Fix Within 1 Week

1. **Shorten long title tags**
   - Blog page: trim from 91 to <65 chars → "Affiliate Marketing Blog — Tips & Guides | Affiliate Link Monitor"
   - Amazon Checker: trim from 90 to <65 chars → "Amazon Broken Link Checker — Find Dead Affiliate Links | Affiliate Link Monitor"
   - Best Tools post: remove double "Blog" → "Best Affiliate Link Monitoring Tools 2026 | Affiliate Link Monitor"

2. **Add internal cross-links in blog posts**
   - Each blog post should link to 2-3 other relevant blog posts
   - Priority: amazon posts ↔ amazon checker page; pinterest post ↔ pinterest monitor; cloaking post → best tools

3. **Add `SoftwareApplication` pricing schema to /pricing**
   - Include both offer tiers with price and currency

4. **Verify tool page H1 tags render in SSR HTML**
   - `PlatformCheckerPage` component renders H1 from config — confirm it's in server-rendered HTML, not client-side only

### MEDIUM — Fix Within 1 Month

5. **Add table of contents to blog posts over 1,500 words**
   - "Best Affiliate Link Monitoring Tools 2026" (2,500+ words) especially needs this

6. **Add BreadcrumbList schema to blog index page** (`/blog`)

7. **Link Revenue Loss Calculator** (`/tools/revenue-loss-calculator`) from blog posts and tool pages
   - It's in the sitemap but has no inbound links from content

8. **Add `ItemList` / comparison schema to alternative pages**

9. **Run PageSpeed Insights on homepage and tool pages**
   - Large `blur-[120px]` CSS effects on fixed backgrounds may impact GPU paint

### LOW — Backlog

10. **Create page-specific OG images** for blog, tools, and pricing page types

11. **Add `speakable` schema** on blog posts for AI assistant compatibility

12. **Add Twitter/X profile** to `sameAs` in Organization schema (if account exists)

13. **Consider adding more competitor alternative pages** (e.g., Pageradar, ThirstyAffiliates mentioned in best-tools post)

---

## Files Modified in This Session

| File | Change |
|---|---|
| `app/amazon-broken-link-checker/page.tsx` | Canonical + OG URL: non-www → www |
| `app/pinterest-link-monitor/page.tsx` | Canonical + OG URL: non-www → www |
| `app/check-linktree-links/page.tsx` | Canonical + OG URL: non-www → www |
| `app/tools/link-health-scanner/page.tsx` | Canonical + OG URL: non-www → www |
| `app/alternative/amz-watcher/page.tsx` | Canonical + OG URL: non-www → www |
| `app/alternative/lasso/page.tsx` | Canonical + OG URL: non-www → www |
| `app/pricing/page.tsx` | Title: removed duplicate "Affiliate Link Monitor" |
| `app/layout.tsx` | foundingDate: 2024 → 2025; removed invalid SearchAction |
