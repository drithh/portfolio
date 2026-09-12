# Repository Guidelines

## Project Overview

This repository is the personal portfolio website for Adriel Alfeus ([adriel.id](https://adriel.id)). It is a static single-page web application built with **Astro 5 (Static Site Generation)**, **Tailwind CSS v4** (via `@tailwindcss/vite`), and **TypeScript** (strict mode). The site showcases personal background, a categorized technology stack, interactive education and work timelines loaded from `content/cv.yaml`, and featured GitHub projects fetched at build time via the GitHub REST API.

The site is designed with a **Zero-Runtime Framework JS** philosophy: all pages, layouts, and presentational sections are compiled to 100% pure static HTML/CSS at build time, yielding instant loads, zero hydration overhead, and a 100/100 Lighthouse performance and accessibility score.

---

## Architecture & Data Flow

### High-Level Architecture

The application adopts pure static site generation with micro-interactions powered by native vanilla browser APIs:

```
                  ┌──────────────────────────────────────────────────┐
                  │            src/layouts/Layout.astro              │
                  │  - Geist Variable fonts (self-hosted /fonts)   │
                  │  - Early inline theme script (prevents FOUC)     │
                  │  - Ambient SVG noise background overlay          │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │             src/pages/index.astro                │
                  │  - Root static page orchestrator                 │
                  │  - Fetches GitHub repositories at build time     │
                  └─────────────────────────┬────────────────────────┘
                                            │
       ┌──────────────────┬─────────────────┼──────────────────┬─────────────────┐
       ▼                  ▼                 ▼                  ▼                 ▼
┌──────────────┐   ┌──────────────┐  ┌──────────────┐   ┌──────────────┐  ┌──────────────┐
│ Navbar.astro │   │ About.astro  │  │TechStack.ast │   │WorkExperience│  │ProjectsSect. │
│              │   │              │  │              │   │              │  │              │
│- Scroll spy  │   │- Bio text    │  │- Categorized │   │- Reads from  │  │- Static WebP │
│- Theme toggle│   │- CV download │  │  inlined SVG │   │  content/    │  │  previews    │
│  (vanilla JS)│   └──────────────┘  │  badges      │   │  cv.yaml     │  │- Spotlight   │
└──────────────┘                     └──────────────┘   └──────────────┘  └──────────────┘
```

### Server vs. Client Component Boundaries

- **Static Astro Components (Zero Framework JS)**:
  - `src/layouts/Layout.astro`: Base HTML shell with metadata, early theme script, and layout container.
  - `src/pages/index.astro`: Single-page orchestrator pre-fetching GitHub repo metadata at build time.
  - `src/components/About.astro`, `src/components/TechStack.astro`, `src/components/WorkExperience.astro`, `src/components/Experience.astro`, `src/components/ProjectsSection.astro`, `src/components/Project.astro`, `src/components/Contact.astro`: Pure static HTML templates.
- **Client Micro-Interactions (Native Vanilla APIs)**:
  - `src/components/DarkModeToggle.astro`: Semantic `<button id="theme-toggle">` driving hardware-accelerated CSS SVG mask transitions and synchronizing `.dark` on `document.documentElement` with `localStorage`.
  - `src/components/Navbar.astro`: Capsule navigation dock using `IntersectionObserver` to highlight the active section pill and calculate smooth scroll offsets.
  - `src/components/SpotlightScript.astro`: Passive `pointermove` listener updating `--mouse-x` and `--mouse-y` CSS custom properties on `.project-card` containers.

### Data Flow

1. **GitHub Repository Metadata**:
   - Hardcoded repository slugs are declared in `src/pages/index.astro` (`projectSlugs` array).
   - `src/lib/github.ts` queries the GitHub REST API at build time with error handling and rate-limit fallbacks.
   - Repositories are passed into `<ProjectsSection />` and rendered via `<Project />`.
   - Project preview thumbnails are resolved statically from `/public/projects/${repository.name}.webp`.
2. **Work & Education Experience**:
   - Source data resides in `content/cv.yaml` (RenderCV schema).
   - `src/lib/cv.ts` (`getCVExperienceData`) parses `content/cv.yaml` using `yaml`, formats date ranges (`YYYY-MM` to month names, `present` to `Present`), renders highlight Markdown formatting using `markdown-it`, and structures entries into categorized vertical sections (`Professional Experience`, `Freelance Experience`, `Internships & Initiatives`, `Education`).
   - `<WorkExperience />` renders the categorized sections via `<Experience />` using clean typography and minimalist layout.
3. **Single-Page Navigation**:
   - Navigation targets in-page IDs: `#about`, `#experience`, `#stack`, `#project`, and `#contact`.
   - Native `IntersectionObserver` in `src/components/Navbar.astro` observes window scroll position, highlights the active nav item, and animates smooth scrolling with top offsets.
   - Breakpoint rule: On screens $\le 420\text{px}$ (`ty` breakpoint), the `#experience` nav indicator is automatically hidden/bypassed.

---

## Key Directories

```
.
├── src/                  # Astro source root
│   ├── components/       # Astro UI sections, navigation, and theme components
│   ├── layouts/          # Base HTML layouts (Layout.astro)
│   ├── lib/              # Core utilities (GitHub API, cv.ts YAML parser, cn helper)
│   │   └── cv.ts         # Build-time YAML parser and date formatter for content/cv.yaml
│   ├── pages/            # File-based routing (index.astro)
│   ├── styles/           # Global styles and Tailwind CSS v4 theme tokens
│   │   └── global.css    # @import "tailwindcss", self-hosted fonts, HSL theme variables
│   └── types/            # TypeScript domain interfaces (cv.ts, repo.ts)
├── content/              # Content directory
│   └── cv.yaml           # CV data source rendered with RenderCV and loaded by WorkExperience
├── public/               # Static assets served at root path
│   ├── fonts/            # Self-hosted font files
│   ├── projects/         # Project preview screenshots (.webp format)
│   ├── adriel-alfeus.pdf # Downloadable resume PDF
│   └── avatar.png        # Profile avatar
└── [configs]             # astro.config.mjs, package.json, tsconfig.json, eslint.config.mjs
```

---

## Development Commands

All development commands should be executed via **pnpm**:

```bash
# Start development server (http://localhost:4321)
pnpm dev

# Create static production build in dist/
pnpm build

# Preview static production build locally
pnpm preview

# Run Astro component type checking and diagnostics
pnpm exec astro check

# Run TypeScript typecheck without emitting files
pnpm exec tsc --noEmit

# Run ESLint checks (eslint-plugin-astro)
pnpm run lint
```

---

## Code Conventions & Common Patterns

### 1. Path Aliases

`tsconfig.json` configures `@/*` to map strictly to `./src/*`:
```ts
// Correct:
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar.astro";
import type { Repository } from "@/types/repo";
```

### 2. Styling & Tailwind CSS v4

- Tailwind CSS v4 is integrated directly through `@tailwindcss/vite` in `astro.config.mjs`.
- Theme tokens and HSL color variables are declared in `src/styles/global.css`:
  - `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`.
- **Dark Mode**: Controlled via the `.dark` class on `document.documentElement` (`<html class="dark">`). Use standard `dark:` variants.
- **Custom Breakpoint `ty` (420px)**: Configured in `@theme` as `--breakpoint-ty: 420px;`. Use `ty:inline-flex` for ultra-compact mobile layouts below standard `sm: 640px`.

### 3. Fonts & Typography

- **Sans & Title**: Geist Variable (`@fontsource-variable/geist`), mapped to `--font-sans` and `--font-title`.
- **Mono**: Geist Mono Variable (`@fontsource-variable/geist-mono`), mapped to `--font-mono`.
- **Prose**: Use `prose prose-sm dark:prose-invert` for rendering Markdown bullet points.

### 4. Icons

- Use `astro-icon` with `@iconify-json/simple-icons` and `@iconify-json/feather`:
  ```astro
  ---
  import { Icon } from "astro-icon/components";
  ---
  <Icon name="simple-icons:go" class="h-4 w-4" aria-hidden="true" role="presentation" />
  <Icon name="feather:arrow-up-right" class="h-4 w-4" aria-hidden="true" />
  ```
- **Accessibility Rule**: Always specify `aria-hidden="true"` and `role="presentation"` on decorative technology and arrow icons to maintain 100% Lighthouse accessibility.

---

## Verification Pipeline for Changes

Every contribution, modification, or automated edit MUST pass the following three checks before completion:

1. **Astro Diagnostics**:
   ```bash
   pnpm exec astro check
   ```
2. **ESLint Linting**:
   ```bash
   pnpm run lint
   ```
3. **Production Static Build**:
   ```bash
   pnpm run build
   ```
