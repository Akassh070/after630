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
    title: "Tap Book Now",
    text: "Choose your departure and tap Book Now. WhatsApp opens with your booking details filled in.",
  },
  {
    num: "03",
    title: "Pay and confirm your seat",
    text: "Our team shares the payment details and confirms your seat in writing once payment is received.",
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
            Pick a trip, book on WhatsApp in minutes, then get ready for your next experience.
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
            Book a trip ↗
          </Button>
          <Button href={waLink ?? "/contact"} external={Boolean(waLink)} variant="ghost">
            Ask on WhatsApp ↗
          </Button>
        </div>
      </div>
    </section>
  );
}
