# CV.yaml-Driven Experience Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the portfolio experience section to source directly from `content/cv.yaml`, displaying four clean vertical categories (Professional Experience, Freelance Experience, Internships & Initiatives, Education) using minimal, icon-free typography.

**Architecture:** A server-side loader (`app/lib/cv.ts`) parses `content/cv.yaml` using the `yaml` package and formats dates and markdown highlights with `markdown-it`. The async Server Component `app/components/work-experience.tsx` groups and renders these entries into `<Experience />` timeline items using clean borders and typography without icons.

**Tech Stack:** Next.js 15 (App Router, RSC), React 19, TypeScript 5, Tailwind CSS 3.4, `yaml`, `markdown-it`, Bun runtime.

## Global Constraints

- Package manager & runtime: **Bun** (`bun add`, `bun run`).
- Zero icons or emojis in the experience section: use typography and subtle vertical border rails.
- Single source of truth: `content/cv.yaml` must be the sole data source for work and education experience.
- TypeScript: strict mode, `@/*` maps to `./app/*`.

---

### Task 1: Install `yaml` Dependency & Create TypeScript Interfaces

**Files:**
- Modify: `package.json`
- Create: `app/types/cv.ts`

**Interfaces:**
- Produces: `CVExperienceRawEntry`, `CVFormattedEntry`, `CVSectionGroup`, `CVData` in `app/types/cv.ts`

- [ ] **Step 1: Install `yaml` using Bun**

Run:
```bash
bun add yaml
```

- [ ] **Step 2: Create `app/types/cv.ts`**

Write `app/types/cv.ts`:
```ts
export interface CVExperienceRawEntry {
  company?: string;
  institution?: string;
  position?: string;
  area?: string;
  degree?: string;
  start_date: string;
  end_date: string;
  location?: string;
  summary?: string;
  highlights?: string[];
}

export interface CVFormattedEntry {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  highlights: string[];
}

export interface CVSectionGroup {
  id: string;
  title: string;
  entries: CVFormattedEntry[];
}

export interface CVData {
  cv: {
    name: string;
    headline: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    sections: {
      summary?: string[];
      professional_experience?: CVExperienceRawEntry[];
      freelance_experience?: CVExperienceRawEntry[];
      internships_and_initiatives?: CVExperienceRawEntry[];
      education?: CVExperienceRawEntry[];
      core_competencies?: Array<{ label: string; details: string }>;
    };
  };
}
```

- [ ] **Step 3: Verify TypeScript compilation**

Run:
```bash
bun run tsc --noEmit
```
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock app/types/cv.ts
git commit -m "feat(cv): install yaml package and define cv types"
```

---

### Task 2: Implement Server-Side `cv.yaml` Loader (`app/lib/cv.ts`)

**Files:**
- Create: `app/lib/cv.ts`

**Interfaces:**
- Consumes: `CVData`, `CVExperienceRawEntry`, `CVFormattedEntry`, `CVSectionGroup` from `app/types/cv.ts`
- Produces: `getCVExperienceData(): Promise<CVSectionGroup[]>`

- [ ] **Step 1: Implement `app/lib/cv.ts`**

Write `app/lib/cv.ts`:
```ts
import { promises as fs } from "fs";
import path from "path";
import yaml from "yaml";
import MarkdownIt from "markdown-it";
import {
  CVData,
  CVExperienceRawEntry,
  CVFormattedEntry,
  CVSectionGroup,
} from "../types/cv";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const monthNames: Record<string, string> = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export function formatSingleDate(dateStr: string): string {
  if (!dateStr) return "";
  const trimmed = dateStr.trim();
  if (trimmed.toLowerCase() === "present") return "Present";

  const match = trimmed.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    const [, year, month] = match;
    const monthName = monthNames[month] || month;
    return `${monthName} ${year}`;
  }

  return trimmed;
}

export function formatCVDateRange(start: string, end: string): string {
  const formattedStart = formatSingleDate(start);
  const formattedEnd = formatSingleDate(end);
  if (!formattedStart && !formattedEnd) return "";
  if (!formattedEnd) return formattedStart;
  if (!formattedStart) return formattedEnd;
  return `${formattedStart} – ${formattedEnd}`;
}

export function formatHighlight(highlight: string): string {
  return md.renderInline(highlight);
}

export function mapRawEntryToFormatted(entry: CVExperienceRawEntry): CVFormattedEntry {
  const title = entry.company || entry.institution || "";
  let subtitle = "";
  if (entry.position) {
    subtitle = entry.position;
  } else if (entry.degree && entry.area) {
    subtitle = `${entry.degree} in ${entry.area}`;
  } else if (entry.degree) {
    subtitle = entry.degree;
  } else if (entry.area) {
    subtitle = entry.area;
  }

  const date = formatCVDateRange(entry.start_date, entry.end_date);
  const highlights = (entry.highlights || []).map(formatHighlight);

  return {
    title,
    subtitle,
    date,
    location: entry.location,
    highlights,
  };
}

