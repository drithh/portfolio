# Astro Zero-Runtime-JS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the personal portfolio from Next.js 16 to Astro, eliminating the ~450 KB client JavaScript framework runtime and delivering an instant-loading, 100/100 Lighthouse static website while strictly preserving design, typography, and content.

**Architecture:** Pure Astro static site generation (`output: 'static'`) with Vite. Content from `content/cv.yaml` and the GitHub REST API is loaded and transformed at build time into pure static HTML. Micro-interactivity (dark mode toggle, capsule scroll spy, card cursor spotlight, scroll reveals) is implemented with native vanilla browser APIs (`IntersectionObserver`, CSS custom properties, and `localStorage`) with zero runtime framework dependencies.

**Tech Stack:**
- Astro 5.x (`astro`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Icons via `astro-icon` (`@iconify-json/simple-icons`, `@iconify-json/feather`)
- Data & Markdown: `yaml`, `markdown-it`, `@types/markdown-it`
- Utilities: `clsx`, `tailwind-merge`
- Fonts: Geist (`@fontsource-variable/geist`, `@fontsource-variable/geist-mono`) or self-hosted fonts

## Global Constraints

- **Strict Content Preservation**: Keep all bio text, greetings, headlines, and personal copy verbatim ("still use the same content tho") from `content/cv.yaml` and `app/components/about.tsx`.
- **Zero Runtime Framework JS**: No React runtime (`react`, `react-dom`, `framer-motion`) in the client bundle. All components are `.astro` templates; client scripts use native browser APIs.
- **Lighthouse Standards**: Must maintain `lang="en"` on `<html>`, zero `<svg role="img">` without accessible names, and semantic `<button>` wrappers for interactive controls.
- **Asset Paths**: WebP preview images remain in `public/projects/*.webp`, CV in `public/adriel-alfeus.pdf`, and avatar in `public/avatar.png`.

---

### Task 1: Scaffolding Astro Dependencies & Configuration

**Files:**
- Create: `astro.config.mjs`
- Modify: `package.json`
- Modify: `tsconfig.json`

**Interfaces:**
- Consumes: Node.js & pnpm runtime
- Produces: Astro build environment with Vite Tailwind v4 integration and `@/*` alias mapping to `./src/*`

- [ ] **Step 1: Install Astro and migration dependencies**

Run:
```bash
pnpm add astro @tailwindcss/vite astro-icon @iconify-json/simple-icons @iconify-json/feather @fontsource-variable/geist @fontsource-variable/geist-mono
pnpm add -D @astrojs/check
```

- [ ] **Step 2: Create `astro.config.mjs`**

Write `astro.config.mjs`:
```javascript
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  output: "static",
  site: "https://adriel.id",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon({
      include: {
        "simple-icons": ["*"],
        feather: ["*"],
      },
    }),
  ],
});
```

- [ ] **Step 3: Update `tsconfig.json` for Astro**

Modify `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules", ".next"]
}
```

- [ ] **Step 4: Update npm scripts in `package.json`**

Update `scripts` in `package.json`:
```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "check": "astro check",
  "lint": "eslint ."
}
```

- [ ] **Step 5: Verify Astro CLI initializes**

Run: `pnpm exec astro --version`
Expected: Outputs Astro version (e.g. `astro v5.x.x`).

- [ ] **Step 6: Commit**

```bash
git add astro.config.mjs package.json tsconfig.json pnpm-lock.yaml
git commit -m "chore: scaffold Astro 5 with Vite Tailwind v4 and astro-icon"
```

---

### Task 2: Global Styles, Layout, and Utilities

**Files:**
- Create: `src/styles/global.css`
- Create: `src/lib/utils.ts`
- Create: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: Tailwind tokens and fonts
- Produces: `Layout.astro` declaring HTML document, `<head>`, metadata, theme script, noise overlay, and base CSS

- [ ] **Step 1: Create `src/lib/utils.ts`**

Write `src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

Write `src/styles/global.css`:
```css
@import "tailwindcss";
@import "@fontsource-variable/geist";
@import "@fontsource-variable/geist-mono";

@theme {
  --font-sans: "Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-title: "Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "Geist Mono Variable", ui-monospace, SFMono-Regular, monospace;

  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));

  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));

  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));

  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 26%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 93%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.75rem;
    --spotlight-color: rgba(0, 0, 0, 0.05);
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 5.5%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 5.5%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 13%;
    --secondary-foreground: 240 5% 75%;
    --muted: 240 3.7% 13%;
    --muted-foreground: 240 5% 55%;
    --accent: 240 3.7% 18%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 16%;
    --input: 240 3.7% 16%;
    --ring: 240 4.9% 83.9%;
    --spotlight-color: rgba(255, 255, 255, 0.12);
  }

  * {
    border-color: hsl(var(--border));
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
}
```

- [ ] **Step 3: Create `src/layouts/Layout.astro`**

Write `src/layouts/Layout.astro`:
```astro
---
import "../styles/global.css";

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Adriel Alfeus Hutabarat | Software Engineer",
  description = "Software Engineer specializing in Web Development, Distributed Systems, and High-Throughput APIs.",
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="description" content={description} />
    <title>{title}</title>

    {/* Inline Theme Script to prevent FOUC */}
    <script is:inline>
      const getTheme = () => {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
          return localStorage.getItem("theme");
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      };
      const theme = getTheme();
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    </script>
  </head>
  <body class="selection:bg-foreground selection:text-background min-h-screen bg-background text-foreground antialiased">
    {/* Ambient Texture Noise Overlay */}
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-50 opacity-[0.022] dark:opacity-[0.038]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    ></div>

    <slot />

    {/* Analytics (Lazy loaded after page interactive) */}
    <script
      is:inline
      async
      defer
      src="https://analytics.umami.is/script.js"
      data-website-id="37c6ea09-2eb8-4e44-abd5-71980ef5b207"
    ></script>
  </body>
