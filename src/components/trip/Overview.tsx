import type { Trip } from "@/lib/trips/types";
import styles from "./trip.module.css";

function durationLabel(trip: Trip): string {
  const { days, nights } = trip.duration ?? {};
  if (!days) return "To be announced";
  return nights ? `${days}D / ${nights}N` : `${days} days`;
}

function statusLabel(trip: Trip): string {
  if (trip.status === "coming-soon") return "Coming soon";
  return trip.status.replace(/-/g, " ");
}

export default function Overview({ trip }: { trip: Trip }) {
  return (
    <section id="overview" className={styles.section}>
      <p className="eyebrow">The experience</p>
      <h2>About this journey</h2>
      {trip.description ? <p>{trip.description}</p> : trip.blurb ? <p>{trip.blurb}</p> : null}

      <div className={styles.facts}>
        <div className={styles.fact}>
          <div className={styles.factLabel}>Destination</div>
          <div className={styles.factValue}>{trip.place}</div>
        </div>
        <div className={styles.fact}>
          <div className={styles.factLabel}>Duration</div>
          <div className={styles.factValue}>{durationLabel(trip)}</div>
        </div>
        <div className={styles.fact}>
          <div className={styles.factLabel}>Travel style</div>
          <div className={styles.factValue}>{trip.tone || "Group journey"}</div>
        </div>
        <div className={styles.fact}>
          <div className={styles.factLabel}>Trip status</div>
          <div className={styles.factValue}>{statusLabel(trip)}</div>
        </div>
      </div>
    </section>
  );
}
