import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripHeader from "@/components/trip/TripHeader";
import Gallery from "@/components/trip/Gallery";
import Overview from "@/components/trip/Overview";
import RealMoments from "@/components/trip/RealMoments";
import Itinerary from "@/components/trip/Itinerary";
import Inclusions from "@/components/trip/Inclusions";
import Logistics from "@/components/trip/Logistics";
import TripFaq from "@/components/trip/TripFaq";
import EnquirySection from "@/components/trip/EnquirySection";
import RelatedTrips from "@/components/trip/RelatedTrips";
import EndCta from "@/components/trip/EndCta";
import TrackViewContent from "@/components/analytics/TrackViewContent";
import JsonLd from "@/components/seo/JsonLd";
import { shareImage } from "@/lib/images";
import { breadcrumbSchema, tripSchema } from "@/lib/structured-data";
import { getAllSlugs, getRelatedTrips, getTripBySlug } from "@/lib/trips/repository";
import { siteConfig } from "@/lib/config";
import type { Trip } from "@/lib/trips/types";
import styles from "@/components/trip/trip.module.css";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return { title: "Trip not found" };
  const title = trip.seoTitle ?? trip.title;
  const description = trip.seoDescription ?? trip.blurb;
  const sharePhoto = trip.images[0];
  return {
    title,
    description,
    alternates: { canonical: `/trips/${trip.slug}` },
    // A real trip photo instead of the site-wide logo when the link is shared
    // on WhatsApp/Instagram. Repeating title/description here keeps them from
    // falling back to the root layout's generic values.
    openGraph: {
      siteName: "After630",
      type: "website",
      title: `${title} — After630`,
      description,
      url: `/trips/${trip.slug}`,
      ...(sharePhoto ? { images: [shareImage(sharePhoto)] } : {}),
    },
    ...(sharePhoto
      ? { twitter: { card: "summary_large_image" as const, images: [shareImage(sharePhoto).url] } }
      : {}),
  };
}

// Each section component returns null when its data is missing, so the subnav
// only links to sections that will actually render — no dead anchors.
function getSubnav(trip: Trip) {
  return [
    { href: "#overview", label: "Overview", show: true },
    { href: "#real-moments", label: "Real moments", show: (trip.videos?.length ?? 0) > 0 },
    { href: "#itinerary", label: "Itinerary", show: (trip.itinerary?.length ?? 0) > 0 },
    {
      href: "#inclusions",
      label: "Inclusions",
      show: (trip.inclusions?.length ?? 0) > 0 || (trip.exclusions?.length ?? 0) > 0,
    },
    { href: "#logistics", label: "Travel & Stay", show: (trip.travelStay?.length ?? 0) > 0 },
    { href: "#trip-faq", label: "FAQs", show: (trip.faq?.length ?? 0) > 0 },
  ].filter((item) => item.show);
}

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const related = getRelatedTrips(trip, 3);
  const subnav = getSubnav(trip);

  return (
    <>
      <div className="container">
        <TripHeader trip={trip} />
        <Gallery images={trip.images} fallbackSrc={trip.fallbackImage} />

        {subnav.length > 1 && (
          <nav className={styles.subnav} aria-label="Trip sections">
            {subnav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className={styles.bodyLayout} style={{ paddingBottom: 64 }}>
          <div>
            <Overview trip={trip} />
            <RealMoments videos={trip.videos ?? []} />
            <Itinerary days={trip.itinerary ?? []} />
            <Inclusions trip={trip} />
            <Logistics trip={trip} />
            <TripFaq faq={trip.faq ?? []} />
          </div>
          <EnquirySection trip={trip} whatsappNumber={siteConfig.whatsappNumber} />
        </div>
      </div>

      <JsonLd
        data={[
          tripSchema(trip),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Explore Trips", path: "/trips" },
            { name: trip.title, path: `/trips/${trip.slug}` },
          ]),
        ]}
      />
      <TrackViewContent id={trip.slug} name={trip.title} category={trip.category} />
      <RelatedTrips trips={related} />
      <EndCta />
    </>
  );
}
