export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  role: string;
  tools: string[];
  deliverables: string[];
  outcomes: string;
  coverImage: string;
  gallery: string[];
  videoUrl: string;
  liveUrl: string;
  sourceUrl: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  tools: string[];
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  details: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface MetricItem {
  label: string;
  value: string;
  context: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  proofUrl?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  outcome: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  caption: string;
}

export type SupportedLanguage = 'English' | 'Bengali' | 'Hindi' | 'Indonesian';
export type AnimationIntensity = 'subtle' | 'balanced' | 'expressive';

export interface SiteConfig {
  referenceWebsite: string;
  websiteUrl: string;
  identity: {
    fullName: string;
    bengaliName?: string;
    displayName: string;
    profession: string;
    roleLine2: string;
    location: string;
    availability: string;
    headline: string;
    intro: string;
    about: string;
    positioning: string;
    portrait: string;
    resume: string;
    favicon: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    facebook?: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    github: string;
    behance: string;
    dribbble: string;
    otherLinks: { label: string; url: string }[];
  };
  portfolio: {
    projects: ProjectItem[];
    featuredProjectIds: string[];
    categories: string[];
    clientLogos: { name: string; logoUrl: string; url?: string }[];
    processSteps: ProcessStep[];
    skills: string[];
    tools: string[];
    experience: ExperienceItem[];
    education: EducationItem[];
    awards: AwardItem[];
    testimonials: TestimonialItem[];
    metrics: MetricItem[];
    beforeAfter: BeforeAfterItem[];
  };
  appearance: {
    style: string;
    theme: 'dark' | 'light';
    background: string;
    text: string;
    accent: string;
    muted: string;
    displayFont: string;
    bodyFont: string;
    accentFont: string;
    animationIntensity: AnimationIntensity;
    language: SupportedLanguage;
  };
  preferences: {
    showAwards: boolean;
    showEducation: boolean;
    showExperience: boolean;
    showBeforeAfter: boolean;
    showClientLogos: boolean;
    showTestimonials: boolean;
    showContactForm: boolean;
    showDownloadResume: boolean;
    showProjectArchive: boolean;
  };
}

