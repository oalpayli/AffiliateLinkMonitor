# Schema Markup Report — affiliatelinkmonitoring.com

**Date:** 2026-03-05
**URL:** https://www.affiliatelinkmonitoring.com/
**Format:** JSON-LD (all blocks)

---

## Detection Summary

| Schema Type | Found | Format | Status |
|-------------|-------|--------|--------|
| Organization | Yes | JSON-LD | ✅ Valid (minor gaps) |
| WebSite | Yes | JSON-LD | ⚠️ Missing SearchAction |
| SoftwareApplication | Yes | JSON-LD | ⚠️ Issues found |
| FAQPage | Yes | JSON-LD | ❌ RESTRICTED — must remove |
| WebPage | No | — | Missing opportunity |
| BreadcrumbList | No | — | N/A (homepage) |

**Microdata:** Not detected
**RDFa:** Not detected

---

## Validation Results

### 1. Organization ✅ (minor gaps)

| Property | Status | Note |
|----------|--------|------|
| @context | ✅ | Present |
| @type | ✅ | Organization |
| @id | ✅ | #organization anchor |
| name | ✅ | "Affiliate Link Monitor" |
| alternateName | ✅ | "LinkMonitor" |
| url | ✅ | Absolute URL |
| logo | ✅ | ImageObject with width/height |
| email | ✅ | Present |
| sameAs | ✅ | 5 profiles |
| description | ✅ | Present |
| telephone | ⚠️ | Missing (optional but recommended) |
| foundingDate | ⚠️ | Missing (trust signal) |
| numberOfEmployees | — | Optional, omit if N/A |

**Verdict:** Valid. No blocking issues.

---

### 2. WebSite ⚠️ Missing SearchAction

| Property | Status | Note |
|----------|--------|------|
| @context | ✅ | Present |
| @type | ✅ | WebSite |
| @id | ✅ | #website anchor |
| name | ✅ | Present |
| url | ✅ | Present |
| publisher | ✅ | References #organization |
| potentialAction (SearchAction) | ❌ | Missing — enables sitelinks searchbox in Google |

**Verdict:** Valid but missing SearchAction. Add it to enable sitelinks searchbox rich result.

---

### 3. SoftwareApplication ⚠️ Issues found

| Property | Status | Note |
|----------|--------|------|
| @context | ✅ | Present |
| @type | ⚠️ | SoftwareApplication is valid; WebApplication is more accurate for web-only |
| @id | ❌ | Missing — add for entity linking |
| name | ✅ | Present |
| applicationCategory | ✅ | "BusinessApplication" — valid |
| operatingSystem | ✅ | "Web" |
| url | ✅ | Present |
| image | ✅ | Present |
| description | ✅ | Present |
| aggregateRating | ✅ | 4.8/5 with 120 ratings, all required fields present |
| offers[].@type | ✅ | Offer |
| offers[].price | ✅ | "0" and "12" |
| offers[].priceCurrency | ✅ | "USD" |
| offers[].availability | ✅ | InStock |
| offers[].priceValidUntil | ✅ | 2027-01-01 |
| offers[].url | ❌ | Missing — should link to pricing/signup page |
| featureList | ❌ | Missing — list key features as string |
| screenshot | ⚠️ | Missing — helps rich results |
| potentialAction | ⚠️ | Missing — add RegisterAction for free signup CTA |

**Verdict:** Functional but incomplete. Add @id, offer URLs, and featureList.

---

### 4. FAQPage ❌ CRITICAL — Must Remove

**Issue:** FAQPage rich results were restricted in August 2023.
Google now only renders FAQ rich results for **government** and **healthcare authority** websites.
For all other sites (including SaaS), FAQ schema will:
- NOT generate rich results in Google Search
- NOT cause a penalty (it's simply ignored for rich results)
- Add unnecessary markup weight

**Action required:** Remove the FAQPage JSON-LD block entirely.
The FAQ content itself can remain on the page — just remove the schema.

---

## Missing Schema Opportunities

### WebPage (Homepage)
A `WebPage` schema adds context for the homepage specifically, including `speakable` for voice search. Recommended for SaaS homepages.

### RegisterAction on SoftwareApplication
Adding a `potentialAction` with `RegisterAction` pointing to your signup URL signals to Google that users can register for the service — useful for app deep linking.

---

## Priority Action Plan

| Priority | Action | Impact |
|----------|--------|--------|
| Critical | Remove FAQPage schema block | Removes dead/restricted markup |
| High | Add SearchAction to WebSite | Enables sitelinks searchbox |
| High | Add @id to SoftwareApplication | Entity linking |
| High | Add url to each Offer object | Required for pricing rich results |
| Medium | Change @type to WebApplication | More specific, accurate for web-only tool |
| Medium | Add featureList to SoftwareApplication | Better feature discovery |
| Medium | Add WebPage schema to homepage | Semantic completeness |
| Low | Add screenshot to SoftwareApplication | Rich result enhancement |
| Low | Add potentialAction (RegisterAction) | App action signals |
| Low | Add foundingDate to Organization | Trust/authority signal |

---

## Notes

- All existing URLs use absolute paths — correct.
- @id anchors are correctly formatted (#organization, #website).
- aggregateRating data looks real (4.8/5, 120 ratings) — ensure this stays current.
- No Microdata or RDFa detected — JSON-LD only is the right approach.
- Google's Dec 2025 JS SEO guidance: ensure JSON-LD is in server-rendered HTML, not injected client-side. Verify this in page source (not JS-rendered view).

---

*Generated schema with all fixes: see `generated-schema.json`*
