import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import cloudinaryLoader from "@/lib/cloudinary-loader";
import { imageManifest, videoManifest } from "@/content/images";
import { img, video } from "@/lib/images";

const SRC_DIR = path.resolve(__dirname, "../../src");

function allSourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return allSourceFiles(full);
    return /\.(ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

const sourceFiles = allSourceFiles(SRC_DIR);

describe("cloudinaryLoader", () => {
  it("builds a Cloudinary delivery URL for a manifest-sourced image", () => {
    const { src } = img("homepage-hero");
    const url = cloudinaryLoader({ src, width: 640, quality: 80 });
    expect(url).toBe(
      "https://res.cloudinary.com/test-cloud/image/upload/f_auto,q_auto:80,c_limit,w_640/after630/homepage/hero",
    );
  });

  it("omits the quality suffix when no quality is given", () => {
    const { src } = img("homepage-hero");
    const url = cloudinaryLoader({ src, width: 320 });
    expect(url).toContain("/f_auto,q_auto,c_limit,w_320/");
  });

  it("passes a local asset (e.g. the logo) through unchanged, never routed through Cloudinary", () => {
    const url = cloudinaryLoader({ src: "/brand/after630-logo-ink.svg", width: 200 });
    expect(url).toBe("/brand/after630-logo-ink.svg");
  });
});

describe("video()", () => {
  it("builds a silent H.264 MP4 and a first-frame poster on Cloudinary's video pipeline", () => {
    const clip = video("himachal-sunset-dog");
    expect(clip.src).toBe(
      "https://res.cloudinary.com/test-cloud/video/upload/q_auto,c_limit,w_720,vc_h264,ac_none/after630/trips/himachal/sunset-dog.mp4",
    );
    expect(clip.poster).toBe(
      "https://res.cloudinary.com/test-cloud/video/upload/so_0,q_auto,c_limit,w_720/after630/trips/himachal/sunset-dog.jpg",
    );
  });
});

describe("image manifest", () => {
  it("every img(\"key\") call in the source tree references a key that exists", () => {
    const callPattern = /\bimg\(\s*"([^"]+)"\s*\)/g;
    const missing: string[] = [];
    for (const file of sourceFiles) {
      if (file.endsWith(`${path.sep}content${path.sep}images.ts`)) continue;
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(callPattern)) {
        const key = match[1];
        if (!(key in imageManifest)) missing.push(`${key} (in ${path.relative(SRC_DIR, file)})`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("has no unused entries", () => {
    const used = new Set<string>();
    const callPattern = /\bimg\(\s*"([^"]+)"\s*\)/g;
    for (const file of sourceFiles) {
      if (file.endsWith(`${path.sep}content${path.sep}images.ts`)) continue;
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(callPattern)) used.add(match[1]);
    }
    const unused = Object.keys(imageManifest).filter((key) => !used.has(key));
    expect(unused).toEqual([]);
  });

  it("every video(\"key\") call references a key that exists, and every video entry is used", () => {
    const callPattern = /\bvideo\(\s*"([^"]+)"/g;
    const used = new Set<string>();
    for (const file of sourceFiles) {
      if (file.endsWith(`${path.sep}content${path.sep}images.ts`)) continue;
      for (const match of fs.readFileSync(file, "utf8").matchAll(callPattern)) used.add(match[1]);
    }
    expect([...used].filter((key) => !(key in videoManifest))).toEqual([]);
    expect(Object.keys(videoManifest).filter((key) => !used.has(key))).toEqual([]);
  });

  it("every entry (photo or video) has a unique publicId", () => {
    const ids = [...Object.values(imageManifest), ...Object.values(videoManifest)].map((e) => e.publicId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("no leftover direct Unsplash/remote-image references", () => {
  it("only the manifest's sourceUrl field mentions images.unsplash.com", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles) {
      if (file.endsWith(`${path.sep}content${path.sep}images.ts`)) continue;
      const text = fs.readFileSync(file, "utf8");
      if (text.includes("images.unsplash.com")) offenders.push(path.relative(SRC_DIR, file));
    }
    expect(offenders).toEqual([]);
  });
});

describe("secrets hygiene", () => {
  it("never reads the Cloudinary API key/secret through a NEXT_PUBLIC_ (client-exposed) env var", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles) {
      const text = fs.readFileSync(file, "utf8");
      if (/NEXT_PUBLIC_[A-Z_]*CLOUDINARY[A-Z_]*(API_KEY|API_SECRET)/.test(text)) {
        offenders.push(path.relative(SRC_DIR, file));
      }
    }
    expect(offenders).toEqual([]);
  });
});
