"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { getGreetingWaLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import styles from "./WhatsAppFloat.module.css";

/**
 * Site-wide "chat on WhatsApp" button. On trip detail pages the mobile
 * sticky enquiry bar already offers a trip-specific WhatsApp action, so the
 * floating button steps aside there on small screens instead of overlapping it.
 */
export default function WhatsAppFloat() {
  const pathname = usePathname();
  const href = getGreetingWaLink(siteConfig.whatsappNumber);
  if (!href) return null;

  const onTripDetail = /^\/trips\/[^/]+/.test(pathname);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.float} ${onTripDetail ? styles.hideOnSmall : ""}`}
      aria-label="Chat with After630 on WhatsApp (opens in a new tab)"
    >
      <WhatsAppIcon className={styles.icon} />
      <span className={styles.label}>Chat with us</span>
    </a>
  );
}
