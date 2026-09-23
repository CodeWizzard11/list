/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Sparkles, Feather } from 'lucide-react';
import { RomanceConfig } from '../config/romanceConfig';
import { audio } from '../utils/audioService';

interface OpenWhenLettersProps {
  letters: RomanceConfig['letters'];
  boyfriendName: string;
}

export const OpenWhenLetters: React.FC<OpenWhenLettersProps> = ({
  letters,
  boyfriendName,
}) => {
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);

  const activeLetter = letters.items.find((item) => item.id === activeLetterId);

  const handleOpenLetter = (id: string) => {
    setActiveLetterId(id);
    audio.playLetterOpen();
  };

  const handleClose = () => {
    setActiveLetterId(null);
  };

  return (
    <section id="letters-section" className="py-20 px-4 sm:px-6 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8A6A64] font-medium block mb-2">
          {letters.subtitle}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3D121B] font-normal mb-4">
          {letters.title}
        </h2>
        <p className="text-sm sm:text-base text-[#6E4F49] leading-relaxed">
          {letters.description}
        </p>
      </div>

      {/* The 3 Envelopes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {letters.items.map((letter) => (
          <div
            key={letter.id}
            onClick={() => handleOpenLetter(letter.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenLetter(letter.id);
              }
            }}
            className="group relative flex flex-col items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-2xl"
          >
            {/* Elegant Envelope Object */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EF] to-[#F5ECE8] border border-[#E4D1CC] shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between p-6">
              {/* Envelope flap diagonal fold lines */}
              <svg
                viewBox="0 0 300 200"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              >
                {/* Triangular top flap fold */}
                <polygon
                  points="0,0 150,110 300,0"
                  fill="none"
                  stroke="#C68B82"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Bottom envelope folds */}
                <line x1="0" y1="200" x2="110" y2="100" stroke="#C68B82" strokeWidth="1" />
                <line x1="300" y1="200" x2="190" y2="100" stroke="#C68B82" strokeWidth="1" />
              </svg>

              {/* Envelope Postage Stamp */}
              <div className="self-end z-10">
                <div className="px-2.5 py-1.5 rounded-sm bg-white/90 border border-dashed border-[#C5A059] shadow-2xs text-[9px] font-mono tracking-widest text-[#7A5817] uppercase flex items-center gap-1">
                  <span>AIR MAIL</span>
                  <span className="text-[#C5A059]">✦</span>
                </div>
              </div>

              {/* Central Lipstick Kiss Seal */}
              <div className="self-center z-10 flex flex-col items-center my-auto">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7E1C2E] to-[#B83E58] shadow-md border-2 border-[#ECC880]/60 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-xl filter drop-shadow-sm select-none">💋</span>
                </div>
              </div>

              {/* Envelope Label & Title */}
              <div className="z-10 text-center w-full">
                <h3 className="font-serif text-lg font-semibold text-[#3D121B] group-hover:text-[#5A1A24] transition-colors">
                  {letter.title}
                </h3>
                <span className="text-[11px] text-[#8A6A64] block mt-0.5 font-medium">
                  {letter.stamp}
                </span>
              </div>
            </div>

            {/* Quick action cue */}
            <span className="mt-3 text-xs font-medium text-[#5A1A24] group-hover:underline flex items-center gap-1">
              <span>Unfold letter</span>
              <span>→</span>
            </span>
          </div>
        ))}
      </div>

      {/* FULL-SCREEN LETTER UNFOLD MODAL */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D4AF37]/50 my-8 overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(#F5ECE8 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 text-[#8A6A64] hover:text-[#3D121B] rounded-full hover:bg-[#FAF3ED] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Letter Header */}
              <div className="border-b border-[#EAE0DC] pb-6 mb-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A6A64] font-medium mb-1">
                  <span>Letter</span>
                  <span>·</span>
                  <span className="text-[#5A1A24] font-semibold">{activeLetter.stamp}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3D121B] font-normal">
                  {activeLetter.title}
                </h3>
                <p className="text-xs text-[#9C7A75] italic mt-1">
                  {activeLetter.subtitle}
                </p>
              </div>

              {/* Letter Body Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#4A3B39] leading-relaxed font-light">
                {activeLetter.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Romantic Signoff */}
              <div className="mt-8 pt-6 border-t border-[#EAE0DC] flex flex-col items-end">
                <span className="text-xs uppercase tracking-widest text-[#8A6A64]">
                  {activeLetter.signoff}
                </span>
                <span className="font-script text-3xl sm:text-4xl text-[#5A1A24] mt-1">
                  {boyfriendName}
                </span>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-[#D8A49B]">
                  <span>💋</span>
                  <span className="text-[10px] tracking-wider uppercase text-[#8A6A64]">
                    Sealed with my entire heart
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center mt-8 pt-4">
                <span className="text-xs text-[#9C7A75]">
                  Readable anytime, anywhere offline
                </span>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 rounded-full bg-[#3D121B] text-xs font-medium text-white hover:bg-[#5A1A24] transition-colors cursor-pointer"
                >
                  Fold & Return to Bag
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
