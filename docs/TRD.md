# Technical Requirements Document (TRD)

## Project: European Dining Web Demos (High-End Bistro & Artisan Pizzeria)
**Lead Architect:** Mitul Kabir Badhon  
**Status:** Approved for Implementation  
**Target Environments:** Vercel (Frontend Next.js) + Railway/Render/AWS (Backend Express.js) + Neon (Serverless PostgreSQL)

---

## 1. Architectural Overview & System Design

The project is structured as a decoupled full-stack architecture with a shared type/validation contract:

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Devices                        │
│            (Mobile 4G, Tablet, Desktop, Ultrawide)          │
└──────────────┬──────────────────────────────┬───────────────┘
               │ HTTPS (WebP/AVIF, SSR/SSG)   │ API REST (JSON)
               ▼                              ▼
┌──────────────────────────────┐ ┌─────────────────────────────┐
│      Next.js Frontend        │ │      Express.js Backend      │
│   - App Router (React 19)    │ │   - Node.js Runtime          │
│   - TypeScript Strict        │ │   - TypeScript Strict        │
│   - Tailwind CSS + shadcn/ui │ │   - Zod Validation Layers    │
│   - Framer Motion & Lucide   │ │   - Security & Rate Limiting │
│   - Client-side State/Cache  │ │   - Drizzle ORM Database Ops │
└──────────────┬───────────────┘ └──────────────┬──────────────┘
               │                                │
               └───────────────┬────────────────┘
                               │ Shared Contract
                               ▼
               ┌────────────────────────────────┐
               │    Shared Types & Zod Schemas  │
               │   - Floorplan & Table Schemas  │
               │   - Menu & Dietary Filter DTOs │
               │   - Wine Pairing Specifications│
               │   - Reservation Request / DTO  │
               └────────────────┬───────────────┘
                                │
                                ▼
               ┌────────────────────────────────┐
               │    Neon Serverless Postgres    │
               │   - Instant branching          │
               │   - Connection pooling         │
               │   - Strict relational schemas  │
               └────────────────────────────────┘
