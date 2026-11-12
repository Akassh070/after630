/**
 * Thin, typed wrapper around Meta's `fbq`. Every function is a safe no-op when
 * the pixel isn't configured or we're on the server, so callers never need to
 * check. The queue stub mirrors Meta's official bootstrap snippet: calls made
 * before fbevents.js finishes loading are queued and replayed by it.
 */

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initializedFor: string | null = null;

function ensureStub(): Fbq | null {
  if (typeof window === "undefined") return null;
  if (!window.fbq) {
    const stub = function (...args: unknown[]) {
      if (stub.callMethod) stub.callMethod(...args);
      else stub.queue.push(args);
    } as Fbq;
    stub.queue = [];
    stub.push = stub;
    stub.loaded = true;
    stub.version = "2.0";
    window.fbq = stub;
    if (!window._fbq) window._fbq = stub;
  }
  return window.fbq;
}

export function initMetaPixel(pixelId: string): void {
  const fbq = ensureStub();
  if (!fbq || initializedFor === pixelId) return;
  fbq("init", pixelId);
  initializedFor = pixelId;
}

export function trackMetaEvent(event: string, params?: Record<string, unknown>): void {
  if (!initializedFor) return; // pixel not configured → nothing is sent
  const fbq = ensureStub();
  if (!fbq) return;
  if (params) fbq("track", event, params);
  else fbq("track", event);
}

/** Which kind of "contact" an outbound link is, if any (used for the Contact event). */
export function contactMethodForHref(href: string | null | undefined): "whatsapp" | "email" | null {
  if (!href) return null;
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return "whatsapp";
  if (/^mailto:/i.test(href)) return "email";
  return null;
}
