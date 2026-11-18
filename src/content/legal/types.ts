/** One piece of a policy section, rendered in order. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: [string, string]; rows: [string, string][] }
  /** Highlighted small print, e.g. deductions that apply to a table. */
  | { type: "note"; text: string };

export type LegalSection = { id: string; heading: string; blocks: LegalBlock[] };

export type LegalPageContent = {
  title: string;
  /** Shown under the H1 and used as the meta description. */
  intro: string;
  /** Human-readable, e.g. "18 November 2026". */
  lastUpdated: string;
  sections: LegalSection[];
};
