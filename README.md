# ApplyTailor

Paste a job posting URL and your resume text. Get tailored resume bullets plus a short cover note.
Free blurred preview; unlock the full rewrite for $5 via Stripe Checkout.

**Public / production uses live Stripe.** Sandbox keys and test payment links are only for local or test.

## Stack

- **Next.js 15** App Router + TypeScript
- **Tailwind CSS v4** for styling
- **Stripe Checkout Session** (live price + Payment Link fallback)
- **OpenAI** when `OPENAI_API_KEY` is set; otherwise labeled DEMO output

## Quick Start

```bash
# Clone the repository
git clone https://github.com/onionminionops-beep/applytailor.git
cd applytailor

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your keys (see Environment Variables section)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

### Required for Production

These environment variables **must** be set for the production deployment on Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Your Stripe **live** secret key (starts with `sk_live_` or `rk_live_`). **Required** for Checkout Sessions. If unset, falls back to Payment Link. | `sk_live_51...` |
| `STRIPE_PRICE_ID` | Stripe Price ID for the $5 resume tailor product. | `price_1UCPt37pd3R2ckxORRZN5wdj` |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Fallback Stripe Payment Link URL. | `https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00` |
| `NEXT_PUBLIC_APP_URL` | Your production site URL (no trailing slash). Used for Checkout redirects. | `https://applytailor.vercel.app` |

### Optional

| Variable | Description | Default Behavior |
|----------|-------------|------------------|
| `OPENAI_API_KEY` | OpenAI API key for AI-powered resume tailoring. | If unset, returns labeled **DEMO** output with sample bullets. |

### Environment Variable Notes

- `.env.example` includes the live Price ID and Payment Link. Copy it to `.env.local` and add your `STRIPE_SECRET_KEY`.
- **Never commit `.env.local` to git.** It's already in `.gitignore`.
- For production, set all variables in **Vercel Dashboard → Settings → Environment Variables**.
- After adding `NEXT_PUBLIC_*` variables in Vercel, **redeploy** so they bake into the client bundle.

### Local / Test Only

For local development or testing, you may use:
- Stripe **test mode** keys (`sk_test_*`)
- Test Price ID
- Test Payment Link

**Never use test/sandbox keys on the public production site.**

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Landing page with tailor form |
| `/success` | GET | Post-checkout success page with payment verification |
| `/api/tailor` | POST | Fetch job posting + generate tailored bullets and cover note |
| `/api/checkout` | POST | Create Stripe Checkout Session (or return Payment Link fallback) |
| `/api/verify-session` | GET | Verify Stripe Checkout Session payment status |

## Deploy to Vercel

### Step 1: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import from GitHub: `onionminionops-beep/applytailor`
4. Select the `main` branch
5. Click **Deploy** (it will fail without env vars, but creates the project)

### Step 2: Configure Environment Variables

1. Navigate to **Settings** → **Environment Variables**
2. Add the following variables for **Production**:

```bash
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY_HERE
STRIPE_PRICE_ID=price_1UCPt37pd3R2ckxORRZN5wdj
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00
NEXT_PUBLIC_APP_URL=https://YOUR_DOMAIN_HERE.vercel.app
OPENAI_API_KEY=sk-proj-YOUR_OPENAI_KEY_HERE
```

3. **Replace placeholders:**
   - `sk_live_YOUR_LIVE_SECRET_KEY_HERE` → Your actual Stripe live secret key
   - `YOUR_DOMAIN_HERE.vercel.app` → Your actual Vercel domain
   - `sk-proj-YOUR_OPENAI_KEY_HERE` → Your actual OpenAI API key

4. Click **Save**

### Step 3: Redeploy

After saving environment variables:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy** (or push a new commit)

Your app should now be live with working Stripe Checkout!

### Step 4: Test End-to-End

1. Visit your production URL
2. Paste a job posting URL (e.g., from Greenhouse, Lever, Ashby)
3. Paste your resume text
4. Click **Generate free preview** → should show blurred output
5. Click **Tailor my resume — $5** → should redirect to Stripe Checkout
6. Complete test payment (use Stripe test card: `4242 4242 4242 4242`, any future expiry, any CVC)
7. Should redirect to `/success` with verified payment
8. Return to home and generate again → output should be unblurred

## Project Structure

```
applytailor/
├── app/
│   ├── api/
│   │   ├── checkout/          # Stripe Checkout Session creation
│   │   ├── tailor/            # Resume tailoring endpoint
│   │   └── verify-session/    # Payment verification
│   ├── components/
│   │   └── TailorForm.tsx     # Main form component
│   ├── success/               # Post-payment success page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── lib/
│   ├── extract.ts             # Job posting text extraction
│   └── tailor.ts              # Resume tailoring logic (OpenAI + DEMO)
├── .env.example               # Environment variables template
├── package.json               # Dependencies
└── README.md                  # This file
```

## Stripe Configuration

### Price & Product Setup

The live Stripe Price ID `price_1UCPt37pd3R2ckxORRZN5wdj` should be configured in your Stripe Dashboard:

- **Product Name:** Resume Tailor
- **Price:** $5.00 USD
- **Type:** One-time payment

### Payment Link Fallback

If `STRIPE_SECRET_KEY` is not set or Checkout Session creation fails, the app falls back to the Payment Link:

`https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00`

This ensures users can always pay, even if the API integration has issues.

### Security Best Practices

- Use **Restricted API Keys** (`rk_live_*`) instead of full secret keys when possible
- Set key permissions to only: `Checkout Sessions (write)`, `Checkout Sessions (read)`
- Never expose secret keys in client-side code
- All Stripe operations happen server-side in API routes

## Troubleshooting

### "STRIPE_SECRET_KEY not set" error

**Solution:** Add your Stripe live secret key to environment variables in Vercel or `.env.local`.

### Checkout redirects to Payment Link instead of Stripe Checkout

**Cause:** `STRIPE_SECRET_KEY` is missing or invalid.

**Solution:** Verify your Stripe secret key is set correctly and starts with `sk_live_` or `rk_live_`.

### Success page shows "Verification unavailable"

**Cause:** `STRIPE_SECRET_KEY` is not set, so the app can't verify the session.

**Solution:** This is expected if you're using the Payment Link fallback. The session is still unlocked as a courtesy.

### Resume generation returns DEMO output

**Cause:** `OPENAI_API_KEY` is not set or invalid.

**Solution:** Add a valid OpenAI API key to your environment variables. DEMO mode is intentional for testing without OpenAI.

### Job posting fetch fails

**Cause:** Some job boards block automated requests or require authentication.

**Solution:** The app gracefully handles this by generating tailored content based on the URL and a fallback message. Common supported boards: Greenhouse, Lever, Ashby, Workday, iCIMS, SmartRecruiters, BambooHR, Breezy, Jobvite, Taleo.

### `NEXT_PUBLIC_*` variables not updating

**Cause:** These variables are baked into the client bundle at build time.

**Solution:** After changing `NEXT_PUBLIC_*` variables in Vercel, **redeploy** the application.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT

## Support

For issues, please open a GitHub issue at [onionminionops-beep/applytailor](https://github.com/onionminionops-beep/applytailor/issues).
