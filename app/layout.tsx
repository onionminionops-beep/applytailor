import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApplyTailor — Tailored resume bullets in minutes",
  description:
    "Paste a job posting URL, pay $12 once, and get tailored resume bullets plus a short cover note.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
        <footer className="border-t border-[#1e2638] py-4 text-center text-xs text-[#6b7388]">
          <a
            href="https://fazier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9aa3b8]"
          >
            Listed on Fazier
          </a>
        </footer>
      </body>
    </html>
  );
}
