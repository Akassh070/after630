"use client";

import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.2A7.8 7.8 0 0 1 9.8 4 7.9 7.9 0 1 0 20 14.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ThemeToggleProps = {
  /** When true, renders a labeled row for the mobile nav panel. */
  variant?: "icon" | "mobile";
};

export default function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  const button = (
    <button
      type="button"
      className={`${styles.toggle} ${variant === "icon" ? styles.desktopOnly : ""}`}
      onClick={toggleTheme}
      aria-label={nextLabel}
      title={nextLabel}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );

  if (variant === "mobile") {
    return (
      <div className={styles.mobileRow}>
        <span className={styles.mobileLabel}>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        {button}
      </div>
    );
  }

  return button;
}
