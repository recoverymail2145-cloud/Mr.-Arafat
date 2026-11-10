import React, { useState } from 'react';
import { ArrowUpRight, Sliders, Sparkles, Globe } from 'lucide-react';
import { SiteConfig, TRANSLATIONS, SupportedLanguage } from '../config/site';
import { SwarmlineCanvas } from './SwarmlineCanvas';

interface HeroProps {
  config: SiteConfig;
  motionEnabled: boolean;
  swarmBurstKey: number;
  onTriggerSwarmBurst: () => void;
  onToggleMotionPreference: () => void;
  onOpenConfigStudio: () => void;
  onSwitchLanguage?: (lang: SupportedLanguage) => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  motionEnabled,
  swarmBurstKey,
  onTriggerSwarmBurst,
  onToggleMotionPreference,
  onOpenConfigStudio,
  onSwitchLanguage,
}) => {
  const [portraitError, setPortraitError] = useState(false);
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.English;
  const hasRealPortrait = Boolean(config.identity.portrait?.trim() && !portraitError);
  const isBengali = config.appearance.language === 'Bengali';

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#f2efeb]/10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Split-Screen Personal Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Personal Name, Bengali Name & Introduction */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 transition-all duration-700">
            <div className="space-y-5">
              {/* Unboxed Kicker Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#a09c9a]">
                <span className="font-semibold text-[#f2efeb]">
                  {config.identity.profession}
                </span>
                {config.identity.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{config.identity.location}</span>
                  </>
                )}
                {config.identity.availability &&
                  config.identity.availability.toUpperCase() !== 'HIDE' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#e32b3c] font-medium">
                        {config.identity.availability}
                      </span>
                    </>
                  )}
              </div>

              {/* Oversized Personal Name Headline */}
              <div className="space-y-2">
                <h1
                  className="font-display text-[#f2efeb] tracking-wide uppercase"
                  style={{
                    fontSize: 'clamp(2.5rem, 5.4vw, 5.1rem)',
                    lineHeight: 0.98,
                  }}
                >
                  {config.identity.fullName}
                </h1>
                {config.identity.bengaliName && (
                  <p
                    className="text-2xl sm:text-4xl font-bold text-[#e32b3c] tracking-tight"
                    style={{ fontFamily: "'Hind Siliguri', var(--font-body)" }}
                  >
                    {config.identity.bengaliName}
                  </p>
                )}
              </div>

              {/* Personal Tagline */}
              {config.identity.roleLine2 && (
                <p className="text-base sm:text-lg font-medium text-[#f2efeb]/90 max-w-2xl">
                  {config.identity.roleLine2}
                </p>
              )}

              {/* Concise Personal Welcome */}
              <p className="text-sm sm:text-base text-[#a09c9a] leading-relaxed max-w-[64ch]">
                {isBengali
                  ? 'স্বাগতম! আমি এমডি আরাফাত হোসেন (Md Arafat Hossn)। এটি কোনো প্রফেশনাল পোর্টফোলিও নয়—এটি আমার একান্ত ব্যক্তিগত ওয়েবসাইট। এখানে আমার ভাবনা, প্রিয় বিষয়, ব্যক্তিগত ডায়েরি এবং জীবনের নানা অনুভূতিগুলো সাজিয়ে রাখা হয়েছে।'
                  : config.identity.intro}
              </p>
            </div>

            {/* Primary Actions & Unboxed Personal Interests */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#work"
                  className="min-h-[44px] px-6 py-3 rounded-lg text-sm font-semibold text-[#f2efeb] bg-[#e32b3c] hover:bg-[#c82333] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                  style={{ backgroundColor: config.appearance.accent }}
                >
                  <span>{t.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="min-h-[44px] px-6 py-3 rounded-lg text-sm font-semibold text-[#f2efeb] bg-[#141414] hover:bg-[#1e1e1e] border border-[#f2efeb]/15 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>{t.ctaSecondary}</span>
                </a>

                {onSwitchLanguage && (
                  <button
                    type="button"
                    onClick={() =>
                      onSwitchLanguage(isBengali ? 'English' : 'Bengali')
                    }
                    className="min-h-[44px] px-4 py-3 rounded-lg text-xs font-semibold text-[#f2efeb] bg-[#141414] hover:bg-[#1e1e1e] border border-[#f2efeb]/15 hover:border-[#e32b3c] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#e32b3c]" />
                    <span>{isBengali ? 'Switch to English' : 'বাংলা ভাষায় দেখুন'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenConfigStudio}
                  className="min-h-[44px] px-4 py-3 rounded-lg text-xs font-medium text-[#a09c9a] hover:text-[#f2efeb] border border-[#f2efeb]/10 hover:border-[#f2efeb]/25 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#e32b3c]" />
                  <span>{t.customizeConfig}</span>
                </button>
              </div>

              {/* Unboxed Personal Interests (Zero-Pill Discipline) */}
              {config.portfolio.skills.length > 0 && (
                <div className="pt-4 border-t border-[#f2efeb]/10">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-[#a09c9a]">
                    <span className="text-[#f2efeb] font-semibold">
                      {isBengali ? 'পছন্দের বিষয়:' : 'Personal Interests:'}
                    </span>
                    {config.portfolio.skills.slice(0, 5).map((skill, idx, arr) => (
                      <React.Fragment key={skill}>
                        <span>{skill}</span>
                        {idx < arr.length - 1 && (
                          <span aria-hidden="true" className="text-[#f2efeb]/25">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Personal Portrait (if supplied) OR Swarmline Personal Sanctuary Card */}
          <div className="lg:col-span-5 flex flex-col transition-all duration-700">
            {hasRealPortrait ? (
              <div className="relative w-full h-full min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden bg-[#121212] border border-[#f2efeb]/10">
                <img
                  src={config.identity.portrait}
                  alt={`${config.identity.fullName} — ${config.identity.bengaliName || ''}`}
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitError(true)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="font-display text-2xl text-[#f2efeb] tracking-wide">
                      {config.identity.fullName}
                    </p>
                    <p className="text-xs text-[#a09c9a]">
                      {config.identity.bengaliName || config.identity.profession}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[440px] rounded-2xl bg-[#111111] border border-[#f2efeb]/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
                {/* Interactive Swarmline Vector Canvas Background */}
                <div className="absolute inset-0 opacity-90">
                  <SwarmlineCanvas
                    active={motionEnabled}
                    burstKey={swarmBurstKey}
                    accentColor={config.appearance.accent}
                    textColor={config.appearance.text}
                    mutedColor={config.appearance.muted}
                    mode="contained"
                    intensity={config.appearance.animationIntensity}
                  />
                </div>

                {/* Top Personal Card Header */}
                <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#f2efeb]/10 pb-4">
                  <div>
                    <p className="text-xs font-medium text-[#f2efeb]">
                      {config.identity.fullName}
                    </p>
                    <p className="text-xs text-[#a09c9a]">
                      {config.identity.bengaliName || 'এমডি আরাফাত হোসেন'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onTriggerSwarmBurst}
                      className="min-h-[36px] px-3 py-1.5 rounded-md bg-[#090909]/85 border border-[#f2efeb]/15 hover:border-[#e32b3c] text-xs font-medium text-[#f2efeb] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#e32b3c]" />
                      <span>Pulse Swarm</span>
                    </button>
                    <button
                      type="button"
                      onClick={onToggleMotionPreference}
                      className="min-h-[36px] px-2.5 py-1.5 rounded-md bg-[#090909]/85 border border-[#f2efeb]/15 hover:border-[#f2efeb]/40 text-xs font-mono-tabular text-[#a09c9a] hover:text-[#f2efeb] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {motionEnabled ? 'Pause' : 'Play'}
                    </button>
                  </div>
                </div>

                {/* Center Personal Sanctuary Callout */}
                <div className="relative z-10 my-auto py-8">
                  <p className="font-accent text-2xl sm:text-3xl text-[#e32b3c] mb-2">
                    Personal Digital Sanctuary
                  </p>
                  <p className="font-display text-3xl sm:text-4xl text-[#f2efeb] tracking-wide uppercase leading-tight">
                    {config.identity.fullName}
                  </p>
                  <p
                    className="mt-1 text-lg sm:text-xl font-semibold text-[#f2efeb]/90"
                    style={{ fontFamily: "'Hind Siliguri', var(--font-body)" }}
                  >
                    এমডি আরাফাত হোসেন — ব্যক্তিগত ওয়েবসাইট
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-[#a09c9a] max-w-md leading-relaxed">
                    {config.identity.positioning}
                  </p>
                </div>

                {/* Bottom Personal Interests Footer */}
                <div className="relative z-10 pt-4 border-t border-[#f2efeb]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#a09c9a]">
                  <span>Personal Space (No Portfolio)</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    {config.portfolio.tools.slice(0, 4).join(' · ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-Width Personal Identity Highlights Below Hero Split */}
        {config.portfolio.metrics.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#f2efeb]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.portfolio.metrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-xs text-[#a09c9a]">{metric.label}</p>
                <p className="font-display text-2xl sm:text-3xl text-[#f2efeb] font-mono-tabular tracking-wide">
                  {metric.value}
                </p>
                <p className="text-xs text-[#a09c9a]/80">{metric.context}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
