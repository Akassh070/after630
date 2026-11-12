import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { getGreetingWaLink } from "@/lib/whatsapp";
import { homeFaqItems } from "@/content/faq";
import styles from "./home.module.css";

export default function HomeFaq() {
  const waLink = getGreetingWaLink(siteConfig.whatsappNumber);
  const items = homeFaqItems.map((item, index) => ({
    id: `home-faq-${index}`,
    title: item.question,
    content: <p style={{ margin: 0 }}>{item.answer}</p>,
    defaultOpen: index === 0,
  }));

  return (
    <section id="faq" className={styles.faq}>
      <div className={`container ${styles.faqGrid}`}>
        <div className={styles.faqCopy}>
          <p className="eyebrow">Good to know</p>
          <h2 className="sectionTitle">Questions before you go?</h2>
          <p className="sectionText">
            We&apos;ve got the basics covered. You can also reach out to the After630 team for trip-specific
            details.
          </p>
          <div className={styles.faqActions}>
            <Button href="/faq" variant="ghost">
              See all FAQs ↗
            </Button>
            <Button href={waLink ?? "/contact"} external={Boolean(waLink)} variant="primary">
              Ask on WhatsApp ↗
            </Button>
          </div>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
