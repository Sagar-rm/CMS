// vite.config.js
import { defineConfig } from 'vite';
import process from 'process';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': process.env  // Polyfill process.env for the browser
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      process: 'process/browser'  // Ensure that process is resolved correctly
    }
  }
});
