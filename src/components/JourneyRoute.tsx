/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, MapPin, Sparkles, Compass, HeartHandshake } from 'lucide-react';
import { RomanceConfig } from '../config/romanceConfig';
import { audio } from '../utils/audioService';

interface JourneyRouteProps {
  journey: RomanceConfig['journey'];
}

export const JourneyRoute: React.FC<JourneyRouteProps> = ({ journey }) => {
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const activeStop = journey.stops[activeStopIndex];

  const handleSelectStop = (index: number) => {
    setActiveStopIndex(index);
    audio.playCompactOpen();
  };

  return (
    <section id="journey-section" className="py-20 px-4 sm:px-6 relative max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8A6A64] font-medium block mb-2">
          {journey.subtitle}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3D121B] font-normal mb-4">
          {journey.title}
        </h2>
        <p className="text-sm sm:text-base text-[#6E4F49] leading-relaxed">
          {journey.description}
        </p>
      </div>

      {/* The Interactive Lipstick Route Map Container */}
      <div className="frosted-glass rounded-3xl p-6 sm:p-10 shadow-lg border border-[#EADAD6] relative overflow-hidden">
        {/* Decorative soft rose watermarks */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#F7EBE8] to-transparent rounded-full -z-10 blur-2xl" />

        {/* The Flight Path Graphic */}
        <div className="relative mb-12 pt-6">
          {/* Lipstick Line Track */}
          <div className="relative h-2 w-full bg-[#EAD4CE] rounded-full overflow-hidden">
            {/* Glossy lipstick fill progressing to active stop */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#C68B82] via-[#B83E58] to-[#6B1D2F] rounded-full shadow-sm"
              initial={false}
              animate={{
                width: activeStopIndex === 0 ? '16%' : activeStopIndex === 1 ? '50%' : '100%',
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Tiny Animated Airplane on the route */}
          <motion.div
            className="absolute top-1 z-20 flex items-center justify-center -translate-y-1/2 -ml-4"
            initial={false}
            animate={{
              left: activeStopIndex === 0 ? '16%' : activeStopIndex === 1 ? '50%' : '95%',
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-8 rounded-full bg-[#3D121B] text-[#FFF8F0] shadow-md flex items-center justify-center border border-[#ECC880]">
              <Plane size={14} className="transform rotate-45 text-[#ECC880]" />
            </div>
          </motion.div>

          {/* 3 Stop Nodes */}
          <div className="relative flex justify-between items-center -mt-5 z-10">
            {journey.stops.map((stop, idx) => {
              const isSelected = activeStopIndex === idx;
              return (
                <button
                  key={stop.id}
                  onClick={() => handleSelectStop(idx)}
                  className="flex flex-col items-center group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-xl p-1"
                >
                  {/* Node Circle */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isSelected
                        ? 'bg-[#3D121B] border-[#ECC880] text-white scale-110 shadow-md ring-4 ring-[#ECC880]/20'
                        : 'bg-white border-[#D8A49B] text-[#6E4F49] hover:border-[#3D121B]'
                    }`}
                  >
                    <span className="text-xs font-semibold">{stop.code}</span>
                  </div>

                  {/* Node Label */}
                  <div className="mt-3 text-center">
                    <span
                      className={`block text-xs sm:text-sm font-medium transition-colors ${
                        isSelected ? 'text-[#3D121B] font-semibold' : 'text-[#8A6A64]'
                      }`}
                    >
                      {stop.city}
                    </span>
                    <span className="hidden sm:block text-[11px] text-[#A68882]">
                      {stop.country}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stop Highlight Card with Landmark Illustration & Love Note */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStop.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/70 rounded-2xl p-6 sm:p-8 border border-[#EADAD6] shadow-sm"
          >
            {/* Visual Landmark Vignette */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#FAF3ED] to-[#F5E6E3] rounded-xl border border-[#E2D2CD] relative overflow-hidden">
              {/* Landmark Silhouette SVG */}
              {activeStop.iconType === 'india' && (
                <div className="w-full flex flex-col items-center py-4">
                  <svg viewBox="0 0 160 100" className="w-40 h-28 text-[#C68B82]">
                    {/* Lotus Temple / Indian Arch & Sunrise Motif */}
                    <circle cx="80" cy="55" r="28" fill="#ECC880" opacity="0.3" />
                    <path
                      d="M10,88 L150,88 M25,88 C25,60 50,45 80,25 C110,45 135,60 135,88 Z"
                      fill="none"
                      stroke="#8A3445"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M50,88 C50,65 65,55 80,40 C95,55 110,65 110,88 Z"
                      fill="#C68B82"
                      opacity="0.25"
                      stroke="#8A3445"
                      strokeWidth="1.5"
                    />
                    {/* Spire */}
                    <line x1="80" y1="25" x2="80" y2="12" stroke="#ECC880" strokeWidth="2.5" />
                    <circle cx="80" cy="10" r="3" fill="#ECC880" />
                  </svg>
                  <span className="text-[11px] uppercase tracking-widest text-[#8A6A64] mt-2 font-medium">
                    The Origin & Departure
                  </span>
                </div>
              )}

              {activeStop.iconType === 'doha' && (
                <div className="w-full flex flex-col items-center py-4">
                  <svg viewBox="0 0 160 100" className="w-40 h-28 text-[#D4AF37]">
                    {/* Crescent & Modern Architectural Sweeps of Hamad International */}
                    <path
                      d="M80,15 C95,28 95,68 80,82 C115,75 125,35 80,15 Z"
                      fill="#ECC880"
                      opacity="0.35"
                    />
                    {/* Modern Museum of Islamic Art & Airport Curve Lines */}
                    <path
                      d="M20,88 C50,65 110,65 140,88"
                      fill="none"
                      stroke="#9C772F"
                      strokeWidth="2"
                    />
                    <path
                      d="M40,88 L40,60 L60,50 L80,35 L100,50 L120,60 L120,88 Z"
                      fill="none"
                      stroke="#9C772F"
                      strokeWidth="2"
                    />
                    <circle cx="80" cy="58" r="8" fill="#ECC880" stroke="#7A5817" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[11px] uppercase tracking-widest text-[#8A6A64] mt-2 font-medium">
                    The Oasis & Gentle Pause
                  </span>
                </div>
              )}

              {activeStop.iconType === 'georgia' && (
                <div className="w-full flex flex-col items-center py-4">
                  <svg viewBox="0 0 160 100" className="w-40 h-28">
                    {/* Caucasus Mountains & Gergeti Trinity Spire, Tbilisi Balconies */}
                    {/* Mountain Ridge in background */}
                    <polygon points="10,88 50,35 90,88" fill="#D8A49B" opacity="0.3" />
                    <polygon points="60,88 115,22 155,88" fill="#D8A49B" opacity="0.4" />
                    {/* Snow Caps */}
                    <polygon points="108,30 115,22 122,30 115,26" fill="#FFFFFF" />
                    {/* Gergeti / Georgian Stone Church Silhouette */}
                    <rect x="70" y="55" width="22" height="33" fill="#5A1A24" opacity="0.8" />
                    <polygon points="81,38 68,55 94,55" fill="#3D121B" />
                    {/* Georgian Orthodox Cross atop spire */}
                    <line x1="81" y1="38" x2="81" y2="30" stroke="#ECC880" strokeWidth="2" />
                    <line x1="77" y1="33" x2="85" y2="33" stroke="#ECC880" strokeWidth="2" />
                    {/* Base ground line */}
                    <line x1="10" y1="88" x2="150" y2="88" stroke="#3D121B" strokeWidth="2" />
                  </svg>
                  <span className="text-[11px] uppercase tracking-widest text-[#5A1A24] mt-2 font-semibold">
                    Georgia (The Country 🇬🇪)
                  </span>
                </div>
              )}

              {/* Coordinates */}
              <div className="text-[10px] tracking-widest text-[#9C7A75] font-mono mt-1">
                {activeStop.coordinates}
              </div>
            </div>

            {/* Stop Content & Love Note */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF3ED] text-[#5A1A24] border border-[#EADAD6]">
                  Stop {activeStopIndex + 1} · {activeStop.tag}
                </span>
                <span className="text-xs text-[#8A6A64]">
                  {activeStop.city}, {activeStop.country}
                </span>
              </div>

              {/* Personal travel note from prompt */}
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#3D121B] leading-snug border-l-2 border-[#D4AF37] pl-4">
                “{activeStop.note}”
              </blockquote>

              {/* Boyfriend's whispered travel tip */}
              <div className="bg-[#FAF7F2] rounded-xl p-3.5 border border-[#EBE1DC] text-xs text-[#6E4F49] leading-relaxed flex items-start gap-2.5">
                <HeartHandshake size={16} className="text-[#C68B82] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#3D121B] block mb-0.5">Boyfriend's Note:</span>
                  <span>{activeStop.loveTip}</span>
                </div>
              </div>

              {/* Route step buttons */}
              <div className="flex items-center gap-3 pt-2">
                {activeStopIndex > 0 && (
                  <button
                    onClick={() => handleSelectStop(activeStopIndex - 1)}
                    className="text-xs font-medium text-[#6E4F49] hover:text-[#3D121B] cursor-pointer"
                  >
                    ← Previous stop
                  </button>
                )}
                {activeStopIndex < journey.stops.length - 1 && (
                  <button
                    onClick={() => handleSelectStop(activeStopIndex + 1)}
                    className="text-xs font-medium text-[#5A1A24] hover:underline cursor-pointer ml-auto flex items-center gap-1"
                  >
                    <span>Next stop: {journey.stops[activeStopIndex + 1].city}</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
