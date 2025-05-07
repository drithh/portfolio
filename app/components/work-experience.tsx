import { Experience } from "./experience";
import { IoCodeSlash } from "react-icons/io5";
import { SlGraduation } from "react-icons/sl";
import { getWorkContent } from "../lib/mdx";

const iconMap = {
  code: <IoCodeSlash />,
  graduation: <SlGraduation />,
} as const;

export async function WorkExperience() {
  const works = await getWorkContent();

  return (
    <section id="experience" className="text-justify">
      <div className="title mb-4 mt-16 text-left font-title text-4xl font-bold tracking-wide md:text-5xl">
        Education & Work
      </div>
      <div className="mt-8 flex flex-col">
        {works.map((work) => (
          <Experience
            key={work.slug}
            icon={iconMap[work.frontmatter.icon]}
            title={work.frontmatter.title}
            date={work.frontmatter.date}
            description={
              <div>
                <div className="">{work.frontmatter.company}</div>
                <div 
                  className="prose prose-sm prose-h4:text-secondary-foreground dark:prose-invert max-w-none font-sans text-lg font-medium text-secondary-foreground"
                  dangerouslySetInnerHTML={{ __html: work.content }}
                />
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
}
