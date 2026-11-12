import Image from "next/image";
import { img } from "@/lib/images";
import Button from "@/components/ui/Button";
import styles from "./home.module.css";

export default function ClosingCta() {
  return (
    <section id="closing" className={styles.closing}>
      <Image
        src={img("dramatic-mountain-peaks-under-open").src}
        alt={img("dramatic-mountain-peaks-under-open").alt}
        fill
        sizes="100vw"
      />
      <div className={`container ${styles.closingContent}`}>
        <p className="eyebrow">There&apos;s more out there</p>
        <h2 className={styles.closingTitle}>
          Your next great story <span className={styles.accent}>starts somewhere.</span>
        </h2>
        <p className={styles.closingText}>
          Maybe it&apos;s a place you&apos;ve never seen. Maybe it&apos;s people you haven&apos;t met. Either way,
          the next chapter is yours to explore.
        </p>
        <div className={styles.btnRow}>
          <Button href="/trips" variant="primary" inverted>
            Explore the journeys ↗
          </Button>
          <Button href="/contact" variant="ghost" inverted>
            Talk to us ↗
          </Button>
        </div>
      </div>
    </section>
  );
}
