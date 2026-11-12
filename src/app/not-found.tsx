import Button from "@/components/ui/Button";
import styles from "@/components/secondary/secondary.module.css";

export default function NotFound() {
  return (
    <section className={styles.notfound}>
      <div>
        <h1>404</h1>
        <h2>Looks like we took a detour.</h2>
        <p>That page isn&apos;t on the map. Head back to the homepage or discover a journey worth taking.</p>
        <div className={styles.notfoundActions}>
          <Button href="/" variant="primary">
            Back to home ↗
          </Button>
          <Button href="/trips" variant="outline">
            Explore trips
          </Button>
        </div>
      </div>
    </section>
  );
}
