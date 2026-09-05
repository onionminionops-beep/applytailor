import TailorForm from "./components/TailorForm";

const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/dRmaERaHe288a66bvweUU0b";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
      <header className="space-y-5">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2638] bg-[#101522]/80 px-3 py-1 text-xs font-medium text-[#9aa3b8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
          One-shot resume tailor · $12 · No subscription
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
          the full rewrite for twelve dollars — no subscription, no account required.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#tailor"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6ee7b7] to-[#38bdf8] px-5 py-3 text-sm font-semibold text-[#041016] transition hover:opacity-95"
          >
            Tailor my resume — $12
          </a>
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-[#2a3348] bg-[#101522] px-5 py-3 text-sm font-semibold text-[#eef2ff] transition hover:border-[#3a4358]"
          >
            Pay via Stripe link
          </a>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          ["1. Paste", "Job URL + resume text"],
          ["2. Preview", "Free blurred preview"],
          ["3. Unlock", "$12 one-time payment"],
        ].map(([title, body]) => (
          <div
            key={title}
            className="rounded-2xl border border-[#1e2638] bg-[#101522]/70 px-4 py-4 transition hover:border-[#2a3348]"
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
        <h2 className="mb-2 text-xl font-semibold text-[#eef2ff]">
          Start your tailor
        </h2>
        <p className="mb-6 text-sm text-[#9aa3b8]">
          Works with Greenhouse, Lever, Ashby, Workday, and most job boards.
        </p>
        <TailorForm />
      </section>

      <section className="space-y-4 rounded-2xl border border-[#1e2638] bg-[#101522]/40 p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-[#eef2ff]">How it works</h2>
        <div className="space-y-3 text-sm text-[#9aa3b8]">
          <p>
            <span className="font-medium text-[#c7d0e4]">Free preview:</span> See a
            blurred version of your tailored bullets and cover note instantly.
          </p>
          <p>
            <span className="font-medium text-[#c7d0e4]">One-time payment:</span> Pay $12
            once via Stripe Checkout to unlock the full, crisp output.
          </p>
          <p>
            <span className="font-medium text-[#c7d0e4]">Session access:</span> After
            payment, generate as many tailored resumes as you want during your browser
            session.
          </p>
          <p className="text-xs text-[#6b7388]">
            Secure payments powered by Stripe. No subscription. No recurring charges.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#1e2638] pt-6 text-center text-sm text-[#6b7388]">
        <p>ApplyTailor · Secure payments by Stripe</p>
        <p className="mt-2 text-xs">
          {process.env.OPENAI_API_KEY ? "AI-powered generation" : "Demo mode active"}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 opacity-70">
          <a
            href="https://fazier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:opacity-80"
          >
            Listed on Fazier
          </a>
          <a
            href="https://thesaasdir.com/product/applytailor?ref=badge"
            rel="dofollow"
          >
            <img
              src="https://thesaasdir.com/badge/applytailor.svg"
              alt="Featured on TheSaaSDir"
              width={182}
              height={46}
            />
          </a>
        </div>
      </footer>
    </main>
  );
}
