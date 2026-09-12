"use client";
import * as React from "react";
import { motion } from "framer-motion";
import {
  SiMysql,
  SiLaravel,
  SiDocker,
  SiReact,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiGit,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiPython,
  SiFastapi,
  SiGo,
  SiCloudflare,
  SiNestjs,
  SiAstro,
  SiRabbitmq,
  SiNatsdotio,
  SiRedis,
  SiExpress,
  SiPuppeteer,
  SiGraphql,
  SiElasticsearch,
  SiVite,
} from "react-icons/si";
import { DiGoogleCloudPlatform } from "react-icons/di";
import { IoLogoNodejs } from "react-icons/io5";
import { RiNextjsLine, RiOpenaiLine, RiVuejsLine } from "react-icons/ri";
import { TbBrandGoogle } from "react-icons/tb";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface TechCategory {
  id: string;
  title: string;
  description: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    id: "backend",
    title: "Backend & Distributed Systems",
    description:
      "High-throughput APIs, event-driven messaging, and microservices.",
    items: [
      { name: "Go", icon: <SiGo /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Node.js", icon: <IoLogoNodejs /> },
      { name: "Python", icon: <SiPython /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "NestJS", icon: <SiNestjs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "PHP / Laravel", icon: <SiLaravel /> },
      { name: "NATS", icon: <SiNatsdotio /> },
      { name: "RabbitMQ / BullMQ", icon: <SiRabbitmq /> },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Interfaces",
    description: "Accessible, performant, and reactive user interfaces.",
    items: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <RiNextjsLine /> },
      { name: "Vue", icon: <RiVuejsLine /> },
      { name: "Astro", icon: <SiAstro /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "TanStack Query", icon: <SiReact /> },
      { name: "Vite", icon: <SiVite /> },
      { name: "HTML5 / CSS3", icon: <SiHtml5 /> },
    ],
  },
  {
    id: "data",
    title: "Databases & Caching",
    description: "Relational, spatial, and in-memory data structures.",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "Elasticsearch", icon: <SiElasticsearch /> },
      { name: "GraphQL", icon: <SiGraphql /> },
    ],
  },
  {
    id: "devops",
    title: "Cloud & Developer Tooling",
    description: "Containerization, edge delivery, and automation.",
    items: [
      { name: "Docker", icon: <SiDocker /> },
      { name: "Cloudflare", icon: <SiCloudflare /> },
      { name: "Google Cloud Platform", icon: <DiGoogleCloudPlatform /> },
      { name: "Git", icon: <SiGit /> },
      { name: "Puppeteer", icon: <SiPuppeteer /> },
      { name: "OpenAI / LLMs", icon: <RiOpenaiLine /> },
    ],
  },
];

export const TechStack = () => {
  return (
    <section id="stack" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          [02] // Technical Repertoire
        </div>
        <h2 className="font-title text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          Stack
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base">
          Here are few technologies that are cup of my{" "}
          <span className="line-through">coffee</span> tea.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {techCategories.map((category, catIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.45,
              delay: catIndex * 0.08,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="group border-border/70 bg-card/40 hover:border-foreground/20 hover:bg-card/70 flex flex-col justify-between rounded-xl border p-5 transition-all duration-200"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-mono text-xs">
                  0{catIndex + 1}.
                </span>
              </div>
              <h3 className="font-title text-foreground text-lg font-semibold tracking-tight">
                {category.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="border-border/60 bg-background/60 text-secondary-foreground hover:border-foreground/30 hover:text-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="text-foreground/70 text-sm"
                  >
                    {React.isValidElement(item.icon)
                      ? React.cloneElement(
                          item.icon as React.ReactElement<Record<string, unknown>>,
                          {
                            role: "presentation",
                            "aria-hidden": "true",
                            focusable: "false",
                          },
                        )
                      : item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
