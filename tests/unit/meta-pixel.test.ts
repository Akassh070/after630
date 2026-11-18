import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type FbqLike = { queue: unknown[][] };

describe("meta pixel helper", () => {
  beforeEach(() => {
    vi.resetModules();
    (globalThis as unknown as { window: Record<string, unknown> }).window = {};
  });
  afterEach(() => {
    delete (globalThis as unknown as { window?: unknown }).window;
  });

  it("sends nothing until the pixel is initialised (i.e. no ID configured)", async () => {
    const { trackMetaEvent } = await import("@/lib/meta-pixel");
    trackMetaEvent("PageView");
    expect((globalThis as unknown as { window: { fbq?: unknown } }).window.fbq).toBeUndefined();
  });

  it("queues init then events, in order, before fbevents.js has loaded", async () => {
    const { initMetaPixel, trackMetaEvent } = await import("@/lib/meta-pixel");
    initMetaPixel("1234567890123456");
    initMetaPixel("1234567890123456"); // second init for the same ID is ignored
    trackMetaEvent("PageView");
    trackMetaEvent("Contact", { method: "whatsapp" });
    const fbq = (globalThis as unknown as { window: { fbq: FbqLike } }).window.fbq;
    expect(fbq.queue).toEqual([
      ["init", "1234567890123456"],
      ["track", "PageView"],
      ["track", "Contact", { method: "whatsapp" }],
    ]);
  });

  it("classifies contact links", async () => {
    const { contactMethodForHref } = await import("@/lib/meta-pixel");
    expect(contactMethodForHref("https://wa.me/917016617715?text=hi")).toBe("whatsapp");
    expect(contactMethodForHref("mailto:hello@example.com")).toBeNull();
    expect(contactMethodForHref("https://www.instagram.com/after630club")).toBeNull();
    expect(contactMethodForHref("/contact")).toBeNull();
    expect(contactMethodForHref(null)).toBeNull();
  });
});

describe("meta pixel config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses the official pixel ID from site.ts by default", async () => {
    const { siteConfig } = await import("@/lib/config");
    expect(siteConfig.metaPixelId).toBe("991343213555216");
  });

  it("accepts a numeric ID from the env override and rejects junk", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1234567890123456");
    expect((await import("@/lib/config")).siteConfig.metaPixelId).toBe("1234567890123456");
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "<script>");
    expect((await import("@/lib/config")).siteConfig.metaPixelId).toBeNull();
  });
});
