import { siteCopy } from "@/content/site";

/**
 * Centralised, validated access to public configuration.
 *
 * Nothing in this file may fabricate a real-looking value when the owner
 * hasn't supplied one yet (see handoff/ux/After630_Phase1_UX_Implementation_Spec.md
 * §9 — "Items the owner must supply for production launch"). A missing value
 * must resolve to `null`/`false`, never a placeholder that could be mistaken
 * for a verified business detail.
 */

type TripSource = "live" | "qa";

function readTripSource(): TripSource {
  const raw = process.env.AFTER630_TRIP_SOURCE?.trim().toLowerCase();
  return raw === "qa" ? "qa" : "live";
}

/**
 * The WhatsApp Business number, digits only (country code + number). Defaults
 * to the official number in src/content/site.ts; the env var only overrides it.
 * Returns null if the value is invalid — the UI then treats WhatsApp as "not
 * connected" and falls back to a copyable message, never a dead/fake link.
 */
function readWhatsappNumber(): string | null {
  const raw = process.env.NEXT_PUBLIC_AFTER630_WHATSAPP_NUMBER?.trim() || siteCopy.whatsappNumber;
  if (!raw) return null;
  const digitsOnly = raw.replace(/[^0-9]/g, "");
  if (digitsOnly.length < 10 || digitsOnly.length > 15) return null;
  return digitsOnly;
}

/**
 * Instagram profile URL. Defaults to the official profile in src/content/site.ts;
 * the env var only overrides it. Anything that isn't an https instagram.com URL
 * is rejected (null) so a typo can't turn into a broken or off-site link.
 */
function readInstagramUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || siteCopy.instagramUrl;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || !/(^|\.)instagram\.com$/.test(url.hostname)) return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

/** "@handle" from an Instagram profile URL, for display. */
export function instagramHandle(url: string): string {
  const handle = new URL(url).pathname.split("/").filter(Boolean)[0];
  return handle ? `@${handle}` : "Instagram";
}

/** Meta Pixel IDs are all digits (15–16 today); anything else is treated as "not set". */
function readMetaPixelId(): string | null {
  const raw = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || siteCopy.metaPixelId;
  return raw && /^\d{8,20}$/.test(raw) ? raw : null;
}

function readSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || siteCopy.siteUrl;
  return raw.replace(/\/$/, "");
}

/** "true"/"false" in the env var wins; anything else (incl. unset) falls back to the built-in default. */
function readBooleanWithDefault(name: string, fallback: boolean): boolean {
  const raw = process.env[name]?.trim().toLowerCase();
  if (raw === "true") return true;
  if (raw === "false") return false;
  return fallback;
}

function readBoolean(name: string): boolean {
  return process.env[name]?.trim().toLowerCase() === "true";
}

export const siteConfig = {
  siteName: "After630",
  siteUrl: readSiteUrl(),
  whatsappNumber: readWhatsappNumber(),
  instagramUrl: readInstagramUrl(),
  tripSource: readTripSource(),
  allowIndexing: readBooleanWithDefault("NEXT_PUBLIC_ALLOW_INDEXING", siteCopy.allowIndexing),
  legalApproved: readBoolean("NEXT_PUBLIC_LEGAL_APPROVED"),
  metaPixelId: readMetaPixelId(),
} as const;
