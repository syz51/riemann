---
name: solid-2-site
description: Work on the explainer site under site/ (Solid 2.0, Vite, TypeScript). Use before writing or changing its components, step content, styles or build. Solid 2.0 differs from Solid 1.x and from React; this skill points to the documentation that ships with the package and records what this project learned.
---

# The explainer site (Solid 2.0)

## Read first

Solid 2.0 ships its own agent skills inside the package. Read them from `site/node_modules` after `bun install`; they match the installed version.

1. `site/node_modules/solid-js/skills/solid-2.0/SKILL.md`: the primer. Read all of it before you write a component.
2. `site/node_modules/solid-js/CHEATSHEET.md`: the full reference. Check each API name you are not sure of.
3. `site/node_modules/solid-js/skills/reactivity-diagnostics/SKILL.md`: one section per diagnostic code. Read the section when a dev build prints `[CODE]`.

Do not write Solid code from memory of version 1 or of React.

## Setup of this site

- Packages: `solid-js` and `@solidjs/web` at 2.x; the Vite plugin is `@solidjs/vite-plugin` (not `vite-plugin-solid`, which is for version 1).
- `tsconfig.json`: `"jsx": "preserve"` and `"jsxImportSource": "@solidjs/web"`.
- `vite.config.ts` sets `base: "./"`, so that the build works under a sub-path.
- The toolchain is Vite+ (`vite-plus`, command `vp`). `vite.config.ts` imports `defineConfig` from `vite-plus` and holds the `lint`, `fmt` and `test` blocks. The package `vite` is an alias of `@voidzero-dev/vite-plus-core`.
- Commands, run in `site/` with bun only: `bun install`, `bun run dev`, `bun run build`, `bun run verify` (`vp check`, `vp test`, `vp build`). `vp check --fix` formats the files. Vercel runs `bun run verify`, so a lint error or a failed test stops the deploy.
- Tests are `src/**/*.test.ts` and import from `vite-plus/test`.

## Publishing

- The site is on Vercel at `https://riemann-kappa.vercel.app` (project `riemann`). The GitHub repository is connected, so a push to `main` deploys.
- `vercel.json` at the repository root holds the install and build commands. Its install step runs `bunx bun@<version> install`, because the bun on Vercel's build machine was too old to read `site/bun.lock`. When the local bun writes a newer lockfile and the build on Vercel fails with "Unknown lockfile version", raise that version.

## Structure

- `src/steps/stepN.ts` holds the content of one step as data: Lean snippets cut into tokens, and one explanation per marked piece. The types are in `src/steps/types.ts`.
- The content comes from `docs/notes/`. The notes are the source; change a fact in the note first, then in the step file.
- Lean text is verbatim. Added line breaks are allowed, and the snippet's `source` line must say so.
- `src/LeanBlock.tsx` renders a snippet. `src/leanColours.ts` colours keywords, types and numbers with one small pattern; it adds no dependency, so the page stays small. Add a word to the pattern when a new step quotes it. `src/Plane.tsx` draws the complex plane. `src/StepPage.tsx` owns the state of a step: the hovered piece, the focused piece and the pinned piece.
- `src/App.tsx` holds the header and selects the page from the address after `#` (`#/` is the contents page, `#/step-1` the step, `#/complex-numbers`, `#/zeta` and `#/gamma` the background pages). Hash addresses need no server rules, so the build works on GitHub Pages under a sub-path.
- `src/pages.ts` is the one list of all pages: each step, with the background pages that it needs. The contents page (`ContentsPage.tsx`) and the links at the foot of each page (`PageFoot.tsx`) come from it. A new page needs its route in the `PageRoute` type, an entry in `STEPS` and a `<Match>` in `App.tsx`. Routes are typed, so a misspelt route is a type error. The header holds one "Contents" link only: do not add a link per page there, because the list grows.
- A background page (`src/ComplexPage.tsx`, `src/ZetaPage.tsx`, `src/GammaPage.tsx`) explains a prerequisite. Its record is a note in `docs/notes/`, and every section names its sources in one line under its content; a link on each fact is noise when most facts share a source. `src/MultiplyPlane.tsx` is its picture with points that the reader moves; `src/complex.ts` holds the arithmetic. `src/Stepper.tsx` shows one calculation a part at a time, on the complex-numbers page and the zeta page. It renders every part in one grid cell and hides all but the current one with `visibility: hidden`, and the parts share their rows through `subgrid`. So the tallest title, equation and text set the size, and nothing moves when the reader changes part. Do not go back to rendering only the current part. `src/SumProduct.tsx` is the chart of the zeta page: a slider and a table carry the values, so the chart needs no hover. `src/GammaChart.tsx` is the chart of the Gamma page, with the arithmetic in `src/gamma.ts`; it reuses the frame, slider, legend and table styles of `.sumprod`, and a press or drag on the picture moves the slider.

## Rules for the content

