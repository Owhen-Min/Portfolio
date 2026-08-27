import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Github, X } from "lucide-react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { Project } from "@/types/project";

import ProjectImage from "./ProjectImage";
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
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

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
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 uppercase">
              Project
            </p>
            <h2 id={titleId} className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
              {project.name}
            </h2>
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
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
            <div className="aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 sm:rounded-2xl">
              <ProjectImage
                src={project.details.heroImage}
                alt={project.details.heroAlt}
                label="프로젝트 상세 대표 이미지"
              />
            </div>

            <section aria-labelledby={`${titleId}-specs`} className="mt-10">
              <h3 id={`${titleId}-specs`} className="text-xl font-bold text-slate-900 sm:text-2xl">
                프로젝트 스펙
              </h3>
              <dl className="mt-5 grid grid-cols-1 overflow-hidden rounded-xl border border-slate-200 sm:grid-cols-2">
                <SpecItem term="진행 기간" description={project.duration} />
                <SpecItem term="참여 인원" description={`${project.teamSize}인`} />
                <SpecItem term="담당 역할" description={project.details.role} />
                <SpecItem term="플랫폼" description={project.details.platform} />
              </dl>

              <div className="mt-6">
                <h4 className="text-sm font-bold tracking-wide text-slate-500 uppercase">
                  상세 기술 스택
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.details.techStack.map((tech) => (
                    <TechBadge key={`${project.id}-detail-${tech.name}`} tech={tech} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-bold tracking-wide text-slate-500 uppercase">
                  주요 기능
                </h4>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                  {project.details.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {(project.details.links.github || project.details.links.demo) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.details.links.github && (
                    <ProjectLink href={project.details.links.github} label="GitHub">
                      <Github aria-hidden="true" className="size-4" />
                    </ProjectLink>
                  )}
                  {project.details.links.demo && (
                    <ProjectLink href={project.details.links.demo} label="배포 사이트">
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </ProjectLink>
                  )}
                </div>
              )}
            </section>

            <section aria-labelledby={`${titleId}-overview`} className="mt-12">
              <h3
                id={`${titleId}-overview`}
                className="text-xl font-bold text-slate-900 sm:text-2xl"
              >
                프로젝트 개요
              </h3>
              <p
                id={descriptionId}
                className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base sm:leading-8"
              >
                {project.details.description}
              </p>
            </section>

            <section aria-labelledby={`${titleId}-screenshots`} className="mt-12 pb-5">
              <h3
                id={`${titleId}-screenshots`}
                className="text-xl font-bold text-slate-900 sm:text-2xl"
              >
                주요 화면
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                화면을 넘겨 각 기능의 구현 내용을 확인할 수 있습니다.
              </p>

              <Swiper
                key={project.id}
                className="project-screenshot-swiper mt-5 rounded-xl border border-slate-200 bg-slate-50 sm:rounded-2xl"
                modules={[A11y, Keyboard, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                spaceBetween={24}
                slidesPerView={1}
                grabCursor
              >
                {project.details.screenshots.map((screenshot, index) => (
                  <SwiperSlide key={`${project.id}-screenshot-${index}`}>
                    <div>
                      <div className="aspect-[16/9] overflow-hidden border-b border-slate-200 bg-white">
                        <ProjectImage
                          src={screenshot.image}
                          alt={screenshot.alt}
                          label={`스크린샷 ${index + 1}`}
                        />
                      </div>
                      <div className="min-h-36 bg-white px-5 pt-5 pb-12 sm:min-h-40 sm:px-8 sm:pt-7">
                        <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
                          Screen {String(index + 1).padStart(2, "0")}
                        </p>
                        <h4 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                          {screenshot.title}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                          {screenshot.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function SpecItem({ term, description }: { term: string; description: string }) {
  return (
    <div className="border-b border-slate-200 p-4 last:border-b-0 sm:border-r sm:p-5 sm:nth-[3]:border-b-0 sm:nth-[4]:border-r-0 sm:nth-[4]:border-b-0">
      <dt className="text-xs font-bold tracking-wide text-slate-500 uppercase">{term}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">{description}</dd>
    </div>
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
      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {children}
      {label}
    </a>
  );
}
