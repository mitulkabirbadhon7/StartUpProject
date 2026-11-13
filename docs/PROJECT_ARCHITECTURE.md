# Project Architecture & Engineering Blueprint

## Project: European Dining Web Demos (High-End Bistro & Artisan Pizzeria)
**Owner / Lead Engineer:** Mitul Kabir Badhon  
**Status:** Monorepo Decoupled Full-Stack Architecture  
**Strict Visual Directive:** Zero AI logos, zero Gemini logos, bespoke European culinary luxury.

---

## 1. Directory Structure

The project maintains a strict separation between presentation (Next.js frontend), business/persistence logic (Express.js backend), shared validation contracts (`shared/`), and client-safe documentation:

```
d:/Development/StartUp Project/
├── .gitignore                      # Client-safe gitignore filtering confidential prospect/biz data
├── AGENTS.md                       # Comprehensive agent rules & development guardrails
├── GEMINI.md                       # Contextual project configuration
├── README.md                       # Top-level repository overview
├── docs/                           # High-level architecture and specification
│   ├── PRD.md                      # Product Requirements Document
│   ├── TRD.md                      # Technical Requirements Document
│   ├── UI_UX_DESIGN.md             # Anti-AI Slop Design System & Visual Guidelines
│   ├── DATABASE_SCHEMA.md          # Neon Postgres DDL & Drizzle ORM Models
│   └── PROJECT_ARCHITECTURE.md     # System Architecture Blueprint
├── shared/                         # Universal TypeScript models & Zod schemas
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── types/
│       │   ├── restaurant.ts
│       │   ├── floorplan.ts
│       │   ├── menu.ts
│       │   ├── wine.ts
│       │   └── reservation.ts
│       └── schemas/
│           ├── reservation.schema.ts
│           ├── menuFilter.schema.ts
│           └── consent.schema.ts
├── backend/                        # Node.js + Express.js API Service
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── index.ts                # Server entrypoint with CORS, helmet & rate limiting
│       ├── config/
│       │   └── env.ts              # Zod-validated environment config
│       ├── db/
│       │   ├── index.ts            # Neon serverless connection pool
│       │   └── schema.ts           # Drizzle relational schemas
│       ├── controllers/
│       │   ├── restaurant.controller.ts
│       │   ├── floorplan.controller.ts
│       │   ├── menu.controller.ts
│       │   └── reservation.controller.ts
│       ├── middlewares/
│       │   ├── validate.ts         # Generic Zod request validator
│       │   ├── errorHandler.ts     # Standardized JSON error response handler
│       │   └── rateLimiter.ts      # Anti-DDoS and reservation abuse limiter
│       └── routes/
│           ├── index.ts
│           ├── restaurant.routes.ts
│           ├── floorplan.routes.ts
│           ├── menu.routes.ts
│           └── reservation.routes.ts
└── frontend/                       # Next.js 15 (App Router) Luxury Client
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts          # Custom Espresso/Bordeaux & Terracotta design tokens
    ├── next.config.ts
    └── src/
        ├── app/
            ├── layout.tsx          # Root layout with Playfair/Fraunces & Plus Jakarta Sans
            ├── page.tsx            # Flagship Home & Demo Switcher
            ├── bistro/             # Demo 1: L'Étoile & Terroir (High-End Bistro)
            │   └── page.tsx
            ├── pizzeria/           # Demo 2: Lievito Madre (Artisan Sourdough)
            │   └── page.tsx
            ├── impressum/          # Legal German/Austrian Impressum
            │   └── page.tsx
            └── privacy/            # GDPR Privacy Policy
                └── page.tsx
        ├── components/
            ├── ui/                 # Accessible shadcn/ui components
            ├── floorplan/          # Interactive SVG Table & Seat Selector
            │   ├── FloorplanViewer.tsx
            │   ├── TableNode.tsx
            │   └── SeatLegend.tsx
            ├── menu/               # Dynamic Menu with Dietary & Allergen Matrix
            │   ├── MenuCatalog.tsx
            │   ├── DietaryFilterBar.tsx
            │   └── DishCard.tsx
            ├── sommelier/          # Sommelier Wine Pairing Engine
            │   ├── WinePairingDrawer.tsx
            │   └── FlavorRadarChart.tsx
            ├── reservation/        # Multi-Step Reservation Drawer
            │   ├── ReservationDrawer.tsx
            │   └── BookingSummary.tsx
            ├── compliance/         # European GDPR Banner & Currency/Language Switchers
            │   ├── GdprBanner.tsx
            │   ├── CurrencySwitcher.tsx
            │   └── LanguageSwitcher.tsx
            └── actions/            # Floating Action Triggers (Call, WhatsApp, Maps)
                └── FloatingTriggers.tsx
        ├── lib/
        │   ├── utils.ts            # cn() class merge helper
        │   └── api.ts              # Fetch client communicating with Express backend
        └── hooks/
            ├── useCurrency.ts
            └── useFloorplan.ts
```

---

## 2. Data Flow & Communication Patterns

1. **Static Pre-Rendering (SSG/ISR):**
   - General menu items, restaurant backstory, and cellar catalog pre-rendered at build time on the Next.js edge CDN for near-instant (< 1.6s) LCP scores.
2. **Dynamic Live Queries (Client to Express API):**
   - Real-time floorplan table availability checked via `GET /api/v1/restaurants/:slug/availability` with party size and date-time parameters.
3. **Transactional Mutations:**
   - Reservations submitted via `POST /api/v1/reservations` with strict Zod validation ensuring all party constraints, allergen declarations, and GDPR consents are satisfied.
4. **Neon Serverless Edge Pooling:**
   - Express server communicates with Neon PostgreSQL via WebSockets/HTTP pooling with `@neondatabase/serverless`, handling dynamic scaling without connection exhaustion.

---

## 3. Strict Aesthetic & Branding Guardrails

1. **NO AI Branding:** Absolutely no "Powered by AI", robot iconography, Gemini badges, ChatGPT watermarks, or synthetic artifacts anywhere.
2. **Editorial Sensory Immersion:** Photography, typography, micro-animations, and copywriting feel hand-crafted by an award-winning European creative boutique agency.
3. **Cohesive Visual Identity:** Every page, drawer, modal, and tooltip strictly follows the designated color palettes (Warm Espresso, Stone Ivory, Deep Bordeaux, Terracotta, Butter Yellow) and serif/sans typography scales.