```

---

## 2. Technology Stack & Decision Matrix

| Layer | Chosen Technology | Rationale & Performance Benefit |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router)** | Instant server-side rendering for SEO, automatic image optimization (`next/image`), route-level code splitting, sub-1.6s LCP. |
| **Language** | **TypeScript 5.x** | End-to-end type safety between database models, API contracts, and UI components; eliminates runtime undefined errors. |
| **Styling & Components**| **Tailwind CSS + shadcn/ui** | Zero-runtime CSS extraction, fully accessible Radix UI primitives, easily customizable bespoke European luxury theme without AI slop. |
| **Animation & Motion** | **Framer Motion + CSS Vars** | Hardware-accelerated fluid transitions (cubic-bezier easing), 3D card tilt, smooth SVG floorplan seat selection. |
| **Validation Engine** | **Zod 3.x** | Universal schema validation used both client-side for instant input feedback and server-side for payload sanitization. |
| **Backend Runtime** | **Node.js (LTS) + Express.js** | Lightweight, high-throughput REST API server; complete separation of frontend presentation from transactional reservation logic. |
| **Database & ORM** | **Neon Postgres + Drizzle ORM** | Serverless connection pooling with `@neondatabase/serverless`, sub-10ms query execution, zero cold-start penalty, migration stability. |
| **Localization & I18n** | **Next-intl / Custom Context** | Multi-language support (EN, DE, FR, IT) and multi-currency formatter (€, £, CHF). |

---

## 3. Core Component & Engineering Specifications

### 3.1 Live Table & Seat Selector Engine (`TableSelector.tsx`)
- **Rendering Mechanism:** Interactive SVG floorplan with vector coordinates scaled to container viewbox (`0 0 1000 650`).
- **Data Attributes:**
  - Table ID, zone (`terrace`, `main_hall`, `wine_bar`, `chef_counter`), capacity (2, 4, 6, 8+), table shape (`circular`, `rectangular`, `booth`).
- **Interactive State Machine:**
  - `IDLE`: Displays zone layout with ambient soft glows.
  - `HOVER`: Triggers 3D perspective elevation and shows quick tooltip (Table Number, Capacity, Zone).
  - `SELECTED`: Locks selected seat ID into the booking store, highlights matching party size, and triggers reservation drawer transition.
  - `OCCUPIED`: Displays muted tactile state with subtle cross-hatch pattern and next available time slot.

### 3.2 Smart Dietary Matrix & Allergen Filter (`DietaryFilter.tsx`)
- **Query Architecture:** Filter states stored in URL search parameters (`?dietary=vegan,gluten_free&allergen_free=nuts`) enabling shareable menu links and browser history navigation.
- **Client-Side Indexing:** Menu items indexed in memory with bitwise flags or tag arrays for instantaneous sub-millisecond filtering.
- **EU-14 Allergen Tagging:** Every dish mapped to strict European Food Safety Authority allergen definitions.

### 3.3 Sommelier Wine Pairing Engine (`WinePairingModal.tsx`)
- **Relational Mapping:** Dishes linked to wines via a many-to-many relationship with rating scores, recommended serving temperature, and sommelier tasting notes.
- **Interactive Flavor Radar:** SVG Polygon chart rendering 5 core sensory axes:
  - *Acidity* (1–5)
  - *Tannins* (1–5)
  - *Body / Weight* (1–5)
  - *Oak / Wood* (1–5)
  - *Aromatic Intensity* (1–5)

### 3.4 European Localization & Legal Compliance
- **GDPR Consent Module:** Cookie categories (`necessary`, `analytics`, `marketing`) stored in local storage with cryptographic timestamp and versioning.
- **Currency Engine:** Dynamic price conversion using base Euro prices with rounding rules (e.g., €38.00 -> £32.50 / CHF 36.50).
- **Impressum Compliance:** Strictly formatted legal provider identification satisfying § 5 TMG (Germany) and equivalent Swiss/Austrian statutory requirements.

---

## 4. RESTful API Specifications (Backend Service)

Base URL: `/api/v1`

### 4.1 Restaurants & Floorplans
- `GET /restaurants/:slug`: Fetch restaurant metadata, branding colors, and active menus.
- `GET /restaurants/:slug/floorplan`: Fetch SVG floorplan nodes, zones, tables, and real-time seat availability.
- `GET /restaurants/:slug/availability?date=YYYY-MM-DD&time=HH:mm&partySize=N`: Check real-time seat availability across all zones.

### 4.2 Menus & Dietary Filtering
- `GET /restaurants/:slug/menu`: Fetch full menu categorized by sections (Starters, Mains, Desserts, Tasting Menus).
- `GET /restaurants/:slug/menu/filter?dietary=vegan,gluten_free&allergensExclude=nuts`: Fetch filtered items with pre-computed counts.
- `GET /menu-items/:id/wine-pairing`: Fetch sommelier-curated wine and aperitivo pairings for a given dish.

### 4.3 Reservations & Lead Management
- `POST /reservations`: Create a new table reservation.
  - **Body Payload (Zod Validated):**
    ```typescript
    {
      restaurantId: string;
      tableId?: string;
      seatingZone: "terrace" | "main_hall" | "wine_bar" | "chef_counter";
      reservationDate: string; // ISO Date YYYY-MM-DD
      reservationTime: string; // HH:mm
      partySize: number; // 1 - 12
      guestName: string;
      guestEmail: string;
      guestPhone: string;
      dietaryNotes?: string[];
      specialRequests?: string;
      gdprConsentGiven: boolean;
    }
    ```
  - **Response:** `201 Created` with reservation confirmation code and `.ics` calendar payload.

### 4.4 GDPR & Audit
- `POST /compliance/consent`: Log anonymous GDPR consent status and timestamp for legal audit compliance.

---

## 5. Security, Validation & Reliability

1. **Zod Boundary Defense:** All incoming requests are parsed through strict Zod schemas before reaching business logic or database queries.
2. **CORS Configuration:** Explicit origin whitelisting allowing only the verified Next.js production and development URLs.
3. **Rate Limiting:** `express-rate-limit` enforcing max 100 requests per 15-minute window for standard endpoints and max 5 reservation submissions per hour per IP.
4. **Environment Isolation:** Zero credentials checked into Git. All database connection strings, JWT secrets, and API tokens loaded via validated environment variables.
