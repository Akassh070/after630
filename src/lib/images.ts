import { imageManifest, type ImageKey } from "@/content/images";

/**
 * Looks up a photo by its manifest key and returns `{ src, alt }`, ready to
 * spread onto `SmartImage`/`ImageSlideshow`/`next/image`. `src` is a
 * `cloudinary:<publicId>` marker — not a real URL — that
 * `src/lib/cloudinary-loader.ts` recognises and turns into a delivery URL at
 * render time. Never read `imageManifest` directly from a component.
 */
export function img(key: ImageKey): { src: string; alt: string } {
  const entry = imageManifest[key];
  return { src: `cloudinary:${entry.publicId}`, alt: entry.alt };
}
