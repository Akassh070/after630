import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getPublicTrips } from "@/lib/trips/repository";

const STATIC_ROUTES = ["/", "/trips", "/about", "/experiences", "/contact", "/faq"];
// Draft legal pages are noindex until legal approval, so they're left out of
// the sitemap until then (listing a noindex URL makes search consoles warn).
const LEGAL_ROUTES = ["/privacy", "/terms", "/cancellation-refunds"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const routes = siteConfig.legalApproved ? [...STATIC_ROUTES, ...LEGAL_ROUTES] : STATIC_ROUTES;
  const staticEntries = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
  const tripEntries = getPublicTrips().map((trip) => ({
    url: `${base}/trips/${trip.slug}`,
    lastModified: new Date(),
  }));
  return [...staticEntries, ...tripEntries];
}
