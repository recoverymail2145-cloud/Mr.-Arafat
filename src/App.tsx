/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  defaultSiteConfig,
  SiteConfig,
  ProjectItem,
} from './config/site';
import {
  getMotionStorageKey,
  getActiveSections,
} from './utils/portfolioLogic';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectDialog } from './components/ProjectDialog';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { ConditionalSections } from './components/ConditionalSections';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SwarmlineCanvas } from './components/SwarmlineCanvas';
import { ConfigStudioDrawer } from './components/ConfigStudioDrawer';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [activeSection, setActiveSection] = useState<string>('work');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Motion & Swarmline standalone state
  const [motionEnabled, setMotionEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const key = getMotionStorageKey(defaultSiteConfig.identity.displayName);
    const saved = window.localStorage.getItem(key);
    if (saved === 'false') return false;
    if (saved === 'true') return true;
    return !prefersReduced;
  });

  const [swarmlineOverlayActive, setSwarmlineOverlayActive] =
    useState<boolean>(false);
  const [swarmBurstKey, setSwarmBurstKey] = useState<number>(0);

  // Project Detail Dialog state + focus restoration ref
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const lastDialogTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Config Studio Drawer state
  const [configStudioOpen, setConfigStudioOpen] = useState<boolean>(false);

  // Sync CSS custom properties, document title, canonical URL, and JSON-LD schema
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', config.appearance.background);
    root.style.setProperty('--text-color', config.appearance.text);
    root.style.setProperty('--accent-color', config.appearance.accent);
    root.style.setProperty('--muted-color', config.appearance.muted);

    const titleText = `${
      config.identity.displayName || config.identity.fullName
    } | ${config.identity.profession}`;
    document.title = titleText;

    const canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonicalLink && config.websiteUrl) {
      canonicalLink.href = config.websiteUrl;
    }
  }, [config]);

  // Persist motion preference under brand-specific storage key
  useEffect(() => {
    const key = getMotionStorageKey(config.identity.displayName);
    try {
      window.localStorage.setItem(key, String(motionEnabled));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [motionEnabled, config.identity.displayName]);

  // Track scroll progress and active navigation section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(ratio);

      const sectionIds = ['work', 'about', 'experience', 'contact'];
      let current = 'work';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Clicking the "Motion" button at the top triggers the standalone Swarmline animation
   * and pulses the vector swarm across the viewport.
   */
  const handleTriggerMotionButton = () => {
    if (!motionEnabled) {
      setMotionEnabled(true);
      setSwarmlineOverlayActive(true);
      setSwarmBurstKey((prev) => prev + 1);
    } else if (!swarmlineOverlayActive) {
      setSwarmlineOverlayActive(true);
      setSwarmBurstKey((prev) => prev + 1);
    } else {
      // Toggle off if already active overlay
      setSwarmlineOverlayActive(false);
    }
  };

  const handleToggleMotionPreference = () => {
    setMotionEnabled((prev) => {
      const next = !prev;
      if (!next) {
        setSwarmlineOverlayActive(false);
      }
      return next;
    });
  };

  const handleOpenProject = (
    project: ProjectItem,
    triggerEl: HTMLButtonElement | null
  ) => {
    lastDialogTriggerRef.current = triggerEl;
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    setTimeout(() => {
      lastDialogTriggerRef.current?.focus();
    }, 10);
  };

  const activeSections = getActiveSections(config);
  const showAbout = activeSections.find((s) => s.id === 'about')?.enabled;
  const showContact = activeSections.find((s) => s.id === 'contact')?.enabled;

  // JSON-LD Structured Data from verified config values
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.identity.fullName,
    alternateName: config.identity.displayName,
    jobTitle: config.identity.profession,
    url: config.websiteUrl,
    address: config.identity.location
      ? {
          '@type': 'PostalAddress',
          addressLocality: config.identity.location,
        }
      : undefined,
    knowsAbout: config.portfolio.skills,
  };

  return (
    <div
      className="min-h-screen editorial-surface text-[#f2efeb] selection:bg-[#e32b3c] selection:text-[#f2efeb]"
      style={{
        backgroundColor: config.appearance.background,
        color: config.appearance.text,
      }}
    >
      {/* Schema.org Person Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />

      {/* Standalone Swarmline Overlay Feature (Triggered by top "Motion" button) */}
      <SwarmlineCanvas
        active={motionEnabled && swarmlineOverlayActive}
        burstKey={swarmBurstKey}
        accentColor={config.appearance.accent}
        textColor={config.appearance.text}
        mutedColor={config.appearance.muted}
        mode="overlay"
        intensity={config.appearance.animationIntensity}
      />

      {/* Sticky 3-Zone Header with "Motion" Swarmline button */}
      <Header
        config={config}
        activeSection={activeSection}
        motionEnabled={motionEnabled && swarmlineOverlayActive}
        onTriggerMotion={handleTriggerMotionButton}
        onToggleMotionPreference={handleToggleMotionPreference}
        scrollProgress={scrollProgress}
      />

      {/* Main Landmark */}
      <main id="main-content">
        <Hero
          config={config}
          motionEnabled={motionEnabled}
          swarmBurstKey={swarmBurstKey}
          onTriggerSwarmBurst={() => {
            setMotionEnabled(true);
            setSwarmlineOverlayActive(true);
            setSwarmBurstKey((prev) => prev + 1);
          }}
          onToggleMotionPreference={handleToggleMotionPreference}
          onOpenConfigStudio={() => setConfigStudioOpen(true)}
          onSwitchLanguage={(lang) =>
            setConfig((prev) => ({
              ...prev,
              appearance: {
                ...prev.appearance,
                language: lang,
              },
            }))
          }
        />

        <ProjectGrid
          config={config}
          motionEnabled={motionEnabled}
          onSelectProject={handleOpenProject}
          onOpenConfigStudio={() => setConfigStudioOpen(true)}
        />

        {showAbout && <About config={config} motionEnabled={motionEnabled} />}

        <Experience config={config} />

        <ConditionalSections config={config} />

        {showContact && <Contact config={config} />}
      </main>

      <Footer
        config={config}
        onOpenConfigStudio={() => setConfigStudioOpen(true)}
      />

      {/* Accessible Project Detail Modal Dialog */}
      <ProjectDialog
        project={selectedProject}
        onClose={handleCloseProject}
        accentColor={config.appearance.accent}
      />

      {/* Interactive Universal Config Studio Drawer */}
      <ConfigStudioDrawer
        open={configStudioOpen}
        config={config}
        onClose={() => setConfigStudioOpen(false)}
        onUpdateConfig={setConfig}
        onResetConfig={() => setConfig(defaultSiteConfig)}
      />
    </div>
  );
}
