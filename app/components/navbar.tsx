"use client";
import { Item } from "./nav-item";
import { Background } from "./background-navbar";
import { DarkModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useScrollSpy } from "../hooks/use-scroll-spy";

const text = ["about", "experience", "project", "contact"];

export const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const { selectedSection, scrollToSection } = useScrollSpy(text);

  return (
    <nav className="sticky top-2 z-10 my-8 flex h-fit w-full items-center justify-center py-2 text-primary-foreground ty:px-4 sm:justify-between lg:my-12">
      <div className="profile hidden md:block">
        <Image src="/avatar.png" alt="profile" width={48} height={48} />
      </div>

      <div className="text-sans relative flex w-[90vw] place-content-between items-center gap-8 px-6 py-[6px] text-base font-semibold transition-all ty:text-lg sm:w-min lg:py-2">
        <Background />
        {text.map((item, index) => {
          return (
            <Item
              key={index}
              item={item}
              isSelected={selectedSection === item}
              onClick={() => scrollToSection(item)}
            />
          );
        })}
      </div>
      <div className="hidden w-12 pr-2 sm:block lg:pr-0">
        <DarkModeToggle
          sunColor="#F4DC9F"
          moonColor="#F4DC9F"
          size={40}
          style={{ width: "auto" }}
        />
      </div>
    </nav>
  );
};
