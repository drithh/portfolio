import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ItemProps {
  item: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const Item = (props: ItemProps) => {
  const { item, isSelected, onClick } = props;
  const linkRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateWidth = () => {
      if (linkRef.current) {
        const { offsetWidth } = linkRef.current;
        setWidth(offsetWidth + 30);
      }
    };

    // Initial measurement
    updateWidth();

    // Re-measure on window resize
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [item]);

  return (
    <button
      onClick={onClick}
      className={`${
        item === "experience" ? "hidden ty:block" : ""
      } relative z-0`}
      ref={linkRef}
    >
      {isSelected && (
        <motion.div
          layoutId="selected"
          style={{ width }}
          className="absolute -left-[15px] -top-1 -z-10 block h-8 rounded-full bg-background px-4 ty:h-9"
          initial={false}
          transition={spring}
        ></motion.div>
      )}
      {`${item[0].toUpperCase()}${item.slice(1)}`}
    </button>
  );
};

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
