import type { Metadata } from "next";
import { img } from "@/lib/images";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import styles from "@/components/secondary/secondary.module.css";

export const metadata: Metadata = {
  title: "Past Experiences",
  description: "After630's earlier storytelling and social gatherings, before the move into group travel.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <section className={styles.archiveHero}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Past Experiences" }]} />
          <p className="eyebrow">The before of what&apos;s next</p>
          <h1>Every great journey starts with a story.</h1>
          <p className={styles.archiveLede}>
            Before taking our experiences onto the road, After630 brought people together through storytelling
            and social gatherings. Here&apos;s where the journey began.
          </p>
        </div>
      </section>

      <section className={styles.archiveFeature}>
        <div className="container">
          <div className={styles.archiveBlock}>
            <div className={`${styles.archivePicture} ${styles.imageFrame}`}>
              <Image
                src={img("pages-archive-01-gathering").src}
                alt={img("pages-archive-01-gathering").alt}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <span className={styles.archiveNumber}>Archive 01 / Our Beginning</span>
              <h2>The first time we all came together.</h2>
              <p>
                An After630 gathering built around the simple magic of people meeting, sharing conversations and
                being part of something beyond the ordinary.
              </p>
              <span className={styles.archiveCapsule}>Title &amp; date TBA</span>
            </div>
          </div>

          <div className={`${styles.archiveBlock} ${styles.reverse}`} style={{ borderBottom: "none" }}>
            <div className={`${styles.archivePicture} ${styles.imageFrame}`}>
              <Image
                src={img("pages-archive-02-shared-table").src}
                alt={img("pages-archive-02-shared-table").alt}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <span className={styles.archiveNumber}>Archive 02 / The Story Continues</span>
              <h2>Another gathering. More stories.</h2>
              <p>
                Our second experience continued the same spirit — creating a reason to show up, connect and be
                part of a shared moment.
              </p>
              <span className={styles.archiveCapsule}>Title &amp; date TBA</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.archiveQuote} ${styles.bandDark}`}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: "center", display: "block" }}>
            The thread that connects it all
          </p>
          <p>Some experiences end when the evening does. The best ones stay with you.</p>
        </div>
      </section>

      <section className={styles.archiveLast}>
        <div className="container">
          <div className={styles.archiveLastGrid}>
            <div>
              <p className="eyebrow">Where we go from here</p>
              <h2 className="sectionTitle">From shared spaces to shared journeys.</h2>
              <p className="sectionText">
                Our next chapter moves beyond gatherings and into curated group travel. The setting gets bigger,
                but the idea remains the same: people, places and memories worth keeping.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 22 }}>
                <Button href="/trips" variant="primary">
                  Explore future journeys ↗
                </Button>
                <Button href="/about" variant="ghost">
                  Our story ↗
                </Button>
              </div>
            </div>
            <div className={`${styles.archiveLastPhoto} ${styles.imageFrame}`}>
              <Image
                src={img("pages-experiences-riverside").src}
                alt={img("pages-experiences-riverside").alt}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
