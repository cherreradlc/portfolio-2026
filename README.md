# Consuelo Herrera — portfolio

Source code of my portfolio: **[consueloherreradesign.vercel.app](https://consueloherreradesign.vercel.app)**.

I'm a UX/UI designer and front-end developer. I designed this site and built it myself.

## Highlights

- **Split portrait hero.** My photo and a pixel version of it share the screen. The seam follows the mouse, or the finger on touch screens, and each side links to the projects of its kind.
- **Case studies built from data.** Each project is a list of typed blocks (text, stats, phone carousels, videos, galleries, a page-by-page brand manual viewer, code windows), so adding a case study is a data change, not a layout change.
- **Real code on display.** Coded projects include an editor-style window with real excerpts, highlighted by a small TypeScript/SQL tokenizer written for the site.
- **Bilingual.** English by default with a Spanish toggle, plus a CV in each language.
- **Accessible motion.** Animations respect `prefers-reduced-motion`, text meets WCAG AA contrast, and images keep their real proportions.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis · deployed on Vercel.

## Code tour

| Where | What |
| --- | --- |
| `src/data/projects.ts`, `projects.en.ts` | Every case study as typed data, in Spanish and English |
| `src/data/code/` | Real excerpts from the coded projects |
| `src/components/Hero.tsx` | Split portrait with pointer and touch control |
| `src/components/case/CaseBlocks.tsx` | Renders each block type of a case study |
| `src/components/case/CodeWindow.tsx` | Tabbed code window with syntax highlighting |
| `src/components/ProjectGrid.tsx` | Project grid with type filters |
| `src/i18n/` | Language toggle and translated content |

## Related

- [Fresco](https://github.com/cherreradlc/fresco): a sales and finance app for a small food business ([live demo](https://fresco-demo-five.vercel.app)).

## Run it locally

```bash
npm install
npm run dev
```
