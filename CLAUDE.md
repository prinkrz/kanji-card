# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint (no test suite configured yet)
```

## Stack

- **Next.js 16.2.6** with App Router (`app/` directory) — see warning in AGENTS.md
- **React 19.2.4**
- **Tailwind CSS v4** — config-file-free; uses `@import "tailwindcss"` and `@theme inline {}` in `globals.css` instead of `tailwind.config.*`
- **TypeScript 5**

## Key architectural notes

### Next.js 16
This is Next.js 16, not 14/15. Before writing any routing, data-fetching, or middleware code, read the relevant section in `node_modules/next/dist/docs/01-app/`. APIs and conventions differ from training data.

### Tailwind CSS v4
No `tailwind.config.ts`. Theme tokens are defined via CSS custom properties inside `@theme inline {}` in [app/globals.css](app/globals.css). Utility classes are generated from those tokens at build time. Do not create a `tailwind.config.*` file.
