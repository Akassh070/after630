"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./SmartImage.module.css";

type SmartImageProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fit?: "contain";
};

/**
 * Reserves its box (fill layout — give the wrapper an aspect-ratio) and
 * swaps to a locally bundled fallback illustration if the remote photo
 * fails to load, so a slow/blocked network never breaks the layout.
 */
export default function SmartImage({
  src,
  alt,
  fallbackSrc,
  sizes = "(max-width: 760px) 100vw, 50vw",
  priority,
  className,
  fit,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={`${styles.frame} ${fit ? styles.contained : ""} ${className ?? ""}`}>
      {errored ? (
        // eslint-disable-next-line @next/next/no-img-element -- local static fallback
        <img src={fallbackSrc} alt={alt} className={styles.fallback} loading="lazy" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.img}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
