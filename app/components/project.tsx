import Image from "next/image";
import { Repository } from "../types/repo";

export function Project(props: { repository: Repository }) {
  const { repository } = props;

  const convertProjectName = (projectName: string) => {
    const words = projectName.split("-");
    return words
      .map((word) => {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      })
      .join(" ");
  };

  return (
    <div className="project flex flex-col gap-y-2">
      <div className="thumbnail mb-4 transition duration-300 ease-in-out hover:z-0 hover:scale-[1.025]">
        <Image
          src={`/projects/${repository.name}.webp`}
          width={800}
          height={450}
          alt={repository.name}
          className="w-full rounded-xl"
        />
      </div>
      <a
        href={repository.html_url}
        target="_blank"
        className="title font-title text-xl font-semibold hover:underline md:text-2xl"
        rel="noreferrer"
      >
        {convertProjectName(repository.name || "")}
      </a>
      <div className="desc texl-bg text-secondary-foreground">
        {repository.description || ""}
      </div>
      <div className="techs flex flex-row flex-wrap gap-2">
        {repository.topics.map((topic: string, index: number) => (
          <div
            key={index}
            className="tech rounded-full border border-solid border-border py-1 px-3 text-sm"
          >
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}