</html>
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/lib/utils.ts src/layouts/Layout.astro
git commit -m "feat: add global styles, tailwind tokens, and base Astro layout"
```

---

### Task 3: Data Parsing & GitHub Fetch Pipelines

**Files:**
- Create: `src/types/cv.ts`
- Create: `src/types/repo.ts`
- Create: `src/lib/cv.ts`
- Create: `src/lib/github.ts`

**Interfaces:**
- Consumes: `content/cv.yaml` and GitHub REST API
- Produces: `getCVExperienceData()` returning `CVSectionGroup[]`, `getRepositories()` returning `Repository[]`

- [ ] **Step 1: Create `src/types/cv.ts` and `src/types/repo.ts`**

Copy the exact typed interfaces from `app/types/cv.ts` and `app/types/repo.ts` into `src/types/`.

- [ ] **Step 2: Create `src/lib/cv.ts`**

Port `app/lib/cv.ts` into `src/lib/cv.ts`:
```typescript
import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";
import MarkdownIt from "markdown-it";
import type {
  CVData,
  CVExperienceRawEntry,
  CVFormattedEntry,
  CVSectionGroup,
} from "../types/cv";

const md = new MarkdownIt({ html: true, linkify: true, breaks: false });

function formatCVDate(dateStr?: string): string {
  if (!dateStr) return "";
  const trimmed = dateStr.trim();
  if (trimmed.toLowerCase() === "present") return "Present";

  const parts = trimmed.split("-");
  if (parts.length === 2) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${months[monthIndex]} ${year}`;
    }
  }
  return trimmed;
}

function formatDateRange(start?: string, end?: string): string {
  const formattedStart = formatCVDate(start);
  const formattedEnd = formatCVDate(end);
  if (formattedStart && formattedEnd) return `${formattedStart} - ${formattedEnd}`;
  if (formattedStart) return formattedStart;
  if (formattedEnd) return formattedEnd;
  return "";
}

function renderHighlightsHTML(highlights?: string[]): string {
  if (!highlights || highlights.length === 0) return "";
  const markdownText = highlights.map((h) => `- ${h}`).join("\n");
  return md.render(markdownText);
}

export async function getCVExperienceData(): Promise<CVSectionGroup[]> {
  const filePath = path.join(process.cwd(), "content", "cv.yaml");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const data = yaml.parse(fileContent) as CVData;
  const sections = data?.cv?.sections || {};

  const mapEntries = (
    entries: CVExperienceRawEntry[] = [],
    isEducation = false,
  ): CVFormattedEntry[] => {
    return entries.map((entry) => {
      const title = isEducation
        ? entry.area || entry.degree || entry.institution || ""
        : entry.position || entry.company || "";
      const subtitle = isEducation
        ? entry.institution || ""
        : entry.company || "";
      const date = formatDateRange(entry.start_date, entry.end_date);
      const contentHTML = renderHighlightsHTML(entry.highlights);

      return { title, subtitle, date, contentHTML, raw: entry };
    });
  };

  const groups: CVSectionGroup[] = [
    {
      id: "professional",
      title: "Professional Experience",
      entries: mapEntries(sections["experience"] || []),
    },
    {
      id: "freelance",
      title: "Freelance Experience",
      entries: mapEntries(sections["freelance"] || []),
    },
    {
      id: "internships",
      title: "Internships & Initiatives",
      entries: mapEntries(sections["internships"] || []),
    },
    {
      id: "education",
      title: "Education",
      entries: mapEntries(sections["education"] || [], true),
    },
  ];

  return groups.filter((g) => g.entries.length > 0);
}
```

- [ ] **Step 3: Create `src/lib/github.ts`**

Write `src/lib/github.ts` with error handling and build-time fallback:
```typescript
import type { Repository } from "../types/repo";

export const fetchGithubData = async (
  githubUsername: string,
  project: string,
): Promise<Repository | undefined> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUsername}/${project}`,
      { headers: { "User-Agent": "Astro-Portfolio" } },
    );
    if (response.status === 200) {
      return (await response.json()) as Repository;
    }
  } catch (error) {
    console.warn(`GitHub API fetch failed for ${project}:`, error);
  }
  return undefined;
};

