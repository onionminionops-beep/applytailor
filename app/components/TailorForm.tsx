"use client";

import { useEffect, useMemo, useState } from "react";

type TailorResult = {
  mode: "openai" | "demo";
  bullets: string[];
  coverNote: string;
  jobSummary: string;
};

const UNLOCK_KEY = "applytailor_unlocked";
const RESULT_KEY = "applytailor:result";
const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/dRmaERaHe288a66bvweUU0b";

export default function TailorForm() {
  const [jobUrl, setJobUrl] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TailorResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("canceled") === "1") setCanceled(true);
    }
  }, []);

  const canSubmit = useMemo(
    () => jobUrl.trim().length > 8 && resumeText.trim().length > 40 && !loading,
    [jobUrl, resumeText, loading]
  );

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCanceled(false);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobUrl, resumeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Tailor failed");
      setResult(data as TailorResult);
      try {
        sessionStorage.setItem(RESULT_KEY, JSON.stringify(data));
      } catch {
        /* ignore */
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onUnlock() {
    setPaying(true);
    setError(null);
    if (result) {
      try {
        sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
      } catch {
        /* ignore */
      }
    }
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      window.location.href = data.url || PAYMENT_LINK;
    } catch {
      window.location.href = PAYMENT_LINK;
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onGenerate} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#c7d0e4]">Job posting URL</span>
          <input
            type="url"
            required
            placeholder="https://boards.greenhouse.io/..."
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="w-full rounded-xl border border-[#1e2638] bg-[#0c1220] px-4 py-3 text-[#eef2ff] outline-none ring-[#6ee7b7]/focus:ring-2"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[#c7d0e4]">Paste your resume text</span>
          <textarea
            required
            rows={10}
            placeholder="Paste experience bullets and skills..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full resize-y rounded-xl border border-[#1e2638] bg-[#0c1220] px-4 py-3 text-[#eef2ff] outline-none ring-[#6ee7b7]/focus:ring-2"
          />
        </label>

        {canceled && (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
            Checkout canceled — you can try again whenever you are ready.
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-5 py-3.5 font-semibold text-[#041016] transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {loading ? "Tailoring..." : "Generate free preview"}
        </button>
      </form>

      {result && (
        <section className="overflow-hidden rounded-2xl border border-[#1e2638] bg-[#101522]/80 shadow-xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2638] px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold">Your tailored preview</h2>
              <p className="text-sm text-[#9aa3b8]">
                {result.mode === "demo"
                  ? "DEMO mode (no OPENAI_API_KEY) — sample output"
                  : "Generated with OpenAI"}
              </p>
            </div>
            {!unlocked && (
              <button
                type="button"
                onClick={onUnlock}
                disabled={paying}
                className="rounded-xl bg-[#eef2ff] px-4 py-2.5 text-sm font-semibold text-[#07090f] hover:bg-white"
              >
                {paying ? "Redirecting..." : "Tailor my resume — $12"}
              </button>
            )}
          </div>

          <div className="space-y-4 px-5 py-5">
            <p className="text-sm text-[#9aa3b8]">{result.jobSummary}</p>

            <div className="relative">
              <div
                className={
                  unlocked
                    ? "space-y-4"
                    : "pointer-events-none space-y-4 select-none blur-[6px]"
                }
                aria-hidden={!unlocked}
              >
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#6ee7b7]">
                    Resume bullets
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#e8edf8]">
                    {result.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                    Cover note
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#e8edf8]">
                    {result.coverNote}
                  </p>
                </div>
              </div>

              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#07090f]/35 p-4 backdrop-blur-[1px]">
                  <div className="max-w-sm rounded-2xl border border-[#2a3348] bg-[#0c1220]/95 p-5 text-center shadow-2xl">
                    <p className="mb-1 text-base font-semibold">Unlock full output</p>
                    <p className="mb-4 text-sm text-[#9aa3b8]">
                      One-time $12 unlocks crisp bullets and your cover note for this run.
                    </p>
                    <button
                      type="button"
                      onClick={onUnlock}
                      disabled={paying}
                      className="w-full rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-4 py-3 font-semibold text-[#041016]"
                    >
                      {paying ? "Redirecting..." : "Tailor my resume — $12"}
                    </button>
                    <a
                      href={PAYMENT_LINK}
                      className="mt-3 inline-block text-xs text-[#9aa3b8] underline-offset-2 hover:underline"
                    >
                      Or open Stripe Payment Link
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
