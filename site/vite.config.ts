import solid from "@solidjs/vite-plugin";
import { defineConfig, type Plugin } from "vite-plus";
import { replaceLiterals } from "./src/prose";

/**
 * Replaces each tex literal by the KaTeX markup of its LaTeX, and each prose
 * literal by the HTML of its text (see src/prose.ts). It works on the text of
 * the file, so it also changes such a literal inside a comment or a string: do
 * not write one there.
 */
function tex(): Plugin {
  return {
    name: "tex-to-katex",
    enforce: "pre",
    transform(code, id) {
      if (!/\/src\/[^?]*\.tsx?$/.test(id) || !/\b(?:tex|prose)`/.test(code)) return;
      return {
        code: replaceLiterals(code),
        // Each line keeps its number, so no map is needed.
        map: null,
      };
    },
  };
}

export default defineConfig({
  // Relative asset paths, so the build works under a sub-path such as GitHub Pages.
  base: "./",
  plugins: [tex(), solid()],
  // Lets the servers answer under a Tailscale name, for sharing inside the tailnet.
  server: { allowedHosts: [".ts.net"] },
  preview: { allowedHosts: [".ts.net"] },
  // `vp check` formats, lints and type-checks; it replaces `tsc --noEmit`.
  lint: {
    ignorePatterns: ["dist/**"],
    options: { typeAware: true, typeCheck: true },
  },
  fmt: { ignorePatterns: ["dist/**"] },
  test: {
    include: ["src/**/*.test.ts"],
    // Vitest 5.1's forks pool watchdog calls child.channel?.unref(), which Bun does not implement.
    pool: "threads",
  },
});
