"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Dialog.module.css";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps the native <dialog> element: free focus trap, Escape-to-close and
 * ::backdrop. Returns focus to whatever triggered it automatically (native
 * behavior) and never leaves the page scrollable behind an open modal.
 */
export default function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`${styles.dialog} ${className ?? ""}`}
      aria-label={title}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeRow}>
          <button type="button" className={styles.closeBtn} aria-label={`Close ${title}`} onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
