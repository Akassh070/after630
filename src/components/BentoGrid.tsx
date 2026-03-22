'use client';

import { motion } from 'framer-motion';
import styles from './BentoGrid.module.css';

const bentoItems = [
  {
    id: 'music',
    icon: '🎸',
    title: 'Live Music Sessions',
    desc: 'Not just performances — real energy, real people. Unplugged nights where music feels personal, and every song hits differently.',
    tag: 'Curated Evenings',
    accent: 'gold',
    large: true,
  },
  {
    id: 'storytelling',
    icon: '📖',
    title: 'Storytelling Nights',
    desc: 'No scripts. No filters. Just real stories from real people — the kind you carry with you.',
    tag: 'Real Stories',
    accent: 'orange',
    large: false,
  },
  {
    id: 'comedy',
    icon: '🎤',
    title: 'Stand-up Comedy',
    desc: 'Turns out, people around you are funnier than you think. This is their stage — and your escape.',
    tag: 'Open Stage',
    accent: 'orange',
    large: false,
  },
  {
    id: 'coffee',
    icon: '☕',
    title: 'Coffee & Conversations',
    desc: 'No pressure. No awkward networking. Just coffee, conversations, and genuine connections.',
    tag: 'Easy Meetups',
    accent: 'gold',
    large: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function BentoGrid() {
  return (
    <section className={styles.wrapper} id="bento">
      <div className="section">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          What We Do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="section-title"
        >
          More Than Events.{' '}
          <span className="gradient-text">Real Experiences.</span>
        </motion.h2>
        <div className="gold-divider" />

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {bentoItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className={`${styles.card} glass-card ${item.large ? styles.large : ''} ${styles[item.accent]}`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{item.icon}</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.tag}>{item.tag}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
              <div className={styles.cardGlow} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
