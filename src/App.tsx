import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Project } from './components/Project';
import {
  FiInstagram,
  FiFacebook,
  FiGithub,
  FiMail,
  FiLinkedin,
} from 'react-icons/fi';

function App() {
  const [theme, setTheme] = useState('light');

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
            <About />

            <div id="experience" className="section text-justify">
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
            </div>

            <div id="project" className="section text-justify">
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
            </div>

            <div id="contact" className="section mb-20 text-justify">
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
              <div className="contact-list  mt-5 mb-20 flex gap-5">
                <a
                  href="https://www.instagram.com/adrielalfeus/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiInstagram className="text-3xl text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent" />
                </a>
                <a
                  href="https://www.facebook.com/aalfeus1/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiFacebook className="text-3xl text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent" />
                </a>
                <a
                  href="https://www.linkedin.com/in/adrielalfeus/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiLinkedin className="text-3xl text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent" />
                </a>
                <a
                  href="https://github.com/Drithh"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiGithub className="text-3xl text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent" />
                </a>
                <a
                  href="mailto:contact@drith.me"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiMail className="text-3xl text-dark-background hover:text-light-transparent dark:text-light-background hover:dark:text-dark-transparent" />
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
