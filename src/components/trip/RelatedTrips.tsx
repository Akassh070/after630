import Link from "next/link";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import type { Trip } from "@/lib/trips/types";
import styles from "./trip.module.css";

export default function RelatedTrips({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className="container">
        <div className={styles.relatedHead}>
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2>More journeys to dream about.</h2>
          </div>
          <Link href="/trips" className="btnGhost">
            Back to Explore Trips ↗
          </Link>
        </div>
        <div className={styles.relatedGrid}>
          {trips.map((trip, index) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.slug}`}
              className={styles.relatedCard}
              aria-label={`View trip: ${trip.title}`}
            >
              <div className={styles.relatedPhoto}>
                <ImageSlideshow
                  slides={trip.images}
                  fallbackSrc={trip.fallbackImage}
                  sizes="(max-width: 650px) 80vw, 30vw"
                  intervalMs={4400 + index * 400}
                  startDelayMs={index * 500}
                  className={styles.relatedSlideshow}
                />
              </div>
              <div className={styles.relatedInfo}>
                <span>{trip.tone}</span>
                <h3>{trip.title}</h3>
                <div className={styles.relatedBottom}>
                  <small>{trip.place}</small>
                  <span className={styles.textLink}>View trip ↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
