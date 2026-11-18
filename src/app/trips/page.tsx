import type { Metadata } from "next";
import { Suspense } from "react";
import TripsHero from "@/components/trips/TripsHero";
import TripExplorer from "@/components/trips/TripExplorer";
import { getPublicTrips } from "@/lib/trips/repository";

export const metadata: Metadata = {
  title: "Upcoming Group Trips for Solo Travellers",
  description:
    "See upcoming After630 group trips with dates, prices, full itineraries and inclusions. Small groups, solo-friendly, ages 20–40. Enquire about any departure on WhatsApp.",
  alternates: { canonical: "/trips" },
};

export default function TripsPage() {
  const trips = getPublicTrips();

  return (
    <>
      <TripsHero singleTrip={trips.length === 1} />
      <Suspense fallback={<div style={{ minHeight: 400 }} aria-hidden="true" />}>
        <TripExplorer trips={trips} />
      </Suspense>
    </>
  );
}
