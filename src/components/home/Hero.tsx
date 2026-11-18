import Image from "next/image";
import { img } from "@/lib/images";
import Button from "@/components/ui/Button";
import { getTripDepartureLabel } from "@/lib/trips/availability";
import type { Trip } from "@/lib/trips/types";
import CategoryCard from "./CategoryCard";
import styles from "./home.module.css";

const categories = [
  {
    label: "01 / NATURE & ADVENTURE",
    title: "Mountain Escapes",
    tagline: "Go higher. Feel more.",
    href: "/trips?category=mountain",
    intervalMs: 4000,
    startDelayMs: 0,
    photos: [
      img("pages-trips-hero-01"),
      img("homepage-people-b-03"),
      img("homepage-way-01"),
      img("homepage-people-a-05"),
      img("pages-trips-hero-02"),
    ],
  },
  {
    label: "02 / THE OPEN ROAD",
    title: "Road Trips",
    tagline: "The journey is the story.",
    href: "/trips?category=road",
    intervalMs: 4500,
    startDelayMs: 700,
    photos: [
      img("pages-about-chapter-02"),
      img("homepage-people-b-04"),
      img("pages-trips-hero-03"),
      img("homepage-way-03"),
      img("homepage-people-b-01"),
    ],
  },
  {
    label: "03 / LITTLE GETAWAYS",
    title: "Weekend Getaways",
    tagline: "Leave the usual behind.",
    href: "/trips?category=weekend",
    intervalMs: 5000,
    startDelayMs: 1400,
    photos: [
      img("homepage-people-b-02"),
      img("pages-experiences-riverside"),
      img("homepage-way-04"),
      img("homepage-way-05"),
      img("homepage-people-a-02"),
    ],
  },
];

export default function Hero({ trip }: { trip?: Trip }) {
  const departure = trip && getTripDepartureLabel(trip);

  return (
    <section id="hero" className={styles.hero}>
      <Image
        src={img("homepage-hero").src}
        alt={img("homepage-hero").alt}
        fill
        priority
        sizes="100vw"
        className={styles.heroBg}
      />
      <div className={`container ${styles.heroContent} ${trip ? styles.heroSingle : ""}`}>
        <div className={styles.heroCopy}>
          {/*
            The H1 is the small eyebrow line and always describes the site, so
            the homepage never shares its H1 with the featured trip's own page
            and always carries the category keywords. The big headline stays the
            visual focus, so the design doesn't change.
          */}
          <h1 className={`eyebrow ${styles.heroEyebrow}`}>Group trips for solo travellers in India</h1>
          <h2 className={styles.heroTitle}>
            {trip?.title ?? <>Where to <span className={styles.accent}>next?</span></>}
          </h2>
          {departure && <p className={styles.heroDeparture}>{departure}</p>}
          <p className={styles.heroLede}>
            {trip?.blurb ?? "Unforgettable places. New friendships. Stories worth telling. Discover group journeys designed for people who love to explore."}
          </p>
          <div className={styles.heroActions}>
            <Button href={trip ? `/trips/${trip.slug}` : "/trips"} variant="primary">
              {trip ? "View trip details ↗" : "Explore Experiences ↗"}
            </Button>
            <Button href={trip ? "/trips" : "#experience"} variant="ghost" inverted>
              {trip ? "Explore trips ↗" : "Find your travel style ↗"}
            </Button>
          </div>
        </div>

        {!trip && (
          <div className={styles.categoriesWrap}>
            <p className={styles.categoriesHead}>Choose your kind of adventure</p>
            <div className={styles.categories}>
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.href}
                  label={category.label}
                  title={category.title}
                  tagline={category.tagline}
                  href={category.href}
                  photos={category.photos}
                  intervalMs={category.intervalMs}
                  startDelayMs={category.startDelayMs}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
