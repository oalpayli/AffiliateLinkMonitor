import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const BASE_URL = "https://affiliatelinkmonitoring.com";

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
  authors: [{ name: "LinkMonitor" }],
  creator: "LinkMonitor",
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
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
        alt: "Affiliate Link Monitor Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Link Monitor — 24/7 Broken Link Detection",
    description:
      "Never lose commissions to broken links. Monitor Amazon, Linktree, Pinterest links 24/7. Free plan available.",
    images: [`${BASE_URL}/logo.png`],
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

// JSON-LD Schemas
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Affiliate Link Monitor",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  description:
    "24/7 affiliate link monitoring tool that detects broken links and out-of-stock products. Get instant email alerts when your affiliate links break.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free plan with 10 monitors. Pro plan at $12/month.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LinkMonitor",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  email: "info@affiliatelinkmonitoring.com",
  sameAs: ["https://instagram.com/affiliatelinkmonitoring"],
  description:
    "We help content creators and affiliate marketers protect their revenue by automatically detecting broken links and out-of-stock products.",
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
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
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
