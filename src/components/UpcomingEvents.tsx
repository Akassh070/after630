'use client';

import { motion } from 'framer-motion';
import styles from './UpcomingEvents.module.css';

import { events } from '@/lib/events';

export default function UpcomingEvents() {
  return (
    <section className={styles.wrapper} id="events">
      <div className="section">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          On The Calendar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="section-title"
        >
          Upcoming <span className="gradient-text">Events</span>
        </motion.h2>
        

        <div className={styles.cards}>
          {events.map((ev, i) => (
            <motion.div
              key={ev.slug}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`${styles.card} glass-card`}
            >
              {/* Date Badge */}
              <div className={`${styles.dateBadge} ${ev.category === 'music' ? styles.gold : styles.orange}`}>
                <span className={styles.day}>{ev.day}</span>
                <span className={styles.month}>{ev.month}</span>
              </div>

              {/* Content */}
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <span className={styles.eventType}>{ev.categoryIcon} {ev.categoryLabel}</span>
                  <span className={`${styles.spotsTag} ${styles.few}`}>
                    Limited spots
                  </span>
                </div>
                <h3 className={styles.eventTitle}>{ev.title}</h3>
                <p className={styles.eventDesc}>{ev.shortDesc}</p>
                <div className={styles.meta}>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {ev.time}
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2C5.79 2 4 3.79 4 6c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4Z" stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                    {ev.venue}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a href={`/events/${ev.slug}`} className={styles.bookBtn}>
                View Details
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
