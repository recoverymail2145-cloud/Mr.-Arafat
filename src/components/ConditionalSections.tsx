import React, { useState } from 'react';
import { SiteConfig } from '../config/site';

interface ConditionalSectionsProps {
  config: SiteConfig;
}

/**
 * Renders Recognition/Awards, Testimonials, Client Logos, and Before/After
 * ONLY when explicitly enabled in preferences AND backed by actual configured records.
 * Never displays fabricated accolades or filler logos.
 */
export const ConditionalSections: React.FC<ConditionalSectionsProps> = ({
  config,
}) => {
  const [sliderPos, setSliderPos] = useState(50);

  const showClientLogos =
    config.preferences.showClientLogos &&
    config.portfolio.clientLogos.length > 0;
  const showAwards =
    config.preferences.showAwards && config.portfolio.awards.length > 0;
  const showTestimonials =
    config.preferences.showTestimonials &&
    config.portfolio.testimonials.length > 0;
  const showBeforeAfter =
    config.preferences.showBeforeAfter &&
    config.portfolio.beforeAfter.length > 0;

  if (
    !showClientLogos &&
    !showAwards &&
    !showTestimonials &&
    !showBeforeAfter
  ) {
    return null;
  }

  return (
    <div className="divide-y divide-[#f2efeb]/10 border-b border-[#f2efeb]/10">
      {/* Authorized Client Logos Strip */}
      {showClientLogos && (
        <section aria-label="Authorized Clients" className="py-12">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-6">
            <p className="text-xs font-mono-tabular text-[#a09c9a] uppercase">
              Selected Client Collaborations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
              {config.portfolio.clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="p-4 rounded-xl bg-[#121212] border border-[#f2efeb]/10 flex items-center justify-center text-sm font-display tracking-wider text-[#f2efeb]"
                >
                  {client.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Before / After Comparison (Only when paired user-owned images exist) */}
      {showBeforeAfter && (
        <section aria-label="Before and After Comparison" className="py-16">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-8">
            <h2 className="font-display text-3xl text-[#f2efeb] tracking-wide uppercase">
              Before &amp; After Transformation
            </h2>
            {config.portfolio.beforeAfter.map((item) => (
              <div key={item.id} className="space-y-4">
                <div className="relative aspect-[16/9] max-w-4xl rounded-2xl overflow-hidden border border-[#f2efeb]/15 bg-[#121212]">
                  <img
                    src={item.afterImage}
                    alt={`${item.title} — ${item.afterLabel}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} — ${item.beforeLabel}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="max-w-md flex items-center gap-4">
                  <label
                    htmlFor={`ba-slider-${item.id}`}
                    className="text-xs font-mono-tabular text-[#a09c9a]"
                  >
                    Comparison ({sliderPos}%)
                  </label>
                  <input
                    id={`ba-slider-${item.id}`}
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="flex-1 accent-[#e32b3c]"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verified Recognition & Awards */}
      {showAwards && (
        <section aria-label="Awards and Recognition" className="py-16">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-8">
            <h2 className="font-display text-3xl text-[#f2efeb] tracking-wide uppercase">
              Recognition &amp; Awards
            </h2>
            <div className="divide-y divide-[#f2efeb]/10 border-t border-b border-[#f2efeb]/10">
              {config.portfolio.awards.map((award) => (
                <div
                  key={award.id}
                  className="py-4 flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-display text-xl text-[#f2efeb] uppercase">
                      {award.title}
                    </h3>
                    <p className="text-xs text-[#a09c9a]">{award.issuer}</p>
                  </div>
                  <span className="text-xs font-mono-tabular text-[#e32b3c]">
                    {award.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Verified Testimonials */}
      {showTestimonials && (
        <section aria-label="Client Testimonials" className="py-16">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-8">
            <h2 className="font-display text-3xl text-[#f2efeb] tracking-wide uppercase">
              Client Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.portfolio.testimonials.map((item) => (
                <blockquote
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#121212] border border-[#f2efeb]/10 space-y-4"
                >
                  <p className="text-sm sm:text-base text-[#f2efeb] leading-relaxed">
                    “{item.quote}”
                  </p>
                  <footer className="text-xs text-[#a09c9a]">
                    <strong className="text-[#f2efeb]">{item.author}</strong> ·{' '}
                    {item.role}, {item.organization}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
