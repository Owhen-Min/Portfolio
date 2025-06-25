import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import { activities } from "@/data/activities.json";

import "swiper/css";
import "swiper/css/grid";
import "@radix-ui/themes/styles.css";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function AboutMe() {
  return (
    <section className="bg-accent flex h-full w-full flex-col items-start justify-center gap-y-2 p-5 text-start md:p-10 lg:p-20">
      <h2 className="mb-2 text-start text-2xl underline underline-offset-8 sm:mb-5 sm:text-4xl">
        About me
      </h2>
      <p className="text-gray mb-5 w-4/5 leading-8 font-light break-keep text-gray-500 sm:w-2/3 sm:text-lg sm:leading-8 md:mb-10 md:w-1/2 md:text-xl">
        영어 교육 현장에서{" "}
        <span className="font-medium text-black">사용자와 직접 소통하며 얻은 공감 능력</span>을
        바탕으로, 사용자의 입장에서 먼저 생각하고{" "}
        <span className="font-medium text-black">불편함을 해결</span>하는 개발을 지향합니다. <br />
        연극 무대를 함께 만들 듯,{" "}
        <span className="font-medium text-black">동료들과의 긴밀한 협업</span>을 통해 하나의 완성된
        서비스를 만들어내는 것에 가장 큰 보람을 느낍니다.
      </p>

      <div className="mb-2 flex flex-row items-center gap-2">
        <h3 className="text-xl sm:text-3xl">Activities</h3>
        <Tooltip>
          <TooltipTrigger>
            <QuestionMarkCircledIcon className="h-[15px] w-[15px] sm:h-5 sm:w-5" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[40vw] break-keep">
            <p className="text-base">
              호버 시 설명이 나타납니다. 스와이프 시 다른 활동들이 나타납니다.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Swiper
        className="grid-swiper h-40 w-full select-none"
        modules={[Grid]}
        grid={{
          rows: 2,
          fill: "row",
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          // 화면 너비가 768px 이상일 때
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // 화면 너비가 1024px 이상일 때
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        touchRatio={1}
        touchAngle={25}
        simulateTouch={true}
        allowTouchMove={true}
        touchStartPreventDefault={true}
        touchReleaseOnEdges={true}
        resistance={true}
        resistanceRatio={0.85}
      >
        {activities.map((activity: any) => (
          <SwiperSlide key={activity.key}>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex w-[90vw] flex-col items-center rounded-2xl border bg-gray-50 p-2 sm:w-[45vw] md:w-[30vw] lg:w-[20vw]">
                  <h3 className="text-xl text-gray-900">{activity.title}</h3>
                  <p className="text-gray-600">{activity.period}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[70vw] break-keep md:max-w-[40vw]">
                <p className="text-base">{activity.description}</p>
              </TooltipContent>
            </Tooltip>
          </SwiperSlide>
        ))}

        {/* <SwiperSlide key={"교육"}>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex w-[95vw] flex-col items-start rounded-2xl bg-gray-50 p-2 sm:w-[40vw] md:w-[30vw] lg:w-[20vw]">
                <h3 className="text-xl text-gray-900">CulCom 영어 교육 리더</h3>
                <p className="text-gray-600">22.06 ~ 24.04</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[40vw] break-keep">
              <p className="text-base">
                성인 대상으로 영어 회화를 교육, 사람들과 의견을 공유하며 더 좋은 표현을 위한
                피드백을 진행
              </p>
            </TooltipContent>
          </Tooltip>
        </SwiperSlide> */}
      </Swiper>
    </section>
  );
}
