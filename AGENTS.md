# Repository Guidelines

## Project Overview

This repository is the personal portfolio website for Adriel Alfeus ([adriel.id](https://adriel.id)). It is a single-page web application built with **Next.js 15 (App Router)**, **React 19**, **TypeScript 5 (strict mode)**, and **Tailwind CSS 3.4**. The site showcases personal background, a categorized technology stack, interactive education and work timelines loaded from `content/cv.yaml`, and featured GitHub projects fetched via the GitHub REST API.

---

## Architecture & Data Flow

### High-Level Architecture

The application adopts a hybrid Server/Client component architecture powered by the Next.js 15 App Router:

```
                  ┌──────────────────────────────────────────────────┐
                  │            app/layout.tsx (Server)               │
                  │  - Inter & GT Walsheim fonts                     │
                  │  - ThemeProvider (next-themes)                   │
                  │  - Pwa client registrar (app/pwa.tsx)            │
                  │  - Umami Analytics & Vercel Analytics / Speed    │
                  └─────────────────────────┬────────────────────────┘
                                            │
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │             app/page.tsx (Server)                │
                  │  - Root async Server Component                   │
                  │  - Defines projects list & fetches GitHub data   │
                  └─────────────────────────┬────────────────────────┘
                                            │
       ┌──────────────────┬─────────────────┼──────────────────┬─────────────────┐
       ▼                  ▼                 ▼                  ▼                 ▼
┌──────────────┐   ┌──────────────┐  ┌──────────────┐   ┌──────────────┐  ┌──────────────┐
│    Navbar    │   │    About     │  │  TechStack   │   │WorkExperience│  │ProjectsSect. │
│(Client Comp.)│   │(Server Comp.)│  │(Server Comp.)│   │(Server Comp.)│  │(Server Comp.)│
│              │   │              │  │              │   │              │  │              │
│- Scroll spy  │   │- Bio text    │  │- Categorized │   │- Reads from  │  │- Renders     │
│- Framer pill │   │- CV download │  │  icon grid   │   │  content/    │  │  GitHub repos│
│- Dark toggle │   └──────────────┘  └──────────────┘   │  cv.yaml     │  │- WebP images │
└──────────────┘                                        └──────────────┘  └──────────────┘
```

### Server vs. Client Component Boundaries

- **React Server Components (RSC)**: Default for page and content presentation.
  - `app/page.tsx`: Top-level async page orchestrator.
  - `app/components/work-experience.tsx`: Async RSC executing Node.js filesystem I/O (`fs.promises`) via `app/lib/cv.ts` to parse `content/cv.yaml`.
  - `app/components/about.tsx`, `app/components/tech-stack.tsx`, `app/components/projects-section.tsx`, `app/components/experience.tsx`, `app/components/project.tsx`, `app/components/contact.tsx`: Pure presentational components.
- **Client Components (`"use client"`)**: Strictly isolated to interactive browser features.
  - `app/components/navbar.tsx`, `app/components/nav-item.tsx`, `app/components/background-navbar.tsx`: Scroll-spy tracking, viewport measurements, and Framer Motion layout animations.
  - `app/components/dark-mode-toggle.tsx`: Interactive SVG physics morphing using `@react-spring/web` and `useTheme`.
  - `app/components/theme-provider.tsx`: Context provider for `next-themes`.
  - `app/pwa.tsx`: Client lifecycle listener registering `/sw.js`.
  - `app/lib/window-dimension.ts`: Client hook listening to `window.resize`.

### Data Flow

1. **GitHub Repository Metadata**:
   - Hardcoded repository slugs are declared in `app/page.tsx` (`projects` array).
   - `app/lib/github.ts` queries the GitHub REST API (`https://api.github.com/repos/{githubUsername}/{project}`) in parallel using `Promise.all`.
   - Repositories are passed into `<ProjectsSection />` and rendered via `<Project />`.
   - Project preview thumbnails are resolved statically from `/public/projects/${repository.name}.webp`.
2. **Work & Education Experience**:
   - Source data resides in `content/cv.yaml` (RenderCV schema).
   - `app/lib/cv.ts` (`getCVExperienceData`) parses `content/cv.yaml` using `yaml`, formats date ranges (`YYYY-MM` to month names, `present` to `Present`), renders highlight Markdown formatting using `markdown-it`, and structures entries into categorized vertical sections (`Professional Experience`, `Freelance Experience`, `Internships & Initiatives`, `Education`).
   - `<WorkExperience />` renders the categorized sections via `<Experience />` using clean typography and minimalist layout.
3. **Single-Page Navigation**:
   - Navigation targets in-page IDs: `#about`, `#experience`, `#project`, and `#contact`.
   - `app/hooks/use-scroll-spy.ts` observes window scroll position, highlights the active nav item, and animates smooth scrolling with top offsets.
   - Breakpoint rule: On screens $\le 420\text{px}$ (`ty` breakpoint), the `#experience` nav indicator is automatically hidden/bypassed.

---

## Key Directories

```
.
├── app/                  # Next.js App Router root (pages, layouts, styles, PWA)
│   ├── components/       # UI sections, navigation, and theme components
│   ├── hooks/            # Custom React hooks (useScrollSpy)
│   ├── lib/              # Core utilities (GitHub API, cv.ts YAML parser, MDX loader, cn helper)
│   │   └── cv.ts         # Server-side YAML parser and date formatter for content/cv.yaml
│   ├── types/            # TypeScript domain interfaces (cv.ts, Repository, Work)
│   │   └── cv.ts         # TypeScript schema and types for RenderCV cv.yaml
│   ├── globals.css       # Global styles, @font-face rules, HSL theme tokens
│   ├── layout.tsx        # HTML document root, font definitions, providers
│   ├── page.tsx          # Single-page entry point and data orchestrator
│   └── pwa.tsx           # Client service worker registration component
├── content/              # Content directory
│   ├── cv.yaml           # CV data source rendered with RenderCV and loaded by WorkExperience
│   └── work/             # (Legacy) MDX files with YAML frontmatter for work/education
├── public/               # Static assets served at root path
│   ├── fonts/            # Self-hosted GT Walsheim OpenType font family (.otf)
│   ├── projects/         # Project preview screenshots (.webp format)
│   ├── manifest.json     # PWA Web App Manifest
│   ├── sw.js             # Workbox Service Worker script
│   └── avatar.png        # Profile avatar
└── [configs]             # package.json, tsconfig.json, tailwind.config.js, etc.
```

---

## Development Commands

All development commands should be executed via **pnpm** (primary) or **bun**.

```bash
# Start development server (http://localhost:3000)
pnpm dev

# Create production build (runs TypeScript typecheck and ESLint automatically)
pnpm build

# Start production server
pnpm start

# Bun-based predeploy build
pnpm predeploy
# or: bun run build

# Run TypeScript typecheck without emitting files
pnpm exec tsc --noEmit

# Run Next.js ESLint checks
pnpm exec next lint

# Check code formatting and Tailwind class ordering
pnpm exec prettier --check .

# Auto-format files and sort Tailwind CSS classes
pnpm exec prettier --write .
```

> **Note on `pnpm export`**: The script `"export": "next build && next export"` in `package.json` uses a command deprecated and removed in Next.js 14/15. Do not rely on `next export`; Next.js static exports now require `output: 'export'` in `next.config.js`.

---

## Code Conventions & Common Patterns

### 1. Path Aliases

`tsconfig.json` and `components.json` configure `@/*` to map strictly to `./app/*`:
```ts
// Correct:
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Repository } from "@/types/repo";

// Incorrect (there is no src/ directory):
import { cn } from "@/src/lib/utils";
```

### 2. Class Merging & Tailwind Styling

- Use `cn()` from `@/lib/utils` (wraps `clsx` and `tailwind-merge`):
  ```tsx
  import { cn } from "@/lib/utils";

  export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("rounded-lg border bg-card text-card-foreground p-4", className)} {...props} />;
  }
  ```
- **Tailwind CSS Variables**: Colors are defined as HSL tokens in `app/globals.css` and mapped in `tailwind.config.js` (`bg-background`, `text-secondary-foreground`, `text-accent-foreground`, `bg-card`, `border-border`).
- **Dark Mode**: Activated via `.dark` class (`darkMode: ["class"]`) controlled by `next-themes`. Use `dark:` variants (e.g. `dark:prose-invert`, `dark:bg-slate-900`).
- **Custom Breakpoint `ty` (420px)**: Use `ty:` prefix for ultra-compact mobile layouts below standard `sm: 640px` (e.g. `ty:px-4`, `ty:text-lg`).
- **Class Ordering**: `prettier-plugin-tailwindcss` is configured. Always maintain standard utility order when writing classes or run `prettier --write`.

### 3. Fonts & Typography

- **Headings & Titles**: Use `font-title` (maps to Google Font `Inter` via `--font-title` in `app/layout.tsx`).
- **Body & Sans**: Use `font-sans` (maps to self-hosted `GT Walsheim` defined in `app/globals.css`).
- **Markdown Prose**: Use `prose prose-sm dark:prose-invert` for rendering raw HTML generated from MDX.

### 4. Component Patterns

- **Server vs Client**:
  - Add `"use client";` at the very top of files that use React hooks (`useState`, `useEffect`, `useRef`), browser APIs (`window`, `navigator`), or animations (`framer-motion`, `@react-spring/web`).
  - Keep components Server Components if they only render props or perform server-side data fetching.
- **Hydration Guards for Theming**:
  - `<html>` in `app/layout.tsx` includes `suppressHydrationWarning` to allow `next-themes` theme injection without console mismatch warnings.
  - Interactive theme components (like `DarkModeToggle`) guard against mismatch using mounted state:
    ```tsx
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    ```

### 5. Animation Conventions

- **Framer Motion (`framer-motion`)**:
  - Use `layoutId` for shared layout spring transitions across elements (e.g. active navigation pill in `app/components/nav-item.tsx`):
    ```tsx
    <motion.div
      layoutId="selected"
      className="absolute inset-0 rounded-full bg-secondary"
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
    ```
  - Use `useScroll` and `useTransform` for scroll-driven coordinate and opacity transforms (see `app/components/background-navbar.tsx`).
- **React Spring (`@react-spring/web`)**:
  - Reserved for fine-grained physics SVG attribute morphing (see `app/components/dark-mode-toggle.tsx`).

### 6. Content & MDX Conventions

When adding a work or education milestone in `content/work/<slug>.mdx`:
1. Use standard Markdown format with YAML frontmatter delimiters (`---`).
2. Strictly supply the following frontmatter properties:
   ```yaml
   ---
   title: "Role or Degree Title"
   company: "Company or Institution Name"
   date: "Start Date - End Date"
   icon: "code" # Only 'code' (IoCodeSlash) or 'graduation' (SlGraduation)
   sortnum: 10  # Integer: higher numbers appear first (descending sort)
   type: "Work"
   ---

   - Accomplishment or course bullet 1
   - Accomplishment or course bullet 2
   ```

### 7. Adding Featured Projects

When adding a new repository to featured projects:
1. Append the repository name to the `projects` array in `app/page.tsx`:
   ```ts
   const projects = [
     "setalip-mono",
     // ...
     "new-repo-name",
   ];
   ```
2. **Mandatory Asset**: Add an optimized WebP thumbnail screenshot at `public/projects/<new-repo-name>.webp`. `app/components/project.tsx` renders this image dynamically via Next.js `<Image src={`/projects/${repository.name}.webp`} />`.

### 8. Error Handling & Invariants

- **API Failure Fallbacks**: `fetchGithubData` wraps fetch requests in `try/catch` and returns `undefined` on non-200 responses. `getRepositories` filters out `undefined` entries to prevent page crashes.
- **Filesystem Fallbacks**: `getCVExperienceData` in `app/lib/cv.ts` reads and parses `content/cv.yaml`, returning structured section groups. `getWorkContent` in `app/lib/mdx.ts` wraps `fs.readdir` in `try/catch` and returns `[]` on error.
- **`next.config.js` Anomaly**: Currently `next.config.js` instantiates `withPWAInit` but does not export it (`module.exports = ...` is absent). If modifying Next.js configuration, be aware that Next.js is currently running on default configuration.

---

## Important Files

| File Path | Description |
|-----------|-------------|
| `app/page.tsx` | Main page entry point (RSC); defines project repository list, fetches data, and composes sections. |
| `app/layout.tsx` | Root HTML layout; configures fonts (`Inter`), `ThemeProvider`, Umami, Vercel Analytics, and Speed Insights. |
| `app/pwa.tsx` | Client component handling service worker registration (`/sw.js`). |
| `app/globals.css` | Global styles, `@font-face` rules for `GT Walsheim`, and light/dark theme CSS variables. |
| `app/lib/cv.ts` | Server-side YAML parser and date formatter for `content/cv.yaml`; provides `getCVExperienceData`. |
| `app/lib/github.ts` | GitHub REST API client functions (`fetchGithubData`, `getRepositories`). |
| `app/lib/mdx.ts` | Server-side MDX reader using `gray-matter` and `markdown-it`; defines `WorkFrontmatter` and `Work` types. |
| `app/lib/utils.ts` | Shared `cn()` helper combining `clsx` and `tailwind-merge`. |
| `app/types/cv.ts` | TypeScript domain interfaces for `content/cv.yaml` (`CVData`, `CVExperienceRawEntry`, `CVFormattedEntry`, `CVSectionGroup`). |
| `app/hooks/use-scroll-spy.ts` | Window scroll spy hook for active section tracking and smooth scrolling. |
| `app/components/navbar.tsx` | Sticky navbar coordinating scroll spy, profile avatar, theme toggle, and background animations. |
| `app/components/work-experience.tsx` | Async Server Component loading directly from `content/cv.yaml` via `app/lib/cv.ts` and rendering grouped vertical experience sections. |
| `app/components/projects-section.tsx` | Projects grid container rendering project cards and GitHub profile link. |
| `content/work/*.mdx` | Markdown files storing work and education timeline entries. |
| `content/cv.yaml` | RenderCV source YAML used to generate downloadable PDF and loaded directly by `app/components/work-experience.tsx`. |
| `tailwind.config.js` | Tailwind CSS v3 configuration (fonts, custom `ty` breakpoint, HSL color tokens, animations). |
| `components.json` | Shadcn UI configuration defining `@/components` and `@/lib/utils` path aliases. |
| `tsconfig.json` | TypeScript compiler configuration (strict mode, `@/*` path mapping). |
| `next.config.js` | Next.js configuration file. |
| `public/manifest.json` | Web App Manifest for PWA installation. |

---

## Runtime/Tooling Preferences

- **Primary Package Manager**: **pnpm** (pinned in `package.json` to `pnpm@9.12.3`). Primary lockfile is `pnpm-lock.yaml`.
- **Secondary / Build Runtime**: **Bun** (`bun.lock` is present; `pnpm predeploy` calls `bun run build`).
- **Node.js Compatibility**: Requires Node.js $\ge 18.18.0$ (Next.js 15 baseline). `@types/node` is set to `^22.14.1`.
- **TypeScript**: TypeScript 5 (`^5.4.2`). Strict mode enabled. Target is `es5`, module resolution is `node`.
- **UI Framework**: React 19 (`^19.0.0`) and Next.js 15 (`^15.0.0`).
- **Icons**: Use `react-icons` (`react-icons/si`, `react-icons/io5`, `react-icons/sl`, `react-icons/fi`, etc.) for icons across sections. Avoid adding duplicate icon packages.

---

## Testing & QA

### Current State

The repository currently contains **0 automated test files** and no preconfigured test runner (such as Jest or Vitest). Quality assurance relies on static analysis, compiler type verification, and build validation.

### Verification Pipeline for Changes

Every contribution, modification, or automated edit MUST pass the following three checks before completion:

1. **TypeScript Typecheck**:
   ```bash
   pnpm exec tsc --noEmit
   ```
   Ensures zero type errors under TypeScript strict mode.
2. **ESLint Linting**:
   ```bash
   pnpm exec next lint
   ```
   Validates code against `next/core-web-vitals`, React hooks rules, and accessibility standards.
3. **Production Build**:
   ```bash
   pnpm run build
   ```
   Verifies that static analysis, compilation, and page generation succeed without runtime errors.

### Guidelines for Adding Tests

If introducing automated testing to the repository:
- **Unit & Component Testing**: Use **Vitest** with `@testing-library/react` and `jsdom` (preferred over Jest for React 19 and ESM compatibility). Place tests adjacent to the source code (e.g. `app/lib/__tests__/mdx.test.ts` or `app/components/__tests__/navbar.test.tsx`).
- **End-to-End Testing**: Use **Playwright** (`@playwright/test`) targeting the local Next.js dev server (`http://localhost:3000`).
