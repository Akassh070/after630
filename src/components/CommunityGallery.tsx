'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './CommunityGallery.module.css';

interface GalleryImage {
  src: string;
  label: string;
  type: string;
  tall?: boolean;
  wide?: boolean;
  objectPosition?: string;
}

const images: GalleryImage[] = [
  { src: '/gallery1.png', label: 'Coffee & Networking', type: '☕ Networking', wide: true, objectPosition: 'top' },
  { src: '/gallery2.png', label: 'Acoustic Vibes', type: '🎸 Music', tall: true, objectPosition: 'top' },
  { src: '/gallery3.png', label: 'Stories & Smiles', type: '🎤 Open Mic', objectPosition: 'top' },
  { src: '/gallery4.png', label: 'The Group Vibe', type: '✨ Community', objectPosition: 'top' },
  { src: '/gallery5.png', label: 'The After 6:30 Family', type: '📸 Memories', wide: true, objectPosition: 'bottom' },
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
          What It Feels Like
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="section-title"
        >
          Real People. <span className="gradient-text">Real Evenings.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="section-subtitle"
          style={{ marginTop: '12px' }}
        >
          Every photo here was once a random evening. Now it’s a story someone remembers.
        </motion.p>
        

        <div className={styles.grid}>
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${styles.item} ${img.tall ? styles.tall : ''} ${img.wide ? styles.wide : ''}`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                style={{ objectFit: 'cover', objectPosition: img.objectPosition || 'center' }}
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
