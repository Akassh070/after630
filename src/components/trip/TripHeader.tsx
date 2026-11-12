import Breadcrumb from "@/components/ui/Breadcrumb";
import type { Trip } from "@/lib/trips/types";
import styles from "./trip.module.css";

function durationLabel(trip: Trip): string {
  const { days, nights } = trip.duration ?? {};
  if (!days) return "Duration to be announced";
  return nights ? `${days} Days / ${nights} Nights` : `${days} days`;
}

export default function TripHeader({ trip }: { trip: Trip }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Explore Trips", href: "/trips" }, { label: trip.title }]} />
      <div className={styles.titleArea}>
        <div>
          {trip.tagline && <p className="eyebrow">{trip.tagline}</p>}
          <h1>{trip.title}</h1>
          <div className={styles.location}>
            ⌖ {trip.place} / {trip.tone}
          </div>
        </div>
        <div className={styles.titleBadges}>
          <span className={styles.tag}>◷ {durationLabel(trip)}</span>
        </div>
      </div>
    </>
  );
}
