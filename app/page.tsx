import { Navbar } from "./components/navbar";
import { Project } from "./components/project";
import { Experience } from "./components/experience";
import {
  FiInstagram,
  FiFacebook,
  FiGithub,
  FiMail,
  FiLinkedin,
} from "react-icons/fi";
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
  SiFramework,
} from "react-icons/si";
import { DiGoogleCloudPlatform } from "react-icons/di";
import { SlGraduation } from "react-icons/sl";
import { IoLogoNodejs, IoCodeSlash } from "react-icons/io5";
import { RiNextjsLine, RiVuejsLine } from "react-icons/ri";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Repository } from "./types/repo";

const fetchData = async (githubUsername: string, project: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUsername}/${project}`
    );
    if (response.status !== 200) {
      console.log("Error fetching data");
    } else {
      return (await response.json()) as Repository;
    }
  } catch (error) {
    console.log(error);
  }
};

async function App() {
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
  const githubUsername = "Drithh";
  const projects = [
    "e-commerce-website",
    "weather-bayes",
    "invoice-website",
    "car-rental",
    "turing-machine",
    "gumiwang",
    "emotion-prediction",
    "authentication-app",
  ];

  const repositories = await Promise.all(
    projects.map(async (project) => {
      return await fetchData(githubUsername, project);
    })
  ).then((data) => data.flatMap((d) => (d !== undefined ? [d] : [])));

  return (
    <div className={`App `}>
      <div className="body bg-background text-primary transition-all  motion-reduce:transition-none">
        <div className="mx-auto flex min-h-screen max-w-[64rem] flex-col font-sans">
          <Navbar />
          <main className="flex flex-col gap-8 px-4 text-lg md:text-xl">
            <section id="about" className="flex flex-col gap-6 lg:mt-8">
              <div className="flex flex-col gap-2 text-justify">
                <div className="mb-3  text-xl text-primary text-opacity-50  md:text-2xl">
                  Ohh you found me?. Howdy!
                </div>
                <div>
                  My name is{" "}
                  <span className="font-bold">Adriel Alfeus Hutabarat</span>,
                  I&apos;m a Web Developer based in Bekasi, Indonesia. I just
                  graduated from Sebelas Maret University with a Bachelor of
                  Computer Science.
                </div>
                <div>
                  I&apos;m passionate in the art of web development, both
                  front-end and back-end. trying to learn every day for being
                  more efficient and strong in becoming the best self.
                </div>
                <div>
                  In my spare time, I spend a lot of time doing things I enjoy,
                  such as browsing memes on Reddit and Facebook and playing
                  video games. One of the things I enjoy the most is watching
                  movies. In particular, Science Fiction and Action movies hold
                  my attention for a long time.
                </div>
              </div>
              <div className="cv-download mt-4">
                <a
                  target="_blank"
                  href="adriel-alfeus.pdf"
                  className="flex w-fit gap-x-2 rounded-lg border border-accent-foreground px-4 py-2 text-lg text-accent-foreground transition-all hover:border-primary hover:text-primary motion-reduce:transition-none"
                >
                  <div className="text-[1.5rem]">
                    <HiOutlineDocumentDownload />
                  </div>
                  Download CV
                </a>
              </div>
              <div className="tech">
                <div className="title mb-4 mt-6 text-left font-title text-4xl font-bold tracking-wide md:text-5xl">
                  Stack
                </div>
                Here are few technologies that are cup of my{" "}
                <span className="line-through">coffee</span> tea
                <div className="mt-5 grid max-w-[48rem] grid-cols-2 gap-y-4 text-[1.7rem] text-secondary-foreground md:grid-cols-3">
                  {tech.map((tech, index) => {
                    return (
                      <div
                        key={index}
                        className="tech flex items-center gap-x-3"
                      >
                        <div className="tech-icon ">{tech.icon}</div>
                        <span className="tech-name font-title text-[1.05rem] font-light">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section id="experience" className="text-justify">
              <div className="title mb-4 mt-16 text-left font-title text-4xl font-bold tracking-wide md:text-5xl">
                Education & Work
              </div>
              <div className="mt-8 flex flex-col">
                <Experience
                  icon={<IoCodeSlash />}
                  title="Internship"
                  date="Sep 2022 - Present"
                  description={
                    <>
                      <div className="">
                        Sebelas Maret University School ERP Project
                      </div>
                      <ul className="list-disc pl-6 text-secondary-foreground">
                        <li>
                          Fullstack Developer specializing in Golang and ReactJS
                        </li>
                        <li>
                          Modernized the frontend application by introducing
                          TypeScript, Tanstack Query, and Vite to enhance
                          performance and developer experience
                        </li>
                        <li>
                          Introduced OpenAPI Specification (OAS) for improved
                          API documentation and tighter coupling between
                          frontend and backend
                        </li>
                      </ul>
                    </>
                  }
                />
                <Experience
                  icon={<IoCodeSlash />}
                  title="Freelance"
                  date="Mar 2021 - Nov 2021"
                  description={
                    <>
                      <div className="">P!NGFEST2021</div>
                      <ul className="list-disc  pl-6 text-secondary-foreground">
                        <li>
                          Designed & Implemented Home UI for website and mobile
                          view
                        </li>
                        <li>
                          Improved User Experience by beautifying the website
                          with animations
                        </li>
                      </ul>
                    </>
                  }
                />
                <Experience
                  icon={<SlGraduation />}
                  title="College"
                  date="July 2020 - June 2024"
                  description={
                    <>
                      <div className="">
                        Sebelas Maret University, Bachelor of Computer Science
                        (3.92)
                      </div>
                      <ul className="list-disc  pl-6 text-secondary-foreground">
                        <li>Lecture assistant for Programming Concepts Lab</li>
                        <li>Lecture assistant for Web Programming Lab</li>
                        <li>
                          Research Assistant in the field of Federated Learning
                        </li>
                      </ul>
                    </>
                  }
                />
              </div>
            </section>
            <section id="project" className="section mt-20 text-justify">
              <div className="header mb-20 mt-4 flex flex-col place-content-center place-items-center gap-y-2">
                <div className="title  text-center font-title text-4xl font-bold md:text-5xl">
                  Projects
                </div>
                <div className="desc text-secondary-foreground ">
                  A couple of my favorite projects I have built alone or with
                  someone
                </div>
              </div>
              <div className="projects grid grid-cols-1 gap-16 md:grid-cols-2">
                {repositories.map((repository, index) => (
                  <Project repository={repository} key={repository.id} />
                ))}
              </div>
              <div className="more mb-8 mt-16 flex place-content-center">
                <a
                  href={`https://github.com/${githubUsername}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl text-accent-foreground hover:text-secondary-foreground md:text-2xl"
                >
                  See more on Github
                </a>
              </div>
            </section>
            <section id="contact" className="section mb-20 text-justify">
              <div className="header mt-12 flex flex-col place-content-start place-items-start gap-y-2">
                <div className="title mb-4 text-left font-title text-4xl font-bold tracking-wider md:text-5xl">
                  Say Hi!
                </div>
                <div className="desc text-secondary-foreground ">
                  Though, I am fairly introverted myself. I do reply to messages
                  as long as my human interaction battery lasts. Coding, work,
                  or even useless stuff, anything is cool. So feel free to
                  message me on any of my social media or shoot me an{" "}
                  <a href="mailto:contact@drith.me">email.</a>
                </div>
                <div className="mt text-secondary-foreground ">
                  Don&apos;t be afraid to contact me!
                </div>
              </div>
              <div className="contact-list  mt-5 mb-20 flex gap-5 text-2xl md:text-3xl ">
                <a
                  href="https://www.instagram.com/adrielalfeus/"
                  className="text-accent-foreground hover:text-secondary-foreground"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://www.facebook.com/adrielalfeus/"
                  className="text-accent-foreground hover:text-secondary-foreground"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FiFacebook />
                </a>
                <a
                  href="https://www.linkedin.com/in/adrielalfeus/"
                  className="text-accent-foreground hover:text-secondary-foreground"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a
                  href="https://github.com/Drithh"
                  className="text-accent-foreground hover:text-secondary-foreground"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Github"
                >
                  <FiGithub />
                </a>
                <a
                  href="mailto:adrielafelsu@gmail.com"
                  className="text-accent-foreground hover:text-secondary-foreground"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Email"
                >
                  <FiMail />
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
