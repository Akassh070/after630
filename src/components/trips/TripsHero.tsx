import ImageSlideshow from "@/components/ui/ImageSlideshow";
import { img } from "@/lib/images";
import styles from "./trips.module.css";

const heroSlides = [
  img("pages-trips-hero-01"),
  img("pages-trips-hero-02"),
  img("pages-trips-hero-03"),
];

export default function TripsHero({ singleTrip }: { singleTrip: boolean }) {
  return (
    <section className={styles.hero}>
      <ImageSlideshow
        slides={heroSlides}
        sizes="100vw"
        intervalMs={5000}
        priority
        className={styles.heroSlideshow}
      />
      <div className={`container ${styles.heroInner}`}>
        <p className="eyebrow" style={{ color: "#a9dcee" }}>
          {singleTrip ? "Upcoming departure" : "The next chapter is out there"}
        </p>
        <h1>{singleTrip ? "Upcoming group trips" : "Find your next group trip."}</h1>
        <p>
          {singleTrip
            ? "See the dates, price and itinerary for our next group trip."
            : "From mountain trails to long roads and weekend resets. Explore journeys that take you somewhere new — and bring you back with stories."}
        </p>
      </div>
    </section>
  );
}
