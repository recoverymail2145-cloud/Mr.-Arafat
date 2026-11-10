import { ExperienceItem, EducationItem, ProcessStep, MetricItem } from '../config/site';

export const VERIFIED_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'moment-photography-captures',
    role: 'নিজের ফটোগ্রাফি ও টেকনিক্যাল ক্যাপচার (Personal Photography & Captures)',
    organization: 'এমডি আরাফাত হোসেন · arafathossn.com',
    period: 'নিয়মিত শখ',
    location: 'বাংলাদেশ',
    type: 'Personal Hobby',
    summary:
      'নতুন জায়গা ঘুরে দেখা, সন্ধ্যার বোকেহ লাইট, প্রকৃতির রঙ এবং নিজের প্রিয় মুহূর্তগুলো ক্যামেরায় ক্যাপচার করা আমার অন্যতম প্রিয় শখ।',
    highlights: [
      'পোর্ট্রেট ফটোগ্রাফি, লো-লাইট বোকেহ এবং ন্যাচারাল ফ্রেমিং নিয়ে নিজের মতো এক্সপেরিমেন্ট করা।',
      'হাই-রেজোলিউশন টেকনিক্যাল ক্যাপচার ও কালার টোনিং সংগ্রহ করে রাখা।',
      'ইন্সটাগ্রাম ও ফেসবুকে বন্ধুদের সাথে প্রিয় ছবি ও মুহূর্তগুলো শেয়ার করা।',
    ],
    tools: ['Portrait', 'Bokeh', 'Light & Shadow', 'Nature'],
  },
  {
    id: 'moment-lifestyle-travel',
    role: 'ভ্রমণ, কফি ও আড্ডা (Lifestyle, Coffee & Exploring)',
    organization: 'ব্যক্তিগত জীবন ও বন্ধুমহল',
    period: 'সবসময়',
    location: 'বাংলাদেশ',
    type: 'Lifestyle',
    summary:
      'কাজের বা নিয়মের বাঁধাধরা গণ্ডির বাইরে নিজের মতো সময় কাটানো, ক্যাফেতে আড্ডা দেওয়া এবং নতুন অভিজ্ঞতা সংগ্রহ করা।',
    highlights: [
      'শান্ত পরিবেশে কফি ও গানের সাথে সময় কাটানো।',
      'নতুন জায়গা ভ্রমণ এবং বন্ধুদের সাথে স্মরণীয় মুহূর্ত তৈরি করা।',
    ],
    tools: ['Coffee', 'Travel', 'Friends', 'Music'],
  },
];

export const VERIFIED_EDUCATION: EducationItem[] = [];

export const VERIFIED_PROCESS_STEPS: ProcessStep[] = [];

export const VERIFIED_METRICS: MetricItem[] = [
  {
    label: 'নাম (Identity)',
    value: 'এমডি আরাফাত হোসেন',
    context: 'Md Arafat Hossn · ব্যক্তিগত ওয়েবসাইট',
  },
  {
    label: 'ডোমেইন (Domain)',
    value: 'arafathossn.com',
    context: 'অফিশিয়াল পার্সোনাল ওয়েবসাইট',
  },
  {
    label: 'পছন্দ (Passions)',
    value: 'ফটোগ্রাফি ও ক্যাপচার',
    context: 'নিজের ফটোগ্রাফি, পোর্ট্রেট ও টেকনিক্যাল শট',
  },
  {
    label: 'সোশ্যাল (Connect)',
    value: 'IG · WA · FB',
    context: 'ইনস্টাগ্রাম, হোয়াটসঅ্যাপ, ফেসবুক ও ইমেইল',
  },
];
