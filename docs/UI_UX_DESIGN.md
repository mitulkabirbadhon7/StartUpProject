# UI/UX Design System & Creative Specification

## Project: European Dining Web Demos (High-End Bistro & Artisan Pizzeria)
**Lead Designer / Engineer:** Mitul Kabir Badhon  
**Creative Standards:** European Editorial & Artisan Craftsmanship (Strict Anti-"AI Slop" Protocol)

---

## 1. Anti-"AI Slop" Manifesto & Creative Philosophy

Clients can spot generic, low-effort AI website templates instantly. Most AI-generated web designs default to sterile SaaS themes, cyan-on-dark-navy glows, and floating rounded card grids.

This project implements **bespoke, artisanal visual direction** matching high-end European culinary publications (e.g., *Kinfolk*, *Cereal*, *L'Officiel Gourmand*, and Michelin Guide print catalogues).

### 1.1 Forbidden Design Anti-Patterns
- ❌ **No generic indigo-to-purple or cyan gradients** (`#6366f1` to `#a855f7`).
- ❌ **No neon cyan button glow on dark slate** (`#0f172a`).
- ❌ **No cookie-cutter 3-column card rows** with generic centered icons.
- ❌ **No default unstyled Bootstrap/Tailwind standard colors** (pure `#000000` or `#ffffff`).
- ❌ **No lifeless placeholder stock photography** of unrelated corporate diners.

---

## 2. Bespoke Color Palettes & Atmospheric Themes

### 2.1 Demo 1: High-End European Bistro ("L'Étoile & Terroir")

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BISTRO SIGNATURE PALETTE                        │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────┤
│ Warm         │ Deep         │ Stone        │ Butter       │ Terracotta │
│ Espresso     │ Bordeaux     │ Ivory        │ Yellow       │ Accent     │
│ #2A1E17      │ #5E1924      │ #F7F4EE      │ #F3E5AB      │ #C86D51    │
└──────────────┴──────────────┴──────────────┴──────────────┴────────────┘
```

- **`espresso-950` (`#1F1611`):** Deep background luxury base for evening dinner ambience.
- **`espresso-900` (`#2A1E17`):** Primary dark background, cards, and editorial headers.
- **`bordeaux-800` (`#5E1924`):** Primary luxury accent, CTA fills, sommelier highlights, and reserve buttons.
- **`bordeaux-900` (`#431018`):** Deep wine shadow for hovered buttons and drawer headers.
- **`stone-100` (`#F7F4EE`):** Warm ecru/ivory background for daytime mode and high-contrast typography.
- **`stone-200` (`#EFE9DE`):** Subtle border lines and tactile card outlines.
- **`butter-300` (`#F3E5AB`):** Warm ambient candlelight glow for selected seats and star ratings.
- **`brass-500` (`#C8A261`):** Brushed antique brass for cutlery accents and VIP booth icons.

### 2.2 Demo 2: Artisan Sourdough Pizzeria ("Lievito Madre")

```
┌────────────────────────────────────────────────────────────────────────┐
│                       PIZZERIA ARTISAN PALETTE                         │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────┤
│ Charcoal     │ Tuscan       │ Burnt        │ Warm Flour   │ Olive      │
│ Hearth       │ Terracotta   │ Amber        │ Alabaster    │ Sage       │
│ #1C1A18      │ #C86D51      │ #D9822B      │ #FAF8F5      │ #6E7B62    │
└──────────────┴──────────────┴──────────────┴──────────────┴────────────┘
```

- **`hearth-900` (`#1C1A18`):** Charred wood-fired oven soot and cast iron aesthetic.
- **`terracotta-600` (`#C86D51`):** Tuscan clay brick, San Marzano tomato pulp, and terracotta tiles.
- **`amber-500` (`#D9822B`):** Golden blistered sourdough crust and Sicilian honey notes.
- **`flour-50` (`#FAF8F5`):** Soft organic flour dust, Italian burrata cream, and tactile paper menu backdrops.
- **`sage-600` (`#6E7B62`):** Fresh basil, extra virgin olive oil, and organic garden freshness.

---

## 3. Typography Hierarchy & Font Pairings

All typography uses **`font-display: swap`** and preloaded subset weights to prevent layout shift (CLS = 0.00).

```
Display / Headlines:  Playfair Display / Fraunces (Optical Serif, Italic Elegance)
UI Elements & Body:   Plus Jakarta Sans / Inter (Geometric Sans, High Legibility)
Numerals & Pricing:   Fraunces Oldstyle Figures / JetBrains Mono (for Sommelier Vintages)
```

| Element | Font Family | Size (Mobile / Desktop) | Weight & Letter Spacing | CSS Classes |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Fraunces / Playfair | 42px / 76px | Bold (700), `-0.03em` | `font-serif text-4xl md:text-7xl tracking-tight leading-[1.05]` |
| **Section Title** | Fraunces | 28px / 44px | SemiBold (600), `-0.02em` | `font-serif text-2xl md:text-4xl tracking-tight` |
| **Dish Title** | Playfair Display | 18px / 22px | Medium (500), `0.00em` | `font-serif text-lg md:text-xl font-medium` |
| **Body Copy** | Plus Jakarta Sans | 15px / 16px | Regular (400), `0.01em` | `font-sans text-sm md:text-base text-stone-300 leading-relaxed` |
| **Price / Vintages** | Fraunces | 16px / 20px | SemiBold (600), `0.02em` | `font-serif font-semibold text-bordeaux-400` |
| **Badges & Tags** | Plus Jakarta Sans | 11px / 12px | Bold (700), `0.08em` uppercase | `font-sans text-[11px] font-bold tracking-widest uppercase` |

---

## 4. Advanced Surface Depth & Tactile Textures

### 4.1 Refined Glassmorphism (Frosted Wine Glass)
```css
.bistro-glass {
  background: rgba(42, 30, 23, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(247, 244, 238, 0.12);
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
}
```

### 4.2 Soft Neu-Depth (Tactile Floorplan & Switch Controls)
Tactile seat selector knobs and dietary pills use subtle dual-drop inner and outer shadows to simulate embossed leather or warm stone:
```css
.tactile-seat-button {
  background: #231913;
  box-shadow: 
    3px 3px 8px rgba(0, 0, 0, 0.6),
    -2px -2px 6px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(247, 244, 238, 0.08);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.tactile-seat-button:active,
.tactile-seat-button[data-state="selected"] {
  box-shadow: 
    inset 2px 2px 5px rgba(0, 0, 0, 0.7),
    inset -2px -2px 5px rgba(255, 255, 255, 0.08);
  border-color: #c8a261;
}
```

### 4.3 Asymmetrical Editorial Layouts
- **Hero Grid:** Staggered vertical cards where the restaurant interior photography overlaps the chef's quote and live table availability counter.
- **Menu Presentation:** Two-column magazine-style catalog with floating sommelier wine pairing cards anchored to signature entrées.

---

## 5. Motion, Micro-Interactions & Animation Specs

All animations adhere to the master curve: **`cubic-bezier(0.16, 1, 0.3, 1)`** (custom smooth luxury deceleration).

### 5.1 Interactive Floorplan Micro-Interactions
1. **Zone Tabs (Terrace / Courtyard / Hall / Bar):** Fluid sliding indicator pill using Framer Motion layout animations.
2. **Table Hover & Seat Preview:** Mouse hover slightly scales the table element (`scale: 1.05`) and projects a soft warm candlelight amber shadow.
3. **Seat Selection:** Table pulses with a gentle gold border ring, instantly populating the party size and table number in the sticky reservation bar.

### 5.2 Wine Pairing Drawer & Flavor Radar
- **Radar Morphing:** When switching between paired wines, the 5-point SVG polygon smoothly interpolates its vertices over 400ms.
- **Tasting Tag Chips:** Tap-to-filter dietary and wine tags with tactile spring physics (`type: "spring", stiffness: 400, damping: 25`).

---

## 6. Viewport Adaptability Matrix

| Breakpoint | Target Devices | Layout Behavior & Focus Area |
| :--- | :--- | :--- |
| **`360px – 390px`** | iPhone SE, Galaxy A-series | Single-column editorial layout; sticky bottom booking CTA bar with safe-area padding; pan-and-zoom enabled for the SVG floorplan. |
| **`390px – 430px`** | iPhone 14/15/16 Pro, Pixel 8/9 | Dynamic Island / Notch safe zones (`env(safe-area-inset-bottom)`); bottom sheet drawer with swipe-to-dismiss gesture. |
| **`768px – 1024px`** | iPad Air/Pro, Galaxy Tab | 2-column menu layout; split-screen floorplan selector (Floorplan on Left 60%, Booking Details on Right 40%). |
| **`1280px – 1440px`** | MacBook Pro, ThinkPad | Full luxury editorial magazine grid; hover-triggered wine pairing sidebars; floating instant action buttons. |
| **`1920px – 2560px`** | 4K Displays & Ultrawide | Bounded within `max-w-7xl` container (1440px max width) with subtle ambient backdrop vignettes to eliminate blank empty stretches. |
