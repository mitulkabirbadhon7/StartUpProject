'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wine, UtensilsCrossed, Sparkles, MapPin, ShieldCheck, ChevronRight, Compass, Award, Star, Clock, Flame, Users, ArrowUpRight } from 'lucide-react';
import FloorplanViewer, { TableItem } from '@/components/floorplan/FloorplanViewer';
import DietaryFilterBar from '@/components/menu/DietaryFilterBar';
import WinePairingDrawer, { WinePairingData } from '@/components/sommelier/WinePairingDrawer';
import ReservationDrawer from '@/components/reservation/ReservationDrawer';
import TiltCard from '@/components/ui/TiltCard';
import { useCurrency, Currency } from '@/context/CurrencyContext';

const TOTAL_CATALOG_DISHES = [
  { id: 'b-1', tags: ['Gluten-Free', 'Dairy-Free', 'Halal'] },
  { id: 'b-2', tags: ['Vegetarian', 'Signature', 'Halal'] },
  { id: 'b-3', tags: ['Gluten-Free Option', 'Signature'] },
  { id: 'b-4', tags: ['Vegetarian', 'Signature'] },
  { id: 'p-1', tags: ['Vegetarian', 'Classic Heritage', 'D.O.P. Certified'] },
  { id: 'p-2', tags: ['Vegetarian', 'Signature White'] },
  { id: 'p-3', tags: ['Spicy', 'Signature'] },
  { id: 'p-4', tags: ['100% Vegan', 'Dairy-Free', 'Heritage'] },
];

