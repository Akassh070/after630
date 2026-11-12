/**
 * WhatsApp enquiry message builders + link construction.
 *
 * Message templates follow handoff/ux/After630_Phase1_UX_Implementation_Spec.md §2.
 * Every message must make clear that an enquiry is not a booking. Never build
 * a wa.me link from an unverified/missing number — buildWaLink returns null
 * in that case and callers must fall back to a copy-the-message UI.
 */

export function buildWaLink(whatsappNumber: string | null, message: string): string | null {
  if (!whatsappNumber) return null;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Human-readable form of a digits-only number for display, e.g.
 * "917016617715" → "+91 70166 17715". Non-Indian numbers fall back to
 * "+<digits>".
 */
export function formatWhatsappDisplay(whatsappNumber: string): string {
  if (/^91\d{10}$/.test(whatsappNumber)) {
    const local = whatsappNumber.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return `+${whatsappNumber}`;
}

/** Opening message for the generic "chat with us" entry points (floating button, header, footer). */
export function buildGreetingMessage(): string {
  return (
    "Hi After630! I'd like to know more about your upcoming trips. " +
    "I understand this is an enquiry, not a confirmed booking."
  );
}

/** wa.me link with the generic greeting, or null when no number is configured. */
export function getGreetingWaLink(whatsappNumber: string | null): string | null {
  return buildWaLink(whatsappNumber, buildGreetingMessage());
}

export type TripEnquiryDetails = {
  tripTitle: string;
  departureDate?: string; // already formatted for display, e.g. "14 March 2027"
  originCity?: string;
  packageName?: string;
  travellers?: number;
};

/** Used once a real departure/origin/package/traveller-count combination is selected. */
export function buildTripEnquiryMessage(details: TripEnquiryDetails): string {
  const { tripTitle, departureDate, originCity, packageName, travellers } = details;
  const parts = [`Hi After630! I'm interested in ${tripTitle}`];
  if (departureDate) parts.push(`departure ${departureDate}`);
  if (originCity) parts.push(`starting from ${originCity}`);
  if (packageName) parts.push(`package ${packageName}`);
  if (travellers) parts.push(`for ${travellers} traveller${travellers === 1 ? "" : "s"}`);

  return (
    `${parts.join(", ")}. Please confirm availability, final amount, inclusions and cancellation terms. ` +
    `I understand that this is an enquiry and not a confirmed booking.`
  );
}

/** Used when a trip has no confirmed departures yet. */
export function buildFutureDatesMessage(tripTitle: string): string {
  return (
    `Hi After630! I'm interested in ${tripTitle}. Could you please share confirmed departure dates, ` +
    `packages, pricing and inclusions when available? I understand this is only an enquiry, not a booking.`
  );
}

/** Used for a non-trip-specific status (sold out / postponed / cancelled / completed). */
export function buildAlternateDatesMessage(tripTitle: string): string {
  return (
    `Hi After630! I was looking at ${tripTitle}, but it doesn't currently show an open departure. ` +
    `Could you let me know about alternate dates or similar trips? This is just an enquiry, not a booking.`
  );
}

export type GeneralEnquiryFields = {
  type?: string;
  name?: string;
  destination?: string;
  travellers?: string;
  dates?: string;
  message?: string;
};

/** Ported from the Contact page's `compose()` prototype logic. */
export function buildGeneralEnquiryMessage(fields: GeneralEnquiryFields): string {
  const lines = ["Hi After630 team,", "", `I would like to enquire about: ${fields.type || "a trip"}`];
  if (fields.name) lines.push(`Name: ${fields.name}`);
  if (fields.destination) lines.push(`Trip / destination: ${fields.destination}`);
  if (fields.travellers) lines.push(`Travellers: ${fields.travellers}`);
  if (fields.dates) lines.push(`Preferred dates: ${fields.dates}`);
  if (fields.message) lines.push(`Message: ${fields.message}`);
  lines.push("", "Please share the available details. Thank you! This is an enquiry, not a confirmed booking.");
  return lines.join("\n");
}

/** mailto: link with a subject and (optionally) a pre-filled body. */
export function buildMailtoLink(email: string, subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${email}?${params.join("&")}`;
}
