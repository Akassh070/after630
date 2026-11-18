import type { Metadata } from "next";
import { Suspense } from "react";
import TripsHero from "@/components/trips/TripsHero";
import TripExplorer from "@/components/trips/TripExplorer";
import { getPublicTrips } from "@/lib/trips/repository";

export const metadata: Metadata = {
  title: "Explore Trips",
  description: "Search and filter curated group trips by category, duration, region and travel month.",
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
