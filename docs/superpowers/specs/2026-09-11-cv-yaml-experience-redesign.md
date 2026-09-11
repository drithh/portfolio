# Design Specification: CV.yaml-Driven Experience Section Redesign

- **Date**: 2026-09-11
- **Status**: Approved
- **Author**: AI Assistant & Adriel Alfeus

---

## 1. Context & Motivation

The portfolio's current experience section (`app/components/work-experience.tsx`) relies on legacy, disjoint `.mdx` files in `content/work/*.mdx`. This setup suffered from several issues:
1. **Data Drift**: The authoritative CV source of truth is now `content/cv.yaml` (rendered into PDF via RenderCV at `public/adriel-alfeus.pdf`), causing the website to become outdated.
2. **Missing Latest Roles**: The website lacks the current position at **PT Cakra Jala Teknologi** (Jan 2026 – Present).
3. **Monolithic Timeline**: The previous UI mixed education, freelance projects, campus events, and full-time jobs into a single flat list without category hierarchy.

This project updates the experience section to source directly from `content/cv.yaml`, restructuring the display into four clean vertical categories matching the structure of `public/adriel-alfeus.pdf` with minimal, icon-free typography.

---

## 2. Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      content/cv.yaml                        │
│ (Single Source of Truth for RenderCV PDF & Next.js Website) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       app/lib/cv.ts                         │
│  - Reads content/cv.yaml via fs.promises                    │
│  - Parses YAML using 'yaml' package                         │
│  - Formats date ranges (e.g. 2026-01 -> Jan 2026)           │
│  - Renders markdown bullet highlights with markdown-it      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│           app/components/work-experience.tsx (RSC)          │
│  - Renders main "Education & Work" section header           │
│  - Iterates over 4 categories in order:                     │
│      1. Professional Experience                             │
│      2. Freelance Experience                                │
│      3. Internships & Initiatives                           │
│      4. Education                                           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              app/components/experience.tsx                  │
│  - Clean vertical timeline entry (no icons)                 │
│  - Company / University (bold primary heading)              │
│  - Position / Degree + Date range                           │
│  - Rendered markdown bullet list (prose typography)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Data Schema & Types (`app/types/cv.ts`)

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
  title: string;          // Company or Institution name
  subtitle: string;       // Position or Degree/Area
  date: string;           // Formatted date range (e.g. "Jan 2026 – Present")
  location?: string;
  highlights: string[];   // Pre-rendered HTML string for each highlight
}

export interface CVSectionGroup {
  id: string;
  title: string;
  entries: CVFormattedEntry[];
}
```

---

## 4. Server-Side Loader (`app/lib/cv.ts`)

1. **Package**: Install `yaml` using Bun (`bun add yaml`).
2. **Date Formatting Function**:
   - `formatCVDate(dateStr: string): string`
   - Maps `YYYY-MM` to month abbreviation: `2026-01` $\to$ `Jan 2026`, `2024-05` $\to$ `May 2024`.
   - Maps `present` $\to$ `Present`.
   - Joins start and end with an en-dash: `Jan 2026 – Present`.
3. **Highlight Formatting**:
   - Renders inline markdown bolding (`**keyword**`) using `markdown-it` with `renderInline`.
4. **`getCVExperienceData(): Promise<CVSectionGroup[]>`**:
   - Reads `path.join(process.cwd(), 'content/cv.yaml')`.
   - Extracts and formats:
     1. `professional_experience` $\to$ "Professional Experience"
     2. `freelance_experience` $\to$ "Freelance Experience"
     3. `internships_and_initiatives` $\to$ "Internships & Initiatives"
     4. `education` $\to$ "Education"

---

## 5. UI Presentation & Component Design

### 5.1 Main Container (`app/components/work-experience.tsx`)
- Server Component.
- Loads data with `await getCVExperienceData()`.
- Title: `"Education & Work"` (`font-title text-4xl font-bold tracking-wide md:text-5xl`).
- Renders each `CVSectionGroup` sequentially:
  - Category Heading: `font-title text-2xl font-semibold text-secondary-foreground mt-10 mb-4 tracking-tight`.
  - Maps entries to `<Experience />`.

### 5.2 Timeline Item Component (`app/components/experience.tsx`)
- **Strictly no icons/emojis**:
  - Replaces icon wrapper with a simple, refined vertical border rail: `border-l-2 border-accent-foreground/25 pl-6 ml-1`.
- **Header**:
  - `title`: `text-xl font-bold text-secondary-foreground`.
  - `subtitle & date`: `flex flex-wrap items-center gap-x-3 text-base text-accent-foreground font-medium`.
- **Highlights**:
  - Rendered bullet points using `<ul className="mt-2 list-disc pl-4 space-y-1 text-base text-secondary-foreground">`.
  - Each item renders `dangerouslySetInnerHTML={{ __html: highlight }}`.

---

## 6. Migration & Invariants

1. **Single Source of Truth**: `content/cv.yaml` is the sole data source for work and education experience.
2. **Runtime & Package Manager**: All operations use `bun` (`bun add yaml`, `bun run build`).
3. **No Breaking Changes to Navigation**: `#experience` section ID remains unchanged, preserving smooth scrolling from the navbar.
4. **Clean Codebase**: Legacy `.mdx` files remain preserved in `content/work/` for reference, but active loading transitions entirely to `app/lib/cv.ts`.

---

## 7. Verification Plan

1. **Type Safety**: `pnpm exec tsc --noEmit` (or `bun run tsc --noEmit`) passes with 0 errors.
2. **Linting**: `pnpm exec next lint` (or `bun x next lint`) passes with 0 warnings/errors.
3. **Build Validation**: `bun run build` succeeds and statically generates `/`.
4. **Visual & Data Verification**: Verify all 10 entries across the 4 categories (PT Cakra Jala Teknologi, Idea Comindo, PT Datasintesa, Itemgame, Pilates Reform, Wijaya Door, School ERP, Bootcamp, Himpunan, and Sebelas Maret University) render correctly.
