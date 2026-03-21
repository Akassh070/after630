'use client';

import { motion } from 'framer-motion';
import styles from './AboutPreview.module.css';

export default function AboutPreview() {
  return (
    <section className={styles.wrapper}>
      <div className="section">
        <div className={styles.inner}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.left}
          >
            <p className="section-label">Our Story</p>
            <h2 className={styles.title}>
              Built for the 9-to-5.<br/>
              <span className="gradient-text">Designed for the 5-to-9.</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.right}
          >
            <p className={styles.text}>
              Ahmedabad has amazing corporate jobs, but a painfully predictable social life. You work hard, you go home, you watch Netflix, you repeat.
            </p>
            <p className={styles.text}>
              We created After 6:30 because we believe life shouldn&apos;t end when you clock out. Whether you want to share a story, play a song, or just meet a stranger over specialty coffee — we built the stage for you.
            </p>
            <a href="/about" className="btn-outline" style={{ display: 'inline-flex', marginTop: '16px' }}>
              Read the Full Story
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
