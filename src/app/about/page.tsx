import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={`section ${styles.content}`}>
          <p className="section-label">Our Philosophy</p>
          <h1 className="section-title">
            Ahmedabad deserves an <span className="gradient-text">after-hours culture.</span>
          </h1>
          <div className="gold-divider" />
          
          <div className={styles.textGroup}>
            <p>
              After 6:30 was born out of a simple observation: Ahmedabad has amazing corporate jobs, but a painfully predictable social life. You work hard, you go home, you watch Netflix, you repeat.
            </p>
            <p>
              We wanted to create a community for adults who still have passions. The ones who play guitar but only in their bedrooms. The ones who write poetry but only in their Notes app. The ones who just want to meet interesting strangers without the networking pressure of exchanging LinkedIn profiles.
            </p>
            
            <h3 className={styles.pillarTitle}>
              The 3 Pillars of After 6:30
            </h3>
            
            <div className={styles.pillarsBox}>
              <div className={styles.pillar}>
                <h4>1. Unfiltered Expression</h4>
                <p>Whether it's an open mic or a storytelling night, the stage is yours. No judgment.</p>
              </div>

              <div className={styles.pillar}>
                <h4>2. Real Connection</h4>
                <p>We design events that force you to actually talk to people. Human connection over small talk.</p>
              </div>

              <div className={styles.pillar}>
                <h4>3. Exclusive Yet Welcoming</h4>
                <p>We curate our guest lists to keep the vibe right. Safe, warm, and distinctly non-corporate.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
