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

test('deriveCategories extracts unique photography and capture categories when configuredCategories is empty', () => {
  const categories = deriveCategories(defaultSiteConfig.portfolio.projects, []);
  assert.ok(categories.includes('পোর্ট্রেট ও লাইফস্টাইল'));
  assert.ok(categories.includes('নিজের ফটোগ্রাফি'));
  assert.ok(categories.includes('টেকনিক্যাল ক্যাপচার'));
  assert.ok(categories.includes('প্রিয় মুহূর্ত'));
  assert.equal(categories.length, 4);
});

test('filterProjects filters personal captures by category and search query accurately', () => {
  const all = filterProjects(defaultSiteConfig.portfolio.projects, {
    category: 'সব ক্যাপচার',
    searchQuery: '',
    allCategoriesLabel: 'সব ক্যাপচার',
  });
  assert.equal(all.length, 4);

  const portraitOnly = filterProjects(defaultSiteConfig.portfolio.projects, {
    category: 'পোর্ট্রেট ও লাইফস্টাইল',
    searchQuery: '',
    allCategoriesLabel: 'সব ক্যাপচার',
  });
  assert.equal(portraitOnly.length, 1);
  assert.equal(portraitOnly[0].id, 'capture-personal-portrait');

  const bokehSearch = filterProjects(defaultSiteConfig.portfolio.projects, {
    category: 'সব ক্যাপচার',
    searchQuery: 'Bokeh',
    allCategoriesLabel: 'সব ক্যাপচার',
  });
  assert.equal(bokehSearch.length, 1);
  assert.equal(bokehSearch[0].id, 'capture-personal-portrait');
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
  assert.equal(getMotionStorageKey('এমডি আরাফাত হোসেন'), 'portfolio_motion_pref_v1');
  assert.equal(getMotionStorageKey('arafathossn'), 'arafathossn_motion_pref_v1');
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
    projectType: 'শুভেচ্ছা ও ব্যক্তিগত বার্তা (Personal Hello)',
    message: 'আসসালামু আলাইকুম আরাফাত ভাই, আপনার ফটোগ্রাফি ও পার্সোনাল সাইট দারুণ হয়েছে!',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoUrl and buildWhatsAppUrl format safe URLs', () => {
  const mailto = buildMailtoUrl('recoverymail2145@gmail.com', {
    name: 'Nusrat',
    email: 'nusrat@example.com',
    projectType: 'Personal Hello',
    message: 'Wonderful personal photography and captures on arafathossn.com.',
  });
  assert.ok(mailto.startsWith('mailto:recoverymail2145%40gmail.com?subject='));
  assert.ok(mailto.includes('Nusrat'));

  assert.equal(buildWhatsAppUrl('', 'Hello'), null);
  assert.equal(
    buildWhatsAppUrl('+880 1700 000000', 'Hello Arafat'),
    'https://wa.me/8801700000000?text=Hello%20Arafat'
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
