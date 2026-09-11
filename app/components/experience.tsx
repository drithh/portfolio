import React from "react";
import { CVFormattedEntry } from "../types/cv";

interface ExperienceProps {
  entry: CVFormattedEntry;
}

export const Experience = ({ entry }: ExperienceProps) => {
  const { title, subtitle, date, contentHTML } = entry;

  return (
    <div className="relative mt-4 flex w-full">
      <div className="flex w-full flex-col gap-y-2 border-l-accent-foreground sm:ml-[0.9rem] sm:border-l-2 sm:pl-[2.1rem] pb-8 last:pb-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4">
          <div className="title text-xl font-bold text-foreground md:text-2xl">
            {title}
          </div>
          <div className="date text-sm font-normal text-accent-foreground whitespace-nowrap md:text-base">
            {date}
          </div>
        </div>

        {subtitle && (
          <div className="text-lg text-secondary-foreground">
            {subtitle}
          </div>
        )}

        {contentHTML && (
          <div className="desc w-full text-justify text-secondary-foreground">
            <div
              className="prose prose-sm prose-h4:text-secondary-foreground dark:prose-invert w-full max-w-none font-sans text-lg text-justify text-secondary-foreground"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
