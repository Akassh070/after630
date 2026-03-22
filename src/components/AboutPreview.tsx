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
              Built for your <span className="gradient-text">work life.</span><br/>
              Designed for your <span className="gradient-text">real life.</span>
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
              Ahmedabad gives you opportunities.
              But somewhere, it takes away your evenings.
            </p>
            <p className={styles.text}>
              Work ends. You go home. Same routine. Same screen. Same cycle.
            </p>
            <p className={styles.text}>
              We built After 6:30 to change that.
              To give you a reason to step out, meet new people,
              and feel something real again.
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
