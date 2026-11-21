'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'bistro' | 'pizzeria' | 'midnight';
}

export default function AuroraBackground({
  children,
  className = '',
  variant = 'bistro',
}: AuroraBackgroundProps) {
  // Bespoke color palettes adhering to AGENTS.md zero AI slop design rules
  const palettes = {
    bistro: {
      c1: 'rgba(94, 25, 36, 0.25)', // Deep Bordeaux Wine
      c2: 'rgba(200, 109, 81, 0.18)', // Terracotta
      c3: 'rgba(42, 30, 23, 0.4)', // Warm Espresso
    },
    pizzeria: {
      c1: 'rgba(217, 130, 43, 0.22)', // Burnt Amber
      c2: 'rgba(200, 109, 81, 0.2)', // Tuscan Terracotta
      c3: 'rgba(28, 26, 24, 0.45)', // Hearth Charcoal
    },
    midnight: {
      c1: 'rgba(99, 102, 241, 0.15)', // Subtle Indigo
      c2: 'rgba(6, 182, 212, 0.12)', // Subtle Cyan
      c3: 'rgba(15, 23, 42, 0.5)', // Slate
    },
  };

  const selected = palettes[variant] || palettes.bistro;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Aurora Glow Layers */}
      <motion.div
        animate={{
          scale: [1, 1.15, 0.95, 1],
          x: [0, 40, -30, 0],
          y: [0, -25, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full blur-[120px]"
        style={{ background: selected.c1 }}
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1.2, 1],
          x: [0, -50, 25, 0],
          y: [0, 35, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-[140px]"
        style={{ background: selected.c2 }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1, 1],
          x: [0, 30, -40, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full blur-[130px]"
        style={{ background: selected.c3 }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
