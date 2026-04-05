'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from './ReviewForm';
import styles from './ReviewSection.module.css';

interface Props {
  initialReviews: any[];
}

export default function ReviewSectionClient({ initialReviews }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  return (
    <section className={styles.wrapper}>
      <div className="section">
        <div className={styles.header}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.vibeLabel}
            >
              Vibe Check
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              The Word on the <span className="gradient-text">Street</span>
            </motion.h2>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.writeButton}
            onClick={() => setShowModal(true)}
          >
            Rate the Vibe ✨
          </motion.button>
        </div>

        {initialReviews.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyEmoji}>🤌</span>
            <p>It's quiet here. Be the first to drop your thoughts!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {initialReviews.map((review, i) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className={styles.card}
              >
                <div className={styles.cardGlow} />
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <p className={styles.eventName}>{review.eventName}</p>
                    <div className={styles.stars}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={idx < review.rating ? styles.starFilled : styles.starEmpty}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className={styles.text}>"{review.text}"</p>
                  <div className={styles.cardBottom}>
                    <div className={styles.anonBadge}>
                      <div className={styles.pulseDot} />
                      {review.name || 'Anonymous'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {mounted && createPortal(
          <AnimatePresence>
            {showModal && (
              <div key="review-modal" className={styles.modalOverlay} style={{ zIndex: 999999 }}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.modalBackdrop}
                  onClick={() => setShowModal(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className={styles.modalContent}
                >
                  <button className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
                  <ReviewForm onClose={() => setShowModal(false)} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
}
