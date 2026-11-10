import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.habeshacryptoofficial.com"),
  title: "Habesha Crypto — Cryptocurrency Education, Knowledge & Community",
  description:
    "Habesha Crypto is a community-driven educational platform focused on cryptocurrency, blockchain fundamentals, digital asset literacy, and market learning.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://www.habeshacryptoofficial.com",
    siteName: "Habesha Crypto",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
