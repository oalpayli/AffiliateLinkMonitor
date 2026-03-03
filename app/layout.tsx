import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const BASE_URL = "https://www.affiliatelinkmonitoring.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Affiliate Link Monitor — 24/7 Broken Link & Out-of-Stock Detection",
    template: "%s | Affiliate Link Monitor",
  },
  description:
    "Never lose commissions to broken links & out-of-stock products again. Monitor your Amazon, Linktree, Pinterest and any affiliate links 24/7. Get instant email alerts. Free plan available.",
  keywords: [
    "affiliate link monitor",
    "broken link checker",
    "affiliate link checker",
    "amazon link monitor",
    "out of stock detection",
    "affiliate marketing tools",
    "broken affiliate links",
    "link monitoring tool",
    "pinterest link checker",
    "linktree link checker",
  ],
  authors: [{ name: "Affiliate Link Monitor" }],
  creator: "Affiliate Link Monitor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Affiliate Link Monitor",
    title: "Affiliate Link Monitor — 24/7 Broken Link & Out-of-Stock Detection",
    description:
      "Never lose commissions to broken links & out-of-stock products. Monitor 24/7, get instant alerts. Free plan available.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Affiliate Link Monitor — 24/7 Broken Link & Out-of-Stock Detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Link Monitor — 24/7 Broken Link Detection",
    description:
      "Never lose commissions to broken links. Monitor Amazon, Linktree, Pinterest links 24/7. Free plan available.",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD Schemas — SoftwareApplication is injected by the homepage only
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Affiliate Link Monitor",
  alternateName: "LinkMonitor",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  email: "info@affiliatelinkmonitoring.com",
  sameAs: [
    "https://instagram.com/affiliatelinkmonitoring",
    "https://www.producthunt.com/products/affiliate-link-monitor",
    "https://www.g2.com/products/affiliate-link-monitor",
    "https://www.capterra.com/p/affiliate-link-monitor",
    "https://alternativeto.net/software/affiliate-link-monitor/",
  ],
  description:
    "We help content creators and affiliate marketers protect their revenue by automatically detecting broken links and out-of-stock products.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Affiliate Link Monitor",
  url: BASE_URL,
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="bg-slate-950 text-white min-h-screen">
        <Providers>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
