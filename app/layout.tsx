import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./styles.css";
import "../styles/print.css";
import "../styles/prose.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moizofficial.com"),
  title: {
    default: "Muhammad Moiz",
    template: "%s | Muhammad Moiz",
  },
  description:
    "Results‑oriented Software Engineer with 3+ years experience building scalable SaaS, ML-powered features, and cloud apps.",
  keywords: [
    "Muhammad Moiz",
    "Software Engineer",
    "Full-stack",
    "AI/ML",
    "Cloud",
    "React",
    "Python",
    "AWS",
    "GCP",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Portfolio",
    "Projects",
  ],
  openGraph: {
    type: "website",
    siteName: "Muhammad Moiz",
    url: "https://www.moizofficial.com/",
    images: [
      {
        url: "https://www.moizofficial.com/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Moiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zahid_moiz",
    images: ["https://www.moizofficial.com/images/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" sizes="any" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/logo.png" />
        <meta name="theme-color" content="#111827" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Muhammad Moiz" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/logo.png" />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <link rel="preconnect" href="https://plausible.io" />
        ) : null}
        {/* Optional Plausible */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Moiz",
              url: "https://www.moizofficial.com/",
              sameAs: [
                "https://x.com/zahid_moiz",
                "https://www.linkedin.com/in/moizofficial/",
                "https://github.com/MuhammadMoiz20",
              ],
              jobTitle: "Software Engineer",
              description:
                "Results-oriented Software Engineer with 3+ years of experience in full-stack, AI/ML, and cloud application development. Expertise in Python, React, AWS, and modern CI/CD.",
              image: "/logo.png",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Muhammad Moiz",
              url: "https://www.moizofficial.com/",
              logo: "https://www.moizofficial.com/logo.png",
              sameAs: [
                "https://x.com/zahid_moiz",
                "https://www.linkedin.com/in/moizofficial/",
                "https://github.com/MuhammadMoiz20",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Muhammad Moiz",
              url: "https://www.moizofficial.com/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.moizofficial.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
