import Breadcrumb from "@/components/ui/Breadcrumb";
import { getTripDepartureLabel } from "@/lib/trips/availability";
import type { Trip } from "@/lib/trips/types";
import styles from "./trip.module.css";

function durationLabel(trip: Trip): string {
  const { days, nights } = trip.duration ?? {};
  if (!days) return "Duration to be announced";
  return nights ? `${days} Days / ${nights} Nights` : `${days} days`;
}

export default function TripHeader({ trip }: { trip: Trip }) {
  const departure = getTripDepartureLabel(trip);

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Explore Trips", href: "/trips" }, { label: trip.title }]} />
      <div className={styles.titleArea}>
        <div>
          {trip.tagline && <p className="eyebrow">{trip.tagline}</p>}
          <h1>
            {trip.title}
            {trip.subtitle && (
              <>
                <span className={styles.srOnlyColon}>: </span>
                <span className={styles.titleSub}>{trip.subtitle}</span>
              </>
            )}
          </h1>
          <div className={styles.location}>
            ⌖ {trip.place} / {trip.tone}
          </div>
        </div>
        <div className={styles.titleBadges}>
          {departure && <span className={styles.tag}>{departure}</span>}
          <span className={styles.tag}>◷ {durationLabel(trip)}</span>
        </div>
      </div>
    </>
  );
}
