import { Experience } from "./experience";
import { getCVExperienceData } from "../lib/cv";

export async function WorkExperience() {
  const sections = await getCVExperienceData();

  return (
    <section id="experience" className="w-full">
      <div className="mt-16 flex flex-col gap-y-12">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col">
            <h2 className="title mb-6 text-left font-title text-3xl font-bold tracking-wide text-secondary-foreground md:text-4xl">
              {section.title}
            </h2>
            <div className="ml-1 flex flex-col">
              {section.entries.map((entry, index) => (
                <Experience key={`${entry.title}-${index}`} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
