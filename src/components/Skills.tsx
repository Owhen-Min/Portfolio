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
    <section
      id="skills"
      className="flex h-full w-full flex-col items-start justify-center gap-y-2 bg-pink-100 p-5 text-start md:p-10 lg:p-20"
    >
      <div className="flex justify-center gap-1">
        <h2 className="mb-2 gap-5 text-start text-2xl underline underline-offset-8 sm:mb-5 sm:text-4xl">
          Skills
        </h2>
        <Tooltip>
          <TooltipTrigger>
            <QuestionMarkCircledIcon className="mb-2 h-[15px] w-[15px] sm:h-5 sm:w-5" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[40vw] break-keep">
            <p className="text-base">호버 시 설명이 나타납니다.</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {Object.entries(groupedTechs).map(([category, techList]) => (
        <div key={category}>
          <h3 className="mb-4 text-xl font-semibold">{category}</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {techList.map((tech: TechStack) => (
              <Tooltip key={tech.name}>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer rounded-lg bg-white p-4 shadow transition hover:shadow-lg">
                    <p className="font-medium">{tech.name}</p>
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
                  <ul className="max-w-[250px] list-disc pl-4 text-sm leading-10 break-keep">
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
    </section>
  );
}
