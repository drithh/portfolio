import { FiDownload, FiArrowUpRight, FiMail } from "react-icons/fi";

export const About = () => {
  return (
    <section id="about" className="flex flex-col gap-8 pt-4 sm:pt-6">
      {/* Hero Header: Name + Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-balance font-title text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Adriel Alfeus Hutabarat
        </h1>
        <p className="font-mono text-sm tracking-tight text-muted-foreground sm:text-base">
          Software Engineer · Full-Stack &amp; Distributed Systems
        </p>
      </div>

      {/* Monospace Metadata Strip */}
      <div className="grid grid-cols-1 gap-2 rounded-xl border border-border/70 bg-card/40 p-3 font-mono text-xs text-muted-foreground sm:grid-cols-3 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="text-foreground/40">LOC //</span>
          <span className="font-medium text-foreground">Bekasi, Indonesia</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-foreground/40">EDU //</span>
          <span className="font-medium text-foreground">
            B.CS, Sebelas Maret Univ
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-foreground/40">FOCUS //</span>
          <span className="font-medium text-foreground">
            Web &amp; Distributed Services
          </span>
        </div>
      </div>

      {/* Bio Copy (Verbatim) */}
      <div className="flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-secondary-foreground sm:text-lg">
        <div className="font-mono text-sm text-muted-foreground">
          Ohh you found me?. Howdy!
        </div>
        <p className="text-pretty">
          My name is{" "}
          <span className="font-semibold text-foreground">
            Adriel Alfeus Hutabarat
          </span>
          , I&apos;m a Web Developer based in Bekasi, Indonesia. I graduated
          from Sebelas Maret University with a Bachelor of Computer Science.
        </p>
        <p className="text-pretty">
          I&apos;m passionate in the art of web development, both front-end and
          back-end. trying to learn every day for being more efficient and
          strong in becoming the best self.
        </p>
        <p className="text-pretty text-sm text-muted-foreground sm:text-base">
          In my spare time, I spend a lot of time doing things I enjoy, such as
          browsing memes on Reddit and Facebook and playing video games. One of
          the things I enjoy the most is watching movies. In particular, Science
          Fiction and Action movies hold my attention for a long time.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <a
          target="_blank"
          href="/adriel-alfeus.pdf"
          className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 font-sans text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
        >
          <FiDownload
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
          />
          <span>Download CV</span>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-secondary/30 px-4 py-2.5 font-sans text-sm font-medium text-foreground transition-all hover:border-foreground/20 hover:bg-secondary/70 active:scale-[0.98]"
        >
          <FiMail aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
          <span>Get in touch</span>
        </a>
        <a
          href="https://github.com/Drithh"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>github.com/Drithh</span>
          <FiArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
};
