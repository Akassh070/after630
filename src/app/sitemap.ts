import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getPublicTrips } from "@/lib/trips/repository";

const STATIC_ROUTES = ["/", "/trips", "/about", "/experiences", "/contact", "/faq"];
// Legal pages are noindex while siteConfig.legalApproved is false, and are
// left out of the sitemap then (listing a noindex URL makes search consoles warn).
const LEGAL_ROUTES = ["/privacy", "/terms", "/cancellation-refunds"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const routes = siteConfig.legalApproved ? [...STATIC_ROUTES, ...LEGAL_ROUTES] : STATIC_ROUTES;
  // No lastModified: the only date available here is the build time, which
  // changes on every deploy whether or not the page did. Google learns to
  // ignore lastmod values that are always "now", so leaving it out is better.
  const staticEntries = routes.map((route) => ({ url: `${base}${route}` }));
  const tripEntries = getPublicTrips().map((trip) => ({ url: `${base}/trips/${trip.slug}` }));
  return [...staticEntries, ...tripEntries];
}
