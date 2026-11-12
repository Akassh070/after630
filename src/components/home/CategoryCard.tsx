import Link from "next/link";
import ImageSlideshow, { type SlideshowSlide } from "@/components/ui/ImageSlideshow";
import styles from "./home.module.css";

type CategoryCardProps = {
  label: string;
  title: string;
  tagline: string;
  href: string;
  photos: SlideshowSlide[];
  intervalMs?: number;
  startDelayMs?: number;
  priority?: boolean;
};

export default function CategoryCard({
  label,
  title,
  tagline,
  href,
  photos,
  intervalMs = 4200,
  startDelayMs = 0,
  priority = false,
}: CategoryCardProps) {
  return (
    <Link href={href} className={styles.categoryCard}>
      <ImageSlideshow
        slides={photos}
        sizes="400px"
        intervalMs={intervalMs}
        startDelayMs={startDelayMs}
        priority={priority}
        className={styles.categorySlides}
      />
      <span className={styles.categoryLabel}>{label}</span>
      <span className={styles.categoryInner}>
        <span>
          <h3>{title}</h3>
          <p>{tagline}</p>
        </span>
        <span className={styles.categoryArrow} aria-hidden="true">
          ↗
        </span>
      </span>
    </Link>
  );
}
