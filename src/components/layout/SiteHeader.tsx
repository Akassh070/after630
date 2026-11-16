"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/nav";
import { siteConfig } from "@/lib/config";
import { getGreetingWaLink } from "@/lib/whatsapp";
import styles from "./SiteHeader.module.css";
import mobileStyles from "./MobileNav.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const waLink = getGreetingWaLink(siteConfig.whatsappNumber);

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
            src="/brand/after630-logo-ink.svg"
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
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
              aria-label="WhatsApp enquiry (opens in a new tab)"
            >
              WhatsApp Enquiry ↗
            </a>
          ) : (
            <Link href="/contact" className={styles.cta}>
              Enquire ↗
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
        {waLink && (
          <a href={waLink} target="_blank" rel="noopener noreferrer" className={mobileStyles.whatsapp}>
            Chat on WhatsApp ↗
          </a>
        )}
      </nav>
    </header>
  );
}
