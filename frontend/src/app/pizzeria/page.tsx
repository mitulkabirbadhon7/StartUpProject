'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame, Clock, Award, MapPin, Wine, Check, Wheat } from 'lucide-react';
import ReservationDrawer from '@/components/reservation/ReservationDrawer';
import { formatCurrency } from '@/lib/utils';

const PIZZAS = [
  {
    id: 'piz-01',
    title: 'Margherita Verace D.O.P.',
    titleIt: 'La Vera Margherita Napoletana',
    desc: '48-hour wild sourdough crust, crushed San Marzano D.O.P., Mozzarella di Bufala Campana, fresh genovese basil, and monocultivar extra virgin olive oil.',
    priceCents: 1600,
    tags: ['Vegetarian', 'Classic Heritage', 'D.O.P. Certified'],
    pairAperitivo: 'Aperol Spritz Veneziano with Castelvetrano olive',
  },
  {
    id: 'piz-02',
    title: 'Tartufo & Funghi di Bosco',
    titleIt: 'Pizza Bianca con Tartufo Estivo',
    desc: 'Fior di latte di Agerola, sautéed wild chanterelles & porcini, shaved Norcia black truffle, and creamy mountain ricotta.',
    priceCents: 2400,
    tags: ['Vegetarian', 'Signature White'],
    pairAperitivo: '2021 Fiano di Avellino DOCG (Campania)',
  },
  {
    id: 'piz-03',
    title: 'Diavola Calabrese Piccante',
    titleIt: 'Diavola con Nduja di Spilinga',
    desc: 'Spicy artisan Salame di Napoli, artisanal soft ’Nduja from Spilinga, smoked scamorza, wild oregano, and hot chili-infused honey drizzle.',
    priceCents: 2100,
    tags: ['Spicy', 'Signature'],
    pairAperitivo: '2020 Aglianico del Vulture (Basilicata)',
  },
  {
    id: 'piz-04',
    title: 'Marinara ai Quattro Pomodori',
    titleIt: 'Marinara Antica Vegana',
    desc: 'Four heirloom Campania tomatoes (Corbarino, Piennolo del Vesuvio, Datterino, San Marzano), wild mountain oregano, crispy garlic flakes, zero cheese.',
    priceCents: 1400,
    tags: ['100% Vegan', 'Dairy-Free', 'Heritage'],
    pairAperitivo: 'Negroni Sbagliato or Biodynamic Orange Wine',
  },
];

export default function PizzeriaPage() {
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'EUR' | 'GBP' | 'CHF'>('EUR');
  const [filter, setFilter] = useState<string>('all');

  const filteredPizzas = filter === 'all'
    ? PIZZAS
    : PIZZAS.filter((p) => {
        if (filter === 'vegan') return p.tags.includes('100% Vegan');
        if (filter === 'vegetarian') return p.tags.includes('Vegetarian') || p.tags.includes('100% Vegan');
        return true;
      });

  return (
    <div className="min-h-screen bg-hearth-950 text-stone-100 flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-30 pizzeria-glass border-b border-terracotta-600/20 px-6 py-4">
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
              Lievito Madre
            </h1>
            <p className="text-[10px] text-amber-500 tracking-widest uppercase font-semibold">
              Pizzeria Artigianale Napoletana • Napoli Centro
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-hearth-900 rounded-lg p-0.5 border border-terracotta-600/20 text-xs font-mono">
              {(['EUR', 'GBP', 'CHF'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    currency === c ? 'bg-terracotta-600 text-stone-100' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {c === 'EUR' ? '€' : c === 'GBP' ? '£' : 'CHF'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-4 py-2 rounded-xl bg-terracotta-600 text-stone-100 text-xs font-medium hover:bg-terracotta-700 transition-colors shadow-lg"
            >
              Book Table
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden pizzeria-glass border border-terracotta-600/20 p-8 md:p-14 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-900/60 border border-terracotta-600/40 text-amber-500 text-xs uppercase tracking-widest font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>450°C Birchwood Hearth</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-medium text-stone-100 mb-4">
            48 Ore di Fermentazione Naturale
          </h2>
          <p className="text-xs md:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Every pizza begins with our hundred-year-old sourdough starter (Lievito Madre), organic stone-milled Campania grains, and 85% hydration dough proofed for 48 hours to ensure airy digestibility and unmistakable blistered crust.
          </p>

          {/* Sourdough Process Visualizer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-terracotta-600/20 text-xs">
            <div className="p-3 rounded-xl bg-hearth-900/80 border border-terracotta-600/10">
              <Wheat className="w-4 h-4 text-amber-500 mx-auto mb-1.5" />
              <p className="font-serif font-semibold text-stone-200">Tipo 1 & Integrale</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Stone-Milled Grain</p>
            </div>
            <div className="p-3 rounded-xl bg-hearth-900/80 border border-terracotta-600/10">
              <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1.5" />
              <p className="font-serif font-semibold text-stone-200">48-Hour Cold Proof</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Slow Fermentation</p>
            </div>
            <div className="p-3 rounded-xl bg-hearth-900/80 border border-terracotta-600/10">
              <Flame className="w-4 h-4 text-amber-500 mx-auto mb-1.5" />
              <p className="font-serif font-semibold text-stone-200">450°C Wood Fire</p>
              <p className="text-[10px] text-stone-400 mt-0.5">90-Second Blister</p>
            </div>
            <div className="p-3 rounded-xl bg-hearth-900/80 border border-terracotta-600/10">
              <Award className="w-4 h-4 text-amber-500 mx-auto mb-1.5" />
              <p className="font-serif font-semibold text-stone-200">D.O.P. Ingredients</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Certified Provenance</p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl pizzeria-glass border border-terracotta-600/20">
          <div>
            <h4 className="font-serif text-lg text-stone-100 font-medium">Artisanal Pizza Selection</h4>
            <p className="text-xs text-stone-400">Baked fresh in our Stefano Ferrara wood-fired oven.</p>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f.id
                    ? 'bg-terracotta-600 text-stone-100 shadow'
                    : 'bg-hearth-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Pizza Catalog */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="pizzeria-glass rounded-2xl p-6 border border-terracotta-600/20 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl font-medium text-stone-100">{pizza.title}</h3>
                  <span className="font-serif font-semibold text-lg text-amber-500">
                    {formatCurrency(pizza.priceCents, currency)}
                  </span>
                </div>
                <p className="text-xs text-stone-400 italic font-serif">{pizza.titleIt}</p>
                <p className="text-xs text-stone-300 leading-relaxed pt-1">{pizza.desc}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {pizza.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-hearth-950 border border-terracotta-600/10 text-[10px] text-stone-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-terracotta-600/15 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-stone-400">
                  <Wine className="w-3.5 h-3.5 text-terracotta-500" />
                  <span className="text-[11px]">Pair: <em>{pizza.pairAperitivo}</em></span>
                </div>

                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-terracotta-600 text-stone-100 font-medium hover:bg-terracotta-700 transition-colors shadow"
                >
                  Book Table
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-terracotta-600/20 bg-hearth-950/95 py-10 px-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-stone-200 text-sm">Lievito Madre • Via dei Tribunali 32, Napoli Centro</p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Pizzeria Artigianale Napoletana • Designed by Mitul Kabir Badhon
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <Link href="/" className="hover:text-stone-200 transition-colors">Master Portal</Link>
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
