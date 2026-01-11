# Deployment Guide

This project is built with **Next.js** and **Prisma (SQLite)**. The easiest way to deploy it is via Vercel, but due to SQLite, you need to ensure persistent storage or switch to a Postgres provider (like Supabase or Neon) for a "real" production app.

## Option A: Vercel + Postgres (Recommended for Production)
Since Vercel is serverless, the local `dev.db` file will be lost on every redeploy. To persist data:

1.  **Create a Postgres Database**:
    - Sign up for [Neondb](https://neon.tech) or [Supabase](https://supabase.com).
    - Get your `DATABASE_URL`.

2.  **Update Prisma**:
    - In `prisma/schema.prisma`, change provider to `postgresql`:
      ```prisma
      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }
      ```
    - Run `npx prisma migrate dev` locally to create the migration files.

3.  **Deploy to Vercel**:
    - Push code to GitHub.
    - Import project in Vercel.
    - Add Environment Variables:
      - `DATABASE_URL`: (Your postgres connection string)
      - `SMTP_HOST`: (e.g. smtp.gmail.com)
      - `SMTP_USER`: (Your email)
      - `SMTP_PASS`: (Your app password)
    - Deploy!

## Option B: Docker (Self-Hosted)
If you want to keep using SQLite, you can deploy via Docker on a VPS (DigitalOcean, Hetzner, etc.).

1.  **Build Image**:
    ```bash
    docker build -t affiliate-monitor .
    ```
2.  **Run Container**:
    ```bash
    docker run -d -p 3000:3000 -v $(pwd)/prisma:/app/prisma affiliate-monitor
    ```
    *Note: You'll need to create a Dockerfile first.*

## Environment Variables
Ensure these are set in your production environment:
```env
DATABASE_URL="postgresql://..." # or "file:./dev.db" for SQLite
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="user@example.com"
SMTP_PASS="password"
```
