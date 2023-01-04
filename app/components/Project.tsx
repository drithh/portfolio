import { useEffect, useState } from 'react';

export const Project = (props: { githubUsername: string; project: string }) => {
  const { githubUsername, project } = props;
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const convertProjectName = (projectName: string) => {
    const words = projectName.split('-');
    return words
      .map((word) => {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      })
      .join(' ');
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${githubUsername}/${project}`
        );
        const data = await response.json();
        setProjectData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjectData();
  }, [githubUsername, project]);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="project flex flex-col gap-y-2">
      <div className="thumbnail mb-4 transition duration-300 ease-in-out hover:z-0 hover:scale-[1.025]">
        <img
          src={`/projects/${project}.webp`}
          alt={project}
          className="w-full rounded-3xl"
        />
      </div>
      <a
        href={projectData.html_url}
        target="_blank"
        className="title font-title md:text-2xl text-xl font-bold hover:underline"
        rel="noreferrer"
      >
        {convertProjectName(project)}
      </a>
      <div className="desc texl-bg text-light-transparent dark:text-dark-transparent">
        {projectData?.description}
      </div>
      <div className="techs flex flex-row gap-x-2">
        {projectData?.topics.map((topic: string, index: number) => (
          <div
            key={index}
            className="tech rounded-full border border-solid border-dark-background py-1 px-3 text-sm  dark:border-light-background"
          >
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
};
