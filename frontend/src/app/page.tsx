'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wine, UtensilsCrossed, MapPin, ShieldCheck, ChevronRight, Compass } from 'lucide-react';
import FloorplanViewer, { TableItem } from '@/components/floorplan/FloorplanViewer';
import DietaryFilterBar from '@/components/menu/DietaryFilterBar';
import WinePairingDrawer, { WinePairingData } from '@/components/sommelier/WinePairingDrawer';
import ReservationDrawer from '@/components/reservation/ReservationDrawer';

export default function HomePage() {
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<string[]>([]);
  const [activeWinePairing, setActiveWinePairing] = useState<WinePairingData | null>(null);
  const [activeDishTitle, setActiveDishTitle] = useState<string>('');
  const [currency, setCurrency] = useState<'EUR' | 'GBP' | 'CHF'>('EUR');

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

  return (
    <div className="relative min-h-screen bg-espresso-950 text-stone-100 flex flex-col justify-between">
      {/* Editorial Luxury Top Bar */}
      <header className="sticky top-0 z-30 bistro-glass border-b border-stone-200/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-bordeaux-800 flex items-center justify-center border border-butter-300/40 text-butter-300">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-semibold text-lg tracking-tight text-stone-100">
                European Gastronomy
              </span>
              <span className="hidden sm:inline-block text-[11px] font-sans text-stone-400 ml-2 tracking-widest uppercase">
                Artisanal Hospitality Demos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="flex items-center bg-espresso-900 rounded-lg p-0.5 border border-stone-200/10 text-xs font-mono">
              {(['EUR', 'GBP', 'CHF'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    currency === curr ? 'bg-bordeaux-800 text-stone-100' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : 'CHF'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-4 py-2 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-colors shadow-lg border border-butter-300/20"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Intro Manifesto */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bordeaux-950/60 border border-bordeaux-800/40 text-butter-300 text-xs uppercase tracking-widest font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Master Client Acquisition Suite</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-100 font-medium tracking-tight leading-tight">
            Crafting Unforgettable Dining Journeys Across Europe
          </h1>
          <p className="text-sm md:text-base text-stone-300 leading-relaxed font-sans font-light">
            Two distinct, bespoke culinary web architectures engineered to convert discerning epicureans into loyal guests. Featuring interactive table floorplans, dietary matrix filters, and sommelier vintage pairings.
          </p>
        </section>

        {/* Dual Demo Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demo 1: High-End European Bistro */}
          <div className="bistro-glass rounded-3xl p-8 border border-stone-200/10 relative overflow-hidden flex flex-col justify-between group hover:border-butter-300/30 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
                Demo 1 • Fine Dining Experience
              </span>
              <h2 className="font-serif text-3xl text-stone-100 font-medium">
                L&apos;Étoile & Terroir
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Seasonal French & Alpine haute gastronomy. Multi-course biodynamic tasting menus, candlelit acoustic salons, and vintage Burgundy cellar curation.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-espresso-950 border border-stone-200/5 text-stone-300">
                  Michelin Guide Contender
                </span>
                <span className="px-2.5 py-1 rounded-md bg-espresso-950 border border-stone-200/5 text-stone-300">
                  Paris 1st Arrondissement
                </span>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/bistro"
                className="w-full py-3.5 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-colors shadow-lg flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>Explore Bistro Demo</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Demo 2: Artisan Sourdough Pizzeria */}
          <div className="pizzeria-glass rounded-3xl p-8 border border-terracotta-600/20 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500">
                Demo 2 • Artisan Craftsmanship
              </span>
              <h2 className="font-serif text-3xl text-stone-100 font-medium">
                Lievito Madre
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                48-hour wild sourdough fermentation, organic stone-ground grain milling, D.O.P. San Marzano tomatoes, and blistered Neapolitan wood-fired mastery.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-hearth-950 border border-stone-200/5 text-stone-300">
                  Historic Naples Heritage
                </span>
                <span className="px-2.5 py-1 rounded-md bg-hearth-950 border border-stone-200/5 text-stone-300">
                  450°C Birchwood Blister
                </span>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/pizzeria"
                className="w-full py-3.5 rounded-xl bg-terracotta-600 text-stone-100 text-xs font-medium hover:bg-terracotta-700 transition-colors shadow-lg flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>Explore Pizzeria Demo</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Flagship Feature 1: Floorplan & Live Seat Selector */}
        <section className="space-y-6">
          <FloorplanViewer
            selectedTableId={selectedTable?.id}
            onSelectTable={handleSelectTable}
          />
        </section>

        {/* Flagship Feature 2: Dietary Matrix Filter */}
        <section className="space-y-6">
          <DietaryFilterBar
            activeFilters={activeDietaryFilters}
            onToggleFilter={handleToggleDietary}
            onClearFilters={() => setActiveDietaryFilters([])}
            matchingCount={14}
          />
        </section>

        {/* Interactive Wine Pairing Showcase Trigger */}
        <section className="bistro-glass rounded-3xl p-8 border border-stone-200/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
              Interactive Flagship Feature
            </span>
            <h3 className="font-serif text-2xl text-stone-100 font-medium">
              Sommelier Vintage Pairing & Sensory Radar
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Explore dynamic multi-axis tasting radars (Acidity, Tannins, Body, Oak, Intensity) paired to our signature wild turbot and winter truffle courses.
            </p>
          </div>
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
            className="px-6 py-3.5 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-colors shadow-lg flex items-center gap-2 shrink-0"
          >
            <Wine className="w-4 h-4 text-butter-300" />
            <span>Launch Sommelier Radar</span>
          </button>
        </section>
      </main>

      {/* European Compliance Footer */}
      <footer className="border-t border-stone-200/10 bg-espresso-950/95 py-10 px-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-stone-200 text-sm">European Dining Web Acquisition Suite</p>
            <p className="text-[11px] text-stone-500 mt-0.5">Designed & Developed by Mitul Kabir Badhon</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/bistro" className="hover:text-stone-200 transition-colors">Bistro Demo</Link>
            <Link href="/pizzeria" className="hover:text-stone-200 transition-colors">Pizzeria Demo</Link>
            <Link href="/impressum" className="hover:text-stone-200 transition-colors">Impressum (Legal)</Link>
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">GDPR Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Drawers & Modals */}
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
