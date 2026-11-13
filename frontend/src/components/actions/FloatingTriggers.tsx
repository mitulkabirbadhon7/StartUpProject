'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingTriggers() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <aside 
      aria-label="Direct Concierge & Location Actions"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}
    >
      {/* Expanded Actions Stack */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2.5 items-end mb-1"
          >
            {/* Direct Call Trigger */}
            <a
              href="tel:+33142685500"
              title="Direct Maitre D' Line"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-espresso-900/95 text-stone-200 border border-stone-200/20 shadow-2xl hover:bg-bordeaux-800 hover:text-stone-100 active:scale-95 transition-all text-xs font-medium group backdrop-blur-md"
            >
              <span className="hidden sm:inline text-[11px] text-stone-300 group-hover:text-stone-100">Direct Call</span>
              <div className="w-8 h-8 rounded-full bg-bordeaux-950/80 flex items-center justify-center border border-stone-200/20">
                <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </div>
              <span className="sr-only">Call Concierge</span>
            </a>

            {/* WhatsApp VIP Concierge */}
            <a
              href="https://wa.me/33612345678?text=Bonjour,%20I%20would%20like%20to%20inquire%20about%20table%20availability%20this%20evening."
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp VIP Concierge"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#128C7E]/95 text-white border border-white/20 shadow-2xl hover:bg-[#075E54] active:scale-95 transition-all text-xs font-medium group backdrop-blur-md"
            >
              <span className="hidden sm:inline text-[11px] text-emerald-100 group-hover:text-white">VIP WhatsApp</span>
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center border border-white/20">
                <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              </div>
              <span className="sr-only">WhatsApp VIP Concierge</span>
            </a>

            {/* Google Maps Location */}
            <a
              href="https://maps.google.com/?q=Paris+1st+Arrondissement"
              target="_blank"
              rel="noopener noreferrer"
              title="Navigate via Google Maps"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-espresso-900/95 text-stone-200 border border-stone-200/20 shadow-2xl hover:bg-bordeaux-800 hover:text-stone-100 active:scale-95 transition-all text-xs font-medium group backdrop-blur-md"
            >
              <span className="hidden sm:inline text-[11px] text-stone-300 group-hover:text-stone-100">Find on Maps</span>
              <div className="w-8 h-8 rounded-full bg-bordeaux-950/80 flex items-center justify-center border border-stone-200/20">
                <MapPin className="w-4 h-4 text-butter-300 transition-transform group-hover:-translate-y-0.5" />
              </div>
              <span className="sr-only">Google Maps Navigation</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Toggle Pill */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle Direct Concierge Actions"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-espresso-900/95 text-stone-100 border border-butter-300/30 shadow-2xl hover:bg-bordeaux-800 active:scale-95 transition-all duration-200 backdrop-blur-md group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-serif text-xs font-semibold tracking-wide text-butter-200 group-hover:text-white">
          {isOpen ? 'Close' : 'Concierge'}
        </span>
        {isOpen ? (
          <X className="w-3.5 h-3.5 text-stone-300" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-butter-300 transition-transform group-hover:-translate-y-0.5" />
        )}
      </button>
    </aside>
  );
}