export const getRepositories = async (
  githubUsername: string,
  projects: string[],
): Promise<Repository[]> => {
  const repositories = await Promise.all(
    projects.map((project) => fetchGithubData(githubUsername, project)),
  );
  return repositories.filter((r): r is Repository => r !== undefined);
};
```

- [ ] **Step 4: Verify parsing via quick node runner**

Run: `node -e 'const { getCVExperienceData } = require("./src/lib/cv.ts");'` or test via tsx.

- [ ] **Step 5: Commit**

```bash
git add src/types/ src/lib/
git commit -m "feat: port CV YAML parser and GitHub API client"
```

---

### Task 4: Presentational Sections (About, TechStack, Experience, Projects, Contact)

**Files:**
- Create: `src/components/About.astro`
- Create: `src/components/TechStack.astro`
- Create: `src/components/Experience.astro`
- Create: `src/components/WorkExperience.astro`
- Create: `src/components/Project.astro`
- Create: `src/components/ProjectsSection.astro`
- Create: `src/components/Contact.astro`

**Interfaces:**
- Consumes: `Icon` from `astro-icon/components`, data from `cv.ts` and `github.ts`
- Produces: 100% static HTML components with zero client JavaScript

- [ ] **Step 1: Create `src/components/About.astro`**

Implement `src/components/About.astro` with verbatim bio copy, metadata grid, and `<Icon name="feather:download" />`, `<Icon name="feather:mail" />`, `<Icon name="feather:arrow-up-right" />`.

- [ ] **Step 2: Create `src/components/TechStack.astro`**

Implement `src/components/TechStack.astro` with 4 categories (Backend, Frontend, Databases, DevOps) using `<Icon name="simple-icons:..." aria-hidden="true" role="presentation" />`.

- [ ] **Step 3: Create `src/components/Experience.astro` and `src/components/WorkExperience.astro`**

Implement `Experience.astro` rendering a timeline node with vertical border, title, subtitle, date, and `contentHTML` (using `set:html={contentHTML}`). Wrap in `WorkExperience.astro` iterating over `getCVExperienceData()`.

- [ ] **Step 4: Create `src/components/Project.astro` and `src/components/ProjectsSection.astro`**

Implement `Project.astro` rendering repository language badge, stars, WebP preview `<img src={`/projects/${repository.name}.webp`} alt={displayName} loading="lazy" />`, and hover spotlight container.

- [ ] **Step 5: Create `src/components/Contact.astro`**

Implement `Contact.astro` with the verbatim copy and social links (Instagram, Facebook, LinkedIn, GitHub, Email) with `<Icon name="feather:..." />`.

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: implement static Astro presentation components"
```

