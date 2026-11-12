import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

/**
 * Indexing is owner-approved by default (siteCopy.allowIndexing in
 * src/content/site.ts); NEXT_PUBLIC_ALLOW_INDEXING=false blocks everything,
 * e.g. for a staging copy of the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteConfig.allowIndexing ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
