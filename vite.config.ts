import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/Memory/" : "/",
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
