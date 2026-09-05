# ApplyTailor

Paste job URL + resume. Tailored bullets + cover note for $5 (Stripe Checkout).

## Live Stripe

- Price: price_1UCPt37pd3R2ckxORRZN5wdj
- Product: prod_VCpY4fKCcP9fLw
- Payment Link: see .env.example NEXT_PUBLIC_STRIPE_PAYMENT_LINK

Sandbox keys only for local tests.

## Vercel env vars

OPENAI_API_KEY, STRIPE_SECRET_KEY, STRIPE_PRICE_ID, NEXT_PUBLIC_STRIPE_PAYMENT_LINK, NEXT_PUBLIC_APP_URL

## Flow

1. Free blurred preview (/api/tailor) stored in sessionStorage
2. Unlock via /api/checkout
3. /success shows full output
