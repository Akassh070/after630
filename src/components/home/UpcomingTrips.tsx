import Link from "next/link";
import Button from "@/components/ui/Button";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import Pill from "@/components/ui/Pill";
import FeatureTripCard from "@/components/trips/FeatureTripCard";
import {
  getTripDepartureLabel,
  getStartingPriceINR,
  formatPriceINR,
} from "@/lib/trips/availability";
import type { Trip } from "@/lib/trips/types";
import styles from "./home.module.css";

function durationLabel(trip: Trip): string {
  const { days, nights } = trip.duration ?? {};
  if (!days) return "To be announced";
  return nights ? `${days} Days / ${nights} Nights` : `${days} Days`;
}

function departureLabel(trip: Trip): string {
  return getTripDepartureLabel(trip) ?? "To be announced";
}

function priceLabel(trip: Trip): string {
  return formatPriceINR(getStartingPriceINR(trip));
}

export default function UpcomingTrips({ trips }: { trips: Trip[] }) {
  const [featured, ...rest] = trips;
  const singleTrip = trips.length === 1;

  return (
    <section id="upcoming" className={styles.upcoming}>
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            {singleTrip ? (
              <h2 className="sectionTitle">Upcoming trip</h2>
            ) : (
              <>
                <p className="eyebrow">Upcoming Trips</p>
                <h2 className="sectionTitle">Journeys worth looking forward to.</h2>
                <p className={`sectionText ${styles.sectionLede}`}>
                  A first look at the kind of places and adventures we want to share with you.
                </p>
              </>
            )}
          </div>
          {!singleTrip && (
            <div className={styles.sectionHeadRight}>
              <Button href="/trips" variant="ghost">
                Explore all journeys ↗
              </Button>
            </div>
          )}
        </div>

        {trips.length === 0 ? (
          <p className="sectionText">
            New journeys are coming soon. Check back shortly, or{" "}
            <Link href="/contact" style={{ color: "var(--color-blue-dark)", fontWeight: 700 }}>
              ask us
            </Link>{" "}
            what you&apos;re hoping to find.
          </p>
        ) : singleTrip ? (
          <FeatureTripCard trip={featured} />
        ) : (
          <div className={styles.tripsLayout}>
            {featured && (
              <article className={styles.highlight}>
                <ImageSlideshow
                  slides={featured.images}
                  fallbackSrc={featured.fallbackImage}
                  sizes="(max-width: 980px) 100vw, 55vw"
                  intervalMs={4000}
                  startDelayMs={0}
                  priority
                  className={`${styles.highlightImage} ${styles.fallbackBg}`}
                />
                <div className={styles.highlightTop}>
                  <span className={styles.badge}>{durationLabel(featured)}</span>
                </div>
                <div className={styles.highlightBottom}>
                  <h3>{featured.title}</h3>
                  <p>{featured.blurb}</p>
                  <div className={styles.metaRow}>
                    <div>
                      <span className={styles.metaK}>Departure</span>
                      <span className={styles.metaV}>{departureLabel(featured)}</span>
                    </div>
                    <div>
                      <span className={styles.metaK}>Starting Price</span>
                      <span className={styles.metaV}>{priceLabel(featured)}</span>
                    </div>
                  </div>
                  <div className={styles.tripActions}>
                    <Button href={`/trips/${featured.slug}`} variant="primary" inverted className={styles.askCta}>
                      Ask about this trip ↗
                    </Button>
                  </div>
                </div>
              </article>
            )}

            <div className={styles.tripList}>
              {rest.map((trip, index) => (
                <Link key={trip.id} href={`/trips/${trip.slug}`} className={styles.miniTrip}>
                  <div className={styles.miniVisual}>
                    <ImageSlideshow
                      slides={trip.images}
                      fallbackSrc={trip.fallbackImage}
                      sizes="220px"
                      intervalMs={4500 + index * 500}
                      startDelayMs={800 + index * 600}
                      className={styles.fallbackBg}
                    />
                    <span className={`${styles.badge} ${styles.miniBadge}`}>{durationLabel(trip)}</span>
                  </div>
                  <div className={styles.miniBody}>
                    <h3 className={styles.miniTitle}>{trip.title}</h3>
                    <p className={styles.miniCopy}>{trip.blurb}</p>
                    <div className={styles.miniMeta}>
                      <Pill>{departureLabel(trip)}</Pill>
                      <Pill>{priceLabel(trip)}</Pill>
                    </div>
                    <div className={styles.miniFooter}>
                      <span className={styles.miniCta}>Ask about this trip ↗</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
