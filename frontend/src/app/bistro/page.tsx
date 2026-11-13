'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wine, Clock, MapPin, Phone, Check, Award } from 'lucide-react';
import FloorplanViewer, { TableItem } from '@/components/floorplan/FloorplanViewer';
import DietaryFilterBar from '@/components/menu/DietaryFilterBar';
import WinePairingDrawer, { WinePairingData } from '@/components/sommelier/WinePairingDrawer';
import ReservationDrawer from '@/components/reservation/ReservationDrawer';
import { formatCurrency } from '@/lib/utils';

const BISTRO_COURSES = [
  {
    id: 'bistro-01',
    course: 'Premier Service',
    title: 'Pan-Seared Brittany Turbot Carpaccio',
    titleFr: 'Carpaccio de Turbot de Bretagne Sauvage',
    desc: 'Thinly shaved wild turbot, pickled sea fennel, Meyer lemon emulsion, cold-pressed Dordogne olive oil, and sea salt crystals.',
    priceCents: 2600,
    tags: ['Gluten-Free', 'Dairy-Free', 'Halal'],
    wine: {
      wineName: '2022 Domaine Leflaive Puligny-Montrachet',
      vintage: 2022,
      region: 'Burgundy, France',
      type: 'white',
      bottlePriceCents: 14500,
      glassPriceCents: 2800,
      tastingNotes: 'Crisp green apple, crushed limestone minerality, and toasted hazelnut nuances.',
      radar: { acidity: 4.8, tannins: 1.0, body: 3.8, oak: 3.2, intensity: 4.5 },
    },
  },
  {
    id: 'bistro-02',
    course: 'Deuxième Service',
    title: 'Woodland Périgord Truffle Tagliolini',
    titleFr: 'Tagliolini aux Truffes Noires du Périgord',
    desc: 'Hand-rolled 30-egg yolk ribbons, 24-month cultured Normandy farm butter, and 8 grams shaved winter black melanosporum.',
    priceCents: 3800,
    tags: ['Vegetarian', 'Signature', 'Halal'],
    wine: {
      wineName: '2019 Vietti Barolo Castiglione',
      vintage: 2019,
      region: 'Piedmont, Italy',
      type: 'red',
      bottlePriceCents: 11000,
      glassPriceCents: 2400,
      tastingNotes: 'Dried rose petals, ripe red cherry, tar, and silken forest-floor tannins.',
      radar: { acidity: 4.5, tannins: 4.9, body: 4.7, oak: 3.5, intensity: 4.8 },
    },
  },
  {
    id: 'bistro-03',
    course: 'Plat Principal',
    title: 'Aged Pyrenean Milk-Fed Lamb Loin',
    titleFr: 'Selle d’Agneau de Lait des Pyrénées Rôtie',
    desc: 'Herb-crusted roasted rack, caramelized shallot tartlet, smoked aubergine caviar, and spiced juniper lamb jus.',
    priceCents: 4600,
    tags: ['Gluten-Free Option', 'Signature'],
    wine: {
      wineName: '2018 Château Pontet-Canet Grand Cru Classé',
      vintage: 2018,
      region: 'Pauillac, Bordeaux, France',
      type: 'red',
      bottlePriceCents: 19500,
      glassPriceCents: 3600,
      tastingNotes: 'Blackberry compote, cedarwood cigar box, graphite, and velvety aristocrat tannins.',
      radar: { acidity: 4.3, tannins: 4.8, body: 4.9, oak: 4.5, intensity: 5.0 },
    },
  },
  {
    id: 'bistro-04',
    course: 'Dessert d’Or',
    title: 'Grand Cru Guanaja 70% Warm Soufflé',
    titleFr: 'Soufflé Chaud au Chocolat Grand Cru Guanaja',
    desc: 'Molten dark single-origin Venezuelan chocolate, cold churned Tahitian vanilla pod crème, and salted Breton butter caramel.',
    priceCents: 1800,
    tags: ['Vegetarian', 'Signature'],
    wine: {
      wineName: '2017 Château d’Yquem Sauternes 1er Cru Supérieur',
      vintage: 2017,
      region: 'Bordeaux, France',
      type: 'digestif',
      bottlePriceCents: 26000,
      glassPriceCents: 4500,
      tastingNotes: 'Candied Seville orange peel, wild mountain honey, acacia blossom, and crystalline lingering acidity.',
      radar: { acidity: 4.6, tannins: 1.0, body: 4.9, oak: 4.2, intensity: 5.0 },
    },
  },
];

