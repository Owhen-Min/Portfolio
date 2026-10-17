import { ArrowUpRight, Github, Mail, MapPin, Phone } from "lucide-react";

const linkStyle =
  "rounded-md transition-colors hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-sky-300";

export default function Contact() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="contact-section flex w-full flex-1 items-center text-slate-100"
    >
      <div className="portfolio-container py-16 text-start md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-[0.2em] text-sky-300 uppercase">Contact</p>
          <h2
            id="contact-heading"
            className="mt-5 text-3xl leading-snug font-bold tracking-tight break-keep text-white sm:text-5xl"
          >
            함께 만들 다음 이야기를
            <br className="hidden sm:block" /> 기다립니다.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 break-keep text-slate-300 sm:text-lg">
            프로젝트와 협업에 관한 이야기를 편하게 남겨주세요.
          </p>
          <div className="mt-10 border-y border-white/15 py-7 sm:mt-12 sm:py-9">
            <p className="mb-3 flex items-center gap-2 text-sm text-slate-300">
              <Mail aria-hidden="true" className="size-4" /> Email
            </p>
            <a
              href="mailto:skyblue848@naver.com"
              className={`${linkStyle} inline-flex min-h-12 max-w-full items-center gap-3 text-xl leading-relaxed font-medium text-sky-300 sm:text-3xl md:text-4xl`}
            >
              <span className="min-w-0 break-words">
                skyblue848@
                <wbr />
                naver.com
              </span>
              <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 sm:size-7" />
            </a>
          </div>
          <div className="mt-8 flex flex-col gap-4 text-base leading-7 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:text-lg">
            <a
              href="https://github.com/Owhen-Min"
              className={`${linkStyle} inline-flex min-h-11 items-center gap-3 self-start`}
            >
              <Github aria-hidden="true" className="size-5 shrink-0 text-slate-400" /> GitHub
              <ArrowUpRight aria-hidden="true" className="size-4 text-slate-400" />
            </a>
            <a
              href="tel:+821043890001"
              className={`${linkStyle} inline-flex min-h-11 items-center gap-3 self-start`}
            >
              <Phone aria-hidden="true" className="size-5 shrink-0 text-slate-400" /> +82
              10-4389-0001
            </a>
            <p className="flex min-h-11 items-center gap-3 text-slate-300">
              <MapPin aria-hidden="true" className="size-5 shrink-0 text-slate-400" /> Seoul, South
              Korea
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
