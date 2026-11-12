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

import { createHash } from "node:crypto";

const { siteCopy } = await import("../src/content/site.ts");
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || siteCopy.cloudinaryCloudName;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

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
  body.set("file", entry.sourceUrl); // Cloudinary fetches it server-side — nothing downloads locally.
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
