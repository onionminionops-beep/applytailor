import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customize Resume for Job Posting — ApplyTailor ($5)",
  description:
    "Customize your resume to match any job posting perfectly. Paste the posting URL and your resume, get AI-tailored bullets and cover note for $5 — no subscription.",
};

const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00";

export default function CustomizeResumeForJobPostingPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
      <header className="space-y-5">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2638] bg-[#101522]/80 px-3 py-1 text-xs font-medium text-[#9aa3b8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
          AI-powered · $5 one-time · Instant results
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#eef2ff] sm:text-5xl sm:leading-[1.1]">
          Customize Your Resume for{" "}
          <span className="bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] bg-clip-text text-transparent">
            Every Job Posting
          </span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[#9aa3b8] sm:text-lg">
          Make your resume speak directly to hiring managers. Paste any job posting — 
          get custom-tailored bullet points and a short cover note that highlight exactly 
          what they're looking for. One payment, instant results.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-6 py-3 text-sm font-semibold text-[#041016] shadow-lg shadow-[#6ee7b7]/25 transition hover:shadow-xl hover:shadow-[#6ee7b7]/35"
          >
            Customize now — $5 →
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-6 py-3 text-sm font-semibold text-[#eef2ff] transition hover:border-[#3a4358]"
          >
            Free preview available
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Drop Your Content",
            body: "Job posting URL or description, plus your resume text",
            icon: "📄",
          },
          {
            title: "Instant Customization",
            body: "AI rewrites bullets to match skills and keywords",
            icon: "🎯",
          },
          {
            title: "Apply with Confidence",
            body: "Download tailored resume + cover note for $5",
            icon: "💼",
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
          Customization That Works
        </h2>
        <div className="space-y-4 text-[#9aa3b8]">
          <p className="leading-relaxed">
            <strong className="text-[#eef2ff]">Beat the ATS filters.</strong>{" "}
            Applicant tracking systems rank resumes by keyword matches. ApplyTailor ensures 
            your resume includes the terms recruiters are scanning for.
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#eef2ff]">Highlight relevant experience.</strong>{" "}
            Your background is unique — let's make sure the most relevant achievements 
            jump off the page for each specific role.
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#eef2ff]">Transparent pricing.</strong>{" "}
            $5 per job posting. No recurring charges. Get exactly what you pay for.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#1e2638] bg-[#0c1220]/60 p-6 sm:p-8">
        <h2 className="mb-6 text-2xl font-semibold text-[#eef2ff]">
          Start Customizing Your Resume
        </h2>
        <p className="mb-6 text-[#9aa3b8]">
          Land more interviews with a resume that's tailored to each opportunity. 
          It takes seconds to customize, and it could be the difference between getting 
          noticed and getting overlooked.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-6 py-3 text-sm font-semibold text-[#041016] shadow-lg shadow-[#6ee7b7]/25 transition hover:shadow-xl hover:shadow-[#6ee7b7]/35"
          >
            Pay $5 & Customize →
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-6 py-3 text-sm font-semibold text-[#eef2ff] transition hover:border-[#3a4358]"
          >
            Try free preview
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#1e2638] pt-6 text-center text-sm text-[#6b7388]">
        <Link href="/" className="hover:text-[#9aa3b8]">
          ApplyTailor
        </Link>{" "}
        · Secure Stripe payments · AI-powered resume customization
      </footer>
    </main>
  );
}
