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
      img("green-forest-and-mountain-landscape"),
      img("atmospheric-mountain-landscape-representing-adventure"),
      img("alpine-trail-with-clear-mountain"),
      img("mountain-valley-with-evergreen-forest"),
      img("night-sky-over-mountain-silhouettes"),
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
      img("scenic-road-through-a-beautiful"),
      img("open-highway-stretching-toward-distant"),
      img("desert-road-trip-under-a"),
      img("car-on-a-coastal-road"),
      img("mountain-pass-and-open-sky"),
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
      img("hill-viewpoint-overlooking-water-and"),
      img("quiet-beach-getaway-with-turquoise"),
      img("cozy-cabin-weekend-escape-in"),
      img("calm-riverside-waters-surrounded-by"),
      img("lakeside-resort-atmosphere-at-golden"),
    ],
  },
];

export default function Hero({ trip }: { trip?: Trip }) {
  const departure = trip && getTripDepartureLabel(trip);

  return (
    <section id="hero" className={styles.hero}>
      <Image
        src={img("dramatic-mountain-peaks-under-open").src}
        alt={img("dramatic-mountain-peaks-under-open").alt}
        fill
        priority
        sizes="100vw"
        className={styles.heroBg}
      />
      <div className={`container ${styles.heroContent} ${trip ? styles.heroSingle : ""}`}>
        <div className={styles.heroCopy}>
          <p className={`eyebrow ${styles.heroEyebrow}`}>{trip?.tagline ?? "Curated Group Travel Experiences"}</p>
          <h1 className={styles.heroTitle}>
            {trip?.title ?? <>Where to <span className={styles.accent}>next?</span></>}
          </h1>
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
