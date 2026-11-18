import { test, expect } from "@playwright/test";

// The Playwright web server sets NEXT_PUBLIC_AFTER630_WHATSAPP_NUMBER to a
// test number (see playwright.config.ts), so links must use that, proving
// the env override works and no real customer chat is triggered by tests.
const WA = /^https:\/\/wa\.me\/919800000000\?text=/;

test.describe("WhatsApp support across the site", () => {
  for (const route of ["/", "/trips", "/about", "/faq", "/contact"]) {
    test(`floating WhatsApp button on ${route}`, async ({ page }) => {
      await page.goto(route);
      const float = page.getByRole("link", { name: /Chat with After630 on WhatsApp/ });
      await expect(float).toBeVisible();
      await expect(float).toHaveAttribute("href", WA);
      await expect(float).toHaveAttribute("target", "_blank");
      await expect(float).toHaveAttribute("rel", /noopener/);
    });
  }

  test("header CTA opens WhatsApp with an enquiry-not-booking greeting", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /WhatsApp enquiry/ });
    const href = await cta.getAttribute("href");
    expect(href).toMatch(WA);
    expect(decodeURIComponent(href!.split("text=")[1])).toMatch(/enquiry, not a confirmed booking/);
  });

  test("footer shows the number and Contact page links to WhatsApp", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("footer").getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", WA);
    await expect(page.getByRole("link", { name: /^WhatsApp ·/ })).toHaveAttribute("href", WA);
  });

  test("'Ask on WhatsApp' buttons go to WhatsApp, not /contact", async ({ page }) => {
    await page.goto("/");
    const links = page.getByRole("link", { name: "Ask on WhatsApp ↗" });
    expect(await links.count()).toBeGreaterThan(0);
    for (const href of await links.evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
      expect(href).toMatch(WA);
    }
  });

  test("floating button steps aside on phone trip pages (sticky enquiry bar is there)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/trips/15-strangers-and-stories");
    await expect(page.getByRole("link", { name: /Chat with After630 on WhatsApp/ })).toBeHidden();
  });

  test("trip enquiry preview offers 'Open in WhatsApp' with the trip message", async ({ page }) => {
    await page.goto("/trips/15-strangers-and-stories");
    await page.getByRole("button", { name: /Preview or copy message/ }).click();
    const open = page.getByRole("dialog").getByRole("link", { name: /Open in WhatsApp/ });
    const href = await open.getAttribute("href");
    expect(href).toMatch(WA);
    expect(new URL(href!).searchParams.get("text")).toContain("15 Strangers & Stories");
  });

  test("Instagram profile is linked from the footer and the Contact page", async ({ page }) => {
    await page.goto("/contact");
    const ig = "https://www.instagram.com/after630club";
    const footerLink = page.locator("footer").getByRole("link", { name: /@after630club/ });
    await expect(footerLink).toHaveAttribute("href", ig);
    await expect(footerLink).toHaveAttribute("target", "_blank");
    await expect(page.getByRole("link", { name: /^Instagram · @after630club/ })).toHaveAttribute("href", ig);
  });

  test("Contact offers WhatsApp enquiries without email options", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator('a[href^="mailto:" i]')).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText(/\bemail\b/i);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute("content", /\bemail\b/i);

    await page.getByLabel("Trip / destination").fill("Himachal");
    const send = page.getByRole("link", { name: "Send on WhatsApp ↗" });
    await expect(send).toHaveAttribute("href", /^https:\/\/wa\.me\/919800000000\?text=.*Himachal/);
    const href = await send.getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).toContain("Trip / destination: Himachal");
  });
});
