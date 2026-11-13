import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // High-End European Bistro Palette
        espresso: {
          950: '#1A130E',
          900: '#2A1E17',
          800: '#3D2D23',
          700: '#554033',
        },
        bordeaux: {
          950: '#2B0A10',
          900: '#431018',
          800: '#5E1924',
          700: '#7B2432',
          600: '#9A3243',
        },
        stone: {
          50: '#FAF8F5',
          100: '#F7F4EE',
          200: '#EFE9DE',
          300: '#DDD4C4',
          400: '#B8AA94',
        },
        butter: {
          100: '#FCF8E3',
          200: '#F8EEBD',
          300: '#F3E5AB',
          400: '#ECD382',
        },
        // Artisan Sourdough Pizzeria Palette
        terracotta: {
          500: '#DC7C62',
          600: '#C86D51',
          700: '#A9543C',
          800: '#8A3F2A',
        },
        amber: {
          400: '#F59E0B',
          500: '#D9822B',
          600: '#B8681A',
        },
        sage: {
          500: '#7E8D71',
          600: '#6E7B62',
          700: '#56624C',
        },
        hearth: {
          900: '#1C1A18',
          950: '#121110',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
