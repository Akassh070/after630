'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './CommunityGallery.module.css';

const images = [
  { src: '/gallery_music.png', label: 'Live Music Sessions', type: '🎸 Music', tall: true },
  { src: '/gallery_storytelling.png', label: 'Storytelling Nights', type: '📖 Storytelling', tall: false },
  { src: '/gallery_comedy.png', label: 'Stand-up Comedy', type: '🎤 Comedy', tall: false },
  { src: '/gallery_networking.png', label: 'Coffee & Networking', type: '☕ Networking', tall: true },
];

export default function CommunityGallery() {
  return (
    <section className={styles.wrapper} id="gallery">
      <div className="section">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          In The Room
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="section-title"
        >
          The <span className="gradient-text">Community</span> Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="section-subtitle"
          style={{ marginTop: '12px' }}
        >
          Real moments. Real people. Real passion — after 6:30.
        </motion.p>
        <div className="gold-divider" />

        <div className={styles.grid}>
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${styles.item} ${img.tall ? styles.tall : ''}`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.overlay}>
                <span className={styles.overlayType}>{img.type}</span>
                <h4 className={styles.overlayLabel}>{img.label}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
