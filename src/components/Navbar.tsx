import { useRef, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { motion, AnimateSharedLayout } from 'framer-motion';

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
  return (
    <nav className="sticky flex h-36 w-full items-center justify-center py-12 sm:justify-between ty:px-4">
      <div className="profile hidden lg:block">
        <img src="/avatar.png" className="h-auto w-12" alt="profile" />
      </div>
      <div className="text-sans  flex w-min flex-shrink-0 items-center gap-8 rounded-full bg-zinc-200 py-2 px-6  text-base  font-semibold  transition-all dark:bg-zinc-800 ty:text-lg">
        <Router>
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
        </Router>
      </div>
      <div className="hidden sm:block">
        <DarkModeSwitch
          checked={theme === 'dark'}
          onChange={toggleDarkMode}
          sunColor="#F4DC9F"
          moonColor="#F4DC9F"
          className="h-auto w-12 "
        />
      </div>
    </nav>
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
          style={getParrentWidth(item, linkRef)}
          className="
          absolute  -top-1 -z-10 block h-8  rounded-full bg-light-background px-4 dark:bg-dark-background ty:h-9 "
          initial={false}
          transition={spring}
        ></motion.div>
      )}
      {`${item[0].toUpperCase()}${item.slice(1)}`}
    </button>
  );
};

const getParrentWidth = (
  item: string,
  ref: React.RefObject<HTMLButtonElement>
) => {
  const element = document.querySelector(`#${item}`);
  if (element && ref.current) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    const { offsetWidth } = ref.current;
    return { width: offsetWidth + 30, left: -15 };
  }
};

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
