import type { Trip, TripDeparture } from "./types";

export type EnquiryMode =
  | "enquire" // has at least one available departure → full selector + WhatsApp enquiry
  | "future-dates" // no departures yet → "Ask About Future Dates"
  | "sold-out"
  | "postponed"
  | "cancelled"
  | "completed";

/**
 * Maps a trip's status + departures to the single UX state that governs the
 * booking panel. Mirrors handoff/ux/After630_Phase1_UX_Implementation_Spec.md §5.
 */
export function getEnquiryMode(trip: Trip): EnquiryMode {
  if (trip.status === "sold-out") return "sold-out";
  if (trip.status === "postponed") return "postponed";
  if (trip.status === "cancelled") return "cancelled";
  if (trip.status === "completed") return "completed";

  const hasAvailableDeparture = trip.departures.some((d) => d.status === "available");
  if (trip.status === "published" && hasAvailableDeparture) return "enquire";

  return "future-dates";
}

export function getAvailableDepartures(trip: Trip): TripDeparture[] {
  return trip.departures.filter((d) => d.status === "available");
}

export function formatDepartureDate(localDate: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${localDate}T00:00:00`));
  } catch {
    return localDate;
  }
}

/** Cheapest confirmed package price across a trip's available departures, or undefined if none is set. */
export function getStartingPriceINR(trip: Trip): number | undefined {
  const prices = trip.departures
    .filter((d) => d.status === "available")
    .flatMap((d) => d.origins.flatMap((o) => o.packages.map((p) => p.priceINR)))
    .filter((price): price is number => typeof price === "number");
  return prices.length ? Math.min(...prices) : undefined;
}

export function formatPriceINR(priceINR?: number): string {
  if (typeof priceINR !== "number" || Number.isNaN(priceINR)) return "Price on enquiry";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceINR);
}
