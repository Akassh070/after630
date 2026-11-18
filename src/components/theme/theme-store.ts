import { applyTheme, isTheme, readStoredTheme, storeTheme, type Theme } from "./theme";

type Listener = () => void;

let current: Theme = "light";
let hydrated = false;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

/** Align module state with the blocking script / DOM (once on the client). */
function ensureHydrated() {
  if (hydrated || typeof document === "undefined") return;
  hydrated = true;
  const attr = document.documentElement.getAttribute("data-theme");
  if (isTheme(attr)) {
    current = attr;
    return;
  }
  const stored = readStoredTheme();
  current = stored ?? "light";
  applyTheme(current);
}

export function getThemeSnapshot(): Theme {
  ensureHydrated();
  return current;
}

export function getServerThemeSnapshot(): Theme {
  return "light";
}

export function subscribeTheme(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setThemeValue(next: Theme) {
  ensureHydrated();
  if (current === next) {
    applyTheme(next);
    return;
  }
  current = next;
  applyTheme(next);
  storeTheme(next);
  emit();
}

export function toggleThemeValue() {
  ensureHydrated();
  setThemeValue(current === "light" ? "dark" : "light");
}
