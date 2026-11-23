# riemann

Notes on reading Levent Alpöge's Lean 4 proof of the Riemann hypothesis.

- The proof was released on November 20, 2026, as a Lean library of 17 million lines [2](docs/references.md#reference-2).
- The exported proof was checked by Lean's official kernel, the `con-leche` and `con-ron` checkers, and several independent checkers [2](docs/references.md#reference-2).
- The author's note describes the work and lists 20 dated steps of the argument [1](docs/references.md#reference-1).

## Pinned sources

Every task reads the Lean library from one repository at one commit:

- Repository: `github.com/leanprover-community/riemann-hypothesis`, the Lean community's copy, at commit `40e56bab026552e089d7afcfeff08d2defb9c005`. The repository's README says that this first commit is the submitted Lean source exactly as published [7](docs/references.md#reference-7).
- Later commits on its `main` branch hold cleanup and simplification work by other people. Read them to see what is already simplified, not as the original.
- The main theorems are in `src/Main.lean` [3](docs/references.md#reference-3).
- The proof map is the README of `github.com/nasqret/riemann-rev`, commit `d53b3804bd013df4cf9af3b4087728148c90c9bd` [4](docs/references.md#reference-4).

The project first read twelve files from another mirror, `github.com/tamnd/riemann-lean`. All twelve are byte-identical to the files at the commit above (compared by SHA-256 on 22 November 2026).

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

## Licence

Licensed under either the [MIT licence](LICENSE-MIT) or the [Apache License 2.0](LICENSE-APACHE), at your option.
