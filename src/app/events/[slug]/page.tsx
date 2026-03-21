import { getEventBySlug } from '@/lib/events';
import { notFound } from 'next/navigation';
import styles from './EventDetail.module.css';

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);
  
  if (!event) {
    notFound();
  }

  return (
    <>
      <main className={styles.main}>
        
        {/* Dynamic Hero */}
        <section 
          className={styles.hero}
          style={{ backgroundImage: `url(${event.image})` }}
        >
          {/* Dark Overlay */}
          <div className={styles.heroOverlay} />
          
          <div className={`section ${styles.heroContent}`}>
            <span className={styles.categoryTag}>
              {event.categoryIcon} {event.categoryLabel}
            </span>
            <h1 className={styles.title}>
              {event.title}
            </h1>
            <p className={styles.tagline}>
              {event.tagline}
            </p>
          </div>
        </section>

        {/* Content Details */}
        <section className={`section ${styles.layout}`}>
          
          <div className={styles.leftCol}>
            {/* Description */}
            <div>
              <h2 className={styles.sectionHeading}>About the Event</h2>
              <div className={styles.description}>
                {event.fullDesc}
              </div>
            </div>

            {/* Lineup */}
            <div>
              <h2 className={styles.sectionHeading}>The Lineup</h2>
              <div className={styles.lineupList}>
                {event.lineup.map((l, i) => (
                  <div key={i} className={styles.lineupItem}>
                    <span className={styles.lineupTime}>{l.time}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{l.act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Ticket Box */}
          <div className={styles.sidebar}>
            <div>
              <h3 className={styles.sidebarTitle}>Event Details</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Limited spots available. Arrive early!</p>
            </div>

            <div className={styles.sidebarMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📅</span>
                <div>
                  <div className={styles.metaLabel}>Date & Time</div>
                  <div className={styles.metaValue}>{event.date} · {event.time}</div>
                </div>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📍</span>
                <div>
                  <div className={styles.metaLabel}>Location</div>
                  <div className={styles.metaValue}>{event.venue}, {event.city}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
