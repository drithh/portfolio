export const dynamic = "force-static";
export const revalidate = 86400;

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
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 sm:px-6">
        <Navbar />
        <main className="flex flex-col gap-24 pb-24 pt-4 sm:gap-32 sm:pt-8">
          <About />
          <TechStack />
          <WorkExperience />
          <ProjectsSection
            repositories={repositories}
            githubUsername={githubUsername}
          />
          <Contact />
        </main>
        <footer className="border-t border-border/60 py-8 text-center font-mono text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Adriel Alfeus Hutabarat. Built with
            Next.js, React & Tailwind CSS.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
