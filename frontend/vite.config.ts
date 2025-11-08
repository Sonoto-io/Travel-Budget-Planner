import { defineConfig } from "vite";
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
});
