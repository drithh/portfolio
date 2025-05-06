"use client";
import { Item } from "./nav-item";
import { Background } from "./background-navbar";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useScrollSpy } from "../hooks/use-scroll-spy";

const text = ["about", "experience", "project", "contact"];

export const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const { selectedSection, scrollToSection } = useScrollSpy(text);

  return (
    <nav className="sm:justify-between lg:my-12 sticky top-2 z-10 my-8 flex h-fit w-full items-center justify-center py-2 ty:px-4">
      <div className="profile md:block hidden">
        <Image src="/avatar.png" alt="profile" width={48} height={48} />
      </div>

      <div className="text-sans sm:w-min lg:py-2 relative flex w-[90vw] place-content-between items-center gap-8 py-[6px] px-6  text-base  font-semibold  transition-all  ty:text-lg">
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
      <div className="sm:block lg:pr-0 hidden pr-2">
        <DarkModeSwitch
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          sunColor="#F4DC9F"
          moonColor="#F4DC9F"
          className="lg:w-12 h-auto w-10"
        />
      </div>
    </nav>
  );
};
