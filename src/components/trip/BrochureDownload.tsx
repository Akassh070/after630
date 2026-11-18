import type { Trip } from "@/lib/trips/types";
import buttonStyles from "@/components/ui/Button.module.css";
import styles from "./trip.module.css";

/**
 * "Download itinerary (PDF)" link for a trip's brochure in /public. A plain
 * <a download>, not next/link: it's a file, not a page, so the browser should
 * save it rather than route to it. Renders nothing when the trip has no
 * brochure, so there's never a dead download link.
 */
export default function BrochureDownload({
  brochure,
  variant = "button",
}: {
  brochure: Trip["brochure"];
  /** "button": full-width outline button (booking card). "link": compact text link (section headers). */
  variant?: "button" | "link";
}) {
  if (!brochure) return null;
  const label = `Download itinerary (PDF${brochure.sizeLabel ? `, ${brochure.sizeLabel}` : ""})`;

  if (variant === "link") {
    return (
      <a href={brochure.href} download={brochure.fileName} className={styles.brochureLink}>
        <span aria-hidden="true">↓</span> {label}
      </a>
    );
  }

  return (
    <a
      href={brochure.href}
      download={brochure.fileName}
      className={`${buttonStyles.base} ${buttonStyles.outline} ${buttonStyles.fullWidth} ${styles.brochureButton}`}
    >
      <span aria-hidden="true">↓</span> {label}
    </a>
  );
}
