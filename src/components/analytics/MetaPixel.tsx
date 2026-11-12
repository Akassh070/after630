"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { contactMethodForHref, initMetaPixel, trackMetaEvent } from "@/lib/meta-pixel";

/**
 * Loads Meta Pixel only when an ID is configured (src/content/site.ts →
 * metaPixelId). Root-layout scripts run once per full page load, and this site
 * navigates client-side, so PageView is sent on every pathname change here
 * (query-string changes such as /trips filters don't count as a new page).
 * Also sends a standard `Contact` event when someone opens a WhatsApp or email
 * link — the site's real conversion, since enquiries happen off-site.
 */
export default function MetaPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Guard against React dev double-invoking effects for the same page.
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    initMetaPixel(pixelId);
    trackMetaEvent("PageView");
  }, [pathname, pixelId]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      const method = contactMethodForHref(link?.getAttribute("href"));
      if (method) trackMetaEvent("Contact", { method, page_path: window.location.pathname });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's no-JS tracking pixel, must be a plain 1×1 img */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
