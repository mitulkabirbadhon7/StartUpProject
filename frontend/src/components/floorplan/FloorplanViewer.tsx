'use client';

import React, { useState } from 'react';
import { Users, Info, CheckCircle2, Clock } from 'lucide-react';

export interface TableItem {
  id: string;
  tableNumber: string;
  zone: 'terrace' | 'main_hall' | 'wine_bar' | 'chef_counter';
  capacity: number;
  shape: 'circular' | 'rectangular' | 'booth' | 'counter';
  x: number;
  y: number;
  isAvailable: boolean;
}

const TABLES_DATA: TableItem[] = [
  // Terrace (Garden)
  { id: 't1', tableNumber: 'T1', zone: 'terrace', capacity: 2, shape: 'circular', x: 80, y: 110, isAvailable: true },
  { id: 't2', tableNumber: 'T2', zone: 'terrace', capacity: 4, shape: 'circular', x: 80, y: 220, isAvailable: false },
  { id: 't3', tableNumber: 'T3', zone: 'terrace', capacity: 6, shape: 'rectangular', x: 80, y: 350, isAvailable: true },

  // Main Dining Hall
  { id: 'm1', tableNumber: 'M1', zone: 'main_hall', capacity: 2, shape: 'circular', x: 300, y: 110, isAvailable: true },
  { id: 'm2', tableNumber: 'M2', zone: 'main_hall', capacity: 4, shape: 'rectangular', x: 440, y: 110, isAvailable: true },
  { id: 'm3', tableNumber: 'M3', zone: 'main_hall', capacity: 4, shape: 'rectangular', x: 300, y: 240, isAvailable: false },
  { id: 'm4', tableNumber: 'M4', zone: 'main_hall', capacity: 8, shape: 'booth', x: 440, y: 240, isAvailable: true },

  // Wine Vault
  { id: 'w1', tableNumber: 'W1', zone: 'wine_bar', capacity: 2, shape: 'circular', x: 680, y: 110, isAvailable: true },
  { id: 'w2', tableNumber: 'W2', zone: 'wine_bar', capacity: 4, shape: 'rectangular', x: 680, y: 230, isAvailable: true },

  // Chef's Counter
  { id: 'c1', tableNumber: 'C1', zone: 'chef_counter', capacity: 2, shape: 'counter', x: 300, y: 410, isAvailable: true },
  { id: 'c2', tableNumber: 'C2', zone: 'chef_counter', capacity: 2, shape: 'counter', x: 410, y: 410, isAvailable: true },
  { id: 'c3', tableNumber: 'C3', zone: 'chef_counter', capacity: 2, shape: 'counter', x: 520, y: 410, isAvailable: false },
];

interface FloorplanViewerProps {
  onSelectTable?: (table: TableItem) => void;
  selectedTableId?: string | null;
}

