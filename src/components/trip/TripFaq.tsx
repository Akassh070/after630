import Accordion from "@/components/ui/Accordion";
import type { TripFaqItem } from "@/lib/trips/types";
import styles from "./trip.module.css";

export default function TripFaq({ faq }: { faq: TripFaqItem[] }) {
  if (faq.length === 0) return null;

  const items = faq.map((item, index) => ({
    id: `trip-faq-${index}`,
    title: item.question,
    content: <p style={{ margin: 0 }}>{item.answer}</p>,
    defaultOpen: index === 0,
  }));

  return (
    <section id="trip-faq" className={styles.section}>
      <p className="eyebrow">Good to know</p>
      <h2>Before you pack your bags.</h2>
      <Accordion items={items} />
    </section>
  );
}
