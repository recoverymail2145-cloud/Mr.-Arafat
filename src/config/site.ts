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
    navWork: 'Journal',
    navAbout: 'About',
    navExperience: 'Journey',
    navContact: 'Connect',
    motionButton: 'Motion',
    motionActive: 'Swarm On',
    motionPaused: 'Motion Off',
    ctaPrimary: 'Read Personal Journal',
    ctaSecondary: 'Say Hello',
    selectedWorkTitle: 'Personal Journal & Notes',
    selectedWorkSubtitle:
      'Reflections, ideas, personal essays, and everyday explorations by Md Arafat Hossn (এমডি আরাফাত হোসেন).',
    searchPlaceholder: 'Search essays, notes, or topics...',
    allCategories: 'All Entries',
    viewCaseStudy: 'Read Full Note',
    loadMore: 'Load More Notes',
    aboutTitle: 'Personal Story & Values',
    processTitle: 'Personal Principles',
    skillsTitle: 'Interests & Curiosities',
    toolsTitle: 'Everyday Favorites & Reading',
    educationTitle: 'Learning & Life Chapters',
    experienceTitle: 'Life Journey & Milestones',
    contactTitle: 'Say Hello & Connect',
    contactSubtitle:
      'This is my personal space on the web. Feel free to send a personal note, share a thought, or connect.',
    sendEmailButton: 'Prepare Personal Note',
    customizeConfig: 'Personalize Site',
  },
  Bengali: {
    navWork: 'জার্নাল',
    navAbout: 'আমার সম্পর্কে',
    navExperience: 'জীবনযাত্রা',
    navContact: 'যোগাযোগ',
    motionButton: 'মোশন',
    motionActive: 'সোয়ার্ম চালু',
    motionPaused: 'মোশন বন্ধ',
    ctaPrimary: 'জার্নাল ও ভাবনা পড়ুন',
    ctaSecondary: 'বার্তা পাঠান',
    selectedWorkTitle: 'ব্যক্তিগত জার্নাল ও ডায়েরি',
    selectedWorkSubtitle:
      'এমডি আরাফাত হোসেন (Md Arafat Hossn)-এর ব্যক্তিগত চিন্তা, প্রবন্ধ, এবং দৈনন্দিন অভিজ্ঞতার সংকলন।',
    searchPlaceholder: 'লেখা বা বিষয় খুঁজুন...',
    allCategories: 'সব লেখা',
    viewCaseStudy: 'সম্পূর্ণ লেখা পড়ুন',
    loadMore: 'আরও লেখা দেখুন',
    aboutTitle: 'আমার পরিচয় ও জীবনদর্শন',
    processTitle: 'জীবনের মূলনীতি',
    skillsTitle: 'আগ্রহ ও শখ',
    toolsTitle: 'পছন্দের বিষয় ও চর্চা',
    educationTitle: 'শিক্ষা ও শেখার অধ্যায়',
    experienceTitle: 'জীবনের পথচলা ও স্মৃতি',
    contactTitle: 'শুভেচ্ছা ও যোগাযোগ',
    contactSubtitle:
      'এটি আমার ব্যক্তিগত ওয়েবসাইট। যেকোনো শুভেচ্ছা, মতামত বা ব্যক্তিগত বার্তার জন্য নিচে লিখতে পারেন।',
    sendEmailButton: 'বার্তা প্রস্তুত করুন',
    customizeConfig: 'সাইট কাস্টমাইজ',
  },
  Hindi: {
    navWork: 'जर्नल',
    navAbout: 'परिचय',
    navExperience: 'जीवन यात्रा',
    navContact: 'संपर्क',
    motionButton: 'मोशन',
    motionActive: 'मोशन चालू',
    motionPaused: 'मोशन बंद',
    ctaPrimary: 'जर्नल पढ़ें',
    ctaSecondary: 'नमस्ते कहें',
    selectedWorkTitle: 'व्यक्तिगत जर्नल और विचार',
    selectedWorkSubtitle: 'एमडी अराफात हुसैन के व्यक्तिगत विचार, लेख और अनुभव।',
    searchPlaceholder: 'लेख या विषय खोजें...',
    allCategories: 'सभी लेख',
    viewCaseStudy: 'पूरा लेख पढ़ें',
    loadMore: 'और लेख देखें',
    aboutTitle: 'व्यक्तिगत परिचय और विचार',
    processTitle: 'जीवन के सिद्धांत',
    skillsTitle: 'रुचियां और जिज्ञासा',
    toolsTitle: 'पसंदीदा विषय',
    educationTitle: 'शिक्षा और सीख',
    experienceTitle: 'जीवन यात्रा',
    contactTitle: 'संपर्क करें',
    contactSubtitle: 'व्यक्तिगत बातचीत और विचारों के आदान-प्रदान के लिए संदेश भेजें।',
    sendEmailButton: 'संदेश तैयार करें',
    customizeConfig: 'कस्टमाइज़ करें',
  },
  Indonesian: {
    navWork: 'Jurnal',
    navAbout: 'Tentang',
    navExperience: 'Perjalanan',
    navContact: 'Kontak',
    motionButton: 'Motion',
    motionActive: 'Swarm Aktif',
    motionPaused: 'Motion Nonaktif',
    ctaPrimary: 'Baca Jurnal',
    ctaSecondary: 'Sapa Saya',
    selectedWorkTitle: 'Jurnal & Catatan Pribadi',
    selectedWorkSubtitle: 'Catatan, esai pribadi, dan pemikiran oleh Md Arafat Hossn.',
    searchPlaceholder: 'Cari catatan atau topik...',
    allCategories: 'Semua Catatan',
    viewCaseStudy: 'Baca Selengkapnya',
    loadMore: 'Muat Lebih Banyak',
    aboutTitle: 'Cerita & Nilai Pribadi',
    processTitle: 'Prinsip Hidup',
    skillsTitle: 'Minat & Eksplorasi',
    toolsTitle: 'Favorit Sehari-hari',
    educationTitle: 'Pembelajaran',
    experienceTitle: 'Perjalanan Hidup',
    contactTitle: 'Sapa & Terhubung',
    contactSubtitle: 'Ruang pribadi di web untuk berbagi cerita dan terhubung.',
    sendEmailButton: 'Siapkan Pesan',
    customizeConfig: 'Kustomisasi Situs',
  },
};

