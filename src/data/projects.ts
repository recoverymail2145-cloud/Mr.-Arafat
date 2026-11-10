import { ProjectItem } from '../config/site';

/**
 * Personal Journal & Digital Garden entries for Md Arafat Hossn (এমডি আরাফাত হোসেন).
 * Replaces commercial portfolio projects with personal essays, reflections, and life notes.
 */
export const VERIFIED_PROJECTS: ProjectItem[] = [
  {
    id: 'journal-quiet-digital-home',
    title: 'Why I Built a Personal Space Instead of a Portfolio',
    category: 'Reflections',
    year: '2026',
    summary:
      'On reclaiming a quiet corner of the internet for personal thoughts, honest writing, and human connection without selling anything.',
    description:
      'Most websites today try to sell a service, showcase client metrics, or optimize for algorithms. As Md Arafat Hossn (এমডি আরাফাত হোসেন), I wanted a true personal website—a digital home where I can write openly, archive ideas that matter to me, and welcome friends and readers without commercial noise.',
    role: 'Personal Essay · এমডি আরাফাত হোসেন',
    tools: ['Personal Philosophy', 'Digital Garden', 'Minimalism', 'জীবনদর্শন'],
    deliverables: [
      'Owning your own voice and archive on the web',
      'Choosing calm, readable typography over social media noise',
      'Writing for clarity of thought rather than commercial conversion',
    ],
    outcomes:
      'Published as the opening manifesto of Md Arafat Hossn’s personal website.',
    coverImage: '/src/assets/images/personal_journal_sanctuary_1794303611884.jpg',
    gallery: ['/src/assets/images/personal_journal_sanctuary_1794303611884.jpg'],
    videoUrl: '',
    liveUrl: '',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'journal-lifelong-curiosity',
    title: 'Notes on Lifelong Curiosity & Daily Learning (শেখার আনন্দ)',
    category: 'Life Notes',
    year: '2026',
    summary:
      'How small daily habits—reading twenty pages, writing down one honest observation, and staying humble—compound over the years.',
    description:
      'Curiosity is the most reliable compass in life. Whether exploring a new book in Bengali or English, observing how technology shapes our habits, or listening to people from different walks of life, keeping a beginner’s mind makes every ordinary day richer.',
    role: 'Journal Entry · Md Arafat Hossn',
    tools: ['Reading', 'Daily Habits', 'Self-Reflection', 'বই ও চিন্তা'],
    deliverables: [
      'Morning reading without phone distractions',
      'Keeping a commonplace notebook of quotes and questions',
      'Valuing depth of understanding over speed',
    ],
    outcomes: 'Part of the ongoing Life Notes collection.',
    coverImage: '/src/assets/images/personal_reading_notes_1794303612502.jpg',
    gallery: ['/src/assets/images/personal_reading_notes_1794303612502.jpg'],
    videoUrl: '',
    liveUrl: '',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'journal-simplicity-and-focus',
    title: 'The Art of Simplicity in an Overwhelmed World',
    category: 'Philosophy',
    year: '2025',
    summary:
      'Subtracting the non-essential so there is room for deep focus, family, meaningful conversations, and peace of mind.',
    description:
      'We often mistake busyness for purpose. Over the past few years, I have practiced simplifying both my digital environment and daily commitments—focusing on a few meaningful pursuits, honest relationships, and intentional rest.',
    role: 'Personal Reflection · এমডি আরাফাত হোসেন',
    tools: ['Minimalism', 'Intentional Living', 'Focus', 'সহজ জীবন'],
    deliverables: [
      'Decluttering digital workspaces and attention',
      'Prioritizing real-world conversations and community',
      'Building sustainable rhythms for work and rest',
    ],
    outcomes: 'Featured essay in the Philosophy archive.',
    coverImage: '/src/assets/images/personal_simplicity_living_1794303612686.jpg',
    gallery: ['/src/assets/images/personal_simplicity_living_1794303612686.jpg'],
    videoUrl: '',
    liveUrl: '',
    sourceUrl: '',
    featured: true,
  },
  {
    id: 'journal-notes-on-perspective',
    title: 'Technology, Humanity & Keeping Our Perspective',
    category: 'Technology & Culture',
    year: '2025',
    summary:
      'Reflections on using modern tools to amplify human warmth and creativity rather than replacing genuine connection.',
    description:
      'Technology moves fast, but human values remain timeless. In this note, I explore how we can embrace modern digital tools while staying grounded in empathy, cultural roots, and personal integrity.',
    role: 'Essay · Md Arafat Hossn',
    tools: ['Technology', 'Culture', 'Human Connection', 'প্রযুক্তি ও মানুষ'],
    deliverables: [
      'Using tools intentionally rather than passively consuming',
      'Preserving native language (বাংলা) and personal identity online',
      'Sharing knowledge openly with others',
    ],
    outcomes: 'Archived in Technology & Culture notes.',
    coverImage: '/src/assets/images/personal_perspective_horizon_1794303615316.jpg',
    gallery: ['/src/assets/images/personal_perspective_horizon_1794303615316.jpg'],
    videoUrl: '',
    liveUrl: '',
    sourceUrl: '',
    featured: true,
  },
];

export const OWNER_PROJECT_TEMPLATE: ProjectItem = {
  id: 'example-note-01',
  title: '[YOUR JOURNAL TITLE]',
  category: '[REFLECTIONS / LIFE NOTES / PHILOSOPHY]',
  year: '2026',
  summary: '[ONE-SENTENCE SUMMARY OF YOUR THOUGHT OR STORY]',
  description: '[FULL PERSONAL ESSAY OR STORY TEXT]',
  role: 'Md Arafat Hossn',
  tools: ['[TOPICS OR TAGS]'],
  deliverables: ['[KEY TAKEAWAYS OR HIGHLIGHTS]'],
  outcomes: '[PERSONAL CONTEXT]',
  coverImage: '',
  gallery: [],
  videoUrl: '',
  liveUrl: '',
  sourceUrl: '',
  featured: true,
};
