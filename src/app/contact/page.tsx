import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EnquiryComposer from "@/components/contact/EnquiryComposer";
import { instagramHandle, siteConfig } from "@/lib/config";
import { formatWhatsappDisplay, getGreetingWaLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import InstagramIcon from "@/components/ui/InstagramIcon";
import styles from "@/components/secondary/secondary.module.css";

export const metadata: Metadata = {
  title: "Contact After630",
  description: "Reach the After630 team on WhatsApp or Instagram to ask about a trip before you book.",
  alternates: { canonical: "/contact" },
};

const STEPS = [
  { kicker: "01 / Explore", title: "Tell us your plan.", text: "Share a destination, preferred date or simply the kind of trip you're looking for." },
  { kicker: "02 / Confirm details", title: "Get the specifics.", text: "Our team can explain confirmed availability, the itinerary and relevant package inclusions." },
  { kicker: "03 / Book with clarity", title: "Know before you pay.", text: "When ready, booking terms and payment instructions are shared before any confirmation." },
];

export default function ContactPage() {
  const waLink = getGreetingWaLink(siteConfig.whatsappNumber);
  return (
    <>
      <section className={styles.contactHero}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <div className={styles.contactHeroGrid}>
            <div>
              <p className="eyebrow">Let&apos;s talk about your next adventure</p>
              <h1>Questions? Plans? Let&apos;s go.</h1>
              <p>
                From your first trip question to getting ready for departure, our team is here to help you
                understand the journey before you book.
              </p>

              <div className={styles.contactMethods}>
                {waLink && siteConfig.whatsappNumber ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.contactMethod} ${styles.contactMethodLink}`}
                  >
                    <span className={`${styles.methodIcon} ${styles.methodIconWhatsapp}`} aria-hidden="true">
                      <WhatsAppIcon />
                    </span>
                    <div>
                      <h3>WhatsApp · {formatWhatsappDisplay(siteConfig.whatsappNumber)}</h3>
                      <p>Fastest way to reach the After630 team. Opens WhatsApp in a new tab.</p>
                    </div>
                  </a>
                ) : (
                  <div className={`${styles.contactMethod} ${styles.contactMethodPlain}`}>
                    <span className={styles.methodIcon} aria-hidden="true">↗</span>
                    <div>
                      <h3>WhatsApp</h3>
                      <p>WhatsApp enquiries will open here once our Business number is connected.</p>
                    </div>
                  </div>
                )}
                {siteConfig.instagramUrl ? (
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.contactMethod} ${styles.contactMethodLink}`}
                  >
                    <span className={`${styles.methodIcon} ${styles.methodIconInstagram}`} aria-hidden="true">
                      <InstagramIcon />
                    </span>
                    <div>
                      <h3>Instagram · {instagramHandle(siteConfig.instagramUrl)}</h3>
                      <p>Trip moments, community stories and new journey announcements. Opens in a new tab.</p>
                    </div>
                  </a>
                ) : (
                  <div className={`${styles.contactMethod} ${styles.contactMethodPlain}`}>
                    <span className={styles.methodIcon} aria-hidden="true">◎</span>
                    <div>
                      <h3>Instagram</h3>
                      <p>Our Instagram will be linked here when ready.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <EnquiryComposer whatsappNumber={siteConfig.whatsappNumber} />
          </div>
        </div>
      </section>

      <section className={styles.contactFollow}>
        <div className="container">
          <p className="eyebrow">What happens next</p>
          <h2 className="sectionTitle">Easy conversations. Clear next steps.</h2>
          <div className={styles.followGrid}>
            {STEPS.map((step) => (
              <div key={step.kicker} className={styles.followCard}>
                <span className={styles.followN}>{step.kicker}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
