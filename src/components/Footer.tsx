/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw } from 'lucide-react';

interface FooterProps {
  girlfriendName: string;
  boyfriendName: string;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  girlfriendName,
  boyfriendName,
  onReplayIntro,
}) => {
  return (
    <footer className="w-full border-t border-[#EAE0DC] bg-[#FAF7F2] py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Editorial mark */}
        <span className="font-serif italic text-lg text-[#3D121B]">
          “Carry My Love With You”
        </span>

        {/* Clean unboxed metadata with typographic separators */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#8A6A64]">
          <span>India</span>
          <span aria-hidden="true">·</span>
          <span>Doha</span>
          <span aria-hidden="true">·</span>
          <span>Georgia 🇬🇪</span>
          <span aria-hidden="true">·</span>
          <span>Safe Travels, {girlfriendName}</span>
        </div>

        {/* Quiet replay action */}
        <div className="pt-2">
          <button
            onClick={onReplayIntro}
            className="inline-flex items-center gap-1.5 text-xs text-[#8A6A64] hover:text-[#3D121B] hover:underline cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Replay opening lipstick surprise</span>
          </button>
        </div>

        <p className="text-[11px] text-[#A68882] pt-4">
          Designed with devotion by {boyfriendName}
        </p>
      </div>
    </footer>
  );
};
