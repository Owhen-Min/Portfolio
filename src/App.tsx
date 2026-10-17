import { useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Introduction, AboutMe, Careers, Projects, Skills, Contact } from "./components";
import useSectionSnap from "./hooks/useSectionSnap";

const sectionIds = ["introduction", "about-me", "careers", "skills", "projects", "contact"];

const navItems = [
  { label: "About me", id: "about-me" },
  { label: "Career & Awards", id: "careers" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

function App() {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [isOpen, setIsOpen] = useState(false);
  const handleNavigation = useSectionSnap(sectionIds);

  useEffect(() => {
    // 뷰포트 중앙선을 지나는 섹션 하나만 활성으로 잡아, 화면보다 긴 섹션도 동일하게 처리한다.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Theme className="portfolio-theme">
      <header className="surface-paper fixed top-0 left-0 z-100 h-15 w-full border-b border-slate-900/5">
        <div className="portfolio-container flex h-full items-center justify-between">
          <h1
            className="cursor-pointer text-start text-xl"
            onClick={() => handleNavigation("introduction")}
          >
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
                    activeSection === item.id ? "font-bold text-blue-600" : ""
                  }`}
                  onClick={() => handleNavigation(item.id)}
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
                        className={`cursor-pointer rounded-sm px-3 py-2 text-sm transition-colors outline-none hover:bg-gray-100 focus:bg-gray-100 ${activeSection === item.id ? "bg-blue-50 font-bold text-blue-600" : ""} `}
                        onClick={() => {
                          handleNavigation(item.id);
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
        </div>
      </header>

      <main className="w-full pt-15">
        <Introduction />
        <AboutMe />
        <Careers />
        <Skills />
        <Projects />
        <div id="contact" className="snap-section flex w-full flex-col">
          <Contact />
          <footer className="flex h-10 w-full shrink-0 items-center justify-center bg-black">
            <p className="text-xs text-white">© 2026 Min's Portfolio. All Rights Reserved.</p>
          </footer>
        </div>
      </main>
    </Theme>
  );
}

export default App;
