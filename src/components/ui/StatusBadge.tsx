import type { TripStatus } from "@/lib/trips/types";
import styles from "./StatusBadge.module.css";

const LABELS: Record<TripStatus, string> = {
  draft: "Draft",
  "coming-soon": "Coming soon",
  published: "Booking open",
  "sold-out": "Sold out",
  postponed: "Postponed",
  cancelled: "Cancelled",
  completed: "Completed",
};

const CLASS_BY_STATUS: Record<TripStatus, string> = {
  draft: styles.draft,
  "coming-soon": styles.comingSoon,
  published: styles.published,
  "sold-out": styles.soldOut,
  postponed: styles.postponed,
  cancelled: styles.cancelled,
  completed: styles.completed,
};

export default function StatusBadge({ status }: { status: TripStatus }) {
  return <span className={`${styles.badge} ${CLASS_BY_STATUS[status]}`}>{LABELS[status]}</span>;
}
