import React, { useState } from 'react';
import {
  ArrowUpRight,
  Sliders,
  Sparkles,
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { SiteConfig, TRANSLATIONS, SupportedLanguage } from '../config/site';
import { SwarmlineCanvas } from './SwarmlineCanvas';
import { buildWhatsAppUrl } from '../utils/portfolioLogic';

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
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.Bengali;
  const hasRealPortrait = Boolean(
    config.identity.portrait?.trim() && !portraitError
  );
  const isBengali = config.appearance.language === 'Bengali';

  const whatsappUrl = buildWhatsAppUrl(
    config.contact.whatsapp,
    'হ্যালো আরাফাত ভাই! আপনার পার্সোনাল ওয়েবসাইট (arafathossn.com) থেকে নক দিলাম।'
  );

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#f2efeb]/10 overflow-hidden"
    >
      {/* Ambient Background Golden-Crimson Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#e32b3c]/12 via-[#f59e0b]/8 to-transparent blur-3xl"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Split-Screen Personal Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: এমডি আরাফাত হোসেন, Personal Intro & Social Connect */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
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
                      <span className="text-[#f59e0b] font-medium">
                        {config.identity.availability}
                      </span>
                    </>
                  )}
              </div>

              {/* Oversized Personal Name Headline */}
              <div className="space-y-2">
                <h1
                  className="font-bold text-[#f2efeb] tracking-tight"
                  style={{
                    fontFamily: "'Hind Siliguri', var(--font-display)",
                    fontSize: 'clamp(2.4rem, 5.2vw, 4.75rem)',
                    lineHeight: 1.08,
                  }}
                >
                  {config.identity.fullName}
                </h1>
                <p className="font-display text-2xl sm:text-3xl tracking-wider uppercase bg-gradient-to-r from-[#e32b3c] via-[#f59e0b] to-[#f2efeb] bg-clip-text text-transparent">
                  {config.identity.bengaliName || 'Md Arafat Hossn · arafathossn.com'}
                </p>
              </div>

              {/* Personal Tagline */}
              {config.identity.roleLine2 && (
                <p
                  className="text-base sm:text-lg font-medium text-[#f2efeb]/90 max-w-2xl"
                  style={{ fontFamily: "'Hind Siliguri', var(--font-body)" }}
                >
                  {config.identity.roleLine2}
                </p>
              )}

              {/* Concise Personal Welcome */}
              <p
                className="text-sm sm:text-base text-[#a09c9a] leading-relaxed max-w-[62ch]"
                style={{ fontFamily: "'Hind Siliguri', var(--font-body)" }}
              >
                {isBengali
                  ? config.identity.intro
                  : 'Welcome! I am Md Arafat Hossn (এমডি আরাফাত হোসেন). This is my personal website (arafathossn.com)—not an agency or commercial portfolio. Here I share my personal photography, technical captures, favorite moments, and direct social links.'}
              </p>
            </div>

            {/* Primary Actions & Direct Personal Social Bar */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="min-h-[44px] px-6 py-3 rounded-lg text-sm font-semibold text-[#f2efeb] bg-[#e32b3c] hover:bg-[#c82333] transition-all inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-lg shadow-[#e32b3c]/20"
                  style={{ backgroundColor: config.appearance.accent }}
                >
                  <span>{t.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onTriggerSwarmBurst}
                  className="min-h-[44px] px-5 py-3 rounded-lg text-sm font-semibold text-[#f2efeb] bg-[#151515] hover:bg-[#202020] border border-[#f59e0b]/40 hover:border-[#f59e0b] transition-all inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                  <span>{isBengali ? 'প্রিমিয়াম মোশন ইফেক্ট' : 'Trigger Motion FX'}</span>
                </button>

                {onSwitchLanguage && (
                  <button
                    type="button"
                    onClick={() =>
                      onSwitchLanguage(isBengali ? 'English' : 'Bengali')
                    }
                    className="min-h-[44px] px-4 py-3 rounded-lg text-xs font-semibold text-[#f2efeb] bg-[#141414] hover:bg-[#1e1e1e] border border-[#f2efeb]/15 hover:border-[#e32b3c] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#e32b3c]" />
                    <span>{isBengali ? 'English Version' : 'বাংলা ভার্সন'}</span>
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

              {/* Direct Personal Social Links Bar: Instagram, WhatsApp, Facebook, Email */}
              <div className="pt-5 border-t border-[#f2efeb]/10 space-y-3">
                <p className="text-xs font-medium text-[#a09c9a]">
                  {isBengali
                    ? 'পার্সোনাল সোশ্যাল মিডিয়া ও সরাসরি যোগাযোগ:'
                    : 'Personal Socials & Direct Connect:'}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {config.contact.instagram && (
                    <a
                      href={config.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#e32b3c] border border-[#f2efeb]/15 text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>Instagram</span>
                    </a>
                  )}

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#e32b3c] border border-[#f2efeb]/15 text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {config.contact.facebook && (
                    <a
                      href={config.contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#e32b3c] border border-[#f2efeb]/15 text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Facebook className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>Facebook</span>
                    </a>
                  )}

                  {config.contact.email && (
                    <a
                      href={`mailto:${config.contact.email}`}
                      className="min-h-[40px] px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#e32b3c] border border-[#f2efeb]/15 text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#e32b3c]" />
                      <span>{config.contact.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: এমডি আরাফাত হোসেন — ব্যক্তিগত ওয়েবসাইট Portrait Showcase Frame with Live Premium Motion */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[420px] lg:min-h-[500px] rounded-2xl bg-[#111111] border border-[#f59e0b]/25 overflow-hidden flex flex-col justify-between shadow-2xl group">
              {/* User's Portrait Photo Background */}
              {hasRealPortrait && (
                <img
                  src={config.identity.portrait}
                  alt="এমডি আরাফাত হোসেন (Md Arafat Hossn)"
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitError(true)}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                />
              )}

              {/* Measured Editorial Scrim for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/25 to-[#090909]/60 pointer-events-none" />

              {/* Interactive Premium Swarmline & Golden Bokeh Motion Overlay */}
              <div className="absolute inset-0 opacity-75 pointer-events-none">
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

              {/* Top Glass Control Bar on Portrait */}
              <div className="relative z-10 flex items-center justify-between gap-3 px-5 py-4 bg-[#090909]/65 backdrop-blur-md border-b border-[#f2efeb]/10">
                <div>
                  <p
                    className="text-xs sm:text-sm font-bold text-[#f2efeb]"
                    style={{ fontFamily: "'Hind Siliguri', var(--font-body)" }}
                  >
                    এমডি আরাফাত হোসেন
                  </p>
                  <p className="text-xs font-mono-tabular text-[#f59e0b]">
                    arafathossn.com
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onTriggerSwarmBurst}
                    className="min-h-[36px] px-3 py-1.5 rounded-md bg-[#090909]/85 border border-[#f59e0b]/40 hover:border-[#f59e0b] text-xs font-medium text-[#f2efeb] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>Pulse Motion</span>
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

              {/* Bottom Personal Signature Overlay on Portrait */}
              <div className="relative z-10 mt-auto p-6 sm:p-7 bg-gradient-to-t from-[#090909] via-[#090909]/85 to-transparent space-y-2">
                <p className="font-accent text-2xl sm:text-3xl text-[#f59e0b]">
                  Personal Space · arafathossn.com
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#f2efeb] tracking-tight"
                  style={{ fontFamily: "'Hind Siliguri', var(--font-body)" }}
                >
                  এমডি আরাফাত হোসেন — ব্যক্তিগত ওয়েবসাইট
                </h2>
                <p
                  className="text-xs sm:text-sm text-[#a09c9a] max-w-lg leading-relaxed"
                  style={{ fontFamily: "'Hind Siliguri', var(--font-body)" }}
                >
                  {config.identity.positioning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Personal Identity Highlights Below Hero Split */}
        {config.portfolio.metrics.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#f2efeb]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.portfolio.metrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-xs text-[#a09c9a]">{metric.label}</p>
                <p
                  className="text-xl sm:text-2xl font-bold text-[#f2efeb] tracking-wide"
                  style={{ fontFamily: "'Hind Siliguri', var(--font-display)" }}
                >
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
