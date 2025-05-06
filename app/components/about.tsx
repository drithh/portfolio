import { HiOutlineDocumentDownload } from "react-icons/hi";

export const About = () => {
  return (
    <section id="about" className="flex flex-col gap-6 lg:mt-8">
      <div className="flex flex-col gap-2 text-justify">
        <div className="mb-3 text-xl text-primary text-opacity-50 md:text-2xl">
          Ohh you found me?. Howdy!
        </div>
        <div>
          My name is <span className="font-bold">Adriel Alfeus Hutabarat</span>,
          I&apos;m a Web Developer based in Bekasi, Indonesia. I just graduated
          from Sebelas Maret University with a Bachelor of Computer Science.
        </div>
        <div>
          I&apos;m passionate in the art of web development, both front-end and
          back-end. trying to learn every day for being more efficient and strong
          in becoming the best self.
        </div>
        <div>
          In my spare time, I spend a lot of time doing things I enjoy, such as
          browsing memes on Reddit and Facebook and playing video games. One of the
          things I enjoy the most is watching movies. In particular, Science
          Fiction and Action movies hold my attention for a long time.
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
    </section>
  );
};
