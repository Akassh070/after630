import { test, expect } from "@playwright/test";

test.describe("Hover feedback — desktop mouse", () => {
  // Trip cards are whole-card links (aria-label "View trip: …"): index 0 is
  // the featured card, index 1 the first regular grid card.
  for (const [label, nth] of [["featured", 0], ["grid", 1]] as const) {
    test(`${label} trip card lifts and its photo zooms on hover`, async ({ page }) => {
      await page.goto("/trips");
      const card = page.locator('a[aria-label^="View trip:"]').nth(nth);
      const img = card.locator("img").first();

      const cardBefore = await card.evaluate((el) => getComputedStyle(el).transform);
      const imgBefore = await img.evaluate((el) => getComputedStyle(el).transform);
      await card.hover();
      await expect.poll(() => card.evaluate((el) => getComputedStyle(el).transform)).not.toBe(cardBefore);
      await expect.poll(() => img.evaluate((el) => getComputedStyle(el).transform)).not.toBe(imgBefore);
    });
  }

  test("gallery photo zooms on hover", async ({ page }) => {
    await page.goto("/trips/qa-published-trip");
    const item = page.getByRole("button", { name: /Open photo 1 of/ });
    const img = item.locator("img").first();

    const before = await img.evaluate((el) => getComputedStyle(el).transform);
    await item.hover();
    await expect.poll(() => img.evaluate((el) => getComputedStyle(el).transform)).not.toBe(before);
  });

  test("accordion trigger background changes on hover", async ({ page }) => {
    await page.goto("/trips/15-strangers-and-stories");
    const trigger = page.getByRole("button", { name: /Meadows, sound healing and a waterfall/ });

    const before = await trigger.evaluate((el) => getComputedStyle(el).backgroundColor);
    await trigger.hover();
    await expect.poll(() => trigger.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe(before);
  });

  test("explore-trips category chip color changes on hover", async ({ page }) => {
    await page.goto("/trips");
    const chip = page.getByRole("button", { name: "Mountains", exact: true });

    const before = await chip.evaluate((el) => getComputedStyle(el).color);
    await chip.hover();
    await expect.poll(() => chip.evaluate((el) => getComputedStyle(el).color)).not.toBe(before);
  });

  test("related trip card lifts and its photo zooms on hover", async ({ page }) => {
    await page.goto("/trips/qa-published-trip");
    const card = page.locator('a[aria-label^="View trip:"]').first();
    const img = card.locator("img").first();
    await card.scrollIntoViewIfNeeded();

    const imgBefore = await img.evaluate((el) => getComputedStyle(el).transform);
    await card.hover();
    await expect.poll(() => img.evaluate((el) => getComputedStyle(el).transform)).not.toBe(imgBefore);
  });
});

test.describe("Hover feedback — touch devices are excluded", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("(hover: hover) and (pointer: fine) does not match on a touch device, so hover rules never apply", async ({
    page,
  }) => {
    // Every hover rule added for this feature is gated by this media query,
    // so proving it doesn't match on a touch viewport proves none of those
    // rules can fire there — the usual cause of "sticky" hover after a tap.
    await page.goto("/trips");
    const matches = await page.evaluate(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    expect(matches).toBe(false);
  });
});

test.describe("Hover feedback — reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("trip card hover does not transform when reduced motion is requested", async ({ page }) => {
    await page.goto("/trips");
    const card = page.locator('a[aria-label^="View trip:"]').nth(1);

    await card.hover();
    const transform = await card.evaluate((el) => getComputedStyle(el).transform);

    expect(transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)").toBeTruthy();
  });
});
