'use client';

import { useState } from 'react';
import { submitReview } from '@/app/actions/reviews';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
  onClose?: () => void;
  initialEventName?: string;
}

export default function ReviewForm({ onClose, initialEventName }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      setMessage('Please select a rating.');
      return;
    }

    setPending(true);
    const formData = new FormData(e.currentTarget);
    formData.append('rating', rating.toString());

    const result = await submitReview(formData);
    setPending(false);

    if (result.success) {
      setIsSubmitted(true);
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 4000);
      }
    } else {
      setMessage(result.message);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.formContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px', textAlign: 'center' }}>
        <div className={styles.successIcon}>✨</div>
        <h3 className={styles.title} style={{ marginBottom: '16px' }}>Vibe Secured!</h3>
        <p className={styles.subtitle} style={{ fontSize: '1.1rem' }}>
          Your anonymous review has been dropped into the void. <br/><br/>
          Thanks for keeping it real! 🥂
        </p>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Drop the Tea ☕</h3>
      <p className={styles.subtitle}>Spill your thoughts. Totally anonymous, just real vibes.</p>

      {message && (
        <div className={`${styles.message} ${message.includes('success') ? styles.messageSuccess : styles.messageError}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="eventName">What was the vibe? (Event Name)</label>
          <input 
            type="text" 
            id="eventName" 
            name="eventName" 
            value={initialEventName || "Strangers & Stories"}
            readOnly
            className={styles.input}
            style={{ 
              color: 'var(--gold)', 
              background: 'rgba(255, 195, 113, 0.05)',
              borderColor: 'rgba(226, 185, 115, 0.2)',
              pointerEvents: 'none' 
            }}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Your Rating</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.star} ${(hoverRating || rating) >= star ? styles.starActive : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                disabled={pending}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="text">Your Review</label>
          <textarea 
            id="text" 
            name="text" 
            placeholder="Tell us about your experience..." 
            required 
            rows={4}
            readOnly={pending}
            className={styles.textarea}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name">Name (Optional)</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Leave blank to remain Anonymous" 
            readOnly={pending}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={pending}>
          {pending ? 'Submitting...' : 'Drop Review ✨'}
        </button>
      </form>
    </div>
  );
}
