#!/usr/bin/env node
// Uploads every photo in src/content/images.ts to Cloudinary, under its
// manifest publicId. Idempotent: an entry already present on Cloudinary is
// left untouched, so this is safe to re-run after adding new entries.
//
// Usage: npm run images:upload
// Needs CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET and
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME — the npm script loads them from
// .env.local via Node's --env-file flag; nothing here ever reads
// .env.example (which intentionally holds no real secrets).
//
// Each new upload needs either `sourceUrl` (Cloudinary fetches remotely) or
// `localPath` (local file uploaded as multipart binary — not base64). Local
// files are upload sources only; the live site always loads from Cloudinary
// via publicId. Resolve localPath against AFTER630_LOCAL_IMAGES_DIR (or
// AFTER630_HOMEPAGE_IMAGES_DIR) when set, otherwise the repo root.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

const { siteCopy } = await import("../src/content/site.ts");
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || siteCopy.cloudinaryCloudName;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const ROOT = path.resolve(import.meta.dirname, "..");
const LOCAL_ROOT = process.env.AFTER630_LOCAL_IMAGES_DIR
  ? path.resolve(process.env.AFTER630_LOCAL_IMAGES_DIR)
  : process.env.AFTER630_HOMEPAGE_IMAGES_DIR
    ? path.resolve(process.env.AFTER630_HOMEPAGE_IMAGES_DIR)
    : ROOT;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error(
    "Missing Cloudinary credentials. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local " +
      "(see .env.example), then re-run `npm run images:upload`.",
  );
  process.exit(1);
}

const { imageManifest } = await import("../src/content/images.ts");
const entries = Object.entries(imageManifest);

function sign(params) {
  // Cloudinary's signing rule: every param except file/cloud_name/resource_type/api_key/signature,
  // sorted by key, joined as "a=1&b=2", with the API secret appended, then SHA-1 hex.
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + API_SECRET).digest("hex");
}

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".webp") return "image/webp";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

function resolveLocalPath(localPath) {
  return path.isAbsolute(localPath) ? localPath : path.resolve(LOCAL_ROOT, localPath);
}

function filePayload(entry) {
  if (entry.localPath) {
    const absolute = resolveLocalPath(entry.localPath);
    const bytes = readFileSync(absolute);
    const mime = mimeFor(absolute);
    // Multipart File is much faster than a base64 data URI for large WebPs.
    return new File([bytes], path.basename(absolute), { type: mime });
  }
  if (entry.sourceUrl) return entry.sourceUrl;
  throw new Error("Manifest entry needs sourceUrl or localPath to upload");
}

async function alreadyUploaded(publicId) {
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload/${encodeURIComponent(publicId)}`,
    { headers: { Authorization: `Basic ${auth}` } },
  );
  return res.ok;
}

async function upload(entry) {
  const timestamp = Math.round(Date.now() / 1000);
  const params = { overwrite: "false", public_id: entry.publicId, timestamp, unique_filename: "false" };
  const signature = sign(params);

  const body = new FormData();
  body.set("file", filePayload(entry));
  for (const [k, v] of Object.entries(params)) body.set(k, String(v));
  body.set("api_key", API_KEY);
  body.set("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? `HTTP ${res.status}`);
  return json;
}

async function verify(publicId) {
  const res = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`, { method: "HEAD" });
  return res.ok;
}

console.log(`Checking ${entries.length} images against Cloudinary (${CLOUD_NAME})...\n`);

const results = { uploaded: [], skipped: [], failed: [] };

for (const [key, entry] of entries) {
  try {
    if (await alreadyUploaded(entry.publicId)) {
      results.skipped.push(key);
      console.log(`  skip     ${key}  (already on Cloudinary)`);
      continue;
    }
    if (!entry.sourceUrl && !entry.localPath) {
      throw new Error("Not on Cloudinary yet, and no sourceUrl/localPath to upload from");
    }
    await upload(entry);
    results.uploaded.push(key);
    console.log(`  uploaded ${key}  →  ${entry.publicId}`);
  } catch (err) {
    results.failed.push({ key, error: err.message });
    console.error(`  FAILED   ${key}  —  ${err.message}`);
  }
}

console.log("\nVerifying delivery URLs...");
const verifyFailed = [];
for (const [key, entry] of entries) {
  if (results.failed.some((f) => f.key === key)) continue;
  if (!(await verify(entry.publicId))) verifyFailed.push(key);
}

console.log(
  `\nDone. uploaded=${results.uploaded.length} skipped=${results.skipped.length} failed=${results.failed.length} unverified=${verifyFailed.length}`,
);
if (results.failed.length || verifyFailed.length) {
  if (verifyFailed.length) console.error("Could not verify delivery URL for:", verifyFailed.join(", "));
  process.exit(1);
}
