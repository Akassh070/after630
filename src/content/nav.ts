/**
 * Unified primary navigation. The prototypes used a different link set on
 * almost every page (see handoff/ui/docs) — this is the single coherent set
 * used everywhere per the UX audit checklist ("Header/footer navigation
 * coherent across all pages").
 */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Explore Trips", href: "/trips" },
  { label: "Past Experiences", href: "/experiences" },
  { label: "Our Story", href: "/about" },
  { label: "FAQs", href: "/faq" },
] as const;
