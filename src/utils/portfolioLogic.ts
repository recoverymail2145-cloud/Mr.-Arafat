import { ProjectItem, SiteConfig } from '../config/site';

/**
 * Derives unique project categories from the project list when config.portfolio.categories is empty.
 */
export function deriveCategories(
  projects: ProjectItem[],
  configuredCategories: string[] = []
): string[] {
  if (configuredCategories.length > 0) {
    return configuredCategories;
  }
  const seen = new Set<string>();
  for (const project of projects) {
    const trimmed = project.category?.trim();
    if (trimmed) {
      seen.add(trimmed);
    }
  }
  return Array.from(seen);
}

/**
 * Filters and searches projects, placing featured projects first.
 */
export function filterProjects(
  projects: ProjectItem[],
  options: {
    category: string;
    searchQuery: string;
    allCategoriesLabel?: string;
  }
): ProjectItem[] {
  const { category, searchQuery, allCategoriesLabel = 'All Work' } = options;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects
    .filter((project) => {
      const matchesCategory =
        !category ||
        category === 'ALL' ||
        category === allCategoriesLabel ||
        project.category.toLowerCase() === category.toLowerCase();

      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        project.title,
        project.category,
        project.year,
        project.summary,
        project.description,
        project.role,
        ...(project.tools || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
}

/**
 * Computes which navigation sections should be shown based on preferences and non-empty data.
 * Hides links for omitted sections per Section 4.A.
 */
export function getActiveSections(config: SiteConfig): {
  id: 'work' | 'about' | 'experience' | 'contact';
  enabled: boolean;
}[] {
  const hasAboutContent = Boolean(
    config.identity.about?.trim() ||
      config.portfolio.skills.length > 0 ||
      config.portfolio.tools.length > 0 ||
      config.portfolio.processSteps.length > 0 ||
      (config.preferences.showEducation && config.portfolio.education.length > 0)
  );

  const hasExperienceContent = Boolean(
    config.preferences.showExperience && config.portfolio.experience.length > 0
  );

  const hasContactContent = Boolean(
    config.contact.email?.trim() ||
      config.contact.whatsapp?.trim() ||
      config.preferences.showContactForm ||
      config.contact.otherLinks.length > 0
  );

  return [
    { id: 'work', enabled: true },
    { id: 'about', enabled: hasAboutContent },
    { id: 'experience', enabled: hasExperienceContent },
    { id: 'contact', enabled: hasContactContent },
  ];
}

/**
 * Generates a brand-specific localStorage key for motion preference.
 */
export function getMotionStorageKey(displayName: string): string {
  const slug = (displayName || 'portfolio')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
  return `${slug || 'portfolio'}_motion_pref_v1`;
}

export interface ContactFormInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

/**
 * Strictly validates contact form inputs without substituting fallback values.
 */
export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Please include a brief project summary (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds a properly encoded mailto URI for static site contact submission.
 */
export function buildMailtoUrl(recipientEmail: string, input: ContactFormInput): string {
  const cleanRecipient = recipientEmail.trim();
  const subject = `[Portfolio Inquiry] ${input.projectType || 'Project Collaboration'} — from ${input.name.trim()}`;
  const bodyLines = [
    `Name: ${input.name.trim()}`,
    `Reply-To Email: ${input.email.trim()}`,
    `Project Scope: ${input.projectType || 'General Inquiry'}`,
    '',
    'Project Brief:',
    input.message.trim(),
  ];
  return `mailto:${encodeURIComponent(cleanRecipient)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}

/**
 * Builds a verified WhatsApp draft link only when international digits are configured.
 */
export function buildWhatsAppUrl(whatsappNumber: string, text: string): string | null {
  const digits = (whatsappNumber || '').replace(/[^0-9]/g, '');
  if (digits.length < 7) {
    return null;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(text.trim())}`;
}

/**
 * SWARMLINE ENGINE (Pure Boids + Harmonic Flow Field Math)
 * Powers the standalone "Motion" button Swarmline animation feature.
 */
export interface SwarmAgent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  hueType: 'accent' | 'ivory' | 'muted';
  trail: { x: number; y: number }[];
  maxTrail: number;
  phase: number;
}

export function createSwarmAgents(
  count: number,
  width: number,
  height: number
): SwarmAgent[] {
  const safeWidth = Math.max(width, 320);
  const safeHeight = Math.max(height, 320);
  const agents: SwarmAgent[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / Math.max(count, 1)) * Math.PI * 2;
    const hueType: SwarmAgent['hueType'] =
      i % 3 === 0 ? 'accent' : i % 3 === 1 ? 'ivory' : 'muted';
    const x = safeWidth * 0.5 + Math.cos(angle) * (safeWidth * 0.18);
    const y = safeHeight * 0.45 + Math.sin(angle) * (safeHeight * 0.18);

    agents.push({
      x,
      y,
      vx: Math.cos(angle) * 2.2,
      vy: Math.sin(angle) * 2.2,
      speed: 2.0 + (i % 5) * 0.35,
      hueType,
      trail: [{ x, y }],
      maxTrail: 18 + (i % 10),
      phase: i * 0.45,
    });
  }

  return agents;
}

export function stepSwarmAgents(
  agents: SwarmAgent[],
  bounds: { width: number; height: number },
  target: { x: number; y: number; active: boolean },
  timeTick: number
): SwarmAgent[] {
  const width = Math.max(bounds.width, 320);
  const height = Math.max(bounds.height, 320);

  return agents.map((agent, idx) => {
    // Harmonic curl-like flow field angle
    const nx = agent.x / width;
    const ny = agent.y / height;
    const flowAngle =
      Math.sin(nx * Math.PI * 2.5 + timeTick * 0.015 + agent.phase) * Math.PI +
      Math.cos(ny * Math.PI * 2.0 - timeTick * 0.012) * Math.PI * 0.8;

    let ax = Math.cos(flowAngle) * 0.28;
    let ay = Math.sin(flowAngle) * 0.28;

    // Cohesive attraction toward interactive pointer or harmonic figure-8 attractor
    const attractorX = target.active
      ? target.x
      : width * 0.5 + Math.sin(timeTick * 0.018 + (idx % 3) * 0.6) * (width * 0.28);
    const attractorY = target.active
      ? target.y
      : height * 0.46 + Math.sin(timeTick * 0.036 + (idx % 2) * 0.5) * (height * 0.2);

    const dx = attractorX - agent.x;
    const dy = attractorY - agent.y;
    const dist = Math.hypot(dx, dy) || 1;

    // Gentle orbital swirl around attractor
    const pullStrength = target.active ? 0.36 : 0.22;
    ax += (dx / dist) * pullStrength - (dy / dist) * 0.14;
    ay += (dy / dist) * pullStrength + (dx / dist) * 0.14;

    let vx = (agent.vx + ax) * 0.96;
    let vy = (agent.vy + ay) * 0.96;

    const currentSpeed = Math.hypot(vx, vy) || 1;
    const maxSpeed = agent.speed * (target.active ? 1.35 : 1.0);
    if (currentSpeed > maxSpeed) {
      vx = (vx / currentSpeed) * maxSpeed;
      vy = (vy / currentSpeed) * maxSpeed;
    }

    let nextX = agent.x + vx;
    let nextY = agent.y + vy;

    // Soft boundary reflection
    const margin = 24;
    if (nextX < margin) {
      nextX = margin;
      vx = Math.abs(vx);
    } else if (nextX > width - margin) {
      nextX = width - margin;
      vx = -Math.abs(vx);
    }

    if (nextY < margin) {
      nextY = margin;
      vy = Math.abs(vy);
    } else if (nextY > height - margin) {
      nextY = height - margin;
      vy = -Math.abs(vy);
    }

    const nextTrail = [...agent.trail, { x: nextX, y: nextY }];
    if (nextTrail.length > agent.maxTrail) {
      nextTrail.shift();
    }

    return {
      ...agent,
      x: nextX,
      y: nextY,
      vx,
      vy,
      trail: nextTrail,
    };
  });
}
