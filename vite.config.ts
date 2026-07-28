import { defineConfig } from 'vite';

export default defineConfig({
  base: "/memory/",
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100
    },
  },
});
