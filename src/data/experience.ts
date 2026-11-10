import { ExperienceItem, EducationItem, ProcessStep, MetricItem } from '../config/site';

export const VERIFIED_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'journey-personal-sanctuary',
    role: 'Writing, Digital Gardening & Personal Exploration',
    organization: 'Md Arafat Hossn · এমডি আরাফাত হোসেন',
    period: 'Present Chapter',
    location: 'Bangladesh',
    type: 'Personal Chapter',
    summary:
      'Documenting personal essays, reading notes, technological curiosities, and reflections on intentional living.',
    highlights: [
      'Maintaining an independent personal website and bilingual (English & বাংলা) digital journal.',
      'Exploring books, philosophy, digital culture, and everyday creative habits.',
      'Connecting with like-minded readers and friends around the world.',
    ],
    tools: ['Writing', 'Reading', 'Philosophy', 'Digital Culture'],
  },
  {
    id: 'journey-community-learning',
    role: 'Independent Learner & Community Contributor',
    organization: 'Self-Directed Study & Open Knowledge',
    period: 'Ongoing',
    location: 'Bangladesh',
    type: 'Life & Learning',
    summary:
      'Focused on continuous self-improvement, learning modern web and creative tools for personal expression, and sharing helpful notes.',
    highlights: [
      'Practicing disciplined daily reading and long-form note-taking.',
      'Building personal web experiments and interactive visual ideas like Swarmline.',
    ],
    tools: ['Self-Study', 'Web Craft', 'Creative Coding', 'Community'],
  },
];

export const VERIFIED_EDUCATION: EducationItem[] = [
  {
    id: 'edu-lifelong-learning',
    qualification: 'Continuous Reading & Self-Education (স্বশিক্ষা ও পাঠচর্চা)',
    institution: 'Personal Library & Open Courses',
    period: 'Always Learning',
    details:
      'Dedicated to lifelong learning across literature, technology, philosophy, and personal growth in both Bengali and English.',
  },
  {
    id: 'edu-foundations',
    qualification: 'Academic & Personal Foundations',
    institution: 'Bangladesh',
    period: 'Foundational Years',
    details:
      'Shaped by curiosity, discipline, cultural roots, and a commitment to honest character and continuous growth.',
  },
];

export const VERIFIED_PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Curiosity First',
    description:
      'Asking honest questions and staying open to new perspectives every day.',
  },
  {
    number: '02',
    title: 'Deep Reading',
    description:
      'Spending time with thoughtful books, essays, and ideas rather than fleeting headlines.',
  },
  {
    number: '03',
    title: 'Clear Reflection',
    description:
      'Writing down thoughts in plain language to understand life and ideas more deeply.',
  },
  {
    number: '04',
    title: 'Intentional Simplicity',
    description:
      'Keeping daily routines, digital spaces, and commitments uncluttered and meaningful.',
  },
  {
    number: '05',
    title: 'Genuine Connection',
    description:
      'Valuing kindness, respect, and real conversations with people everywhere.',
  },
];

export const VERIFIED_METRICS: MetricItem[] = [
  {
    label: 'Identity',
    value: 'Md Arafat Hossn',
    context: 'এমডি আরাফাত হোসেন · Personal Site',
  },
  {
    label: 'Site Purpose',
    value: 'Personal Space',
    context: 'Journal, ideas & life notes (Not a commercial portfolio)',
  },
  {
    label: 'Languages',
    value: 'বাংলা · English',
    context: 'Bilingual personal reflections & writing',
  },
  {
    label: 'Home Base',
    value: 'Bangladesh',
    context: 'Open to friendly conversations worldwide',
  },
];
