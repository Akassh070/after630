import { imageManifest, videoManifest, type ImageKey, type ImageManifestEntry, type VideoKey } from "@/content/images";
import { siteCopy } from "@/content/site";

/**
 * Looks up a photo by its manifest key and returns `{ src, alt }`, ready to
 * spread onto `SmartImage`/`ImageSlideshow`/`next/image`. `src` is a
 * `cloudinary:<publicId>` marker — not a real URL — that
 * `src/lib/cloudinary-loader.ts` recognises and turns into a delivery URL at
 * render time. Never read `imageManifest` directly from a component.
 */
export function img(key: ImageKey): { src: string; alt: string; position?: string } {
  const entry: ImageManifestEntry = imageManifest[key];
  return {
    src: `cloudinary:${entry.publicId}`,
    alt: entry.alt,
    ...(entry.position ? { position: entry.position } : {}),
  };
}

/**
 * Absolute Cloudinary URL for an `img()`-style src (e.g. `trip.images[0].src`),
 * for places next/image never sees: Open Graph share images and JSON-LD.
 * JPEG rather than f_auto, because some link-preview crawlers (WhatsApp among
 * them) don't reliably render WebP/AVIF, and q_auto:eco keeps a 1200px photo under
 * WhatsApp's ~300 KB preview limit. A local path like "/brand/x.png" is
 * returned unchanged; metadataBase makes it absolute.
 */
export function absoluteImageSrc(src: string, width = 1200): string {
  if (!src.startsWith("cloudinary:")) return src;
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || siteCopy.cloudinaryCloudName;
  const publicId = src.slice("cloudinary:".length);
  return `https://res.cloudinary.com/${cloud}/image/upload/f_jpg,q_auto:eco,c_limit,w_${width}/${publicId}`;
}

/**
 * Link-preview (Open Graph) image for WhatsApp, Instagram, Facebook, X and
 * LinkedIn: a 1200×630 crop, the size they all render as a large card.
 * Centre crop: Cloudinary's g_auto tested worse on the Himachal photos (it
 * kept foreground ferns and cut the mountains). A local path (e.g. the logo
 * fallback) is returned as a square image instead.
 */
export function shareImage(image: { src: string; alt: string }) {
  if (!image.src.startsWith("cloudinary:")) {
    return { url: image.src, width: 1024, height: 1024, alt: image.alt };
  }
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || siteCopy.cloudinaryCloudName;
  const publicId = image.src.slice("cloudinary:".length);
  return {
    url: `https://res.cloudinary.com/${cloud}/image/upload/f_jpg,q_auto:eco,c_fill,g_center,w_1200,h_630/${publicId}`,
    width: 1200,
    height: 630,
    alt: image.alt,
  };
}

export type VideoSource = {
  /** H.264 MP4, silent, width-limited — plays everywhere a muted loop can. */
  src: string;
  /** First frame as an image, shown before playback (and if autoplay is blocked). */
  poster: string;
  alt: string;
};

/**
 * Looks up a clip in `videoManifest` and returns real Cloudinary delivery
 * URLs. Unlike photos, `<video>` can't go through next/image's loader, so the
 * URL is built here. Audio is stripped (`ac_none`): these play as muted loops.
 */
export function video(key: VideoKey, width = 720): VideoSource {
  const entry = videoManifest[key];
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || siteCopy.cloudinaryCloudName;
  const base = `https://res.cloudinary.com/${cloud}/video/upload`;
  return {
    src: `${base}/q_auto,c_limit,w_${width},vc_h264,ac_none/${entry.publicId}.mp4`,
    poster: `${base}/so_0,q_auto,c_limit,w_${width}/${entry.publicId}.jpg`,
    alt: entry.alt,
  };
}
