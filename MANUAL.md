# Affiliate Link Monitor - System Manual

## 1. System Architecture
This application is a specialized monitoring tool designed to track the health of affiliate links across your content. It consists of four main components:

### A. The Scraper Engine (`lib/scraper`)
- **Detection**: Uses heuristic logic to identify affiliate links (Amazon, ShareASale, etc.) based on domains and URL patterns.
- **Health Check**: masquerades as a real browser (`User-Agent`) to check link status. It intelligently retries failed `HEAD` requests with `GET` requests to avoid false positives.

### B. The Database (`prisma/sqlite`)
- **Scans**: Stores the history of every manual or automated check.
- **Monitors**: Stores your recurring jobs (URL, Frequency, Alert Email).
- **Links**: Stores individual link statuses (`healthy` vs `broken`) for reporting.

### C. The Automation Layer (`/api/cron`)
- A singular API endpoint that acts as the "heartbeat" of the system.
- When triggered, it checks the database for any Monitors that are "due" (Next Run <= Now).
- It runs the scraper for those URLs, saves the results, and automatically schedules the next run based on frequency.

### D. The Alert System (`lib/email`)
- If a scheduled scan finds broken links, the system looks for an `alertEmail`.
- It composes a summary email and sends it via SMTP (or logs to console if SMTP is not configured).

---

## 2. User Guide

### Navigation & Accounts
- **Global Navbar**: Use the top navigation bar to switch between the **Dashboard** and **Settings**.
- **Authentication**: 
  - Click **Sign In** to access your account.
  - **Demo Mode**: Use the "Demo Login" button to simulate a logged-in experience without needing credentials. This enables the User Profile menu in the top right.

### Global Configuration (Settings)
- **Settings Page**: Accessible via the Navbar.
- **Default Email**: Save your email address here once. The system will **automatically pre-fill** the "Alert Email" field whenever you add a new monitor, saving you time.

### Dashboard Operations
1.  **Manual Scan**:
    - Enter a URL in the big search bar (e.g., `https://mysite.com/best-laptops`).
    - Click **Start Scan**.
    - View results immediately to see which links are broken.

2.  **Automated Monitoring**:
    - Scroll to the "Active Monitors" section.
    - Enter the **URL** you want to watch.
    - Select **Frequency** (e.g., Daily).
    - The **Alert Email** will be pre-filled from your Settings (if configured).
    - Click **Add**.

### Managing Results
- **View Details**: Click on any card in the "Recent Scans" list to see detailed reports.
- **Copy Link**: Use the copy icon on any card to quickly grab the URL.
- **Delete History**: Click the trash icon to remove old scans.

### Email Alerts
If you provided an email, you will receive a notification like this when broken links are found:
> **Subject**: [ALERT] Broken Affiliate Links Found on mysite.com
> **Body**: We found 3 broken links... (list of links)

*Note: You need to configure SMTP settings in your `.env` file for real emails to be sent.*
