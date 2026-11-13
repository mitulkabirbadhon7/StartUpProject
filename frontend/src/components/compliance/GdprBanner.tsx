'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, Settings, X } from 'lucide-react';
import Link from 'next/link';

export default function GdprBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);

  useEffect(() => {
    const rawConsent = localStorage.getItem('european_gdpr_consent_v2');
    if (rawConsent) {
      try {
        const parsed = JSON.parse(rawConsent);
        setAnalyticsConsent(Boolean(parsed.analytics));
        setMarketingConsent(Boolean(parsed.marketing));
      } catch {
        // Ignore parse error
      }
    } else {
      // Delay presentation slightly to avoid initial layout pop
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for global reopen trigger from footer / settings
  useEffect(() => {
    const handleReopen = () => {
      setShowSettings(true);
      setIsVisible(true);
    };

    window.addEventListener('open-gdpr-banner', handleReopen);
    return () => window.removeEventListener('open-gdpr-banner', handleReopen);
  }, []);

  const persistConsentToBackend = (payload: { necessary: boolean; analytics: boolean; marketing: boolean; timestamp: string }) => {
    try {
      const sessionId = localStorage.getItem('european_gdpr_session_id') || `sess_${Math.random().toString(36).substring(2, 12)}`;
      localStorage.setItem('european_gdpr_session_id', sessionId);

      fetch('/api/v1/compliance/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          necessaryAccepted: payload.necessary,
          analyticsAccepted: payload.analytics,
          marketingAccepted: payload.marketing,
          consentVersion: '2.0',
        }),
      }).catch(() => {
        // Silent catch for offline or decoupled state
      });
    } catch {
      // Ignore client fetch errors
    }
  };

  const handleAcceptAll = () => {
    const payload = { necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    localStorage.setItem('european_gdpr_consent_v2', JSON.stringify(payload));
    persistConsentToBackend(payload);
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const payload = { necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
    localStorage.setItem('european_gdpr_consent_v2', JSON.stringify(payload));
    persistConsentToBackend(payload);
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    const payload = { necessary: true, analytics: analyticsConsent, marketing: marketingConsent, timestamp: new Date().toISOString() };
    localStorage.setItem('european_gdpr_consent_v2', JSON.stringify(payload));
    persistConsentToBackend(payload);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:max-w-xl z-50 animate-fadeIn">
      <div className="bistro-glass rounded-2xl p-5 md:p-6 border border-stone-200/20 shadow-2xl relative">
        {/* Dismiss X if reopened via footer */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-espresso-900 transition-colors"
          aria-label="Close Cookie Banner"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 pr-6">
          <div className="p-2.5 rounded-xl bg-bordeaux-800/80 border border-bordeaux-700/60 text-butter-300 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base font-medium text-stone-100 flex items-center gap-2">
              European Privacy & Cookie Directives
            </h4>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              We respect your digital privacy. In compliance with the EU General Data Protection Regulation (GDPR) and ePrivacy Directive, we use strictly necessary cookies to ensure seamless table bookings and sommelier session states.
            </p>
          </div>
        </div>

        {/* Granular Settings Drawer */}
        {showSettings && (
          <div className="mt-4 pt-4 border-t border-stone-200/10 space-y-3 animate-fadeIn text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-espresso-950/60">
              <div>
                <span className="font-medium text-stone-200">Strictly Necessary Cookies</span>
                <p className="text-[11px] text-stone-400">Required for floorplan state and reservations.</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Always Active</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-espresso-950/60">
              <div>
                <span className="font-medium text-stone-200">Performance & Analytics</span>
                <p className="text-[11px] text-stone-400">Anonymous performance metrics.</p>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-4 h-4 rounded bg-espresso-900 border-stone-200/20 text-bordeaux-800 focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-espresso-950/60">
              <div>
                <span className="font-medium text-stone-200">Personalized Sommelier Concierge</span>
                <p className="text-[11px] text-stone-400">Tailors wine pairing memory across visits.</p>
              </div>
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="w-4 h-4 rounded bg-espresso-900 border-stone-200/20 text-bordeaux-800 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 pt-4 border-t border-stone-200/10 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Link
              href="/privacy"
              className="text-[11px] text-stone-400 hover:text-stone-200 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-stone-600">•</span>
            <Link
              href="/impressum"
              className="text-[11px] text-stone-400 hover:text-stone-200 underline underline-offset-4"
            >
              Impressum (Legal)
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {showSettings ? (
              <button
                onClick={handleSaveCustom}
                className="px-3.5 py-2 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-colors shadow-md"
              >
                Save Preferences
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-3 py-2 rounded-xl bg-espresso-900 text-stone-300 hover:text-stone-100 text-xs font-medium transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="px-3 py-2 rounded-xl bg-espresso-900 text-stone-300 hover:text-stone-100 text-xs font-medium transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-2 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-colors shadow-md"
                >
                  Accept All
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
