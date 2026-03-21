'use client';

import { motion } from 'framer-motion';
import { confessions, categoryColors } from '@/lib/confessions';
import styles from './ConfessionsPage.module.css';

export default function ConfessionsPage() {
  return (
    <main className={styles.main}>
      <section className="section">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          The Wall of Truth
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="section-title"
        >
          Everyone has a <span className="gradient-text">Story</span>
        </motion.h1>
        <div className="gold-divider" />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="section-subtitle"
        >
          Anonymous, real, and unfiltered confessions from our corporate community. Because sometimes, you just need to say it out loud.
        </motion.p>

        <div className={styles.grid}>
          {confessions.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`${styles.card} glass-card`}
            >
              <span
                className={styles.category}
                style={{ color: categoryColors[c.category] || 'var(--gold)' }}
              >
                {c.category}
              </span>
              <p className={styles.text}>&ldquo;{c.text}&rdquo;</p>
              <span className={styles.anon}>— Anonymous</span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
