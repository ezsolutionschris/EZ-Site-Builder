# EZ Marketing — Site Builder Platform

A Next.js platform for EZ Marketing clients to describe their business and generate AI-drafted website layouts using [Google Stitch](https://github.com/google-labs-code/stitch-sdk). Styled with the EZ stone/amber design system and seeded with real business data from [ezmarketing.com](https://www.ezmarketing.com/) and [ezsolution.com](https://www.ezsolution.com/).

## Quick start

```bash
npm install
cp .env.example .env.local
# Add your STITCH_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `STITCH_API_KEY` | Yes (for generation) | Google Stitch API key — **server only**, never use `NEXT_PUBLIC_` |
| `STITCH_PROJECT_ID` | No | Reuse an existing Stitch project across sessions |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for SEO (`metadataBase`, sitemap). Default: `http://localhost:3000` |

Copy `.env.example` to `.env.local` and fill in values. **Do not commit `.env.local`.**

### Getting a Stitch API key

1. See the [Stitch SDK README](https://github.com/google-labs-code/stitch-sdk) and [Stitch configuration](https://github.com/google-labs-code/stitch-sdk/blob/main/packages/sdk/README.md#configuration).
2. Set `STITCH_API_KEY` in `.env.local`.
3. Restart the dev server after changing env vars.

If `STITCH_API_KEY` is missing, the chat UI still loads but `/api/chat` returns `503` with setup instructions.

## Project structure

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Public homepage with site builder chat |
| `app/api/chat/route.ts` | Server route — calls Stitch SDK |
| `src/lib/stitch/server.ts` | Stitch project/screen generation (server-only) |
| `src/components/builder/` | Chat UI and preview pane |
| `content/sites/ez-marketing/seo.json` | Page title, description, Open Graph, JSON-LD |
| `src/lib/seo/` | Load SEO JSON and build Next.js `Metadata` |
| `src/lib/site.ts` | Brand, contact, nav, and external links |

## SEO

Edit [`content/sites/ez-marketing/seo.json`](content/sites/ez-marketing/seo.json) for meta tags. [`app/layout.tsx`](app/layout.tsx) loads this at build time via `generateMetadata`. [`app/robots.ts`](app/robots.ts) and [`app/sitemap.ts`](app/sitemap.ts) use `NEXT_PUBLIC_SITE_URL`.

## Phase 2 (planned)

- `@cursor/sdk` to refine Stitch drafts into Next.js components in the repo
- Agency `/studio` portal with SEO editor
- Client accounts and rate limiting on `/api/chat`

## Scripts

```bash
npm run dev    # Development
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint
```
