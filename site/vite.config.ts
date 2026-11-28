import solid from "@solidjs/vite-plugin";
import { defineConfig, type Plugin } from "vite-plus";
import { replaceLiterals } from "./src/prose";

const CORE_KATEX_FONTS = new Set([
  "KaTeX_Main-Regular",
  "KaTeX_Main-Bold",
  "KaTeX_Math-Italic",
  "KaTeX_AMS-Regular",
  "KaTeX_Size1-Regular",
  "KaTeX_Size2-Regular",
]);

const CORE_KATEX_WOFF2 =
  /\/KaTeX_(?:Main-Regular|Main-Bold|Math-Italic|AMS-Regular|Size1-Regular|Size2-Regular)\.woff2$/;

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

/**
 * Keeps only WOFF2 for the core KaTeX faces inside katex.min.css so Vite
 * inlines just those compact WOFF2 files (via build.assetsInlineLimit) instead
 * of emitting or inlining legacy WOFF/TTF fallbacks.
 */
function coreKatexWoff2Only(): Plugin {
  return {
    name: "core-katex-woff2-only",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/katex/dist/katex.min.css")) return;
      const transformed = code.replace(
        /src:url\(fonts\/([A-Za-z0-9_-]+)\.woff2\) format\("woff2"\),url\(fonts\/\1\.woff\) format\("woff"\),url\(fonts\/\1\.ttf\) format\("truetype"\)/g,
        (match, fontName: string) =>
          CORE_KATEX_FONTS.has(fontName)
            ? `src:url(fonts/${fontName}.woff2) format("woff2")`
            : match,
      );
      return { code: transformed, map: null };
    },
  };
}

export default defineConfig({
  // Relative asset paths, so the build works under a sub-path such as GitHub Pages.
  base: "./",
  plugins: [tex(), coreKatexWoff2Only(), solid()],
  build: {
    assetsInlineLimit(filePath) {
      if (CORE_KATEX_WOFF2.test(filePath)) return true;
      return undefined;
    },
  },
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
