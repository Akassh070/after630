import { describe, expect, it } from "vitest";
import {
  formatWhatsappDisplay,
  getGreetingWaLink,
  buildGreetingMessage,
  buildBookingGreetingMessage,
  getBookingWaLink,
  buildAlternateDatesMessage,
  buildFutureDatesMessage,
  buildGeneralEnquiryMessage,
  buildTripEnquiryMessage,
  buildWaLink,
} from "@/lib/whatsapp";

describe("buildWaLink", () => {
  it("returns null when the number is missing — never fabricates a link", () => {
    expect(buildWaLink(null, "hello")).toBeNull();
  });

  it("builds a wa.me link with the message percent-encoded", () => {
    const link = buildWaLink("919800000000", "Hi & welcome! 100% real?");
    expect(link).toBe(
      "https://wa.me/919800000000?text=" + encodeURIComponent("Hi & welcome! 100% real?"),
    );
  });

  it("safely encodes newlines and emoji without throwing", () => {
    const message = "Line one\nLine two 🏔️";
    const link = buildWaLink("919800000000", message);
    expect(link).toContain("Line%20one");
    expect(decodeURIComponent(link!.split("text=")[1])).toBe(message);
  });
});

describe("buildTripEnquiryMessage", () => {
  it("includes only the fields that were actually provided", () => {
    const message = buildTripEnquiryMessage({ tripTitle: "15 Strangers & Stories" });
    expect(message).toContain("15 Strangers & Stories");
    expect(message).not.toContain("departure");
    expect(message).not.toContain("package");
    expect(message).toMatch(/I'd like to book 15 Strangers & Stories/);
    expect(message).toMatch(/payment details to reserve my seat/i);
  });

  it("reflects the exact selected departure, origin, package and traveller count", () => {
    const message = buildTripEnquiryMessage({
      tripTitle: "Test Group Trip",
      departureDate: "14 March 2027",
      originCity: "Delhi",
      packageName: "Premium",
      travellers: 3,
    });
    expect(message).toContain("departure 14 March 2027");
    expect(message).toContain("starting from Delhi");
    expect(message).toContain("package Premium");
    expect(message).toContain("for 3 travellers");
    expect(message).toContain("reserve our seats");
  });

  it("uses singular traveller wording for one traveller", () => {
    const message = buildTripEnquiryMessage({ tripTitle: "Trip", travellers: 1 });
    expect(message).toContain("for 1 traveller");
    expect(message).not.toContain("1 travellers");
  });
});

describe("other message builders", () => {
  it("future-dates message never claims a date or price", () => {
    const message = buildFutureDatesMessage("Trip X");
    expect(message).not.toMatch(/₹|\d{1,2} [A-Z][a-z]+ \d{4}/);
    expect(message).toContain("Trip X");
  });

  it("alternate-dates message is honest about the current status", () => {
    const message = buildAlternateDatesMessage("Trip X");
    expect(message).toMatch(/doesn't currently show an open departure/i);
  });

  it("general enquiry composer mirrors only the fields filled in", () => {
    const message = buildGeneralEnquiryMessage({ name: "Riya", destination: "Himachal" });
    expect(message).toContain("Name: Riya");
    expect(message).toContain("Trip / destination: Himachal");
    expect(message).not.toContain("Travellers:");
    expect(message).not.toContain("Preferred dates:");
  });
});

describe("site WhatsApp number helpers", () => {
  it("formats an Indian number for display", () => {
    expect(formatWhatsappDisplay("917016617715")).toBe("+91 70166 17715");
  });

  it("falls back to +digits for other countries", () => {
    expect(formatWhatsappDisplay("447700900123")).toBe("+447700900123");
  });

  it("builds the greeting link for the official number, and null without a number", () => {
    const link = getGreetingWaLink("917016617715");
    expect(link).toMatch(/^https:\/\/wa\.me\/917016617715\?text=/);
    expect(decodeURIComponent(link!.split("text=")[1])).toBe(buildGreetingMessage());
    expect(getGreetingWaLink(null)).toBeNull();
  });

  it("no message carries the old enquiry-not-booking disclaimer", () => {
    for (const message of [
      buildGreetingMessage(),
      buildBookingGreetingMessage(),
      buildTripEnquiryMessage({ tripTitle: "Trip" }),
      buildFutureDatesMessage("Trip"),
      buildAlternateDatesMessage("Trip"),
      buildGeneralEnquiryMessage({}),
    ]) {
      expect(message).not.toMatch(/enquiry|not a (confirmed )?booking/i);
    }
  });

  it("builds the header Book Now link with a booking message", () => {
    const link = getBookingWaLink("917016617715");
    expect(decodeURIComponent(link!.split("text=")[1])).toMatch(/I'd like to book a trip/);
    expect(getBookingWaLink(null)).toBeNull();
  });
});

describe("Instagram profile", () => {
  it("uses the official profile and shows its handle", async () => {
    const { siteConfig, instagramHandle } = await import("@/lib/config");
    expect(siteConfig.instagramUrl).toBe("https://www.instagram.com/after630club");
    expect(instagramHandle(siteConfig.instagramUrl!)).toBe("@after630club");
  });
});
