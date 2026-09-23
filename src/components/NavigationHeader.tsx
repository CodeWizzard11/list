/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavigationHeaderProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenPersonalize: () => void;
  onNavigate: (sectionId: string) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onOpenPersonalize,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EADAD6] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => onNavigate('top')}
          className="text-left font-serif text-lg sm:text-xl font-semibold tracking-wide text-[#3D121B] hover:text-[#5E1E2C] transition-colors whitespace-nowrap cursor-pointer"
        >
          Carry My Love With You
        </button>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium tracking-wide text-[#6E4F49]">
          <button
            onClick={() => onNavigate('journey-section')}
            className="hover:text-[#3D121B] transition-colors whitespace-nowrap cursor-pointer"
          >
            The Journey
          </button>
          <button
            onClick={() => onNavigate('vanity-section')}
            className="hover:text-[#3D121B] transition-colors whitespace-nowrap cursor-pointer"
          >
            Beauty Bag
          </button>
          <button
            onClick={() => onNavigate('letters-section')}
            className="hover:text-[#3D121B] transition-colors whitespace-nowrap cursor-pointer"
          >
            Love Letters
          </button>
          <button
            onClick={() => onNavigate('surprise-section')}
            className="hover:text-[#3D121B] transition-colors whitespace-nowrap cursor-pointer"
          >
            Final Surprise
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Ambient Music Control */}
          <button
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? "Mute ambient melody" : "Play romantic ambient melody"}
            className={`p-2 rounded-full transition-all border cursor-pointer ${
              isMusicPlaying
                ? 'bg-[#3D121B] text-[#FFF8F0] border-[#3D121B] shadow-xs'
                : 'bg-white text-[#6E4F49] border-[#EADAD6] hover:text-[#3D121B] hover:border-[#D8A49B]'
            }`}
            title={isMusicPlaying ? "Mute romantic melody" : "Play romantic melody"}
          >
            {isMusicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Personalize Button */}
          <button
            onClick={onOpenPersonalize}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3D121B] bg-white border border-[#D8A49B]/70 rounded-full hover:bg-[#F7EFEF] transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Sparkles size={12} className="text-[#C5A059]" />
            <span>Customize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
