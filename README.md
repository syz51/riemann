# riemann

Notes on reading Levent Alpöge's Lean 4 proof of the Riemann hypothesis, focusing on the shorter edition released on 25 November 2026.

- The original proof was released on 20 November 2026 as a Lean library of 17 million lines [2](docs/references.md#reference-2), accompanied by the author's note listing 20 dated steps of the argument [1](docs/references.md#reference-1).
- On 25 November 2026, a shorter rewriting was released in `github.com/lsernau/grh-lean` [37](docs/references.md#reference-37), proving the same five theorems (Mathlib's `RiemannHypothesis` and four statements of RH and GRH for Dirichlet $L$-functions) in a readable edition (`grh/`, ~300,000 lines of code, 477,000 lines with comments/blanks, 803 files) and a compact edition (`grh-compact/`, ~76,000 lines, 794 files).
- Both editions of the shorter proof passed sandboxed `lake build`, `#print axioms` (`propext`, `Classical.choice`, `Quot.sound` only), full kernel module replay, byte-identical exports, `nanoda`, `con-leche`, and `con-ron` (including `--compare` against `Challenge.lean`) on Andrew Sutherland's verification page (`shortgrh/`), while `lake comparator --paranoid` and standalone `lean4lean` on the readable edition were still running as of 26 November 2026 00:15 UTC [38](docs/references.md#reference-38).

## Pinned sources

Every new task reads the Lean library from one primary repository at one frozen commit:

- **Primary pinned repository:** `github.com/lsernau/grh-lean` at commit `72fead102f663d5c7a407964a13dc0cf9d977207`, readable edition (`grh/`, 803 files: `src/Lib` [495 files], `src/New` [306 files], `src/Main.lean`, `src/Statements.lean`, plus `GUIDE.md`, `CONTENTS.md`, `INDEX.md`, `REFERENCES.md`) [37](docs/references.md#reference-37). It builds on Lean `v4.35.0` and Mathlib commit `56a005855ea17e0b0958f73ec801ae140b0a1679` [37](docs/references.md#reference-37). The same commit also holds `grh-compact/` (~76,000 lines, 794 files) for optional side-by-side comparison [37](docs/references.md#reference-37).
- **Secondary watch repository:** `github.com/leanprover-community/riemann-hypothesis`, whose `main` branch moved onto `lsernau/grh-lean`'s `grh/` on 25 November 2026 (preserving earlier cleanup on `alpoge` and the original 20 November release on `original`). Watch `main` for extra community simplifications while keeping `lsernau/grh-lean@72fead10` as the frozen pin.
- **Archived original release (20 November 2026):** `github.com/leanprover-community/riemann-hypothesis` at commit `40e56bab026552e089d7afcfeff08d2defb9c005` (17M lines, Lean `v4.33.1`, Mathlib `0df444a3`) [7](docs/references.md#reference-7) [8](docs/references.md#reference-8). Earlier proof notes (`docs/notes/00-route.md` through `03-grh-statements.md`, `simplifications.md`, and `riemann-rev-guide.md`) record our reading of that archived release and carry a notice at the top.
- The five main theorems are in `grh/src/Main.lean` and `grh/src/Statements.lean` [37](docs/references.md#reference-37).
- Other people's guides are an index only, never evidence. An example is `github.com/nasqret/riemann-rev` [4](docs/references.md#reference-4) (for the 20 November release): it tells us which file to open, and a statement counts only after we read the Lean declaration.

## The explainer site

Public address: <https://riemann-kappa.vercel.app>.

`site/` holds an interactive page that explains the proof one step at a time. It is built with Solid 2.0 and Vite. It explains the Lean code and does not run it. The content comes from the notes in `docs/notes/`.

- Run it: `cd site && bun install && bun run dev`.
- Build it: `cd site && bun run build`. The result is in `site/dist/`.
- Check it: `cd site && bun run verify`. This checks the format, lints, type-checks, tests and builds with Vite+ (`vp`). `cd site && vp check --fix` formats the files.
- Publish it: push to `main`. Vercel builds the site as `vercel.json` says and puts it at the public address. The install step names a bun version, because Vercel's own bun is older and cannot read `site/bun.lock`.

## Goal

Understand the argument. Do not rebuild it: other people have checked the proof with several kernels.

## Method

- Read theorem statements top-down, starting from `Main.lean`.
- Follow the proof route one level at a time, and record lemma statements only.
- Fetch single files from the pinned repository. Never download or read the library in bulk.
- For each step, write a plain explanation that names the Lean declaration and the classical source of the idea.
- Mark each statement as checked against the Lean source, or as an expectation.

## Layout

| Path | Content |
| --- | --- |
| `docs/notes/` | Explanations, one file per step of the proof route |
| `docs/references.md` | Catalogue of sources; `papers registry build` writes `docs/references.jsonl` from it |
| `sources/` | Source PDFs, extracted text and fetched Lean files; not in git |
| `lessons/` | Lessons that `lab` keeps |
| `research.toml` | Configuration of the research-factory tools |

## Tools

The project uses the [research-factory](https://github.com/syz51/research-factory) tools: `lab`, `papers`, `claimcheck` and `prov`.

- `lab brief` at the start of a session.
- `lab check --new-only` before a change is reported done.

The work board is `riemann`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and the [Code of Conduct](CODE_OF_CONDUCT.md).

## Licence

Licensed under either the [MIT licence](LICENSE-MIT) or the [Apache License 2.0](LICENSE-APACHE), at your option.
