import { events } from '@/lib/events';
import cardStyles from '@/components/UpcomingEvents.module.css';
import styles from './EventsPage.module.css';

export default function EventsPage() {
  return (
    <>
      <main className={styles.main}>
        <div className="section">
          <p className="section-label">The Roster</p>
          <h1 className="section-title">
            All <span className="gradient-text">Upcoming Events</span>
          </h1>
          <div className="gold-divider" />
          
          <div className={styles.grid}>
            {events.map((ev, i) => (
              <div
                key={ev.slug}
                className={`${cardStyles.card} glass-card`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Date Badge */}
                <div className={`${cardStyles.dateBadge} ${ev.category === 'music' ? cardStyles.gold : cardStyles.orange}`}>
                  <span className={cardStyles.day}>{ev.day}</span>
                  <span className={cardStyles.month}>{ev.month}</span>
                </div>

                {/* Content */}
                <div className={cardStyles.cardBody}>
                  <div className={cardStyles.cardHeader}>
                    <span className={cardStyles.eventType}>{ev.categoryIcon} {ev.categoryLabel}</span>
                    <span className={`${cardStyles.spotsTag} ${ev.spotsLeft <= 10 ? cardStyles.few : ''}`}>
                      {ev.spotsLeft} spots left
                    </span>
                  </div>
                  <h3 className={cardStyles.eventTitle}>{ev.title}</h3>
                  <div className={cardStyles.meta}>
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

                <a href={`/events/${ev.slug}`} className={cardStyles.bookBtn}>
                  View Details
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}} />
        </div>
      </main>
    </>
  );
}
