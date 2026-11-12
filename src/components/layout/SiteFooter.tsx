import Image from "next/image";
import Link from "next/link";
import { siteCopy } from "@/content/site";
import { instagramHandle, siteConfig } from "@/lib/config";
import { buildMailtoLink, formatWhatsappDisplay, getGreetingWaLink } from "@/lib/whatsapp";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const waLink = getGreetingWaLink(siteConfig.whatsappNumber);
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <Image
              src="/brand/after630-logo-light.png"
              alt="After630"
              width={1612}
              height={491}
              sizes="160px"
              className={styles.brand}
            />
            <p className={styles.tagline}>{siteCopy.tagline}</p>
            <div className={styles.social}>
              {waLink && siteConfig.whatsappNumber && (
                <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <span className={styles.contactLabel}>WhatsApp</span>
                  {formatWhatsappDisplay(siteConfig.whatsappNumber)}
                </a>
              )}
              {siteConfig.instagramUrl && (
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <span className={styles.contactLabel}>Instagram</span>
                  {instagramHandle(siteConfig.instagramUrl)}
                </a>
              )}
              {siteConfig.contactEmail && (
                <a href={buildMailtoLink(siteConfig.contactEmail, "Hello After630")} className={styles.contactLink}>
                  <span className={styles.contactLabel}>Email</span>
                  {siteConfig.contactEmail}
                </a>
              )}
            </div>
          </div>
          {siteCopy.footerColumns.map((column) => (
            <div key={column.heading} className={styles.column}>
              <h3>{column.heading}</h3>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} After630</span>
        </div>
      </div>
    </footer>
  );
}
