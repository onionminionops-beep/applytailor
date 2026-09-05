"use client";

import { useEffect } from "react";
import Link from "next/link";

const UNLOCK_KEY = "applytailor_unlocked";

export default function SuccessPage() {
  useEffect(() => {
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center gap-6 px-4 py-16">
      <div className="rounded-2xl border border-[#1e2638] bg-[#101522]/90 p-8 text-center shadow-xl">
        <p className="mb-2 text-sm font-medium text-[#6ee7b7]">Payment received</p>
        <h1 className="text-2xl font-semibold text-[#eef2ff]">You are unlocked</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#9aa3b8]">
          Thanks for supporting ApplyTailor. Head back home and generate again — your
          preview will show in the clear for this browser session.
        </p>
        <Link
          href="/#tailor"
          className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-5 py-3 text-sm font-semibold text-[#041016]"
        >
          Back to tailor
        </Link>
      </div>
    </main>
  );
}
