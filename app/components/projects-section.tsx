import { Project } from "./project";
import { Repository } from "../types/repo";

interface ProjectsSectionProps {
  repositories: Repository[];
  githubUsername: string;
}

export const ProjectsSection = ({ repositories, githubUsername }: ProjectsSectionProps) => {
  return (
    <section id="project" className="section mt-20 text-justify">
      <div className="header mb-20 mt-4 flex flex-col place-content-center place-items-center gap-y-2">
        <div className="title text-center font-title text-4xl font-bold md:text-5xl">
          Projects
        </div>
        <div className="desc text-secondary-foreground">
          A couple of my favorite projects I have built alone or with someone
        </div>
      </div>
      <div className="projects grid grid-cols-1 gap-16 md:grid-cols-2">
        {repositories.map((repository) => (
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
  );
};
