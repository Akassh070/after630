import type { Trip } from "@/lib/trips/types";
import styles from "./trip.module.css";

export default function Inclusions({ trip }: { trip: Trip }) {
  const hasContent = (trip.inclusions?.length ?? 0) > 0 || (trip.exclusions?.length ?? 0) > 0;
  if (!hasContent) return null;

  return (
    <section id="inclusions" className={styles.section}>
      <p className="eyebrow">Know before you go</p>
      <h2>What&apos;s included — and what&apos;s not.</h2>

      <div className={styles.incGrid}>
        {trip.inclusions && trip.inclusions.length > 0 && (
          <div className={styles.incBox}>
            <h3>✓ Inclusions</h3>
            <ul>
              {trip.inclusions.map((item) => (
                <li key={item}>
                  <b>✓</b> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {trip.exclusions && trip.exclusions.length > 0 && (
          <div className={`${styles.incBox} ${styles.exclusion}`}>
            <h3>− Exclusions</h3>
            <ul>
              {trip.exclusions.map((item) => (
                <li key={item}>
                  <b>−</b> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
