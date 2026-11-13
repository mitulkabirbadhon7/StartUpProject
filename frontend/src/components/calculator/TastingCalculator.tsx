'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Wine, Users, Sparkles, Clock, Check, ChevronRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { formatCurrency } from '@/lib/utils';

interface TastingCalculatorProps {
  onReserveWithEstimate?: (summary: {
    experience: string;
    pairing: string;
    guests: number;
    totalCents: number;
  }) => void;
  currency?: 'EUR' | 'GBP' | 'CHF';
}

const EXPERIENCES = [
  { id: '3-course', name: '3-Course Terroir Discovery', priceCents: 8500, duration: '1h 45m', desc: 'Starter, Choice of Main, Artisan Dessert' },
  { id: '5-course', name: '5-Course Grand Terroir', priceCents: 14500, duration: '2h 30m', desc: 'Amuse-bouche, Turbot, Périgord Tagliolini, Pyrenean Lamb, Soufflé' },
  { id: '7-course', name: "7-Course L'Étoile Prestige", priceCents: 21500, duration: '3h 30m', desc: 'The full chef manifesto with caviar, foie gras torchon, and vintage cheese trolley' },
];

const PAIRINGS = [
  { id: 'none', name: 'A La Carte Cellar Selection', priceCents: 0, desc: 'Select bottles from our 1,400-reference wine list at the table' },
  { id: 'classic', name: 'Estate Burgundy & Bordeaux Flight', priceCents: 7500, desc: 'Domaine Leflaive, Château Pontet-Canet, and Sauternes Grand Cru' },
  { id: 'rare', name: 'Old & Rare Sommelier Vault', priceCents: 14500, desc: 'Pre-phylloxera parcels, allocated Grand Crus, and back-vintage gems' },
  { id: 'botanical', name: 'Botanical & Herbal Infusions (Non-Alcoholic)', priceCents: 4500, desc: 'Artisanal cold-extracted teas, fermented mountain shrubs, and floral tonics' },
];

