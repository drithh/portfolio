import { Navbar } from "./components/navbar";
import { About } from "./components/about";
import { TechStack } from "./components/tech-stack";
import { WorkExperience } from "./components/work-experience";
import { ProjectsSection } from "./components/projects-section";
import { Contact } from "./components/contact";
import { getRepositories } from "./lib/github";

async function App() {
  const githubUsername = "Drithh";
  const projects = [
    "setalip-mono",
    "wisdoor-web",
    "e-commerce-website",
    "weather-bayes",
    "invoice-website",
    "car-rental",
    "turing-machine",
    "gumiwang",
    "emotion-prediction",
    "authentication-app",
  ];

  const repositories = await getRepositories(githubUsername, projects);

  return (
    <div className="App">
      <div className="body bg-background text-primary transition-all motion-reduce:transition-none">
        <div className="mx-auto flex min-h-screen max-w-[64rem] flex-col font-sans">
          <Navbar />
          <main className="flex flex-col gap-8 px-4 text-lg md:text-xl">
            <About />
            <TechStack />
            <WorkExperience />
            <ProjectsSection
              repositories={repositories}
              githubUsername={githubUsername}
            />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
