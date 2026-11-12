import Link from "next/link";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import StatusBadge from "@/components/ui/StatusBadge";
import { getStartingPriceINR, formatPriceINR } from "@/lib/trips/availability";
import type { Trip } from "@/lib/trips/types";
import styles from "./trips.module.css";

function durationLabel(trip: Trip): string {
  const { days, nights } = trip.duration ?? {};
  if (!days) return "Duration TBA";
  return nights ? `${days}D / ${nights}N` : `${days} days`;
}

export default function TripCard({ trip }: { trip: Trip }) {
  const price = getStartingPriceINR(trip);

  return (
    <Link href={`/trips/${trip.slug}`} className={styles.tripCard} aria-label={`View trip: ${trip.title}`}>
      <div className={styles.cardPhoto}>
        <ImageSlideshow
          slides={trip.images}
          fallbackSrc={trip.fallbackImage}
          sizes="(max-width: 640px) 100vw, 320px"
          intervalMs={4600}
          startDelayMs={400}
          className={styles.cardSlideshow}
        />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardKicker}>{trip.tone}</span>
        <h3 className={styles.cardTitle}>{trip.title}</h3>
        <div className={styles.cardLocation}>⌖ {trip.place}</div>
        <p className={styles.cardCopy}>{trip.blurb}</p>
        <div className={styles.cardMeta}>
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
