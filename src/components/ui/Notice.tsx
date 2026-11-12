import type { ReactNode } from "react";
import styles from "./Notice.module.css";

type NoticeProps = {
  variant?: "info" | "warning";
  title?: string;
  children: ReactNode;
};

/** The "ⓘ Design preview, not live inventory" callouts used throughout the prototypes. */
export default function Notice({ variant = "info", title, children }: NoticeProps) {
  return (
    <div className={`${styles.notice} ${variant === "warning" ? styles.warning : ""}`} role="note">
      <span className={styles.icon} aria-hidden="true">
        i
      </span>
      <span>
        {title && <strong>{title}</strong>}
        {children}
      </span>
    </div>
  );
}
