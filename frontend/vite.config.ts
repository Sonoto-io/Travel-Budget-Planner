import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), vue(), svgLoader()],
  server: {
    host: true,
    port: 5173,
  },
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
