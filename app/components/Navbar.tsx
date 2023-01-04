'use client';
import { useEffect, useState } from 'react';
import { Item } from './Item';
import { Background } from './Background';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
// import { useViewportScroll } from 'framer-motion';

const text = ['about', 'experience', 'project', 'contact'];

export const Navbar = (props: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { theme, setTheme } = props;

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const [selected, setSelected] = useState(text[0]);
  const scrollPosition = (item: string) => {
    const element = document.querySelector(`#${item}`);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    // setSelected(item);
  };

  useEffect(() => {
    const onScroll = () => {
      const elements = document.querySelectorAll(`section`);

      if (elements) {
        elements.forEach((element) => {
          const top = element.getBoundingClientRect().top;

          if (top > 0 && top < 150) {
            // get client window width
            const width = window.innerWidth;
            if (width <= 420 && element.id === 'experience') {
              return;
            }
            // console.log(element);
            setSelected(element.id);
          } else if (element.id === 'contact' && top < 600) {
            setSelected(element.id);
          }
        });
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="sticky top-2 z-10 my-8 flex h-fit w-full items-center justify-center py-2 ty:px-4 sm:justify-between lg:my-12">
      <div className="profile hidden lg:block">
        <img src="/avatar.png" className="h-auto w-12" alt="profile" />
      </div>

      <div className="text-sans relative flex w-[90vw] place-content-between items-center gap-8 py-[6px] px-6 text-base font-semibold  transition-all  ty:text-lg  sm:w-min  lg:py-2">
        <Background />
        {text.map((item, index) => {
          return (
            <Item
              key={index}
              item={item}
              isSelected={selected === item}
              onClick={() => scrollPosition(item)}
            />
          );
        })}
      </div>
      <div className="hidden pr-2 sm:block lg:pr-0">
        <DarkModeSwitch
          checked={theme === 'dark'}
          onChange={toggleDarkMode}
          sunColor="#F4DC9F"
          moonColor="#F4DC9F"
          className="h-auto w-10 lg:w-12"
        />
      </div>
    </nav>
  );
};
