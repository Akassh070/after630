import Image from "next/image";
import { img } from "@/lib/images";
import Button from "@/components/ui/Button";
import styles from "./trip.module.css";

export default function EndCta() {
  return (
    <section className={styles.endCta}>
      <Image
        src={img("spiti-valley-himachal-pradesh").src}
        alt={img("spiti-valley-himachal-pradesh").alt}
        fill
        sizes="100vw"
      />
      <div className={`container ${styles.endCtaInner}`}>
        <p className="eyebrow">There&apos;s more out there</p>
        <h2>Your next great story starts somewhere.</h2>
        <p>
          Have a question about travel with After630? Tell us the kind of journey you&apos;re looking for — we&apos;ll
          help you from there.
        </p>
        <div style={{ marginTop: 20 }}>
          <Button href="/contact" variant="primary" inverted>
            Start a conversation ↗
          </Button>
        </div>
      </div>
    </section>
  );
}
