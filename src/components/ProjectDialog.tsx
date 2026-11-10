import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../config/site';

interface ProjectDialogProps {
  project: ProjectItem | null;
  onClose: () => void;
  accentColor: string;
}

/**
 * Extracts a safe YouTube privacy-enhanced embed URL if a valid YouTube link is supplied.
 */
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (!match || !match[1]) return null;
  return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({
  project,
  onClose,
  accentColor,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const youtubeEmbed = getYouTubeEmbedUrl(project.videoUrl);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-[#f2efeb]/15 shadow-2xl text-[#f2efeb]">
        {/* Top Sticky Modal Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-[#111111]/95 backdrop-blur-md border-b border-[#f2efeb]/10">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#a09c9a] truncate">
            <span className="text-[#e32b3c] font-semibold">
              {project.category}
            </span>
            {project.year && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study dialog"
            className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg bg-[#1a1a1a] hover:bg-[#e32b3c] text-[#f2efeb] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Showcase: Video Embed (if configured) or Cover Image */}
        {youtubeEmbed ? (
          <div className="aspect-video w-full bg-black border-b border-[#f2efeb]/10">
            <iframe
              src={youtubeEmbed}
              title={`${project.title} Video Preview`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          project.coverImage && (
            <div className="aspect-[16/9] w-full bg-[#181818] border-b border-[#f2efeb]/10 overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )
        )}

        {/* Detailed Case Study Content */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h2
              id="project-dialog-title"
              className="font-display text-3xl sm:text-4xl text-[#f2efeb] tracking-wide uppercase"
            >
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#a09c9a]">
              Author: <span className="text-[#f2efeb] font-medium">{project.role}</span>
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono-tabular text-[#a09c9a] uppercase tracking-wider">
              Personal Essay &amp; Reflection
            </h3>
            <p className="text-sm sm:text-base text-[#f2efeb]/90 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Takeaways & Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#f2efeb]/10">
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono-tabular text-[#a09c9a] uppercase tracking-wider">
                  Key Thoughts &amp; Takeaways
                </h3>
                <ul className="space-y-2 text-sm text-[#f2efeb]/90">
                  {project.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#e32b3c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.outcomes && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono-tabular text-[#a09c9a] uppercase tracking-wider">
                  Note Context
                </h3>
                <p className="text-sm text-[#a09c9a] leading-relaxed">
                  {project.outcomes}
                </p>
              </div>
            )}
          </div>

          {/* Unboxed Topics & Tags */}
          {project.tools && project.tools.length > 0 && (
            <div className="pt-4 border-t border-[#f2efeb]/10 space-y-2">
              <h3 className="text-xs font-mono-tabular text-[#a09c9a] uppercase tracking-wider">
                Topics &amp; Themes
              </h3>
              <p className="text-sm font-mono-tabular text-[#f2efeb]">
                {project.tools.join(' · ')}
              </p>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-6 border-t border-[#f2efeb]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-lg text-xs font-semibold text-[#f2efeb] bg-[#e32b3c] hover:bg-[#c82333] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                  style={{ backgroundColor: accentColor }}
                >
                  <span>Visit Live Reference</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-lg text-xs font-semibold text-[#f2efeb] bg-[#1a1a1a] border border-[#f2efeb]/15 hover:border-[#f2efeb]/40 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Source Repository</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2.5 rounded-lg text-xs font-medium text-[#a09c9a] hover:text-[#f2efeb] border border-[#f2efeb]/15 transition-colors cursor-pointer"
            >
              Close Dialog (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
