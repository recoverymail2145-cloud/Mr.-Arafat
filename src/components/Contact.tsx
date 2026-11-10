import React, { useState } from 'react';
import {
  Mail,
  ArrowUpRight,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
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
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.English;

  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    projectType: 'Full-Stack Web Platform',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const socialEntries = [
    { label: 'Instagram', url: config.contact.instagram },
    { label: 'YouTube', url: config.contact.youtube },
    { label: 'LinkedIn', url: config.contact.linkedin },
    { label: 'GitHub', url: config.contact.github },
    { label: 'Behance', url: config.contact.behance },
    { label: 'Dribbble', url: config.contact.dribbble },
    ...config.contact.otherLinks,
  ].filter((item) => Boolean(item.url && item.url.trim()));

  const whatsappDraftUrl = buildWhatsAppUrl(
    config.contact.whatsapp,
    formState.message.trim()
      ? `Hello ${config.identity.fullName}, I am ${
          formState.name || 'interested'
        } inquiring about ${formState.projectType}: ${formState.message}`
      : `Hello ${config.identity.fullName}, I would like to discuss a project.`
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
      config.contact.email || 'xyz@gmail.com',
      formState
    );
    setPreparedMailto(mailtoUri);
  };

  const handleCopyBrief = async () => {
    const brief = [
      `To: ${config.contact.email}`,
      `From: ${formState.name} (${formState.email})`,
      `Scope: ${formState.projectType}`,
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
          {/* Left Column: Direct Contact Details & Verified Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono-tabular text-[#e32b3c]">
                04. Direct Inquiry
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-5xl text-[#f2efeb] tracking-wide uppercase"
              >
                {t.contactTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#a09c9a] leading-relaxed">
                {t.contactSubtitle}
              </p>
            </div>

            {/* Verified Email Box */}
            {config.contact.email && (
              <div className="p-6 rounded-2xl bg-[#121212] border border-[#f2efeb]/10 space-y-3">
                <p className="text-xs font-mono-tabular text-[#a09c9a] uppercase">
                  Public Contact Email
                </p>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-lg sm:text-xl font-semibold text-[#f2efeb] hover:text-[#e32b3c] transition-colors break-all"
                >
                  <Mail className="w-5 h-5 text-[#e32b3c] shrink-0" />
                  <span>{config.contact.email}</span>
                </a>
                {config.identity.location && (
                  <p className="text-xs text-[#a09c9a]">
                    Base: {config.identity.location}
                  </p>
                )}
              </div>
            )}

            {/* Conditional WhatsApp Action (Only rendered when international digits are configured) */}
            {whatsappDraftUrl && (
              <div>
                <a
                  href={whatsappDraftUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-3 rounded-lg bg-[#141414] border border-[#f2efeb]/15 hover:border-[#e32b3c] text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#e32b3c]" />
                  <span>Open WhatsApp Draft</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Verified External / Social Links */}
            {socialEntries.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-mono-tabular text-[#a09c9a] uppercase">
                  Verified Profiles &amp; Links
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {socialEntries.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-4 py-2 rounded-lg bg-[#121212] border border-[#f2efeb]/10 hover:border-[#f2efeb]/35 text-xs font-medium text-[#f2efeb] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#e32b3c]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Validated Static Mailto Inquiry Form */}
          {config.preferences.showContactForm && (
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#121212] border border-[#f2efeb]/10">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#f2efeb]"
                    >
                      Your Name *
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
                      placeholder="e.g. Rohan Mehta"
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
                      Your Email *
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
                      placeholder="you@organization.com"
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
                    Topic of Your Note
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
                    <option value="Personal Hello & Greeting (শুভেচ্ছা বার্তা)">
                      Personal Hello &amp; Greeting (শুভেচ্ছা বার্তা)
                    </option>
                    <option value="Thoughts on a Journal Note">
                      Thoughts on a Journal Note
                    </option>
                    <option value="Book or Idea Recommendation">
                      Book or Idea Recommendation
                    </option>
                    <option value="General Conversation">
                      General Conversation
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#f2efeb]"
                  >
                    Your Personal Message *
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
                    placeholder="Write a personal note, share a thought, or say hello..."
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
                    Static mailto preparation · No third-party tracking
                  </p>
                </div>

                {/* Honest Static Mailto Preparation Confirmation */}
                {preparedMailto && (
                  <div
                    data-testid="contact-prepared-panel"
                    className="mt-5 p-4 rounded-xl bg-[#090909] border border-[#e32b3c]/50 space-y-3"
                  >
                    <p className="text-xs sm:text-sm text-[#f2efeb] font-medium">
                      Your inquiry draft is formatted and ready. Because this is a static portfolio, click below to open your email client or copy the formatted brief:
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={preparedMailto}
                        className="min-h-[40px] px-4 py-2 rounded-lg bg-[#e32b3c] text-xs font-semibold text-[#f2efeb] inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email Client</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="min-h-[40px] px-4 py-2 rounded-lg bg-[#181818] border border-[#f2efeb]/15 text-xs font-medium text-[#f2efeb] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedBrief ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#e32b3c]" />
                            <span>Brief Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Brief Text</span>
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
