/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, RotateCcw, Sparkles } from 'lucide-react';
import { RomanceConfig } from '../config/romanceConfig';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RomanceConfig;
  onSave: (updatedConfig: RomanceConfig) => void;
  onReset: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [girlfriendName, setGirlfriendName] = useState(config.couple.girlfriendName);
  const [boyfriendName, setBoyfriendName] = useState(config.couple.boyfriendName);
  const [whatsAppNumber, setWhatsAppNumber] = useState(config.finalSurprise.whatsapp.phoneNumber);
  const [headline, setHeadline] = useState(config.hero.headline);
  const [subheadline, setSubheadline] = useState(config.hero.subheadline);
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: RomanceConfig = {
      ...config,
      couple: {
        ...config.couple,
        girlfriendName,
        boyfriendName,
      },
      hero: {
        ...config.hero,
        headline,
        subheadline,
      },
      finalSurprise: {
        ...config.finalSurprise,
        whatsapp: {
          ...config.finalSurprise.whatsapp,
          phoneNumber: whatsAppNumber,
        },
      },
    };
    onSave(updated);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#8A6A64] hover:text-[#3D121B] rounded-full hover:bg-[#FAF3ED] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={18} className="text-[#C5A059]" />
          <span className="text-xs uppercase tracking-widest text-[#8A6A64] font-medium">
            Personalize Your Surprise
          </span>
        </div>
        <h3 className="font-serif text-2xl text-[#3D121B] mb-2">
          Make It Uniquely Yours
        </h3>
        <p className="text-xs text-[#8A6A64] mb-6">
          Customize your girlfriend’s name, your name, and WhatsApp settings. You can also edit <code className="bg-[#FAF3ED] px-1 py-0.5 rounded text-[#4A1521]">src/config/romanceConfig.ts</code> directly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Girlfriend's Name */}
          <div>
            <label className="block text-xs font-semibold text-[#3D121B] mb-1">
              Girlfriend's Name or Pet Name
            </label>
            <input
              type="text"
              value={girlfriendName}
              onChange={(e) => setGirlfriendName(e.target.value)}
              placeholder="e.g. My Love, Aanya, Sarah"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E0D0CC] focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2]/60"
            />
          </div>

          {/* Boyfriend's Name */}
          <div>
            <label className="block text-xs font-semibold text-[#3D121B] mb-1">
              Your Name (For Signoffs & Letters)
            </label>
            <input
              type="text"
              value={boyfriendName}
              onChange={(e) => setBoyfriendName(e.target.value)}
              placeholder="e.g. Arpan"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E0D0CC] focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2]/60"
            />
          </div>

          {/* WhatsApp Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-[#3D121B] mb-1">
              Your WhatsApp Number (For "I landed 💌" button)
            </label>
            <input
              type="text"
              value={whatsAppNumber}
              onChange={(e) => setWhatsAppNumber(e.target.value)}
              placeholder="Include country code, e.g. 919876543210"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E0D0CC] focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2]/60"
            />
            <span className="text-[10px] text-[#A68882] mt-1 block">
              Numbers only with country code (no + or dashes)
            </span>
          </div>

          {/* Hero Headline */}
          <div>
            <label className="block text-xs font-semibold text-[#3D121B] mb-1">
              Main Welcome Heading
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E0D0CC] focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2]/60"
            />
          </div>

          {/* Subheading */}
          <div>
            <label className="block text-xs font-semibold text-[#3D121B] mb-1">
              Welcome Subtitle
            </label>
            <textarea
              rows={2}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E0D0CC] focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2]/60"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EAE0DC]">
            <button
              type="button"
              onClick={() => {
                onReset();
                setGirlfriendName(config.couple.girlfriendName);
                setBoyfriendName(config.couple.boyfriendName);
                setWhatsAppNumber(config.finalSurprise.whatsapp.phoneNumber);
                setHeadline(config.hero.headline);
                setSubheadline(config.hero.subheadline);
              }}
              className="inline-flex items-center gap-1 text-xs text-[#8A6A64] hover:text-[#3D121B] cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset to Defaults</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#3D121B] text-xs font-medium text-white hover:bg-[#5A1A24] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {showSavedToast ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
