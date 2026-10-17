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
    <section id="projects" className="snap-section section-layout surface-muted">
      <div className="portfolio-container section-stack">
        <div className="section-group relative">
          <p className="absolute -top-5 text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
            Selected work
          </p>
          <h2 className="section-title">Projects</h2>
          <p className="section-body">
            카드를 선택하면 프로젝트의 상세 내용과 주요 화면을 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </section>
  );
}
