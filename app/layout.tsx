import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";
import Navbar from "./components/Navbar/Navbar";
import GoogleAnalyticsComponent from "./components/GoogleAnalytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: true,
});

export const metadata: Metadata = {
  title: "Book Private Tours & Transfers - Uttarakhand Travels",
  description:
    "Explore the best tours and private transfers in Uttarakhand. Hassle-free booking, custom routes, and amazing stops!",
  keywords:
    "Uttarakhand, travel,taxi service in uttarakhand, uttarakhand travels, uttarakhand taxi serivices private tours, transfers, booking, sightseeing, char dham yatra uttarakhand",
  authors: [
    { name: "Uttarakhand Travels", url: "https://uttarakhandtravelss.com" },
  ],
  openGraph: {
    title: "Book Private Tours & Transfers - Uttarakhand Travels",
    description:
      "Explore the best tours and private transfers in Uttarakhand. Hassle-free booking, custom routes, and amazing stops!",
    url: "https://uttarakhandtravelss.com",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Uttarakhand Travels Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@uttarakhandtravelss",
    title: "Book Private Tours & Transfers - Uttarakhand Travels",
    description: "Explore the best tours and private transfers in Uttarakhand.",
    images: ["/logo.webp"],
  },
  metadataBase: new URL("https://uttarakhandtravelss.com"),
  alternates: {
    canonical: "https://uttarakhandtravelss.com",
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
        {/* Canonical link for SEO */}
        <link rel="canonical" href="https://uttarakhandtravelss.com" />
        {/* ✅ SVG Favicon */}
        <link rel="icon" href="/vercel.svg" type="image/svg+xml" />
        {/* ✅ PNG Fallback */}
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        {/* ✅ Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Uttarakhand Travels",
              url: "https://uttarakhandtravelss.com",
              logo: "https://uttarakhandtravelss.com/logo.webp", // ✅ Added logo in JSON-LD
              description:
                "Explore the best tours and private transfers in Uttarakhand.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kausani",
                addressLocality: "Bageshwar",
                addressRegion: "Uttarakhand",
                postalCode: "263639",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 9761409770",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider />
        <Navbar />
        <GoogleAnalyticsComponent />
        {children}
      </body>
    </html>
  );
}
