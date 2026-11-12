import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/",
  "/trips",
  "/trips/jibhi-slow-mountains",
  "/trips/qa-published-trip",
  "/about",
  "/experiences",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/cancellation-refunds",
];

test.describe("accessibility — no serious/critical axe violations", () => {
  for (const route of ROUTES) {
    test(`axe scan: ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      if (serious.length) {
        console.log(JSON.stringify(serious, null, 2));
      }
      expect(serious).toEqual([]);
    });
  }
});
