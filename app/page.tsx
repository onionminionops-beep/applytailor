import TailorForm from "./components/TailorForm";

const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/test_fZu14g8p3crqg9tf5f9EI00";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
      <header className="space-y-5">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2638] bg-[#101522]/80 px-3 py-1 text-xs font-medium text-[#9aa3b8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
          One-shot resume tailor · $5
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#eef2ff] sm:text-5xl sm:leading-[1.1]">
          Turn a job link into{" "}
          <span className="bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] bg-clip-text text-transparent">
            tailored bullets
          </span>{" "}
          and a short cover note.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[#9aa3b8] sm:text-lg">
          Paste the posting URL and your resume. Get a free blurred preview, then unlock
          the full rewrite for five dollars — no subscription.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#tailor"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-5 py-3 text-sm font-semibold text-[#041016]"
          >
            Tailor my resume — $5
          </a>
          <a
            href={PAYMENT_LINK}
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-5 py-3 text-sm font-semibold text-[#eef2ff]"
          >
            Pay via Stripe link
          </a>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          ["1. Paste", "Job URL + resume text"],
          ["2. Preview", "Blurred bullets free"],
          ["3. Unlock", "$5 one-time Checkout"],
        ].map(([title, body]) => (
          <div
            key={title}
            className="rounded-2xl border border-[#1e2638] bg-[#101522]/70 px-4 py-4"
          >
            <p className="text-sm font-semibold text-[#6ee7b7]">{title}</p>
            <p className="mt-1 text-sm text-[#9aa3b8]">{body}</p>
          </div>
        ))}
      </section>

      <section
        id="tailor"
        className="rounded-2xl border border-[#1e2638] bg-[#0c1220]/60 p-5 sm:p-7"
      >
        <h2 className="mb-6 text-xl font-semibold">Start your tailor</h2>
        <TailorForm />
      </section>

      <footer className="border-t border-[#1e2638] pt-6 text-sm text-[#6b7388]">
        ApplyTailor · sandbox Stripe · demo OpenAI fallback when no API key
      </footer>
    </main>
  );
}
