<div align="center">
<img width="180" alt="Vista logo" src="public/vista.png" />
</div>

# vista-website

Official website for [Vista](https://github.com/whyfle/vista) — the native-focus universal Linux package manager. Live at https://whyfle.github.io/vista-website/

React + Vite + Tailwind. Hero, CLI cheatsheet, scoring visualizer, terminal simulator, install/config guides.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build    # -> dist/
```

## Deploy

`main` holds source. The built `dist/` ships on the `gh-pages` branch, which GitHub Pages serves. `vite.config.ts` sets `base: '/vista-website/'` — required for project-Pages asset paths. After changing source:

```bash
npm run build
# push dist/ to gh-pages, push source to main
```

## Layout

`src/components/` (Navbar, Hero, InstallGuide, CliCheatsheet, ScoringVisualizer, TerminalSimulator, ConfigGuide, …), `src/App.tsx`, `public/` (favicons, og images), `index.html`.
