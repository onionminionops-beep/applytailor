import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApplyTailor — Tailored resume bullets in minutes",
  description:
    "Paste a job posting URL, pay $5 once, and get tailored resume bullets plus a short cover note.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
