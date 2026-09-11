# Adriel Portfolio

Personal portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

**Live**: [adriel.id](https://adriel.id)

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [React Spring](https://www.react-spring.dev/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Content**: Local MDX parsed with `gray-matter` & `markdown-it`
- **Data**: GitHub REST API
- **Analytics**: Umami, Vercel Analytics & Speed Insights

## Getting Started

### Prerequisites

- Node.js $\ge$ 18.18.0 (or Bun)
- [pnpm](https://pnpm.io/) (recommended)

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
# Build production bundle
pnpm build

# Start production server
pnpm start
```

## Resume / CV

The downloadable CV source is maintained in [`content/cv.yaml`](./content/cv.yaml) and rendered with [RenderCV](https://rendercv.com/).

### Regenerating the CV

To regenerate the PDF after updating `content/cv.yaml`:

```bash
# Using uv (recommended, no install required)
uvx rendercv render content/cv.yaml

# Or using pipx / pip
pipx run rendercv render content/cv.yaml
# or: pip install rendercv && rendercv render content/cv.yaml

# Copy the generated PDF to public/
cp rendercv_output/Adriel_Alfeus_Hutabarat_CV.pdf public/adriel-alfeus.pdf
```

## Guidelines

See [AGENTS.md](./AGENTS.md) for codebase architecture, code conventions, and development guidelines.
