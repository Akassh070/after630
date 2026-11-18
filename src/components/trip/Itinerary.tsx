import Accordion from "@/components/ui/Accordion";
import type { Trip, TripItineraryDay } from "@/lib/trips/types";
import BrochureDownload from "./BrochureDownload";
import styles from "./trip.module.css";

export default function Itinerary({ days, brochure }: { days: TripItineraryDay[]; brochure?: Trip["brochure"] }) {
  if (days.length === 0) return null;

  const items = days.map((day) => ({
    id: `day-${day.day}`,
    title: (
      <span className={styles.dayTrigger}>
        <span className={styles.dayNumber}>{String(day.day).padStart(2, "0")}</span>
        <span>
          <span className={styles.dayLabel}>Day {day.day}</span>
          <span className={styles.dayTitle}>{day.title}</span>
        </span>
      </span>
    ),
    content: <p style={{ margin: 0 }}>{day.description}</p>,
    defaultOpen: day.day === 1,
  }));

  return (
    <section id="itinerary" className={styles.section}>
      <div className={styles.itineraryHead}>
        <div>
          <p className="eyebrow">Day by day</p>
          <h2>Every day, a new chapter.</h2>
        </div>
        <BrochureDownload brochure={brochure} variant="link" />
      </div>
      <Accordion items={items} showExpandAll />
    </section>
  );
}
