import { Experience } from "./experience";
import { getCVExperienceData } from "../lib/cv";

export async function WorkExperience() {
  const sections = await getCVExperienceData();

  return (
    <section id="experience" className="flex w-full flex-col gap-12">
      <div className="flex flex-col gap-2">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          [03] // Track Record
        </div>
        <h2 className="font-title text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Experience &amp; Education
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          A timeline of professional roles, engineering milestones, and academic
          background.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {sections.map((section, secIndex) => (
          <div key={section.id} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-border/70 pb-3">
              <span className="font-mono text-xs text-muted-foreground">
                0{secIndex + 1}.
              </span>
              <h3 className="font-title text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {section.title}
              </h3>
            </div>
            <div className="flex flex-col">
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
