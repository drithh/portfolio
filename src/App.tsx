import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Project } from './components/Project';

function App() {
  const [theme, setTheme] = useState('light');

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
              <Project />
            </div>

            <div id="contact" className="section text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi, aut amet dicta iusto dolore ullam impedit dolorum et
              dolorem possimus ipsa itaque corrupti, deserunt reiciendis ab,
              expedita ducimus hic sint voluptatem illo laborum aliquam. Ipsa
              consequatur odit obcaecati sunt impedit repellendus debitis
              doloremque nemo accusamus fuga. Saepe laudantium iusto blanditiis,
              neque odit aliquid veniam eaque? Nihil rem totam velit eveniet cum
              ab, dicta ducimus. Corporis, autem voluptate vero architecto atque
              eius nobis ullam obcaecati blanditiis porro, quisquam reiciendis a
              pariatur quia. Quo eos tempore quidem soluta cupiditate alias
              dolor rem dignissimos non tenetur corporis deleniti laborum
              facilis ratione illum veritatis, autem vero laudantium mollitia
              nisi maiores aliquam voluptas et voluptatibus. Fuga perferendis
              error voluptatem vero ex rerum sequi doloremque? Repellendus animi
              voluptatum id saepe beatae rem temporibus esse eius aliquam harum,
              voluptates consequatur, inventore minus sit eum quo numquam
              maiores! Tempora molestias, eligendi modi reiciendis, culpa nemo
              sunt eaque fugiat quo architecto quisquam adipisci accusantium
              vel! Necessitatibus porro, voluptatem repudiandae voluptates nemo
              facere architecto consectetur recusandae iure ea quae, explicabo
              nulla aliquid nam totam soluta perspiciatis exercitationem dolor
              accusamus ad! Exercitationem laudantium earum ea officiis ut,
              nisi, soluta accusamus aliquam, aliquid molestiae dolorem
              accusantium blanditiis. Quas dolore commodi non hic!
            </div>
          </main>
          <footer className="footer mb-16 mt-32 h-32 w-full"></footer>
        </div>
      </div>
    </div>
  );
}

export default App;
