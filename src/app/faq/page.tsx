import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { getGreetingWaLink } from "@/lib/whatsapp";
import FaqExplorer from "@/components/faq/FaqExplorer";
import styles from "@/components/secondary/secondary.module.css";

export const metadata: Metadata = {
  title: "Group Trip FAQs: Booking, Solo Travel & Payments",
  description:
    "How After630 group trips work: joining solo, booking on WhatsApp, what the price includes, payments, changes and what to pack. Answers before you book.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const waLink = getGreetingWaLink(siteConfig.whatsappNumber);
  return (
    <>
      <section className={styles.faqHero}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
          <p className="eyebrow" style={{ display: "block" }}>
            Good to know before you go
          </p>
          <h1>Questions? We have answers.</h1>
          <p className="sectionText" style={{ marginInline: "auto" }}>
            From choosing a trip to understanding how booking works, here&apos;s everything you should know
            before you start.
          </p>
        </div>
      </section>
      <FaqExplorer />
      <section className={styles.faqBottomCta}>
        <div className="container">
          <p className="eyebrow">Still have a question?</p>
          <h2 className="sectionTitle">Talk to us, or keep exploring.</h2>
          <div className={styles.faqBottomActions}>
            <Button href={waLink ?? "/contact"} external={Boolean(waLink)} variant="primary">
              Ask on WhatsApp ↗
            </Button>
            <Button href="/trips" variant="ghost">
              Explore trips ↗
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
