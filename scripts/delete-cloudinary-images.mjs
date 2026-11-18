#!/usr/bin/env node
// Deletes Cloudinary image resources by public_id.
// Usage:
//   node --env-file-if-exists=.env.local scripts/delete-cloudinary-images.mjs id1 id2 ...
// Or pipe newline-separated public IDs on stdin.

import { createHash } from "node:crypto";
import { siteCopy } from "../src/content/site.ts";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || siteCopy.cloudinaryCloudName;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error("Missing Cloudinary credentials in .env.local");
  process.exit(1);
}

function sign(params) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + API_SECRET).digest("hex");
}

async function destroy(publicId) {
  const timestamp = Math.round(Date.now() / 1000);
  const params = { invalidate: "true", public_id: publicId, timestamp };
  const signature = sign(params);
  const body = new URLSearchParams({
    ...params,
    api_key: API_KEY,
    signature,
  });
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? `HTTP ${res.status}`);
  return json;
}

const fromArgs = process.argv.slice(2);
let ids = fromArgs;
if (ids.length === 0 && !process.stdin.isTTY) {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  ids = Buffer.concat(chunks)
    .toString("utf8")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

if (ids.length === 0) {
  console.error("Pass public_id values as args or via stdin.");
  process.exit(1);
}

console.log(`Deleting ${ids.length} Cloudinary images from ${CLOUD_NAME}...\n`);
let ok = 0;
let failed = 0;
for (const id of ids) {
  try {
    const result = await destroy(id);
    console.log(`  ${result.result === "not found" ? "missing " : "deleted "} ${id}`);
    ok += 1;
  } catch (err) {
    failed += 1;
    console.error(`  FAILED   ${id} — ${err.message}`);
  }
}
console.log(`\nDone. ok=${ok} failed=${failed}`);
if (failed) process.exit(1);
