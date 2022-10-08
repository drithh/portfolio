import { ProjectItem } from './ProjectItem';

export const Project = () => {
  const githubUsername = 'Drithh';
  const projects = [
    'rental-mobil',
    'invoice-website',
    'weather-bayes',
    'turing-machine',
  ];
  return (
    <>
      <div className="header mb-20 mt-4 flex flex-col place-content-center place-items-center gap-y-2">
        <div className="title  text-center font-title text-5xl font-bold">
          Projects
        </div>
        <div className="desc text-light-transparent dark:text-dark-transparent">
          A couple of my favorite projects I have built alone or with someone
        </div>
      </div>
      <div className="projects grid grid-cols-1 gap-x-16 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            githubUsername={githubUsername}
            project={project}
          />
        ))}
      </div>
    </>
  );
};
