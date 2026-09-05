# ApplyTailor

Paste a job posting URL and your resume text. Get tailored resume bullets plus a short cover note.
Free blurred preview; unlock the full rewrite for $5 via Stripe Checkout.

Public / production uses live Stripe. Sandbox keys and test payment links are only for local or test.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- Stripe Checkout Session (live price + Payment Link fallback)
- OpenAI when OPENAI_API_KEY is set; otherwise labeled DEMO output

## Setup

Clone the GitHub repo onionminionops-beep/applytailor.
Then install packages, copy the env example to .env.local, and start the Next.js dev server.
Open http://localhost:3000

## Environment variables

Use live values for any public deploy.

- STRIPE_SECRET_KEY: live secret. If unset, checkout falls back to the Payment Link.
- STRIPE_PRICE_ID: price_1UCPt37pd3R2ckxORRZN5wdj
- NEXT_PUBLIC_STRIPE_PAYMENT_LINK: https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00
- NEXT_PUBLIC_APP_URL: public site URL for Checkout redirects
- OPENAI_API_KEY: optional. If unset, tailor returns labeled DEMO output

.env.example already has the live Price ID and Payment Link. Replace STRIPE_SECRET_KEY with your live secret before going public.

### Local / test only

For local experiments you may swap in Stripe sandbox keys, a test Price ID, and a test Payment Link. Do not use sandbox defaults on the public site.

## Local run

Install dependencies, copy .env.example to .env.local, then start the Next.js dev server.
Set OPENAI_API_KEY and STRIPE_SECRET_KEY if you want live generation / Checkout Sessions.
Generate a free blurred preview without paying.
Unlock uses a Checkout Session when STRIPE_SECRET_KEY is set, otherwise the live Payment Link.
A production build can be smoke-tested after it compiles.

## Routes

- GET / — landing + tailor flow
- GET /success — post-checkout unlock
- POST /api/tailor — fetch job posting + generate bullets / cover note
- POST /api/checkout — create a Stripe Checkout Session (or Payment Link fallback)

## Deploy (Vercel)

Import onionminionops-beep/applytailor and deploy main.
Set Production env vars: STRIPE_SECRET_KEY (live), STRIPE_PRICE_ID=price_1UCPt37pd3R2ckxORRZN5wdj, NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00, NEXT_PUBLIC_APP_URL (production URL, no trailing slash), OPENAI_API_KEY (required for real non-DEMO tailoring).
Redeploy after saving env vars so NEXT_PUBLIC values bake into the client bundle.
Sandbox Stripe keys belong only on Preview / local — never Production.
