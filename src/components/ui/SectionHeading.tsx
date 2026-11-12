import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div style={align === "center" ? { textAlign: "center" } : undefined}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="sectionTitle">{title}</h2>
      {description && <p className="sectionText" style={align === "center" ? { marginInline: "auto" } : undefined}>{description}</p>}
    </div>
  );
}
