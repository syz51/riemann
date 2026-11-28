import { render } from "@solidjs/web";
import { App } from "./App";
import "katex/dist/katex.min.css";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("index.html has no #root element");

const mount = () => render(() => <App />, root);

// Decode the inlined core KaTeX faces before first paint so math never flashes
// invisible (FOIT) on reload, bounded by a short timeout so rendering never stalls.
if ("fonts" in document) {
  const ready = Promise.all([
    document.fonts.load("1em KaTeX_Main"),
    document.fonts.load("700 1em KaTeX_Main"),
    document.fonts.load("italic 1em KaTeX_Math"),
    document.fonts.load("1em KaTeX_AMS"),
    document.fonts.load("1em KaTeX_Size1"),
    document.fonts.load("1em KaTeX_Size2"),
  ]);
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, 150));
  void Promise.race([ready, timeout])
    .catch(() => {})
    .finally(mount);
} else {
  mount();
}
