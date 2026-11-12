import ImageSlideshow from "@/components/ui/ImageSlideshow";
import { img } from "@/lib/images";
import styles from "./trips.module.css";

const heroSlides = [
  img("atmospheric-mountain-landscape-representing-adventure"),
  img("dramatic-mountain-peaks-under-open"),
  img("mountain-pass-and-open-sky"),
  img("open-highway-stretching-toward-distant"),
  img("hill-viewpoint-overlooking-water-and"),
];

export default function TripsHero() {
  return (
    <section className={styles.hero}>
      <ImageSlideshow
        slides={heroSlides}
        sizes="100vw"
        intervalMs={5000}
        priority
        className={styles.heroSlideshow}
      />
      <div className={`container ${styles.heroInner}`}>
        <p className="eyebrow" style={{ color: "#a9dcee" }}>
          The next chapter is out there
        </p>
        <h1>Find your next escape.</h1>
        <p>
          From mountain trails to long roads and weekend resets. Explore journeys that take you somewhere new —
          and bring you back with stories.
        </p>
      </div>
    </section>
  );
}
