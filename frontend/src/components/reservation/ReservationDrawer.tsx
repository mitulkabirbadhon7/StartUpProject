'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check, AlertCircle, ShieldCheck, Download } from 'lucide-react';
import Link from 'next/link';
import { TableItem } from '../floorplan/FloorplanViewer';

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTable?: TableItem | null;
  restaurantSlug: string;
}

export default function ReservationDrawer({
  isOpen,
  onClose,
  selectedTable,
  restaurantSlug,
}: ReservationDrawerProps) {
  const [step, setStep] = useState<number>(1);
  const [partySize, setPartySize] = useState<number>(selectedTable ? selectedTable.capacity : 2);
  const [date, setDate] = useState<string>('2026-11-20');
  const [time, setTime] = useState<string>('20:00');
  const [zone, setZone] = useState<string>(selectedTable ? selectedTable.zone : 'terrace');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  const [gdprConsent, setGdprConsent] = useState<boolean>(true);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNextStep = () => {
    setErrorMessage(null);
    if (step === 1) {
      if (!date || !time) {
        setErrorMessage('Please select both a date and service time.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
        setErrorMessage('Please complete all contact fields.');
        return;
      }
      if (!gdprConsent) {
        setErrorMessage('You must acknowledge the European GDPR privacy policy.');
        return;
      }
      // Instant confirmation simulation
      const code = `ET-${partySize}${zone[0].toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(code);
      setStep(4);
    }
  };

  const downloadCalendarIcs = () => {
    if (!confirmationCode) return;
    const isPizzeria = restaurantSlug === 'lievito-madre';
    const restName = isPizzeria ? 'Lievito Madre' : "L'Étoile & Terroir";
    const restLocation = isPizzeria ? 'Via dei Tribunali 32, 80138 Napoli, Italy' : '14 Rue Saint-Honoré, 75001 Paris, France';
    const formattedDate = date.replace(/-/g, '');
    const formattedTime = time.replace(':', '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//European Dining Demos//Reservation Service//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${confirmationCode}@${isPizzeria ? 'lievitomadre-artisan.it' : 'letoile-terroir.fr'}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${formattedDate}T${formattedTime}00Z`,
      `SUMMARY:Dinner Reservation: ${restName} (${confirmationCode})`,
      `DESCRIPTION:Table reserved for ${partySize} guests in ${zone.replace('_', ' ').toUpperCase()}. Guest: ${guestName || 'Valued Guest'}.`,
      `LOCATION:${restLocation}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${restaurantSlug}-reservation-${confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setStep(1);
    setConfirmationCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-espresso-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md h-full bg-espresso-950 border-l border-stone-200/10 shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-200/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
                Table Reservation
              </span>
              <h3 className="font-serif text-2xl text-stone-100 font-medium mt-1">
                {step === 4 ? 'Reservation Confirmed' : 'Reserve Your Table'}
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="p-2 rounded-full hover:bg-espresso-900 text-stone-400 hover:text-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress */}
          {step < 4 && (
            <div className="flex items-center gap-2 my-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-bordeaux-800' : 'bg-espresso-900'
                  }`}
                />
              ))}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/40 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Step 1: Party & Schedule */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Party Size (Guests)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 4, 6, 8].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        partySize === size
                          ? 'bg-bordeaux-800 text-stone-100 border-butter-300/40 shadow-md'
                          : 'bg-espresso-900 text-stone-400 border-stone-200/5 hover:border-stone-200/20'
                      }`}
                    >
                      {size} {size === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Reservation Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-espresso-900 border border-stone-200/10 rounded-xl px-10 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-butter-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Dinner Service Seating
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['18:30', '19:30', '20:00', '20:30', '21:15', '22:00'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                        time === slot
                          ? 'bg-bordeaux-800 text-stone-100 border-butter-300/40 shadow-md'
                          : 'bg-espresso-900 text-stone-400 border-stone-200/5 hover:border-stone-200/20'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Zone & Seating Environment */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs text-stone-400">
                Choose your desired dining atmosphere or confirmed table:
              </span>

              {[
                { id: 'terrace', label: 'Heated Garden Terrace', note: 'Lanterns & outdoor evening heaters' },
                { id: 'main_hall', label: 'Grand Dining Hall', note: 'Central candlelight ambiance & live jazz' },
                { id: 'wine_bar', label: 'Sommelier Wine Vault', note: 'Intimate marble counter & cellar tasting' },
                { id: 'chef_counter', label: "Chef's Pass Counter", note: 'Front-row view of culinary brigade' },
              ].map((z) => (
                <div
                  key={z.id}
                  onClick={() => setZone(z.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    zone === z.id
                      ? 'bg-bordeaux-950/60 border-butter-300/50 shadow-md'
                      : 'bg-espresso-900/60 border-stone-200/5 hover:border-stone-200/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-sm font-medium text-stone-100">{z.label}</h5>
                    {zone === z.id && <Check className="w-4 h-4 text-butter-300" />}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">{z.note}</p>
                </div>
              ))}

              {selectedTable && (
                <div className="p-3 rounded-xl bg-espresso-900 border border-stone-200/10 text-xs text-butter-300 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Floorplan table <strong>{selectedTable.tableNumber}</strong> pre-selected.</span>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact & Allergens */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jean-Luc Moreau"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-espresso-900 border border-stone-200/10 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-butter-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. j.moreau@chateau.fr"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-espresso-900 border border-stone-200/10 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-butter-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Phone Number (with Country Code)</label>
                <input
                  type="tel"
                  placeholder="e.g. +33 6 12 34 56 78"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-espresso-900 border border-stone-200/10 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-butter-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Allergies & Dietary Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Celiac disease, severe peanut allergy, celebration anniversary"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="w-full bg-espresso-900 border border-stone-200/10 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-butter-300"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="gdpr"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  className="mt-1 rounded bg-espresso-900 border-stone-200/20 text-bordeaux-800 focus:ring-0"
                />
                <label htmlFor="gdpr" className="text-[11px] text-stone-400 leading-snug">
                  I consent to the processing of my contact information solely for this dining reservation pursuant to the{' '}
                  <Link href="/privacy" target="_blank" className="text-butter-300 underline underline-offset-2">
                    European General Data Protection Regulation (GDPR)
                  </Link>.
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation State */}
          {step === 4 && (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl text-stone-100 font-medium">
                Nous vous attendons!
              </h4>

              <p className="text-xs text-stone-300 max-w-xs mx-auto">
                Your reservation for <strong>{partySize} guests</strong> has been formally recorded in our cellar registry.
              </p>

              <div className="p-4 rounded-2xl bg-espresso-900 border border-stone-200/10 inline-block text-left w-full space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Confirmation Code:</span>
                  <span className="font-mono font-bold text-butter-300">{confirmationCode}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Date & Service:</span>
                  <span className="text-stone-200">{date} at {time}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Atmosphere Zone:</span>
                  <span className="text-stone-200">{zone.replace('_', ' ').toUpperCase()}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={downloadCalendarIcs}
                  className="w-full py-3 rounded-xl bg-espresso-900 border border-stone-200/20 text-butter-300 font-medium text-xs hover:bg-espresso-850 hover:border-butter-300/40 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-butter-300" />
                  <span>Add to Apple / Google Calendar (.ics)</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-bordeaux-800 text-stone-100 font-medium text-xs hover:bg-bordeaux-700 transition-colors shadow-lg"
                >
                  Return to Menu
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 4 && (
          <div className="pt-6 border-t border-stone-200/10 flex items-center justify-between gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl bg-espresso-900 text-stone-300 text-xs font-medium hover:text-stone-100 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNextStep}
              className="flex-1 py-3 rounded-xl bg-bordeaux-800 text-stone-100 text-xs font-medium hover:bg-bordeaux-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>{step === 3 ? 'Confirm Table Reservation' : 'Continue'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
