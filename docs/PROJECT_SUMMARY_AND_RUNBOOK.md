# European Gastronomy Web Demos — Project Summary & Operational Runbook

**Project:** European Dining Client Acquisition Web Demos  
**Owner & Lead Engineer:** Mitul Kabir Badhon  
**Repository:** [https://github.com/mitulkabirbadhon7/StartUpProject.git](https://github.com/mitulkabirbadhon7/StartUpProject.git)  
**Target Profile:** [https://github.com/mitulkabirbadhon7](https://github.com/mitulkabirbadhon7)  
**Version:** 1.0.0 (Production-Ready Release)  
**Date:** November 2026

---

## 1. Executive Summary

The European Gastronomy Web Demos suite is a pair of bespoke, production-grade web applications crafted for top-tier European gastronomy establishments:
1. **L'Étoile & Terroir** — A Michelin-caliber French Alpine Fine Dining Bistro in Paris (1er Arrondissement).
2. **Lievito Madre** — A 48-hour slow-fermentation Neapolitan Artisan Pizzeria in Naples (Via dei Tribunali).

These applications were conceived, architected, and engineered to replace generic, low-effort "AI slop" templates with an authentic, handcrafted editorial aesthetic and flawless technical execution. Designed specifically for high-conversion European client acquisition, the suite addresses real operational pain points of independent European restaurateurs: eliminating third-party commission overhead, complying with stringent European privacy regulations (GDPR / ePrivacy), preventing allergen liability under EU Directive 1169/2011, and elevating beverage ticket sales through an interactive sommelier engine.

---

## 2. Monorepo Architecture & Tech Stack

The repository utilizes an npm workspaces monorepo architecture with clean separation of concerns:

```
StartUp Project/
├── frontend/                     # Next.js 15 App Router, React 19, Tailwind CSS
│   ├── src/
│   │   ├── app/
│   │   │   ├── bistro/           # L'Étoile & Terroir Dedicated Demo
│   │   │   ├── pizzeria/         # Lievito Madre Dedicated Demo
│   │   │   ├── impressum/        # Legal Notice (German/Austrian § 5 TMG Compliant)
│   │   │   ├── privacy/          # GDPR & Cookie Policy Page
│   │   │   ├── globals.css       # Gastronomy glassmorphism, luxury easing
│   │   │   ├── layout.tsx        # Root layout with fonts & persistent GDPR banner
│   │   │   └── page.tsx          # Dual-Demo Executive Presentation Portal
│   │   ├── components/
│   │   │   ├── actions/          # Floating mobile call/WhatsApp/Maps triggers
│   │   │   ├── compliance/       # GDPR granular consent banner
│   │   │   ├── floorplan/        # Interactive SVG floorplan with seat selector
│   │   │   ├── menu/             # EU-14 dietary/allergen matrix filter
│   │   │   ├── reservation/      # 3-step tactile reservation drawer & .ics generator
│   │   │   └── sommelier/        # Sommelier wine pairing drawer & 5-axis flavor radar
│   │   └── lib/                  # Currency formatting & Tailwind utils
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── backend/                      # Express.js REST API with Neon Serverless Postgres
│   ├── src/
│   │   ├── config/               # Zod-validated environment configurations
│   │   ├── controllers/          # Restaurant, floorplan, menu, and reservation controllers
│   │   ├── db/                   # Neon connection & Drizzle ORM schema definitions
│   │   ├── middlewares/          # Auth, rateLimiter, errorHandler, Zod validators
│   │   ├── routes/               # Modular Express v1 routing
│   │   └── index.ts              # Express application entry & server listener
│   ├── tests/
│   │   ├── unit/                 # Vitest Zod schema & crypto auth unit tests
│   │   └── integration/          # Vitest & Supertest API endpoint tests
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── shared/                       # Shared TypeScript interfaces & Zod validation schemas
│   ├── src/
│   │   ├── schemas/              # Reservation, menu filter, and restaurant schemas
│   │   ├── types/                # Core domain types & DTO definitions
│   │   └── index.ts              # Unified entry point
│   ├── package.json
│   └── tsconfig.json
├── docs/                         # Specifications, architecture, schema, and runbooks
├── package.json                  # Monorepo workspaces manifest
└── README.md                     # Project documentation & presentation
```

### Core Technologies
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Framer Motion.
- **Backend:** Node.js, Express.js, TypeScript, Drizzle ORM, `@neondatabase/serverless` (Postgres driver), Helmet, CORS, `express-rate-limit`.
- **Validation:** Zod 3.24 for unified schema validation across frontend and backend boundaries.
- **Testing:** Vitest 3, Supertest.

---

## 3. Design System & Visual Identity

### 3.1 Strict Anti-AI Directive
- **Zero AI Artifacts:** No robot icons, AI badges, OpenAI sparks, or synthetic branding.
- **Zero AI Slop:** No saturated purple/indigo gradients (`#6366f1` to `#a855f7`) or dark slate cyan glows (`#0f172a`).
- **Artisanal European Typography:** Editorial serifs (Playfair Display / Fraunces) paired with geometric grotesks (Plus Jakarta Sans / Inter).
- **Physical Depth:** Custom glassmorphism (`backdrop-filter: blur(16px)`), tactile neu-depth button states, and warm candlelit ambient tones.
- **Micro-Interactions:** Bespoke luxury easing curve `cubic-bezier(0.16, 1, 0.3, 1)`.

### 3.2 Color Palettes
| Theme | Element | Hex Code | Purpose |
|---|---|---|---|
| **Bistro** | Warm Espresso | `#2A1E17` / `#1A130E` | Background & dark card surfaces |
| | Stone Ivory | `#F7F4EE` | Text headings & primary accents |
| | Deep Bordeaux | `#5E1924` | Primary brand accent & active states |
| | Butter Yellow | `#F3E5AB` | Badges, highlighted borders, table pins |
| | Terracotta | `#C86D51` | Subtle warmth & secondary highlights |
| **Pizzeria** | Hearth Charcoal | `#1C1A18` / `#121110` | Dark oven-inspired backgrounds |
| | Tuscan Terracotta | `#C86D51` | Primary brand accent & callouts |
| | Burnt Amber | `#D9822B` | Flame highlights & wood-fire badges |
| | Flour Alabaster | `#FAF8F5` | Contrast text & crisp details |
| | Olive Sage | `#6E7B62` | Botanical highlights & herbs |

---

## 4. Flagship Interactive Features

### 4.1 Interactive SVG Floorplan & Table Selector
- **Component:** `FloorplanViewer.tsx`
- **Capabilities:**
  - Scalable vector rendering of distinct restaurant zones: Heated Terrace, Grand Dining Hall, Sommelier Wine Vault, and Chef's Counter.
  - Real-time availability states (Available / Reserved / Selected) with capacity indicators (2-top, 4-top, 6-top, booth, counter bar).
  - Zone ambient metadata displays (e.g., soundscape notes, lighting description).
  - Direct binding to the reservation workflow: clicking a table pre-populates the booking drawer with table ID, capacity, and zone.

### 4.2 EU-14 Compliant Dietary & Allergen Filtering Matrix
- **Component:** `DietaryFilterBar.tsx`
- **Capabilities:**
  - Immediate client-side and server-side filtering across standard European dietary profiles: Vegan, Vegetarian, Gluten-Free, Dairy-Free, Halal, Nut-Free, Shellfish-Free.
  - EU Directive 1169/2011 allergen exclusion filtering.
  - Dynamic matching count indicator showing active courses matching the guest's criteria.

### 4.3 Sommelier Wine & Aperitivo Pairing Engine
- **Component:** `WinePairingDrawer.tsx`
- **Capabilities:**
  - One-tap sommelier drawer for every culinary creation.
  - Displays vintage, appellation, region, glass and bottle pricing in multi-currency.
  - **SVG 5-Axis Radar Chart:** Plots Acidity, Tannins, Body, Oak, and Intensity on a normalized 5.0 scale with translucent Bordeaux/Terracotta fills.
  - Sommelier tasting notes and recommended serving temperature (°C).

### 4.4 European Reservation Drawer & iCalendar Sync
- **Component:** `ReservationDrawer.tsx`
- **Capabilities:**
  - 3-step structured booking funnel: Date & Time Selection → Zone & Table Selection → Guest Contact & Dietary Notes.
  - Mandatory GDPR consent checkbox with direct hyperlink to privacy policy.
  - Generates confirmation code (e.g., `ET-4T-A9B2`) and exports an RFC 5545 compliant `.ics` calendar file for immediate synchronization with Apple Calendar, Google Calendar, and Outlook.

### 4.5 European Compliance & Direct Action Controls
- **GDPR Banner (`GdprBanner.tsx`):** Persistent cookie consent banner with granular settings (Strictly Necessary, Analytics, Marketing), storing consent with 1-year expiration in `localStorage`.
- **Legal Notice (`/impressum`):** Complete Impressum compliant with German § 5 TMG and Austrian ECG.
- **Privacy Policy (`/privacy`):** Transparent disclosure of data handling, retention periods, and guest GDPR rights (Articles 15-21).
- **Multi-Currency:** Instant toggle across Euro (€ EUR), British Pound (£ GBP), and Swiss Franc (CHF) using accurate conversion multipliers.
- **Instant Mobile Triggers (`FloatingTriggers.tsx`):** Sticky mobile action dock providing one-touch phone calling, direct WhatsApp concierge messaging, and turn-by-turn navigation via Google Maps.

---

## 5. API Reference & Backend Routing

Base URL: `http://localhost:5000/api/v1` (or production URL)

### 5.1 Health Check
- **Route:** `GET /health`
- **Response:**
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-11-13T12:00:00.000Z",
    "service": "European Dining Demos API",
    "version": "1.0.0"
  }
  ```

### 5.2 Restaurant Details
- **Route:** `GET /api/v1/restaurants/:slug`
- **Supported Slugs:** `letoile-terroir`, `lievito-madre`
- **Caching:** `Cache-Control: public, s-maxage=120, stale-while-revalidate=600`

### 5.3 Floorplan Layout
- **Route:** `GET /api/v1/floorplans/:slug`
- **Response:** Returns SVG viewBox coordinates, zones array, and table capacity matrix.

### 5.4 Menu & Pairings
- **Route:** `GET /api/v1/menu` or `GET /api/v1/menu/items`
- **Query Parameters:**
  - `dietary`: comma-separated filters (`vegan,vegetarian,gluten_free,dairy_free,halal`)
  - `allergensExclude`: comma-separated allergen exclusions (`fish,nuts,gluten,eggs,milk`)
  - `isSeasonalOnly`: `true` | `false`
- **Route:** `GET /api/v1/menu/:dishId/wine-pairing`
- **Response:** Detailed wine pairing metadata and 5-axis radar coordinates.

### 5.5 Table Reservation
- **Route:** `POST /api/v1/reservations`
- **Validation:** Zod `ReservationCreateSchema`
- **Payload:**
  ```json
  {
    "restaurantId": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "tableId": "tbl-t1",
    "seatingZone": "terrace",
    "reservationDate": "2026-12-25",
    "reservationTime": "19:30",
    "partySize": 2,
    "guestName": "Eleanor Vance",
    "guestEmail": "eleanor@example.com",
    "guestPhone": "+33612345678",
    "dietaryNotes": "No shellfish",
    "gdprConsentGiven": true
  }
  ```
- **Response:** `201 Created` with unique confirmation code and `calendarPayload` (.ics).

---

## 6. Verification & Test Suite

The project includes unit and integration test suites executed with Vitest:

| Test File | Category | Focus Areas | Status |
|---|---|---|---|
| `backend/tests/unit/validation.test.ts` | Unit | Zod schema validation for European reservation formats, UUID verification, party size boundaries (1-20), seating zone constraints, GDPR consent enforcement, 24h time formatting, query parameter validation, GDPR cookie consent schemas, and timing-safe cryptographic password verification | **PASSED** (10 tests) |
| `backend/tests/integration/api.test.ts` | Integration | Express server health check, restaurant details with valid UUIDs, 404 error handling, floorplan data retrieval for both bistro & pizzeria, 404 for unknown floorplans, menu dietary filters, EU allergen exclusion, seasonality filters, query parameter validation (rejecting unsupported currencies), 5-axis sommelier wine pairing lookup, pairing 404 handling, valid reservations with localized `.ics` payloads (Paris/Naples), rejection of invalid GDPR consent, party size limits, and structured JSON 404 fallback | **PASSED** (20 tests) |

**Total Test Result:** 30 tests passing across 2 test suites.  
**Build Result:** Next.js 15, Backend, and Shared packages compile with zero errors (8 static routes generated).

---

## 7. Operational Runbook

### 7.1 Prerequisites
- Node.js 18.x or 20.x or 22.x LTS
- npm 9.x or higher
- Git 2.30 or higher
- Optional: Neon PostgreSQL account for live database persistence

### 7.2 Local Development Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/mitulkabirbadhon7/StartUpProject.git
   cd StartUpProject
   ```

2. **Install all workspace dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy `backend/.env.example` to `backend/.env`:
     ```bash
     cp backend/.env.example backend/.env
     ```
   - Update `DATABASE_URL` with your Neon PostgreSQL connection string.

4. **Build the shared TypeScript package:**
   ```bash
   npm run build --workspace=shared
   ```

5. **Run Test Suites:**
   ```bash
   npm test
   ```

6. **Start Development Servers:**
   - Start backend (Express on port 5000):
     ```bash
     npm run dev:backend
     ```
   - In a second terminal, start frontend (Next.js on port 3000):
     ```bash
     npm run dev:frontend
     ```
   - Open browser at `http://localhost:3000` to access the master presentation portal.

### 7.3 Production Build & Deployment

#### Full Monorepo Build Command
```bash
npm run build
```
This executes sequential TypeScript compilation:
1. `npm run build --workspace=shared`
2. `npm run build --workspace=backend`
3. `npm run build --workspace=frontend`

#### Frontend Deployment (Vercel)
- **Root Directory:** `frontend`
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Environment Variables:**
  - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g., `https://api.yourdomain.com`)

#### Backend Deployment (Railway / Render / Fly.io)
- **Root Directory:** `backend`
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `PORT`: `5000`
  - `NODE_ENV`: `production`
  - `FRONTEND_URL`: Your production frontend domain
  - `DATABASE_URL`: Neon PostgreSQL connection string with SSL mode enabled (`?sslmode=require`)
  - `RATE_LIMIT_WINDOW_MS`: `900000` (15 minutes)
  - `RATE_LIMIT_MAX_REQUESTS`: `100`

---

## 8. Client Confidentiality & Git Security

In accordance with strict security standards:
- All sensitive credentials (`.env`, `.env.*`, `*.pem`, `*.key`) are locked in `.gitignore`.
- All client acquisition lead lists, prospect spreadsheets, Google Maps scrape dumps, and sales commission notes are explicitly ignored and quarantined from public git tracking.
- Zero AI / Gemini logos or synthetic watermarks exist in user-facing code or documentation.

---

**Lead Engineer & Author:**  
Mitul Kabir Badhon  
[https://github.com/mitulkabirbadhon7](https://github.com/mitulkabirbadhon7)  
Email: [mitulkabirbadhon7@gmail.com](mailto:mitulkabirbadhon7@gmail.com)