export interface TranslationLabels {
  navWork: string;
  navAbout: string;
  navExperience: string;
  navContact: string;
  motionButton: string;
  motionActive: string;
  motionPaused: string;
  ctaPrimary: string;
  ctaSecondary: string;
  selectedWorkTitle: string;
  selectedWorkSubtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  viewCaseStudy: string;
  loadMore: string;
  aboutTitle: string;
  processTitle: string;
  skillsTitle: string;
  toolsTitle: string;
  educationTitle: string;
  experienceTitle: string;
  contactTitle: string;
  contactSubtitle: string;
  sendEmailButton: string;
  customizeConfig: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationLabels> = {
  English: {
    navWork: 'Captures',
    navAbout: 'About Me',
    navExperience: 'Moments',
    navContact: 'Socials',
    motionButton: 'Motion FX',
    motionActive: 'Motion Live',
    motionPaused: 'Motion Off',
    ctaPrimary: 'My Photography & Captures',
    ctaSecondary: 'Connect With Me',
    selectedWorkTitle: 'My Photography & Technical Captures',
    selectedWorkSubtitle:
      'Personal photography, light & frame captures, candid moments, and visual experiments by Md Arafat Hossn (এমডি আরাফাত হোসেন).',
    searchPlaceholder: 'Search captures, camera mood, or moments...',
    allCategories: 'All Captures',
    viewCaseStudy: 'View Capture',
    loadMore: 'Show More Captures',
    aboutTitle: 'About Md Arafat Hossn',
    processTitle: 'My Vibe',
    skillsTitle: 'What I Love Doing',
    toolsTitle: 'Camera, Gear & Favorites',
    educationTitle: 'Personal Background',
    experienceTitle: 'Personal Moments & Highlights',
    contactTitle: 'Instagram, WhatsApp, Facebook & Email',
    contactSubtitle:
      'Connect with me directly on Instagram, WhatsApp, Facebook, or drop a personal email below.',
    sendEmailButton: 'Send Personal Email',
    customizeConfig: 'Edit Info / Email',
  },
  Bengali: {
    navWork: 'ফটোগ্রাফি ও ক্যাপচার',
    navAbout: 'আমার সম্পর্কে',
    navExperience: 'মুহূর্তসমূহ',
    navContact: 'সোশ্যাল ও যোগাযোগ',
    motionButton: 'প্রিমিয়াম মোশন',
    motionActive: 'মোশন চালু',
    motionPaused: 'মোশন বন্ধ',
    ctaPrimary: 'আমার ফটোগ্রাফি ও ক্যাপচার',
    ctaSecondary: 'যোগাযোগ ও সোশ্যাল',
    selectedWorkTitle: 'নিজের ফটোগ্রাফি ও টেকনিক্যাল ক্যাপচার',
    selectedWorkSubtitle:
      'এমডি আরাফাত হোসেন (Md Arafat Hossn)-এর নিজের তোলা ছবি, টেকনিক্যাল ক্যাপচার এবং প্রিয় কিছু মুহূর্ত।',
    searchPlaceholder: 'ফটোগ্রাফি বা ক্যাপচার খুঁজুন...',
    allCategories: 'সব ক্যাপচার',
    viewCaseStudy: 'ছবিটি দেখুন',
    loadMore: 'আরও ছবি দেখুন',
    aboutTitle: 'এমডি আরাফাত হোসেন সম্পর্কে',
    processTitle: 'আমার পছন্দ',
    skillsTitle: 'আমার শখ ও ভালো লাগা',
    toolsTitle: 'ফটোগ্রাফি, গ্যাজেট ও প্রিয় বিষয়',
    educationTitle: 'ব্যক্তিগত অধ্যায়',
    experienceTitle: 'প্রিয় মুহূর্ত ও ডায়েরি',
    contactTitle: 'ইনস্টাগ্রাম, হোয়াটসঅ্যাপ, ফেসবুক ও ইমেইল',
    contactSubtitle:
      'আমার পার্সোনাল ইনস্টাগ্রাম, হোয়াটসঅ্যাপ, ফেসবুক অথবা সরাসরি ইমেইলে যুক্ত হতে পারেন।',
    sendEmailButton: 'ইমেইল পাঠান',
    customizeConfig: 'ইমেইল ও তথ্য পরিবর্তন',
  },
  Hindi: {
    navWork: 'फ़ोटोग्राफ़ी',
    navAbout: 'मेरे बारे में',
    navExperience: 'पल',
    navContact: 'सोशल',
    motionButton: 'मोशन FX',
    motionActive: 'मोशन चालू',
    motionPaused: 'मोशन बंद',
    ctaPrimary: 'मेरी फ़ोटोग्राफ़ी देखें',
    ctaSecondary: 'जुड़ें',
    selectedWorkTitle: 'मेरी फ़ोटोग्राफ़ी और टेक्निकल कैप्चर',
    selectedWorkSubtitle: 'एमडी अराफात हुसैन के व्यक्तिगत फ़ोटो और पसंदीदा पल।',
    searchPlaceholder: 'फ़ोटो या पल खोजें...',
    allCategories: 'सभी फ़ोटो',
    viewCaseStudy: 'फ़ोटो देखें',
    loadMore: 'और देखें',
    aboutTitle: 'एमडी अराफात हुसैन',
    processTitle: 'मेरी पसंद',
    skillsTitle: 'शौक और रुचियां',
    toolsTitle: 'पसंदीदा चीज़ें',
    educationTitle: 'व्यक्तिगत अध्याय',
    experienceTitle: 'यादगार पल',
    contactTitle: 'इंस्टाग्राम, व्हाट्सएप, फेसबुक और ईमेल',
    contactSubtitle: 'मुझसे सोशल मीडिया या ईमेल पर सीधे जुड़ें।',
    sendEmailButton: 'ईमेल भेजें',
    customizeConfig: 'जानकारी बदलें',
  },
  Indonesian: {
    navWork: 'Fotografi',
    navAbout: 'Tentang Saya',
    navExperience: 'Momen',
    navContact: 'Sosial',
    motionButton: 'Motion FX',
    motionActive: 'Motion Aktif',
    motionPaused: 'Motion Nonaktif',
    ctaPrimary: 'Lihat Fotografi',
    ctaSecondary: 'Terhubung',
    selectedWorkTitle: 'Fotografi & Tangkapan Teknis',
    selectedWorkSubtitle: 'Koleksi foto pribadi dan momen oleh Md Arafat Hossn.',
    searchPlaceholder: 'Cari foto atau momen...',
    allCategories: 'Semua Foto',
    viewCaseStudy: 'Lihat Foto',
    loadMore: 'Muat Lebih Banyak',
    aboutTitle: 'Tentang Md Arafat Hossn',
    processTitle: 'Gaya Hidup',
    skillsTitle: 'Hobi & Minat',
    toolsTitle: 'Favorit',
    educationTitle: 'Latar Belakang',
    experienceTitle: 'Momen Pribadi',
    contactTitle: 'Instagram, WhatsApp, Facebook & Email',
    contactSubtitle: 'Terhubung langsung melalui Instagram, WhatsApp, Facebook, atau Email.',
    sendEmailButton: 'Kirim Email',
    customizeConfig: 'Edit Info',
  },
};

import { VERIFIED_PROJECTS } from '../data/projects';
import {
  VERIFIED_EXPERIENCE,
  VERIFIED_EDUCATION,
  VERIFIED_METRICS,
} from '../data/experience';

/**
 * PERSONAL WEBSITE — এমডি আরাফাত হোসেন (Md Arafat Hossn)
 * Domain: arafathossn.com
 * Purely personal site featuring personal portrait, photography, technical captures, and personal socials.
 */
export const defaultSiteConfig: SiteConfig = {
  referenceWebsite: 'https://arafathossn.com/',
  websiteUrl: 'https://arafathossn.com/',

  identity: {
    fullName: 'এমডি আরাফাত হোসেন',
    bengaliName: 'Md Arafat Hossn · arafathossn.com',
    displayName: 'এমডি আরাফাত হোসেন',
    profession: 'ব্যক্তিগত ওয়েবসাইট · arafathossn.com',
    roleLine2:
      'নিজের ফটোগ্রাফি, টেকনিক্যাল ক্যাপচার, প্রিয় মুহূর্ত এবং একান্ত ব্যক্তিগত জগৎ',
    location: 'বাংলাদেশ (Bangladesh)',
    availability: 'Welcome to My Personal World',
    headline: 'এমডি আরাফাত হোসেন',
    intro:
      'স্বাগতম! আমি এমডি আরাফাত হোসেন (Md Arafat Hossn)। এটি আমার একান্ত ব্যক্তিগত ওয়েবসাইট (arafathossn.com)। এখানে কোনো এজেন্সি বা প্রফেশনাল পোর্টফোলিও নেই—শুধুমাত্র আমার নিজের তোলা ফটোগ্রাফি, টেকনিক্যাল ক্যাপচার, প্রিয় মুহূর্ত এবং পার্সোনাল সোশ্যাল লিংকগুলো সাজানো আছে।',
    about:
      'আমি এমডি আরাফাত হোসেন। নিজের মতো করে সময় কাটাতে, দারুণ কিছু মুহূর্ত ক্যামেরাবন্দী করতে, টেকনিক্যাল ক্যাপচার নিয়ে এক্সপেরিমেন্ট করতে এবং নতুন জায়গা ও মানুষের সাথে পরিচিত হতে ভালোবাসি। এই সাইটটি আমার নিজের ছবির অ্যালবাম, শখের ফটোগ্রাফি এবং বন্ধুদের সাথে যুক্ত থাকার একটি ব্যক্তিগত মাধ্যম।',
    positioning:
      'আলো, ছায়া, সুন্দর মুহূর্ত আর নিজের মতো করে বেঁচে থাকার ছোট ছোট গল্প।',
    portrait: '/assets/aistudio/11_upscayl_2x_upscayl-lite-4x_db8cd6b4.jpg',
    resume: '',
    favicon: '',
  },

  contact: {
    email: 'recoverymail2145@gmail.com', // আপনি যখনই নতুন ইমেইল দেবেন বা "ইমেইল ও তথ্য পরিবর্তন" বাটনে ক্লিক করবেন, এটি আপডেট হয়ে যাবে
    phone: '',
    whatsapp: '8801700000000', // পার্সোনাল হোয়াটসঅ্যাপ (কাস্টমাইজ প্যানেল থেকে নিজের নম্বর বসাতে পারবেন)
    facebook: 'https://facebook.com/arafathossn',
    instagram: 'https://instagram.com/arafathossn',
    youtube: '',
    linkedin: '',
    github: '',
    behance: '',
    dribbble: '',
    otherLinks: [
      { label: 'Facebook (ফেসবুক)', url: 'https://facebook.com/arafathossn' },
      { label: 'Instagram (ইনস্টাগ্রাম)', url: 'https://instagram.com/arafathossn' },
      { label: 'arafathossn.com', url: 'https://arafathossn.com/' },
    ],
  },

  portfolio: {
    projects: VERIFIED_PROJECTS,
    featuredProjectIds: [
      'capture-personal-portrait',
      'capture-river-twilight',
      'capture-light-shadow-tech',
      'capture-rainy-window',
    ],
    categories: [],
    clientLogos: [],
    processSteps: [], // কোনো এজেন্সি বা ওয়ার্কফ্লো স্টেপ রাখা হয়নি
    skills: [
      'নিজের ফটোগ্রাফি (Personal Photography)',
      'টেকনিক্যাল ক্যাপচার ও লাইটিং (Technical Captures)',
      'পোর্ট্রেট ও বোকেহ শট (Portrait & Bokeh)',
      'ভ্রমণ ও প্রকৃতি (Travel & Nature)',
      'কফি, আড্ডা ও লাইফস্টাইল (Coffee & Lifestyle)',
      'মিউজিক ও সিনেমা (Music & Cinema)',
    ],
    tools: [
      'Mobile & Camera Photography',
      'Low-Light Bokeh',
      'Color Grading',
      'High-Res Upscaling',
      'Natural Framing',
      'Street & Evening Vibes',
      'Golden Hour',
      'Candid Moments',
    ],
    experience: VERIFIED_EXPERIENCE,
    education: VERIFIED_EDUCATION,
    awards: [],
    testimonials: [],
    metrics: VERIFIED_METRICS,
    beforeAfter: [],
  },

  appearance: {
    style: 'luxury personal lifestyle, warm golden-crimson bokeh, premium motion',
    theme: 'dark',
    background: '#090909',
    text: '#f2efeb',
    accent: '#e32b3c',
    muted: '#a09c9a',
    displayFont: 'Anton',
    bodyFont: 'Manrope',
    accentFont: 'Caveat',
    animationIntensity: 'expressive',
    language: 'Bengali',
  },

  preferences: {
    showAwards: false,
    showEducation: false,
    showExperience: true,
    showBeforeAfter: false,
    showClientLogos: false,
    showTestimonials: false,
    showContactForm: true,
    showDownloadResume: false,
    showProjectArchive: true,
  },
};
