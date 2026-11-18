import type { Metadata } from "next";
import { img } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import styles from "@/components/secondary/secondary.module.css";

export const metadata: Metadata = {
  title: "About After630",
  description: "After630's story — from storytelling gatherings to curated group travel experiences.",
  alternates: { canonical: "/about" },
};

const BELIEFS = [
  {
    num: "01",
    title: "Adventure should feel inviting.",
    text: "Finding a group journey should feel exciting, not overwhelming — whether you're travelling solo or with your people.",
  },
  {
    num: "02",
    title: "The people matter.",
    text: "Real conversations, collective excitement and the unexpected friendships that turn a route into a story.",
  },
  {
    num: "03",
    title: "Clarity builds trust.",
    text: "Trip details, dates and inclusions should be easy to understand before anyone commits to a booking.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.aboutHero}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />
          <div className={styles.aboutHeroGrid}>
            <div className={styles.aboutHeroCopy}>
              <p className="eyebrow">This is After630</p>
              <h1 className="sectionTitle" style={{ fontSize: "clamp(42px, 6.4vw, 72px)" }}>
                First, we shared stories. Now, we go places.
              </h1>
              <p>
                After630 began with a simple belief: a great experience can bring strangers into the same story.
                What started as gatherings is now growing into curated group journeys.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Button href="/trips" variant="primary">
                  Discover the journeys ↗
                </Button>
              </div>
            </div>
            <div className={styles.aboutHeroVisual}>
              <div className={`${styles.imageFrame} ${styles.mainShot}`}>
                <Image
                  src={img("pages-about-hero-main").src}
                  alt={img("pages-about-hero-main").alt}
                  fill
                  sizes="(max-width: 760px) 70vw, 35vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={`${styles.imageFrame} ${styles.secondShot}`}>
                <Image
                  src={img("pages-about-hero-inset").src}
                  alt={img("pages-about-hero-inset").alt}
                  fill
                  sizes="(max-width: 760px) 50vw, 24vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.openingLine}>
        <div className="container">
          <div className={styles.openingLineInner}>
            <p>
              We&apos;re not here just to fill your calendar. We want to create the kind of moments you carry
              home — <span style={{ color: "var(--color-blue)" }}>stories, unexpected connections and a reason
              to look forward to what&apos;s next.</span>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.chapters}>
        <div className="container">
          <div className={styles.chapterHead}>
            <p className="eyebrow">Our journey</p>
            <h2 className="sectionTitle">Two chapters. One spirit.</h2>
            <p className="sectionText" style={{ marginInline: "auto" }}>
              The story isn&apos;t about changing direction. It&apos;s about taking what we love — shared
              experiences — into a bigger world.
            </p>
          </div>

          <div className={styles.chapterGrid}>
            <Link href="/experiences" className={styles.chapterCard}>
              <div className={`${styles.chapterPhoto} ${styles.imageFrame}`}>
                <Image
                  src={img("pages-about-chapter-01").src}
                  alt={img("pages-about-chapter-01").alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.chapterInfo}>
                <span className={styles.chapterKicker}>Chapter 01 · The Gatherings</span>
                <h3>It began with people.</h3>
                <p>
                  Our first experiences centered on storytelling, conversation and bringing people together. The
                  original spark behind After630 was social connection.
                </p>
                <span className="btnGhost">See the early chapters ↗</span>
              </div>
            </Link>

            <Link href="/trips" className={styles.chapterCard}>
              <div className={`${styles.chapterPhoto} ${styles.imageFrame}`}>
                <Image
                  src={img("pages-about-chapter-02").src}
                  alt={img("pages-about-chapter-02").alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.chapterInfo}>
                <span className={styles.chapterKicker}>Chapter 02 · The Road Ahead</span>
                <h3>Now, the world opens up.</h3>
                <p>
                  Curated group travel is the next chapter: beautiful places, shared adventures and a journey
                  built around people as much as destinations.
                </p>
                <span className="btnGhost">Explore journeys ↗</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.beliefs}>
        <div className="container">
          <div className={styles.beliefGrid}>
            <div>
              <p className="eyebrow">What we believe</p>
              <h2 className="sectionTitle">The best part is the together part.</h2>
              <p className="sectionText">
                A brand built for people who&apos;d rather collect memories than just tick places off a list.
              </p>
            </div>
            <div className={styles.beliefsList}>
              {BELIEFS.map((belief) => (
                <div key={belief.num} className={styles.belief}>
                  <b>{belief.num} /</b>
                  <div>
                    <h3>{belief.title}</h3>
                    <p>{belief.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.aboutCta} ${styles.bandDark}`}>
        <div className={`container ${styles.aboutCtaInner}`}>
          <div>
            <p className="eyebrow">Your next chapter</p>
            <h2 className="sectionTitle">The destination changes. The feeling stays with you.</h2>
          </div>
          <Button href="/contact" variant="primary" inverted>
            Start a conversation ↗
          </Button>
        </div>
      </section>
    </>
  );
}
