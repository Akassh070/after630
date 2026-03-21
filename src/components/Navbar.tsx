'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Perform', href: '/#perform' },
    { label: 'About', href: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0, filter: 'blur(8px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
    >
      <a href="/" className={styles.logo}>
        After <span className={styles.logoAccent}>6:30</span>
      </a>

      <div className={styles.links}>
        {links.map((l) => (
          <a key={l.label} href={l.href} className={styles.link}>
            {l.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.bar + ' ' + styles.barTop : styles.bar} />
        <span className={menuOpen ? styles.bar + ' ' + styles.barMid : styles.bar} />
        <span className={menuOpen ? styles.bar + ' ' + styles.barBot : styles.bar} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', originY: 0 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className={styles.mobileMenu}
          >
            {links.map((l) => (
              <a key={l.label} href={l.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
