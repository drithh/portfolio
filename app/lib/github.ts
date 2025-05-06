import { Repository } from "../types/repo";

export const fetchGithubData = async (
  githubUsername: string,
  project: string,
) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUsername}/${project}`,
    );
    if (response.status !== 200) {
      console.log("Error fetching data");
    } else {
      return (await response.json()) as Repository;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRepositories = async (
  githubUsername: string,
  projects: string[],
) => {
  const repositories = await Promise.all(
    projects.map(async (project) => {
      return await fetchGithubData(githubUsername, project);
    }),
  ).then((data) => data.flatMap((d) => (d !== undefined ? [d] : [])));

  return repositories;
};
