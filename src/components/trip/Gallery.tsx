"use client";

import { useEffect, useRef, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import Dialog from "@/components/ui/Dialog";
import type { TripImage } from "@/lib/trips/types";
import styles from "./trip.module.css";

const SLOT_CLASSES = [styles.gallery1, styles.gallery2, "", ""];

export default function Gallery({
  images,
  fallbackSrc,
}: {
  images: TripImage[];
  fallbackSrc: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  if (images.length === 0) {
    return (
      <div style={{ aspectRatio: "16 / 9", borderRadius: 18, overflow: "hidden" }}>
        <SmartImage src="" alt="Trip imagery not yet available" fallbackSrc={fallbackSrc} priority />
      </div>
    );
  }

  if (images.length === 1) {
    const [image] = images;
    return (
      <div className={styles.singleGallery}>
        <SmartImage src={image.src} alt={image.alt} fallbackSrc={fallbackSrc} fit={image.fit} sizes="100vw" priority />
      </div>
    );
  }

  const visible = images.slice(0, 4);

  return (
    <>
      <div className={styles.gallery}>
        {visible.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            className={`${styles.galleryItem} ${SLOT_CLASSES[index] ?? ""}`}
            aria-label={`Open photo ${index + 1} of ${images.length}: ${image.alt}`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setLightboxIndex(index);
            }}
          >
            <SmartImage
              src={image.src}
              alt=""
              fallbackSrc={fallbackSrc}
              fit={image.fit}
              sizes="(max-width: 650px) 60vw, 30vw"
              priority={index === 0}
            />
            {index === visible.length - 1 && images.length > 1 && (
              <span className={styles.viewAllBadge}>▦ View all photos</span>
            )}
            {index === 2 && visible.length > 3 && (
              <span className={`${styles.viewAllBadge} ${styles.viewAllMobile}`}>▦ All photos</span>
            )}
          </button>
        ))}
      </div>

      <Dialog
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        title="Trip photo gallery"
        className={styles.lightbox}
      >
        {lightboxIndex !== null && (
          <LightboxContent
            images={images}
            index={lightboxIndex}
            fallbackSrc={fallbackSrc}
            onChangeIndex={setLightboxIndex}
          />
        )}
      </Dialog>
    </>
  );
}

function LightboxContent({
  images,
  index,
  fallbackSrc,
  onChangeIndex,
}: {
  images: TripImage[];
  index: number;
  fallbackSrc: string;
  onChangeIndex: (index: number) => void;
}) {
  const image = images[index];

  function goTo(nextIndex: number) {
    onChangeIndex((nextIndex + images.length) % images.length);
  }

  // Listen on the document rather than a local element: the native <dialog>
  // auto-focuses its first focusable child (the close button) on open, which
  // sits outside this subtree, so a locally-scoped onKeyDown would never see
  // the arrow-key presses.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  return (
    <div>
      <div className={styles.lightboxImg}>
        <SmartImage src={image.src} alt={image.alt} fallbackSrc={fallbackSrc} fit={image.fit} sizes="90vw" priority />
      </div>
      <div className={styles.lightboxBottom}>
        <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous photo">
          ← Previous
        </button>
        <p>
          {index + 1} / {images.length} · {image.alt}
        </p>
        <button type="button" onClick={() => goTo(index + 1)} aria-label="Next photo">
          Next →
        </button>
      </div>
    </div>
  );
}
