"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const UNLOCK_KEY = "applytailor_unlocked";
const RESULT_KEY = "applytailor:result";

type TailorResult = {
  mode: "openai" | "demo";
  bullets: string[];
  coverNote: string;
  jobSummary: string;
};

export default function SuccessPage() {
  const [result, setResult] = useState<TailorResult | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
      const raw = sessionStorage.getItem(RESULT_KEY);
      if (raw) setResult(JSON.parse(raw) as TailorResult);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const copyAll = async () => {
    if (!result) return;
    const text = [
      "JOB SUMMARY",
      result.jobSummary,
      "",
      "RESUME BULLETS",
      ...result.bullets.map((b, i) => `${i + 1}. ${b}`),
      "",
      "COVER NOTE",
      result.coverNote,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-16">
      <header className="space-y-3 text-center sm:text-left">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
          Payment received
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#eef2ff] sm:text-4xl">
          Your tailored resume is unlocked
        </h1>
        <p className="text-[#9aa3b8]">
          Copy the bullets and cover note into your application. Thanks for using
          ApplyTailor.
        </p>
      </header>

      {!ready ? (
        <p className="text-sm text-[#9aa3b8]">Loading…</p>
      ) : result ? (
        <section className="space-y-5 rounded-2xl border border-[#1e2638] bg-[#101522]/90 p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider text-[#9aa3b8]">
              {result.mode === "demo" ? "DEMO output" : "AI tailored"}
            </span>
            <button
              type="button"
              onClick={copyAll}
              className="rounded-lg border border-[#1e2638] bg-[#151b2b] px-3 py-1.5 text-sm font-medium text-[#eef2ff] hover:border-[#6ee7b7]/50"
            >
              {copied ? "Copied!" : "Copy all"}
            </button>
          </div>

          <div>
            <h2 className="mb-1 text-sm font-medium text-[#6ee7b7]">Job summary</h2>
            <p className="text-sm leading-relaxed text-[#e8edf8]">{result.jobSummary}</p>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-medium text-[#6ee7b7]">Resume bullets</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#e8edf8]">
              {result.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-1 text-sm font-medium text-[#38bdf8]">Cover note</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#e8edf8]">
              {result.coverNote}
            </p>
          </div>
        </section>
      ) : (
        <section className="space-y-4 rounded-2xl border border-[#1e2638] bg-[#101522]/90 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-[#eef2ff]">No saved preview found</h2>
          <p className="text-sm text-[#9aa3b8]">
            We couldn&apos;t find a tailored result in this browser (session storage
            may have been cleared, or payment opened in another tab). Go back home,
            generate a preview again — it will show unlocked for this session — or
            re-paste your resume and job URL.
          </p>
          <Link
            href="/#tailor"
            className="inline-flex rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-5 py-3 text-sm font-semibold text-[#041016]"
          >
            Back to ApplyTailor
          </Link>
        </section>
      )}

      <Link
        href="/#tailor"
        className="text-center text-sm text-[#9aa3b8] underline-offset-4 hover:underline sm:text-left"
      >
        Tailor another application →
      </Link>
    </main>
  );
}
