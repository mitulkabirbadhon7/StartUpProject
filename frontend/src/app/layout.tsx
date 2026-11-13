import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import GdprBanner from '@/components/compliance/GdprBanner';
import FloatingTriggers from '@/components/actions/FloatingTriggers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "European Gastronomy & Dining Demos | L'Étoile & Terroir & Lievito Madre",
  description: "High-performance European restaurant web applications featuring live table seat selector, dietary matrix filter, and sommelier wine pairings.",
  keywords: ['European bistro', 'artisanal sourdough pizza', 'live table booking', 'sommelier pairing', 'Paris dining', 'Naples pizza'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-espresso-950 text-stone-100 min-h-screen selection:bg-bordeaux-800 selection:text-white">
        {children}
        <GdprBanner />
        <FloatingTriggers />
      </body>
    </html>
  );
}
