import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative asset paths, so the build works under a sub-path such as GitHub Pages.
  base: "./",
  plugins: [solid()],
});
