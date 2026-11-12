import { describe, expect, it } from "vitest";
import {
  buildMailtoLink,
  formatWhatsappDisplay,
  getGreetingWaLink,
  buildGreetingMessage,
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
    const message = buildTripEnquiryMessage({ tripTitle: "Jibhi & the Slow Mountains" });
    expect(message).toContain("Jibhi & the Slow Mountains");
    expect(message).not.toContain("departure");
    expect(message).not.toContain("package");
    expect(message).toMatch(/not a confirmed booking/i);
  });

  it("reflects the exact selected departure, origin, package and traveller count", () => {
    const message = buildTripEnquiryMessage({
      tripTitle: "Jibhi & the Slow Mountains",
      departureDate: "14 March 2027",
      originCity: "Delhi",
      packageName: "Premium",
      travellers: 3,
    });
    expect(message).toContain("departure 14 March 2027");
    expect(message).toContain("starting from Delhi");
    expect(message).toContain("package Premium");
    expect(message).toContain("for 3 travellers");
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
    expect(message).toMatch(/only an enquiry/i);
  });

  it("alternate-dates message is honest about the current status", () => {
    const message = buildAlternateDatesMessage("Trip X");
    expect(message).toMatch(/doesn't currently show an open departure/i);
  });

  it("general enquiry composer mirrors only the fields filled in", () => {
    const message = buildGeneralEnquiryMessage({ name: "Riya", destination: "Jibhi" });
    expect(message).toContain("Name: Riya");
    expect(message).toContain("Trip / destination: Jibhi");
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

  it("greeting states it's an enquiry, not a booking", () => {
    expect(buildGreetingMessage()).toMatch(/enquiry, not a confirmed booking/);
  });
});

describe("Instagram profile", () => {
  it("uses the official profile and shows its handle", async () => {
    const { siteConfig, instagramHandle } = await import("@/lib/config");
    expect(siteConfig.instagramUrl).toBe("https://www.instagram.com/after630club");
    expect(instagramHandle(siteConfig.instagramUrl!)).toBe("@after630club");
  });
});

describe("contact email", () => {
  it("uses the official address", async () => {
    const { siteConfig } = await import("@/lib/config");
    expect(siteConfig.contactEmail).toBe("akash.dreamverse@gmail.com");
  });

  it("builds an encoded mailto link with subject and body", () => {
    const link = buildMailtoLink("akash.dreamverse@gmail.com", "Trip enquiry — After630", "Hi & hello\nLine 2");
    expect(link.startsWith("mailto:akash.dreamverse@gmail.com?subject=")).toBe(true);
    const params = new URLSearchParams(link.split("?")[1]);
    expect(params.get("subject")).toBe("Trip enquiry — After630");
    expect(params.get("body")).toBe("Hi & hello\nLine 2");
  });
});
