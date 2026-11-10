import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, FolderOpen, X } from 'lucide-react';
import { ProjectItem, SiteConfig, TRANSLATIONS } from '../config/site';
import { deriveCategories, filterProjects } from '../utils/portfolioLogic';

interface ProjectGridProps {
  config: SiteConfig;
  motionEnabled: boolean;
  onSelectProject: (
    project: ProjectItem,
    triggerElement: HTMLButtonElement | null
  ) => void;
  onOpenConfigStudio: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  config,
  onSelectProject,
  onOpenConfigStudio,
}) => {
  const t = TRANSLATIONS[config.appearance.language] || TRANSLATIONS.English;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = useMemo(
    () =>
      deriveCategories(
        config.portfolio.projects,
        config.portfolio.categories
      ),
    [config.portfolio.projects, config.portfolio.categories]
  );

  const filteredProjects = useMemo(
    () =>
      filterProjects(config.portfolio.projects, {
        category: selectedCategory,
        searchQuery,
        allCategoriesLabel: t.allCategories,
      }),
    [config.portfolio.projects, selectedCategory, searchQuery, t.allCategories]
  );

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore =
    config.preferences.showProjectArchive &&
    filteredProjects.length > visibleCount;

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-16 md:py-24 border-b border-[#f2efeb]/10"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 space-y-10">
        {/* Section Header + Search & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#f2efeb]/10">
          <div className="space-y-2">
            <p className="text-xs font-mono-tabular text-[#f59e0b]">
              01. Personal Photography &amp; Technical Captures
            </p>
            <h2
              id="work-heading"
              className="font-display text-3xl sm:text-5xl text-[#f2efeb] tracking-wide uppercase"
              style={{ fontFamily: "'Hind Siliguri', var(--font-display)" }}
            >
              {t.selectedWorkTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#a09c9a] max-w-xl">
              {t.selectedWorkSubtitle}
            </p>
          </div>

          {/* Search Input */}
          {config.portfolio.projects.length > 0 && (
            <div className="w-full lg:w-80">
              <label htmlFor="project-search-input" className="sr-only">
                Search projects
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#a09c9a] absolute left-3.5 pointer-events-none" />
                <input
                  id="project-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full min-h-[44px] pl-10 pr-9 py-2.5 rounded-lg bg-[#121212] border border-[#f2efeb]/15 text-sm text-[#f2efeb] placeholder:text-[#a09c9a]/60 focus:border-[#e32b3c] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear project search"
                    className="absolute right-2.5 p-1 text-[#a09c9a] hover:text-[#f2efeb]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Category Filter Bar */}
        {categories.length > 0 && (
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'ALL'}
              onClick={() => setSelectedCategory('ALL')}
              className={`relative min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-[#1a1a1a] text-[#f2efeb]'
                  : 'bg-transparent text-[#a09c9a] hover:text-[#f2efeb]'
              }`}
            >
              <span>
                {t.allCategories} ({config.portfolio.projects.length})
              </span>
              {selectedCategory === 'ALL' && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#e32b3c]"
                  style={{ backgroundColor: config.appearance.accent }}
                />
              )}
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1a1a] text-[#f2efeb]'
                      : 'bg-transparent text-[#a09c9a] hover:text-[#f2efeb]'
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#e32b3c]"
                      style={{ backgroundColor: config.appearance.accent }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State when config.portfolio.projects is empty OR search has 0 matches */}
        {displayedProjects.length === 0 ? (
          <div
            data-testid="projects-empty-state"
            className="rounded-2xl bg-[#121212] border border-[#f2efeb]/10 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#f2efeb]/10 flex items-center justify-center mx-auto text-[#e32b3c]">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl text-[#f2efeb] tracking-wide uppercase">
              {config.portfolio.projects.length === 0
                ? 'No Verified Projects Configured Yet'
                : 'No Matching Projects Found'}
            </h3>
            <p className="text-sm text-[#a09c9a] leading-relaxed">
              {config.portfolio.projects.length === 0
                ? 'This portfolio omits fabricated work samples when portfolio.projects is empty. Add your real case studies in src/data/projects.ts or via the Configure site.ts studio.'
                : `No projects matched "${searchQuery}" in ${
                    selectedCategory === 'ALL' ? t.allCategories : selectedCategory
                  }. Reset filters to inspect all verified work.`}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {config.portfolio.projects.length === 0 ? (
                <button
                  type="button"
                  onClick={onOpenConfigStudio}
                  className="min-h-[44px] px-5 py-2.5 rounded-lg text-xs font-semibold text-[#f2efeb] bg-[#e32b3c] hover:bg-[#c82333] transition-colors cursor-pointer"
                >
                  Open Configure site.ts
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSearchQuery('');
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-lg text-xs font-semibold text-[#f2efeb] bg-[#1a1a1a] border border-[#f2efeb]/15 hover:border-[#f2efeb]/40 transition-colors cursor-pointer"
                >
                  Reset Search &amp; Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Editorial 2-Column Bento Showcase Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedProjects.map((project, index) => {
              const showFallback =
                !project.coverImage || failedImages[project.id];
              return (
                <article
                  key={project.id}
                  className="group rounded-2xl bg-[#121212] border border-[#f2efeb]/10 hover:border-[#f2efeb]/25 overflow-hidden flex flex-col justify-between transition-colors"
                >
                  {/* Visual Cover Frame with Resilient Zero-Broken-Image Fallback */}
                  <div className="relative aspect-[16/10] w-full bg-[#181818] overflow-hidden border-b border-[#f2efeb]/10">
                    {!showFallback ? (
                      <img
                        src={project.coverImage}
                        alt={`${project.title} — ${project.category}`}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(project.id)}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#161616] via-[#101010] to-[#1e1113]">
                        <span className="text-xs font-mono-tabular text-[#a09c9a]">
                          {project.category} · {project.year || 'Case Study'}
                        </span>
                        <p className="font-display text-2xl text-[#f2efeb] tracking-wide uppercase">
                          {project.title}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Body: Unboxed Metadata (Zero-Pill Discipline) + Title + Summary + Action */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      {/* Unboxed Metadata Line */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#a09c9a] font-mono-tabular">
                        <span className="text-[#e32b3c] font-medium">
                          {project.category}
                        </span>
                        {project.year && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{project.year}</span>
                          </>
                        )}
                        {project.role && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-body">{project.role}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl text-[#f2efeb] tracking-wide uppercase">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#a09c9a] leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f2efeb]/10 flex items-center justify-between gap-4">
                      {/* Unboxed Tech Stack Preview */}
                      <div className="text-xs text-[#a09c9a] truncate max-w-[60%]">
                        {project.tools.slice(0, 4).join(' · ')}
                      </div>

                      <button
                        type="button"
                        onClick={(e) =>
                          onSelectProject(project, e.currentTarget)
                        }
                        aria-label={`${t.viewCaseStudy}: ${project.title}`}
                        className="min-h-[40px] px-4 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#e32b3c] text-xs font-semibold text-[#f2efeb] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{t.viewCaseStudy}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Load More Archive Control */}
        {hasMore && (
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="min-h-[44px] px-6 py-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] border border-[#f2efeb]/15 text-xs font-semibold text-[#f2efeb] transition-colors cursor-pointer"
            >
              {t.loadMore} ({filteredProjects.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
