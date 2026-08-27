import { useCallback, useState } from "react";

import { projects as projectData } from "@/data/projects.json";
import type { Project } from "../types/project";

import ProjectCard from "./projects/ProjectCard";
import ProjectModal from "./projects/ProjectModal";

const projects = projectData as Project[];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section
      id="projects"
      className="flex h-full w-full flex-col overflow-hidden bg-slate-100 text-start"
    >
      <div className="shrink-0 px-5 pt-7 pb-4 md:px-10 md:pt-10 lg:px-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">Selected work</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-4xl">Projects</h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          카드를 선택하면 프로젝트의 상세 내용과 주요 화면을 확인할 수 있습니다.
        </p>
      </div>

      <div className="swiper-no-mousewheel swiper-no-swiping min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 md:px-10 md:pb-10 lg:px-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 py-2 md:grid-cols-2 md:gap-7">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </section>
  );
}
