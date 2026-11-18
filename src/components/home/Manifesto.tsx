import Button from "@/components/ui/Button";
import { img } from "@/lib/images";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import styles from "./home.module.css";

const peopleSlides = [
  img("homepage-people-a-01"),
  img("homepage-people-a-02"),
  img("homepage-people-a-03"),
  img("homepage-people-a-04"),
  img("homepage-people-a-05"),
];

const placeSlides = [
  img("homepage-people-b-01"),
  img("homepage-people-b-02"),
  img("homepage-people-b-03"),
  img("homepage-people-b-04"),
  img("homepage-people-b-05"),
];

export default function Manifesto() {
  return (
    <section id="about-feel" className={styles.manifesto}>
      <div className="container">
        <div className={styles.manifestoGrid}>
          <div>
            <p className="eyebrow">The People Make the Journey</p>
            <h2 className={styles.manifestoTitle}>
              Go for the places. <span className={styles.accent}>Stay for the people.</span>
            </h2>
            <p className={styles.manifestoText}>
              Some journeys give you beautiful photos. The best ones give you stories, unexpected friendships and
              experiences that stay with you long after you&apos;re home.
            </p>
            <div className={styles.btnRow}>
              <Button href="#experience" variant="primary" inverted>
                Discover the experience ↗
              </Button>
              <Button href="/about" variant="ghost" inverted>
                Read our story ↗
              </Button>
            </div>
          </div>
          <div className={styles.manifestoPhotos}>
            <div className={`${styles.shapePhoto} ${styles.shapePhotoA}`}>
              <ImageSlideshow
                slides={peopleSlides}
                sizes="(max-width: 980px) 60vw, 30vw"
                intervalMs={4500}
                className={styles.manifestoSlideshow}
              />
            </div>
            <div className={`${styles.shapePhoto} ${styles.shapePhotoB}`}>
              <ImageSlideshow
                slides={placeSlides}
                sizes="(max-width: 980px) 40vw, 22vw"
                intervalMs={5000}
                startDelayMs={900}
                className={styles.manifestoSlideshow}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}