export default function HomePage() {
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<string[]>([]);
  const [activeWinePairing, setActiveWinePairing] = useState<WinePairingData | null>(null);
  const [activeDishTitle, setActiveDishTitle] = useState<string>('');
  
  const { currency, setCurrency, formatPrice } = useCurrency();

  const handleSelectTable = (table: TableItem) => {
    setSelectedTable(table);
    setIsReservationOpen(true);
  };

  const handleToggleDietary = (filterId: string) => {
    setActiveDietaryFilters((prev) =>
      prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]
    );
  };

  const handleOpenWinePairing = (dishTitle: string, pairing: WinePairingData) => {
    setActiveDishTitle(dishTitle);
    setActiveWinePairing(pairing);
  };

  const dynamicMatchCount = activeDietaryFilters.length === 0
    ? TOTAL_CATALOG_DISHES.length
    : TOTAL_CATALOG_DISHES.filter((dish) => {
        if (activeDietaryFilters.includes('vegan') && !dish.tags.includes('100% Vegan')) return false;
        if (activeDietaryFilters.includes('vegetarian') && !dish.tags.some(t => t.includes('Vegetarian') || t.includes('Vegan'))) return false;
        if (activeDietaryFilters.includes('gluten_free') && !dish.tags.some(t => t.includes('Gluten-Free'))) return false;
        if (activeDietaryFilters.includes('dairy_free') && !dish.tags.includes('Dairy-Free')) return false;
        if (activeDietaryFilters.includes('halal') && !dish.tags.includes('Halal')) return false;
        return true;
      }).length;

  return (
    <div className="relative min-h-screen bg-espresso-950 text-stone-100 flex flex-col justify-between selection:bg-bordeaux-800 selection:text-white max-w-[100vw] overflow-x-hidden">
      {/* Editorial Luxury Top Bar */}
      <header className="sticky top-0 z-30 bistro-glass border-b border-stone-200/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link
            href="/"
            aria-label="European Gastronomy Portal Home"
            className="group flex items-center gap-2 sm:gap-3 shrink-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-butter-300 transition-transform active:scale-95"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-bordeaux-800 flex items-center justify-center border border-butter-300/40 text-butter-300 shadow-lg shrink-0 group-hover:scale-105 group-hover:bg-bordeaux-700 transition-all duration-300">
              <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="font-serif font-semibold text-sm sm:text-lg tracking-tight text-stone-100 group-hover:text-butter-300 transition-colors block sm:inline">
                European Gastronomy
              </span>
              <span className="hidden md:inline-block text-[11px] font-sans text-stone-400 ml-2 tracking-widest uppercase group-hover:text-stone-300 transition-colors">
                Artisanal Hospitality Suite
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Multi-Currency Toggle */}
            <div className="flex items-center bg-espresso-900 rounded-xl p-0.5 border border-stone-200/10 text-xs font-mono">
              {(['EUR', 'GBP', 'CHF'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg transition-colors ${
                    currency === curr ? 'bg-bordeaux-800 text-stone-100 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : 'CHF'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-semibold hover:bg-bordeaux-700 transition-all shadow-xl border border-butter-300/20 active:scale-95 shrink-0"
            >
              Book Table
            </button>
          </div>
        </div>
      </header>

      {/* Main Luxury Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-16 sm:space-y-20">
        {/* Hero Section with Parallax Background & Editorial Typography */}
        <section className="relative rounded-3xl overflow-hidden bistro-glass border border-stone-200/10 p-6 sm:p-12 md:p-16 text-center max-w-5xl mx-auto shadow-2xl">
          {/* Subtle Ambient Backlit Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1600&auto=format&fit=crop')",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-5"
          >
            <div className="inline-flex max-w-full text-center flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bordeaux-950/80 border border-butter-300/30 text-butter-300 text-[10px] sm:text-xs uppercase tracking-wider font-semibold shadow-lg">
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>European Client Acquisition • Web Demos Master Suite</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-stone-100 font-medium tracking-tight leading-[1.08] max-w-4xl mx-auto">
              Crafting Unforgettable Dining Journeys Across Europe
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed font-sans font-light max-w-2xl mx-auto">
              Two bespoke, handcrafted culinary web architectures engineered to convert discerning epicureans into lifelong guests. Featuring real-time SVG floorplan seat selection, European allergen matrix filtering, and sommelier vintage pairings.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
              <a
                href="#demos"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-bordeaux-800 text-stone-100 font-semibold hover:bg-bordeaux-700 transition-all shadow-xl flex items-center gap-2"
              >
                <span>View Live Hospitality Demos</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-espresso-900/90 text-stone-200 border border-stone-200/20 font-medium hover:text-white hover:bg-espresso-800 transition-all"
              >
                Test Live Reservation Drawer
              </button>
            </div>
          </motion.div>
        </section>

        {/* Dual Flagship Demo Cards with Rich Photography & 3D Tilt Physics */}
        <section id="demos" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
              Interactive Flagship Demos
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-medium">
              Explore Our Two Culinary Web Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Demo 1: High-End European Bistro */}
            <TiltCard glowColor="rgba(243, 229, 171, 0.2)">
              <div className="bistro-glass rounded-3xl overflow-hidden border border-stone-200/10 shadow-2xl flex flex-col justify-between h-full group">
                {/* Visual Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop"
                    alt="L'Étoile & Terroir Paris Dining Room"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bordeaux-950/80 backdrop-blur-md border border-butter-300/30 text-butter-300 text-[11px] font-bold uppercase tracking-wider">
                    Demo 1 • Fine Dining
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-medium text-stone-100">
                        L&apos;Étoile & Terroir
                      </h3>
                      <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-butter-300" />
                        Paris 1er • Michelin Guide Contender
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
                    Seasonal French & Alpine haute cuisine. Features interactive multi-course biodynamic tasting menus, candlelit acoustic salons, and vintage Burgundy sommelier cellar flights.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2.5 py-1 rounded-lg bg-espresso-950/80 border border-stone-200/10 text-stone-300">
                        Live SVG Floorplan Selector
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-espresso-950/80 border border-stone-200/10 text-stone-300">
                        EU-14 Allergen Matrix
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-espresso-950/80 border border-stone-200/10 text-stone-300">
                        Sommelier 5-Axis Radar
                      </span>
                    </div>

                    <div className="pt-4 border-t border-stone-200/10">
                      <Link
                        href="/bistro"
                        className="w-full py-3.5 rounded-2xl bg-bordeaux-800 text-stone-100 text-xs font-semibold hover:bg-bordeaux-700 transition-all shadow-xl flex items-center justify-center gap-2 group-hover:gap-3"
                      >
                        <span>Experience Bistro Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Demo 2: Artisan Sourdough Pizzeria */}
            <TiltCard glowColor="rgba(217, 130, 43, 0.25)">
              <div className="pizzeria-glass rounded-3xl overflow-hidden border border-terracotta-600/20 shadow-2xl flex flex-col justify-between h-full group">
                {/* Visual Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
                    alt="Lievito Madre Naples Wood-Fired Oven"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hearth-950 via-hearth-950/40 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-hearth-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                    Demo 2 • Artisan Craft
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-medium text-stone-100">
                        Lievito Madre
                      </h3>
                      <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        Napoli Centro Storico • Stefano Ferrara Hearth
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
                    48-hour wild sourdough fermentation, organic stone-ground grain milling, D.O.P. San Marzano tomatoes, and blistered Neapolitan wood-fired mastery at 450°C.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2.5 py-1 rounded-lg bg-hearth-950/80 border border-terracotta-600/20 text-stone-300">
                        48h Fermentation Visualizer
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-hearth-950/80 border border-terracotta-600/20 text-stone-300">
                        D.O.P. Provenance Tracking
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-hearth-950/80 border border-terracotta-600/20 text-stone-300">
                        Aperitivo & Natural Wine Pairings
                      </span>
                    </div>

                    <div className="pt-4 border-t border-terracotta-600/20">
                      <Link
                        href="/pizzeria"
                        className="w-full py-3.5 rounded-2xl bg-terracotta-600 text-stone-100 text-xs font-semibold hover:bg-terracotta-700 transition-all shadow-xl flex items-center justify-center gap-2 group-hover:gap-3"
                      >
                        <span>Experience Pizzeria Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Flagship Feature 1: Live Interactive Floorplan & Seating Engine */}
        <section className="space-y-6 w-full max-w-full overflow-hidden">
          <FloorplanViewer
            selectedTableId={selectedTable?.id}
            onSelectTable={handleSelectTable}
          />
        </section>

        {/* Flagship Feature 2: Smart Dietary & Allergen Matrix Filter */}
        <section className="space-y-6 w-full max-w-full overflow-hidden">
          <DietaryFilterBar
            activeFilters={activeDietaryFilters}
            onToggleFilter={handleToggleDietary}
            onClearFilters={() => setActiveDietaryFilters([])}
            matchingCount={dynamicMatchCount}
          />
        </section>

        {/* Interactive Wine Pairing Showcase Trigger */}
        <section className="bistro-glass rounded-3xl p-6 sm:p-8 md:p-12 border border-stone-200/10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-butter-300 text-xs font-bold uppercase tracking-widest">
              <Wine className="w-4 h-4 text-bordeaux-600" />
              <span>Flagship Interactive Feature</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-100 font-medium">
              Sommelier Vintage Pairing & Sensory Radar
            </h3>
            <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
              Interact with our proprietary 5-axis tasting radar (Acidity, Tannins, Body, Oak, Intensity) dynamically calculating harmony between Grand Cru cellar bottles and seasonal tasting courses.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() =>
                handleOpenWinePairing('Pan-Seared Brittany Turbot Carpaccio', {
                  wineName: '2022 Domaine Leflaive Puligny-Montrachet',
                  vintage: 2022,
                  region: 'Burgundy, France',
                  type: 'white',
                  bottlePriceCents: 14500,
                  glassPriceCents: 2800,
                  tastingNotes: 'Crisp green apple, crushed limestone minerality, and toasted hazelnut nuances.',
                  radar: { acidity: 4.8, tannins: 1.0, body: 3.8, oak: 3.2, intensity: 4.5 },
                })
              }
              className="w-full md:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-bordeaux-800 text-stone-100 text-xs font-semibold hover:bg-bordeaux-700 transition-all shadow-xl flex items-center justify-center gap-2.5 active:scale-95"
            >
              <Wine className="w-4 h-4 text-butter-300" />
              <span>Launch Interactive Sommelier Radar</span>
            </button>
          </div>
        </section>

        {/* Terroir Provenance & Gastronomy Storytelling */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-espresso-900/60 border border-stone-200/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-bordeaux-800/60 border border-bordeaux-700/40 text-butter-300 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-medium text-stone-100">Bespoke European Art Direction</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every curve, serif glyph, and color code was curated to represent authentic Parisian bistros and Neapolitan pizzerias without generic AI SaaS templates.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-espresso-900/60 border border-stone-200/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-bordeaux-800/60 border border-bordeaux-700/40 text-butter-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-medium text-stone-100">Strict EU Compliance</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Full German/Austrian § 5 TMG Impressum, European General Data Protection Regulation (GDPR) cookie consent, and multi-currency formatting (€, £, CHF).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-espresso-900/60 border border-stone-200/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-bordeaux-800/60 border border-bordeaux-700/40 text-butter-300 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-medium text-stone-100">High-Ticket Client Acquisition</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Engineered with psychological credibility triggers designed to convert cold restaurant owners on video calls into €5,000 – €25,000+ retainers.
            </p>
          </div>
        </section>
      </main>

      {/* European Compliance Footer */}
      <footer className="border-t border-stone-200/10 bg-espresso-950/95 py-12 px-4 sm:px-6 text-xs text-stone-400 pb-24 sm:pb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" aria-label="European Dining Web Acquisition Suite Home" className="group block">
            <p className="font-serif text-stone-200 text-sm font-medium group-hover:text-butter-300 transition-colors">
              European Dining Web Acquisition Suite
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">Designed & Architected by Mitul Kabir Badhon</p>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <Link href="/bistro" className="hover:text-stone-200 transition-colors">Bistro Demo</Link>
            <Link href="/pizzeria" className="hover:text-stone-200 transition-colors">Pizzeria Demo</Link>
            <Link href="/impressum" className="hover:text-stone-200 transition-colors">Impressum (Legal)</Link>
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">GDPR Privacy Policy</Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-gdpr-banner'));
                }
              }}
              className="text-stone-400 hover:text-butter-300 transition-colors underline underline-offset-4"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Drawers */}
      <WinePairingDrawer
        isOpen={Boolean(activeWinePairing)}
        onClose={() => setActiveWinePairing(null)}
        dishTitle={activeDishTitle}
        pairing={activeWinePairing}
      />

      <ReservationDrawer
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        selectedTable={selectedTable}
        restaurantSlug="letoile-terroir"
      />
    </div>
  );
}
