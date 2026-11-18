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
  // The root page shares the layout's segment, so the title template doesn't
  // apply here: this string is the full <title>.
  title: "Group Trips for Solo Travellers in India — After630",
  description:
    "Small-group trips for solo travellers aged 20–40. Explore the mountains, meet new people and see upcoming departures, dates and prices. Enquire on WhatsApp.",
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
