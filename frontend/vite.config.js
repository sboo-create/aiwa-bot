import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "vendor/deslop-web-ui/src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "assets/deslop",
    emptyOutDir: true,
    lib: {
      entry: "src/deslop-main.jsx",
      formats: ["es"],
      fileName: "main",
      cssFileName: "main",
    },
  },
});
