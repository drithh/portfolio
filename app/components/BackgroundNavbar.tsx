import { motion, useTransform, useScroll } from "framer-motion";
import useWindowDimensions from "../utils/WindowDimensions";

export const Background = () => {
  const { width } = useWindowDimensions();
  if (width > 1024) {
    return <BackgroundLarge />;
  } else if (width > 640) {
    return <BackgroundMedium widthScreen={width} />;
  } else if (width > 400) {
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
      className="fixed inset-0 -z-10 mx-auto h-[2.75rem] w-[92vw]  rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundSmall = () => {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 0.006], ["2.25rem", "0.75rem"]);
  return (
    <motion.div
      style={{ top }}
      className="fixed inset-0 -z-10 mx-auto h-[3rem] w-[92vw]  rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundMedium = (props: { widthScreen: number }) => {
  const { widthScreen } = props;
  const maxWidth =
    94.5 +
    Math.ceil(widthScreen - 640) / (110 - Math.ceil(widthScreen - 640) / 100);
  const { scrollYProgress } = useScroll();
  const width = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["40vw", `${maxWidth}vw`]
  );
  const height = useTransform(scrollYProgress, [0, 0.1], ["100%", "115%"]);
  const top = useTransform(scrollYProgress, [0, 0.1], ["0%", "-7.5%"]);
  return (
    <motion.div
      style={{ width, height, top }}
      className="absolute inset-0 -z-10 mx-auto max-h-[4rem] min-w-full  rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};

const BackgroundLarge = () => {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 0.1], ["100%", "254%"]);
  const height = useTransform(scrollYProgress, [0, 0.1], ["100%", "145%"]);
  const left = useTransform(scrollYProgress, [0, 0.1], ["0%", "-77%"]);
  const top = useTransform(scrollYProgress, [0, 0.1], ["0%", "-19%"]);
  return (
    <motion.div
      style={{ width, height, left, top }}
      className="absolute inset-0 -z-10 mx-auto max-h-[4rem] min-w-fit max-w-[64rem] rounded-full backdrop-blur-sm [@supports(backdrop-filter:blur(2px))]:bg-zinc-200/[90%] dark:[@supports(backdrop-filter:blur(2px))]:bg-zinc-800/[95%]"
    ></motion.div>
  );
};
