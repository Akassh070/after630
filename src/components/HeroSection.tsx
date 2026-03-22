'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const orbs: { x: number; y: number; r: number; vx: number; vy: number; color: string; alpha: number }[] = [];
    const colors = ['rgba(212,160,23,', 'rgba(244,98,42,', 'rgba(240,190,58,'];
    for (let i = 0; i < 22; i++) {
      orbs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 60 + Math.random() * 120,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.02 + Math.random() * 0.05,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `${o.color}${o.alpha})`);
        g.addColorStop(1, `${o.color}0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Vignette */}
      <div className={styles.vignette} />

      <div className={styles.content}>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className={styles.eyebrow}
        >
          Ahmedabad’s Most Exclusive After Office Community
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className={styles.headline}
        >
          Ahmedabad: <em>Life</em> <br />
          <em>Starts</em> <br />
          <span className="gradient-text">After 6:30</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className={styles.subtext}
        >
          A curated community for corporate professionals 
          <br />
          to rediscover their passion.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className={styles.ctas}
        >
          <a href="#events" className="btn-primary">
            Explore Events
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#gallery" className="btn-outline">
            View Gallery
          </a>
        </motion.div>
      </div>


    </section>
  );
}
