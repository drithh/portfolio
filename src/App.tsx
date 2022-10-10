import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Project } from './components/Project';
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
import { IoLogoNodejs } from 'react-icons/io5';
import { RiVuejsLine } from 'react-icons/ri';

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
      <div className="body bg-light-background text-light-text transition-all dark:bg-dark-background  dark:text-dark-text">
        <div className="mx-auto flex min-h-screen max-w-[64rem] flex-col ">
          <Navbar theme={theme} setTheme={setTheme} />
          <main className="flex flex-col gap-8 px-4 text-xl">
            <section id="about" className="mt-12 flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-justify">
                <div className="mb-3 text-2xl text-light-text text-opacity-50 dark:text-dark-text">
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
                  In my spare time, I like to relax with a bit of old-fashioned
                  fun. I browse the latest memes on Reddit and Facebook, as well
                  as playing video games. One of the things I enjoy the most is
                  watching movies. In particular, Science Fiction and Action
                  movies hold my attention for a long time.
                </div>
              </div>
              <div className="tech">
                <div className="title mb-4 mt-6 text-left font-title text-5xl font-bold tracking-wide">
                  Stack
                </div>
                <div className="title my-4 text-left font-title text-5xl font-bold tracking-wide"></div>
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
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, aut amet dicta iusto dolore ullam impedit dolorum et
                dolorem possimus ipsa itaque corrupti, deserunt reiciendis ab,
                expedita ducimus hic sint voluptatem illo laborum aliquam. Ipsa
                consequatur odit obcaecati sunt impedit repellendus debitis
                doloremque nemo accusamus fuga. Saepe laudantium iusto
                blanditiis, neque odit aliquid veniam eaque? Nihil rem totam
                velit eveniet cum ab, dicta ducimus. Corporis, autem voluptate
                vero architecto atque eius nobis ullam obcaecati blanditiis
                porro, quisquam reiciendis a pariatur quia. Quo eos tempore
                quidem soluta cupiditate alias dolor rem dignissimos non tenetur
                corporis deleniti laborum facilis ratione illum veritatis, autem
                vero laudantium mollitia nisi maiores aliquam voluptas et
                voluptatibus. Fuga perferendis error voluptatem vero ex rerum
                sequi doloremque? Repellendus animi voluptatum id saepe beatae
                rem temporibus esse eius aliquam harum, voluptates consequatur,
                inventore minus sit eum quo numquam maiores! Tempora molestias,
                eligendi modi reiciendis, culpa nemo sunt eaque fugiat quo
                architecto quisquam adipisci accusantium vel! Necessitatibus
                porro, voluptatem repudiandae voluptates nemo facere architecto
                consectetur recusandae iure ea quae, explicabo nulla aliquid nam
                totam soluta perspiciatis exercitationem dolor accusamus ad!
                Exercitationem laudantium earum ea officiis ut, nisi, soluta
                accusamus aliquam, aliquid molestiae dolorem accusantium
                blanditiis. Quas dolore commodi non hic!
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, aut amet dicta iusto dolore ullam impedit dolorum et
                dolorem possimus ipsa itaque corrupti, deserunt reiciendis ab,
                expedita ducimus hic sint voluptatem illo laborum aliquam. Ipsa
                consequatur odit obcaecati sunt impedit repellendus debitis
                doloremque nemo accusamus fuga. Saepe laudantium iusto
                blanditiis, neque odit aliquid veniam eaque? Nihil rem totam
                velit eveniet cum ab, dicta ducimus. Corporis, autem voluptate
                vero architecto atque eius nobis ullam obcaecati blanditiis
                porro, quisquam reiciendis a pariatur quia. Quo eos tempore
                quidem soluta cupiditate alias dolor rem dignissimos non tenetur
                corporis deleniti laborum facilis ratione illum veritatis, autem
                vero laudantium mollitia nisi maiores aliquam voluptas et
                voluptatibus. Fuga perferendis error voluptatem vero ex rerum
                sequi doloremque? Repellendus animi voluptatum id saepe beatae
                rem temporibus esse eius aliquam harum, voluptates consequatur,
                inventore minus sit eum quo numquam maiores! Tempora molestias,
                eligendi modi reiciendis, culpa nemo sunt eaque fugiat quo
                architecto quisquam adipisci accusantium vel! Necessitatibus
                porro, voluptatem repudiandae voluptates nemo facere architecto
                consectetur recusandae iure ea quae, explicabo nulla aliquid nam
                totam soluta perspiciatis exercitationem dolor accusamus ad!
                Exercitationem laudantium earum ea officiis ut, nisi, soluta
                accusamus aliquam, aliquid molestiae dolorem accusantium
                blanditiis. Quas dolore commodi non hic!
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, aut amet dicta iusto dolore ullam impedit dolorum et
                dolorem possimus ipsa itaque corrupti, deserunt reiciendis ab,
                expedita ducimus hic sint voluptatem illo laborum aliquam. Ipsa
                consequatur odit obcaecati sunt impedit repellendus debitis
                doloremque nemo accusamus fuga. Saepe laudantium iusto
                blanditiis, neque odit aliquid veniam eaque? Nihil rem totam
                velit eveniet cum ab, dicta ducimus. Corporis, autem voluptate
                vero architecto atque eius nobis ullam obcaecati blanditiis
                porro, quisquam reiciendis a pariatur quia. Quo eos tempore
                quidem soluta cupiditate alias dolor rem dignissimos non tenetur
                corporis deleniti laborum facilis ratione illum veritatis, autem
                vero laudantium mollitia nisi maiores aliquam voluptas et
                voluptatibus. Fuga perferendis error voluptatem vero ex rerum
                sequi doloremque? Repellendus animi voluptatum id saepe beatae
                rem temporibus esse eius aliquam harum, voluptates consequatur,
                inventore minus sit eum quo numquam maiores! Tempora molestias,
                eligendi modi reiciendis, culpa nemo sunt eaque fugiat quo
                architecto quisquam adipisci accusantium vel! Necessitatibus
                porro, voluptatem repudiandae voluptates nemo facere architecto
                consectetur recusandae iure ea quae, explicabo nulla aliquid nam
                totam soluta perspiciatis exercitationem dolor accusamus ad!
                Exercitationem laudantium earum ea officiis ut, nisi, soluta
                accusamus aliquam, aliquid molestiae dolorem accusantium
                blanditiis. Quas dolore commodi non hic!
              </div>
            </section>
            <section id="project" className="section text-justify">
              <div className="header mb-20 mt-4 flex flex-col place-content-center place-items-center gap-y-2">
                <div className="title  text-center font-title text-5xl font-bold">
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
                  className="text-2xl text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent"
                >
                  See more on Github
                </a>
              </div>
            </section>
            <section id="contact" className="section mb-20 text-justify">
              <div className="header mt-12 flex flex-col place-content-start place-items-start gap-y-2">
                <div className="title mb-4 text-left font-title text-5xl font-bold tracking-wider">
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
              <div className="contact-list  mt-5 mb-20 flex gap-5 text-3xl text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent">
                <a
                  href="https://www.instagram.com/adrielalfeus/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://www.facebook.com/aalfeus1/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FiFacebook />
                </a>
                <a
                  href="https://www.linkedin.com/in/adrielalfeus/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a
                  href="https://github.com/Drithh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Github"
                >
                  <FiGithub />
                </a>
                <a
                  href="mailto:contact@drith.me"
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
