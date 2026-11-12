import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      {items.map((item, index) => (
        <span key={item.label} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span className={styles.current} aria-current="page">{item.label}</span>}
          {index < items.length - 1 && <span aria-hidden="true">›</span>}
        </span>
      ))}
    </nav>
  );
}
