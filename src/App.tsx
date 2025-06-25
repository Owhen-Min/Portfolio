import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";

import { Scrollbar, Mousewheel } from "swiper/modules";
import { Introduction, AboutMe, Career, Projects, Skills, Contact } from "./components";

function App() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNavigation = (slideIndex: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  const navItems = [
    { label: "About me", index: 1 },
    { label: "Career", index: 2 },
    { label: "Skills", index: 3 },
    { label: "Projects", index: 4 },
    { label: "Contact", index: 5 },
  ];

  return (
    <Theme>
      <header className="absolute z-100 flex h-15 w-full items-center justify-between bg-gray-100 px-4 sm:px-10">
        <h1 className="cursor-pointer text-start text-xl" onClick={() => handleNavigation(0)}>
          Min's
          <br />
          Portfolio
        </h1>
        <nav>
          <ul className="flex items-center gap-4">
            {navItems.map((item) => (
              <li
                key={item.label}
                className={`cursor-pointer transition-colors hover:text-blue-600 ${
                  activeSlide === item.index ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => handleNavigation(item.index)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="@container h-[100dvh] pt-15">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.activeIndex);
          }}
          className="flex h-[calc(100dvh-60px)] w-full flex-col items-center justify-center"
          modules={[Scrollbar, Mousewheel]}
          direction="vertical"
          mousewheel={{ enabled: true }}
          scrollbar={{ draggable: true }}
          touchRatio={1}
          touchAngle={45}
          simulateTouch={true}
          allowTouchMove={true}
          touchStartPreventDefault={true}
          touchReleaseOnEdges={true}
          resistance={true}
          resistanceRatio={0.85}
        >
          <SwiperSlide key={"introduction"}>
            <Introduction />
          </SwiperSlide>
          <SwiperSlide key={"about_me"}>
            <AboutMe />
          </SwiperSlide>
          <SwiperSlide key={"about_me2"}>
            <Career />
          </SwiperSlide>
          <SwiperSlide key={"skills"}>
            <Skills />
          </SwiperSlide>
          <SwiperSlide key={"projects"}>
            <Projects />
          </SwiperSlide>
          <SwiperSlide key={"contact"}>
            <Contact />
            <footer className="flex h-10 w-full items-center justify-center bg-black">
              <p className="text-xs text-white">© 2025 Min's Portfolio. All Rights Reserved.</p>
            </footer>
          </SwiperSlide>
        </Swiper>
      </div>
    </Theme>
  );
}

export default App;
