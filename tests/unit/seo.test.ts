import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/lib/config";

describe("launch SEO defaults (no env vars set)", () => {
  it("uses the real domain, never localhost", () => {
    expect(siteConfig.siteUrl).toBe("https://after630.club");
    expect(robots().sitemap).toBe("https://after630.club/sitemap.xml");
    for (const entry of sitemap()) expect(entry.url.startsWith("https://after630.club/")).toBe(true);
  });

  it("allows crawling", () => {
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("lists the approved legal pages in the sitemap", () => {
    expect(siteConfig.legalApproved).toBe(true);
    const urls = sitemap().map((e) => e.url);
    for (const legal of ["/privacy", "/terms", "/cancellation-refunds"]) {
      expect(urls).toContain(`https://after630.club${legal}`);
    }
    expect(urls).toContain("https://after630.club/trips");
  });

  it("lists only the live Himachal trip in the public sitemap", () => {
    const tripUrls = sitemap().map(({ url }) => url).filter((url) => url.startsWith("https://after630.club/trips/"));
    expect(tripUrls).toEqual(["https://after630.club/trips/15-strangers-and-stories"]);
  });
});
