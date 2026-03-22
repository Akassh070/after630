import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a href="#" className={styles.logo}>
            <img src="/logo.jpg" alt="After 6:30" className={styles.logoImg} />
          </a>
          <p className={styles.tagline}>
            Where corporate ends and passion begins.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Quick Links</span>
            <a href="/events">Events</a>
            <a href="/gallery">Gallery</a>
            <a href="/confessions">Confessions</a>
            <a href="/about">About Us</a>
            <a href="/#perform">Apply to Perform</a>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Contact Us</span>
            <a href="tel:+917016617715">📞 +91 70166 17715</a>
            <a href="mailto:after630community@gmail.com">✉️ Gmail</a>
            <a href="https://wa.me/917016617715" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Social</span>
            <a href="https://www.instagram.com/after630club?igsh=MXB1M2ZxYmo4Y3c4eg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 After 6:30 · Ahmedabad</span>
        <span className={styles.craft}>Crafted with ♥ for the passionate ones</span>
      </div>
    </footer>
  );
}