import { VERIFIED_PROJECTS } from '../data/projects';
import {
  VERIFIED_EXPERIENCE,
  VERIFIED_EDUCATION,
  VERIFIED_PROCESS_STEPS,
  VERIFIED_METRICS,
} from '../data/experience';

/**
 * PERSONAL WEBSITE CONFIGURATION — Md Arafat Hossn (এমডি আরাফাত হোসেন)
 * Designed as an authentic personal website & digital garden (not a commercial portfolio).
 */
export const defaultSiteConfig: SiteConfig = {
  referenceWebsite: 'https://touquirakhtar.com/',
  websiteUrl: 'https://mdarafathossn.com/',

  identity: {
    fullName: 'Md Arafat Hossn',
    bengaliName: 'এমডি আরাফাত হোসেন',
    displayName: 'MD ARAFAT HOSSN',
    profession: 'Personal Website & Digital Garden · এমডি আরাফাত হোসেন',
    roleLine2:
      'এমডি আরাফাত হোসেন — Personal Reflections, Ideas, Life Notes & Digital Sanctuary',
    location: 'Bangladesh',
    availability: 'Welcome to My Personal Corner on the Web',
    headline: 'MD ARAFAT HOSSN · এমডি আরাফাত হোসেন',
    intro:
      'Welcome to the personal website of Md Arafat Hossn (এমডি আরাফাত হোসেন). This is not a commercial portfolio—it is my personal space to document life lessons, thoughtful essays, curiosities, and personal reflections.',
    about:
      'I am Md Arafat Hossn (এমডি আরাফাত হোসেন). I created this personal site as a quiet, distraction-free home on the internet—away from noisy social feeds and commercial pitches. Here I share what I am reading, thinking about, learning, and experiencing in everyday life.',
    positioning:
      'Living with curiosity, clarity, and gratitude—valuing meaningful conversations, lifelong learning, and authentic human connection.',
    portrait: '',
    resume: '',
    favicon: '',
  },

  contact: {
    email: 'hello@mdarafathossn.com',
    phone: '',
    whatsapp: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    github: '',
    behance: '',
    dribbble: '',
    otherLinks: [],
  },

  portfolio: {
    projects: VERIFIED_PROJECTS,
    featuredProjectIds: [
      'journal-quiet-digital-home',
      'journal-lifelong-curiosity',
      'journal-simplicity-and-focus',
      'journal-notes-on-perspective',
    ],
    categories: [],
    clientLogos: [],
    processSteps: VERIFIED_PROCESS_STEPS,
    skills: [
      'Personal Writing & Journaling (লেখালেখি ও ডায়েরি)',
      'Technology & Digital Culture (প্রযুক্তি ও ডিজিটাল সংস্কৃতি)',
      'Reading & Philosophy (বই পড়া ও জীবনদর্শন)',
      'Minimalist Living (সহজ ও সুন্দর জীবনযাপন)',
      'Photography & Visual Observation (ফটোগ্রাফি ও প্রকৃতি)',
      'Community & Meaningful Conversations (মানুষ ও সমাজ)',
    ],
    tools: [
      'Books & Essays',
      'Daily Journal',
      'Bengali Literature',
      'Digital Garden',
      'Mindful Routine',
      'Photography',
      'Audio & Podcasts',
      'Travel Notes',
    ],
    experience: VERIFIED_EXPERIENCE,
    education: VERIFIED_EDUCATION,
    awards: [],
    testimonials: [],
    metrics: VERIFIED_METRICS,
    beforeAfter: [],
  },

  appearance: {
    style: 'cinematic minimal, personal sanctuary, editorial typography',
    theme: 'dark',
    background: '#090909',
    text: '#f2efeb',
    accent: '#e32b3c',
    muted: '#a09c9a',
    displayFont: 'Anton',
    bodyFont: 'Manrope',
    accentFont: 'Caveat',
    animationIntensity: 'balanced',
    language: 'English',
  },

  preferences: {
    showAwards: false,
    showEducation: true,
    showExperience: true,
    showBeforeAfter: false,
    showClientLogos: false,
    showTestimonials: false,
    showContactForm: true,
    showDownloadResume: false,
    showProjectArchive: true,
  },
};
