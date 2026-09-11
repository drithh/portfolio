"use client";
import { Item } from "./nav-item";
import { DarkModeToggle } from "./dark-mode-toggle";
import Image from "next/image";
import { useScrollSpy } from "../hooks/use-scroll-spy";

const text = ["about", "experience", "project", "contact"];

export const Navbar = () => {
  const { selectedSection, scrollToSection } = useScrollSpy(text);

  return (
    <header className="sticky top-3 z-40 my-3 flex w-full items-center justify-between py-2 sm:my-5">
      {/* Brand / Mini Avatar */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("about");
        }}
        className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        aria-label="Navigate to top"
      >
        <div className="shadow-xs relative h-8 w-8 overflow-hidden rounded-full border border-border/80 bg-muted/40 sm:h-9 sm:w-9">
          <Image
            src="/avatar.png"
            alt="Adriel"
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
      </a>

      {/* Floating Capsule Nav Dock */}
      <nav
        aria-label="Main Navigation"
        className="shadow-xs relative flex items-center rounded-full border border-border/80 bg-background/80 p-1 backdrop-blur-md"
      >
        {text.map((item, index) => (
          <Item
            key={index}
            item={item}
            isSelected={selectedSection === item}
            onClick={() => scrollToSection(item)}
          />
        ))}
      </nav>

      {/* Theme Toggle Button */}
      <div className="flex items-center">
        <div className="shadow-xs flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-background/80 backdrop-blur-md transition-colors hover:border-foreground/30 hover:bg-secondary/60 sm:h-9 sm:w-9">
          <DarkModeToggle
            sunColor="#D97706"
            moonColor="#FCD34D"
            size={18}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    </header>
  );
};
