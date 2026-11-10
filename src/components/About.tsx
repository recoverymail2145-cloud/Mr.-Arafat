import React from 'react';
import { SiteConfig, TRANSLATIONS } from '../config/site';

interface AboutProps {
  config: SiteConfig;
  motionEnabled: boolean;
}

export const About: React.FC<AboutProps> = ({ config }) => {
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.English;
  const showEducation = Boolean(
    config.preferences.showEducation && config.portfolio.education.length > 0
  );

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 md:py-24 border-b border-[#f2efeb]/10"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-16">
        {/* Top Row: Biography & Personal Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-mono-tabular text-[#e32b3c]">
              02. Biography &amp; Capabilities
            </p>
            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-5xl text-[#f2efeb] tracking-wide uppercase"
            >
              {t.aboutTitle}
            </h2>
            {config.identity.positioning && (
              <p className="font-accent text-2xl text-[#e32b3c] pt-1">
                {config.identity.profession}
              </p>
            )}
          </div>

          <div className="lg:col-span-7 space-y-5 transition-all duration-700">
            {config.identity.about && (
              <p className="text-base sm:text-lg text-[#f2efeb]/90 leading-relaxed">
                {config.identity.about}
              </p>
            )}
            {config.identity.positioning && (
              <p className="text-sm sm:text-base text-[#a09c9a] leading-relaxed">
                {config.identity.positioning}
              </p>
            )}
          </div>
        </div>

        {/* 5-Step Execution Process */}
        {config.portfolio.processSteps.length > 0 && (
          <div className="pt-10 border-t border-[#f2efeb]/10 space-y-8">
            <h3 className="font-display text-2xl sm:text-3xl text-[#f2efeb] tracking-wide uppercase">
              {t.processTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {config.portfolio.processSteps.map((step) => (
                <div
                  key={step.number}
                  className="p-5 rounded-xl bg-[#121212] border border-[#f2efeb]/10 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono-tabular text-[#e32b3c] font-semibold">
                      {step.number}.
                    </span>
                    <h4 className="font-display text-xl text-[#f2efeb] tracking-wide uppercase">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#a09c9a] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills, Technical Tools & Conditional Education */}
        <div className="pt-10 border-t border-[#f2efeb]/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Core Skills */}
          {config.portfolio.skills.length > 0 && (
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-display text-2xl text-[#f2efeb] tracking-wide uppercase">
                {t.skillsTitle}
              </h3>
              <ul className="divide-y divide-[#f2efeb]/10 border-t border-b border-[#f2efeb]/10">
                {config.portfolio.skills.map((skill, idx) => (
                  <li
                    key={skill}
                    className="py-3 flex items-center justify-between text-sm text-[#f2efeb]"
                  >
                    <span>{skill}</span>
                    <span className="text-xs font-mono-tabular text-[#a09c9a]">
                      0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Everyday Favorites & Reading */}
          {config.portfolio.tools.length > 0 && (
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-display text-2xl text-[#f2efeb] tracking-wide uppercase">
                {t.toolsTitle}
              </h3>
              <div className="p-6 rounded-xl bg-[#121212] border border-[#f2efeb]/10 space-y-4">
                <p className="text-xs text-[#a09c9a]">
                  Everyday interests, reading subjects, and personal practices:
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm font-mono-tabular text-[#f2efeb]">
                  {config.portfolio.tools.map((tool) => (
                    <div
                      key={tool}
                      className="pb-2 border-b border-[#f2efeb]/10 truncate"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conditional Education & Learning Milestones */}
          {showEducation && (
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-display text-2xl text-[#f2efeb] tracking-wide uppercase">
                {t.educationTitle}
              </h3>
              <div className="space-y-4">
                {config.portfolio.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-xl bg-[#121212] border border-[#f2efeb]/10 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#a09c9a]">
                      <span className="text-[#e32b3c]">{edu.period}</span>
                      <span>{edu.institution}</span>
                    </div>
                    <h4 className="font-display text-xl text-[#f2efeb] tracking-wide uppercase">
                      {edu.qualification}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a09c9a] leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