export default function FloorplanViewer({ onSelectTable, selectedTableId }: FloorplanViewerProps) {
  const [activeZone, setActiveZone] = useState<string>('all');
  const [hoveredTable, setHoveredTable] = useState<TableItem | null>(null);

  const filteredTables = activeZone === 'all'
    ? TABLES_DATA
    : TABLES_DATA.filter((t) => t.zone === activeZone);

  return (
    <div className="w-full bistro-glass rounded-2xl p-6 border border-stone-200/10 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200/10 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
            Interactive Seating Engine
          </span>
          <h3 className="font-serif text-2xl text-stone-100 font-medium mt-1">
            Live Restaurant Floorplan & Seat Selector
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            Select your preferred dining environment. Click any available table to secure your reservation.
          </p>
        </div>

        {/* Zone Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-espresso-950/80 rounded-xl border border-stone-200/5">
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
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 ${
                activeZone === z.id
                  ? 'bg-bordeaux-800 text-stone-100 shadow-md'
                  : 'text-stone-300 hover:text-stone-100 hover:bg-espresso-900'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[16/10] bg-espresso-950/90 rounded-xl mt-6 p-4 border border-stone-200/5 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 850 500"
          className="w-full h-full select-none"
        >
          {/* Zone Backdrops & Architectural Labels */}
          <rect x="40" y="40" width="200" height="420" rx="12" fill="rgba(243, 229, 171, 0.02)" stroke="rgba(243, 229, 171, 0.08)" strokeDasharray="4 4" />
          <text x="60" y="70" fill="#f3e5ab" opacity="0.6" fontSize="12" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="1">TERRACE & GARDEN</text>

          <rect x="260" y="40" width="360" height="320" rx="12" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.05)" />
          <text x="280" y="70" fill="#f7f4ee" opacity="0.6" fontSize="12" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="1">GRAND DINING HALL</text>

          <rect x="260" y="380" width="360" height="80" rx="12" fill="rgba(94, 25, 36, 0.05)" stroke="rgba(94, 25, 36, 0.2)" />
          <text x="280" y="400" fill="#e28594" opacity="0.8" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="1">CHEF&apos;S PASS COUNTER</text>

          <rect x="640" y="40" width="180" height="420" rx="12" fill="rgba(94, 25, 36, 0.03)" stroke="rgba(94, 25, 36, 0.15)" strokeDasharray="4 4" />
          <text x="660" y="70" fill="#d97786" opacity="0.7" fontSize="12" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="1">SOMMELIER VAULT</text>

          {/* Tables Rendering */}
          {filteredTables.map((table) => {
            const isSelected = selectedTableId === table.id;
            const isHovered = hoveredTable?.id === table.id;

            return (
              <g
                key={table.id}
                transform={`translate(${table.x}, ${table.y})`}
                onClick={() => table.isAvailable && onSelectTable && onSelectTable(table)}
                onMouseEnter={() => setHoveredTable(table)}
                onMouseLeave={() => setHoveredTable(null)}
                className={`cursor-pointer transition-transform duration-200 ${
                  table.isAvailable ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Table geometry */}
                {table.shape === 'circular' ? (
                  <circle
                    r="34"
                    fill={isSelected ? '#5e1924' : table.isAvailable ? '#2a1e17' : '#1a130e'}
                    stroke={isSelected ? '#f3e5ab' : table.isAvailable ? 'rgba(247, 244, 238, 0.25)' : 'rgba(247, 244, 238, 0.08)'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-colors duration-200"
                  />
                ) : (
                  <rect
                    x="-45"
                    y="-30"
                    width="90"
                    height="60"
                    rx="8"
                    fill={isSelected ? '#5e1924' : table.isAvailable ? '#2a1e17' : '#1a130e'}
                    stroke={isSelected ? '#f3e5ab' : table.isAvailable ? 'rgba(247, 244, 238, 0.25)' : 'rgba(247, 244, 238, 0.08)'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-colors duration-200"
                  />
                )}

                {/* Table Label & Capacity */}
                <text
                  textAnchor="middle"
                  dy="-4"
                  fill="#f7f4ee"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="var(--font-serif)"
                >
                  {table.tableNumber}
                </text>
                <text
                  textAnchor="middle"
                  dy="14"
                  fill={table.isAvailable ? '#f3e5ab' : '#888888'}
                  fontSize="10"
                  fontFamily="var(--font-sans)"
                  fontWeight="500"
                >
                  {table.capacity} Guests
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Tooltip Card */}
        {hoveredTable && (
          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-espresso-900/95 border border-stone-200/20 shadow-2xl backdrop-blur-md flex items-center gap-3 pointer-events-none animate-fadeIn">
            <div className={`w-3 h-3 rounded-full ${hoveredTable.isAvailable ? 'bg-emerald-400' : 'bg-rose-500'}`} />
            <div>
              <p className="text-xs font-serif font-medium text-stone-100">
                Table {hoveredTable.tableNumber} • {hoveredTable.zone.replace('_', ' ').toUpperCase()}
              </p>
              <p className="text-[11px] text-stone-300">
                Capacity: {hoveredTable.capacity} guests • {hoveredTable.isAvailable ? 'Available for this service' : 'Reserved for current service'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floorplan Legend */}
      <div className="flex flex-wrap items-center justify-between pt-5 mt-2 border-t border-stone-200/10 text-xs text-stone-300 gap-4">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-espresso-800 border border-stone-200/30" />
            Available Seat
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-bordeaux-800 border-2 border-butter-300" />
            Selected by You
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-espresso-950 border border-stone-200/10 opacity-40" />
            Currently Reserved
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-butter-300 text-[11px]">
          <Info className="w-3.5 h-3.5" />
          <span>Real-time availability synced with our maître d&apos; reservation book</span>
        </div>
      </div>
    </div>
  );
}
