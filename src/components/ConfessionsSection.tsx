'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ConfessionsSection.module.css';
import { confessions, categoryColors } from '@/lib/confessions';

export default function ConfessionsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className={`${styles.wrapper} section`} id="confessions">
      <div className={styles.inner}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          Anonymous · Real · Honest
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="section-title"
        >
          Confessions{' '}
          <span className="gradient-text">After 6:30</span>
        </motion.h2>
        <div className="gold-divider" />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="section-subtitle"
          style={{ marginBottom: '48px' }}
        >
          Things we say after the office lights go off — anonymous, real, and more relatable than any LinkedIn post.
        </motion.p>

        <div className={styles.grid}>
          {confessions.slice(0, 3).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`${styles.card} glass-card`}
              onClick={() => setActiveCard(activeCard === c.id ? null : c.id)}
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

        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="/confessions" className="btn-outline">
            View More Confessions
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
