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
- Commands, run in `site/` with bun only: `bun install`, `bun run dev`, `bun run build` (type-check, then build).

## Structure

- `src/steps/stepN.ts` holds the content of one step as data: Lean snippets cut into tokens, and one explanation per marked piece. The types are in `src/steps/types.ts`.
- The content comes from `docs/notes/`. The notes are the source; change a fact in the note first, then in the step file.
- Lean text is verbatim. Added line breaks are allowed, and the snippet's `source` line must say so.
- `src/LeanBlock.tsx` renders a snippet. `src/leanColours.ts` colours keywords, types and numbers with one small pattern; it adds no dependency, so the page stays small. Add a word to the pattern when a new step quotes it. `src/Plane.tsx` draws the complex plane. `src/StepPage.tsx` owns the state of a step: the hovered piece, the focused piece and the pinned piece.
- `src/App.tsx` holds the header and selects the page from the address after `#` (`#/` is the step, `#/complex-numbers` the background page). Hash addresses need no server rules, so the build works on GitHub Pages under a sub-path.
- A background page (`src/ComplexPage.tsx`) explains a prerequisite. Its record is a note in `docs/notes/`, and every historical fact on the page links to its source. `src/MultiplyPlane.tsx` is its picture with points that the reader moves; `src/complex.ts` holds the arithmetic.

## Rules for the content

- The page explains the Lean code. It does not run Lean.
- Write for a reader with no university mathematics. Explain each symbol where it first appears.
- Every explanation must work with the keyboard and with touch, not only with hover. A marked piece is a `<button>`: hover or focus shows it, a press pins it.
- Support the light and the dark theme, and a narrow screen.

## Check a change

1. `bun run build` in `site/`.
2. `bunx vite preview --port <port>`, then the `headless-browser` skill with `--strict`: one wide shot and one shot at width 390, in both themes when colours changed. Stop the server after.

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
- A page built by Vite does not load from `file://`. Serve `dist/` with `vite preview` to check it.
