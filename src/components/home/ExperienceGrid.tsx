import ImageSlideshow from "@/components/ui/ImageSlideshow";
import { img } from "@/lib/images";
import styles from "./home.module.css";

const rows = [
  {
    num: "01",
    title: "Places that make you pause.",
    text: "From mountain views to unexpected corners, the destination should feel worth the journey — not just another checkbox.",
  },
  {
    num: "02",
    title: "People who become part of the story.",
    text: "Shared experiences are at the heart of After630. It's not only about where you go, but who you remember it with.",
  },
  {
    num: "03",
    title: "The moments in between.",
    text: "The conversations, scenic stops and unplanned little memories are what make a trip feel personal and alive.",
  },
];

const waySlides = [
  img("homepage-way-01"),
  img("homepage-way-02"),
  img("homepage-way-03"),
  img("homepage-way-04"),
  img("homepage-way-05"),
];

export default function ExperienceGrid() {
  return (
    <section id="experience" className={styles.experience}>
      <div className="container">
        <div className={styles.experienceLayout}>
          <div className={styles.experienceVisual}>
            <ImageSlideshow
              slides={waySlides}
              sizes="(max-width: 980px) 100vw, 42vw"
              intervalMs={4500}
              startDelayMs={500}
              className={styles.experienceSlideshow}
            />
          </div>
          <div className={styles.experienceContent}>
            <div className={styles.experienceIntro}>
              <p className="eyebrow">The After630 Way</p>
              <h2 className="sectionTitle">A little less ordinary. A lot more alive.</h2>
              <p className="sectionText">
                We&apos;re building travel experiences around the joy of discovery, the energy of travelling
                together and the freedom to enjoy the journey — not just rush through it.
              </p>
            </div>
            <div className={styles.experienceRows}>
              {rows.map((row) => (
                <div key={row.num} className={styles.experienceRow}>
                  <span className={styles.expNum}>{row.num} /</span>
                  <div>
                    <h3>{row.title}</h3>
                    <p>{row.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
