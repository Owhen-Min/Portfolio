import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Scrollbar, Mousewheel } from "swiper/modules";
import { Introduction, AboutMe, Careers, Projects, Skills, Contact } from "./components";

function App() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (slideIndex: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  const navItems = [
    { label: "About me", index: 1 },
    { label: "Career & Awards", index: 2 },
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
          {/* 데스크톱 네비게이션 (sm 이상에서만 표시) */}
          <ul className="hidden items-center gap-4 sm:flex">
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

          {/* 모바일 햄버거 메뉴 (sm 미만에서만 표시) */}
          <div className="sm:hidden">
            <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenu.Trigger asChild>
                <button
                  className="rounded-md p-2 transition-colors hover:bg-gray-100"
                  aria-label="메뉴 열기"
                >
                  <HamburgerMenuIcon className="h-5 w-5" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[200px] rounded-md border bg-white p-2 shadow-lg"
                  sideOffset={5}
                >
                  {navItems.map((item) => (
                    <DropdownMenu.Item
                      key={item.label}
                      className={`cursor-pointer rounded-sm px-3 py-2 text-sm transition-colors outline-none hover:bg-gray-100 focus:bg-gray-100 ${activeSlide === item.index ? "bg-blue-50 font-bold text-blue-600" : ""} `}
                      onClick={() => {
                        handleNavigation(item.index);
                        setIsOpen(false); // 메뉴 선택 후 닫기
                      }}
                    >
                      {item.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
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
            <Careers />
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
