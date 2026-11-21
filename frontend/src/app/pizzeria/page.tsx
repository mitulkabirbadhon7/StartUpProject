'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame, Clock, Sparkles, MapPin, Wine, Check, Wheat, Star, ChevronRight, Users, Calculator } from 'lucide-react';
import ReservationDrawer from '@/components/reservation/ReservationDrawer';
import FermentationVisualizer from '@/components/pizzeria/FermentationVisualizer';
import TiltCard from '@/components/ui/TiltCard';
import BlurText from '@/components/ui/BlurText';
import { useCurrency } from '@/context/CurrencyContext';
import { formatCurrency } from '@/lib/utils';

const PIZZAS = [
  {
    id: 'piz-01',
    title: 'Margherita Verace D.O.P.',
    titleIt: 'La Vera Margherita Napoletana',
    desc: '48-hour wild sourdough crust, crushed San Marzano D.O.P., Mozzarella di Bufala Campana, fresh genovese basil, and monocultivar extra virgin olive oil.',
    priceCents: 1600,
    tags: ['Vegetarian', 'Classic Heritage', 'D.O.P. Certified'],
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop',
    pairAperitivo: 'Aperol Spritz Veneziano with Castelvetrano olive',
  },
  {
    id: 'piz-02',
    title: 'Tartufo & Funghi di Bosco',
    titleIt: 'Pizza Bianca con Tartufo Estivo',
    desc: 'Fior di latte di Agerola, sautéed wild chanterelles & porcini, shaved Norcia black truffle, and creamy mountain ricotta.',
    priceCents: 2400,
    tags: ['Vegetarian', 'Signature White'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    pairAperitivo: '2021 Fiano di Avellino DOCG (Campania)',
  },
  {
    id: 'piz-03',
    title: 'Diavola Calabrese Piccante',
    titleIt: 'Diavola con Nduja di Spilinga',
    desc: 'Spicy artisan Salame di Napoli, artisanal soft ’Nduja from Spilinga, smoked scamorza, wild oregano, and hot chili-infused honey drizzle.',
    priceCents: 2100,
    tags: ['Spicy', 'Signature'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    pairAperitivo: '2020 Aglianico del Vulture (Basilicata)',
  },
  {
    id: 'piz-04',
    title: 'Marinara ai Quattro Pomodori',
    titleIt: 'Marinara Antica Vegana',
    desc: 'Four heirloom Campania tomatoes (Corbarino, Piennolo del Vesuvio, Datterino, San Marzano), wild mountain oregano, crispy garlic flakes, zero cheese.',
    priceCents: 1400,
    tags: ['100% Vegan', 'Dairy-Free', 'Heritage'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
    pairAperitivo: 'Negroni Sbagliato or Biodynamic Orange Wine',
  },
];

export default function PizzeriaPage() {
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [filter, setFilter] = useState<string>('all');

  // Interactive Pizza Feast & Group Estimator
  const [partySize, setPartySize] = useState<number>(4);
  const [crustStyle, setCrustStyle] = useState<'heritage' | 'gluten_free'>('heritage');
  const [includeAntipasti, setIncludeAntipasti] = useState<boolean>(true);
  const [includeSpritzPitcher, setIncludeSpritzPitcher] = useState<boolean>(true);

  const basePizzaPerPersonCents = 1800;
  const antipastiPerPersonCents = includeAntipasti ? 950 : 0;
  const spritzPerPersonCents = includeSpritzPitcher ? 850 : 0;
  const crustAddonCents = crustStyle === 'gluten_free' ? 300 : 0;

  const totalFeastCents = (basePizzaPerPersonCents + antipastiPerPersonCents + spritzPerPersonCents + crustAddonCents) * partySize;

  const filteredPizzas = filter === 'all'
    ? PIZZAS
    : PIZZAS.filter((p) => {
        if (filter === 'vegan') return p.tags.includes('100% Vegan');
        if (filter === 'vegetarian') return p.tags.includes('Vegetarian') || p.tags.includes('100% Vegan');
        return true;
      });

  return (
    <div className="min-h-screen bg-hearth-950 text-stone-100 flex flex-col justify-between selection:bg-terracotta-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 pizzeria-glass border-b border-terracotta-600/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-400 hover:text-stone-100 text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Master Demos Portal</span>
          </Link>

          <Link
            href="/pizzeria"
            aria-label="Lievito Madre - Return to Pizzeria Home"
            className="group flex flex-col items-center text-center transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl px-2 py-1"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-full bg-terracotta-700/80 border border-amber-500/40 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-terracotta-600 transition-all shadow-sm">
                <Flame className="w-2.5 h-2.5" />
              </div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-stone-100 tracking-tight group-hover:text-amber-400 transition-colors">
                Lievito Madre
              </h1>
            </div>
            <p className="text-[10px] text-amber-500 tracking-widest uppercase font-semibold">
              Pizzeria Artigianale Napoletana • Napoli Centro
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-hearth-900 rounded-xl p-0.5 border border-terracotta-600/20 text-xs font-mono">
              {(['EUR', 'GBP', 'CHF'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    currency === c ? 'bg-terracotta-600 text-stone-100 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {c === 'EUR' ? '€' : c === 'GBP' ? '£' : 'CHF'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-4 py-2 rounded-xl bg-terracotta-600 text-stone-100 text-xs font-semibold hover:bg-terracotta-700 transition-colors shadow-lg active:scale-95"
            >
              Book Table
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full space-y-20">
        {/* Hero Section with Roaring Stefano Ferrara Oven Photography */}
        <section className="relative rounded-3xl overflow-hidden pizzeria-glass border border-terracotta-600/20 p-8 md:p-16 text-center max-w-5xl mx-auto shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop')",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta-900/80 border border-amber-500/40 text-amber-400 text-xs uppercase tracking-widest font-semibold shadow-lg">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>450°C Birchwood Hearth • Stefano Ferrara Forno</span>
            </div>

            <div className="max-w-3xl mx-auto">
              <BlurText
                text="48 Ore di Fermentazione Naturale"
                className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium text-stone-100 tracking-tight leading-tight justify-center"
                delay={60}
              />
            </div>

            <p className="text-xs md:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Every pizza begins with our hundred-year-old sourdough starter, organic stone-milled Campania grains, and 85% hydration dough proofed for 48 hours to ensure airy digestibility and unmistakable leopard-blistered crust.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Lunch & Dinner: 12:00 – 23:30
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Via dei Tribunali 32, 80138 Napoli
              </span>
            </div>
          </motion.div>
        </section>

        {/* Interactive 48-Hour Fermentation Timeline Component */}
        <section className="space-y-4">
          <FermentationVisualizer />
        </section>

        {/* Filter Bar */}
        <section className="flex items-center justify-between flex-wrap gap-4 p-5 rounded-2xl pizzeria-glass border border-terracotta-600/20">
          <div>
            <h4 className="font-serif text-xl text-stone-100 font-medium">Artisanal Pizza Selection</h4>
            <p className="text-xs text-stone-400">Baked fresh in our Stefano Ferrara wood-fired oven for 90 seconds.</p>
          </div>

          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Pizzas' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'vegan', label: '100% Plant-Based' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filter === f.id
                    ? 'bg-terracotta-600 text-stone-100 shadow-md'
                    : 'bg-hearth-900 text-stone-400 hover:text-stone-200 border border-terracotta-600/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Pizza Catalog with High-Res Photography & 3D Tilt Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPizzas.length === 0 ? (
            <div className="col-span-full py-16 px-6 text-center pizzeria-glass rounded-3xl border border-terracotta-600/20 space-y-4">
              <Wheat className="w-8 h-8 text-amber-500/60 mx-auto" />
              <h4 className="font-serif text-xl text-stone-100">No Artisanal Pizzas Match This Category</h4>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Our pizzaiolo can tailor our sourdough crust with plant-based fior di latte and seasonal Vesuvio vegetables upon request.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="px-4 py-2 rounded-xl bg-terracotta-600 text-stone-100 text-xs font-semibold hover:bg-terracotta-700 transition-colors"
              >
                Show All Pizzas
              </button>
            </div>
          ) : (
            filteredPizzas.map((pizza) => (
              <TiltCard key={pizza.id} glowColor="rgba(217, 130, 43, 0.2)">
                <div className="pizzeria-glass rounded-3xl overflow-hidden border border-terracotta-600/20 shadow-2xl flex flex-col justify-between h-full group">
                  {/* Visual Image Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pizza.image}
                      alt={pizza.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hearth-950 via-hearth-950/20 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-hearth-950/90 backdrop-blur-md border border-amber-500/40 text-amber-400 font-serif font-bold text-sm shadow">
                      {formatPrice(pizza.priceCents)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-100 group-hover:text-amber-400 transition-colors">
                        {pizza.title}
                      </h3>
                      <p className="text-xs text-stone-400 italic font-serif mt-0.5">{pizza.titleIt}</p>
                      <p className="text-xs text-stone-300 leading-relaxed pt-2 font-sans">{pizza.desc}</p>

                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {pizza.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-lg bg-hearth-950/80 border border-terracotta-600/20 text-[10px] text-stone-300 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-terracotta-600/15 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-stone-400">
                        <Wine className="w-3.5 h-3.5 text-terracotta-500" />
                        <span className="text-[11px]">Pair: <em>{pizza.pairAperitivo}</em></span>
                      </div>

                      <button
                        onClick={() => setIsReservationOpen(true)}
                        aria-label={`Book Table for ${pizza.title}`}
                        className="px-4 py-2 rounded-xl bg-terracotta-600 text-stone-100 font-semibold hover:bg-terracotta-700 transition-colors shadow-md active:scale-95"
                      >
                        Book Table
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))
          )}
        </section>

        {/* Group Neapolitan Feast Calculator (Interactive Calculation Tool) */}
        <section className="pizzeria-glass rounded-3xl p-6 md:p-10 border border-terracotta-600/20 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-terracotta-600/20">
            <div>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">
                <Calculator className="w-4 h-4 text-terracotta-600" />
                <span>Group Dining Estimator</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-medium">
                Neapolitan Pizza Feast Calculator
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-xl">
                Planning a group dinner or celebration? Customize your family-style sourdough feast with antipasti and Aperol spritz pitchers.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-hearth-900 border border-terracotta-600/20 text-xs self-start md:self-auto">
              <span className="text-stone-400">Estimated Total:</span>{' '}
              <strong className="text-amber-400 font-serif text-base font-bold ml-1">
                {formatPrice(totalFeastCents)}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-2">Guests in Party</label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 4, 6, 8].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPartySize(n)}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                      partySize === n
                        ? 'bg-terracotta-600 text-stone-100 border-amber-500/50 shadow'
                        : 'bg-hearth-900 text-stone-400 border-terracotta-600/10 hover:border-terracotta-600/30'
                    }`}
                  >
                    {n} Guests
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-2">Dough Base</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCrustStyle('heritage')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    crustStyle === 'heritage'
                      ? 'bg-terracotta-600 text-stone-100 border-amber-500/50 shadow'
                      : 'bg-hearth-900 text-stone-400 border-terracotta-600/10'
                  }`}
                >
                  48h Sourdough
                </button>
                <button
                  type="button"
                  onClick={() => setCrustStyle('gluten_free')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    crustStyle === 'gluten_free'
                      ? 'bg-terracotta-600 text-stone-100 border-amber-500/50 shadow'
                      : 'bg-hearth-900 text-stone-400 border-terracotta-600/10'
                  }`}
                >
                  Gluten-Free (+{formatPrice(300)})
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300 mb-1">Add-On Bundles</label>
              <label className="flex items-center gap-2 p-2 rounded-xl bg-hearth-900/60 border border-terracotta-600/10 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAntipasti}
                  onChange={(e) => setIncludeAntipasti(e.target.checked)}
                  className="rounded bg-hearth-900 border-terracotta-600/20 text-terracotta-600 focus:ring-0"
                />
                <span className="text-stone-300">Campania Burrata & Prosciutto (+{formatPrice(950)}/p)</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-xl bg-hearth-900/60 border border-terracotta-600/10 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSpritzPitcher}
                  onChange={(e) => setIncludeSpritzPitcher(e.target.checked)}
                  className="rounded bg-hearth-900 border-terracotta-600/20 text-terracotta-600 focus:ring-0"
                />
                <span className="text-stone-300">Aperol Spritz Pitcher (+{formatPrice(850)}/p)</span>
              </label>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-terracotta-600/20 flex items-center justify-between">
            <span className="text-xs text-stone-400">
              Estimated per guest: <strong className="text-amber-400 font-mono">{formatPrice(Math.round(totalFeastCents / partySize))}</strong>
            </span>
            <button
              onClick={() => setIsReservationOpen(true)}
              aria-label={`Reserve Feast for ${partySize} Guests`}
              className="px-6 py-3 rounded-xl bg-terracotta-600 text-stone-100 text-xs font-semibold hover:bg-terracotta-700 transition-colors shadow-lg"
            >
              Reserve Feast for {partySize} Guests
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-terracotta-600/20 bg-hearth-950/95 py-10 px-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/pizzeria" aria-label="Lievito Madre Napoli" className="group block">
            <p className="font-serif text-stone-200 text-sm font-medium group-hover:text-amber-400 transition-colors">
              Lievito Madre • Via dei Tribunali 32, Napoli
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Designed by Mitul Kabir Badhon • Stefano Ferrara 450°C Wood-Fired Hearth
            </p>
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/" className="hover:text-stone-200 transition-colors">Master Demos</Link>
            <Link href="/bistro" className="hover:text-stone-200 transition-colors">Bistro Demo</Link>
            <Link href="/impressum" className="hover:text-stone-200 transition-colors">Impressum (Legal)</Link>
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">GDPR Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Reservation Drawer */}
      <ReservationDrawer
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        restaurantSlug="lievito-madre"
      />
    </div>
  );
}
