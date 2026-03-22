import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "After 6:30 – Life Starts After Work | Ahmedabad",
  description:
    "A curated community for corporate professionals in Ahmedabad to rediscover their passions live music, storytelling, stand up comedy, and more.",
  keywords: ["Ahmedabad nightlife", "corporate community", "live events", "music storytelling comedy"],
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
