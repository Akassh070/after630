"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./Accordion.module.css";

export type AccordionItemData = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: AccordionItemData[];
  showExpandAll?: boolean;
  className?: string;
};

export default function Accordion({ items, showExpandAll, className }: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items.filter((item) => item.defaultOpen).map((item) => item.id)),
  );

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allOpen = items.length > 0 && openIds.size === items.length;

  return (
    <div className={className}>
      {showExpandAll && (
        <button
          type="button"
          className={styles.expandAll}
          onClick={() => setOpenIds(allOpen ? new Set() : new Set(items.map((i) => i.id)))}
        >
          {allOpen ? "Collapse all −" : "Expand all +"}
        </button>
      )}
      <ul className={styles.list}>
        {items.map((item) => {
          const open = openIds.has(item.id);
          const panelId = `${baseId}-panel-${item.id}`;
          const triggerId = `${baseId}-trigger-${item.id}`;
          return (
            <li key={item.id} className={styles.item}>
              <h3 style={{ margin: 0 }}>
                <button
                  type="button"
                  id={triggerId}
                  className={styles.trigger}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span>{item.title}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel} hidden={!open}>
                {item.content}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
