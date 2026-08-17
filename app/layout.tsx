import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#5B4FE8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://pruv.vercel.app"
  ),
  title: {
    default: "Pruv — Did your skincare actually work? | Measured Skincare Reviews",
    template: "%s | Pruv",
  },
  description:
    "Turn your skincare product trials into measured reviews backed by before/after Perfect Corp. YouCam AI Skin Analysis. Measure real changes in redness, radiance, acne, texture, and pores.",
  keywords: [
    "Pruv",
    "skincare reviews",
    "measured skincare",
    "YouCam AI",
    "skin analysis",
    "before after skincare",
    "skincare trial",
    "beauty tech",
    "skin metrics",
    "Proof Review",
    "ProofLink",
    "skincare efficacy",
    "dermatology AI",
  ],
  authors: [{ name: "Nikhil Raikwar", url: "https://pruv.vercel.app" }],
  creator: "Nikhil Raikwar",
  publisher: "Pruv",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pruv.vercel.app",
    siteName: "Pruv",
    title: "Pruv — Measured Skincare Reviews Powered by YouCam AI",
    description:
      "A new review format for skincare products: real product trials backed by before/after YouCam AI Skin measurements. Reviews backed by real measured trial data.",
    images: [
      {
        url: "/pruv-banner.png",
        width: 1200,
        height: 630,
        alt: "Pruv Measured Skincare Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruv — Measured Skincare Reviews",
    description:
      "Real skincare trials backed by before/after Perfect Corp. YouCam Skin AI measurements.",
    images: ["/pruv-banner.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Pruv",
              "url": "https://pruv.vercel.app",
              "description":
                "Turn skincare trials into measured reviews backed by before/after YouCam AI Skin Analysis.",
              "applicationCategory": "HealthApplication, LifestyleApplication",
              "operatingSystem": "All modern browsers",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
