'use client';

import React, { useState } from 'react';
import { Users, Info, Check, Sparkles, MapPin, ChevronRight, Eye } from 'lucide-react';

export interface TableItem {
  id: string;
  tableNumber: string;
  zone: 'terrace' | 'main_hall' | 'wine_bar' | 'chef_counter';
  zoneName: string;
  capacity: number;
  shape: 'circular' | 'rectangular' | 'booth' | 'counter';
  x: number;
  y: number;
  isAvailable: boolean;
  viewImage: string;
  vantageNote: string;
}

const TABLES_DATA: TableItem[] = [
  // Terrace & Garden
  {
    id: 't1',
    tableNumber: 'T1',
    zone: 'terrace',
    zoneName: 'Heated Garden Terrace',
    capacity: 2,
    shape: 'circular',
    x: 80,
    y: 110,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Intimate candlelit corner surrounded by climbing jasmine and bronze gas heaters.',
  },
  {
    id: 't2',
    tableNumber: 'T2',
    zone: 'terrace',
    zoneName: 'Heated Garden Terrace',
    capacity: 4,
    shape: 'circular',
    x: 80,
    y: 220,
    isAvailable: false,
    viewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Central terrace pergola beneath heritage Parisian bistro lanterns.',
  },
  {
    id: 't3',
    tableNumber: 'T3',
    zone: 'terrace',
    zoneName: 'Heated Garden Terrace',
    capacity: 6,
    shape: 'rectangular',
    x: 80,
    y: 350,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Spacious teak table overlooking the private courtyard fountain.',
  },

  // Main Dining Hall
  {
    id: 'm1',
    tableNumber: 'M1',
    zone: 'main_hall',
    zoneName: 'Grand Dining Hall',
    capacity: 2,
    shape: 'circular',
    x: 300,
    y: 110,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Direct view of the antique fireplace and live acoustic jazz salon.',
  },
  {
    id: 'm2',
    tableNumber: 'M2',
    zone: 'main_hall',
    zoneName: 'Grand Dining Hall',
    capacity: 4,
    shape: 'rectangular',
    x: 440,
    y: 110,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'French oak table with linen upholstery and silver candelabra.',
  },
  {
    id: 'm3',
    tableNumber: 'M3',
    zone: 'main_hall',
    zoneName: 'Grand Dining Hall',
    capacity: 4,
    shape: 'rectangular',
    x: 300,
    y: 240,
    isAvailable: false,
    viewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Quiet alcove adjacent to the sommelier decanting station.',
  },
  {
    id: 'm4',
    tableNumber: 'M4',
    zone: 'main_hall',
    zoneName: 'Grand Dining Hall',
    capacity: 8,
    shape: 'booth',
    x: 440,
    y: 240,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Deep Bordeaux velvet banquette booth ideal for family tasting celebrations.',
  },

  // Wine Vault
  {
    id: 'w1',
    tableNumber: 'W1',
    zone: 'wine_bar',
    zoneName: 'Sommelier Wine Vault',
    capacity: 2,
    shape: 'circular',
    x: 680,
    y: 110,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Surrounded by 1,400 allocated Grand Cru bottles behind climate glass.',
  },
  {
    id: 'w2',
    tableNumber: 'W2',
    zone: 'wine_bar',
    zoneName: 'Sommelier Wine Vault',
    capacity: 4,
    shape: 'rectangular',
    x: 680,
    y: 230,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Nero Marquina marble tasting slab with personal sommelier service.',
  },

  // Chef's Pass Counter
  {
    id: 'c1',
    tableNumber: 'C1',
    zone: 'chef_counter',
    zoneName: "Chef's Pass Counter",
    capacity: 2,
    shape: 'counter',
    x: 300,
    y: 410,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Front-row high counter seating watching the brigade plate courses.',
  },
  {
    id: 'c2',
    tableNumber: 'C2',
    zone: 'chef_counter',
    zoneName: "Chef's Pass Counter",
    capacity: 2,
    shape: 'counter',
    x: 410,
    y: 410,
    isAvailable: true,
    viewImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Front-row view of the charcoal embers and executive chef expeditor.',
  },
  {
    id: 'c3',
    tableNumber: 'C3',
    zone: 'chef_counter',
    zoneName: "Chef's Pass Counter",
    capacity: 2,
    shape: 'counter',
    x: 520,
    y: 410,
    isAvailable: false,
    viewImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop',
    vantageNote: 'Reserved for the Chef de Cuisine evening VIP pairing.',
  },
];

