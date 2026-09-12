import { Project } from "./project";
import { Repository } from "../types/repo";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

interface ProjectsSectionProps {
  repositories: Repository[];
  githubUsername: string;
}

export const ProjectsSection = ({
  repositories,
  githubUsername,
}: ProjectsSectionProps) => {
  return (
    <section id="project" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          [04] // Featured Code
        </div>
        <h2 className="font-title text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          A couple of my favorite projects I have built alone or with someone.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {repositories.map((repository, index) => (
          <Project repository={repository} key={repository.id} index={index} />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <a
          href={`https://github.com/${githubUsername}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 px-5 py-3 font-mono text-sm text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-card hover:shadow-sm active:scale-[0.98]"
        >
          <FiGithub
            aria-hidden="true"
            className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground"
          />
          <span>Explore all repositories on GitHub</span>
          <FiArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </a>
      </div>
    </section>
  );
};
