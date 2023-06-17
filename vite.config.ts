import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/github-user-search-app/",
  plugins: [vue(), svgLoader({ svgo: false })],
});