export async function getCVExperienceData(): Promise<CVSectionGroup[]> {
  try {
    const filePath = path.join(process.cwd(), "content/cv.yaml");
    const rawContent = await fs.readFile(filePath, "utf8");
    const parsed = yaml.parse(rawContent) as CVData;
    const sections = parsed?.cv?.sections;

    if (!sections) return [];

    const groups: CVSectionGroup[] = [
      {
        id: "professional",
        title: "Professional Experience",
        entries: (sections.professional_experience || []).map(mapRawEntryToFormatted),
      },
      {
        id: "freelance",
        title: "Freelance Experience",
        entries: (sections.freelance_experience || []).map(mapRawEntryToFormatted),
      },
      {
        id: "internships",
        title: "Internships & Initiatives",
        entries: (sections.internships_and_initiatives || []).map(mapRawEntryToFormatted),
      },
      {
        id: "education",
        title: "Education",
        entries: (sections.education || []).map(mapRawEntryToFormatted),
      },
    ];

    return groups.filter((g) => g.entries.length > 0);
  } catch (error) {
    console.error("Error loading CV experience data:", error);
    return [];
  }
}
```

- [ ] **Step 2: Run verification script to test parser output**

Run:
```bash
bun -e 'import { getCVExperienceData } from "./app/lib/cv"; const data = await getCVExperienceData(); console.log(JSON.stringify(data.map(g => ({ title: g.title, count: g.entries.length, sample: g.entries[0]?.title })), null, 2));'
```
Expected: Outputs 4 groups:
- Professional Experience (3 entries, sample: PT Cakra Jala Teknologi)
- Freelance Experience (3 entries, sample: Itemgame)
- Internships & Initiatives (3 entries, sample: Sebelas Maret University School ERP Project)
- Education (1 entry, sample: Sebelas Maret University)

- [ ] **Step 3: Verify TypeScript compilation**

Run:
```bash
bun run tsc --noEmit
```
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add app/lib/cv.ts
git commit -m "feat(cv): implement server-side cv.yaml parser and date formatter"
```

---

### Task 3: Redesign `app/components/experience.tsx` (No Icons, Pure Typography)

**Files:**
- Modify: `app/components/experience.tsx`

**Interfaces:**
- Consumes: `CVFormattedEntry` fields (`title`, `subtitle`, `date`, `highlights`)
- Produces: `Experience` component

- [ ] **Step 1: Rewrite `app/components/experience.tsx`**

Replace `app/components/experience.tsx` with:
```tsx
import React from "react";
import { CVFormattedEntry } from "../types/cv";

interface ExperienceProps {
  entry: CVFormattedEntry;
}

export const Experience = ({ entry }: ExperienceProps) => {
  const { title, subtitle, date, highlights } = entry;

  return (
    <div className="relative flex border-l-2 border-accent-foreground/25 pl-6 sm:pl-8 pb-8 last:pb-2">
      <div className="flex flex-col gap-y-1.5 w-full">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4">
          <div className="text-xl font-bold text-secondary-foreground">
            {title}
          </div>
          <div className="text-sm font-medium text-accent-foreground whitespace-nowrap">
            {date}
          </div>
        </div>

        {subtitle && (
          <div className="text-base font-semibold text-accent-foreground">
            {subtitle}
          </div>
        )}

        {highlights.length > 0 && (
          <ul className="mt-2 list-disc pl-5 space-y-1.5 text-base text-secondary-foreground leading-relaxed">
            {highlights.map((highlight, index) => (
              <li
                key={index}
                className="[&>strong]:font-semibold [&>strong]:text-secondary-foreground"
                dangerouslySetInnerHTML={{ __html: highlight }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
bun run tsc --noEmit
```
Expected: Notice errors may only appear in `app/components/work-experience.tsx` until Task 4 connects them.

- [ ] **Step 3: Commit**

```bash
git add app/components/experience.tsx
git commit -m "refactor(experience): redesign experience item with clean typography and no icons"
```

---

### Task 4: Redesign `app/components/work-experience.tsx` with Grouped Sections

**Files:**
- Modify: `app/components/work-experience.tsx`

**Interfaces:**
- Consumes: `getCVExperienceData` from `app/lib/cv.ts`, `Experience` from `app/components/experience.tsx`
- Produces: `WorkExperience` Server Component

- [ ] **Step 1: Rewrite `app/components/work-experience.tsx`**

Replace `app/components/work-experience.tsx` with:
```tsx
import { Experience } from "./experience";
import { getCVExperienceData } from "../lib/cv";

export async function WorkExperience() {
  const sections = await getCVExperienceData();

  return (
    <section id="experience" className="text-justify">
      <h2 className="title mb-4 mt-16 text-left font-title text-4xl font-bold tracking-wide md:text-5xl">
        Education & Work
      </h2>

      <div className="mt-8 flex flex-col gap-y-10">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col">
            <h3 className="mb-6 text-left font-title text-2xl font-bold text-secondary-foreground tracking-tight">
              {section.title}
            </h3>
            <div className="flex flex-col ml-1">
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
```

- [ ] **Step 2: Verify TypeScript compilation**

Run:
```bash
bun run tsc --noEmit
```
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/work-experience.tsx
git commit -m "feat(experience): render grouped vertical categories from cv.yaml"
```

---

### Task 5: End-to-End Build Verification & Documentation Update

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Run Next.js linting**

Run:
```bash
pnpm exec next lint
# or: bun x next lint
```
Expected: PASS with 0 warnings/errors.

- [ ] **Step 2: Run Production Build**

Run:
```bash
bun run build
```
Expected: Build successfully completes and statically generates all pages including `/`.

- [ ] **Step 3: Update `AGENTS.md` and document `app/lib/cv.ts`**

Update `AGENTS.md` Important Files table and data flow to note that `app/components/work-experience.tsx` now loads directly from `content/cv.yaml` via `app/lib/cv.ts`.

- [ ] **Step 4: Verify git status and commit**

Run:
```bash
git status
git add AGENTS.md
git commit -m "docs: update AGENTS.md with cv.yaml data flow and loader"
```
