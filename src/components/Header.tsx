import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { SiteConfig, TRANSLATIONS } from '../config/site';
import { getActiveSections } from '../utils/portfolioLogic';

interface HeaderProps {
  config: SiteConfig;
  activeSection: string;
  motionEnabled: boolean;
  onTriggerMotion: () => void;
  onToggleMotionPreference: () => void;
  scrollProgress: number;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  activeSection,
  motionEnabled,
  onTriggerMotion,
  onToggleMotionPreference,
  scrollProgress,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.English;
  const sections = getActiveSections(config).filter((s) => s.enabled);

  const labelMap: Record<string, string> = {
    work: t.navWork,
    about: t.navAbout,
    experience: t.navExperience,
    contact: t.navContact,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090909]/90 backdrop-blur-md border-b border-[#f2efeb]/10">
      {/* Subtle scroll-linked progress indicator */}
      <div
        aria-hidden="true"
        className="h-[2px] bg-[#e32b3c] origin-left transition-transform duration-150"
        style={{
          transform: `scaleX(${Math.min(Math.max(scrollProgress, 0), 1)})`,
          backgroundColor: config.appearance.accent,
        }}
      />

      {/* 3-Zone Top Bar Contract: [Brand title, one line] — [Nav links] — [Primary action] */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-2xl tracking-wider text-[#f2efeb] hover:text-[#e32b3c] transition-colors whitespace-nowrap shrink-0"
        >
          {config.identity.displayName || config.identity.fullName}
        </a>

        {/* Zone 2: Concise single-line navigation links for existing sections */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#a09c9a]"
        >
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#f2efeb]'
                    : 'text-[#a09c9a] hover:text-[#f2efeb]'
                }`}
              >
                {labelMap[sec.id]}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: config.appearance.accent }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Motion Button (Swarmline standalone trigger) + Primary Contact CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onTriggerMotion}
            onContextMenu={(e) => {
              e.preventDefault();
              onToggleMotionPreference();
            }}
            aria-pressed={motionEnabled}
            aria-label={`${t.motionButton} (${motionEnabled ? t.motionActive : t.motionPaused})`}
            className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              motionEnabled
                ? 'border-[#e32b3c]/70 bg-[#e32b3c]/15 text-[#f2efeb] hover:bg-[#e32b3c]/25'
                : 'border-[#f2efeb]/15 bg-[#121212] text-[#a09c9a] hover:text-[#f2efeb] hover:border-[#f2efeb]/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e32b3c]" />
            <span>{t.motionButton}</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-xs font-semibold tracking-wide text-[#f2efeb] bg-[#e32b3c] hover:bg-[#c82333] rounded-lg transition-colors whitespace-nowrap shrink-0"
            style={{ backgroundColor: config.appearance.accent }}
          >
            {t.ctaSecondary}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#f2efeb]/15 text-[#f2efeb] hover:border-[#f2efeb]/40 transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#0e0e0e] border-b border-[#f2efeb]/15 px-5 py-5 space-y-4"
        >
          <nav className="flex flex-col space-y-1">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`min-h-[44px] flex items-center justify-between px-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === sec.id
                    ? 'bg-[#1a1a1a] text-[#f2efeb]'
                    : 'text-[#a09c9a] hover:text-[#f2efeb]'
                }`}
              >
                <span>{labelMap[sec.id]}</span>
                {activeSection === sec.id && (
                  <span className="text-xs font-mono-tabular text-[#e32b3c]">Active</span>
                )}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#f2efeb]/10 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                onToggleMotionPreference();
              }}
              className="min-h-[44px] w-full px-4 py-2.5 text-xs font-medium rounded-lg border border-[#f2efeb]/15 text-[#a09c9a] hover:text-[#f2efeb] flex items-center justify-between"
            >
              <span>Swarmline &amp; Page Motion</span>
              <span className="font-mono-tabular text-[#f2efeb]">
                {motionEnabled ? t.motionActive : t.motionPaused}
              </span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-[#f2efeb] bg-[#e32b3c] rounded-lg"
              style={{ backgroundColor: config.appearance.accent }}
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
