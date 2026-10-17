import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { techs } from "@/data/techStack.json";

interface TechStack {
  classification: string;
  name: string;
  level: number;
  description: string[];
}

type GroupedTechs = Record<string, TechStack[]>;

export default function Skills() {
  const groupedTechs: GroupedTechs = techs.reduce((acc: any, cur: TechStack) => {
    if (!acc[cur.classification]) {
      acc[cur.classification] = [];
    }
    acc[cur.classification].push(cur);
    return acc;
  }, {} as GroupedTechs);

  return (
    <section id="skills" className="snap-section section-layout surface-paper">
      <div className="portfolio-container section-stack">
        <div className="flex items-center gap-2">
          <h2 className="section-title">Skills</h2>
          <Tooltip>
            <TooltipTrigger>
              <QuestionMarkCircledIcon className="h-[15px] w-[15px] sm:h-5 sm:w-5" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[40vw] break-keep">
              <p className="text-base">호버 시 설명이 나타납니다.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {Object.entries(groupedTechs).map(([category, techList]) => (
          <div key={category} className="section-group w-full max-w-2xl">
            <h3 className="section-subtitle">{category}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {techList.map((tech: TechStack) => (
                <Tooltip key={tech.name}>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer rounded-lg bg-white p-4 shadow transition hover:shadow-lg">
                      <p className="section-body text-slate-800">{tech.name}</p>
                      <div className="mt-2 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-3 w-3 rounded-full ${
                              i < tech.level ? "bg-yellow-400" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <ul className="max-w-[min(300px,calc(100vw-3rem))] list-disc space-y-2 pl-4 text-sm leading-7 font-normal break-keep md:max-w-[500px]">
                      {tech.description.map((d: string, idx: number) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
