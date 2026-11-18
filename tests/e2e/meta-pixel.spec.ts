import { test, expect } from "@playwright/test";

// No pixel ID is configured yet, so the site must not load Meta's script or
// contact facebook.com at all — on any page, including after a WhatsApp click.
test("Meta Pixel is fully off while no ID is configured", async ({ page }) => {
  const facebookRequests: string[] = [];
  page.on("request", (req) => {
    if (/facebook\.(com|net)/.test(req.url())) facebookRequests.push(req.url());
  });
  for (const route of ["/", "/trips", "/trips/15-strangers-and-stories", "/contact"]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
  }
  expect(await page.evaluate(() => typeof (window as unknown as { fbq?: unknown }).fbq)).toBe("undefined");
  expect(await page.locator("script#meta-pixel").count()).toBe(0);
  expect(facebookRequests).toEqual([]);
});
