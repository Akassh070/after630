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
  shortDestination,
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
  it("builds the full trip message with destination, dates and pickup city", () => {
    const message = buildTripEnquiryMessage({
      tripTitle: "15 Strangers & Stories",
      destination: "Himachal",
      departureDate: "12–16 December 2026",
      originCity: "Chandigarh",
    });
    expect(message).toBe(
      "Hi After630! 👋\n\n" +
        "I'm interested in the *15 Strangers & Stories* Himachal trip (12–16 December 2026) from Chandigarh.\n\n" +
        "Are seats still available? I'd love to know a little more about the experience and booking process before confirming. 🏔️",
    );
  });

  it("leaves out the parts that weren't provided", () => {
    const message = buildTripEnquiryMessage({ tripTitle: "Test Group Trip" });
    expect(message).toContain("I'm interested in the *Test Group Trip* trip.");
    expect(message).not.toContain("(");
    expect(message).not.toContain(" from ");
  });
});

describe("shortDestination", () => {
  it("uses the broadest destination, shortened where people do", () => {
    expect(shortDestination(["Sainj Valley", "Himachal Pradesh"])).toBe("Himachal");
  });

  it("passes other names through unchanged and handles an empty list", () => {
    expect(shortDestination(["Rishikesh", "Uttarakhand"])).toBe("Uttarakhand");
    expect(shortDestination(["Uttar Pradesh"])).toBe("Uttar Pradesh");
    expect(shortDestination([])).toBeUndefined();
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

  it("builds the header Enquire on WhatsApp link with a trips message", () => {
    const link = getBookingWaLink("917016617715");
    expect(decodeURIComponent(link!.split("text=")[1])).toMatch(/interested in your upcoming trips/);
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