- The page explains the Lean code. It does not run Lean.
- Write for a reader with no university mathematics. Explain each symbol where it first appears.
- Every explanation must work with the keyboard and with touch, not only with hover. A marked piece is a `<button>`: hover or focus shows it, a press pins it.
- Support the light and the dark theme, and a narrow screen.

## Check a change

1. `bun run verify` in `site/`.
2. `vp preview --port <port>`, then the `headless-browser` skill with `--strict`: one wide shot and one shot at width 390, in both themes when colours changed. Stop the server after.

## Lessons

Add a line here when Solid 2.0 or the toolchain behaves differently from what you expected.

- ARIA attributes with true or false values take strings: `aria-pressed={x() ? "true" : "false"}`. A boolean is a type error.
- Conditional classes use the array and object form, also on SVG elements: `class={["zeros", { on: active() }]}`.
- In `<For>`, the default callback gets the raw item. A plain `typeof` test on it at the top of the callback is fine for static data.
- Keep pointer hover and keyboard focus in separate signals. With one shared signal, a pointer that leaves one piece closes the explanation of the focused piece.
- Wrap step data in `defineStep` (`src/steps/types.ts`). It makes a token with an unknown piece id a type error.
- A point that the reader drags in an SVG: capture the pointer on `pointerdown` (`event.currentTarget.setPointerCapture`), and in `pointermove` act only when `hasPointerCapture` is true. This needs no state and no `ref`. Give the point `touch-action: none`, `tabindex="0"` and arrow keys.
- To click such a point in the headless browser, select its circle (`.handle.z .dot`). A click on the group aims at the middle of its box, which can be empty.
- A button that can switch itself off while it has focus (a "Next" button on the last part) uses `aria-disabled` and a guard in the handler, not `disabled`. A disabled button drops the keyboard focus. The headless browser refuses to click a button with `aria-disabled="true"`.
- Numbers shown rounded do not add or multiply exactly. Write "≈" and say that the values are rounded.
- A page built by Vite does not load from `file://`. Serve `dist/` with `vp preview` to check it.
- Text inside an SVG scales with the picture. A chart drawn 600 units wide shows at half size on a phone, so raise the SVG's `font-size` in the narrow rules and check a shot at width 390.
- A page fact comes from a source that was read, not from a search summary. Download the source to `sources/background/`, read the part, and record in `docs/references.md` which part was read and any slip found in it.
- The callback of `<Show>` runs one time. A plain value that it returns, such as `(v) => format(v())`, does not update when the value changes while `when` stays true. Read the signal in JSX or in an attribute instead. Check each control of a picture against the table beside it.
- Display equations are LaTeX in a tex`…` literal, in a `.tsx` file under `site/src`. The plugin in `site/vite.config.ts` replaces each literal at build time by MathML markup from Temml, and a LaTeX error stops the build. Put the markup on the page with `innerHTML` on a `.equation` element, or pass it as `equation` to the `Stepper`. No converter reaches the browser, and the browser draws the MathML itself. The literal takes no `${}`. Words inside a display equation read as a sentence, so give them word spaces inside the braces, `\text{ never passes }`, not `\quad` on each side: a quad leaves a gap much wider than the space between words. Where the formula ends and the words start, a `\;` before the words is enough. The fonts are the reader's system math fonts (`Temml-Local.css`); to get the same look on every device, import `Temml-Latin-Modern.css` and serve the Latin Modern Math font.
- A formula inside a sentence goes in a prose`…` literal, between two `$` signs: prose`The term of $n$ is $1/n^2$.` The same plugin turns each formula into inline MathML and escapes the text around it. Put the result on the page with `innerHTML` on the `p`, `li` or `span`. The `text` of a `Stepper` part and of a timeline entry has the type `Markup`, so it must come from a prose literal. The converter is `site/src/prose.ts`, with tests.
- Inside a sentence, write a fraction with a slash (`$1/4$`), not with `\frac`: a stacked fraction makes the line spacing uneven. Set each variable (`$s$`, `$n$`) and each power (`$2^s$`) as a formula, so that it looks the same as in the display equations. A plain number alone (4, 1735) stays text.
- These stay plain text: a heading or a part title (the math font does not match the bold sans heading), text inside an SVG (no MathML there), a button label that is also read out in an `aria-label`, and the one-line summaries in `site/src/steps/` and `pages.ts`.
- A fraction inside a fraction gets very small. Write the inner one with `\dfrac`. Check each new equation at 390 px width: a long one needs two lines (`gathered`).
- A curve that grows without limit near a point needs samples much closer together there than elsewhere (`GammaChart.tsx` adds samples down to a distance of 0.000001). With even steps the curve stops short of the edge of the chart and looks like it has a finite top. Cut far values to a band outside the chart and hide them with a `clipPath`.
- A page that ends with facts we did not verify has a last section "What we did not check", taken from the "Not checked" list of its note.
