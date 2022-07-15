import { useEffect, useRef, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import useWindowDimensions from '../utils/WindowDimensions';
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
  useEffect(() => {
    const element = document.querySelector(`#${selected}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selected]);
  return (
    <nav className="sticky top-2 my-12 flex h-fit w-full items-center justify-center py-2 sm:justify-between ty:px-4">
      <div className="profile hidden lg:block">
        <img src="/avatar.png" className="h-auto w-12" alt="profile" />
      </div>

      <div className="text-sans relative flex w-[90vw] place-content-between items-center gap-8 py-[6px] px-6 text-base font-semibold  transition-all  sm:w-min  lg:py-2  ty:text-lg">
        <Background />
        {text.map((item, index) => {
          return (
            <Item
              key={index}
              item={item}
              isSelected={selected === item}
              onClick={() => setSelected(item)}
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

const Background = () => {
  const { width } = useWindowDimensions();
  console.log(width);
  if (width > 1024) {
    return <BackgroundLarge />;
  } else if (width > 640) {
    return <BackgroundMedium />;
  } else if (width > 400) {
    return <BackgroundSmall />;
  } else {
    return <BackgroundTiny />;
  }
};

const BackgroundTiny = () => {
  const { scrollYProgress } = useViewportScroll();
  const top = useTransform(scrollYProgress, [0, 0.01], ['3.3rem', '0.75rem']);
  return (
    <motion.div
      style={{ top }}
      className="fixed inset-0   -z-10 mx-auto h-[2.75rem] w-[92vw]  rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundSmall = () => {
  const { scrollYProgress } = useViewportScroll();
  const top = useTransform(scrollYProgress, [0, 0.01], ['3.3rem', '0.75rem']);
  return (
    <motion.div
      style={{ top }}
      className="fixed inset-0   -z-10 mx-auto h-[3rem] w-[92vw]  rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundMedium = () => {
  const { scrollYProgress } = useViewportScroll();
  const width = useTransform(scrollYProgress, [0, 0.1], ['40vw', '93.5vw']);
  const height = useTransform(scrollYProgress, [0, 0.1], ['100%', '115%']);
  const top = useTransform(scrollYProgress, [0, 0.1], ['0%', '-7.5%']);
  return (
    <motion.div
      style={{ width, height, top }}
      className="absolute inset-0 -z-10 mx-auto max-h-[4rem] min-w-full max-w-[95vw] rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundLarge = () => {
  const { scrollYProgress } = useViewportScroll();
  const width = useTransform(scrollYProgress, [0, 0.1], ['100%', '254%']);
  const height = useTransform(scrollYProgress, [0, 0.1], ['100%', '145%']);
  const left = useTransform(scrollYProgress, [0, 0.1], ['0%', '-77%']);
  const top = useTransform(scrollYProgress, [0, 0.1], ['0%', '-19%']);
  return (
    <motion.div
      style={{ width, height, left, top }}
      className="absolute inset-0 -z-10 mx-auto max-h-[4rem] min-w-fit max-w-[64rem] rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

interface ItemProps {
  item: string;
  isSelected?: boolean;
  onClick: () => void;
}

const Item = (props: ItemProps) => {
  const { item, isSelected, onClick } = props;
  const linkRef = useRef<HTMLButtonElement>(null);
  return (
    <button
      onClick={onClick}
      className={`${
        item === 'experience' ? 'hidden ty:block' : ''
      } relative z-0`}
      ref={linkRef}
    >
      {isSelected && (
        <motion.div
          layoutId="selected"
          style={getParrentWidth(linkRef)}
          className="absolute  -top-1 -left-[15px] -z-10 block h-8  rounded-full bg-light-background px-4 dark:bg-dark-background ty:h-9 "
          initial={false}
          transition={spring}
        ></motion.div>
      )}
      {`${item[0].toUpperCase()}${item.slice(1)}`}
    </button>
  );
};

const getParrentWidth = (ref: React.RefObject<HTMLButtonElement>) => {
  if (ref.current) {
    const { offsetWidth } = ref.current;
    return { width: offsetWidth + 30 };
  }
};

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
