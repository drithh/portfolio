import { useEffect, useRef, useState } from "react";

export const useScrollSpy = (sections: string[]) => {
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const scrollToSection = (section: string) => {
    setSelectedSection(section);
    isProgrammaticScroll.current = true;
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000);

    const element = document.querySelector(`#${section}`);
    if (element) {
      if (section === sections[0]) {
        // Usually 'about' section
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (isProgrammaticScroll.current) return;
      const elements = document.querySelectorAll("section");
      if (elements) {
        elements.forEach((element) => {
          const top = element.getBoundingClientRect().top;

          if (top > 0 && top < 150) {
            const width = window.innerWidth;
            if (width <= 420 && element.id === "experience") {
              return;
            }
            setSelectedSection(element.id);
          } else if (element.id === "contact" && top < 600) {
            setSelectedSection(element.id);
          }
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return {
    selectedSection,
    scrollToSection,
  };
};
