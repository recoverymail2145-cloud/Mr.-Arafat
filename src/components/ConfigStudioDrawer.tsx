import React, { useState } from 'react';
import { X, RotateCcw, Copy, Check } from 'lucide-react';
import {
  SiteConfig,
  SupportedLanguage,
  AnimationIntensity,
  defaultSiteConfig,
} from '../config/site';
import { VERIFIED_PROJECTS } from '../data/projects';

interface ConfigStudioDrawerProps {
  open: boolean;
  config: SiteConfig;
  onClose: () => void;
  onUpdateConfig: (next: SiteConfig) => void;
  onResetConfig: () => void;
}

export const ConfigStudioDrawer: React.FC<ConfigStudioDrawerProps> = ({
  open,
  config,
  onClose,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!open) return null;

  const hasProjects = config.portfolio.projects.length > 0;

  const handleCopyConfigJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2500);
    } catch {
      setCopiedConfig(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-studio-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg h-full bg-[#111111] border-l border-[#f2efeb]/15 text-[#f2efeb] flex flex-col justify-between overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-[#111111]/95 backdrop-blur-md border-b border-[#f2efeb]/10">
          <div>
            <h2
              id="config-studio-title"
              className="font-display text-2xl tracking-wide uppercase"
            >
              ইমেইল, সোশ্যাল ও তথ্য পরিবর্তন (arafathossn.com)
            </h2>
            <p className="text-xs text-[#a09c9a]">
              আপনার ইমেইল, হোয়াটসঅ্যাপ, ইনস্টাগ্রাম ও ফেসবুক লিংক এখানে বসাতে পারবেন।
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Config Studio"
            className="min-h-[40px] min-w-[40px] rounded-lg bg-[#1a1a1a] hover:bg-[#e32b3c] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="p-6 space-y-6">
          {/* Email & Social Links (Top Priority for User) */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono-tabular text-[#f59e0b] uppercase">
              ১. আপনার ইমেইল ও সোশ্যাল মিডিয়া (Email &amp; Socials)
            </h3>

            <div>
              <label
                htmlFor="cfg-email"
                className="block text-xs text-[#f2efeb] font-medium mb-1"
              >
                আপনার ইমেইল (Your Email)
              </label>
              <input
                id="cfg-email"
                type="email"
                value={config.contact.email}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    contact: {
                      ...config.contact,
                      email: e.target.value,
                    },
                  })
                }
                placeholder="yourname@gmail.com"
                className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f59e0b]/40 text-sm text-[#f2efeb]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="cfg-whatsapp"
                  className="block text-xs text-[#a09c9a] mb-1"
                >
                  WhatsApp নম্বর (International digits)
                </label>
                <input
                  id="cfg-whatsapp"
                  type="text"
                  value={config.contact.whatsapp}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        whatsapp: e.target.value,
                      },
                    })
                  }
                  placeholder="88017XXXXXXXX"
                  className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb]"
                />
              </div>

              <div>
                <label
                  htmlFor="cfg-instagram"
                  className="block text-xs text-[#a09c9a] mb-1"
                >
                  Instagram URL
                </label>
                <input
                  id="cfg-instagram"
                  type="url"
                  value={config.contact.instagram}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        instagram: e.target.value,
                      },
                    })
                  }
                  className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cfg-facebook"
                className="block text-xs text-[#a09c9a] mb-1"
              >
                Facebook URL
              </label>
              <input
                id="cfg-facebook"
                type="url"
                value={config.contact.facebook || ''}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    contact: {
                      ...config.contact,
                      facebook: e.target.value,
                    },
                  })
                }
                className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb]"
              />
            </div>
          </div>

          {/* Identity Overrides */}
          <div className="pt-4 border-t border-[#f2efeb]/10 space-y-4">
            <h3 className="text-xs font-mono-tabular text-[#e32b3c] uppercase">
              ২. নাম ও ডোমেইন (Name &amp; Domain)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="cfg-display-name"
                  className="block text-xs text-[#a09c9a] mb-1"
                >
                  সাইটের নাম (Site Name)
                </label>
                <input
                  id="cfg-display-name"
                  type="text"
                  value={config.identity.displayName}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      identity: {
                        ...config.identity,
                        displayName: e.target.value,
                        fullName: e.target.value,
                      },
                    })
                  }
                  className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb]"
                />
              </div>

              <div>
                <label
                  htmlFor="cfg-domain"
                  className="block text-xs text-[#a09c9a] mb-1"
                >
                  ডোমেইন (Domain)
                </label>
                <input
                  id="cfg-domain"
                  type="text"
                  value={config.websiteUrl}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      websiteUrl: e.target.value,
                    })
                  }
                  className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb]"
                />
              </div>
            </div>
          </div>

          {/* Appearance & Language */}
          <div className="pt-4 border-t border-[#f2efeb]/10 space-y-4">
            <h3 className="text-xs font-mono-tabular text-[#e32b3c] uppercase">
              ৩. ভাষা ও প্রিমিয়াম মোশন (Language &amp; Motion)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="cfg-language"
                  className="block text-xs text-[#a09c9a] mb-1"
                >
                  ভাষা (Language)
                </label>
                <select
                  id="cfg-language"
                  value={config.appearance.language}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      appearance: {
                        ...config.appearance,
                        language: e.target.value as SupportedLanguage,
                      },
                    })
                  }
                  className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb]"
                >
                  <option value="Bengali">বাংলা (Bengali)</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिन्दी)</option>
                  <option value="Indonesian">Indonesian (Bahasa)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="cfg-intensity"
                  className="block text-xs text-[#a09c9a] mb-1"
                >
                  Motion Intensity
                </label>
                <select
                  id="cfg-intensity"
                  value={config.appearance.animationIntensity}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      appearance: {
                        ...config.appearance,
                        animationIntensity: e.target
                          .value as AnimationIntensity,
                      },
                    })
                  }
                  className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb]"
                >
                  <option value="expressive">Expressive (Premium)</option>
                  <option value="balanced">Balanced</option>
                  <option value="subtle">Subtle</option>
                </select>
              </div>
            </div>

            <label className="flex items-center justify-between py-2 text-sm cursor-pointer">
              <span>Show Photography &amp; Captures ({VERIFIED_PROJECTS.length})</span>
              <input
                type="checkbox"
                checked={hasProjects}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    portfolio: {
                      ...config.portfolio,
                      projects: e.target.checked ? VERIFIED_PROJECTS : [],
                    },
                  })
                }
                className="w-4 h-4 accent-[#e32b3c]"
              />
            </label>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 z-20 p-6 bg-[#111111]/95 backdrop-blur-md border-t border-[#f2efeb]/10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onResetConfig();
              onUpdateConfig(defaultSiteConfig);
            }}
            className="min-h-[40px] px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#f2efeb]/15 text-xs font-medium text-[#a09c9a] hover:text-[#f2efeb] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCopyConfigJson}
            className="min-h-[40px] px-4 py-2 rounded-lg bg-[#e32b3c] text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copiedConfig ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Config</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
