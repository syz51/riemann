# riemann

Notes on reading Levent Alpöge's Lean 4 proof of the Riemann hypothesis.

The facts on this page come from two sources, read on 22 November 2026. Neither is in the reference registry yet, so no check covers this page.

- [The Lean and Mathlib joint statement](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) gives the release date, 20 November 2026, and the checkers that accepted the proof: Lean's official kernel, `con-leche` and `con-ron`.
- Public mirrors of the archive report its size as about 17 million lines. This number is reported, not counted here.

## Goal

Understand the argument. Do not rebuild it: other people have checked the proof with several kernels.

## Method

- Read theorem statements top-down, starting from `Main.lean`.
- Follow the proof route one level at a time, and record lemma statements only.
- Fetch single files from a public mirror. Never download or read the library in bulk: it holds about 17 million lines.
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
