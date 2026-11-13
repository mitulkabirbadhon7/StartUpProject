'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Wine, Clock, Sparkles, MapPin, Phone, Check, Award, Compass, Heart, Utensils, Star } from 'lucide-react';
import FloorplanViewer, { TableItem } from '@/components/floorplan/FloorplanViewer';
import DietaryFilterBar from '@/components/menu/DietaryFilterBar';
import WinePairingDrawer, { WinePairingData } from '@/components/sommelier/WinePairingDrawer';
import ReservationDrawer from '@/components/reservation/ReservationDrawer';
import TastingCalculator from '@/components/calculator/TastingCalculator';
import TiltCard from '@/components/ui/TiltCard';
import { formatCurrency } from '@/lib/utils';

const BISTRO_COURSES = [
  {
    id: 'bistro-01',
    course: 'Premier Service',
    title: 'Pan-Seared Brittany Turbot Carpaccio',
    titleFr: 'Carpaccio de Turbot de Bretagne Sauvage',
    desc: 'Thinly shaved wild turbot, pickled sea fennel, citrus gel, cold-pressed Dordogne olive oil, and fleur de sel crystals.',
    priceCents: 2600,
    tags: ['Gluten-Free', 'Dairy-Free', 'Halal'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
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
    desc: 'Hand-rolled 30-egg yolk ribbons, 24-month cultured Normandy farm butter, and 8 grams shaved winter black tuber melanosporum.',
    priceCents: 3800,
    tags: ['Vegetarian', 'Signature', 'Halal'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281292?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
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
        if (activeDietaryFilters.includes('vegan')) return false;
        if (activeDietaryFilters.includes('vegetarian') && !course.tags.includes('Vegetarian')) return false;
        if (activeDietaryFilters.includes('gluten_free') && !course.tags.some((t) => t.includes('Gluten-Free'))) return false;
        if (activeDietaryFilters.includes('halal') && !course.tags.includes('Halal')) return false;
        return true;
      });

  return (
    <div className="min-h-screen bg-espresso-950 text-stone-100 flex flex-col justify-between selection:bg-bordeaux-800 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bistro-glass border-b border-stone-200/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-400 hover:text-stone-100 text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Master Demos Portal</span>
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
            <div className="flex items-center bg-espresso-900 rounded-xl p-0.5 border border-stone-200/10 text-xs font-mono">
              {(['EUR', 'GBP', 'CHF'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    currency === c ? 'bg-bordeaux-800 text-stone-100 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {c === 'EUR' ? '€' : c === 'GBP' ? '£' : 'CHF'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-4 py-2 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-semibold hover:bg-bordeaux-700 transition-colors shadow-lg border border-butter-300/20 active:scale-95"
            >
              Book Table
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full space-y-20">
        {/* Editorial Hero Banner with Paris Dining Photography */}
        <section className="relative rounded-3xl overflow-hidden bistro-glass border border-stone-200/10 p-8 md:p-16 text-center max-w-5xl mx-auto shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1600&auto=format&fit=crop')",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bordeaux-950/80 border border-butter-300/30 text-butter-300 text-xs uppercase tracking-widest font-semibold">
              <Star className="w-3.5 h-3.5 fill-butter-300 text-butter-300" />
              <span>Michelin Guide Inspection • Autumn/Winter 2026/2027</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium text-stone-100 tracking-tight leading-tight max-w-3xl mx-auto">
              Terroir Authentique & Raffinement Alpine
            </h2>

            <p className="text-xs md:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              From the wild Atlantic currents of Brittany to the ancient oak forests of Périgord, our culinary manifesto celebrates biodynamic French agriculture, heirloom produce, and timeless classical technique.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-butter-300" /> Dinner Service: 18:30 – 23:30
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-butter-300" /> 14 Rue Saint-Honoré, 75001 Paris
              </span>
            </div>
          </motion.div>
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

        {/* Tasting Menu Catalog with Rich Photography & 3D Tilt Cards */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
                Menu Dégustation
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-medium mt-0.5">
                Signature Culinary Courses
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-serif italic hidden sm:inline">
              Every course paired with estate sommelier flights
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((dish) => (
              <TiltCard key={dish.id} glowColor="rgba(243, 229, 171, 0.15)">
                <div className="bistro-glass rounded-3xl overflow-hidden border border-stone-200/10 flex flex-col justify-between h-full group shadow-2xl">
                  {/* Dish Photography with Refractive Overlay */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-espresso-950/80 backdrop-blur-md border border-stone-200/10 text-butter-300 text-[10px] font-mono uppercase tracking-wider">
                      {dish.course}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-bordeaux-950/90 backdrop-blur-md border border-butter-300/30 text-butter-300 font-serif font-bold text-sm shadow">
                      {formatCurrency(dish.priceCents, currency)}
                    </div>
                  </div>

                  {/* Dish Descriptions */}
                  <div className="p-6 md:p-8 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xl md:text-2xl font-medium text-stone-100 group-hover:text-butter-300 transition-colors">
                        {dish.title}
                      </h4>
                      <p className="text-xs text-stone-400 italic font-serif mt-0.5">{dish.titleFr}</p>
                      <p className="text-xs text-stone-300 leading-relaxed pt-2 font-sans">{dish.desc}</p>

                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {dish.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-lg bg-espresso-950/80 border border-stone-200/10 text-[10px] text-stone-300 font-medium"
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
                        className="px-4 py-2 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-semibold hover:bg-bordeaux-700 transition-all shadow-md active:scale-95"
                      >
                        Reserve Table
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Interactive Custom Tasting Calculator (Flagship Calculation Tool) */}
        <section className="space-y-4">
          <TastingCalculator
            currency={currency}
            onReserveWithEstimate={(summary) => {
              setIsReservationOpen(true);
            }}
          />
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

      {/* European Compliance Footer */}
      <footer className="border-t border-stone-200/10 bg-espresso-950/95 py-10 px-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-stone-200 text-sm font-medium">L&apos;Étoile & Terroir • 14 Rue Saint-Honoré, Paris</p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Designed by Mitul Kabir Badhon • Michelin Guide Contender
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/" className="hover:text-stone-200 transition-colors">Master Demos</Link>
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
