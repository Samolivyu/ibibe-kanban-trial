import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure Vite recognizes these extensions
  },
});
=======
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: ['lucide-react'],
  },
});
>>>>>>> 7672b03 (This is the updated kanban feature. Working CSS and functionality. Ready for deployment.)
