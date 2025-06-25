import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex h-full w-full flex-col items-start justify-center gap-y-2 bg-pink-100 p-5 text-start md:p-10 lg:p-20"
    >
      <div className="px-[10vw] text-start">
        <h2 className="mb-2 text-start text-2xl underline underline-offset-8 sm:mb-5 sm:text-4xl">
          Skills
        </h2>
        {/* <h2 className="text-xl font-bold text-start">
          <Tooltip>
            <TooltipTrigger>Skills</TooltipTrigger>
            <TooltipContent>
              <p>호버 시 추가적인 설명을 적어두었습니다.</p>
            </TooltipContent>
          </Tooltip>
        </h2> */}
        <p className="text-gray-600">
          I'm a software engineer with a passion for building web applications.
        </p>
      </div>
    </section>
  );
}
