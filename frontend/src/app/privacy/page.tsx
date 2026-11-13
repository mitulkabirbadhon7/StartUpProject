import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-espresso-950 text-stone-100 flex flex-col justify-between p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-100 text-xs mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Master Portal</span>
        </Link>

        <div className="bistro-glass rounded-3xl p-8 md:p-12 border border-stone-200/10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-bordeaux-800 text-butter-300">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
                Data Protection Directive
              </span>
              <h1 className="font-serif text-3xl font-medium text-stone-100">
                GDPR Privacy Policy (EU 2016/679)
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-xs text-stone-300 leading-relaxed font-sans">
            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                1. Data Controller Overview
              </h2>
              <p>
                The data controller within the meaning of the General Data Protection Regulation (GDPR) is Mitul Kabir Badhon, representing the European Dining Demos Architecture Suite.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                2. Scope of Processing
              </h2>
              <p>
                We process personal data (guest name, email address, phone number, dietary requirements) exclusively to facilitate the reservation of dining tables and sommelier consultations. Data is never sold, leased, or transferred to third-party advertisers.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                3. Encryption & Storage Security
              </h2>
              <p>
                All data in transit is encrypted using TLS 1.3. Data at rest is persisted in isolated European regions of Neon PostgreSQL with database encryption and strictly parameterized queries to eliminate vulnerability vectors.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                4. Your Rights Under GDPR
              </h2>
              <p>
                Under EU law, you possess the right to access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (&quot;Right to be Forgotten&quot;, Art. 17 GDPR), and restriction of processing (Art. 18 GDPR). To exercise these rights, contact privacy@european-dining-demos.eu.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-stone-500 py-6">
        © 2026 European Dining Web Demos • All rights reserved.
      </footer>
    </div>
  );
}
