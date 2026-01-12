# Phase 2: Production & Monetization Roadmap

To turn this MVP into a profitable SaaS (`Affiliate Link Monitor`), we need to move from "functional prototype" to "secure, scalable, and billable product".

## 1. Core Infrastructure (The Foundation)
**Goal**: Ensure data persistence, security, and scalability.

- [x] **Database Migration**: ✅ Using **PostgreSQL** via Supabase.
    - *Why?* SQLite files are lost on Vercel deployments. Postgres allows concurrent connections and is production-standard.
    - *Tools*: Supabase, Neon, or Vercel Postgres.
- [x] **Real Authentication**: ✅ Migrated to **Supabase Auth** with custom login/signup pages.
    - *Why?* You need secure password handling, social logins (Google/GitHub), and session management.
- [x] **Multi-Tenancy**: ✅ ISOLATE USER DATA.
    - *Action*: Add `userId` to `Monitor` and `Scan` models. Ensure users can ONLY access their own monitors.

## 2. Monetization (The Revenue Engine)
**Goal**: Charge users for value.

- [ ] **Payment Integration**: Integrate **Stripe** or **LemonSqueezy**.
    - *Features*: Checkout, Webhooks (to handle successful payments), Customer Portal.
- [ ] **Pricing Plans**:
    - **Free Tier**: 3 Monitors, Daily checks.
    - **Pro Tier ($9/mo)**: 50 Monitors, Hourly checks, Email Alerts.
- [ ] **Subscription Gating**:
    - Modify the "Add Monitor" API to check if the user has reached their plan limit.
    - If `limit_reached`, show a paywall.

## 3. Reliability & Scaling (The Trust)
**Goal**: Ensure checks run reliably even with 10,000 users.

- [ ] **Robust Cron Jobs**:
    - Vercel functions time out after 10-60 seconds. You cannot scan 100 links in one request.
    - *Solution*: Use **Inngest**, **Trigger.dev**, or **Upstash QStash**.
    - *Architecture*: The Cron trigger just *enqueues* jobs. Dedicated workers process them individually.
- [ ] **Proxy Rotation**:
    - Amazon/ShareASale will block your IP if you scan too much.
    - *Solution*: Integrate a proxy service (Bright Data, Smartproxy) to rotate IPs for the scraper.

## 4. Marketing & Growth (The Sales)
**Goal**: Acquire customers.

- [ ] **Landing Page**: Build a high-converting home page at `/`.
    - Hero Section ("Stop losing commission to dead links").
    - Feature Grid.
    - Pricing Table.
    - FAQ.
- [ ] **SEO**: Blog posts about "Affiliate Marketing Automation", "Link Rot".
- [ ] **Legal**: Terms of Service & Privacy Policy (Required for Stripe).

## Proposed Tech Stack for Phase 2
- **Auth**: ✅ Supabase Auth (Fully integrated)
- **DB**: Neon (Serverless Postgres)
- **Payments**: Stripe
- **Queues**: Inngest (Great Vercel support)