---

### Task 5: Micro-Interactivity (Dark Mode Toggle, Capsule Navbar & Scroll-Spy)

**Files:**
- Create: `src/components/DarkModeToggle.astro`
- Create: `src/components/Navbar.astro`

**Interfaces:**
- Consumes: `<button>` elements, vanilla browser DOM APIs
- Produces: Fluid theme switching and scroll-spy tracking (< 2KB client JS total)

- [ ] **Step 1: Create `src/components/DarkModeToggle.astro`**

Write `src/components/DarkModeToggle.astro` containing the sun/moon SVG with CSS transition on `transform`, `opacity`, and mask circles, and a scoped `<script>`:
```astro
---
interface Props {
  size?: number;
}
const { size = 18 } = Astro.props;
---

<button
  id="theme-toggle"
  type="button"
  aria-label="Toggle theme"
  class="flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
>
  <svg
    id="theme-toggle-svg"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="cursor-pointer transition-transform duration-500 ease-out"
  >
    <defs>
      <mask id="theme-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
        <circle id="theme-mask-circle" r="9" fill="black" cx="100%" cy="0%" class="transition-all duration-500 ease-out"></circle>
      </mask>
    </defs>
    <circle
      id="theme-center-circle"
      cx="12"
      cy="12"
      r="5"
      fill="#D97706"
      mask="url(#theme-mask)"
      class="transition-all duration-500 ease-out"
    ></circle>
    <g id="theme-rays" stroke="currentColor" class="transition-opacity duration-300 ease-out">
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </g>
  </svg>
</button>

<script is:inline>
  const updateToggleUI = (isDark) => {
    const svg = document.getElementById("theme-toggle-svg");
    const maskCircle = document.getElementById("theme-mask-circle");
    const centerCircle = document.getElementById("theme-center-circle");
    const rays = document.getElementById("theme-rays");

    if (!svg || !maskCircle || !centerCircle || !rays) return;

    if (isDark) {
      svg.style.transform = "rotate(40deg)";
      maskCircle.setAttribute("cx", "50%");
      maskCircle.setAttribute("cy", "23%");
      centerCircle.setAttribute("r", "9");
      centerCircle.setAttribute("fill", "#FCD34D");
      rays.style.opacity = "0";
    } else {
      svg.style.transform = "rotate(90deg)";
      maskCircle.setAttribute("cx", "100%");
      maskCircle.setAttribute("cy", "0%");
      centerCircle.setAttribute("r", "5");
      centerCircle.setAttribute("fill", "#D97706");
      rays.style.opacity = "1";
    }
  };

  const initToggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    updateToggleUI(isDark);

    const btn = document.getElementById("theme-toggle");
    btn?.addEventListener("click", () => {
      const currentlyDark = document.documentElement.classList.contains("dark");
      const nextDark = !currentlyDark;
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      updateToggleUI(nextDark);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggle);
  } else {
    initToggle();
  }
</script>
```

- [ ] **Step 2: Create `src/components/Navbar.astro`**

