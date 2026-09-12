# Migration to Astro (Zero Runtime JS) Design Specification

**Goal:** Migrate the personal portfolio from Next.js 16 to Astro, achieving zero client-side framework JavaScript runtime, instant static page loads, and a perfect 100/100 Lighthouse score while preserving all existing design, content, and visual polish.

**Architecture:** Pure Astro static site generation (`output: 'static'`) with Vite. Content from `content/cv.yaml` and GitHub REST API fetched and rendered strictly at build time into static HTML/CSS. Interactive UI elements (dark mode toggle, scroll-spy dock, card cursor spotlight, scroll reveals) powered by lightweight native vanilla browser APIs (`IntersectionObserver`, `localStorage`, CSS transitions).

**Tech Stack:**
- **Framework:** Astro 5.x
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Icons:** `astro-icon` with `@iconify-json/simple-icons` and `@iconify-json/feather` (rendered build-time to static SVG, 0 KB client JS)
- **Data & Content:** `yaml` for `content/cv.yaml`, `markdown-it` for experience highlights
- **Typography:** Self-hosted Geist / GT Walsheim fonts

---

## 1. Project Structure & File Mapping

```
Existing (Next.js)                         Migrated (Astro)
----------------------------------------   -------------------------------------------
app/layout.tsx                          -> src/layouts/Layout.astro
app/page.tsx                            -> src/pages/index.astro
app/globals.css                         -> src/styles/global.css
app/components/navbar.tsx               -> src/components/Navbar.astro
app/components/nav-item.tsx             -> src/components/NavItem.astro
app/components/dark-mode-toggle.tsx     -> src/components/DarkModeToggle.astro
app/components/about.tsx                -> src/components/About.astro
app/components/tech-stack.tsx           -> src/components/TechStack.astro
app/components/work-experience.tsx      -> src/components/WorkExperience.astro
app/components/experience.tsx           -> src/components/Experience.astro
app/components/projects-section.tsx     -> src/components/ProjectsSection.astro
app/components/project.tsx              -> src/components/Project.astro
app/components/contact.tsx              -> src/components/Contact.astro
app/lib/cv.ts                           -> src/lib/cv.ts
app/lib/github.ts                       -> src/lib/github.ts
app/lib/utils.ts                        -> src/lib/utils.ts
app/types/cv.ts                         -> src/types/cv.ts
app/types/repo.ts                       -> src/types/repo.ts
content/cv.yaml                         -> content/cv.yaml (unchanged)
public/*                                -> public/* (unchanged)
```

---

## 2. Component & Rendering Strategy

### 2.1 Server Components -> Astro Templates (Zero Client JS)
Every presentational section is compiled directly into static HTML:
- **`Layout.astro`**: Declares HTML doctype with `lang="en"`, head meta tags, early inline theme script to eliminate FOUC, subtle noise overlay, and analytics script.
- **`About.astro`**: Exact verbatim bio, location/education/focus metadata grid, CV download button, and contact links.
- **`TechStack.astro`**: Categorized tech stack grid. Static build-time SVGs with `aria-hidden="true"` and `role="presentation"`.
- **`WorkExperience.astro` & `Experience.astro`**: Parses `content/cv.yaml` at build time into categorized vertical timelines with formatted dates and markdown highlights.
- **`ProjectsSection.astro` & `Project.astro`**: Renders fetched GitHub repositories with language badges, star counts, and WebP preview screenshots.
- **`Contact.astro`**: Social links with accessible SVGs and outbound URLs.

---

## 3. Client Interactivity (Vanilla JS, Zero Runtime Dependencies)

### 3.1 Dark Mode Toggle
- **FOUC Prevention (`<head>` script)**:
  ```js
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  })();
  if (theme === 'dark') document.documentElement.classList.add('dark');
  ```
- **Toggle Button**: Semantic `<button id="theme-toggle" aria-label="Toggle theme">` containing the sun/moon SVG. A 10-line click listener toggles `.dark` on `document.documentElement` and saves to `localStorage`. SVG morphing uses hardware-accelerated CSS transitions on `transform`, `opacity`, and mask coordinates.

### 3.2 Floating Nav Dock & Scroll Spy
- **Component**: `Navbar.astro` renders the capsule dock with anchor links (`#about`, `#experience`, `#stack`, `#project`, `#contact`).
- **Active Pill Animation**: Pure CSS transition on the active pill background, coordinated via `IntersectionObserver`.
- **Smooth Scroll**: Native `scroll-behavior: smooth` and programmatic offset scrolling when clicking nav links.

### 3.3 Project Card Spotlight
- Project cards listen to `pointermove` on the container to update `--mouse-x` and `--mouse-y` CSS custom properties, driving the radial spotlight gradient with zero framework overhead.

### 3.4 Scroll Reveal Animations
- Replaces Framer Motion's `whileInView` with CSS `@keyframes fade-up` triggered either by native CSS scroll-driven animations or a lightweight `IntersectionObserver` that toggles an `.is-visible` utility class.

---

## 4. Data Fetching & Build Pipeline

### 4.1 GitHub API
- Invoked in `src/pages/index.astro` frontmatter at build time.
- Uses `fetch` with `try/catch` fallbacks. If the build runs in an unauthenticated CI environment hitting rate limits, it falls back to a cached JSON snapshot so builds never fail.

### 4.2 Content Pipeline (`cv.yaml`)
- `src/lib/cv.ts` reads `content/cv.yaml` via Node's `fs/promises`.
- `yaml` parses YAML into structured typed objects.
- `markdown-it` formats bullet point Markdown into sanitized HTML.

---

## 5. Verification & Quality Gates

1. **Astro Build**: `pnpm build` generates static HTML in `dist/` with 0 error/warning.
2. **TypeScript Typecheck**: `pnpm exec astro check` and `tsc --noEmit` pass with zero type errors.
3. **Bundle Audit**: Verify that client-transferred JavaScript is `< 5 KB` (only the inline vanilla scripts for theme and scroll-spy).
4. **Lighthouse Audit**:
   - Performance: **98–100**
   - Accessibility: **100** (verifying `lang="en"`, accessible SVGs, semantic buttons)
   - Best Practices: **100**
   - SEO: **100**
