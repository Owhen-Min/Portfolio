import { ArrowUpRight, CalendarDays, Users } from "lucide-react";

import type { Project } from "../../types/project";

import ProjectImage from "./ProjectImage";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        className="block h-full w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
        aria-haspopup="dialog"
        onClick={() => onSelect(project)}
      >
        <div className="aspect-[16/8] overflow-hidden border-b border-slate-100">
          <ProjectImage
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            className="transition duration-500 group-hover:scale-[1.03]"
            label="프로젝트 대표 이미지"
          />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{project.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {project.summary}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-slate-400 transition group-hover:text-blue-600"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.featuredTechStack.map((tech) => (
              <TechBadge key={`${project.id}-${tech.name}`} tech={tech} compact />
            ))}
          </div>

          <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Users aria-hidden="true" className="size-4 text-slate-400" />
              <dt className="sr-only">참여 인원</dt>
              <dd>{project.teamSize}인 프로젝트</dd>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4 text-slate-400" />
              <dt className="sr-only">진행 기간</dt>
              <dd>{project.duration}</dd>
            </div>
          </dl>
        </div>
      </button>
    </article>
  );
}
