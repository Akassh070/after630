import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { LegalBlock, LegalPageContent } from "@/content/legal/types";
import { siteConfig } from "@/lib/config";
import styles from "@/components/secondary/secondary.module.css";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className={styles.legalList}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className={styles.legalTableWrap}>
          <table className={styles.legalTable}>
            <thead>
              <tr>
                <th scope="col">{block.head[0]}</th>
                <th scope="col">{block.head[1]}</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <p className={styles.legalNote}>
          <strong>Important:</strong> {block.text}
        </p>
      );
  }
}

export default function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <>
      <section className={styles.legalHero}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: content.title }]} />
          <p className="eyebrow">Your information matters</p>
          <h1>{content.title}</h1>
          <p className="sectionText" style={{ maxWidth: 700 }}>
            {content.intro}
          </p>
          <div className={styles.legalMeta}>
            <span className={styles.legalTag}>Last updated: {content.lastUpdated}</span>
            {!siteConfig.legalApproved && (
              <span className={styles.legalTag}>Draft — pending final approval</span>
            )}
          </div>
        </div>
      </section>

      <section className={styles.legalBody}>
        <div className={`container ${styles.legalGrid}`}>
          <aside className={styles.legalToc}>
            <h3>On this page</h3>
            {content.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.heading}
              </a>
            ))}
          </aside>

          <div className={styles.legalCopy}>
            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.legalSection}>
                <h2>{section.heading}</h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}

            <div className={styles.legalBottom}>
              <h3>Need a clarification?</h3>
              <p>Questions about this policy? Reach out to the After630 team and we&apos;ll help.</p>
              <Link href="/contact" className="btnPrimary">
                Contact After630 ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
