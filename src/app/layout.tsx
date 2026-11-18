import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/lib/config";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SkipLink from "@/components/layout/SkipLink";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import MetaPixel from "@/components/analytics/MetaPixel";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { THEME_INIT_SCRIPT } from "@/components/theme/theme";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "After630 — Curated Group Travel Experiences",
    template: "%s — After630",
  },
  description:
    "After630 designs curated group travel experiences across India. Explore upcoming journeys and enquire on WhatsApp — availability and bookings are confirmed by our team.",
  // Shown when the site link is shared (WhatsApp, Instagram, etc.).
  openGraph: {
    siteName: "After630",
    type: "website",
    images: [{ url: "/brand/after630-og-square.png", width: 1024, height: 1024, alt: "After630" }],
  },
  robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} data-theme="light" suppressHydrationWarning>
      <body>
        <Script id="after630-theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>
          <SkipLink />
          <div className="site">
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </div>
          <WhatsAppFloat />
          {siteConfig.metaPixelId && <MetaPixel pixelId={siteConfig.metaPixelId} />}
        </ThemeProvider>
      </body>
    </html>
  );
}
