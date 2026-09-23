/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Sparkles, Heart, ChevronLeft, ChevronRight, Wind } from 'lucide-react';
import { RomanceConfig } from '../config/romanceConfig';
import { audio } from '../utils/audioService';

interface BeautyBagVanityProps {
  vanity: RomanceConfig['vanity'];
}

type ActiveProductType = 'mirror' | 'eyeshadow' | 'perfume' | 'lipstick' | null;

export const BeautyBagVanity: React.FC<BeautyBagVanityProps> = ({ vanity }) => {
  const [activeProduct, setActiveProduct] = useState<ActiveProductType>(null);

  // Sub-states for products
  const [selectedShadeIndex, setSelectedShadeIndex] = useState<number>(0);
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number>(0);
  const [isSpritzing, setIsSpritzing] = useState<boolean>(false);
  const [mirrorFlipCount, setMirrorFlipCount] = useState<number>(0);
  const [lipstickKissCount, setLipstickKissCount] = useState<number>(0);

  const handleOpenProduct = (product: ActiveProductType) => {
    setActiveProduct(product);
    if (product === 'mirror') {
      audio.playCompactOpen();
      setMirrorFlipCount((c) => c + 1);
    } else if (product === 'eyeshadow') {
      audio.playCompactOpen();
    } else if (product === 'perfume') {
      handleSpritzPerfume();
    } else if (product === 'lipstick') {
      audio.playLipstickTwist();
      setLipstickKissCount((c) => c + 1);
    }
  };

  const handleSpritzPerfume = () => {
    setIsSpritzing(true);
    audio.playPerfumeSpritz();
    setTimeout(() => {
      setIsSpritzing(false);
    }, 1400);
  };

  const handleClose = () => {
    setActiveProduct(null);
  };

  return (
    <section id="vanity-section" className="py-20 px-4 sm:px-6 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8A6A64] font-medium block mb-2">
          {vanity.subtitle}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3D121B] font-normal mb-4">
          {vanity.title}
        </h2>
        <p className="text-sm sm:text-base text-[#6E4F49] leading-relaxed">
          {vanity.description}
        </p>
      </div>

      {/* The Open Cosmetic Pouch / Vanity Tray */}
      <div className="relative rounded-3xl p-6 sm:p-12 shadow-xl border border-[#E4D1CC] overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EF] to-[#F5ECE8]">
        {/* Decorative Gold Zipper Edge of the Vanity Pouch */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#B38C3B] via-[#F4E1A6] to-[#A37B34] flex items-center justify-between px-6 shadow-sm">
          <div className="h-1.5 w-full flex space-x-1 opacity-70">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#4A1521]/40 rounded-xs" />
            ))}
          </div>
          {/* Gold Zipper Pull */}
          <div className="absolute right-10 -bottom-3 w-5 h-8 bg-gradient-to-b from-[#F4E1A6] to-[#A37B34] rounded-sm shadow-md border border-[#C5A059] flex items-center justify-center">
            <div className="w-1.5 h-3 bg-[#4A1521]/40 rounded-full" />
          </div>
        </div>

        {/* Satin quilted pouch interior texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#D8A49B_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* 4 Vanity Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-6 relative z-10">
          {/* PRODUCT 1: COMPACT MIRROR */}
          <button
            onClick={() => handleOpenProduct('mirror')}
            className="group flex flex-col items-center p-6 rounded-2xl bg-white/80 hover:bg-white border border-[#EBE0DC] hover:border-[#C5A059]/60 shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            {/* Mirror Illustration */}
            <div className="w-28 h-28 relative mb-4 flex items-center justify-center">
              {/* Outer Golden Clasp Case */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#9C772F] via-[#F4E1A6] to-[#C5A059] p-1 shadow-md group-hover:scale-105 transition-transform duration-300">
                {/* Frosted Mirror Inset */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FAF9F5] via-[#EAE6DF] to-[#D4CEC5] p-2 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/70 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Sparkles size={20} className="text-[#C5A059]" />
                </div>
              </div>
            </div>
            <h3 className="font-serif text-lg font-medium text-[#3D121B] group-hover:text-[#5A1A24]">
              {vanity.mirror.title}
            </h3>
            <span className="text-xs text-[#8A6A64] mt-1 italic">
              “{vanity.mirror.subtitle}”
            </span>
            <span className="mt-3 text-[11px] font-semibold text-[#5A1A24] uppercase tracking-wider bg-[#FAF3ED] px-3 py-1 rounded-full border border-[#E8DCD7]">
              Tap to open
            </span>
          </button>

          {/* PRODUCT 2: EYESHADOW PALETTE */}
          <button
            onClick={() => handleOpenProduct('eyeshadow')}
            className="group flex flex-col items-center p-6 rounded-2xl bg-white/80 hover:bg-white border border-[#EBE0DC] hover:border-[#C5A059]/60 shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            {/* Palette Illustration */}
            <div className="w-28 h-28 relative mb-4 flex items-center justify-center">
              <div className="w-24 h-22 rounded-xl bg-gradient-to-br from-[#2D0B12] via-[#4A1521] to-[#1C0A0E] p-2 shadow-md border border-[#ECC880]/50 group-hover:scale-105 transition-transform duration-300">
                {/* 6 mini color pans */}
                <div className="grid grid-cols-3 gap-1.5 h-full">
                  {vanity.eyeshadow.shades.map((shade) => (
                    <div
                      key={shade.id}
                      className="rounded-sm shadow-xs border border-white/20"
                      style={{ backgroundColor: shade.color }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h3 className="font-serif text-lg font-medium text-[#3D121B] group-hover:text-[#5A1A24]">
              {vanity.eyeshadow.title}
            </h3>
            <span className="text-xs text-[#8A6A64] mt-1 italic">
              “{vanity.eyeshadow.subtitle}”
            </span>
            <span className="mt-3 text-[11px] font-semibold text-[#5A1A24] uppercase tracking-wider bg-[#FAF3ED] px-3 py-1 rounded-full border border-[#E8DCD7]">
              Tap to open
            </span>
          </button>

          {/* PRODUCT 3: PERFUME BOTTLE */}
          <button
            onClick={() => handleOpenProduct('perfume')}
            className="group flex flex-col items-center p-6 rounded-2xl bg-white/80 hover:bg-white border border-[#EBE0DC] hover:border-[#C5A059]/60 shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            {/* Perfume Bottle Illustration */}
            <div className="w-28 h-28 relative mb-4 flex items-center justify-center">
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                {/* Vintage Atomizer Spray Head */}
                <div className="w-4 h-3 bg-gradient-to-r from-[#D8B257] to-[#A37B34] rounded-t-xs" />
                <div className="w-8 h-2 bg-[#C5A059] rounded-xs shadow-xs" />
                {/* Faceted Glass Flacon Body */}
                <div className="w-18 h-20 rounded-b-xl bg-gradient-to-b from-white/90 via-[#F5E6E3]/70 to-[#FAF0ED]/90 border border-[#D4AF37]/50 shadow-md p-1 flex items-center justify-center relative backdrop-blur-xs">
                  {/* Internal Fragrance Liquid */}
                  <div className="w-full h-14 bg-gradient-to-t from-[#D8A49B]/50 to-transparent rounded-b-lg self-end" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] font-serif uppercase tracking-widest text-[#4A1521] font-semibold">
                      Amour
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="font-serif text-lg font-medium text-[#3D121B] group-hover:text-[#5A1A24]">
              {vanity.perfume.title}
            </h3>
            <span className="text-xs text-[#8A6A64] mt-1 italic">
              “{vanity.perfume.subtitle}”
            </span>
            <span className="mt-3 text-[11px] font-semibold text-[#5A1A24] uppercase tracking-wider bg-[#FAF3ED] px-3 py-1 rounded-full border border-[#E8DCD7]">
              Tap to open
            </span>
          </button>

          {/* PRODUCT 4: LIPSTICK */}
          <button
            onClick={() => handleOpenProduct('lipstick')}
            className="group flex flex-col items-center p-6 rounded-2xl bg-white/80 hover:bg-white border border-[#EBE0DC] hover:border-[#C5A059]/60 shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            {/* Lipstick Illustration */}
            <div className="w-28 h-28 relative mb-4 flex items-center justify-center">
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                {/* Red bullet */}
                <div className="w-6 h-8 rounded-t-full bg-gradient-to-b from-[#A83248] to-[#5A1A24] -mb-1 shadow-sm" />
                {/* Gold sleeve */}
                <div className="w-8 h-6 bg-gradient-to-r from-[#D8B257] via-[#FFF4CF] to-[#9C772F] border border-[#ECC880]" />
                {/* Base case */}
                <div className="w-9 h-12 rounded-b-md bg-[#2D0B12] border border-[#ECC880]/40 shadow-md" />
              </div>
            </div>
            <h3 className="font-serif text-lg font-medium text-[#3D121B] group-hover:text-[#5A1A24]">
              {vanity.lipstick.title}
            </h3>
            <span className="text-xs text-[#8A6A64] mt-1 italic">
              “{vanity.lipstick.subtitle}”
            </span>
            <span className="mt-3 text-[11px] font-semibold text-[#5A1A24] uppercase tracking-wider bg-[#FAF3ED] px-3 py-1 rounded-full border border-[#E8DCD7]">
              Tap to open
            </span>
          </button>
        </div>
      </div>

      {/* MODAL 1: COMPACT MIRROR */}
      <AnimatePresence>
        {activeProduct === 'mirror' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-[#8A6A64] hover:text-[#3D121B] rounded-full hover:bg-[#FAF3ED] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs uppercase tracking-widest text-[#8A6A64] font-medium">
                  {vanity.mirror.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3D121B] mt-1 mb-6">
                  {vanity.mirror.title}
                </h3>

                {/* THE MIRROR FRAME & REFLECTION */}
                <motion.div
                  key={mirrorFlipCount}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-full p-3 shadow-inner bg-gradient-to-tr from-[#9C772F] via-[#F4E1A6] to-[#C5A059] flex items-center justify-center my-6"
                >
                  {/* Decorative Mirrored Surface (No camera required, soft luxury reflection vignette) */}
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#FDFBF7] via-[#F4EDE6] to-[#EAE2D8] border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    {/* Mirror shimmer shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />

                    {/* Glowing golden halo */}
                    <div className="absolute w-44 h-44 rounded-full bg-[#E5C384]/20 blur-xl pointer-events-none" />

                    {/* Central mirror reminder quote */}
                    <div className="relative z-10">
                      <Sparkles size={24} className="text-[#C5A059] mx-auto mb-3" />
                      <blockquote className="font-serif italic text-lg sm:text-xl text-[#3D121B] leading-snug font-medium mb-3">
                        “{vanity.mirror.mainMessage}”
                      </blockquote>
                      <p className="text-xs text-[#8A6A64] leading-relaxed max-w-xs mx-auto">
                        {vanity.mirror.whisperNote}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Replay / Interaction Bar */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => {
                      audio.playCompactOpen();
                      setMirrorFlipCount((c) => c + 1);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF3ED] text-xs font-medium text-[#4A1521] hover:bg-[#F2E5DF] border border-[#E8DCD7] transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Replay Mirror Reveal</span>
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 rounded-full bg-[#3D121B] text-xs font-medium text-white hover:bg-[#5A1A24] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: EYESHADOW PALETTE */}
      <AnimatePresence>
        {activeProduct === 'eyeshadow' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-[#8A6A64] hover:text-[#3D121B] rounded-full hover:bg-[#FAF3ED] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs uppercase tracking-widest text-[#8A6A64] font-medium">
                  {vanity.eyeshadow.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3D121B] mt-1 mb-1">
                  {vanity.eyeshadow.title}
                </h3>
                <p className="text-xs text-[#9C7A75] mb-6">
                  {vanity.eyeshadow.paletteName} · Tap any shade to read your mood note
                </p>

                {/* THE 6 EYESHADOW PANS */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#FAF4F0] border border-[#EAE0DC] shadow-inner mb-6">
                  {vanity.eyeshadow.shades.map((shade, idx) => {
                    const isSelected = selectedShadeIndex === idx;
                    return (
                      <button
                        key={shade.id}
                        onClick={() => {
                          setSelectedShadeIndex(idx);
                          audio.playLipstickTwist();
                        }}
                        className={`flex flex-col items-center p-3 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-white shadow-md border-[#C5A059] scale-102 ring-2 ring-[#C5A059]/30'
                            : 'bg-white/60 hover:bg-white border-transparent'
                        }`}
                      >
                        {/* Pan swatch */}
                        <div
                          className="w-12 h-12 rounded-lg shadow-sm mb-2 border border-white/40 flex items-center justify-center relative overflow-hidden"
                          style={{ backgroundColor: shade.color }}
                        >
                          {isSelected && (
                            <Sparkles size={16} className="text-white drop-shadow-sm" />
                          )}
                        </div>
                        <span className="text-xs font-semibold text-[#3D121B] leading-tight">
                          {shade.name}
                        </span>
                        <span className="text-[10px] text-[#8A6A64] mt-0.5">
                          {shade.finish}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* SELECTED SHADE MESSAGE CARD */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={vanity.eyeshadow.shades[selectedShadeIndex].id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF3ED] to-[#F5ECE8] border border-[#EADAD6] text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: vanity.eyeshadow.shades[selectedShadeIndex].color }}
                        />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#5A1A24]">
                          {vanity.eyeshadow.shades[selectedShadeIndex].name}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8A6A64]">
                        {vanity.eyeshadow.shades[selectedShadeIndex].tone}
                      </span>
                    </div>

                    <p className="font-serif italic text-base sm:text-lg text-[#3D121B] leading-relaxed">
                      “{vanity.eyeshadow.shades[selectedShadeIndex].note}”
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 rounded-full bg-[#3D121B] text-xs font-medium text-white hover:bg-[#5A1A24] transition-colors cursor-pointer"
                  >
                    Close Palette
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: PERFUME BOTTLE */}
      <AnimatePresence>
        {activeProduct === 'perfume' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 overflow-hidden"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-[#8A6A64] hover:text-[#3D121B] rounded-full hover:bg-[#FAF3ED] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs uppercase tracking-widest text-[#8A6A64] font-medium">
                  {vanity.perfume.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3D121B] mt-1 mb-1">
                  {vanity.perfume.title}
                </h3>
                <p className="text-xs text-[#9C7A75] mb-4">
                  {vanity.perfume.notes}
                </p>

                {/* THE ATOMIZER INTERACTION BUTTON */}
                <div className="relative py-4 flex flex-col items-center justify-center">
                  <button
                    onClick={handleSpritzPerfume}
                    className="relative group p-4 rounded-2xl bg-gradient-to-b from-[#FAF4F0] to-[#F5ECE8] border border-[#EADAD6] hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#5A1A24] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Wind size={18} />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-semibold text-[#3D121B] block">
                        Tap Atomizer to Spritz Mist
                      </span>
                      <span className="text-[11px] text-[#8A6A64]">
                        Releases a fragrant memory of us
                      </span>
                    </div>
                  </button>

                  {/* Gentle Mist Particle Animation */}
                  <AnimatePresence>
                    {isSpritzing && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6, y: 10 }}
                        animate={{ opacity: 1, scale: 1.2, y: -20 }}
                        exit={{ opacity: 0, scale: 1.4 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none"
                      >
                        <div className="w-48 h-32 rounded-full bg-gradient-to-t from-[#F5E6E3]/90 via-[#FFF8F0]/80 to-transparent blur-md flex items-center justify-center">
                          <span className="text-xs tracking-widest uppercase text-[#5A1A24] font-serif font-medium">
                            🌸 Scent of love...
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* MEMORY CARD REVEALED BY MIST */}
                <motion.div
                  key={activeMemoryIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 p-5 rounded-2xl bg-white border border-[#EADAD6] shadow-sm text-left relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs text-[#8A6A64] mb-2">
                    <span className="font-semibold text-[#5A1A24] uppercase tracking-wider">
                      {vanity.perfume.memories[activeMemoryIndex].tag}
                    </span>
                    <span>{vanity.perfume.memories[activeMemoryIndex].dateOrPlace}</span>
                  </div>

                  <h4 className="font-serif text-lg font-medium text-[#3D121B] mb-2">
                    {vanity.perfume.memories[activeMemoryIndex].title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#6E4F49] leading-relaxed">
                    “{vanity.perfume.memories[activeMemoryIndex].caption}”
                  </p>

                  {/* Memory Switcher Carousel */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F2E5E1]">
                    <button
                      onClick={() => {
                        setActiveMemoryIndex(
                          (prev) => (prev - 1 + vanity.perfume.memories.length) % vanity.perfume.memories.length
                        );
                        audio.playLipstickTwist();
                      }}
                      className="p-1 rounded-full text-[#8A6A64] hover:text-[#3D121B] hover:bg-[#FAF3ED] cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-[11px] text-[#A68882]">
                      Memory {activeMemoryIndex + 1} of {vanity.perfume.memories.length}
                    </span>
                    <button
                      onClick={() => {
                        setActiveMemoryIndex((prev) => (prev + 1) % vanity.perfume.memories.length);
                        audio.playLipstickTwist();
                      }}
                      className="p-1 rounded-full text-[#8A6A64] hover:text-[#3D121B] hover:bg-[#FAF3ED] cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 rounded-full bg-[#3D121B] text-xs font-medium text-white hover:bg-[#5A1A24] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: LIPSTICK */}
      <AnimatePresence>
        {activeProduct === 'lipstick' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 overflow-hidden"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-[#8A6A64] hover:text-[#3D121B] rounded-full hover:bg-[#FAF3ED] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs uppercase tracking-widest text-[#8A6A64] font-medium">
                  {vanity.lipstick.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3D121B] mt-1 mb-1">
                  {vanity.lipstick.title}
                </h3>
                <span className="text-xs text-[#9C7A75] block mb-4">
                  {vanity.lipstick.shadeName}
                </span>

                {/* REALISTIC 3D MINI LIPSTICK INTERACTION */}
                <div className="relative py-2 flex flex-col items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    {/* Twisted Wax Bullet */}
                    <motion.div
                      animate={{
                        y: lipstickKissCount % 2 === 0 ? -18 : 12,
                        scaleY: lipstickKissCount % 2 === 0 ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-10 h-20 origin-bottom z-10"
                    >
                      <svg viewBox="0 0 40 80" className="w-full h-full drop-shadow-md">
                        <defs>
                          <linearGradient id="miniBulletGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4A0E18" />
                            <stop offset="35%" stopColor="#8A1E32" />
                            <stop offset="65%" stopColor="#B32D48" />
                            <stop offset="100%" stopColor="#3B0A12" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M8,32 C8,18 14,3 26,1 C32,0 34,5 34,16 L34,80 L8,80 Z"
                          fill="url(#miniBulletGrad)"
                        />
                        <path
                          d="M12,24 L28,8"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Gold Elevator Ring */}
                    <div className="w-12 h-14 -mt-2 bg-gradient-to-r from-[#7A5817] via-[#FFF6D6] to-[#7A5817] border border-[#ECC880] rounded-t-sm z-20 shadow-md flex items-center justify-center">
                      <div className="w-full h-1 border-t border-b border-[#3D2908]/40" />
                    </div>

                    {/* Burgundy Lacquer Base */}
                    <div className="w-14 h-20 -mt-1 bg-gradient-to-b from-[#18080C] via-[#380E17] to-[#150508] border border-[#ECC880]/50 rounded-b-lg z-20 shadow-xl flex items-center justify-center">
                      <span className="text-[8px] uppercase tracking-widest text-[#ECC880]/80 font-serif rotate-90">
                        Pour Elle
                      </span>
                    </div>
                  </div>
                </div>

                {/* THE KISS REVEAL CARD */}
                <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#FAF4F0] to-[#F5ECE8] border border-[#EADAD6] my-4 flex flex-col items-center justify-center overflow-hidden">
                  {/* Animated Lipstick Kiss Mark */}
                  <motion.div
                    key={lipstickKissCount}
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: -6, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                    className="relative mb-3"
                  >
                    {/* Realistic Kiss Impression SVG */}
                    <svg viewBox="0 0 100 70" className="w-24 h-16 drop-shadow-md">
                      <defs>
                        <radialGradient id="kissShine" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#C4344E" />
                          <stop offset="80%" stopColor="#7E1C2E" />
                          <stop offset="100%" stopColor="#4A0E18" />
                        </radialGradient>
                      </defs>
                      {/* Top Lip with bow curve and lip texture grooves */}
                      <path
                        d="M18,34 C24,18 42,16 50,23 C58,16 76,18 82,34 C72,28 58,29 50,32 C42,29 28,28 18,34 Z"
                        fill="url(#kissShine)"
                        opacity="0.95"
                      />
                      {/* Bottom Lip with fleshy curve */}
                      <path
                        d="M24,39 C32,58 42,64 50,62 C58,64 68,58 76,39 C66,45 56,44 50,42 C44,44 34,45 24,39 Z"
                        fill="url(#kissShine)"
                        opacity="0.92"
                      />
                      {/* Center mouth line */}
                      <path
                        d="M28,37 C38,40 62,40 72,37"
                        stroke="#FFF"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity="0.3"
                      />
                    </svg>
                  </motion.div>

                  {/* Requested Message from prompt */}
                  <blockquote className="font-serif italic text-xl sm:text-2xl text-[#5A1A24] leading-snug font-medium mb-2">
                    “{vanity.lipstick.message}”
                  </blockquote>

                  <p className="text-xs text-[#6E4F49] max-w-sm leading-relaxed text-center">
                    {vanity.lipstick.subMessage}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 mt-5">
                  <button
                    onClick={() => {
                      audio.playLipstickTwist();
                      setLipstickKissCount((c) => c + 1);
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FAF3ED] text-xs font-medium text-[#4A1521] hover:bg-[#F2E5DF] border border-[#E8DCD7] transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Twist & Send Another Kiss</span>
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-full bg-[#3D121B] text-xs font-medium text-white hover:bg-[#5A1A24] transition-colors cursor-pointer"
                  >
                    Keep in Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
