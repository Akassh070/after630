import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { getGreetingWaLink } from "@/lib/whatsapp";
import styles from "./home.module.css";

const steps = [
  {
    num: "01",
    title: "Find your trip",
    text: "Browse destinations, departure details and experiences that catch your eye.",
  },
  {
    num: "02",
    title: "Message our team",
    text: "Choose a departure where available, then enquire via WhatsApp.",
  },
  {
    num: "03",
    title: "Confirm your spot",
    text: "Our team checks availability, shares payment details and verifies the booking.",
  },
  {
    num: "04",
    title: "Let the story begin",
    text: "Receive confirmation and your joining information before travelling.",
  },
];

export default function HowItWorks() {
  const waLink = getGreetingWaLink(siteConfig.whatsappNumber);
  return (
    <section id="how" className={styles.how}>
      <div className="container">
        <div className={styles.howHead}>
          <p className="eyebrow">Your journey, made simple</p>
          <h2 className="sectionTitle">From curious to on your way.</h2>
          <p className="sectionText">
            Explore first. Ask everything you need to know. Then get ready for your next experience.
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepNum}>{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.howActions}>
          <Button href="/trips" variant="primary">
            Explore trips ↗
          </Button>
          <Button href={waLink ?? "/contact"} external={Boolean(waLink)} variant="ghost">
            Ask on WhatsApp ↗
          </Button>
        </div>
        <p className={styles.howNote}>
          A WhatsApp enquiry does not reserve a seat. Bookings are confirmed only once availability and payment
          are verified.
        </p>
      </div>
    </section>
  );
}
