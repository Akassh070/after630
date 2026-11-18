import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import UpcomingTrips from "@/components/home/UpcomingTrips";
import Manifesto from "@/components/home/Manifesto";
import ExperienceGrid from "@/components/home/ExperienceGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Story from "@/components/home/Story";
import HomeFaq from "@/components/home/HomeFaq";
import ClosingCta from "@/components/home/ClosingCta";
import { getFeaturedTrips } from "@/lib/trips/repository";

export const metadata: Metadata = {
  title: "After630 — Curated Group Travel Experiences",
  description:
    "Discover curated group journeys across India. Explore upcoming trips and enquire on WhatsApp — our team confirms availability and booking by hand.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const trips = getFeaturedTrips();

  return (
    <>
      <Hero trip={trips.length === 1 ? trips[0] : undefined} />
      <UpcomingTrips trips={trips} />
      <Manifesto />
      <ExperienceGrid />
      <HowItWorks />
      <Story />
      <HomeFaq />
      <ClosingCta />
    </>
  );
}
