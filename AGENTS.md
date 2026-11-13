# Autonomous Agent Development Rules & Quality Standards

## Project: European Dining Web Demos (High-End Bistro & Artisan Pizzeria)
**Owner & Lead Engineer:** Mitul Kabir Badhon  
**Target Profile:** https://github.com/mitulkabirbadhon7

---

## 1. Absolute Directives & Strict Guardrails

### 1.1 ZERO AI Artifacts & Brand Integrity
- **NO AI Logos or Badges:** You must NEVER include any AI logo, Gemini logo, OpenAI spark, robot glyph, or "Made with AI" badge anywhere in user-facing components, layouts, or documentation.
- **NO "AI Slop" Design:** Strictly forbid generic saturated indigo-to-purple gradients (`#6366f1` to `#a855f7`), generic cyan glow on dark slate (`#0f172a`), or cookie-cutter SaaS layouts.
- **Bespoke Artisan Aesthetic:** The product must look and feel like an award-winning bespoke European digital agency project designed for Michelin-star restaurants and historic European pizzerias.

### 1.2 Full Design Consistency Across All Pages
- All pages (Bistro, Pizzeria, Impressum, Privacy, Reservation Drawer, Sommelier Modal) must strictly adhere to the designated color system and editorial typography:
  - **Bistro Theme:** Warm Espresso (`#2A1E17`), Stone Ivory (`#F7F4EE`), Deep Bordeaux Wine (`#5E1924`), Butter Yellow (`#F3E5AB`), and Terracotta (`#C86D51`).
  - **Pizzeria Theme:** Hearth Charcoal (`#1C1A18`), Tuscan Terracotta (`#C86D51`), Burnt Amber (`#D9822B`), Warm Flour Alabaster (`#FAF8F5`), and Olive Sage (`#6E7B62`).
  - **Typography:** Editorial Serif (Fraunces / Playfair Display) for display headers paired with clean geometric Sans-Serif (Plus Jakarta Sans / Inter) for UI and body copy.
  - **Easing:** All state transitions must use `cubic-bezier(0.16, 1, 0.3, 1)`.

### 1.3 Strict Separation of Concerns
- **Frontend (`/frontend`):** Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, Zod validation, Framer Motion. Zero direct database queries in client components.
- **Backend (`/backend`):** Node.js, Express.js, TypeScript, Neon Serverless Postgres via Drizzle ORM, Zod request validators, CORS, rate limiting.
- **Shared (`/shared`):** Single source of truth for DTOs, domain models, and Zod validation schemas.

### 1.4 Code Quality & Type Safety
- **No `any` Types:** All TypeScript code must be strictly typed.
- **Universal Zod Validation:** Validate all input boundaries (client forms, API route parameters, query strings, and environment variables).
- **Zero-Shift Performance:** All images must use responsive dimensions (`next/image` with WebP/AVIF). All fonts must use `font-display: swap` to maintain CLS = 0.00.

---

## 2. European Compliance & Localization Checklist

1. **GDPR Consent:** Persistent cookie consent banner with "Accept Necessary", "Settings", and "Accept All".
2. **Impressum:** Legally mandated German/Austrian Impressum page accessible from the footer.
3. **Multi-Currency:** Dynamic currency display (€ EUR, £ GBP, CHF).
4. **Instant Actions:** Floating mobile triggers for Direct Phone Call, WhatsApp Message, and Google Maps Navigation.

---

## 3. Git & Confidentiality Guidelines

- **Never Commit Secrets:** `.env`, `.env.local`, `.env.production` must always remain in `.gitignore`.
- **Client Confidentiality:** Any cold outreach lists, prospect spreadsheets, email scrapers, or internal sales commission targets must NEVER be committed to public GitHub repositories.
- **Clean Git History:** Meaningful conventional commit messages (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
