import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vitest/config";
import baseViteConfig from "./vite.config";
import tsconfigPaths from "vite-tsconfig-paths";

export default mergeConfig(baseViteConfig, {
  test: {
    globals: true,
    environment: "jsdom",
    env: {
      VITE_API_URL: "http://app.localhost",
    },
    setupFiles: ['./vitest.setup.ts'],
    include: ["tests/**/*.{test,spec}.{ts,js}"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    isolate: false,
  },
});
