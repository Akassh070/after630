'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ReviewForm from '@/components/ReviewForm';
import { motion } from 'framer-motion';

function FeedbackContent() {
  const searchParams = useSearchParams();
  const eventName = searchParams.get('event') || '';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.4 }}
      style={{
        width: '100%',
        maxWidth: '500px',
        padding: '20px',
      }}
    >
      <ReviewForm initialEventName={eventName} />
    </motion.div>
  );
}

export default function FeedbackPage() {
  return (
    <main style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%)',
        padding: '120px 20px 40px 20px'
    }}>
      <Suspense fallback={<p style={{ color: 'var(--gold)' }}>Loading vibe check...</p>}>
        <FeedbackContent />
      </Suspense>
    </main>
  );
}
