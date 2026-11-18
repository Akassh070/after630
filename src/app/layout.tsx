import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/lib/config";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SkipLink from "@/components/layout/SkipLink";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import MetaPixel from "@/components/analytics/MetaPixel";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
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
    default: "Group Trips for Solo Travellers in India — After630",
    template: "%s — After630",
  },
  description:
    "Small-group trips for solo travellers aged 20–40. Explore the mountains, meet new people and see upcoming departures, dates and prices. Enquire on WhatsApp.",
  // Shown when the site link is shared (WhatsApp, Instagram, etc.).
  openGraph: {
    siteName: "After630",
    type: "website",
    images: [{ url: "/brand/after630-og-square.png", width: 1024, height: 1024, alt: "After630" }],
  },
  // Google Search Console's HTML-tag verification. Set the token in
  // src/content/site.ts (googleSiteVerification) or NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
  ...(siteConfig.googleSiteVerification ? { verification: { google: siteConfig.googleSiteVerification } } : {}),
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
          {/* Site-wide, so trip pages' `provider` reference resolves on every page. */}
          <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
