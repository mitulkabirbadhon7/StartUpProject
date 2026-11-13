'use client';

import React from 'react';
import { Filter, Check, ShieldCheck, Sparkles } from 'lucide-react';

export interface DietaryOption {
  id: string;
  label: string;
  description: string;
  count?: number;
}

const DIETARY_OPTIONS: DietaryOption[] = [
  { id: 'all', label: 'Complete Tasting Menu', description: 'All chef creations' },
  { id: 'vegan', label: '100% Plant-Based (Vegan)', description: 'Cruelty-free botanical gastronomy' },
  { id: 'vegetarian', label: 'Vegetarian', description: 'Heritage farm vegetables & dairy' },
  { id: 'gluten_free', label: 'Gluten-Free (Celiac-Safe)', description: 'Prepared in dedicated allergen prep station' },
  { id: 'dairy_free', label: 'Dairy-Free / Lactose-Free', description: 'Zero animal milk proteins' },
  { id: 'halal', label: 'Halal Certified', description: 'Certified European ethical sourcing' },
];

interface DietaryFilterBarProps {
  activeFilters: string[];
  onToggleFilter: (filterId: string) => void;
  onClearFilters: () => void;
  matchingCount?: number;
}

export default function DietaryFilterBar({
  activeFilters,
  onToggleFilter,
  onClearFilters,
  matchingCount,
}: DietaryFilterBarProps) {
  const isAllSelected = activeFilters.length === 0;

  return (
    <div className="w-full bistro-glass rounded-2xl p-5 border border-stone-200/10 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-bordeaux-800/60 border border-bordeaux-700/50 text-butter-300">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-stone-100 font-medium">
              Dietary & Allergen Filtering Matrix
            </h4>
            <p className="text-xs text-stone-300">
              Filter dishes strictly prepared according to your biological & dietary standards (EU-14 Compliant).
            </p>
          </div>
        </div>

        {matchingCount !== undefined && (
          <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-full bg-espresso-950/80 border border-stone-200/10 text-xs text-butter-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{matchingCount} Courses Match Selection</span>
          </div>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onClearFilters}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
            isAllSelected
              ? 'bg-bordeaux-800 text-stone-100 shadow-md border border-bordeaux-600'
              : 'bg-espresso-950/80 text-stone-300 hover:text-stone-100 border border-stone-200/5 hover:border-stone-200/20'
          }`}
        >
          {isAllSelected && <Check className="w-3.5 h-3.5 text-butter-300" />}
          All Courses
        </button>

        {DIETARY_OPTIONS.filter((o) => o.id !== 'all').map((option) => {
          const isSelected = activeFilters.includes(option.id);

          return (
            <button
              key={option.id}
              onClick={() => onToggleFilter(option.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? 'bg-bordeaux-800 text-stone-100 shadow-md border border-butter-300/40'
                  : 'bg-espresso-950/80 text-stone-300 hover:text-stone-100 border border-stone-200/5 hover:border-stone-200/20'
              }`}
            >
              {isSelected ? (
                <Check className="w-3.5 h-3.5 text-butter-300" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400/40" />
              )}
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Allergen Protocol Assurance Notice */}
      <div className="mt-4 pt-3 border-t border-stone-200/5 flex items-center gap-2 text-[11px] text-stone-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>
          Every kitchen line is sanitized between tasting services. Our maître d&apos; and head chef personally verify all severe allergies prior to dining.
        </span>
      </div>
    </div>
  );
}
