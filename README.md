# AlphaTrack

AlphaTrack is a modern financial SaaS dashboard for investors and analysts. It is inspired by spreadsheet-based finance workflows, but built as a standalone Next.js web app with dashboards, formula previews, screeners, watchlists, templates, subscriptions, and an admin panel.

The app currently uses mock financial data while keeping the data layer structured for future providers such as Financial Modeling Prep, Alpha Vantage, Twelve Data, Polygon.io, or other market data APIs.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn-style reusable UI primitives
- Supabase Auth and PostgreSQL
- Prisma 7 ORM with PostgreSQL adapter
- Recharts
- TanStack Table
- Server Actions
- Stripe checkout and webhook route stubs
- Next.js Cache Components, streaming, ISR, and Partial Prerendering

## Features

- Marketing landing page and pricing page
- Login, signup, and forgot password screens
- Protected dashboard shell
- Stock ticker search
- Company overview and fundamental metrics
- Historical price chart
- Formula Builder with formula-like outputs
- Statement Dump with annual/quarterly toggle and CSV export
- Stock Screener with sortable table
- Watchlist with notes and remove actions
- Templates page
- Settings page
- Admin panel for users, plans, API usage, and supported metrics
- Dark/light mode
- Skeleton loading, error, and not-found states

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_DISABLED=true
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_ELITE_PRICE_ID=
```

Notes:

- `.env*` files are ignored by Git.
- `NEXT_PUBLIC_AUTH_DISABLED=true` keeps the demo dashboard accessible during local mock-data development.
- Supabase direct database URLs may require IPv6 support. If local migrations cannot reach the direct host, use the Supabase pooler connection string for `DATABASE_URL`.

## Prisma

Generate the Prisma client:

```bash
npx prisma generate
```

Apply the schema after `DATABASE_URL` is configured:

```bash
npx prisma db push
```

The schema is defined in:

```text
prisma/schema.prisma
```

It includes models for:

- users
- subscriptions
- watchlists
- saved formulas
- api usage
- templates
- stock notes

## Project Structure

```text
app/
  (auth)/                 Auth routes
  (marketing)/            Marketing routes
  admin/                  Admin panel
  api/                    Stripe route handlers
  dashboard/              Protected app workspace
components/
  charts/                 Recharts components
  dashboard/              Dashboard-specific UI
  marketing/              Marketing UI
  tables/                 TanStack Table wrapper
  ui/                     Shared UI primitives
lib/
  actions/                Server Actions
  supabase/               Supabase server helper
  financial-constants.ts  Client-safe mock constants
  mock-financial-data.ts  Cached server data provider
prisma/
  schema.prisma           PostgreSQL schema
```

## Rendering Notes

Next.js Cache Components are enabled in `next.config.ts`.

The stock detail route uses cached server data and static params, and the production build reports it as Partial Prerendered:

```text
/dashboard/stocks/[ticker]
```

Mock provider functions use cache tags and cache lifetimes so real API integrations can later support revalidation and usage tracking.

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Verification

The app has been verified with:

```bash
npm run build
npm run lint
```

ESLint currently reports a React Compiler warning for TanStack Table's `useReactTable` API. This is expected for that library integration and does not block the build.
