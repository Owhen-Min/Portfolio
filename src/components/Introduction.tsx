import { ArrowDown, ArrowUpRight } from "lucide-react";
import desk from "@/assets/arrangement-with-empty-notepad-desk.webp";

interface IntroductionProps {
  onNavigate: (id: string) => void;
}

export default function Introduction({ onNavigate }: IntroductionProps) {
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-heading"
      className="snap-section intro-background flex w-full"
      style={{ backgroundImage: `url(${desk})` }}
    >
      <div className="intro-overlay flex w-full items-center py-14 sm:py-20">
        <div className="portfolio-container text-start">
          <div className="max-w-3xl">
            <div className="">
              <p className="flex items-center gap-3 text-sm font-medium tracking-[0.16em] text-slate-600 sm:text-base">
                <span aria-hidden="true" className="h-px w-8 bg-blue-600" /> FRONTEND DEVELOPER
              </p>
            </div>
            <p className="mt-2 ml-10 text-2xl leading-8 font-bold text-slate-800 sm:text-3xl">민경현</p>
            <h2
              id="introduction-heading"
              className="mt-6 text-[clamp(2rem,5vw,4.5rem)] leading-[1.4] font-semibold tracking-tight break-keep text-slate-900"
            >
              <strong className="text-blue-700">사람</strong>을 이해하고,
              <br />
              <strong className="text-blue-700">경험</strong>을 만듭니다.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-5">
              <button
                type="button"
                onClick={() => onNavigate("projects")}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-6 sm:text-base"
              >
                프로젝트 보기 <ArrowUpRight aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("about-me")}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-white/70 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:text-base"
              >
                더 알아보기 <ArrowDown aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
