import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves project pages under /<repo-name>/, so every asset URL
// must be prefixed accordingly. We read this from the BASE_PATH env var so
// renaming the repo is a one-line fix instead of a six-file sweep.
//
// Fallback default matches the current repo name (DonHallsRestaurants).
// HashRouter (in src/main.tsx) avoids 404s on deep links since GH Pages
// can't do SPA-style server-side fallbacks.
const basePath = process.env.BASE_PATH ?? '/DonHallsRestaurants/';

export default defineConfig({
  plugins: [react()],
  base: basePath,
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
});
