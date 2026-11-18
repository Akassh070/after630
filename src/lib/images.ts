import { imageManifest, videoManifest, type ImageKey, type VideoKey } from "@/content/images";
import { siteCopy } from "@/content/site";

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
