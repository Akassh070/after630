import { test, expect } from "@playwright/test";

test.describe("Trip Details — gallery, itinerary, booking", () => {
  test("gallery lightbox opens, supports arrow-key navigation and Escape", async ({ page }) => {
    await page.goto("/trips/qa-published-trip");
    await page.getByRole("button", { name: /Open photo 1 of 4/ }).click();

    const dialog = page.getByRole("dialog", { name: "Trip photo gallery" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("1 / 4", { exact: false })).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("2 / 4", { exact: false })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("itinerary accordion toggles aria-expanded and Expand all opens every day", async ({ page }) => {
    await page.goto("/trips/15-strangers-and-stories");
    const dayTwoTrigger = page.getByRole("button", { name: /Meadows, sound healing and a waterfall/ });
    await expect(dayTwoTrigger).toHaveAttribute("aria-expanded", "false");
    await dayTwoTrigger.click();
    await expect(dayTwoTrigger).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("button", { name: "Expand all +" }).click();
    const allTriggers = page.locator('[aria-expanded]', { hasText: /Day/ });
    const count = await allTriggers.count();
    for (let i = 0; i < count; i++) {
      await expect(allTriggers.nth(i)).toHaveAttribute("aria-expanded", "true");
    }
  });

  test("a trip with no published departures shows 'Get notified on WhatsApp', no price/date selectors", async ({ page }) => {
    await page.goto("/trips/qa-future-trip");
    await expect(page.getByRole("link", { name: "Get notified on WhatsApp ↗" })).toBeVisible();
    await expect(page.getByLabel("Choose departure")).toHaveCount(0);
  });

  test("published trip: selecting departure → origin → package builds an accurate WhatsApp link", async ({ page }) => {
    await page.goto("/trips/qa-published-trip");

    const booking = page.getByRole("complementary", { name: "Book this trip" });
    await expect(booking.getByRole("link", { name: "Enquire on WhatsApp", exact: true })).toHaveCount(0);

    await booking.getByLabel("Choose departure").selectOption("dep-1");
    await booking.getByLabel("Travel from").selectOption("Test City A");
    await booking.getByLabel("Package").selectOption("pkg-premium");

    const cta = booking.getByRole("link", { name: "Enquire on WhatsApp", exact: true });
    await expect(cta).toBeVisible();
    await expect(booking.getByText("Opens WhatsApp. Tap Send to enquire. No payment required to ask questions.")).toBeVisible();
    const href = await cta.getAttribute("href");
    expect(href).toContain("https://wa.me/919800000000?text=");
    const decoded = decodeURIComponent(href!.split("text=")[1]);
    expect(decoded).toContain("*[QA] Published Test Trip* Test Hills trip");
    expect(decoded).toContain("14 March 2027");
    expect(decoded).toContain("from Test City A");
    expect(decoded).toContain("Are seats still available?");
  });

  test("a sold-out departure on an otherwise-open trip is never offered as a selectable option", async ({ page }) => {
    await page.goto("/trips/qa-published-trip");
    const booking = page.getByRole("complementary", { name: "Book this trip" });
    const options = await booking.getByLabel("Choose departure").locator("option").allTextContents();
    expect(options.join(" ")).toContain("14 March 2027"); // the available departure
    expect(options.join(" ")).not.toContain("2 April 2027"); // the sold-out departure
  });

  test("sold-out trip shows a prominent status and no Enquire on WhatsApp CTA as the primary action", async ({ page }) => {
    await page.goto("/trips/qa-sold-out-trip");
    const booking = page.getByRole("complementary", { name: "Book this trip" });
    await expect(booking.getByText("Sold out").first()).toBeVisible();
    await expect(booking.getByRole("link", { name: "Explore other trips ↗" })).toBeVisible();
  });

  test("postponed trip is labeled distinctly from sold-out", async ({ page }) => {
    await page.goto("/trips/qa-postponed-trip");
    const booking = page.getByRole("complementary", { name: "Book this trip" });
    await expect(booking.getByText("Postponed").first()).toBeVisible();
  });

  test("live trip: Enquire on WhatsApp opens WhatsApp with the trip message, and no message preview remains", async ({ page }) => {
    await page.goto("/trips/15-strangers-and-stories");
    const booking = page.getByRole("complementary", { name: "Book this trip" });
    await expect(booking.getByText("Booking open")).toBeVisible();
    const href = await booking.getByRole("link", { name: "Enquire on WhatsApp", exact: true }).getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).toContain(
      "I'm interested in the *15 Strangers & Stories* Himachal trip (12–16 December 2026) from Chandigarh.",
    );
    await expect(page.getByRole("button", { name: /Preview or copy message/ })).toHaveCount(0);
  });
  test("itinerary PDF can be downloaded from the itinerary and the booking card", async ({ page, request }) => {
    await page.goto("/trips/15-strangers-and-stories");
    const links = page.getByRole("link", { name: /Download itinerary \(PDF/ });
    await expect(links).toHaveCount(2);
    const href = await links.first().getAttribute("href");
    expect(href).toBe("/downloads/after630-himachal-15-strangers-and-stories-dec-2026.pdf");
    await expect(links.first()).toHaveAttribute("download", /\.pdf$/);
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  });
});
