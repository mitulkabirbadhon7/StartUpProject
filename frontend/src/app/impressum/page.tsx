import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function ImpressumPage() {
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
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
                EU Statutory Compliance
              </span>
              <h1 className="font-serif text-3xl font-medium text-stone-100">
                Impressum / Legal Notice
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-xs text-stone-300 leading-relaxed font-sans">
            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                Angaben gemäß § 5 TMG / Provider Information
              </h2>
              <p>European Dining Demos Hospitality Group S.A.S.</p>
              <p>14 Rue Saint-Honoré, 75001 Paris, France</p>
              <p>Registration: Tribunal de Commerce de Paris (RCS 892 341 502)</p>
              <p>VAT ID / Numéro de TVA: FR 42 892341502</p>
            </div>

            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                Vertreten durch / Managing Directors
              </h2>
              <p>Mitul Kabir Badhon (Head of Architecture & Engineering)</p>
            </div>

            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                Kontakt / Contact
              </h2>
              <p>Telephone: +33 1 42 68 55 00</p>
              <p>Email: legal@european-dining-demos.eu</p>
              <p>Website: https://github.com/mitulkabirbadhon7</p>
            </div>

            <div>
              <h2 className="font-serif text-base text-stone-100 font-medium mb-1">
                EU Dispute Resolution / Online-Streitbeilegung
              </h2>
              <p>
                The European Commission provides a platform for online dispute resolution (OS):{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-butter-300 underline underline-offset-2"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
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
