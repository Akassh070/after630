import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "820", width: 820, height: 1180 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
];

const ROUTES = [
  "/",
  "/trips",
  "/trips/15-strangers-and-stories",
  "/trips/qa-published-trip",
  "/about",
  "/experiences",
  "/contact",
  "/faq",
  "/privacy",
]

const OUT_DIR = path.join(process.cwd(), "screenshots");

test.describe("responsive — no horizontal overflow, full-page screenshots", () => {
  test.beforeAll(() => {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  });

  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      test(`${route || "home"} @ ${viewport.name}px`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        expect(hasOverflow, `horizontal overflow at ${route} / ${viewport.name}px`).toBe(false);

        // The page shell uses overflow: clip, so content wider than the
        // viewport doesn't scroll — it silently gets cut off. Catch that too,
        // ignoring elements inside an intentional horizontal scroller.
        const clipped = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const found: string[] = [];
          for (const el of document.querySelectorAll<HTMLElement>("main *")) {
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height || getComputedStyle(el).position === "fixed") continue;
            if (r.right <= vw + 1 && r.left >= -1) continue;
            let inScroller = false;
            for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
              const ox = getComputedStyle(a).overflowX;
              if (ox === "auto" || ox === "scroll") { inScroller = true; break; }
              if (ox === "hidden" && a.getBoundingClientRect().right <= vw + 1 && a.getBoundingClientRect().left >= -1) { inScroller = true; break; }
            }
            if (!inScroller) found.push(`${el.tagName.toLowerCase()} [${Math.round(r.left)}..${Math.round(r.right)}]`);
          }
          return found.slice(0, 5);
        });
        expect(clipped, `content cut off at ${route} / ${viewport.name}px`).toEqual([]);

        const fileName = `${route === "/" ? "home" : route.replace(/\//g, "_")}__${viewport.name}.png`;
        await page.screenshot({ path: path.join(OUT_DIR, fileName), fullPage: true });
      });
    }
  }
});
