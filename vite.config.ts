import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages will serve at /TheHaallsResturants/
// HashRouter avoids 404 issues with deep links on GH Pages.
export default defineConfig({
  plugins: [react()],
  base: '/TheHaallsResturants/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
});
