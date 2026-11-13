'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wheat, Clock, Flame, Sparkles, Thermometer, Droplet, CheckCircle2 } from 'lucide-react';

const STAGES = [
  {
    step: 1,
    title: 'Stone-Milled Campania Heritage Grains',
    italianTitle: 'Macinazione a Pietra Naturale',
    duration: 'Hour 0',
    temp: '21°C',
    hydration: '0%',
    desc: 'Unbleached organic Italian soft wheat blended with ancient grains. Retains the wheat germ and high mineral ash content, delivering nutty aromas and golden crust coloration.',
    highlight: 'Zero additives or industrial improvers',
    icon: Wheat,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
  },
  {
    step: 2,
    title: '85% Hydration & Lievito Madre Inoculation',
    italianTitle: 'Impasto ad Alta Idratazione con Pasta Madre',
    duration: 'Hour 2 – 4',
    temp: '23°C',
    hydration: '85%',
    desc: 'Our living mother culture (originating in 1924 in Naples) is folded with pure mineral water and sea salt. Gentle basin folding creates gluten sheets without mechanical friction heating.',
    highlight: 'Wild lactobacillus & saccharomyces biodiversity',
    icon: Droplet,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
  },
  {
    step: 3,
    title: '48-Hour Controlled Cold Fermentation',
    italianTitle: 'Maturazione Lenta a Bassa Temperatura',
    duration: 'Hour 4 – 48',
    temp: '4°C Controlled',
    hydration: '85%',
    desc: 'The dough rests in cedar troughs in our chilled fermentation vault. Complex starches break down into digestible simple sugars. Proteins relax, eliminating the heavy bloating common in quick-yeasted pizza.',
    highlight: 'Maximum aroma complexity & effortless digestion',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
  },
  {
    step: 4,
    title: '450°C Stefano Ferrara Birchwood Blister',
    italianTitle: 'Cottura nel Forno a Legna Napoletano',
    duration: '90 Seconds',
    temp: '450°C Stone',
    hydration: 'Crust Crisp / Core Soft',
    desc: 'Hand-stretched without rolling pins to push air bubbles into the outer rim. Baked for just 90 seconds over dried oak and birchwood, forming charred leopard blisters while preserving fresh Mozzarella di Bufala moisture.',
    highlight: 'Iconic leopard cornicione with cloud-like interior',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop',
  },
];

export default function FermentationVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(3); // Default on 48h fermentation
  const current = STAGES.find((s) => s.step === activeStep)!;
  const IconComponent = current.icon;

  return (
    <div className="w-full pizzeria-glass rounded-3xl p-6 md:p-10 border border-terracotta-600/20 shadow-2xl overflow-hidden relative">
      {/* Background ambient fire glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-terracotta-600/20">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500">
            Artisanal Fermentation Science
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-medium mt-0.5">
            The 48-Hour Sourdough Journey
          </h3>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Interactive breakdown of why our sourdough crust delivers unmatched digestible lightness and wood-fired blistered texture.
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-hearth-900 rounded-xl border border-terracotta-600/20 self-start md:self-auto">
          {STAGES.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeStep === s.step
                  ? 'bg-terracotta-600 text-stone-100 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Step Selector Timeline Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {STAGES.map((s) => {
          const SIcon = s.icon;
          const isSelected = activeStep === s.step;

          return (
            <div
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-terracotta-900/60 border-amber-500/60 shadow-lg'
                  : 'bg-hearth-900/50 border-terracotta-600/10 hover:border-terracotta-600/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase">{s.duration}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <h5 className="font-serif text-xs font-medium text-stone-100 line-clamp-1">{s.title}</h5>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Display with Photography */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-hearth-900/40 rounded-2xl p-6 border border-terracotta-600/15"
        >
          {/* Text Specification (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-terracotta-600/20 text-amber-400 border border-terracotta-600/30">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                  Phase {current.step} of 4 • {current.duration}
                </span>
                <h4 className="font-serif text-xl md:text-2xl font-medium text-stone-100">
                  {current.title}
                </h4>
              </div>
            </div>

            <p className="text-xs text-stone-400 italic font-serif">
              {current.italianTitle}
            </p>

            <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
              {current.desc}
            </p>

            {/* Scientific Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-terracotta-600/15 text-xs">
              <div className="p-2.5 rounded-xl bg-hearth-950/70 border border-terracotta-600/10">
                <div className="flex items-center gap-1.5 text-stone-400 text-[10px] uppercase">
                  <Thermometer className="w-3 h-3 text-amber-400" />
                  Temperature
                </div>
                <p className="font-mono font-semibold text-stone-100 mt-0.5">{current.temp}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-hearth-950/70 border border-terracotta-600/10">
                <div className="flex items-center gap-1.5 text-stone-400 text-[10px] uppercase">
                  <Droplet className="w-3 h-3 text-amber-400" />
                  Hydration Rate
                </div>
                <p className="font-mono font-semibold text-stone-100 mt-0.5">{current.hydration}</p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-hearth-950/70 border border-terracotta-600/10">
                <div className="flex items-center gap-1.5 text-stone-400 text-[10px] uppercase">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Key Benefit
                </div>
                <p className="text-[11px] text-amber-300 line-clamp-1 mt-0.5">{current.highlight}</p>
              </div>
            </div>
          </div>

          {/* High-Resolution Photography (5 Columns) */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-terracotta-600/30 shadow-2xl group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hearth-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-hearth-950/80 backdrop-blur-md border border-white/10 text-[11px] text-stone-200">
              <span className="text-amber-400 font-bold uppercase text-[9px] tracking-wider block">Live Camera</span>
              Napoli Production Laboratory • Lievito Madre Artisans
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
