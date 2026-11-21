"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/nav";
import { siteConfig } from "@/lib/config";
import { getBookingWaLink, getGreetingWaLink } from "@/lib/whatsapp";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import styles from "./SiteHeader.module.css";
import mobileStyles from "./MobileNav.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const waLink = getGreetingWaLink(siteConfig.whatsappNumber);
  const bookLink = getBookingWaLink(siteConfig.whatsappNumber);
  const logoSrc =
    theme === "dark" ? "/brand/after630-logo-white.svg" : "/brand/after630-logo-ink.svg";

  // Close the mobile panel whenever the route actually changes. Adjusting
  // state during render (React's documented pattern for this) instead of in
  // an effect avoids an extra render pass.
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="After630 home">
          <Image
            src={logoSrc}
            alt=""
            width={999}
            height={313}
            priority
            sizes="160px"
            className={styles.logoImg}
          />
        </Link>
        <nav className={styles.links} aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          {bookLink ? (
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
              aria-label="Enquire on WhatsApp (opens in a new tab)"
            >
              Enquire on WhatsApp ↗
            </a>
          ) : (
            <Link href="/contact" className={styles.cta}>
              Enquire on WhatsApp ↗
            </Link>
          )}
          <button
            type="button"
            className={mobileStyles.hamb}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav-panel"
        aria-label="Mobile navigation"
        className={`${mobileStyles.panel} ${open ? mobileStyles.open : ""}`}
      >
        {primaryNav.map((item) => (
          <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
        <Link href="/contact">Contact</Link>
        <ThemeToggle variant="mobile" />
        {waLink && (
          <a href={waLink} target="_blank" rel="noopener noreferrer" className={mobileStyles.whatsapp}>
            Chat on WhatsApp ↗
          </a>
        )}
      </nav>
    </header>
  );
}
