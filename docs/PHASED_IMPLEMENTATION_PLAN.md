# Phased Implementation Plan & Engineering Rigor (TDD, Security, Performance)

## Project: European Dining Web Demos (High-End Bistro & Artisan Pizzeria)
**Lead Engineer:** Mitul Kabir Badhon  
**Methodology:** Test-Driven Development (TDD), Phased Milestone Delivery, Defense-in-Depth Security

---

## 1. Phased Delivery Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PHASED EXECUTION ROADMAP                        │
├─────────────────┬─────────────────┬─────────────────┬──────────────────┤
│ Phase 1:        │ Phase 2:        │ Phase 3:        │ Phase 4:         │
│ Architectural   │ Neon Database & │ Backend REST    │ Frontend App     │
│ Foundation &    │ Drizzle ORM     │ Engine + TDD    │ Router + Bespoke │
│ Specifications  │ Data Models     │ (Unit & Int)    │ Design System    │
├─────────────────┼─────────────────┼─────────────────┼──────────────────┤
│ Phase 5:        │ Phase 6:        │ Phase 7:        │ Phase 8:         │
│ Flagship        │ Hardened        │ Performance,    │ Git Ops &        │
│ Interactive     │ Security, Auth, │ Caching, 4G     │ Production       │
│ Feature Suite   │ & Admin Guard   │ & Mobile QA     │ Readiness        │
└─────────────────┴─────────────────┴─────────────────┴──────────────────┘
```

### Phase 1: Architectural Foundation & Specifications (Completed)
- [x] Product Requirements Document (`PRD.md`)
- [x] Technical Requirements Document (`TRD.md`)
- [x] Anti-"AI Slop" Design System & Visual Guidelines (`UI_UX_DESIGN.md`)
- [x] Neon Postgres Schema & Drizzle ORM Definition (`DATABASE_SCHEMA.md`)
- [x] Project Architecture Blueprint (`PROJECT_ARCHITECTURE.md`)
- [x] Agent Rules & Guardrails (`AGENTS.md`)
- [x] Client-safe `.gitignore` protecting confidential outreach & lead data

### Phase 2: Neon Serverless Postgres & Drizzle Schema
- [x] Environment validation with Zod (`backend/src/config/env.ts`)
- [x] Neon serverless connection pool (`backend/src/db/index.ts`)
- [x] Strict relational schema definition with enums, foreign keys, and check constraints (`backend/src/db/schema.ts`)
- [x] Database migration and seed scripts for Bistro and Pizzeria sample datasets

### Phase 3: Backend REST Engine & Test-Driven Development (TDD)
- [x] Shared TypeScript types and Zod schemas (`shared/src/`)
- [x] Universal Zod validation middleware (`backend/src/middlewares/validate.ts`)
- [x] Standardized error handler with production debug-log suppression (`backend/src/middlewares/errorHandler.ts`)
- [x] Rate-limiting middleware for general endpoints and strict anti-abuse for reservations (`backend/src/middlewares/rateLimiter.ts`)
- [x] Admin authentication guard with bcrypt password hashing and timing-safe comparison (`backend/src/middlewares/auth.ts`)
- [x] REST API controllers with `Cache-Control` response headers (`backend/src/controllers/`)
- [x] Unit and Integration test suite using Vitest (`backend/tests/`)

### Phase 4: Frontend Luxury Client & Design Tokens
- [x] Next.js 15 App Router setup with TypeScript strict mode
- [x] Custom Tailwind tokens for Warm Espresso, Deep Bordeaux, Terracotta, and Stone Ivory
- [x] Font optimization: Editorial serif (Fraunces / Playfair Display) paired with Plus Jakarta Sans (`font-display: swap`)
- [x] Mobile-first responsive layouts tested across 360px–430px, tablets (768px), and 4K displays
- [x] ZERO AI / Gemini logos; bespoke artisanal culinary iconography

### Phase 5: Flagship Interactive Feature Suite
- [x] **Interactive SVG Floorplan (`FloorplanViewer.tsx`):** Vector-based seat selection with real-time zone availability and hover micro-interactions
- [x] **Smart Dietary & Allergen Matrix (`DietaryFilterBar.tsx`):** Zero-latency multi-filter covering EU-14 allergens, vegan, celiac-safe, and halal tags
- [x] **Sommelier Wine & Aperitivo Pairing Engine (`WinePairingDrawer.tsx`):** 5-axis flavor radar chart and vintage tasting notes
- [x] **Multi-Step Reservation Drawer (`ReservationDrawer.tsx`):** Seamless slide-out flow with instant Zod feedback and zero-friction guest confirmation

### Phase 6: Hardened Security & Admin Route Protection
- [x] Password hashing using `bcryptjs` (salt rounds: 12)
- [x] JWT-based stateless admin authentication for management endpoints (`/api/v1/admin/*`)
- [x] Suppression of server banners (`helmet({ hidePoweredBy: true })`)
- [x] Strict CORS origin whitelisting
- [x] Environment variable isolation ensuring no database credentials or API secrets leak to the client

### Phase 7: Performance, Caching & Network Optimization
- [x] **Lazy Loading & Code Splitting:** Heavy interactive modules dynamically imported using `next/dynamic` with shimmer skeleton fallbacks
- [x] **Image Compression:** All food and restaurant photography delivered in WebP/AVIF with responsive `srcset` (max file size < 200 KB)
- [x] **API Caching:** Response headers with `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` preventing redundant database queries
- [x] **Slow 4G Network Emulation:** Preloading critical fonts and skeleton loaders guaranteeing zero Cumulative Layout Shift (CLS = 0.00) and LCP < 1.6s

### Phase 8: Git Ops & Client Delivery
- [x] Repository initialization (`git init`)
- [x] Clean staging maintaining client confidentiality through `.gitignore`
- [x] Atomic conventional commits (`feat:`, `docs:`, `chore:`)
- [x] Remote linking to Mitul Kabir Badhon's GitHub profile (`https://github.com/mitulkabirbadhon7/European_Dining_Web_Demos.git`)

---

## 2. Testing Strategy & Quality Assurance Matrix

| Test Level | Scope & Tools | Target Coverage | Verification Command |
| :--- | :--- | :--- | :--- |
| **Unit Tests** | Zod input schemas, currency conversion, dietary filter logic, password hashing (`Vitest`) | 95%+ of business logic | `npm run test:unit` |
| **Integration Tests** | Express route handlers, middleware chaining, rate limit enforcement, Neon DB queries (`Vitest + Supertest`) | 100% of API endpoints | `npm run test:integration` |
| **Component Tests** | Floorplan SVG selection, Wine Radar rendering, Drawer state transitions (`React Testing Library`) | All flagship features | `npm run test:ui` |
| **Lighthouse / Performance** | Mobile and Desktop PageSpeed (LCP, FID/INP, CLS) | 90+ Score on 4G emulation | `npm run test:lighthouse` |
