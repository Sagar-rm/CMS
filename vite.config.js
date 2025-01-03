import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  
  // Define process.env for compatibility
  define: {
    'process.env': {}, // Avoid errors with process.env in libraries
  },
  
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Allows imports like "@/components/..."
    },
  },

  // Optimize dependencies (optional)
  optimizeDeps: {
    include: ['process'], // Pre-bundle process if required
  },
});
