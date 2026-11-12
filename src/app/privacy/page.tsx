import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/content/legal/privacy";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyPolicy.intro,
  alternates: { canonical: "/privacy" },
  robots: siteConfig.legalApproved ? undefined : { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalPage content={privacyPolicy} />;
}
