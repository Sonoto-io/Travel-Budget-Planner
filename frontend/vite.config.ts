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
    allowedHosts: [process.env.VITE_BACKEND_URL ?? ""],
    cors: {
      origin: [
        'http://localhost:3000',       // browser dev
        'capacitor://localhost',       // Capacitor on iOS/Android
        'https://localhost',           // some Capacitor versions use https
      ],
      credentials: true,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    env: {
      VITE_API_URL: "http://app.localhost/api",
    },
    setupFiles: ['./vitest.setup.ts'],
    include: ["tests/**/*.{test,spec}.{ts,js}"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    isolate: false,
  },

});
