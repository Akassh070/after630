"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  formatDepartureDate,
  formatPriceINR,
  getAvailableDepartures,
  getEnquiryMode,
  getStartingPriceINR,
  type EnquiryMode,
} from "@/lib/trips/availability";
import { buildAlternateDatesMessage, buildFutureDatesMessage, buildTripEnquiryMessage, buildWaLink } from "@/lib/whatsapp";
import type { Trip } from "@/lib/trips/types";
import styles from "./trip.module.css";

const MODE_COPY: Record<EnquiryMode, { tag: string; help: string }> = {
  enquire: { tag: "Booking open", help: "Tap Book Now to reserve on WhatsApp. Your seat is confirmed once payment is received." },
  "future-dates": { tag: "New dates coming", help: "The next departure for this trip will be announced soon. Message us to hear first." },
  "sold-out": { tag: "Sold out", help: "This departure is full. Ask us about other dates or similar trips." },
  postponed: { tag: "Postponed", help: "This trip's dates are being revised. Ask us for the latest update." },
  cancelled: { tag: "Cancelled", help: "This departure will not run. Ask us about alternative journeys." },
  completed: { tag: "Completed", help: "This journey has already taken place." },
};

export default function EnquirySection({ trip, whatsappNumber }: { trip: Trip; whatsappNumber: string | null }) {
  const router = useRouter();
  const mode = getEnquiryMode(trip);
  const departures = getAvailableDepartures(trip);

  const [firstDeparture] = departures;
  const [firstOrigin] = firstDeparture?.origins ?? [];
  const [firstPackage] = firstOrigin?.packages ?? [];
  const hasFixedPackage = departures.length === 1
    && firstDeparture.origins.length === 1
    && firstOrigin.packages.length === 1;

  const [departureId, setDepartureId] = useState(hasFixedPackage ? firstDeparture.id : "");
  const [originCity, setOriginCity] = useState(hasFixedPackage ? firstOrigin.city : "");
  const [packageId, setPackageId] = useState(hasFixedPackage ? firstPackage.id : "");
  const [travellers, setTravellers] = useState(1);

  const selectedDeparture = departures.find((d) => d.id === departureId);
  const origins = selectedDeparture?.origins ?? [];
  const selectedOrigin = origins.find((o) => o.city === originCity);
  const packages = selectedOrigin?.packages ?? [];
  const selectedPackage = packages.find((p) => p.id === packageId);

  const fallbackStartingPrice = getStartingPriceINR(trip);

  function computeMessage(): string | null {
    if (mode === "enquire") {
      if (!selectedDeparture || !selectedOrigin || !selectedPackage) return null;
      return buildTripEnquiryMessage({
        tripTitle: trip.title,
        departureDate: formatDepartureDate(selectedDeparture.localDate, selectedDeparture.endDate),
        originCity: selectedOrigin.city,
        packageName: selectedPackage.name,
        travellers,
      });
    }
    if (mode === "future-dates") return buildFutureDatesMessage(trip.title);
    if (mode === "sold-out" || mode === "postponed" || mode === "cancelled") return buildAlternateDatesMessage(trip.title);
    return null; // completed — no enquiry message
  }

  const message = computeMessage();

  // The official number is built into the site, so waLink is normally always
  // set; without one, the buttons fall back to the Contact page.
  const waLink = message ? buildWaLink(whatsappNumber, message) : null;
  const copy = MODE_COPY[mode];

  const ctaLabel =
    mode === "enquire"
      ? "Book Now ↗"
      : mode === "future-dates"
        ? "Get notified on WhatsApp ↗"
        : "Ask about other dates ↗";

  const mobileCtaLabel =
    mode === "completed"
      ? "See experiences"
      : mode === "enquire"
        ? "Book Now ↗"
        : mode === "future-dates"
          ? "Get notified ↗"
          : "Other dates ↗";

  const bookingRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(true);
  useEffect(() => {
    const node = bookingRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setCardVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <aside id="book" className={styles.booking} ref={bookingRef} aria-label="Book this trip">
        <div className={styles.bookingTop}>
          <span className={styles.bookingTag}>◌ {copy.tag}</span>
          {mode === "enquire" ? (
            <>
              <div className={styles.bookingLabel}>{hasFixedPackage ? "Price per person" : "Starting from"}</div>
              <div className={styles.bookingPrice}>
                {formatPriceINR(selectedPackage?.priceINR ?? fallbackStartingPrice)}
              </div>
            </>
          ) : (
            <>
              <div className={styles.bookingLabel}>Price</div>
              <div className={styles.bookingPrice}>On request</div>
            </>
          )}
          <p className={styles.bookingCopy}>{copy.help}</p>
        </div>

        {mode === "enquire" && (
          <div className={styles.bookingFields}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldTitle} htmlFor="departure-select">
                Choose departure
              </label>
              <select
                id="departure-select"
                className={styles.selectField}
                value={departureId}
                onChange={(e) => {
                  setDepartureId(e.target.value);
                  setOriginCity("");
                  setPackageId("");
                }}
              >
                {!hasFixedPackage && <option value="">Select a date</option>}
                {departures.map((d) => (
                  <option key={d.id} value={d.id}>
                    {formatDepartureDate(d.localDate, d.endDate)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldTitle} htmlFor="origin-select">
                Travel from
              </label>
              <select
                id="origin-select"
                className={styles.selectField}
                value={originCity}
                disabled={!selectedDeparture}
                onChange={(e) => {
                  setOriginCity(e.target.value);
                  setPackageId("");
                }}
              >
                {!hasFixedPackage && (
                  <option value="">{selectedDeparture ? "Select origin city" : "Choose a departure first"}</option>
                )}
                {origins.map((o) => (
                  <option key={o.city} value={o.city}>
                    {o.city}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldTitle} htmlFor="package-select">
                Package
              </label>
              <select
                id="package-select"
                className={styles.selectField}
                value={packageId}
                disabled={!selectedOrigin}
                onChange={(e) => setPackageId(e.target.value)}
              >
                {!hasFixedPackage && (
                  <option value="">{selectedOrigin ? "Select a package" : "Choose an origin first"}</option>
                )}
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatPriceINR(p.priceINR)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.fieldTitle}>Travellers</span>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  disabled={travellers <= 1}
                  aria-label="Decrease traveller count"
                  onClick={() => setTravellers((n) => Math.max(1, n - 1))}
                >
                  −
                </button>
                <span className={styles.stepperValue} aria-live="polite">
                  {travellers}
                </span>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  disabled={travellers >= 12}
                  aria-label="Increase traveller count"
                  onClick={() => setTravellers((n) => Math.min(12, n + 1))}
                >
                  +
                </button>
              </div>
            </div>

            {message ? (
              <Button
                href={waLink ?? "/contact"}
                external={Boolean(waLink)}
                variant="primary"
                fullWidth
                className={styles.bookingPrimaryCta}
              >
                {ctaLabel}
              </Button>
            ) : (
              <Button variant="primary" fullWidth disabled className={styles.bookingPrimaryCta}>
                {ctaLabel}
              </Button>
            )}
            <p className={styles.bookingHelp}>
              {message
                ? "Opens WhatsApp with your booking details filled in."
                : "Choose a departure, origin and package to continue."}
            </p>

            <div className={styles.bookingBenefits}>
              <span>
                <b>✓</b> Book in minutes on WhatsApp
              </span>
              <span>
                <b>✓</b> Payment details shared by our team
              </span>
              <span>
                <b>✓</b> Written confirmation of your seat
              </span>
            </div>
          </div>
        )}

        {mode === "future-dates" && (
          <div className={styles.bookingFields}>
            <p style={{ fontSize: 12, color: "var(--color-muted)", margin: "0 0 14px", lineHeight: 1.7 }}>
              The next departure, pickup city and price for this trip will be announced soon.
            </p>
            <Button href={waLink ?? "/contact"} external={Boolean(waLink)} variant="primary" fullWidth>
              {ctaLabel}
            </Button>
          </div>
        )}

        {(mode === "sold-out" || mode === "postponed" || mode === "cancelled") && (
          <div className={styles.bookingFields}>
            <StatusBadge status={trip.status} />
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 12 }}>
              This departure isn&apos;t open for booking right now. Explore other journeys, or ask us about
              alternate dates for this one.
            </p>
            <Button href="/trips" variant="primary" fullWidth style={{ marginTop: 14 }}>
              Explore other trips ↗
            </Button>
            <Button
              href={waLink ?? "/contact"}
              external={Boolean(waLink)}
              variant="outline"
              fullWidth
              style={{ marginTop: 10 }}
            >
              {ctaLabel}
            </Button>
          </div>
        )}

        {mode === "completed" && (
          <div className={styles.bookingFields}>
            <StatusBadge status={trip.status} />
            <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 12 }}>
              This journey has already taken place. Take a look at past experiences, or explore upcoming trips.
            </p>
            <Button href="/experiences" variant="primary" fullWidth style={{ marginTop: 14 }}>
              See past experiences ↗
            </Button>
            <Link href="/trips" className="btnGhost" style={{ marginTop: 14, display: "inline-flex" }}>
              Explore upcoming trips ↗
            </Link>
          </div>
        )}

        <div className={styles.policyLinks}>
          <Link href={trip.policyUrls?.terms ?? "/terms"}>Terms &amp; Conditions</Link>
          <Link href={trip.policyUrls?.cancellation ?? "/cancellation-refunds"}>Cancellation &amp; Refunds</Link>
        </div>
      </aside>

      <div className={`${styles.mobileBooking} ${!cardVisible ? styles.show : ""}`}>
        <div>
          <span>{copy.tag}</span>
          <strong>
            {mode === "enquire" ? formatPriceINR(selectedPackage?.priceINR ?? fallbackStartingPrice) : "Price on request"}
          </strong>
        </div>
        {waLink ? (
          <Button href={waLink} external variant="primary" className={styles.mobileBookingBtn}>
            {mobileCtaLabel}
          </Button>
        ) : (
          <button
            type="button"
            className={styles.mobileBookingBtn}
            onClick={() => {
              if (mode === "completed") router.push("/experiences");
              else if (message) router.push("/contact");
              else bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            {mobileCtaLabel}
          </button>
        )}
      </div>
    </>
  );
}
