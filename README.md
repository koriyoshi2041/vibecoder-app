# VibeCoder Learn

**A curated 9-week learning path for aspiring vibe coders — from observer to orchestrator.**

Live at **[vibecoder-app.vercel.app](https://vibecoder-app.vercel.app)**

---

## What is VibeCoder Learn?

VibeCoder Learn is a structured, self-paced curriculum designed to take you from zero to a confident AI-assisted developer. The platform features **153 hands-on challenges** across 11 categories, a **9-week guided learning path**, and a **progress tracking system** with XP, streaks, and milestone checkpoints — all wrapped in an Awwwards-inspired design with classical Chinese aesthetics.

## Features

### 153 Challenges

Organized across 11 skill categories (A through L), each challenge includes:

- Detailed instructions with difficulty rating (Beginner / Intermediate / Advanced)
- Estimated completion time
- Evaluation criteria with interactive checkboxes
- Personal notes section with local persistence
- Key learnings summary

### 9-Week Learning Path

A structured curriculum divided into four stages:

| Stage | Weeks | Focus |
|-------|-------|-------|
| Observer | 1–2 | Understanding AI tools, reading code, building taste |
| Practitioner | 3–5 | Hands-on building, prompt engineering, debugging |
| Critic | 6–7 | Code review, architecture evaluation, quality judgment |
| Creator | 8–9 | Original projects, open source contribution, mentoring |

Each week includes a capstone project, recommended challenges, and trackable milestones.

### Progress Dashboard

- XP system with level progression
- Daily streak tracking
- Per-week milestone completion
- Challenge completion counter (0–153)
- All data persisted in localStorage

### Bilingual Support

Full Chinese and English support with locale-based routing:

- `/` — Chinese (default)
- `/en/` — English

Language switcher in the navigation bar. All 153 challenge descriptions are fully translated.

## Design

The frontend draws inspiration from Awwwards-winning sites while maintaining a warm, classical Chinese aesthetic:

- **GSAP + ScrollTrigger** — Scroll-triggered fade-ups, staggers, parallax, and character-by-character text reveals
- **Lenis** — Buttery smooth scroll with custom easing
- **Ink-wash gradients** — Subtle radial gradients evoking traditional Chinese ink paintings
- **Noto Serif SC** — Serif typography for headings, bringing a calligraphic feel
- **Seal-like logo** — Navigation branding inspired by traditional Chinese seals (印章)
- **Scroll progress bar** — Thin gradient indicator tied to page scroll
- **Nav hide/show** — Navigation hides on scroll down, reappears on scroll up
- **Full reduced-motion support** — All animations respect `prefers-reduced-motion`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build) 5.x (static site generation) |
| UI | [React](https://react.dev) 19 (interactive islands) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 |
| Animation | [GSAP](https://gsap.com) 3 + ScrollTrigger |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering) |
| Icons | [Lucide React](https://lucide.dev) |
| Markdown | [Marked](https://marked.js.org) + [gray-matter](https://github.com/jonschlinkert/gray-matter) |
| Deployment | [Vercel](https://vercel.com) |

## Project Structure

```
src/
├── components/        # React + Astro components
│   ├── AnimatedStat.tsx
│   ├── ChallengeDetail.tsx
│   ├── ChallengeFilter.tsx
│   ├── Nav.astro
│   ├── PathWeek.tsx
│   ├── ProgressDashboard.tsx
│   └── StageCard.tsx
├── data/              # Challenge, week, and project data (zh + en)
│   ├── challenges.ts / challenges.en.ts
│   ├── weeks.ts / weeks.en.ts
│   └── projects.ts / projects.en.ts
├── i18n/              # Translation strings
├── layouts/
│   └── Layout.astro   # Root layout with GSAP/Lenis init
├── lib/               # Utilities (progress, markdown parsing)
├── pages/
│   ├── index.astro          # Homepage (zh)
│   ├── challenges.astro     # Challenge browser (zh)
│   ├── challenges/[id].astro
│   ├── path.astro           # Learning path (zh)
│   ├── projects.astro       # Projects (zh)
│   └── en/                  # English mirrors
└── styles/
    └── global.css     # Design system, animations, ink-wash effects
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT
