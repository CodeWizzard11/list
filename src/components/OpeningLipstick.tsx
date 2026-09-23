/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { audio } from '../utils/audioService';

interface OpeningLipstickProps {
  onComplete: () => void;
  leadText: string;
  actionPrompt: string;
  lipstickRevealText: string;
  skipButtonText: string;
}

type LipstickStage = 'closed' | 'cap_off' | 'twisted_up' | 'swiping' | 'swatched';

export const OpeningLipstick: React.FC<OpeningLipstickProps> = ({
  onComplete,
  leadText,
  actionPrompt,
  lipstickRevealText,
  skipButtonText,
}) => {
  const [stage, setStage] = useState<LipstickStage>('closed');
  const [twistHeight, setTwistHeight] = useState<number>(0); // 0 (hidden inside) to 100 (fully twisted up)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Auto-play the realistic physical sequence if she clicks "Tap to twist open your surprise"
  const handleAutoOpen = () => {
    setHasInteracted(true);
    // 1. Pop off magnetic cap
    audio.playLipstickCapClick();
    setStage('cap_off');

    // 2. Twist up bullet smoothly
    setTimeout(() => {
      audio.playLipstickTwist();
      setStage('twisted_up');
      setTwistHeight(100);
    }, 900);

    // 3. Swatch creamy lipstick
    setTimeout(() => {
      audio.playLipstickGlide();
      setStage('swiping');
    }, 2100);

    // 4. Reveal heartfelt message
    setTimeout(() => {
      setStage('swatched');
    }, 3200);
  };

  // Manual step 1: Pull off magnetic cap
  const handlePullCap = () => {
    if (stage === 'closed') {
      audio.playLipstickCapClick();
      setStage('cap_off');
      setHasInteracted(true);
    }
  };

  // Manual step 2: Twist bullet up
  const handleTwistUp = () => {
    if (stage === 'cap_off') {
      audio.playLipstickTwist();
      setStage('twisted_up');
      setTwistHeight(100);
    }
  };

  // Manual step 3: Apply swatch
  const handleApplySwatch = () => {
    if (stage === 'twisted_up') {
      audio.playLipstickGlide();
      setStage('swiping');
      setTimeout(() => {
        setStage('swatched');
      }, 1100);
    }
  };

  // Reset to try again
  const handleReset = () => {
    setStage('closed');
    setTwistHeight(0);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col justify-between items-center px-4 sm:px-6 py-8 bg-[#FAF6F0] select-none overflow-hidden"
    >
      {/* Luxurious Silk Background with soft warm lighting */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 38%, #FFFDF9 0%, #F8EFE9 50%, #EFE1DA 100%)',
        }}
      />

      {/* Top Bar: Subtle Skip & Replay */}
      <div className="w-full max-w-2xl flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8A6A64] font-medium">
            Travel Keepsake Edition
          </span>
        </div>

        <button
          onClick={onComplete}
          className="text-xs uppercase tracking-wider text-[#8A6A64] hover:text-[#3D121B] py-1.5 px-3 rounded-full hover:bg-white/60 transition-colors cursor-pointer border border-[#E8DCD7]/60"
        >
          {skipButtonText} →
        </button>
      </div>

      {/* CENTER STAGE: THE REALISTIC PHYSICAL LIPSTICK */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10 w-full max-w-md">
        {/* Soft radial shadow under lipstick */}
        <div className="absolute -bottom-8 w-44 h-8 bg-[#3D121B]/15 rounded-full blur-xl pointer-events-none" />

        {/* 3D LIPSTICK MECHANISM CONTAINER */}
        <div className="relative flex flex-col items-center select-none">
          {/* 1. THE MAGNETIC CAP */}
          <motion.div
            onClick={handlePullCap}
            animate={
              stage === 'closed'
                ? { y: 0, x: 0, rotate: 0, opacity: 1 }
                : { y: -160, x: 80, rotate: 28, opacity: 0.88, scale: 0.95 }
            }
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 14,
              mass: 0.8,
            }}
            className="relative w-20 h-44 rounded-t-2xl z-30 cursor-pointer shadow-2xl overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #18080C 0%, #380E17 35%, #250910 70%, #150508 100%)',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
            }}
          >
            {/* Specular Cylindrical Reflection Highlight (moves on hover) */}
            <div className="absolute inset-y-0 left-4 w-2.5 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute inset-y-0 left-7 w-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Subtle Right Rim Shadow for 3D depth */}
            <div className="absolute inset-y-0 right-0 w-3 bg-black/40" />

            {/* Polished Gold Trim at Cap Base */}
            <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-r from-[#8C6926] via-[#F6E3A8] to-[#9A732B] border-t border-b border-[#ECC880] shadow-md flex items-center justify-center">
              <div className="w-full h-1 border-t border-b border-[#523B12]/40" />
            </div>

            {/* Embossed Monogram Badge */}
            <div className="absolute top-8 inset-x-0 flex flex-col items-center">
              <span className="font-serif text-[11px] tracking-[0.25em] text-[#F3DF9F] uppercase font-semibold">
                ROUGE
              </span>
              <span className="text-[9px] tracking-widest text-[#ECC880]/70 font-mono mt-0.5">
                N° 23
              </span>
            </div>

            {/* Hover cue when closed */}
            {stage === 'closed' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white tracking-widest uppercase font-sans font-medium px-2 py-1 rounded bg-black/40 backdrop-blur-xs">
                  Pull Cap
                </span>
              </div>
            )}
          </motion.div>

          {/* 2. INNER MECHANISM: GOLD FLUTED SLEEVE & CHISEL BULLET */}
          <div className="relative -mt-4 w-18 h-40 flex flex-col items-center z-20">
            {/* The Precision Fluted Gold Elevator Collar */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 rounded-t-md z-20 shadow-lg flex flex-col justify-between overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #7A5817 0%, #D4AF37 25%, #FFF6D6 50%, #D4AF37 75%, #7A5817 100%)',
                border: '1.5px solid #ECC880',
              }}
            >
              {/* Micro-machined vertical ribbing lines */}
              <div className="w-full h-full flex justify-around opacity-40 px-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-[1px] h-full bg-[#3D2908]" />
                ))}
              </div>

              {/* Collar Lip Ring */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#A88232] via-[#FFF6D6] to-[#A88232] border-b border-[#523B12]/40" />
            </div>

            {/* THE LIPSTICK WAX BULLET (Rises with realistic helical twist) */}
            <motion.div
              animate={
                stage === 'closed'
                  ? { y: 38, scaleY: 0.5, rotate: 0, opacity: 0 }
                  : stage === 'cap_off'
                  ? { y: 22, scaleY: 0.7, rotate: 0, opacity: 1 }
                  : { y: -36, scaleY: 1, rotate: 8, opacity: 1 }
              }
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-12 h-30 z-10 origin-bottom"
            >
              {/* SVG 3D Teardrop Chisel Bullet with Specular Highlight */}
              <svg viewBox="0 0 50 110" className="w-full h-full drop-shadow-xl">
                <defs>
                  {/* Rich Velvet Carmine Gradient */}
                  <linearGradient id="bulletWaxGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A0E18" />
                    <stop offset="30%" stopColor="#8A1E32" />
                    <stop offset="60%" stopColor="#B32D48" />
                    <stop offset="85%" stopColor="#8A1E32" />
                    <stop offset="100%" stopColor="#3B0A12" />
                  </linearGradient>

                  {/* Wet Gloss Specular Highlight */}
                  <linearGradient id="wetGlossHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="40%" stopColor="rgba(255,255,255,0.65)" />
                    <stop offset="70%" stopColor="transparent" />
                  </linearGradient>

                  {/* Chisel Tip Bevel Highlight */}
                  <linearGradient id="chiselBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B8B" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#B32D48" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#5E1120" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Main Cylindrical Bullet Body */}
                <path
                  d="M8,44 L8,110 L42,110 L42,26 C42,26 40,8 30,3 C24,0 16,8 12,24 C9,34 8,44 8,44 Z"
                  fill="url(#bulletWaxGrad)"
                />

                {/* Angled Chisel Teardrop Tip Facet */}
                <path
                  d="M14,26 C16,10 24,2 30,3 C38,7 42,20 40,32 C34,44 20,44 14,26 Z"
                  fill="url(#chiselBevelGrad)"
                />

                {/* Sharp Bevel Ridge Line */}
                <path
                  d="M14,26 C20,38 32,38 40,32"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                  fill="none"
                />

                {/* Specular Wet Shine down cylinder */}
                <path
                  d="M16,40 L16,110 L22,110 L22,36 Z"
                  fill="url(#wetGlossHighlight)"
                />

                {/* Embossed Kiss Mark on the Wax Face */}
                <path
                  d="M24,22 C26,19 30,19 32,22 C30,24 26,24 24,22 Z M25,24 C27,27 29,27 31,24 Z"
                  fill="#FFF"
                  opacity="0.35"
                />
              </svg>
            </motion.div>
          </div>

          {/* 3. THE WEIGHTED BASE CASING */}
          <div
            className="w-20 h-32 -mt-1 rounded-b-2xl z-20 shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #18080C 0%, #380E17 35%, #250910 70%, #150508 100%)',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
            }}
          >
            {/* Top Gold Rim of Base */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#8C6926] via-[#F6E3A8] to-[#9A732B]" />

            {/* Specular Cylindrical Reflection Streak */}
            <div className="absolute inset-y-0 left-4 w-2.5 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute inset-y-0 left-7 w-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-3 bg-black/40" />

            {/* Vertical Golden Engraving */}
            <div className="absolute inset-0 flex items-center justify-center rotate-90">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#F3DF9F]/80 font-serif font-semibold drop-shadow-xs">
                With Love · Arpan
              </span>
            </div>
          </div>
        </div>

        {/* 4. REALISTIC CREAMY LIPSTICK SWATCH STROKE OVERLAY */}
        <AnimatePresence>
          {(stage === 'swiping' || stage === 'swatched') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-x-0 -top-12 sm:-top-16 flex flex-col items-center justify-center pointer-events-none z-40"
            >
              {/* Realistic creamy velvet lipstick stroke */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="w-[90vw] max-w-md h-24 sm:h-28 origin-left relative flex items-center justify-center px-6 shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #5A101D 0%, #8A1E32 30%, #B32D48 65%, #6E1424 100%)',
                  borderRadius: '120px 40px 140px 30px',
                  boxShadow: '0 20px 45px rgba(90, 16, 29, 0.45)',
                  borderTop: '1.5px solid rgba(255, 200, 210, 0.5)',
                  borderBottom: '2px solid rgba(60, 10, 20, 0.7)',
                }}
              >
                {/* Organic wax ridges & gloss streak */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:6px_6px]" />
                <div className="absolute top-2 inset-x-4 h-3 rounded-full bg-gradient-to-r from-transparent via-white/35 to-transparent blur-xs" />

                {/* Hand-lettered reveal text */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="relative z-10 text-center"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#FFD8DF] font-medium block mb-1">
                    Kiss for the journey
                  </span>
                  <h2 className="font-serif italic text-2xl sm:text-3xl text-white tracking-wide font-normal drop-shadow-md">
                    “{lipstickRevealText}”
                  </h2>
                </motion.div>

                {/* Lipstick Kiss Seal at stroke tail */}
                <motion.span
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: -8 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                  className="absolute right-4 bottom-2 text-2xl select-none filter drop-shadow-md"
                >
                  💋
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROL DOCK: INTUITIVE & REALISTIC ACTIONS */}
      <div className="w-full max-w-md text-center flex flex-col items-center gap-3 z-20 pb-2">
        {/* Grounded, deeply human subtitle */}
        <p className="font-serif text-lg sm:text-xl text-[#3D121B] leading-snug max-w-sm">
          “{leadText}”
        </p>

        {/* STEP-BY-STEP OR ONE-CLICK CONTROLS */}
        <div className="flex flex-col items-center gap-2 w-full pt-1">
          {stage === 'closed' && (
            <motion.button
              onClick={handleAutoOpen}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3D121B] text-[#FFFDF9] text-sm tracking-wide font-medium shadow-lg hover:bg-[#5A1A24] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#ECC880]/40"
            >
              <Sparkles size={16} className="text-[#ECC880]" />
              <span>{actionPrompt}</span>
            </motion.button>
          )}

          {stage === 'cap_off' && (
            <button
              onClick={handleTwistUp}
              className="px-8 py-3 rounded-full bg-[#8A1E32] text-white text-sm font-medium shadow-md hover:bg-[#A8253E] transition-all flex items-center gap-2 cursor-pointer animate-pulse"
            >
              <span>Twist lipstick up</span>
              <span>↑</span>
            </button>
          )}

          {stage === 'twisted_up' && (
            <button
              onClick={handleApplySwatch}
              className="px-8 py-3 rounded-full bg-[#8A1E32] text-white text-sm font-medium shadow-md hover:bg-[#A8253E] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Swipe swatch across screen</span>
              <span>💄</span>
            </button>
          )}

          {stage === 'swatched' && (
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <button
                onClick={onComplete}
                className="px-8 py-3 rounded-full bg-[#3D121B] text-white text-sm font-medium shadow-lg hover:bg-[#5A1A24] transition-all flex items-center gap-2 cursor-pointer border border-[#ECC880]"
              >
                <span>Enter Your Travel Vanity</span>
                <ArrowRight size={16} className="text-[#ECC880]" />
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#8A6A64] hover:text-[#3D121B] px-3 py-1.5 cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Twist back down</span>
              </button>
            </div>
          )}
        </div>

        {/* Step progress indicator */}
        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#A68882]">
          <span className={stage === 'closed' ? 'text-[#3D121B] font-semibold' : ''}>1. Cap</span>
          <span>·</span>
          <span className={stage === 'cap_off' ? 'text-[#3D121B] font-semibold' : ''}>2. Twist</span>
          <span>·</span>
          <span className={stage === 'twisted_up' || stage === 'swiping' ? 'text-[#3D121B] font-semibold' : ''}>3. Swatch</span>
          <span>·</span>
          <span className={stage === 'swatched' ? 'text-[#3D121B] font-semibold' : ''}>4. Reveal</span>
        </div>
      </div>
    </motion.div>
  );
};
