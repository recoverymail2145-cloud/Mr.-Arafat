import test from 'node:test';
import assert from 'node:assert/strict';
import {
  deriveCategories,
  filterProjects,
  getActiveSections,
  getMotionStorageKey,
  validateContactForm,
  buildMailtoUrl,
  buildWhatsAppUrl,
  createSwarmAgents,
  stepSwarmAgents,
} from './portfolioLogic';
import { defaultSiteConfig } from '../config/site';

test('deriveCategories extracts unique personal journal categories when configuredCategories is empty', () => {
  const categories = deriveCategories(defaultSiteConfig.portfolio.projects, []);
  assert.ok(categories.includes('Reflections'));
  assert.ok(categories.includes('Life Notes'));
  assert.ok(categories.includes('Philosophy'));
  assert.ok(categories.includes('Technology & Culture'));
  assert.equal(categories.length, 4);
});

test('filterProjects filters journal notes by category and search query accurately', () => {
  const all = filterProjects(defaultSiteConfig.portfolio.projects, {
    category: 'All Entries',
    searchQuery: '',
    allCategoriesLabel: 'All Entries',
  });
  assert.equal(all.length, 4);

  const reflectionsOnly = filterProjects(defaultSiteConfig.portfolio.projects, {
    category: 'Reflections',
    searchQuery: '',
    allCategoriesLabel: 'All Entries',
  });
  assert.equal(reflectionsOnly.length, 1);
  assert.equal(reflectionsOnly[0].id, 'journal-quiet-digital-home');

  const curiositySearch = filterProjects(defaultSiteConfig.portfolio.projects, {
    category: 'All Entries',
    searchQuery: 'Curiosity',
    allCategoriesLabel: 'All Entries',
  });
  assert.equal(curiositySearch.length, 1);
  assert.equal(curiositySearch[0].id, 'journal-lifelong-curiosity');
});

test('getActiveSections respects preferences and hides disabled sections', () => {
  const defaultSections = getActiveSections(defaultSiteConfig);
  assert.deepEqual(
    defaultSections.filter((s) => s.enabled).map((s) => s.id),
    ['work', 'about', 'experience', 'contact']
  );

  const noExperienceConfig = {
    ...defaultSiteConfig,
    preferences: {
      ...defaultSiteConfig.preferences,
      showExperience: false,
    },
  };
  const updatedSections = getActiveSections(noExperienceConfig);
  const expSection = updatedSections.find((s) => s.id === 'experience');
  assert.equal(expSection?.enabled, false);
});

test('getMotionStorageKey produces deterministic brand-scoped storage key', () => {
  assert.equal(getMotionStorageKey('MD ARAFAT HOSSN'), 'md_arafat_hossn_motion_pref_v1');
  assert.equal(getMotionStorageKey('Arafat Personal'), 'arafat_personal_motion_pref_v1');
});

test('validateContactForm rejects empty or invalid inputs and accepts valid personal note', () => {
  const invalidResult = validateContactForm({
    name: 'A',
    email: 'invalid-email',
    projectType: 'Personal Hello',
    message: 'Short',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.message);

  const validResult = validateContactForm({
    name: 'Tanvir Ahmed',
    email: 'tanvir@example.com',
    projectType: 'Personal Hello & Greeting (শুভেচ্ছা বার্তা)',
    message: 'Assalamu Alaikum Arafat bhai, really enjoyed reading your personal essays!',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoUrl and buildWhatsAppUrl format safe URLs', () => {
  const mailto = buildMailtoUrl('hello@mdarafathossn.com', {
    name: 'Nusrat',
    email: 'nusrat@example.com',
    projectType: 'Personal Hello',
    message: 'Wonderful personal website and thoughts on simplicity.',
  });
  assert.ok(mailto.startsWith('mailto:hello%40mdarafathossn.com?subject='));
  assert.ok(mailto.includes('Nusrat'));

  assert.equal(buildWhatsAppUrl('', 'Hello'), null);
  assert.equal(
    buildWhatsAppUrl('+880 1712 345678', 'Hello Arafat'),
    'https://wa.me/8801712345678?text=Hello%20Arafat'
  );
});

test('Swarmline engine creates and steps agents within viewport bounds', () => {
  const agents = createSwarmAgents(16, 1440, 900);
  assert.equal(agents.length, 16);
  assert.equal(agents[0].trail.length, 1);

  const stepped = stepSwarmAgents(
    agents,
    { width: 1440, height: 900 },
    { x: 720, y: 450, active: true },
    10
  );
  assert.equal(stepped.length, 16);
  assert.equal(stepped[0].trail.length, 2);
  for (const agent of stepped) {
    assert.ok(agent.x >= 24 && agent.x <= 1440 - 24);
    assert.ok(agent.y >= 24 && agent.y <= 900 - 24);
  }
});
