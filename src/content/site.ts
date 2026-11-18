export const siteCopy = {
  brand: "after630",
  /**
   * Official After630 WhatsApp Business number (supplied by the owner), digits
   * only: country code + number. NEXT_PUBLIC_AFTER630_WHATSAPP_NUMBER can
   * override it (e.g. a test number), but the site never depends on that env
   * var being set on the host to have working WhatsApp links.
   */
  whatsappNumber: "917016617715",
  /** Official After630 Instagram profile (supplied by the owner). NEXT_PUBLIC_INSTAGRAM_URL can override it. */
  instagramUrl: "https://www.instagram.com/after630club",
  /**
   * Cloudinary cloud name that hosts every site photo. Public by design (it's
   * in every image URL), so it lives here and the site builds without any env
   * file. NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME can override it. The API key and
   * secret are NOT here — they're only needed by `npm run images:upload`.
   */
  cloudinaryCloudName: "idavlcrv",
  /** Public domain — used for canonical links, sitemap.xml and link-share previews. NEXT_PUBLIC_SITE_URL overrides it. */
  siteUrl: "https://after630.club",
  /**
   * Whether search engines may index the site (owner-approved, 12 Nov 2026).
   * NEXT_PUBLIC_ALLOW_INDEXING=true/false overrides it. The draft legal pages
   * stay noindex separately until legal approval (see legalApproved).
   */
  allowIndexing: true,
  /**
   * Whether the Privacy, Terms and Cancellation pages are final: removes the
   * "Draft" tag, lets them be indexed and adds them to sitemap.xml. Owner
   * supplied the final policies on 18 Nov 2026.
   * NEXT_PUBLIC_LEGAL_APPROVED=true/false overrides it.
   */
  legalApproved: true,
  /**
   * Meta (Facebook) Pixel ID — digits only, from Meta Events Manager. Empty =
   * pixel completely off (no script, no requests). Paste the ID here when you
   * have it; NEXT_PUBLIC_META_PIXEL_ID can override it.
   */
  metaPixelId: "",
  /**
   * Google Search Console verification token: only the content="…" value of
   * the HTML tag Search Console gives you. Empty = no tag.
   * NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION can override it.
   */
  googleSiteVerification: "",
  tagline: "Curated group journeys, incredible places, and experiences worth remembering.",
  footerColumns: [
    {
      heading: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "Explore Trips", href: "/trips" },
        { label: "Past Experiences", href: "/experiences" },
        { label: "Our Story", href: "/about" },
      ],
    },
    {
      heading: "Information",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "FAQs", href: "/faq" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Cancellation & Refunds", href: "/cancellation-refunds" },
      ],
    },
  ],
} as const;
