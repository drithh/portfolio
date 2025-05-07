import { useRef } from "react";
import { motion } from "framer-motion";

interface ItemProps {
  item: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const Item = (props: ItemProps) => {
  const { item, isSelected, onClick } = props;
  const linkRef = useRef<HTMLButtonElement>(null);
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
          style={getParrentWidth(linkRef)}
          className="absolute  -top-1 -left-[15px] -z-10 block h-8  rounded-full bg-background px-4 ty:h-9 "
          initial={false}
          transition={spring}
        ></motion.div>
      )}
      {`${item[0].toUpperCase()}${item.slice(1)}`}
    </button>
  );
};

const getParrentWidth = (ref: React.RefObject<HTMLButtonElement | null>) => {
  if (ref.current) {
    const { offsetWidth } = ref.current;
    return { width: offsetWidth + 30 };
  }
};

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
