import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paste Job URL & Resume — ApplyTailor ($5)",
  description:
    "Paste any job URL and your resume text — get AI-tailored bullet points and cover note instantly for $5. No subscription, no hassle.",
};

const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00";

export default function PasteJobUrlResumePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
      <header className="space-y-5">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2638] bg-[#101522]/80 px-3 py-1 text-xs font-medium text-[#9aa3b8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
          Simple · Fast · $5 one-time
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#eef2ff] sm:text-5xl sm:leading-[1.1]">
          Paste Job URL &{" "}
          <span className="bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] bg-clip-text text-transparent">
            Resume
          </span>{" "}
          — Get Tailored Output
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[#9aa3b8] sm:text-lg">
          The fastest way to tailor your resume. Just paste the job URL and your resume text. 
          AI matches keywords and achievements — you get polished bullets and a cover note 
          in seconds.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-6 py-3 text-sm font-semibold text-[#041016] shadow-lg shadow-[#6ee7b7]/25 transition hover:shadow-xl hover:shadow-[#6ee7b7]/35"
          >
            Start now — $5 →
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-6 py-3 text-sm font-semibold text-[#eef2ff] transition hover:border-[#3a4358]"
          >
            See preview
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-[#1e2638] bg-[#0c1220]/60 p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold text-[#eef2ff]">
          How It Works
        </h2>
        <ol className="space-y-3 text-[#9aa3b8]">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6ee7b7] text-xs font-bold text-[#041016]">
              1
            </span>
            <span>
              <strong className="text-[#eef2ff]">Paste the job URL or description</strong> — 
              LinkedIn, Indeed, company website, anywhere
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6ee7b7] text-xs font-bold text-[#041016]">
              2
            </span>
            <span>
              <strong className="text-[#eef2ff]">Paste your resume text</strong> — 
              current bullets, skills, work history
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6ee7b7] text-xs font-bold text-[#041016]">
              3
            </span>
            <span>
              <strong className="text-[#eef2ff]">Pay $5 once and download</strong> — 
              get tailored bullets + short cover note instantly
            </span>
          </li>
        </ol>
      </section>

      <section className="rounded-2xl border border-[#1e2638] bg-[#0c1220]/60 p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold text-[#eef2ff]">
          Why ApplyTailor?
        </h2>
        <ul className="space-y-3 text-[#9aa3b8]">
          <li className="flex gap-3">
            <span className="text-[#6ee7b7]">✓</span>
            <span>
              <strong className="text-[#eef2ff]">No subscription.</strong> Pay $5 per job. 
              That's it.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#6ee7b7]">✓</span>
            <span>
              <strong className="text-[#eef2ff]">Instant results.</strong> No waiting. 
              Process completes in under a minute.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#6ee7b7]">✓</span>
            <span>
              <strong className="text-[#eef2ff]">ATS-friendly output.</strong> Keywords and 
              formatting that pass automated screening.
            </span>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-[#1e2638] bg-[#0c1220]/60 p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-[#eef2ff]">
          Ready to Apply?
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-6 py-3 text-sm font-semibold text-[#041016] shadow-lg shadow-[#6ee7b7]/25 transition hover:shadow-xl hover:shadow-[#6ee7b7]/35"
          >
            Pay $5 & Start →
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-6 py-3 text-sm font-semibold text-[#eef2ff] transition hover:border-[#3a4358]"
          >
            Free preview first
          </Link>
        </div>
      </section>
    </main>
  );
}
