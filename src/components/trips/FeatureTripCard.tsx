import Link from "next/link";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import StatusBadge from "@/components/ui/StatusBadge";
import { getStartingPriceINR, formatPriceINR } from "@/lib/trips/availability";
import type { Trip } from "@/lib/trips/types";
import styles from "./trips.module.css";

function durationLabel(trip: Trip): string {
  const { days, nights } = trip.duration ?? {};
  if (!days) return "Duration TBA";
  return nights ? `${days} Days / ${nights} Nights` : `${days} days`;
}

export default function FeatureTripCard({ trip }: { trip: Trip }) {
  const price = getStartingPriceINR(trip);

  return (
    <Link href={`/trips/${trip.slug}`} className={styles.featureCard} aria-label={`View trip: ${trip.title}`}>
      <div className={styles.featurePhoto}>
        <ImageSlideshow
          slides={trip.images}
          fallbackSrc={trip.fallbackImage}
          sizes="(max-width: 850px) 100vw, 45vw"
          intervalMs={4200}
          priority
          className={styles.cardSlideshow}
        />
      </div>
      <div className={styles.featureContent}>
        <span className={styles.featureKicker}>{trip.tone} · Featured</span>
        <h3 className={styles.featureTitle}>{trip.title}</h3>
        <div className={styles.featureLocation}>⌖ {trip.place}</div>
        <p className={styles.featureDesc}>{trip.blurb}</p>
        <div className={styles.featureMeta}>
          <span className={styles.metaPill}>{durationLabel(trip)}</span>
          <StatusBadge status={trip.status} />
        </div>
        <div className={styles.cardBottom}>
          <div>
            <div className={styles.priceLabel}>Starting price</div>
            <div className={styles.priceValue}>{formatPriceINR(price)}</div>
          </div>
          <span className={styles.detailsBtn}>View trip ↗</span>
        </div>
      </div>
    </Link>
  );
}
