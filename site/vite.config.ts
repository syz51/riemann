import solid from "@solidjs/vite-plugin";
import temml from "temml";
import { defineConfig, type Plugin } from "vite";

/**
 * Replaces each tex literal in the source by the MathML markup of its LaTeX.
 * It works on the text of the file, so it also changes a tex literal inside a
 * comment or a string: do not write one there.
 */
function tex(): Plugin {
  return {
    name: "tex-to-mathml",
    enforce: "pre",
    transform(code, id) {
      if (!/\/src\/[^?]*\.tsx?$/.test(id) || !code.includes("tex`")) return;
      return {
        code: code.replace(/\btex`((?:[^`\\]|\\.)*)`/gs, (_, source: string) =>
          // A LaTeX error stops the build.
          JSON.stringify(temml.renderToString(source, { displayMode: true, throwOnError: true })),
        ),
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
});
