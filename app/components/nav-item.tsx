import { motion } from "framer-motion";

interface ItemProps {
  item: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const Item = (props: ItemProps) => {
  const { item, isSelected, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`${
        item === "experience" ? "hidden ty:block" : ""
      } relative z-0`}
    >
      {isSelected && (
        <motion.div
          layoutId="selected"
          className="absolute -inset-x-[15px] -inset-y-1 -z-10 rounded-full bg-background"
          initial={false}
          transition={spring}
        />
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
