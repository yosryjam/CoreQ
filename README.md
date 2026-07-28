# CoreQ — Enterprise Anesthesia Operations Platform

Herzliya Medical Center · Anesthesia Department operations, equipment, readiness and quality.

Frontend scaffold. Enterprise-medical design language (hospital blue / white / gray),
Hebrew-first RTL, clean architecture separation. No auth, no database yet — the data
layer is a mock stand-in ready to be swapped for the NestJS + PostgreSQL API.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (token-based design system) |
| Icons | lucide-react |
| Font | Heebo (bundled at build via `next/font` — no runtime Google calls) |

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /operations
npm run build    # production build (all routes prerender)
npm run typecheck
```

> `npm run build` fetches the Heebo font once at build time and self-hosts it.
> The build machine needs outbound access to fonts.googleapis.com; clients never do.

## Architecture

Clean-architecture separation, pragmatic for a Next.js front end:

```
src/
  app/                     Presentation — routes only
    layout.tsx             Root: RTL, lang="he", Heebo font
    page.tsx               Redirect → /operations
    (app)/
      layout.tsx           App shell: Sidebar + TopBar + content region
      operations/          14 module pages, one folder each
      machines/  equipment/  machine-check/  schedule/
      rooms/     faults/     readiness/       kpi/
      audit/     documents/  reports/         notifications/
      administration/
  components/
    ui/                    Design system (Card, Button, Badge, StatCard,
                           ProgressBar, DataTable, PageHeader, EmptyState…)
    layout/                Sidebar, TopBar
  config/
    navigation.ts          Single source of truth for nav + page titles
  domain/
    types.ts               Entities / value types — pure, framework-free
  data/
    mock.ts                Infrastructure stand-in (demo data)
  lib/
    cn.ts                  className merge helper
    status.ts              Status → { label, tone } mappings (Hebrew)
  app/globals.css          Design tokens (@theme) + base styles
```

### Where the real backend plugs in

`src/data/mock.ts` is the only place that fabricates data. Replace it with a
repository layer that calls the NestJS API (or server actions / route handlers).
Domain types in `src/domain` are already the contract; pages consume typed data
and never assume a data source — so the swap is isolated.

## Design system

Tokens live in `src/app/globals.css` under `@theme`. Semantic color roles
(`primary`, `surface`, `fg`, `fg-muted`, `border`, `success`, `warning`,
`danger`, `info`, `neutral`) drive every component, so a theme change is a
token change. Radius, elevation and typography are tokenized too.

Status is expressed through a single `StatusTone` union mapped once in
`src/lib/status.ts` — add a status in one place and every table/badge follows.

## The 14 modules

1. Daily Operations · 2. Anesthesia Machines · 3. Medical Equipment ·
4. Daily Machine Check · 5. Work Schedule · 6. Operating Rooms ·
7. Fault Management · 8. Mission Readiness · 9. KPI Center ·
10. Audit & Accreditation · 11. Document Center · 12. Reports ·
13. Notifications · 14. Administration

## Not included yet (by design)

Authentication (OIDC / Azure AD / hospital SSO), the NestJS backend, PostgreSQL,
Docker/Kubernetes manifests, English localization (structure is ready — labels
carry an `en` field in `navigation.ts`). Each is a clean next step on top of this
scaffold.

## Evaluation extension added

- Demo login inspired by the supplied HMC login reference
- Demo users: `yusrij` and `yurik`
- Demo password: `123456`
- Both users are displayed as `ADMIN`
- New route: `/staff-records`
- Interactive physician onboarding route: `/staff-records/physician-demo`
- Feedback and checkbox changes are stored only in the current browser using localStorage
- New route: `/platform` showing stages 2–7
- PostgreSQL architecture foundation: `infrastructure/docker-compose.postgres.yml`
- Initial schema: `database/001_staff_records.sql`

### Security warning
The login is an evaluation-only implementation with fixed demo credentials. It must be removed and replaced with Azure AD/OIDC before production use. The demo stores no real employee data and should not be used for real certificates, medical information or HR documents.
