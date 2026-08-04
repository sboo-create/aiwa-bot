import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

// Версия UI в именах чанков; поднимается при выкате нового фронта.
const UI_VERSION = process.env.AIWA_UI_VERSION || "aiwa-v184";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    // Vendored source packages can otherwise resolve their own React/Recharts
    // copies, splitting hook dispatchers and chart context across runtimes.
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
    rollupOptions: {
      output: {
        // Стабильные имена вида deslop-main-aiwa-vNNN.js: так делали руками в
        // проде (v163→v177), сохраняем — по имени видно версию UI, а кэш
        // Telegram обновляется сменой версии, а не случайного хеша.
        chunkFileNames: `[name]-${UI_VERSION}.js`,
      },
    },
  },
});