Implement `src/components/Navbar.astro` with avatar brand link, capsule navigation dock, and `<DarkModeToggle />`. Include a client `<script>` with `IntersectionObserver` that highlights active nav pills when sections cross viewport thresholds and smoothly scrolls with header offset.

- [ ] **Step 3: Add card spotlight cursor listener**

In `src/pages/index.astro` or a dedicated client script, attach a passive `pointermove` listener to `.project-card` elements to update `--mouse-x` and `--mouse-y`.

- [ ] **Step 4: Commit**

```bash
git add src/components/DarkModeToggle.astro src/components/Navbar.astro
git commit -m "feat: add vanilla dark mode toggle and scroll-spy navbar"
```

---

### Task 6: Main Entry Page & Legacy Next.js Cutover

**Files:**
- Create: `src/pages/index.astro`
- Delete: `app/`
- Delete: `next.config.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: All components from `src/components/` and data from `src/lib/`
- Produces: Complete static single-page portfolio index

- [ ] **Step 1: Create `src/pages/index.astro`**

Write `src/pages/index.astro`:
```astro
---
import Layout from "../layouts/Layout.astro";
import Navbar from "../components/Navbar.astro";
import About from "../components/About.astro";
import TechStack from "../components/TechStack.astro";
import WorkExperience from "../components/WorkExperience.astro";
import ProjectsSection from "../components/ProjectsSection.astro";
import Contact from "../components/Contact.astro";
import { getRepositories } from "../lib/github";

const githubUsername = "Drithh";
const projectSlugs = [
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

const repositories = await getRepositories(githubUsername, projectSlugs);
const currentYear = new Date().getFullYear();
---

<Layout>
  <div class="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
    <div class="mx-auto flex min-h-screen max-w-4xl flex-col px-4 sm:px-6">
      <Navbar />
      <main class="flex flex-col gap-24 pb-24 pt-4 sm:gap-32 sm:pt-8">
        <About />
        <TechStack />
        <WorkExperience />
        <ProjectsSection repositories={repositories} githubUsername={githubUsername} />
        <Contact />
      </main>
      <footer class="border-t border-border/60 py-8 text-center font-mono text-xs text-muted-foreground">
        <p>© {currentYear} Adriel Alfeus Hutabarat. Built with Astro & Tailwind CSS.</p>
      </footer>
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Clean cutover of legacy Next.js files and packages**

Remove Next.js dependencies from `package.json`:
- Remove `next`, `next-themes`, `framer-motion`, `react`, `react-dom`, `@types/react`, `@types/react-dom`.
Delete legacy directories:
```bash
rm -rf app next.config.js
```

- [ ] **Step 3: Run `pnpm install` to prune lockfile**

Run: `pnpm install`
Expected: Lockfile pruned of Next.js / React 19 dependencies.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro package.json pnpm-lock.yaml
git rm -rf app next.config.js
git commit -m "feat: complete cutover to Astro single-page portfolio"
```

---

### Task 7: Build Verification & Bundle Audit

**Files:**
- Read: `dist/index.html`
- Modify: `AGENTS.md` (update documentation to reflect Astro stack)

**Interfaces:**
- Consumes: Entire Astro codebase
- Produces: Validated production build in `dist/`

- [ ] **Step 1: Run TypeScript typecheck**

Run: `pnpm exec astro check && pnpm exec tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Run production build**

Run: `pnpm run build`
Expected: Static build completes successfully; outputs static files to `dist/`.

- [ ] **Step 3: Verify static HTML content and accessibility**

Inspect `dist/index.html`:
- Verify `<html lang="en">` is present.
- Verify zero `<svg role="img">` without accessible names.
- Verify total client JavaScript files in `dist/` is `< 5 KB`.

- [ ] **Step 4: Update `AGENTS.md` repository guidelines**

Update `AGENTS.md` to document Astro 5 architecture, `pnpm dev`, `pnpm build`, and directory structure.

- [ ] **Step 5: Final commit**

```bash
git add AGENTS.md
git commit -m "docs: update AGENTS.md for Astro 5 architecture"
```
