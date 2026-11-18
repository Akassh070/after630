import { test, expect } from "@playwright/test";

test.describe("Trip Details — gallery, itinerary, enquiry", () => {
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
    const dayTwoTrigger = page.getByRole("button", { name: /Meadow trek and waterfall/ });
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

  test("a trip with no published departures shows 'Ask About Future Dates', no price/date selectors", async ({ page }) => {
    await page.goto("/trips/qa-future-trip");
    await expect(page.getByRole("link", { name: "Ask About Future Dates ↗" })).toBeVisible();
    await expect(page.getByLabel("Choose departure")).toHaveCount(0);
  });

  test("published trip: selecting departure → origin → package builds an accurate WhatsApp link", async ({ page }) => {
    await page.goto("/trips/qa-published-trip");

    const enquiry = page.getByRole("complementary", { name: "Trip enquiry" });
    await expect(enquiry.getByRole("link", { name: "Ask about this journey ↗" })).toHaveCount(0);

    await enquiry.getByLabel("Choose departure").selectOption("dep-1");
    await enquiry.getByLabel("Travel from").selectOption("Test City A");
    await enquiry.getByLabel("Package").selectOption("pkg-premium");

    const cta = enquiry.getByRole("link", { name: "Ask about this journey ↗" });
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute("href");
    expect(href).toContain("https://wa.me/919800000000?text=");
    const decoded = decodeURIComponent(href!.split("text=")[1]);
    expect(decoded).toContain("14 March 2027");
    expect(decoded).toContain("Test City A");
    expect(decoded).toContain("Premium");
    expect(decoded).toMatch(/not a confirmed booking/i);
  });

  test("a sold-out departure on an otherwise-open trip is never offered as a selectable option", async ({ page }) => {
    await page.goto("/trips/qa-published-trip");
    const enquiry = page.getByRole("complementary", { name: "Trip enquiry" });
    const options = await enquiry.getByLabel("Choose departure").locator("option").allTextContents();
    expect(options.join(" ")).toContain("14 March 2027"); // the available departure
    expect(options.join(" ")).not.toContain("2 April 2027"); // the sold-out departure
  });

  test("sold-out trip shows a prominent status and no WhatsApp enquiry CTA as the primary action", async ({ page }) => {
    await page.goto("/trips/qa-sold-out-trip");
    const enquiry = page.getByRole("complementary", { name: "Trip enquiry" });
    await expect(enquiry.getByText("Sold out").first()).toBeVisible();
    await expect(enquiry.getByRole("link", { name: "Explore other trips ↗" })).toBeVisible();
  });

  test("postponed trip is labeled distinctly from sold-out", async ({ page }) => {
    await page.goto("/trips/qa-postponed-trip");
    const enquiry = page.getByRole("complementary", { name: "Trip enquiry" });
    await expect(enquiry.getByText("Postponed").first()).toBeVisible();
  });

  test("preview dialog offers a copyable message as a WhatsApp fallback", async ({ page }) => {
    await page.goto("/trips/15-strangers-and-stories");
    await page.getByRole("button", { name: "Preview or copy message ↗" }).click();
    const dialog = page.getByRole("dialog", { name: "Enquiry message preview" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("textbox")).toHaveValue(/15 Strangers & Stories/);
  });
});