export default function TastingCalculator({
  onReserveWithEstimate,
  currency,
}: TastingCalculatorProps) {
  const { currency: globalCurrency, formatPrice } = useCurrency();
  const [selectedExp, setSelectedExp] = useState<string>('5-course');
  const [selectedPairing, setSelectedPairing] = useState<string>('classic');
  const [guests, setGuests] = useState<number>(2);
  const [includeCheeseTrolley, setIncludeCheeseTrolley] = useState<boolean>(true);
  const [includeChampagneArrival, setIncludeChampagneArrival] = useState<boolean>(true);

  const expObj = EXPERIENCES.find((e) => e.id === selectedExp)!;
  const pairObj = PAIRINGS.find((p) => p.id === selectedPairing)!;

  const cheeseCentsPerGuest = includeCheeseTrolley ? 2200 : 0;
  const champagneCentsPerGuest = includeChampagneArrival ? 2800 : 0;

  const perGuestTotalCents = expObj.priceCents + pairObj.priceCents + cheeseCentsPerGuest + champagneCentsPerGuest;
  const grandTotalCents = perGuestTotalCents * guests;

  return (
    <div className="w-full max-w-full overflow-hidden bistro-glass rounded-3xl p-6 md:p-10 border border-stone-200/15 shadow-2xl relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 md:w-96 h-80 md:h-96 bg-bordeaux-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/10">
        <div>
          <div className="flex items-center gap-2 text-butter-300 text-xs font-bold uppercase tracking-widest mb-1">
            <Calculator className="w-4 h-4 text-bordeaux-600" />
            <span>Interactive Gastronomy Estimator</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-medium">
            Custom Tasting Menu & Sommelier Experience Calculator
          </h3>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Design your personalized culinary journey. Real-time pricing with sommelier flight pairings and service duration estimates.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-espresso-950/80 border border-stone-200/10 text-xs self-start md:self-auto">
          <Clock className="w-4 h-4 text-butter-300" />
          <span className="text-stone-300">Estimated Service:</span>
          <strong className="text-stone-100 font-serif">{expObj.duration}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Step 1 & 2 Controls (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Party Size Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-butter-300" />
                Party Size
              </span>
              <span className="text-butter-300 font-mono font-bold">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 4, 6, 8, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuests(num)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                    guests === num
                      ? 'bg-bordeaux-800 text-stone-100 border-butter-300/50 shadow-md'
                      : 'bg-espresso-900/60 text-stone-400 border-stone-200/10 hover:border-stone-200/20'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Tasting Menu Tier Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2">
              Select Tasting Menu Tier
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExp(exp.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedExp === exp.id
                      ? 'bg-bordeaux-950/70 border-butter-300/50 shadow-xl'
                      : 'bg-espresso-900/60 border-stone-200/10 hover:border-stone-200/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif text-sm font-medium text-stone-100">{exp.name}</h4>
                      {selectedExp === exp.id && <Check className="w-4 h-4 text-butter-300 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug">{exp.desc}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-200/10 flex items-baseline justify-between">
                    <span className="text-[10px] text-stone-400 font-mono">{exp.duration}</span>
                    <span className="font-serif font-semibold text-sm text-bordeaux-400">
                      {formatPrice(exp.priceCents)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sommelier Pairing Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2 flex items-center gap-1.5">
              <Wine className="w-3.5 h-3.5 text-bordeaux-600" />
              Sommelier Wine & Beverage Pairing
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PAIRINGS.map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => setSelectedPairing(pair.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedPairing === pair.id
                      ? 'bg-bordeaux-950/70 border-butter-300/50 shadow-md'
                      : 'bg-espresso-900/60 border-stone-200/10 hover:border-stone-200/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs font-medium text-stone-100">{pair.name}</span>
                    <span className="text-xs font-mono font-semibold text-butter-300">
                      {pair.priceCents === 0 ? 'Table Choice' : `+${formatPrice(pair.priceCents)}`}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1 leading-snug">{pair.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Luxury Add-ons */}
          <div className="pt-2 flex flex-wrap gap-4">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-espresso-900/50 border border-stone-200/10 cursor-pointer text-xs flex-1">
              <input
                type="checkbox"
                checked={includeChampagneArrival}
                onChange={(e) => setIncludeChampagneArrival(e.target.checked)}
                className="rounded bg-espresso-900 border-stone-200/20 text-bordeaux-800 focus:ring-0"
              />
              <div>
                <span className="font-medium text-stone-200">Champagne Grand Cru Arrival</span>
                <p className="text-[10px] text-stone-400">+{formatPrice(2800)} per guest (Egly-Ouriet Brut Tradition)</p>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-espresso-900/50 border border-stone-200/10 cursor-pointer text-xs flex-1">
              <input
                type="checkbox"
                checked={includeCheeseTrolley}
                onChange={(e) => setIncludeCheeseTrolley(e.target.checked)}
                className="rounded bg-espresso-900 border-stone-200/20 text-bordeaux-800 focus:ring-0"
              />
              <div>
                <span className="font-medium text-stone-200">Affiné French Cheese Trolley</span>
                <p className="text-[10px] text-stone-400">+{formatPrice(2200)} per guest (5 raw-milk selections)</p>
              </div>
            </label>
          </div>
        </div>

        {/* Live Bill Summary Card (Right Column) */}
        <div className="p-6 rounded-3xl bg-espresso-950 border border-stone-200/15 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-stone-200/10">
              <span className="text-[10px] uppercase tracking-widest text-butter-300 font-bold">
                Tasting Pro Forma
              </span>
              <h4 className="font-serif text-xl font-medium text-stone-100 mt-0.5">
                Experience Overview
              </h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>{expObj.name} (x{guests})</span>
                <span className="font-mono text-stone-100">
                  {formatPrice(expObj.priceCents * guests)}
                </span>
              </div>

              {pairObj.priceCents > 0 && (
                <div className="flex justify-between text-stone-300">
                  <span>{pairObj.name} (x{guests})</span>
                  <span className="font-mono text-stone-100">
                    {formatPrice(pairObj.priceCents * guests)}
                  </span>
                </div>
              )}

              {includeChampagneArrival && (
                <div className="flex justify-between text-stone-300">
                  <span>Champagne Arrival (x{guests})</span>
                  <span className="font-mono text-stone-100">
                    {formatPrice(champagneCentsPerGuest * guests)}
                  </span>
                </div>
              )}

              {includeCheeseTrolley && (
                <div className="flex justify-between text-stone-300">
                  <span>Affiné Cheese Trolley (x{guests})</span>
                  <span className="font-mono text-stone-100">
                    {formatPrice(cheeseCentsPerGuest * guests)}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-200/10 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400">Per Guest Average:</span>
                <span className="font-serif font-semibold text-base text-butter-300">
                  {formatPrice(perGuestTotalCents)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-serif font-medium text-stone-100">Grand Total:</span>
                <span className="font-serif font-bold text-2xl text-bordeaux-400">
                  {formatPrice(grandTotalCents)}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 text-right">
                Includes all taxes & European service charge.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                if (onReserveWithEstimate) {
                  onReserveWithEstimate({
                    experience: expObj.name,
                    pairing: pairObj.name,
                    guests,
                    totalCents: grandTotalCents,
                  });
                }
              }}
              aria-label="Book This Curated Experience"
              className="w-full py-3.5 rounded-2xl bg-bordeaux-800 text-stone-100 text-xs font-semibold hover:bg-bordeaux-700 transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>Book This Curated Experience</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Quick-Reserve Bar */}
      <div className="lg:hidden sticky bottom-4 z-20 mt-6 p-4 rounded-2xl bg-espresso-950/95 backdrop-blur-md border border-butter-300/30 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-butter-300 font-semibold block">Total ({guests} Guests)</span>
          <span className="font-serif font-bold text-lg text-bordeaux-400">{formatPrice(grandTotalCents)}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (onReserveWithEstimate) {
              onReserveWithEstimate({
                experience: expObj.name,
                pairing: pairObj.name,
                guests,
                totalCents: grandTotalCents,
              });
            }
          }}
          aria-label="Book this curated experience"
          className="px-4 py-2.5 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-semibold hover:bg-bordeaux-700 transition-all shadow-lg flex items-center gap-1.5"
        >
          <span>Book Experience</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
