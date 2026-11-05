import { defineConfig } from "vite";

/**
 * Vite configuration.
 *
 * Uses the function form of `defineConfig` so that the current build
 * mode (`development` or `production`) is read from Vite directly
 * instead of relying on Node.js globals like `process.env`. This keeps
 * the config free of `@types/node` dependencies.
 */
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/Memory/" : "/",
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
}));
