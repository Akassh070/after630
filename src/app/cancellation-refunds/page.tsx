import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { cancellationRefundPolicy } from "@/content/legal/cancellation";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cancellation & Refunds",
  description: cancellationRefundPolicy.intro,
  alternates: { canonical: "/cancellation-refunds" },
  robots: siteConfig.legalApproved ? undefined : { index: false, follow: false },
};

export default function CancellationRefundsPage() {
  return <LegalPage content={cancellationRefundPolicy} />;
}
