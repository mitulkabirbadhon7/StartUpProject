'use client';

import React from 'react';
import { Wine, X, Thermometer, Globe, Award, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface WinePairingData {
  wineName: string;
  vintage: number;
  region: string;
  type: string;
  bottlePriceCents: number;
  glassPriceCents?: number;
  tastingNotes: string;
  radar: {
    acidity: number; // 1-5
    tannins: number; // 1-5
    body: number;    // 1-5
    oak: number;     // 1-5
    intensity: number;// 1-5
  };
}

interface WinePairingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dishTitle: string;
  pairing: WinePairingData | null;
}

export default function WinePairingDrawer({
  isOpen,
  onClose,
  dishTitle,
  pairing,
}: WinePairingDrawerProps) {
  if (!isOpen || !pairing) return null;

  // Radar Polygon Calculation (5 axes, centered at 150, 150 with radius 90)
  const center = 150;
  const maxRadius = 90;
  const axes = [
    { label: 'Acidity', value: pairing.radar.acidity, angle: -Math.PI / 2 },
    { label: 'Tannins', value: pairing.radar.tannins, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { label: 'Body', value: pairing.radar.body, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { label: 'Oak', value: pairing.radar.oak, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { label: 'Intensity', value: pairing.radar.intensity, angle: -Math.PI / 2 + (8 * Math.PI) / 5 },
  ];

  const polygonPoints = axes
    .map((axis) => {
      const r = (axis.value / 5) * maxRadius;
      const x = center + r * Math.cos(axis.angle);
      const y = center + r * Math.sin(axis.angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bistro-glass rounded-3xl border border-stone-200/20 shadow-2xl p-6 md:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-espresso-900/80 text-stone-300 hover:text-stone-100 hover:bg-espresso-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sommelier Badge */}
        <div className="flex items-center gap-2 text-butter-300 text-xs font-bold uppercase tracking-widest mb-2">
          <Wine className="w-4 h-4 text-bordeaux-600" />
          <span>Sommelier Table Selection</span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-medium text-stone-100">
          {pairing.wineName}
        </h3>
        <p className="text-xs text-stone-400 mt-1 flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-butter-300" />
          {pairing.region} • Vintage {pairing.vintage}
        </p>

        {/* Paired Dish Context */}
        <div className="mt-4 p-3 rounded-xl bg-bordeaux-950/40 border border-bordeaux-800/30 text-xs">
          <span className="text-stone-400">Curated to harmonize with:</span>{' '}
          <strong className="text-butter-300 font-serif">{dishTitle}</strong>
        </div>

        {/* Flavor Radar & Tasting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
          {/* SVG 5-Axis Radar Chart */}
          <div className="relative w-full aspect-square max-w-[260px] mx-auto flex items-center justify-center bg-espresso-950/60 rounded-2xl border border-stone-200/5 p-2">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Background Concentric Circles */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={maxRadius * level}
                  fill="none"
                  stroke="rgba(247, 244, 238, 0.08)"
                  strokeWidth="1"
                />
              ))}

              {/* Axes Lines & Labels */}
              {axes.map((axis, i) => {
                const x2 = center + maxRadius * Math.cos(axis.angle);
                const y2 = center + maxRadius * Math.sin(axis.angle);
                const labelX = center + (maxRadius + 22) * Math.cos(axis.angle);
                const labelY = center + (maxRadius + 18) * Math.sin(axis.angle);

                return (
                  <g key={i}>
                    <line
                      x1={center}
                      y1={center}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(247, 244, 238, 0.15)"
                      strokeWidth="1"
                    />
                    <text
                      x={labelX}
                      y={labelY}
                      fill="#ddd4c4"
                      fontSize="10"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="var(--font-sans)"
                      fontWeight="500"
                    >
                      {axis.label}
                    </text>
                  </g>
                );
              })}

              {/* Dynamic Filled Polygon */}
              <polygon
                points={polygonPoints}
                fill="rgba(94, 25, 36, 0.55)"
                stroke="#f3e5ab"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Tasting Notes & Sensory Profile */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Cellar Tasting Profile
              </span>
              <p className="text-xs text-stone-200 mt-1 leading-relaxed italic font-serif">
                &ldquo;{pairing.tastingNotes}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-butter-300" />
                  Service Temperature
                </span>
                <span className="text-stone-200 font-medium">11°C – 13°C</span>
              </div>

              {pairing.glassPriceCents && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">By the Glass (125ml)</span>
                  <span className="text-butter-300 font-serif font-semibold">
                    {formatCurrency(pairing.glassPriceCents)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Bottle (750ml)</span>
                <span className="text-butter-300 font-serif font-semibold text-sm">
                  {formatCurrency(pairing.bottlePriceCents)}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-espresso-950/90 border border-stone-200/10 flex items-center gap-2 text-[11px] text-stone-300">
              <Award className="w-3.5 h-3.5 text-butter-300 shrink-0" />
              <span>Sourced directly from certified biodynamic European domains.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
