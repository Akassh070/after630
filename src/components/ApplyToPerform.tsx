'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ApplyToPerform.module.css';
import { submitApplication } from '@/app/actions/apply';

const artForms = [
  'Live Music (Singer / Instrumentalist)',
  'Storytelling',
  'Stand-up Comedy',
  'Poetry / Spoken Word',
  'Other',
];

export default function ApplyToPerform() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    artForm: '',
    city: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await submitApplication(formData);
      
      const name = formData.get('name');
      const email = formData.get('email');
      const artForm = formData.get('artForm');
      const city = formData.get('city');
      const message = formData.get('message');

      const whatsappText = `Hi After 6:30 Team! 👋\n\nI would love to apply to perform. Here are my details:\n\n*Name*: ${name}\n*Email*: ${email}\n*City*: ${city}\n*Art Form*: ${artForm}\n\n*My Story/Message*:\n${message}`;
      const encodedText = encodeURIComponent(whatsappText);
      
      const after630PhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"; 
      window.open(`https://wa.me/${after630PhoneNumber}?text=${encodedText}`, '_blank');

      if (res.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className={`${styles.wrapper} section`} id="perform">
      <div className={styles.inner}>
        <div className={styles.left}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Got Talent?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="section-title"
          >
            Apply to{' '}
            <span className="gradient-text">Perform</span>
          </motion.h2>
          <div className="gold-divider" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="section-subtitle"
          >
            Are you a corporate professional with a hidden talent? We build the stage. You bring the fire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className={styles.perks}
          >
            {[
              { icon: '🎭', text: 'Curated audience of 100+ professionals' },
              { icon: '🎬', text: 'Professional photography & video coverage' },
              { icon: '🤝', text: 'Mentorship from established performers' },
            ].map((perk) => (
              <div key={perk.text} className={styles.perk}>
                <span className={styles.perkIcon}>{perk.icon}</span>
                <span className={styles.perkText}>{perk.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className={`${styles.formCard} glass-card`}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.success}
            >
              <span className={styles.successIcon}>✨</span>
              <h3 className={styles.successTitle}>Application Received!</h3>
              <p className={styles.successText}>
                We&apos;ll review your application and be in touch within 48 hours.
              </p>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder="you@company.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="artForm">Art Form</label>
                  <select
                    id="artForm"
                    name="artForm"
                    className={styles.input}
                    value={formState.artForm}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your passion</option>
                    {artForms.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className={styles.input}
                    placeholder="Ahmedabad"
                    value={formState.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Tell Us About Yourself</label>
                <textarea
                  id="message"
                  name="message"
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Share your story, experience, and what you'd love to perform..."
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isPending}>
                {isPending ? 'Submitting...' : 'Apply Now'}
                {!isPending && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
