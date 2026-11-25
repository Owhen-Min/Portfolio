import { useRef, useState } from "react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Root as TooltipRoot } from "@radix-ui/react-tooltip";

import { techs } from "@/data/techStack.json";

interface TechStack {
  classification: string;
  name: string;
  level: number;
  summary: string;
  description: string[];
}

type GroupedTechs = Record<string, TechStack[]>;

export default function Skills() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const skillEntries: TechStack[] = techs;
  const groupedTechs = skillEntries.reduce<GroupedTechs>(
    (acc, cur) => {
      (acc[cur.classification] ??= []).push(cur);
      return acc;
    },
    { Frontend: [], Language: [], "AI & Tools": [], Database:[] }
  );
  const categories = Object.entries(groupedTechs);

  const selectCategory = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slide = carousel.children[index] as HTMLElement;
    const firstSlide = carousel.children[0] as HTMLElement;
    setOpenSkill(null);
    carousel.scrollTo({
      left: slide.offsetLeft - firstSlide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <section id="skills" className="snap-section section-layout surface-paper">
      <div className="portfolio-container section-stack">
        <h2 className="section-title">Skills</h2>

        <div className="section-group">
          <nav
            aria-label="기술 카테고리"
            className="flex gap-1 rounded-lg bg-slate-100 p-1 md:hidden"
          >
            {categories.map(([category], index) => (
              <button
                key={category}
                type="button"
                aria-current={activeCategory === index ? "true" : undefined}
                aria-controls={`skills-category-${category}`}
                onClick={() => selectCategory(index)}
                className={`min-w-0 flex-1 rounded-md px-1 py-2.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 sm:text-sm ${
                  activeCategory === index
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
          <p className="text-center text-xs text-slate-500 md:hidden">
            좌우로 넘기거나 카테고리를 선택해 보세요.
          </p>
          <div
            ref={carouselRef}
            onScroll={() => {
              const carousel = carouselRef.current;
              if (!carousel || window.matchMedia("(min-width: 768px)").matches) return;
              const firstSlide = carousel.children[0] as HTMLElement;
              let nearestIndex = 0;
              let nearestDistance = Infinity;
              Array.from(carousel.children).forEach((child, index) => {
                const distance = Math.abs(
                  (child as HTMLElement).offsetLeft - firstSlide.offsetLeft - carousel.scrollLeft
                );
                if (distance < nearestDistance) {
                  nearestDistance = distance;
                  nearestIndex = index;
                }
              });
              if (nearestIndex !== activeCategory) {
                setOpenSkill(null);
                setActiveCategory(nearestIndex);
              }
            }}
            className="relative flex w-full snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] md:grid md:grid-cols-[repeat(2,minmax(0,12rem))] md:justify-start md:gap-x-12 md:gap-y-16 md:overflow-visible lg:grid-cols-[repeat(4,minmax(0,12rem))] xl:gap-x-18 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map(([category, techList]) => (
              <div
                key={category}
                id={`skills-category-${category}`}
                className="w-full min-w-0 shrink-0 snap-start snap-always md:w-auto"
              >
                <div className="section-group mx-auto w-full max-w-64 md:mx-0">
                  <h3 className="section-subtitle">{category}</h3>
                  <div className="flex flex-col gap-4">
                    {techList.length === 0 && (
                      <div className="flex min-h-22 items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-400">
                        추가 예정
                      </div>
                    )}
                    {techList.map((tech: TechStack) => (
                      <TooltipProvider key={tech.name}>
                        <TooltipRoot
                          open={openSkill === tech.name}
                          onOpenChange={(open) =>
                            setOpenSkill((current) =>
                              open ? tech.name : current === tech.name ? null : current,
                            )
                          }
                        >
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                setOpenSkill(tech.name);
                              }}
                              className="w-full cursor-pointer rounded-lg bg-white p-4 text-left shadow transition hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-500"
                            >
                              <span className="section-body block font-semibold text-slate-800">{tech.name}</span>
                              <span className="sr-only">숙련도 5점 중 {tech.level}점</span>
                              <span aria-hidden="true" className="mt-2 flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <span
                                    key={index}
                                    className={`h-3 w-3 rounded-full ${
                                      index < tech.level ? "bg-yellow-400" : "bg-gray-300"
                                    }`}
                                  />
                                ))}
                              </span>
                              <span className="mt-2 block text-sm leading-relaxed break-keep text-slate-600">
                                {tech.summary}
                              </span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            align="start"
                            sideOffset={8}
                            collisionPadding={20}
                          >
                            <ul className="max-w-[min(300px,calc(100vw-3rem))] list-disc space-y-2 pl-4 text-sm leading-7 font-normal break-keep md:max-w-[500px]">
                              {tech.description.map((d: string, idx: number) => (
                                <li key={idx}>{d}</li>
                              ))}
                            </ul>
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
