import React from 'react';
import { ArrowUp, Sliders } from 'lucide-react';
import { SiteConfig, TRANSLATIONS } from '../config/site';
import { getActiveSections } from '../utils/portfolioLogic';

interface FooterProps {
  config: SiteConfig;
  onOpenConfigStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenConfigStudio,
}) => {
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.English;
  const sections = getActiveSections(config).filter((s) => s.enabled);
  const currentYear = new Date().getFullYear();

  const labelMap: Record<string, string> = {
    work: t.navWork,
    about: t.navAbout,
    experience: t.navExperience,
    contact: t.navContact,
  };

  return (
    <footer className="py-12 bg-[#090909] text-[#a09c9a]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#f2efeb]/10">
          <div className="space-y-1">
            <a
              href="#top"
              className="font-display text-2xl tracking-wider text-[#f2efeb] hover:text-[#e32b3c] transition-colors"
            >
              {config.identity.displayName || config.identity.fullName}
            </a>
            <p className="text-xs text-[#a09c9a]">
              {config.identity.fullName} · {config.identity.profession}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="hover:text-[#f2efeb] transition-colors whitespace-nowrap"
              >
                {labelMap[sec.id]}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenConfigStudio}
              className="inline-flex items-center gap-1.5 text-[#f2efeb] hover:text-[#e32b3c] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sliders className="w-3.5 h-3.5 text-[#e32b3c]" />
              <span>{t.customizeConfig}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <p>
            © {currentYear} {config.identity.fullName}. All rights reserved. Edit personal data in{' '}
            <code className="font-mono-tabular text-[#f2efeb]">
              src/config/site.ts
            </code>
            .
          </p>

          <a
            href="#top"
            aria-label="Back to top of page"
            className="inline-flex items-center gap-1.5 text-[#f2efeb] hover:text-[#e32b3c] transition-colors self-start sm:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
