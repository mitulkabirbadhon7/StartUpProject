'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function FloatingTriggers() {
  return (
    <aside 
      aria-label="Direct Concierge & Location Actions"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3 pointer-events-auto"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}
    >
      {/* Direct Call Trigger */}
      <a
        href="tel:+33142685500"
        title="Direct Maitre D' Line"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-espresso-900/95 text-stone-200 border border-stone-200/20 shadow-2xl flex items-center justify-center hover:bg-bordeaux-800 hover:text-stone-100 hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
        <span className="sr-only">Call Concierge</span>
      </a>

      {/* WhatsApp Concierge */}
      <a
        href="https://wa.me/33612345678?text=Bonjour,%20I%20would%20like%20to%20inquire%20about%20table%20availability%20this%20evening."
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp VIP Concierge"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#128C7E]/95 text-white border border-white/20 shadow-2xl flex items-center justify-center hover:bg-[#075E54] hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
        <span className="sr-only">WhatsApp VIP Concierge</span>
      </a>

      {/* Google Maps Location */}
      <a
        href="https://maps.google.com/?q=Paris+1st+Arrondissement"
        target="_blank"
        rel="noopener noreferrer"
        title="Navigate via Google Maps"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-espresso-900/95 text-stone-200 border border-stone-200/20 shadow-2xl flex items-center justify-center hover:bg-bordeaux-800 hover:text-stone-100 hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-butter-300 transition-transform group-hover:-translate-y-0.5" />
        <span className="sr-only">Google Maps Navigation</span>
      </a>
    </aside>
  );
}
