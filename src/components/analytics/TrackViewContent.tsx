"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

/** Sends Meta's standard ViewContent event for a trip detail page (no-op if the pixel is off). */
export default function TrackViewContent({ id, name, category }: { id: string; name: string; category: string }) {
  useEffect(() => {
    // Deferred one tick so the root layout's pixel init (a parent effect that
    // runs after this child effect) has happened first.
    const t = window.setTimeout(() => {
      trackMetaEvent("ViewContent", {
        content_ids: [id],
        content_name: name,
        content_category: category,
        content_type: "product",
      });
    }, 0);
    return () => window.clearTimeout(t);
  }, [id, name, category]);
  return null;
}
