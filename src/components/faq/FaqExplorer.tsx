"use client";

import { useMemo, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { faqCategories, faqItems, type FaqCategory } from "@/content/faq";
import styles from "@/components/secondary/secondary.module.css";

export default function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return `${item.question} ${item.answer}`.toLowerCase().includes(q);
    });
  }, [query, category]);

  const accordionItems = filtered.map((item, index) => ({
    id: `faq-${item.category}-${index}`,
    title: item.question,
    content: <p style={{ margin: 0 }}>{item.answer}</p>,
  }));

  return (
    <section className={styles.faqBody}>
      <div className="container">
        <div className={styles.faqChips} role="group" aria-label="Filter FAQs by category">
          <button type="button" className={`${styles.faqChip} ${category === "all" ? styles.selected : ""}`} onClick={() => setCategory("all")}>
            All
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.faqChip} ${category === cat ? styles.selected : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.faqLayout}>
          <aside className={styles.faqAside}>
            <p className="eyebrow">Need a hand?</p>
            <h3>Still unsure?</h3>
            <p>
              Some questions are best answered for your specific departure. Send us the details and we&apos;ll
              help you understand your options.
            </p>
            <Button href="/contact" variant="primary" style={{ marginTop: 10 }}>
              Ask the team ↗
            </Button>
          </aside>

          <div className={styles.faqMain}>
            <label
              htmlFor="faq-query"
              style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
            >
              Search FAQs
            </label>
            <div className={styles.faqSearch}>
              <span aria-hidden="true">⌕</span>
              <input
                id="faq-query"
                type="search"
                placeholder="Search FAQs, bookings, payments…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {accordionItems.length > 0 ? (
              <Accordion items={accordionItems} />
            ) : (
              <div className={styles.faqEmpty}>No answers matched. Try a different keyword or reset to All.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
