'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

export default function BlurText({
  text,
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0, -20px, 0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0, 20px, 0)' };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0, 5px, 0)' : 'translate3d(0, -5px, 0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0, 0, 0)' },
  ];

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          whileInView={{
            filter: ['blur(10px)', 'blur(4px)', 'blur(0px)'],
            opacity: [0, 0.7, 1],
            y: [direction === 'top' ? -20 : 20, 0],
          }}
          viewport={{ once: true, amount: threshold }}
          transition={{
            duration: 0.65,
            delay: (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          className="inline-block"
          style={{ willChange: 'transform, filter, opacity' }}
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
}
