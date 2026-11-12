import { test, expect } from "@playwright/test";

test.describe("core navigation", () => {
  test("homepage primary CTA goes to a real /trips route", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore Experiences ↗" }).click();
    await expect(page).toHaveURL(/\/trips$/);
  });

  test("homepage category tile pre-filters /trips by category", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Mountain Escapes/ }).click();
    await expect(page).toHaveURL(/\/trips\?category=mountain/);
    await expect(page.getByRole("button", { name: "Mountains", exact: true })).toHaveAttribute("aria-pressed", "true");
  });

  test("trip card navigates to a real detail route, not a modal", async ({ page }) => {
    await page.goto("/trips");
    await page.getByRole("link", { name: "Jibhi & the Slow Mountains" }).first().click();
    await expect(page).toHaveURL(/\/trips\/jibhi-slow-mountains$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jibhi");
  });

  test("back navigation from a trip detail restores the listing", async ({ page }) => {
    await page.goto("/trips?category=mountain");
    await page.getByRole("link", { name: "Jibhi & the Slow Mountains" }).first().click();
    await expect(page).toHaveURL(/\/trips\/jibhi-slow-mountains$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/trips\?category=mountain/);
    await expect(page.getByRole("button", { name: "Mountains", exact: true })).toHaveAttribute("aria-pressed", "true");
  });

  test("unified header appears with the same links across pages", async ({ page }) => {
    for (const path of ["/", "/trips", "/about", "/experiences", "/contact", "/faq"]) {
      await page.goto(path);
      const nav = page.getByRole("navigation", { name: "Primary" });
      await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Explore Trips" })).toBeVisible();
    }
  });

  test("404 page offers a real way back", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await page.getByRole("link", { name: "Back to home ↗" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("unknown trip slug 404s instead of crashing", async ({ page }) => {
    const response = await page.goto("/trips/not-a-real-trip");
    expect(response?.status()).toBe(404);
  });
});
