import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Github, X } from "lucide-react";

import type { Project } from "../../types/project";

import TechBadge from "./TechBadge";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], summary, button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-[5vw] backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative flex h-[90dvh] w-[90vw] flex-col overflow-hidden rounded-2xl bg-white text-left shadow-2xl"
      >
        <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-7 sm:py-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
            <h2 id={titleId} className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
              {project.name}
            </h2>
            {project.details.links.github && (
              <ProjectLink href={project.details.links.github} label="GitHub"><Github aria-hidden="true" className="size-4" /></ProjectLink>
            )}
            {project.details.links.demo && (
              <ProjectLink href={project.details.links.demo} label="배포 사이트"><ExternalLink aria-hidden="true" className="size-4" /></ProjectLink>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="ml-4 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            aria-label={`${project.name} 상세 모달 닫기`}
            onClick={onClose}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="project-modal-scroll flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-6 lg:px-12">
            <section aria-label="프로젝트 요약" className="space-y-2">
              <p id={descriptionId} className="text-base leading-relaxed text-slate-700">{project.summary}</p>
              <p className="font-semibold text-slate-900">{project.details.role}</p>
              <p className="text-sm text-slate-600">
                {project.teamSize}인 · {project.duration} · {project.details.platform}
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.details.techStack.map((tech) => <TechBadge key={tech.name} tech={tech} compact />)}
              </div>

            </section>

            {project.details.screenshots.length > 0 && (
              <section aria-label="주요 개발 내용" className="mt-6">
                {project.details.screenshots.map((screen) => (
                  <article key={screen.title} className="mt-4 grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-[2fr_3fr] md:gap-8">
                    <div>
                      <h3 className="text-lg font-bold leading-snug break-keep text-slate-900 sm:text-xl">{screen.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{screen.description}</p>
                    </div>
                    {screen.image && <img src={screen.image} alt={screen.alt} loading="lazy" className="max-h-[65dvh] w-full rounded-lg bg-slate-50 object-contain" />}
                  </article>
                ))}
              </section>
            )}
            <details className="mt-8 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-700">
              <summary className="cursor-pointer font-semibold">프로젝트 개요 및 주요 기능</summary>
              <p className="mt-3">{project.details.description}</p>
              <ul className="mt-2 list-disc pl-5">
                {project.details.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ProjectLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-slate-600 transition hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {children}
      {label}
    </a>
  );
}
