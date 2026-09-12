"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Repository } from "../types/repo";
import { FiArrowUpRight, FiStar } from "react-icons/fi";

interface ProjectProps {
  repository: Repository;
  index?: number;
}

const languageColors: Record<string, string> = {
  Go: "#00ADD8",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  PHP: "#4F5D95",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Vue: "#41B883",
  Rust: "#DEA584",
  Java: "#B07219",
  Shell: "#89E051",
  Dart: "#00B4AB",
  "C++": "#F34B7D",
  C: "#555555",
};

export function Project({ repository, index }: ProjectProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const convertProjectName = (projectName: string) => {
    const words = projectName.split("-");
    return words
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(" ");
  };

  const displayName = convertProjectName(repository.name || "");
  const indexStr =
    index !== undefined ? String(index + 1).padStart(2, "0") : null;
  const langColor = repository.language
    ? languageColors[repository.language] || "#8E8E93"
    : null;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay: (index ? index % 4 : 0) * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:bg-card/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] sm:p-5"
    >
      {/* Dynamic Cursor Spotlight Radial Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--spotlight-color, rgba(120, 120, 120, 0.12)), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Card Header: Index + Language / Stars + Link Icon */}
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {indexStr && <span>{indexStr}.</span>}
            {repository.language && (
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                <span
                  className="shadow-xs h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: langColor || undefined }}
                  aria-hidden="true"
                />
                <span>{repository.language}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {repository.stargazers_count > 0 && (
              <span className="inline-flex items-center gap-1">
                <FiStar aria-hidden="true" className="h-3 w-3" />
                {repository.stargazers_count}
              </span>
            )}
            <FiArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </div>
        </div>

        {/* Image Preview */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/60 bg-muted/20">
          <Image
            src={`/projects/${repository.name}.webp`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={displayName}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-title text-xl font-semibold tracking-tight text-foreground">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              className="focus:underline focus:outline-none"
            >
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              {displayName}
            </a>
          </h3>
          {repository.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-secondary-foreground">
              {repository.description}
            </p>
          )}
        </div>
      </div>

      {/* Topics */}
      {repository.topics && repository.topics.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-2">
          {repository.topics.slice(0, 4).map((topic: string) => (
            <span
              key={topic}
              className="rounded-md border border-border/50 bg-background/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {topic}
            </span>
          ))}
          {repository.topics.length > 4 && (
            <span className="px-1 py-0.5 font-mono text-[11px] text-muted-foreground/60">
              +{repository.topics.length - 4}
            </span>
          )}
        </div>
      )}
    </motion.article>
  );
}
