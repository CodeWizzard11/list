/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Compass, Sparkles } from 'lucide-react';
import { audio } from '../utils/audioService';

interface MainHeroProps {
  girlfriendName: string;
  boyfriendName: string;
  headline: string;
  subheadline: string;
  curatedBy: string;
  openBagCta: string;
  onOpenBag: () => void;
  onViewRoute: () => void;
}

export const MainHero: React.FC<MainHeroProps> = ({
  girlfriendName,
  boyfriendName,
  headline,
  subheadline,
  curatedBy,
  openBagCta,
  onOpenBag,
  onViewRoute,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#F5E6E3] via-[#FAF3ED] to-transparent rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Subtle Editorial Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 text-xs tracking-[0.25em] uppercase text-[#8A6A64]"
        >
          <span>A Travel Vanity for</span>
          <span className="font-semibold text-[#5A1A24]">{girlfriendName}</span>
        </motion.div>

        {/* Primary Editorial Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#3D121B] font-normal tracking-tight leading-[1.15] mb-6 text-balance"
        >
          {headline}
        </motion.h1>

        {/* Warm Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#6E4F49] max-w-2xl mx-auto leading-relaxed mb-8 font-light"
        >
          {subheadline}
        </motion.p>

        {/* Small Handwritten "Made for you, by [Your Name]" Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center justify-center mb-10"
        >
          <span className="text-xs uppercase tracking-widest text-[#9C7A75] mb-1 font-sans">
            {curatedBy}
          </span>
          <span className="font-script text-3xl sm:text-4xl text-[#5A1A24] transform -rotate-1">
            {boyfriendName}
          </span>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
        </motion.div>

        {/* Primary Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <button
            onClick={() => {
              audio.playCompactOpen();
              onOpenBag();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4A1521] text-[#FAF7F2] font-medium text-sm tracking-wide shadow-md hover:bg-[#5E1E2C] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group border border-[#ECC880]/30"
          >
            <Sparkles size={16} className="text-[#E5C384] group-hover:rotate-12 transition-transform" />
            <span>{openBagCta}</span>
          </button>

          <button
            onClick={onViewRoute}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#4A1521] border border-[#E0D0CC] font-medium text-sm tracking-wide shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass size={16} className="text-[#8A6A64]" />
            <span>Trace The Route</span>
          </button>
        </motion.div>

        {/* Decorative Quick Travel Overview Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-[#EAE0DC] flex items-center justify-center gap-6 sm:gap-12 text-xs tracking-wider text-[#8A6A64] uppercase"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C68B82]" />
            <span>India</span>
          </div>
          <span className="text-[#D8A49B]">→</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>Doha</span>
          </div>
          <span className="text-[#D8A49B]">→</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5A1A24]" />
            <span className="font-semibold text-[#5A1A24]">Georgia 🇬🇪</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
