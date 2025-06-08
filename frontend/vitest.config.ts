import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from 'vitest/config'
import baseViteConfig from './vite.config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default mergeConfig(baseViteConfig, {
  plugins: [vue(), tailwindcss(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ["tests/**/*.{test,spec}.{ts,js}"],
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
});