interface FloorplanViewerProps {
  onSelectTable?: (table: TableItem) => void;
  selectedTableId?: string | null;
}

export default function FloorplanViewer({ onSelectTable, selectedTableId }: FloorplanViewerProps) {
  const [activeZone, setActiveZone] = useState<string>('all');
  const [hoveredTable, setHoveredTable] = useState<TableItem | null>(null);
  const [activePreviewTable, setActivePreviewTable] = useState<TableItem | null>(
    TABLES_DATA.find((t) => t.isAvailable) || null
  );

  const filteredTables = activeZone === 'all'
    ? TABLES_DATA
    : TABLES_DATA.filter((t) => t.zone === activeZone);

  const handleTableClick = (table: TableItem) => {
    setActivePreviewTable(table);
    if (table.isAvailable && onSelectTable) {
      onSelectTable(table);
    }
  };

  return (
    <div className="w-full bistro-glass rounded-3xl p-6 md:p-10 border border-stone-200/15 shadow-2xl overflow-hidden relative">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200/10 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
            Interactive Seating Architecture
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-medium mt-1">
            Live Restaurant Floorplan & Seat Selector
          </h3>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Choose your dining ambience. Select any available table to inspect its vantage point and reserve in real time.
          </p>
        </div>

        {/* Zone Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-espresso-950/80 rounded-2xl border border-stone-200/10">
          {[
            { id: 'all', label: 'All Zones' },
            { id: 'terrace', label: 'Terrace' },
            { id: 'main_hall', label: 'Main Hall' },
            { id: 'wine_bar', label: 'Wine Vault' },
            { id: 'chef_counter', label: "Chef's Pass" },
          ].map((z) => (
            <button
              key={z.id}
              onClick={() => setActiveZone(z.id)}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
                activeZone === z.id
                  ? 'bg-bordeaux-800 text-stone-100 shadow-md font-semibold'
                  : 'text-stone-300 hover:text-stone-100 hover:bg-espresso-900/60'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Responsive Grid: SVG Canvas (Desktop/Tablet) + Vantage Point Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
        {/* SVG Interactive Canvas (8 Columns on desktop) */}
        <div className="lg:col-span-8 relative w-full aspect-[16/10] bg-espresso-950/95 rounded-2xl p-4 border border-stone-200/10 overflow-hidden shadow-inner flex items-center justify-center">
          <svg
            viewBox="0 0 850 500"
            className="w-full h-full select-none"
            style={{ shapeRendering: 'geometricPrecision' }}
          >
            <defs>
              {/* Flicker-free SVG Glow Filter */}
              <filter id="tableGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Architectural Floorplan Backdrops */}
            <rect x="40" y="40" width="200" height="420" rx="16" fill="rgba(243, 229, 171, 0.02)" stroke="rgba(243, 229, 171, 0.12)" strokeDasharray="4 4" />
            <text x="60" y="70" fill="#f3e5ab" opacity="0.7" fontSize="11" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="1.5">TERRACE & GARDEN</text>

            <rect x="260" y="40" width="360" height="320" rx="16" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.08)" />
            <text x="280" y="70" fill="#f7f4ee" opacity="0.7" fontSize="11" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="1.5">GRAND DINING HALL</text>

            <rect x="260" y="380" width="360" height="80" rx="16" fill="rgba(94, 25, 36, 0.06)" stroke="rgba(94, 25, 36, 0.25)" />
            <text x="280" y="402" fill="#e28594" opacity="0.85" fontSize="11" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="1.5">CHEF&apos;S PASS COUNTER</text>

            <rect x="640" y="40" width="180" height="420" rx="16" fill="rgba(94, 25, 36, 0.04)" stroke="rgba(94, 25, 36, 0.18)" strokeDasharray="4 4" />
            <text x="660" y="70" fill="#d97786" opacity="0.8" fontSize="11" fontFamily="var(--font-sans)" fontWeight="700" letterSpacing="1.5">SOMMELIER VAULT</text>

            {/* Individual Table Nodes (Flicker-Free Pure SVG Coordinate Handling) */}
            {filteredTables.map((table) => {
              const isSelected = selectedTableId === table.id || activePreviewTable?.id === table.id;
              const isHovered = hoveredTable?.id === table.id;

              return (
                <g
                  key={table.id}
                  transform={`translate(${table.x}, ${table.y})`}
                  onClick={() => handleTableClick(table)}
                  onMouseEnter={() => setHoveredTable(table)}
                  onMouseLeave={() => setHoveredTable(null)}
                  style={{ cursor: table.isAvailable ? 'pointer' : 'not-allowed' }}
                >
                  {/* Outer Pulsing Glow Ring for Selected Table (No CSS Transform Clashing) */}
                  {isSelected && (
                    <circle
                      r="44"
                      fill="none"
                      stroke="#f3e5ab"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      opacity="0.8"
                    />
                  )}

                  {/* Geometry Shape (Circular or Rectangular) */}
                  {table.shape === 'circular' ? (
                    <circle
                      r={isHovered ? 36 : 34}
                      fill={isSelected ? '#5e1924' : isHovered ? '#3a271e' : table.isAvailable ? '#251a14' : '#140f0c'}
                      stroke={isSelected ? '#f3e5ab' : isHovered ? '#f3e5ab' : table.isAvailable ? 'rgba(247, 244, 238, 0.3)' : 'rgba(247, 244, 238, 0.06)'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter={isSelected ? 'url(#tableGlow)' : undefined}
                    />
                  ) : (
                    <rect
                      x="-45"
                      y="-30"
                      width="90"
                      height="60"
                      rx="10"
                      fill={isSelected ? '#5e1924' : isHovered ? '#3a271e' : table.isAvailable ? '#251a14' : '#140f0c'}
                      stroke={isSelected ? '#f3e5ab' : isHovered ? '#f3e5ab' : table.isAvailable ? 'rgba(247, 244, 238, 0.3)' : 'rgba(247, 244, 238, 0.06)'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter={isSelected ? 'url(#tableGlow)' : undefined}
                    />
                  )}

                  {/* Table Number Identifier */}
                  <text
                    textAnchor="middle"
                    dy="-4"
                    fill={table.isAvailable ? '#f7f4ee' : '#666666'}
                    fontSize="13"
                    fontWeight="700"
                    fontFamily="var(--font-serif)"
                    pointerEvents="none"
                  >
                    {table.tableNumber}
                  </text>

                  {/* Capacity Indicator */}
                  <text
                    textAnchor="middle"
                    dy="15"
                    fill={isSelected ? '#f3e5ab' : table.isAvailable ? '#d8cbb5' : '#444444'}
                    fontSize="10"
                    fontFamily="var(--font-sans)"
                    fontWeight="600"
                    pointerEvents="none"
                  >
                    {table.capacity}p
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Floating Desktop Tooltip */}
          {hoveredTable && (
            <div className="hidden sm:flex absolute bottom-4 left-4 p-3 rounded-2xl bg-espresso-950/95 border border-stone-200/20 shadow-2xl backdrop-blur-md items-center gap-3 pointer-events-none animate-fadeIn">
              <div className={`w-3 h-3 rounded-full shrink-0 ${hoveredTable.isAvailable ? 'bg-emerald-400' : 'bg-rose-500'}`} />
              <div>
                <p className="text-xs font-serif font-medium text-stone-100">
                  Table {hoveredTable.tableNumber} • {hoveredTable.zoneName}
                </p>
                <p className="text-[11px] text-stone-300">
                  Capacity: {hoveredTable.capacity} guests • {hoveredTable.isAvailable ? 'Available for booking' : 'Currently occupied'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selected Table Vantage Point Preview (4 Columns on Desktop, Full Width on Mobile) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-espresso-950 border border-stone-200/15 shadow-2xl flex flex-col justify-between h-full space-y-4">
          {activePreviewTable ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/10">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${activePreviewTable.isAvailable ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                  <span className="font-serif font-bold text-lg text-stone-100">
                    Table {activePreviewTable.tableNumber}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-espresso-900 border border-stone-200/10 text-butter-300">
                  {activePreviewTable.capacity} Guests
                </span>
              </div>

              {/* Table View Thumbnail */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-stone-200/20 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activePreviewTable.viewImage}
                  alt={`Vantage point from Table ${activePreviewTable.tableNumber}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2.5 text-[10px] uppercase tracking-wider font-bold text-butter-300 bg-espresso-950/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {activePreviewTable.zoneName}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                  Atmospheric Vantage Note
                </span>
                <p className="text-xs text-stone-200 mt-1 leading-relaxed font-sans">
                  {activePreviewTable.vantageNote}
                </p>
              </div>

              <div className="pt-2">
                <button
                  disabled={!activePreviewTable.isAvailable}
                  onClick={() => {
                    if (activePreviewTable.isAvailable && onSelectTable) {
                      onSelectTable(activePreviewTable);
                    }
                  }}
                  className={`w-full py-3.5 rounded-2xl text-xs font-semibold shadow-xl flex items-center justify-center gap-2 transition-all ${
                    activePreviewTable.isAvailable
                      ? 'bg-bordeaux-800 text-stone-100 hover:bg-bordeaux-700 active:scale-95'
                      : 'bg-espresso-900 text-stone-500 cursor-not-allowed border border-stone-200/5'
                  }`}
                >
                  <span>{activePreviewTable.isAvailable ? `Reserve Table ${activePreviewTable.tableNumber}` : 'Table Unavailable'}</span>
                  {activePreviewTable.isAvailable && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500 text-xs">
              Tap any table on the floorplan to inspect its view.
            </div>
          )}
        </div>
      </div>

      {/* Mobile Table Selector Cards (Optimized for 360px - 430px Touchscreens) */}
      <div className="block lg:hidden mt-8 pt-6 border-t border-stone-200/10 space-y-3">
        <span className="text-xs font-serif text-stone-200 font-medium block">
          Mobile Quick Table Switcher:
        </span>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {filteredTables.map((t) => {
            const isSelected = activePreviewTable?.id === t.id;

            return (
              <button
                key={t.id}
                onClick={() => handleTableClick(t)}
                className={`snap-start shrink-0 w-36 p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-bordeaux-950 border-butter-300/50 shadow-md'
                    : 'bg-espresso-950 border-stone-200/10'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-serif font-bold text-xs text-stone-100">Table {t.tableNumber}</span>
                  <span className={`w-2 h-2 rounded-full ${t.isAvailable ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                </div>
                <p className="text-[10px] text-stone-400 truncate">{t.zoneName}</p>
                <p className="text-[10px] text-butter-300 font-mono mt-1">{t.capacity} Guests</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floorplan Legend */}
      <div className="flex flex-wrap items-center justify-between pt-6 mt-4 border-t border-stone-200/10 text-xs text-stone-300 gap-4">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-espresso-800 border border-stone-200/30" />
            Available Seat
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-bordeaux-800 border-2 border-butter-300" />
            Active Selection
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-espresso-950 border border-stone-200/10 opacity-40" />
            Occupied
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-butter-300 text-[11px]">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Real-time availability synced with our maître d&apos; reservation ledger</span>
        </div>
      </div>
    </div>
  );
}
