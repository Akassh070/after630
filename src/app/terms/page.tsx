import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsConditions } from "@/content/legal/terms";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: termsConditions.intro,
  alternates: { canonical: "/terms" },
  robots: siteConfig.legalApproved ? undefined : { index: false, follow: false },
};

export default function TermsPage() {
  return <LegalPage content={termsConditions} />;
}
