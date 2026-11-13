# European Dining Web Demos — Client Acquisition Suite

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Neon Database](https://img.shields.io/badge/Database-Neon%20Postgres-00E599?logo=postgresql&logoColor=white)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Validation-Zod-3068b7)](https://zod.dev/)

> **High-performance, bespoke hospitality web architectures engineered to convert cold European dining prospects into high-ticket web development retainers (€5,000 – €25,000+).**

---

## 1. Project Overview & Allocation

- **Owner & Lead Architect:** [MD Mitul Kabir Badhon](https://github.com/mitulkabirbadhon7)
- **Industry Focus:** Restaurant & Dining
- **Demo 1:** **L'Étoile & Terroir** (High-End European Bistro — Paris, France)
- **Demo 2:** **Lievito Madre** (Artisan Sourdough Pizzeria — Naples, Italy)
- **Flagship Interactive Features:**
  1. **Live Interactive Table & Seat Selector** (Vector SVG floorplan engine with real-time zone availability)
  2. **Smart Dietary & Allergen Matrix Filter** (EU-14 compliant instant filtering for vegan, celiac-safe, halal)
  3. **Sommelier Wine Pairing & Sensory Radar Engine** (5-axis SVG flavor radar with vintage cellar notes)
  4. **Multi-Step Frictionless Reservation Drawer** (Zero account-wall booking with .ics calendar integration)

---

## 2. Decoupled Monorepo Architecture

```
european-dining-web-demos/
├── docs/                               # Engineering & Strategy Artifacts
│   ├── PRD.md                          # Product Requirements Document
│   ├── TRD.md                          # Technical Requirements Document
│   ├── UI_UX_DESIGN.md                 # Anti-"AI Slop" Design Guidelines & Color Tokens
│   ├── DATABASE_SCHEMA.md              # Neon Serverless Postgres DDL & Drizzle Models
│   ├── PROJECT_ARCHITECTURE.md         # Full System Architecture Blueprint
│   └── PHASED_IMPLEMENTATION_PLAN.md   # Phased TDD & Quality Assurance Roadmap
├── shared/                             # Universal Contract Package
│   ├── src/types/                      # Strict TypeScript Domain Models
│   └── src/schemas/                    # Zod Schemas for Client & Server Boundaries
├── backend/                            # Express.js REST API Microservice
│   ├── src/db/                         # Neon Serverless Postgres via Drizzle ORM
│   ├── src/middlewares/                # Rate limiters, Zod validators, timing-safe auth guards
│   ├── src/controllers/                # Edge-cached REST route handlers
│   └── tests/                          # Vitest Unit & Integration Test Suites
└── frontend/                           # Next.js 15 App Router Luxury Client
    ├── src/app/                        # Next.js Routes (/bistro, /pizzeria, /impressum, /privacy)
    ├── src/components/floorplan/       # Interactive Vector Floorplan & Seat Legend
    ├── src/components/menu/            # Instant Dietary & Allergen Matrix
    ├── src/components/sommelier/       # Sommelier Wine Pairing & 5-Axis Flavor Radar
    ├── src/components/reservation/     # Multi-Step Tactile Reservation Drawer
    ├── src/components/compliance/      # Granular GDPR Cookie Consent Banner
    └── src/components/actions/         # Mobile Floating Action Triggers (Call, WhatsApp, Maps)
```

---

## 3. Anti-"AI Slop" Design Standards

Clients instantly recognize templated AI websites. This suite strictly adheres to **bespoke European editorial aesthetics**:

1. **Forbidden Palettes:** Zero generic saturated indigo/purple gradients (`#6366f1` to `#a855f7`) and zero cyan glow on `#0f172a`.
2. **Dedicated Bespoke Palettes:**
   - **Bistro Theme:** Warm Espresso (`#2A1E17`), Deep Bordeaux (`#5E1924`), Stone Ivory (`#F7F4EE`), and Butter Yellow (`#F3E5AB`).
   - **Pizzeria Theme:** Hearth Charcoal (`#1C1A18`), Tuscan Terracotta (`#C86D51`), Burnt Amber (`#D9822B`), and Flour Alabaster (`#FAF8F5`).
3. **Typography Rigor:** Optical serif headlines (Playfair Display / Fraunces) paired with geometric UI typography (Plus Jakarta Sans).
4. **Surface Depth:** Subtly layered frosted glass (`backdrop-filter: blur(16px)` with 1px border `rgba(247, 244, 238, 0.12)`) and soft neu-depth tactile seating toggles.

---

## 4. Security & Performance Directives

- **Rate Limiting:** General API limiter (100 req/15min) + strict anti-bot reservation limiter (6 bookings/hour).
- **Zod Defense:** Universal input validation preventing malformed requests or SQL injection.
- **Timing-Safe Auth:** Admin route verification using PBKDF2 with SHA-512 and crypto timing-safe equality.
- **Debug Log Suppression:** All stack traces and debug logs suppressed when `NODE_ENV=production`.
- **Image Optimization:** All assets delivered in WebP/AVIF formats (max file size < 200 KB) with zero Cumulative Layout Shift (CLS = 0.00).
- **Edge Caching:** `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` headers.

---

## 5. Getting Started & Development

### Prerequisites
- Node.js 20+ LTS
- Neon Serverless PostgreSQL database URL

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/mitulkabirbadhon7/European_Dining_Web_Demos.git
cd European_Dining_Web_Demos

# Install dependencies across all workspaces
npm install
```

### 2. Environment Configuration
```bash
cp backend/.env.example backend/.env
# Update DATABASE_URL with your Neon PostgreSQL connection string
```

### 3. Run Backend API
```bash
npm run dev:backend
# API starts on http://localhost:5000
```

### 4. Run Frontend Client
```bash
npm run dev:frontend
# Client starts on http://localhost:3000
```

### 5. Execute Test Suite (TDD)
```bash
npm run test
```

---

## 6. European Localization & Statutory Directives

- **GDPR Cookie Consent:** Granular preference manager with persistent local storage.
- **EU Legal Notices:** § 5 TMG-compliant *Impressum* and GDPR Privacy Policy.
- **Multi-Currency:** Dynamic currency conversion for Euro (€), British Pound (£), and Swiss Franc (CHF).
- **Instant Outreach Triggers:** Floating mobile buttons for Direct Phone, WhatsApp Concierge, and Google Maps Navigation.

---

## 7. License & Credits

Architected and developed by **[MD Mitul Kabir Badhon](https://github.com/mitulkabirbadhon7)** for European SME Client Acquisition.  
Licensed under the [MIT License](LICENSE).
