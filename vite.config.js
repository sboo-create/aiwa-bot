import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    // `@deslop/web-ui` is vendored as source and brings its own installed React
    // under `vendor/deslop-web-ui/node_modules`. Its files resolve `react` there,
    // so the chart chunk used to carry a second copy of React — and a second
    // copy has no dispatcher while the first one renders: the first hook inside
    // the chart threw and React tore down the whole home screen with it.
    // ChartContainer lives in the vendored package while product charts live
    // in src/. Without deduping Recharts, each side gets its own context and
    // the production AreaChart receives a permanent 0 x 0 viewport.
    dedupe: ["react", "react-dom", "react/jsx-runtime", "recharts"],
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
