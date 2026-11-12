import { test, expect } from "@playwright/test";

test.describe("Explore Trips — search, filter, sort", () => {
  test("search is reflected in the URL and filters results", async ({ page }) => {
    await page.goto("/trips");
    await page.getByLabel("Where would you like to go?").fill("Spiti");
    await expect(page).toHaveURL(/[?&]q=Spiti/, { timeout: 2000 });
    await expect(page.getByRole("heading", { name: /High Road to Spiti/ })).toBeVisible();
    await expect(page.getByText("Jibhi & the Slow Mountains")).toHaveCount(0);
  });

  test("duration filter + sort combine, and reload restores the same state", async ({ page }) => {
    await page.goto("/trips?duration=short&sort=alpha");
    await expect(page.getByRole("radio", { name: "2–3 days" }).first()).toBeChecked();

    await page.reload();
    await expect(page).toHaveURL(/duration=short/);
    await expect(page).toHaveURL(/sort=alpha/);
    await expect(page.getByRole("radio", { name: "2–3 days" }).first()).toBeChecked();
  });

  test("clearing all filters returns to the default, clean URL", async ({ page }) => {
    await page.goto("/trips?category=mountain&duration=short");
    await page.getByRole("button", { name: "Clear all" }).first().click();
    await expect(page).toHaveURL(/\/trips$/);
  });

  test("an unmatched search shows the empty state with a working reset", async ({ page }) => {
    await page.goto("/trips");
    await page.getByLabel("Where would you like to go?").fill("Antarctica expedition");
    await expect(page.getByRole("heading", { name: "No journeys found." })).toBeVisible();
    await page.getByRole("button", { name: "Reset filters ↗" }).click();
    await expect(page).toHaveURL(/\/trips$/);
    await expect(page.getByRole("heading", { name: "No journeys found." })).toHaveCount(0);
  });

  test("mobile filter sheet opens, traps focus, and Escape closes it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/trips");
    const trigger = page.getByRole("button", { name: "☷ Filters" });
    await trigger.click();
    const sheet = page.getByRole("dialog", { name: "Filter journeys" });
    await expect(sheet).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("mobile sheet locks body scroll while open", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/trips");
    await page.getByRole("button", { name: "☷ Filters" }).click();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");
  });
});
