import Button from "@/components/ui/Button";
import { img } from "@/lib/images";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import styles from "./home.module.css";

const storySlides = [
  img("homepage-beginning-01"),
  img("homepage-beginning-02"),
  img("homepage-beginning-03"),
  img("homepage-beginning-04"),
  img("homepage-beginning-05"),
];

export default function Story() {
  return (
    <section id="story" className={styles.story}>
      <div className={`container ${styles.storyGrid}`}>
        <div className={styles.storyVisual}>
          <span className={styles.storyTag}>Our Beginning</span>
          <ImageSlideshow
            slides={storySlides}
            sizes="(max-width: 980px) 100vw, 45vw"
            intervalMs={4200}
            className={styles.storySlideshow}
          />
        </div>
        <div className={styles.storyCopy}>
          <p className="eyebrow">The Story of After630</p>
          <h2 className="sectionTitle">It started with bringing people together.</h2>
          <p>
            Before the journeys, there were gatherings. Conversations, stories and experiences that brought new
            people into the same room. Now we&apos;re taking that idea further — beyond the familiar places and
            into shared travel experiences.
          </p>
          <p>The location changes. The idea of connecting people stays.</p>
          <div className={styles.btnRow}>
            <Button href="/contact" variant="primary">
              Talk to us ↗
            </Button>
            <Button href="/about" variant="ghost">
              Read our story ↗
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
