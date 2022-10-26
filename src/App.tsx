import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Project } from './components/Project';
import { Experience } from './components/Experience';
import {
  FiInstagram,
  FiFacebook,
  FiGithub,
  FiMail,
  FiLinkedin,
} from 'react-icons/fi';
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
} from 'react-icons/si';
import { SlGraduation } from 'react-icons/sl';
import { IoLogoNodejs, IoCodeSlash } from 'react-icons/io5';
import { RiVuejsLine } from 'react-icons/ri';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

function App() {
  const [theme, setTheme] = useState('light');
  const tech = [
    'HTML5',
    'CSS3',
    'TailwindCSS',
    'Javascript (ES6+)',
    'Typescript',
    'NodeJS',
    'React',
    'Vue',
    'PHP',
    'Laravel',
    'Python',
    'Git',
    'Mysql',
    'Postgresql',
    'Docker',
  ];
  const githubUsername = 'Drithh';
  const projects = [
    'rental-mobil',
    'invoice-website',
    'weather-bayes',
    'turing-machine',
  ];

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    }
  }, []);

  return (
    <div className={`App ${theme} `}>
      <div className="body bg-light-background text-light-text transition-all motion-reduce:transition-none dark:bg-dark-background  dark:text-dark-text">
        <div className="mx-auto flex min-h-screen max-w-[64rem] flex-col ">
          <Navbar theme={theme} setTheme={setTheme} />
          <main className="flex flex-col gap-8 px-4 md:text-xl text-lg">
            <section id="about" className="lg:mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-justify">
                <div className="mb-3 md:text-2xl text-xl text-light-text text-opacity-50  dark:text-dark-text">
                  Ohh you found me?. Howdy!
                </div>
                <div>
                  My name is{' '}
                  <span className="font-bold">Adriel Alfeus Hutabarat</span>,
                  I'm a Junior Web Developer based in Surakarta, Indonesia. I am
                  currently studying at the Sebelas Maret University, Majoring
                  in Computer Science
                </div>
                <div>
                  I'm passionate in the art of web development, both front-end
                  and back-end. trying to learn every day for being more
                  efficient and strong in becoming the best self.
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
                  className="flex gap-x-2 text-light-extra-transparent text-lg dark:text-dark-extra-transparent rounded-lg border-light-extra-transparent dark:border-dark-extra-transparent border w-fit px-4 py-2 hover:text-light-text dark:hover:text-dark-text hover:border-light-text dark:hover:border-dark-text transition-all motion-reduce:transition-none"
                >
                  <div className="text-[1.5rem]">
                    <HiOutlineDocumentDownload />
                  </div>
                  Download CV
                </a>
              </div>
              <div className="tech">
                <div className="title mb-4 mt-6 text-left font-title md:text-5xl text-4xl font-bold tracking-wide">
                  Stack
                </div>
                Here are few technologies that are cup of my{' '}
                <span className="line-through">coffee</span> tea
                <div className="mt-5 grid max-w-[48rem] grid-cols-2 gap-y-4 text-[1.7rem] text-light-transparent dark:text-dark-transparent md:grid-cols-3">
                  {tech.map((tech, index) => {
                    return (
                      <div
                        key={index}
                        className="tech flex items-center gap-x-3"
                      >
                        <div className="tech-icon ">
                          {tech === 'HTML5' && <SiHtml5 />}
                          {tech === 'CSS3' && <SiCss3 />}
                          {tech === 'TailwindCSS' && <SiTailwindcss />}
                          {tech === 'Javascript (ES6+)' && <SiJavascript />}
                          {tech === 'Typescript' && <SiTypescript />}
                          {tech === 'NodeJS' && <IoLogoNodejs />}
                          {tech === 'React' && <SiReact />}
                          {tech === 'Vue' && <RiVuejsLine />}
                          {tech === 'PHP' && <SiPhp />}
                          {tech === 'Laravel' && <SiLaravel />}
                          {tech === 'Python' && <SiPython />}
                          {tech === 'Git' && <SiGit />}
                          {tech === 'Mysql' && <SiMysql />}
                          {tech === 'Postgresql' && <SiPostgresql />}
                          {tech === 'Docker' && <SiDocker />}
                        </div>
                        <span className="tech-name font-title text-[1.05rem] font-light">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section id="experience" className="text-justify">
              <div className="title mb-4 mt-16 text-left font-title md:text-5xl text-4xl font-bold tracking-wide">
                Education & Work
              </div>
              <div className="flex flex-col mt-8">
                <Experience
                  icon={<IoCodeSlash />}
                  title="Internship"
                  date="Sep 2022 - Present"
                  description={
                    <>
                      <div className="">
                        Sebelas Maret University School ERP Project
                      </div>
                      <ul className="text-light-transparent dark:text-dark-transparent list-disc pl-6">
                        <li>
                          Developing Backoffice for School ERP Using Laravel
                        </li>
                        <li>Developing Backend for School ERP Using Golang</li>
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
                      <ul className="text-light-transparent dark:text-dark-transparent list-disc pl-6">
                        <li>
                          Designing UI Homepage for the website and mobile view
                        </li>
                        <li>
                          Implementing the UI design using Raw HTML, CSS, and JS
                        </li>
                        <li>
                          Improving User Experience by adding some animations
                        </li>
                      </ul>
                    </>
                  }
                />
                <Experience
                  icon={<SlGraduation />}
                  title="College"
                  date="July 2020 - Present"
                  description={
                    <>
                      <div className="">Sebelas Maret University</div>
                      <div className="text-light-transparent dark:text-dark-transparent">
                        Bachelor of Computer Science, Currently in 3rd year
                      </div>
                    </>
                  }
                />
              </div>
            </section>
            <section id="project" className="section text-justify mt-20">
              <div className="header mb-20 mt-4 flex flex-col place-content-center place-items-center gap-y-2">
                <div className="title  text-center font-title md:text-5xl text-4xl font-bold">
                  Projects
                </div>
                <div className="desc text-light-transparent dark:text-dark-transparent">
                  A couple of my favorite projects I have built alone or with
                  someone
                </div>
              </div>
              <div className="projects grid grid-cols-1 gap-16 md:grid-cols-2">
                {projects.map((project, index) => (
                  <Project
                    key={index}
                    githubUsername={githubUsername}
                    project={project}
                  />
                ))}
              </div>
              <div className="more mb-8 mt-16 flex place-content-center">
                <a
                  href={`https://github.com/${githubUsername}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="md:text-2xl text-xl text-light-extra-transparent hover:text-light-transparent dark:text-dark-extra-transparent hover:dark:text-dark-transparent"
                >
                  See more on Github
                </a>
              </div>
            </section>
            <section id="contact" className="section mb-20 text-justify">
              <div className="header mt-12 flex flex-col place-content-start place-items-start gap-y-2">
                <div className="title mb-4 text-left font-title md:text-5xl text-4xl font-bold tracking-wider">
                  Say Hi!
                </div>
                <div className="desc text-light-transparent dark:text-dark-transparent">
                  Though, I am fairly introverted myself. I do reply to messages
                  as long as my human interaction battery lasts. Coding, work,
                  or even useless stuff, anything is cool. So feel free to
                  message me on any of my social media or shoot me an{' '}
                  <a href="mailto:contact@drith.me">email.</a>
                </div>
                <div className="mt text-light-transparent dark:text-dark-transparent">
                  Don't be afraid to contact me!
                </div>
              </div>
              <div className="contact-list  mt-5 mb-20 flex gap-5 md:text-3xl text-2xl ">
                <a
                  href="https://www.instagram.com/adrielalfeus/"
                  className="text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://www.facebook.com/adrielalfeus/"
                  className="text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FiFacebook />
                </a>
                <a
                  href="https://www.linkedin.com/in/adrielalfeus/"
                  className="text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a
                  href="https://github.com/Drithh"
                  className="text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Github"
                >
                  <FiGithub />
                </a>
                <a
                  href="mailto:contact@drith.me"
                  className="text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent"
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
