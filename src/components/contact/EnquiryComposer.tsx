"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { buildGeneralEnquiryMessage, buildWaLink } from "@/lib/whatsapp";
import styles from "@/components/secondary/secondary.module.css";

export default function EnquiryComposer({ whatsappNumber }: { whatsappNumber: string | null }) {
  const [fields, setFields] = useState({ type: "Book a trip", name: "", destination: "", travellers: "", dates: "", message: "" });

  const message = useMemo(() => buildGeneralEnquiryMessage(fields), [fields]);
  const waLink = buildWaLink(whatsappNumber, message);

  function update<K extends keyof typeof fields>(key: K, value: (typeof fields)[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className={styles.contactCard}>
      <div className={styles.formHead}>
        <h2>Plan your trip with us</h2>
      </div>

      <div className={styles.formSection}>
        <label htmlFor="enquiry-type">What can we help you with?</label>
        <select id="enquiry-type" className={styles.formControl} value={fields.type} onChange={(e) => update("type", e.target.value)}>
          <option>Book a trip</option>
          <option>Private or customised group trip</option>
          <option>Brand partnership</option>
          <option>General question</option>
        </select>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formSection}>
          <label htmlFor="enquiry-name">Your name (optional)</label>
          <input
            id="enquiry-name"
            className={styles.formControl}
            placeholder="How should we address you?"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="enquiry-travellers">Travellers (optional)</label>
          <select
            id="enquiry-travellers"
            className={styles.formControl}
            value={fields.travellers}
            onChange={(e) => update("travellers", e.target.value)}
          >
            <option value="">Select count</option>
            <option>1</option>
            <option>2</option>
            <option>3–5</option>
            <option>6+</option>
          </select>
        </div>
      </div>

      <div className={styles.formSection}>
        <label htmlFor="enquiry-destination">Trip / destination</label>
        <input
          id="enquiry-destination"
          className={styles.formControl}
          placeholder="Where are you thinking?"
          value={fields.destination}
          onChange={(e) => update("destination", e.target.value)}
        />
      </div>

      <div className={styles.formSection}>
        <label htmlFor="enquiry-dates">Preferred travel dates</label>
        <input
          id="enquiry-dates"
          className={styles.formControl}
          placeholder="e.g. December weekend"
          value={fields.dates}
          onChange={(e) => update("dates", e.target.value)}
        />
      </div>

      <div className={styles.formSection}>
        <label htmlFor="enquiry-message">Anything else?</label>
        <textarea
          id="enquiry-message"
          className={styles.formControl}
          rows={3}
          placeholder="Tell us what you'd like to know…"
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <div className={styles.formActions}>
        {waLink && (
          <Button href={waLink} external variant="primary">
            Send on WhatsApp ↗
          </Button>
        )}
      </div>
      <p style={{ fontSize: 10, color: "var(--color-muted)", marginTop: 6, lineHeight: 1.8 }}>
        Opens WhatsApp with your details filled in. Send it and our team will reply there.
      </p>
    </div>
  );
}
