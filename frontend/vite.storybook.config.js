import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    // Keep Storybook on the same single-runtime contract as the product build.
    dedupe: ["react", "react-dom", "react/jsx-runtime", "recharts"],
    alias: {
      "@": path.resolve(__dirname, "vendor/deslop-web-ui/src"),
    },
  },
  server: {
    open: "/storybook/#/ui-kit/colors",
  },
  build: {
    outDir: "storybook-static",
    emptyOutDir: true,
    rollupOptions: {
      input: "storybook/index.html",
    },
  },
});
