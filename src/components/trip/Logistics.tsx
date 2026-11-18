import type { Trip } from "@/lib/trips/types";
import styles from "./trip.module.css";

export default function Logistics({ trip }: { trip: Trip }) {
  const entries = trip.travelStay ?? [];
  if (entries.length === 0) return null;

  return (
    <section id="logistics" className={styles.section}>
      <p className="eyebrow">Practical details</p>
      <h2>Travel &amp; stay details.</h2>
      <p>
        Transport, stay and pick-up details for this journey.
      </p>
      <div className={styles.detailsGrid}>
        {entries.map((entry) => (
          <div key={entry.label} className={styles.detailCell}>
            <div className={styles.t}>{entry.label}</div>
            <div className={styles.v}>{entry.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
