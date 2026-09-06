"use client";

import PurchaseTracker from "@/app/components/PurchaseTracker";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const UNLOCK_KEY = "applytailor_unlocked";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verifying, setVerifying] = useState(!!sessionId);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const markUnlocked = () => {
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    if (!sessionId) {
      markUnlocked();
      setVerifying(false);
      return;
    }

    let mounted = true;

    async function verifySession() {
      try {
        const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
        if (!mounted) return;

        if (res.ok) {
          const data = await res.json();
          if (data.paid) {
            setVerified(true);
            markUnlocked();
          } else {
            setError("Payment not confirmed. Please contact support.");
          }
        } else {
          const data = await res.json().catch(() => ({}));
          setError(
            data.error ||
              "Unable to verify payment. Your session is unlocked as a courtesy."
          );
          markUnlocked();
        }
      } catch (err) {
        if (!mounted) return;
        console.error("Session verification failed", err);
        setError("Verification unavailable. Your session is unlocked as a courtesy.");
        markUnlocked();
      } finally {
        if (mounted) setVerifying(false);
      }
    }

    verifySession();

    return () => {
      mounted = false;
    };
  }, [sessionId]);

  return (
    <>
      <PurchaseTracker product="ApplyTailor" />
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center gap-6 px-4 py-16">
      <div className="rounded-2xl border border-[#1e2638] bg-[#101522]/90 p-8 text-center shadow-xl">
        {verifying ? (
          <>
            <div className="mb-4 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6ee7b7] border-t-transparent" />
            </div>
            <h1 className="text-xl font-semibold text-[#eef2ff]">
              Verifying payment...
            </h1>
            <p className="mt-2 text-sm text-[#9aa3b8]">
              This should only take a moment.
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6ee7b7]/20">
                <svg
                  className="h-6 w-6 text-[#6ee7b7]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <p className="mb-2 text-sm font-medium text-[#6ee7b7]">
              {verified ? "Payment verified" : "Payment received"}
            </p>
            <h1 className="text-2xl font-semibold text-[#eef2ff]">You are unlocked</h1>
            {error ? (
              <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <p className="text-sm text-amber-100">{error}</p>
              </div>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-[#9aa3b8]">
                Thanks for supporting ApplyTailor. Head back home and generate again —
                your preview will show in the clear for this browser session.
              </p>
            )}
            <Link
              href="/#tailor"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-5 py-3 text-sm font-semibold text-[#041016] transition hover:opacity-95"
            >
              Back to tailor
            </Link>
          </>
        )}
      </div>

      {sessionId && !verifying && (
        <p className="text-center text-xs text-[#6b7388]">
          Session ID: {sessionId.slice(0, 20)}...
        </p>
      )}
    </main>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center gap-6 px-4 py-16">
          <div className="rounded-2xl border border-[#1e2638] bg-[#101522]/90 p-8 text-center shadow-xl">
            <div className="mb-4 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6ee7b7] border-t-transparent" />
            </div>
            <h1 className="text-xl font-semibold text-[#eef2ff]">Loading...</h1>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}