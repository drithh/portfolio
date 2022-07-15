import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';

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
          <div className="flex flex-col gap-8 px-4">
            <div id="about" className="texet">
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

            <div className="texet">
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

            <div id="experience" className="texet">
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

            <div id="project" className="texet">
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

            <div id="project" className="texet">
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

            <div id="contact" className="texet">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
