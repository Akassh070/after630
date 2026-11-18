"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ImageSlideshow.module.css";

export type SlideshowSlide = {
  src: string;
  alt?: string;
  fit?: "contain";
};

type ImageSlideshowProps = {
  slides: SlideshowSlide[];
  sizes?: string;
  className?: string;
  intervalMs?: number;
  startDelayMs?: number;
  priority?: boolean;
  /** Pause rotation while pointer/focus is on the slideshow */
  pauseOnHover?: boolean;
  /** Local illustration shown if every remote photo fails to load. */
  fallbackSrc?: string;
};

export default function ImageSlideshow({
  slides,
  sizes = "(max-width: 760px) 100vw, 50vw",
  className,
  intervalMs = 4200,
  startDelayMs = 0,
  priority = false,
  pauseOnHover = true,
  fallbackSrc,
}: ImageSlideshowProps) {
  const [rawIndex, setIndex] = useState(0);
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  const pausedRef = useRef(false);
  // A photo that 404s is dropped from the rotation instead of leaving a blank
  // frame on screen for its whole turn.
  const photos = slides.filter((slide) => Boolean(slide.src) && !failed.has(slide.src));
  const index = photos.length > 0 ? rawIndex % photos.length : 0;

  function markFailed(src: string) {
    setFailed((current) => (current.has(src) ? current : new Set(current).add(src)));
  }

  useEffect(() => {
    if (photos.length < 2) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (pausedRef.current) return;
        setIndex((current) => (current + 1) % photos.length);
      }, intervalMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [photos.length, intervalMs, startDelayMs]);

  if (photos.length === 0) {
    return (
      <div className={`${styles.frame} ${className ?? ""}`} aria-hidden="true">
        {fallbackSrc && (
          // eslint-disable-next-line @next/next/no-img-element -- local static SVG fallback
          <img src={fallbackSrc} alt="" className={styles.fallback} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`${styles.frame} ${className ?? ""}`}
      aria-hidden="true"
      onMouseEnter={() => {
        if (pauseOnHover) pausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) pausedRef.current = false;
      }}
    >
      {photos.map((photo, photoIndex) => (
        <Image
          key={`${photo.src}-${photoIndex}`}
          src={photo.src}
          alt=""
          fill
          sizes={sizes}
          priority={priority && photoIndex === 0}
          className={`${styles.slide} ${photo.fit ? styles.contained : ""} ${photoIndex === index ? styles.slideActive : ""}`}
          onError={() => markFailed(photo.src)}
        />
      ))}
    </div>
  );
}
