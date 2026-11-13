# Product Requirements Document (PRD)

## Project: European Client Acquisition — Web Demos (Restaurant & Dining Suite)
**Lead Engineer / Product Owner:** Mitul Kabir Badhon  
**Target Market:** European SMEs (High-End Dining, Michelin-Guide Contenders, Artisan Bistros, Neapolitan/Sourdough Pizzerias in Paris, Rome, Berlin, Vienna, Zurich, London)  
**Primary Business Objective:** Deliver two ultra-polished, visually stunning, high-performance web applications that convert cold European hospitality prospects into high-ticket web design and development retainers (€5,000 – €25,000+ contracts).

---

## 1. Executive Summary & Problem Statement

### 1.1 The Market Opportunity
European independent restaurateurs and artisanal dining establishments frequently suffer from three major digital shortcomings:
1. **Third-Party Commission Drain:** Over-reliance on third-party aggregators (OpenTable, TheFork, Deliveroo) which charge 2% to 15% per reservation or order, diluting restaurant margins and taking ownership of customer data.
2. **Outdated, Static Websites:** Slow, non-responsive websites built on bloated WordPress themes or generic template builders that fail to convey the sensory prestige of dining at their venue.
3. **Generic "AI Slop" Vulnerability:** Low-effort competitors spamming restaurateurs with templated, cookie-cutter AI websites with indigo/cyan gradients and robotic copy that fail European aesthetic standards.

### 1.2 The Solution
A flagship two-in-one demo suite tailored specifically for:
- **Demo 1: L'Étoile & Terroir (High-End European Bistro)** — Fine dining, seasonal tasting menus, sommelier curation, and exclusive booth reservations.
- **Demo 2: Lievito Madre (Artisan Sourdough Pizzeria)** — Organic sourdough fermentation storytelling, rustic wood-fired craft, custom dietary filtering, and vibrant aperitivo pairings.

Equipped with three proprietary interactive modules:
- **Live Interactive Table & Seat Selector (Floorplan Engine)**
- **Smart Dietary & Allergen Matrix Filter**
- **Sommelier Interactive Wine & Aperitivo Pairing Engine**

---

## 2. Target Personas

### 2.1 The European Restaurateur / Owner (Buyer Persona)
- **Profile:** Propriétaire or Managing Director of an independent high-end bistro in Munich, Milan, Bordeaux, or Zurich.
- **Pain Points:** Loses €1,200+/month in aggregator commissions; frustrated by no-shows; website looks 10 years old; mobile users bounce immediately.
- **Psychographic Triggers:** Prestige, sensory elegance, bespoke craft, European compliance (GDPR/Impressum), zero technical headaches.