export default function BistroPage() {
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<string[]>([]);
  const [activeWinePairing, setActiveWinePairing] = useState<WinePairingData | null>(null);
  const [activeDishTitle, setActiveDishTitle] = useState<string>('');
  const [currency, setCurrency] = useState<'EUR' | 'GBP' | 'CHF'>('EUR');

  const filteredCourses = activeDietaryFilters.length === 0
    ? BISTRO_COURSES
    : BISTRO_COURSES.filter((course) => {
        if (activeDietaryFilters.includes('vegan')) return false; // bistro sample has vegetarian/GF
        if (activeDietaryFilters.includes('vegetarian') && !course.tags.includes('Vegetarian')) return false;
        if (activeDietaryFilters.includes('gluten_free') && !course.tags.some((t) => t.includes('Gluten-Free'))) return false;
        if (activeDietaryFilters.includes('halal') && !course.tags.includes('Halal')) return false;
        return true;
      });

  return (
    <div className="min-h-screen bg-espresso-950 text-stone-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bistro-glass border-b border-stone-200/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-400 hover:text-stone-100 text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Master Demos Portal</span>
          </Link>

          <div className="text-center">
            <h1 className="font-serif font-bold text-xl text-stone-100 tracking-tight">
              L&apos;Étoile & Terroir
            </h1>
            <p className="text-[10px] text-butter-300 tracking-widest uppercase font-semibold">
              Haute Gastronomie Française • Paris 1er
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="flex items-center bg-espresso-900 rounded-lg p-0.5 border border-stone-200/10 text-xs font-mono">
              {(['EUR', 'GBP', 'CHF'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    currency === c ? 'bg-bordeaux-800 text-stone-100' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {c === 'EUR' ? '€' : c === 'GBP' ? '£' : 'CHF'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-4 py-2 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-colors shadow-lg"
            >
              Book Table
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Editorial Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden bistro-glass border border-stone-200/10 p-8 md:p-14 text-center max-w-4xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
            Automne & Hiver 2026/2027
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-stone-100 mt-2 mb-4">
            Terroir Authentique & Raffinement Alpine
          </h2>
          <p className="text-xs md:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            From the wild Atlantic currents of Brittany to the ancient oak forests of Périgord, our culinary manifesto celebrates biodynamic French agriculture, heirloom produce, and timeless classical technique.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-butter-300" /> Dinner Service: 18:30 – 23:30</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-butter-300" /> 14 Rue Saint-Honoré, 75001 Paris</span>
          </div>
        </section>

        {/* Dietary Filter Bar */}
        <section>
          <DietaryFilterBar
            activeFilters={activeDietaryFilters}
            onToggleFilter={(f) =>
              setActiveDietaryFilters((prev) =>
                prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
              )
            }
            onClearFilters={() => setActiveDietaryFilters([])}
            matchingCount={filteredCourses.length}
          />
        </section>

        {/* Tasting Menu Catalog */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
                Menu Découverte
              </span>
              <h3 className="font-serif text-2xl text-stone-100 font-medium mt-0.5">
                Seasonal Tasting Courses
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-serif italic">
              All courses paired with estate sommelier selections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map((dish) => (
              <div
                key={dish.id}
                className="bistro-glass rounded-2xl p-6 border border-stone-200/10 flex flex-col justify-between hover:border-butter-300/30 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] font-mono text-butter-300 uppercase tracking-widest">
                      {dish.course}
                    </span>
                    <span className="font-serif font-semibold text-lg text-bordeaux-400">
                      {formatCurrency(dish.priceCents, currency)}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-medium text-stone-100">{dish.title}</h4>
                  <p className="text-xs text-stone-400 italic font-serif">{dish.titleFr}</p>
                  <p className="text-xs text-stone-300 leading-relaxed pt-1">{dish.desc}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {dish.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-espresso-950 border border-stone-200/5 text-[10px] text-stone-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-200/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveDishTitle(dish.title);
                      setActiveWinePairing(dish.wine);
                    }}
                    className="flex items-center gap-2 text-xs text-butter-300 hover:text-white transition-colors"
                  >
                    <Wine className="w-3.5 h-3.5 text-bordeaux-600" />
                    <span className="underline underline-offset-4">Sommelier Wine Match</span>
                  </button>

                  <button
                    onClick={() => setIsReservationOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-colors shadow"
                  >
                    Reserve for this Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Seating Floorplan Engine */}
        <section className="space-y-4">
          <FloorplanViewer
            selectedTableId={selectedTable?.id}
            onSelectTable={(table) => {
              setSelectedTable(table);
              setIsReservationOpen(true);
            }}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/10 bg-espresso-950/95 py-10 px-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-stone-200 text-sm">L&apos;Étoile & Terroir • 14 Rue Saint-Honoré, Paris 1er</p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Haute Gastronomie Française • Designed by Mitul Kabir Badhon
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <Link href="/" className="hover:text-stone-200 transition-colors">Master Portal</Link>
            <Link href="/pizzeria" className="hover:text-stone-200 transition-colors">Pizzeria Demo</Link>
            <Link href="/impressum" className="hover:text-stone-200 transition-colors">Impressum (Legal)</Link>
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">GDPR Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
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
