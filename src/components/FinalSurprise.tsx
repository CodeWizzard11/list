/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';
import { RomanceConfig } from '../config/romanceConfig';
import { audio } from '../utils/audioService';

interface FinalSurpriseProps {
  finalSurprise: RomanceConfig['finalSurprise'];
  boyfriendName: string;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({
  finalSurprise,
  boyfriendName,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUntieRibbon = () => {
    audio.playRibbonUntie();
    setIsOpen(true);
  };

  const handleTieBack = () => {
    audio.playLipstickTwist();
    setIsOpen(false);
  };

  const handleWhatsAppClick = () => {
    let phone = finalSurprise.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
    // If it's a 10-digit Indian mobile number, add the 91 country prefix
    if (phone.length === 10) {
      phone = `91${phone}`;
    }
    const text = encodeURIComponent(finalSurprise.whatsapp.prefilledMessage);
    const waUrl = phone
      ? `https://wa.me/${phone}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="surprise-section" className="py-24 px-4 sm:px-6 relative max-w-4xl mx-auto text-center">
      {/* Background Soft Warm Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-r from-[#F5E6E3] via-[#FAF3ED] to-[#F5ECE8] rounded-full blur-3xl -z-10 pointer-events-none opacity-70" />

      {/* Section Header */}
      <div className="max-w-xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8A6A64] font-medium block mb-2">
          A Keepsake For Your Heart
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3D121B] font-normal mb-3">
          {finalSurprise.boxTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#8A6A64]">
          One last surprise before you embark on your flight...
        </p>
      </div>

      {/* THE GIFT BOX INTERACTION */}
      <div className="relative max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED GIFT BOX TIED WITH SATIN RIBBON */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Box container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-b from-[#2D0A12] via-[#4A1521] to-[#1C060B] p-4 shadow-2xl border border-[#ECC880]/40 flex items-center justify-center relative overflow-hidden group">
                {/* Subtle Box Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#ECC880_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                {/* Vertical Satin Ribbon */}
                <div className="absolute inset-y-0 w-12 bg-gradient-to-r from-[#C5A059] via-[#F4E1A6] to-[#9C772F] shadow-md border-x border-[#ECC880]/50" />

                {/* Horizontal Satin Ribbon */}
                <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-[#C5A059] via-[#F4E1A6] to-[#9C772F] shadow-md border-y border-[#ECC880]/50" />

                {/* Center Satin Bow */}
                <div className="relative z-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#9C772F] via-[#F4E1A6] to-[#C5A059] shadow-xl border-2 border-white/60 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Gift size={32} className="text-[#3D121B]" />
                  </div>
                </div>

                {/* Shiny Sheen Animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>

              {/* UNTIE BUTTON */}
              <button
                onClick={handleUntieRibbon}
                className="mt-8 px-8 py-3.5 rounded-full bg-[#3D121B] text-[#FFF8F0] font-medium text-sm tracking-wide shadow-md hover:bg-[#5A1A24] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 group border border-[#ECC880]/40"
              >
                <Sparkles size={16} className="text-[#ECC880] group-hover:rotate-12 transition-transform" />
                <span>{finalSurprise.buttonLabel}</span>
              </button>
            </motion.div>
          ) : (
            /* UNTIED & OPENED REVELATION CARD */
            <motion.div
              key="opened-box"
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/95 rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/50 text-center relative overflow-hidden"
            >
              {/* Decorative corner ribbons */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#ECC880]/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#ECC880]/30 to-transparent pointer-events-none" />

              <span className="text-xs uppercase tracking-[0.25em] text-[#8A6A64] font-medium block mb-4">
                A Permanent Promise
              </span>

              {/* Exact Prompt Text */}
              <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#3D121B] leading-snug font-normal max-w-lg mx-auto mb-6">
                “{finalSurprise.mainQuote}”
              </blockquote>

              <p className="text-sm text-[#6E4F49] max-w-md mx-auto leading-relaxed mb-8 font-light">
                {finalSurprise.heartfeltNote}
              </p>

              {/* Ending Blessing & Signature */}
              <div className="mb-10">
                <p className="font-serif text-lg text-[#5A1A24] font-medium mb-1">
                  “{finalSurprise.sendoff}”
                </p>
                <span className="font-script text-3xl sm:text-4xl text-[#3D121B] block mt-2">
                  With love, {boyfriendName}
                </span>
              </div>

              {/* Optional "I landed 💌" WhatsApp button */}
              {finalSurprise.whatsapp.enabled && (
                <div className="pt-6 border-t border-[#EAE0DC] flex flex-col items-center">
                  <p className="text-xs text-[#8A6A64] mb-3">
                    Touchdown in Georgia or Doha? Let me know with a single tap:
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1FAF38] hover:bg-[#1C9631] text-white font-medium text-sm tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle size={18} />
                    <span>{finalSurprise.whatsapp.buttonLabel}</span>
                  </button>
                  <span className="text-[11px] text-[#A68882] mt-2">
                    Opens WhatsApp with your prefilled romantic touchdown note
                  </span>
                </div>
              )}

              {/* Re-tie option */}
              <div className="mt-8 pt-4">
                <button
                  onClick={handleTieBack}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8A6A64] hover:text-[#3D121B] cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Tie ribbon back up</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
