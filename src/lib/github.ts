import type { Repository } from "../types/repo";

export const fetchGithubData = async (
  githubUsername: string,
  project: string,
): Promise<Repository | undefined> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUsername}/${project}`,
      { headers: { "User-Agent": "Astro-Portfolio" } },
    );
    if (response.status === 200) {
      return (await response.json()) as Repository;
    }
  } catch (error) {
    console.warn(`GitHub API fetch failed for ${project}:`, error);
  }
  return undefined;
};

export const getRepositories = async (
  githubUsername: string,
  projects: string[],
): Promise<Repository[]> => {
  const repositories = await Promise.all(
    projects.map((project) => fetchGithubData(githubUsername, project)),
  );
  return repositories.filter((r): r is Repository => r !== undefined);
};
