/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { romanceConfig as initialConfig, RomanceConfig } from './config/romanceConfig';
import { OpeningLipstick } from './components/OpeningLipstick';
import { NavigationHeader } from './components/NavigationHeader';
import { MainHero } from './components/MainHero';
import { JourneyRoute } from './components/JourneyRoute';
import { BeautyBagVanity } from './components/BeautyBagVanity';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { FinalSurprise } from './components/FinalSurprise';
import { Footer } from './components/Footer';
import { PersonalizeModal } from './components/PersonalizeModal';
import { audio } from './utils/audioService';

const STORAGE_KEY = 'carry_my_love_config_v2';

export default function App() {
  const [config, setConfig] = useState<RomanceConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialConfig,
          ...parsed,
          finalSurprise: {
            ...initialConfig.finalSurprise,
            ...parsed.finalSurprise,
            whatsapp: {
              ...initialConfig.finalSurprise.whatsapp,
              ...(parsed.finalSurprise?.whatsapp || {}),
            },
          },
        };
      }
    } catch {
      // Fallback to initial
    }
    return initialConfig;
  });

  const [hasCompletedIntro, setHasCompletedIntro] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState<boolean>(false);

  const handleToggleMusic = () => {
    const playing = audio.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveConfig = (newConfig: RomanceConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // Ignore
    }
  };

  const handleResetConfig = () => {
    setConfig(initialConfig);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2424] flex flex-col font-sans selection:bg-[#E8C5BE] selection:text-[#4A1521]">
      {/* 1. Opening Surprise: Full-screen interactive lipstick intro */}
      <AnimatePresence>
        {!hasCompletedIntro && (
          <OpeningLipstick
            onComplete={() => setHasCompletedIntro(true)}
            leadText={config.intro.leadText}
            actionPrompt={config.intro.actionPrompt}
            lipstickRevealText={config.intro.lipstickRevealText}
            skipButtonText={config.intro.skipButtonText}
          />
        )}
      </AnimatePresence>

      {/* Main Website Experience (Revealed once intro is completed or skipped) */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Top Bar */}
        <NavigationHeader
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onOpenPersonalize={() => setIsPersonalizeOpen(true)}
          onNavigate={handleNavigate}
        />

        <main className="flex-1">
          {/* 2. Main Welcome Hero */}
          <MainHero
            girlfriendName={config.couple.girlfriendName}
            boyfriendName={config.couple.boyfriendName}
            headline={config.hero.headline}
            subheadline={config.hero.subheadline}
            curatedBy={config.hero.curatedBy}
            openBagCta={config.hero.openBagCta}
            onOpenBag={() => handleNavigate('vanity-section')}
            onViewRoute={() => handleNavigate('journey-section')}
          />

          {/* 3. Her Journey, Drawn in Lipstick */}
          <JourneyRoute journey={config.journey} />

          {/* 4. A Makeup Bag Full of Love */}
          <BeautyBagVanity vanity={config.vanity} />

          {/* 5. "Open When..." Letters */}
          <OpenWhenLetters
            letters={config.letters}
            boyfriendName={config.couple.boyfriendName}
          />

          {/* 6. Final Surprise Gift Box & WhatsApp Touchdown */}
          <FinalSurprise
            finalSurprise={config.finalSurprise}
            boyfriendName={config.couple.boyfriendName}
          />
        </main>

        {/* Footer with Replay Intro Action */}
        <Footer
          girlfriendName={config.couple.girlfriendName}
          boyfriendName={config.couple.boyfriendName}
          onReplayIntro={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setHasCompletedIntro(false);
          }}
        />
      </div>

      {/* Personalize Drawer / Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
