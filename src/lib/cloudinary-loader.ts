"use client";

/**
 * Custom next/image loader (see next.config.ts `images.loaderFile`) —
 * required because "custom" is the only loader mode this Next.js version
 * supports for using an external image CDN instead of Next's own
 * optimizer; the legacy `loader: "cloudinary"` string only exists on
 * `next/legacy/image`, not the `next/image` this app uses.
 *
 * `src/lib/images.ts`'s `img()` encodes a Cloudinary photo as
 * `cloudinary:<publicId>` (not a real URL) so this loader can tell it apart
 * from a genuinely local path (e.g. the logos in /public/brand, which
 * still need to work unchanged). Never hand next/image a bare Cloudinary
 * publicId or a raw res.cloudinary.com URL — always go through `img()`.
 */

import { siteCopy } from "@/content/site";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || siteCopy.cloudinaryCloudName;

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("cloudinary:")) {
    if (!CLOUD_NAME) {
      throw new Error("No Cloudinary cloud name configured (src/content/site.ts → cloudinaryCloudName).");
    }
    const publicId = src.slice("cloudinary:".length);
    const params = ["f_auto", "q_auto" + (quality ? `:${quality}` : ""), "c_limit", `w_${width}`];
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params.join(",")}/${publicId}`;
  }

  // Local assets (logos, icons) — served as-is, un-optimized. There are very
  // few of these and they're already pre-sized, so skipping optimization is
  // a non-issue and keeps this loader's job to one thing: Cloudinary.
  return src;
}
