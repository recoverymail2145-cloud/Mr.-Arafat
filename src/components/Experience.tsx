import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SiteConfig, TRANSLATIONS } from '../config/site';

interface ExperienceProps {
  config: SiteConfig;
}

export const Experience: React.FC<ExperienceProps> = ({ config }) => {
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.English;
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const firstId = config.portfolio.experience[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });

  if (
    !config.preferences.showExperience ||
    config.portfolio.experience.length === 0
  ) {
    return null;
  }

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-16 md:py-24 border-b border-[#f2efeb]/10"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-12">
        <div className="space-y-2">
          <p className="text-xs font-mono-tabular text-[#e32b3c]">
            03. Personal Journey &amp; Chapters
          </p>
          <h2
            id="experience-heading"
            className="font-display text-3xl sm:text-5xl text-[#f2efeb] tracking-wide uppercase"
          >
            {t.experienceTitle}
          </h2>
        </div>

        {/* Accessible Expandable Timeline */}
        <div className="divide-y divide-[#f2efeb]/10 border-t border-b border-[#f2efeb]/10">
          {config.portfolio.experience.map((item) => {
            const isExpanded = Boolean(expandedIds[item.id]);
            const panelId = `exp-panel-${item.id}`;
            return (
              <div key={item.id} className="py-6">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 group cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#a09c9a]">
                      <span className="text-[#e32b3c] font-semibold">
                        {item.period}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.organization}</span>
                      {item.location && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#f2efeb] group-hover:text-[#e32b3c] transition-colors tracking-wide uppercase">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                    <span className="text-xs font-mono-tabular text-[#a09c9a]">
                      {item.type}
                    </span>
                    <span className="w-9 h-9 rounded-lg bg-[#141414] border border-[#f2efeb]/15 flex items-center justify-center text-[#f2efeb] group-hover:border-[#e32b3c]">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div
                    id={panelId}
                    className="mt-5 pt-5 border-t border-[#f2efeb]/10 grid grid-cols-1 lg:grid-cols-12 gap-6"
                  >
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-sm sm:text-base text-[#f2efeb]/90 leading-relaxed">
                        {item.summary}
                      </p>
                      {item.highlights.length > 0 && (
                        <ul className="space-y-2 text-sm text-[#a09c9a]">
                          {item.highlights.map((hl) => (
                            <li key={hl} className="flex items-start gap-2.5">
                              <span
                                aria-hidden="true"
                                className="text-[#e32b3c] font-bold"
                              >
                                —
                              </span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {item.tools.length > 0 && (
                      <div className="lg:col-span-4 p-4 rounded-xl bg-[#121212] border border-[#f2efeb]/10 self-start space-y-2">
                        <p className="text-xs font-mono-tabular text-[#a09c9a] uppercase">
                          Stack &amp; Focus
                        </p>
                        <p className="text-xs sm:text-sm font-mono-tabular text-[#f2efeb]">
                          {item.tools.join(' · ')}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
