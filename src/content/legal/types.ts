export type LegalSection = { id: string; heading: string; body: string };

export type LegalPageContent = {
  title: string;
  intro: string;
  sections: LegalSection[];
};
