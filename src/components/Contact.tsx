import React, { useState } from 'react';
import {
  Mail,
  ArrowUpRight,
  Copy,
  Check,
  MessageCircle,
  AlertCircle,
  Instagram,
  Facebook,
} from 'lucide-react';
import { SiteConfig, TRANSLATIONS } from '../config/site';
import {
  ContactFormInput,
  validateContactForm,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../utils/portfolioLogic';

interface ContactProps {
  config: SiteConfig;
}

export const Contact: React.FC<ContactProps> = ({ config }) => {
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.Bengali;

  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    projectType: 'শুভেচ্ছা ও ব্যক্তিগত বার্তা (Personal Hello)',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const whatsappDraftUrl = buildWhatsAppUrl(
    config.contact.whatsapp,
    formState.message.trim()
      ? `হ্যালো ${config.identity.fullName}, আমি ${
          formState.name || ''
        }: ${formState.message}`
      : `হ্যালো ${config.identity.fullName}! আপনার পার্সোনাল ওয়েবসাইট (arafathossn.com) থেকে মেসেজ দিচ্ছি।`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedMailto(null);
      return;
    }

    setErrors({});
    const mailtoUri = buildMailtoUrl(
      config.contact.email || 'recoverymail2145@gmail.com',
      formState
    );
    setPreparedMailto(mailtoUri);
  };

  const handleCopyBrief = async () => {
    const brief = [
      `To: ${config.contact.email}`,
      `From: ${formState.name} (${formState.email})`,
      `Topic: ${formState.projectType}`,
      '',
      formState.message,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(brief);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 md:py-24 border-b border-[#f2efeb]/10"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Personal Socials (Instagram, WhatsApp, Facebook) & Email */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono-tabular text-[#f59e0b]">
                04. Personal Socials &amp; Connect
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl text-[#f2efeb] tracking-wide uppercase"
                style={{ fontFamily: "'Hind Siliguri', var(--font-display)" }}
              >
                {t.contactTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#a09c9a] leading-relaxed">
                {t.contactSubtitle}
              </p>
            </div>

            {/* Dedicated Personal Social Cards: Instagram, WhatsApp, Facebook */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
              {config.contact.instagram && (
                <a
                  href={config.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#121212] border border-[#f2efeb]/10 hover:border-[#e32b3c] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#f59e0b]">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f2efeb]">
                        Instagram (ইনস্টাগ্রাম)
                      </p>
                      <p className="text-xs text-[#a09c9a]">
                        Personal Photos &amp; Stories
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#a09c9a] group-hover:text-[#e32b3c]" />
                </a>
              )}

              {whatsappDraftUrl && (
                <a
                  href={whatsappDraftUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#121212] border border-[#f2efeb]/10 hover:border-[#e32b3c] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#f59e0b]">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f2efeb]">
                        WhatsApp (হোয়াটসঅ্যাপ)
                      </p>
                      <p className="text-xs text-[#a09c9a]">
                        সরাসরি মেসেজ পাঠান
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#a09c9a] group-hover:text-[#e32b3c]" />
                </a>
              )}

              {config.contact.facebook && (
                <a
                  href={config.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#121212] border border-[#f2efeb]/10 hover:border-[#e32b3c] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#f59e0b]">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f2efeb]">
                        Facebook (ফেসবুক)
                      </p>
                      <p className="text-xs text-[#a09c9a]">
                        এমডি আরাফাত হোসেন প্রোফাইল
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#a09c9a] group-hover:text-[#e32b3c]" />
                </a>
              )}
            </div>

            {/* Verified Personal Email Box */}
            {config.contact.email && (
              <div className="p-5 rounded-2xl bg-[#121212] border border-[#f2efeb]/10 space-y-2">
                <p className="text-xs font-mono-tabular text-[#a09c9a] uppercase">
                  পার্সোনাল ইমেইল (Personal Email)
                </p>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-base sm:text-lg font-semibold text-[#f2efeb] hover:text-[#e32b3c] transition-colors break-all"
                >
                  <Mail className="w-5 h-5 text-[#e32b3c] shrink-0" />
                  <span>{config.contact.email}</span>
                </a>
                <p className="text-xs text-[#a09c9a]">
                  ডোমেইন: arafathossn.com · {config.identity.location}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Personal Message Form */}
          {config.preferences.showContactForm && (
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#121212] border border-[#f2efeb]/10">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#f2efeb]"
                    >
                      আপনার নাম (Your Name) *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="আপনার নাম লিখুন..."
                      aria-invalid={Boolean(errors.name)}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/50 focus:border-[#e32b3c]"
                    />
                    {errors.name && (
                      <p
                        role="alert"
                        className="text-xs text-[#e32b3c] flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#f2efeb]"
                    >
                      আপনার ইমেইল (Your Email) *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/50 focus:border-[#e32b3c]"
                    />
                    {errors.email && (
                      <p
                        role="alert"
                        className="text-xs text-[#e32b3c] flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-project-type"
                    className="block text-xs font-medium text-[#f2efeb]"
                  >
                    বার্তার বিষয় (Topic)
                  </label>
                  <select
                    id="contact-project-type"
                    value={formState.projectType}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        projectType: e.target.value,
                      }))
                    }
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb] focus:border-[#e32b3c]"
                  >
                    <option value="শুভেচ্ছা ও ব্যক্তিগত বার্তা (Personal Hello)">
                      শুভেচ্ছা ও ব্যক্তিগত বার্তা (Personal Hello)
                    </option>
                    <option value="ফটোগ্রাফি বা ক্যাপচার নিয়ে মতামত (Photography Feedback)">
                      ফটোগ্রাফি বা ক্যাপচার নিয়ে মতামত (Photography Feedback)
                    </option>
                    <option value="সাধারণ আড্ডা ও পরিচয় (Friendly Chat)">
                      সাধারণ আড্ডা ও পরিচয় (Friendly Chat)
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#f2efeb]"
                  >
                    আপনার বার্তা (Your Message) *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="আপনার ব্যক্তিগত বার্তা বা শুভেচ্ছা এখানে লিখুন..."
                    aria-invalid={Boolean(errors.message)}
                    className="w-full p-4 rounded-lg bg-[#090909] border border-[#f2efeb]/15 text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/50 focus:border-[#e32b3c]"
                  />
                  {errors.message && (
                    <p
                      role="alert"
                      className="text-xs text-[#e32b3c] flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold text-[#f2efeb] bg-[#e32b3c] hover:bg-[#c82333] transition-colors inline-flex items-center gap-2 cursor-pointer"
                    style={{ backgroundColor: config.appearance.accent }}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{t.sendEmailButton}</span>
                  </button>

                  <p className="text-xs text-[#a09c9a]">
                    arafathossn.com · ব্যক্তিগত বার্তা
                  </p>
                </div>

                {preparedMailto && (
                  <div
                    data-testid="contact-prepared-panel"
                    className="mt-5 p-4 rounded-xl bg-[#090909] border border-[#e32b3c]/50 space-y-3"
                  >
                    <p className="text-xs sm:text-sm text-[#f2efeb] font-medium">
                      আপনার মেসেজটি তৈরি হয়েছে! নিচে ক্লিক করে সরাসরি ইমেইল পাঠান অথবা টেক্সট কপি করুন:
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={preparedMailto}
                        className="min-h-[40px] px-4 py-2 rounded-lg bg-[#e32b3c] text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open Email App</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="min-h-[40px] px-4 py-2 rounded-lg bg-[#181818] border border-[#f2efeb]/15 text-xs font-medium text-[#f2efeb] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedBrief ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#e32b3c]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
