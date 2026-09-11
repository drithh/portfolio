"use client";
import React from "react";
import { motion } from "framer-motion";
import { CVFormattedEntry } from "../types/cv";

interface ExperienceProps {
  entry: CVFormattedEntry;
}

export const Experience = ({ entry }: ExperienceProps) => {
  const { title, subtitle, date, contentHTML } = entry;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative ml-1 flex w-full border-l border-border/80 pb-8 pl-6 transition-colors last:pb-2 sm:ml-2 sm:pl-8"
    >
      <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-border bg-background transition-colors duration-200 group-hover:border-foreground group-hover:bg-foreground" />

      <div className="flex w-full flex-col gap-1.5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h4 className="font-title text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {title}
          </h4>
          <span className="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground sm:text-sm">
            {date}
          </span>
        </div>

        {subtitle && (
          <div className="text-sm font-medium text-foreground/80 sm:text-base">
            {subtitle}
          </div>
        )}

        {contentHTML && (
          <div className="mt-2 w-full text-left text-secondary-foreground">
            <div
              className="prose prose-sm w-full max-w-none text-left font-sans text-sm leading-relaxed text-secondary-foreground dark:prose-invert prose-strong:text-foreground prose-ul:my-1.5 prose-li:my-0.5 sm:text-base"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
