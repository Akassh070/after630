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
      {/* Blank lines in `description` separate paragraphs. */}
      {(trip.description || trip.blurb)
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}

      {trip.audience && trip.audience.length > 0 && (
        <div className={styles.audience}>
          <h3>Who this trip is for</h3>
          <ul>
            {trip.audience.map((item) => (
              <li key={item}>
                <b aria-hidden="true">✓</b> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

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
