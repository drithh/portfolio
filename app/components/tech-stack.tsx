import {
  SiMysql,
  SiLaravel,
  SiDocker,
  SiReact,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiGit,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiPython,
  SiFastapi,
  SiGo,
} from "react-icons/si";
import { DiGoogleCloudPlatform } from "react-icons/di";
import { IoLogoNodejs } from "react-icons/io5";
import { RiNextjsLine, RiVuejsLine } from "react-icons/ri";

const tech = [
  {
    name: "HTML5",
    icon: <SiHtml5 />,
  },
  {
    name: "CSS3",
    icon: <SiCss3 />,
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss />,
  },
  {
    name: "Javascript (ES6+)",
    icon: <SiJavascript />,
  },
  {
    name: "Typescript",
    icon: <SiTypescript />,
  },
  {
    name: "NodeJS",
    icon: <IoLogoNodejs />,
  },
  {
    name: "React",
    icon: <SiReact />,
  },
  {
    name: "NextJS",
    icon: <RiNextjsLine />,
  },
  {
    name: "Vue",
    icon: <RiVuejsLine />,
  },
  {
    name: "PHP",
    icon: <SiPhp />,
  },
  {
    name: "Laravel",
    icon: <SiLaravel />,
  },
  {
    name: "Python",
    icon: <SiPython />,
  },
  {
    name: "FastAPI",
    icon: <SiFastapi />,
  },
  {
    name: "GoLang",
    icon: <SiGo />,
  },
  {
    name: "Fiber",
    icon: <SiGo />,
  },
  {
    name: "Git",
    icon: <SiGit />,
  },
  {
    name: "Mysql",
    icon: <SiMysql />,
  },
  {
    name: "Postgresql",
    icon: <SiPostgresql />,
  },
  {
    name: "Docker",
    icon: <SiDocker />,
  },
  {
    name: "Google Cloud Platform",
    icon: <DiGoogleCloudPlatform />,
  },
];

export const TechStack = () => {
  return (
    <div className="tech">
      <div className="title mb-4 mt-6 text-left font-title text-4xl font-bold tracking-wide md:text-5xl">
        Stack
      </div>
      Here are few technologies that are cup of my{" "}
      <span className="line-through">coffee</span> tea
      <div className="mt-5 grid max-w-[48rem] grid-cols-2 gap-y-4 text-[1.7rem] text-secondary-foreground md:grid-cols-3">
        {tech.map((tech, index) => {
          return (
            <div key={index} className="tech flex items-center gap-x-3">
              <div className="tech-icon ">{tech.icon}</div>
              <span className="tech-name font-title text-[1.05rem] font-light">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
