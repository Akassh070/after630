import { siteConfig } from "@/lib/config";
import { absoluteImageSrc } from "@/lib/images";
import { getAvailableDepartures, getStartingPriceINR } from "@/lib/trips/availability";
import type { Trip } from "@/lib/trips/types";

/**
 * schema.org builders. Only facts already on the page go in here — never
 * ratings, reviews or claims the site doesn't show. Validate changes with
 * https://search.google.com/test/rich-results.
 *
 * Trips use TouristTrip, not Event: Google's Event guidelines say not to mark
 * up travel packages as events.
 */

const ORG_ID = `${siteConfig.siteUrl}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.siteName,
    alternateName: ["After6.30", "after630club"],
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/brand/after630-og-square.png`,
    description: "Curated small-group trips in India for solo travellers who want to explore and meet new people.",
    ...(siteConfig.instagramUrl ? { sameAs: [siteConfig.instagramUrl] } : {}),
    ...(siteConfig.whatsappNumber
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: `+${siteConfig.whatsappNumber}`,
          },
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path}`,
    })),
  };
}

export function tripSchema(trip: Trip) {
  const url = `${siteConfig.siteUrl}/trips/${trip.slug}`;
  const price = getStartingPriceINR(trip);
  const departure = getAvailableDepartures(trip)[0] ?? trip.departures[0];
  const origin = departure?.origins[0]?.city;
  const available = getAvailableDepartures(trip).length > 0;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.subtitle ? `${trip.title}: ${trip.subtitle}` : trip.title,
    description: trip.seoDescription ?? trip.blurb,
    url,
    image: trip.images.slice(0, 4).map((image) => absoluteImageSrc(image.src)),
    touristType: ["Solo travellers", "Small groups"],
    provider: { "@id": ORG_ID },
    ...(trip.itinerary && trip.itinerary.length > 0
      ? {
          itinerary: {
            "@type": "ItemList",
            numberOfItems: trip.itinerary.length,
            itemListElement: trip.itinerary.map((day) => ({
              "@type": "ListItem",
              position: day.day,
              name: `Day ${day.day}: ${day.title}`,
              description: day.description,
            })),
          },
        }
      : {}),
    ...(price !== undefined && departure
      ? {
          offers: {
            "@type": "Offer",
            url,
            price,
            priceCurrency: "INR",
            availability: available ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            validThrough: departure.localDate,
            ...(origin ? { description: `Starting price from ${origin}` } : {}),
          },
        }
      : {}),
  };
}
