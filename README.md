# riemann

Notes on reading Levent Alpöge's Lean 4 proof of the Riemann hypothesis.

- The proof was released on November 20, 2026, as a Lean library of 17 million lines [2](docs/references.md#reference-2).
- The exported proof was checked by Lean's official kernel, the `con-leche` and `con-ron` checkers, and several independent checkers [2](docs/references.md#reference-2).
- The author's note describes the work and lists 20 dated steps of the argument [1](docs/references.md#reference-1).

## Pinned sources

Every task reads the Lean library from one mirror at one commit:

- Mirror: `github.com/tamnd/riemann-lean`, commit `af705e0d9a5904326eb0693310e36d9484df7f8f`.
- The main theorems are in `lean/src/Main.lean` [3](docs/references.md#reference-3).
- The proof map is the README of `github.com/nasqret/riemann-rev`, commit `d53b3804bd013df4cf9af3b4087728148c90c9bd` [4](docs/references.md#reference-4).

The mirror says it holds the release without change. This project has not checked that against the original archive.

## Goal

Understand the argument. Do not rebuild it: other people have checked the proof with several kernels.

## Method

- Read theorem statements top-down, starting from `Main.lean`.
- Follow the proof route one level at a time, and record lemma statements only.
- Fetch single files from a public mirror. Never download or read the library in bulk.
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
