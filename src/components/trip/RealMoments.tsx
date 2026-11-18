"use client";

import { useEffect, useRef, useState } from "react";
import type { TripVideo } from "@/lib/trips/types";
import styles from "./trip.module.css";

/**
 * Short, silent phone clips from the actual stay. They play as muted loops
 * only while on screen; with reduced motion enabled they stay paused on their
 * poster frame and show native controls instead.
 */
export default function RealMoments({ videos }: { videos: TripVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <section id="real-moments" className={styles.section}>
      <p className="eyebrow">Unfiltered</p>
      <h2>Real moments from the mountain house</h2>
      <p>Phone clips from our stay, not stock footage. This is the view you&rsquo;ll wake up to.</p>
      <div className={styles.moments}>
        {videos.map((clip) => (
          <MomentClip key={clip.src} clip={clip} />
        ))}
      </div>
    </section>
  );
}

function MomentClip({ clip }: { clip: TripVideo }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    if (query.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (e.g. battery saver); the poster stays visible then.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={styles.moment}>
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reducedMotion}
        aria-label={clip.alt}
      />
      {clip.caption && <figcaption>{clip.caption}</figcaption>}
    </figure>
  );
}
