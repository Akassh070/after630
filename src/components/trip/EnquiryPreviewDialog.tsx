"use client";

import { useRef, useState } from "react";
import Dialog from "@/components/ui/Dialog";
import styles from "./trip.module.css";

export default function EnquiryPreviewDialog({
  open,
  onClose,
  message,
  whatsappConnected,
  waLink,
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  whatsappConnected: boolean;
  /** wa.me link carrying this exact message, when a number is configured. */
  waLink?: string | null;
}) {
  const [status, setStatus] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Copied ✓ — paste it into WhatsApp or email.");
    } catch {
      textareaRef.current?.select();
      setStatus("Press Ctrl/Cmd+C to copy the selected text.");
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="Enquiry message preview">
      <div className={styles.inquiryBody}>
        <h2 style={{ margin: 0, fontSize: 22 }}>Your enquiry message</h2>
        <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 8 }}>
          {whatsappConnected
            ? "Review the message below before sending it on WhatsApp."
            : "The official WhatsApp Business number isn't connected in this preview yet — copy this message instead and send it through your own contact channel."}
        </p>
        <label htmlFor="enquiry-message-preview" style={{ display: "block", margin: "18px 0 8px", fontSize: 11, fontWeight: 800 }}>
          Message
        </label>
        <textarea id="enquiry-message-preview" ref={textareaRef} readOnly value={message} />
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btnPrimary"
            style={{ width: "100%", marginTop: 14 }}
          >
            Open in WhatsApp ↗
          </a>
        )}
        <button
          type="button"
          className={waLink ? "btnGhost" : "btnPrimary"}
          style={{ width: "100%", marginTop: waLink ? 6 : 14, justifyContent: "center", ...(waLink ? { background: "transparent", border: 0, cursor: "pointer" } : null) }}
          onClick={copy}
        >
          Copy enquiry message ↗
        </button>
        <p role="status" className={styles.copyStatus}>
          {status}
        </p>
        <div className={styles.previewOnlyNote}>
          This is an enquiry message, not a confirmed booking. After630&apos;s team manually checks availability,
          shares payment instructions and confirms your spot after payment is verified.
        </div>
      </div>
    </Dialog>
  );
}
