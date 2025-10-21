import { motion, useTransform, useScroll } from "framer-motion";
import useWindowDimensions from "../lib/window-dimension";

export const Background = () => {
  const { width } = useWindowDimensions();
  if (width > 1024) {
    return <BackgroundLarge />;
  } else if (width > 768) {
    return <BackgroundMedium widthScreen={width} />;
  } else if (width > 640) {
    return <BackgroundSmall />;
  } else {
    return <BackgroundTiny />;
  }
};

const BackgroundTiny = () => {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 0.006], ["2.25rem", "0.75rem"]);
  return (
    <motion.div
      style={{ top }}
      className="fixed inset-0 -z-10 mx-auto h-[2.75rem] w-[92vw] rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundSmall = () => {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 0.006], ["2.25rem", "0.75rem"]);
  return (
    <motion.div
      style={{ top }}
      className="fixed inset-0 -z-10 mx-auto h-[3rem] w-[95vw] rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundMedium = (props: { widthScreen: number }) => {
  const { widthScreen } = props;
  const { scrollYProgress } = useScroll();

  // Start with a reasonable width and expand much wider on scroll
  const width = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["400px", `${window.innerWidth * 0.98}px`], // Much wider expansion
  );

  const height = useTransform(scrollYProgress, [0, 0.1], ["100%", "120%"]);
  const top = useTransform(scrollYProgress, [0, 0.1], ["0%", "-10%"]);

  // Center horizontally for perfect symmetry
  const left = useTransform(scrollYProgress, [0, 0.1], ["50%", "50%"]);
  const x = useTransform(scrollYProgress, [0, 0.1], ["-50%", "-50%"]);

  return (
    <motion.div
      style={{ width, height, top, left, x }}
      className="absolute -z-10 max-h-[4rem] rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundLarge = () => {
  const { scrollYProgress } = useScroll();

  // Start with a good width and expand much wider on scroll
  const width = useTransform(scrollYProgress, [0, 0.1], ["25rem", "64rem"]); // Even wider expansion
  const height = useTransform(scrollYProgress, [0, 0.1], ["100%", "130%"]);
  const top = useTransform(scrollYProgress, [0, 0.1], ["0%", "-15%"]);

  // Center horizontally for perfect symmetry
  const left = useTransform(scrollYProgress, [0, 0.1], ["50%", "50%"]);
  const x = useTransform(scrollYProgress, [0, 0.1], ["-50%", "-50%"]);

  return (
    <motion.div
      style={{ width, height, top, left, x }}
      className="absolute -z-10 max-h-[4rem] rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};