### 2.2 The Discerning Diner (End-User Persona)
- **Profile:** Affluent local resident, international traveler, or food enthusiast seeking an unforgettable dining experience.
- **Key Needs:** Instant verification of atmosphere; clear visibility of allergen/dietary options (celiac, vegan, lactose-free); ability to request specific seats (terrace, window, chef's counter); seamless mobile booking without forced account creation.

---

## 3. Product Scope & Functional Modules

### 3.1 Demo 1: High-End European Bistro ("L'Étoile & Terroir")
- **Atmospheric Visual Identity:** Warm espresso (`#2A1E17`), stone ivory (`#F7F4EE`), deep Bordeaux wine (`#5E1924`), and subtle brushed brass accents.
- **Bespoke Storytelling:** Chef’s seasonal manifesto, farm-to-table provenance map across French, Italian, and Austrian terroir.
- **Tasting Menu Showcase:** Multi-course sensory exploration with interactive courses and pairing suggestions.

### 3.2 Demo 2: Artisan Sourdough Pizzeria ("Lievito Madre")
- **Atmospheric Visual Identity:** Terracotta clay (`#C86D51`), warm flour ivory (`#FAF7F2`), butter yellow (`#F3E5AB`), and charred wood charcoal (`#221F1F`).
- **48-Hour Fermentation Visualizer:** Interactive timeline illustrating the sourdough hydration, proofing, and Neapolitan wood-fired blister technique (450°C for 90 seconds).
- **Artisan Pizza Catalog:** Dynamic selection featuring organic D.O.P. ingredients (San Marzano, Mozzarella di Bufala Campana, 24-month Parmigiano-Reggiano).

### 3.3 Core Flagship Feature 1: Live Interactive Table & Seat Selector
- **Interactive SVG Floorplan:** Dynamic restaurant zoning (Terrace / Courtyard, Main Dining Hall, Sommelier Wine Bar, Private Chef's Counter).
- **Table Capacities:** 2-top, 4-top, 6-top, and 8+ banquet booths.
- **Real-Time Availability States:**
  - *Available* (Subtle warm highlight, selectable)
  - *Reserved / Occupied* (Muted, tactile disabled state with next available timeslot tooltip)
  - *Selected* (Gold/brass glowing border with ambient elevation)
- **Tactile Seating Preferences:** Window view, romantic quiet corner, outdoor heater, or direct kitchen pass view.

### 3.4 Core Flagship Feature 2: Smart Dietary & Allergen Filter
- **Multi-select Dietary Matrix:**
  - Vegan (Plant-based, cruelty-free)
  - Vegetarian (Ovo-lacto)
  - Gluten-Free / Celiac-Safe (Dedicated prep kitchen verification badge)
  - Nut-Free / Peanut-Free
  - Dairy-Free / Lactose-Free
  - Halal / Kosher compliant tags
- **Dynamic Instant Filtering:** Zero-latency client-side filtering powered by Zod-validated data sets with count indicators (e.g., "14 Dishes match Gluten-Free + Vegetarian").
- **Ingredient Transparency Drawer:** Full breakdown of European EU-14 allergens (Celery, Cereals containing gluten, Crustaceans, Eggs, Fish, Lupin, Milk, Molluscs, Mustard, Nuts, Peanuts, Sesame seeds, Soya, Sulphur dioxide/sulphites).

### 3.5 Core Flagship Feature 3: Interactive Sommelier Wine Pairing Engine
- **Dish-to-Wine Matching:** When browsing a dish (e.g., *Pan-seared Brittany Turbot* or *Wild Truffle & Porcini Tagliolini*), the user receives curated sommelier recommendations:
  - *Regional Match:* E.g., Domaine Leflaive Puligny-Montrachet (Burgundy) or Gavi di Gavi (Piedmont).
  - *Alternative Profile:* Biodynamic Natural Wine or Non-Alcoholic Botanical Infusion.
- **Tasting Radar Profile:** Interactive sensory breakdown: Acidity, Tannins, Fruit Intensity, Body, and Oak Influence.
- **Vintage & Temperature Guide:** Service temperature notes (e.g., "Served at 11°C in Zalto Burgundy stemware").

### 3.6 Interactive Reservation & Booking Drawer
- **Multi-Step Seamless Slide-Out Drawer:**
  - Step 1: Party size & Date/Time selector (morning/lunch/evening services).
  - Step 2: Floorplan seat selection or seating preference.
  - Step 3: Dietary requirements & celebration notes (Anniversary, Birthday, Business).
  - Step 4: Contact details & instant confirmation modal with calendar (.ics) sync.
- **Zero Account Wall:** Frictionless booking designed for maximum lead capture.

### 3.7 European Compliance & Localization Suite
- **GDPR Consent Architecture:** Granular cookie preference manager ("Accept Necessary", "Custom Settings", "Accept All") with persistent local storage.
- **Legal Directives:** Legally compliant German/Austrian *Impressum*, GDPR Privacy Policy, and Terms of Service.
- **Multi-Currency Engine:** Instant switching between Euro (€ EUR), British Pound (£ GBP), and Swiss Franc (CHF).
- **Multi-Language Switcher:** Native localized interfaces for English (EN), German (DE), French (FR), and Italian (IT).
- **Instant Outreach Floating Triggers:** Mobile-optimized floating action buttons for Direct Call, WhatsApp Concierge, and Google Maps Navigation.

---

## 4. Success Metrics & Conversion Benchmarks

| Metric | Industry Standard | Target for These Demos |
| :--- | :--- | :--- |
| **Google Lighthouse Performance** | 62 / 100 | **95+ (Mobile & Desktop)** |
| **Largest Contentful Paint (LCP)** | 3.4 seconds | **< 1.6 seconds on 4G** |
| **Cumulative Layout Shift (CLS)** | 0.12 | **0.00 (Zero layout jump)** |
| **Interaction to Next Paint (INP)** | > 200 ms | **< 60 ms** |
| **Reservation Drawer Completion Rate** | 18% | **42%+ (Interactive flow)** |
| **Cold Outreach Pitch Conversion** | 3% response rate | **15% - 25% booked discovery calls** |

---

## 5. Non-Functional Requirements & Security
- **Data Protection:** Zero plain-text storage of customer PII in logs; full adherence to EU General Data Protection Regulation (Regulation (EU) 2016/679).
- **Accessibility:** WCAG 2.1 AA Compliance (color contrast minimum 4.5:1, full keyboard navigation for SVG floorplan, aria-labels on all interactive elements).
- **SEO & Schema.org:** Structured JSON-LD schema for `Restaurant`, `Menu`, `PostalAddress`, and `GeoCoordinates` for maximum search engine rich snippets.
