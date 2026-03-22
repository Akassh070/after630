import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={`section ${styles.content}`}>
          <p className="section-label">What we Believe</p>
          <h1 className="section-title">
            Ahmedabad deserves more<br />
            <span className="gradient-text">than just work and weekends.</span>
          </h1>
          <div className="gold-divider" />
          
          <div className={styles.textGroup}>
            <p>
              That’s why we created <strong>After 6:30.</strong>
            </p>
            <p>
              A space where your day doesn’t just end — it transforms.
            </p>
            <p>
              Where you can show up as yourself, express freely,
              and experience something real.
            </p>
            <p>
              No pressure. No labels.
              Just people, energy, and moments that stay with you.
            </p>

            <h3 className={styles.pillarTitle}>
              The 3 Pillars of After 6:30
            </h3>
            
            <div className={styles.pillarsBox}>
              <div className={styles.pillar}>
                <h4>1. Unfiltered Expression</h4>
                <p>
                  Not everyone wants a stage but everyone deserves a voice.
                  Whether it’s music, stories, poetry, or just thoughts,
                  this is your space to express without judgment.
                </p>
              </div>

              <div className={styles.pillar}>
                <h4>2. Real Connection</h4>
                <p>
                  No awkward networking. No forced conversations.
                  Just real people, real talks, and real moments —
                  the kind you don’t get through screens.
                </p>
              </div>

              <div className={styles.pillar}>
                <h4>3. Exclusive Yet Welcoming</h4>
                <p>
                  We keep it curated, not crowded.
                  A space that feels safe, warm,
                  and far away from anything that feels “corporate.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
