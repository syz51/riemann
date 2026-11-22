import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative asset paths, so the build works under a sub-path such as GitHub Pages.
  base: "./",
  plugins: [solid()],
  // Lets the dev server answer under a Tailscale name, for sharing inside the tailnet.
  server: { allowedHosts: [".ts.net"] },
});
