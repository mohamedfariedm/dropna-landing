# Droobna (دروبنا)

Next.js marketing site for Droobna — AR/EN, SSR, SEO, and API-ready CMS queries. Design target: the Framer reference at `navigate-potential-356153.framer.app`.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- `next-intl` (`ar` default RTL, `en` LTR)
- TanStack Query + Axios API client (mock fallback until CMS is live)
- Motion (`motion`) for section animations
- Zod-validated env

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — middleware redirects to `/ar`.

## Routes

| Path | Description |
|---|---|
| `/ar`, `/en` | Home |
| `/[locale]/contact` | Contact + form → `POST /api/contact` |
| `/[locale]/faq` | FAQ (API / mock) |
| `/[locale]/privacy` | Privacy (API / mock) |
| `/[locale]/terms` | Terms (API / mock) |

## Translations

Per-page message files live under `messages/{ar,en}/` (`common`, `home`, `contact`, `faq`, `privacy`, `terms`).

## API

Configure in `.env.local`:

- `NEXT_PUBLIC_API_BASE_URL` + `NEXT_PUBLIC_API_PREFIX`
- Optional `CONTACT_WEBHOOK_URL` / `API_SECRET` for contact forwarding

Until the backend responds, services fall back to `src/lib/api/mocks/*`.
