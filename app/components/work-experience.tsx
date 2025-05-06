"use client";

import { allWorks } from "contentlayer/generated";
import { Experience } from "./experience";
import { IoCodeSlash } from "react-icons/io5";
import { SlGraduation } from "react-icons/sl";
import { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";

const iconMap = {
  code: <IoCodeSlash />,
  graduation: <SlGraduation />,
} as const;

const components: MDXComponents = {
  // Add any custom MDX components here if needed
};

export const WorkExperience = () => {
  const sortedWorks = [...allWorks].sort((a, b) => {
    // Sort by sortnum in descending order (highest first)
    const sortNumA = a.sortnum || 0;
    const sortNumB = b.sortnum || 0;
    return sortNumB - sortNumA;
  });

  return (
    <section id="experience" className="text-justify">
      <div className="title mb-4 mt-16 text-left font-title text-4xl font-bold tracking-wide md:text-5xl">
        Education & Work
      </div>
      <div className="mt-8 flex flex-col">
        {sortedWorks.map((work) => {
          const MDXContent = useMDXComponent(work.body.code);

          return (
            <Experience
              key={work.slug}
              icon={iconMap[work.icon as keyof typeof iconMap]}
              title={work.title}
              date={work.date}
              description={
                <div>
                  <div className="">{work.company}</div>
                  <div className="prose prose-sm prose-h4:text-secondary-foreground dark:prose-invert max-w-none font-sans text-lg font-medium text-secondary-foreground">
                    <MDXContent components={components} />
                  </div>
                </div>
              }
            />
          );
        })}
      </div>
    </section>
  );
};
