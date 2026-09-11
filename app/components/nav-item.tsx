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
        item === "experience" ? "hidden ty:inline-flex" : "inline-flex"
      } relative z-0 items-center rounded-full px-3 py-1 font-sans text-xs font-medium transition-colors sm:px-3.5 sm:py-1.5 sm:text-sm ${
        isSelected
          ? "font-semibold text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="selected"
          className="shadow-xs absolute inset-0 -z-10 rounded-full border border-border/70 bg-background"
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
