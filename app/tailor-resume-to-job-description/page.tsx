import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tailor Resume to Job Description — ApplyTailor ($12)",
  description:
    "Instantly tailor your resume to any job description. Paste the job posting and your resume, get perfectly matched bullet points for $12 — no subscription.",
};

const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/dRmaERaHe288a66bvweUU0b";

export default function TailorResumeToJobDescriptionPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
      <header className="space-y-5">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2638] bg-[#101522]/80 px-3 py-1 text-xs font-medium text-[#9aa3b8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
          One-time payment · $12 · No subscription
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#eef2ff] sm:text-5xl sm:leading-[1.1]">
          Tailor Your Resume to{" "}
          <span className="bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] bg-clip-text text-transparent">
            Any Job Description
          </span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[#9aa3b8] sm:text-lg">
          Stop sending generic resumes. Paste any job description and your resume text — 
          get perfectly matched bullet points and a tailored cover note in minutes. 
          Pay once, unlock everything.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-6 py-3 text-sm font-semibold text-[#041016] shadow-lg shadow-[#6ee7b7]/25 transition hover:shadow-xl hover:shadow-[#6ee7b7]/35"
          >
            Get started — $12 →
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-6 py-3 text-sm font-semibold text-[#eef2ff] transition hover:border-[#3a4358]"
          >
            Try preview first
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Paste Job & Resume",
            body: "Copy the job posting URL or text, add your current resume",
            icon: "📋",
          },
          {
            title: "AI Tailors Content",
            body: "Matches skills, keywords, and achievements to the role",
            icon: "✨",
          },
          {
            title: "Download & Apply",
            body: "Get tailored bullets and cover note instantly for $12",
            icon: "🚀",
          },
        ].map(({ title, body, icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-[#1e2638] bg-[#101522]/70 px-5 py-5"
          >
            <div className="mb-2 text-2xl">{icon}</div>
            <p className="text-sm font-semibold text-[#6ee7b7]">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#9aa3b8]">{body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[#1e2638] bg-[#0c1220]/60 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold text-[#eef2ff]">
          Why Tailor Your Resume?
        </h2>
        <div className="space-y-4 text-[#9aa3b8]">
          <p className="leading-relaxed">
            <strong className="text-[#eef2ff]">Stand out from hundreds of applicants.</strong>{" "}
            Recruiters and ATS systems scan for keywords and relevant experience. A tailored 
            resume speaks their language.
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#eef2ff]">Save hours of manual editing.</strong>{" "}
            No more copying job descriptions and rewriting bullet points. ApplyTailor does it 
            in seconds.
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#eef2ff]">One-time payment, no games.</strong>{" "}
            $12 gets you the full tailored output. No monthly fees, no hidden upsells.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#1e2638] bg-[#0c1220]/60 p-6 sm:p-8">
        <h2 className="mb-6 text-2xl font-semibold text-[#eef2ff]">
          Ready to Tailor Your Resume?
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-6 py-3 text-sm font-semibold text-[#041016] shadow-lg shadow-[#6ee7b7]/25 transition hover:shadow-xl hover:shadow-[#6ee7b7]/35"
          >
            Pay $12 & Start Tailoring →
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-6 py-3 text-sm font-semibold text-[#eef2ff] transition hover:border-[#3a4358]"
          >
            See free preview
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#1e2638] pt-6 text-center text-sm text-[#6b7388]">
        <Link href="/" className="hover:text-[#9aa3b8]">
          ApplyTailor
        </Link>{" "}
        · Stripe Checkout · OpenAI-powered tailoring
      </footer>
    </main>
  );
}
