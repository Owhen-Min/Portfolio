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
    <section id="about-me" className="surface-paper snap-section section-layout">
      <div className="portfolio-container section-stack">
        <div className="section-group">
          <h2 className="section-title">About me</h2>
          <p className="section-body max-w-3xl break-keep">
            영어 교육 현장에서{" "}
            <span className="font-medium text-black">사용자와 직접 소통하며 얻은 공감 능력</span>을
            바탕으로, 사용자의 입장에서 먼저 생각하고{" "}
            <span className="font-medium text-black">불편함을 해결</span>하는 개발을 지향합니다.{" "}
            <br />
            연극 무대를 함께 만들 듯,{" "}
            <span className="font-medium text-black">동료들과의 긴밀한 협업</span>을 통해 하나의
            완성된 서비스를 만들어내는 것에 가장 큰 보람을 느낍니다.
          </p>
        </div>

        <div className="section-group">
          <div className="flex flex-row items-center gap-2">
            <h3 className="section-subtitle">Activities</h3>
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
                  <TooltipTrigger className="w-full">
                    <div className="flex w-full flex-col items-center rounded-2xl border bg-gray-50 p-2">
                      <h3 className="text-base leading-6 font-normal text-slate-800">
                        {activity.title}
                      </h3>
                      <p className="section-meta">{activity.period}</p>
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
        </div>
      </div>
    </section>
  );
}
