# Contributing to riemann

Thanks for helping. This repository is a study project — reading notes (`docs/notes/`), a reference catalogue (`docs/references.md`), optional Lean 4 bridge checks (`lean/`), and an interactive explainer site (`site/`) for Levent Alpöge's Lean 4 proof of the Riemann hypothesis. Open an issue before starting anything larger than a small fix so we can agree on the scope first.

## Set up

To work on the explainer site (`site/`), you need [Bun](https://bun.sh) at the version in `packageManager` in [`site/package.json`](site/package.json):

```sh
git clone https://github.com/syz51/riemann
cd riemann/site
bun install
bun run dev
```

## Before you push

Run the site verification suite:

```sh
cd site
bun run verify
```

This checks formatting, lints, type-checks, runs the unit and math-typesetting tests, and builds `site/dist/`. Run `bunx vp check --fix` in `site/` to auto-format.

If you update `packageManager` in [`site/package.json`](site/package.json), update the matching `bun@<version>` in [`vercel.json`](vercel.json) as well (CI checks that they match).

If you edit [`docs/references.md`](docs/references.md), rebuild `docs/references.jsonl` with `papers registry build` when `papers` is installed.

## Conventions

[`GEMINI.md`](GEMINI.md) records the working rules for the repository, and [`.claude/skills/solid-2-site/SKILL.md`](.claude/skills/solid-2-site/SKILL.md) documents the Solid 2.0 + Vite+ site conventions. The ones that matter most in review:

- **Notes come first:** Update a mathematical or historical fact in `docs/notes/` before updating `site/`.
- **Sources required:** Do not explain mathematics or its history from memory. Look each fact up in the pinned Lean source or a primary/scholarly source, cite it in `docs/references.md`, and state clearly what stays unchecked.
- **Mathematical typesetting:** Write equations and inline math in proper LaTeX with stacked `\frac{...}{...}` (never `/` inside math formulas). On the site, use `` tex`...` `` and `` prose`...` ``; `site/src/prose.test.ts` enforces this.
- **No bulk downloads:** Fetch single Lean files from the pinned repository listed in [`README.md`](README.md#pinned-sources) rather than committing or copying external libraries.

## Proposing a change

1. For an error, broken citation, or suggestion, find or open an [issue](https://github.com/syz51/riemann/issues/new/choose). Report security problems privately instead, as [`SECURITY.md`](SECURITY.md) explains.
2. Fork, branch from `main`, and keep each pull request focused on one change.
3. Open the pull request and fill in the template. CI must pass before it merges, and review conversations must be resolved.

By contributing you agree that your work is dual-licensed under the [MIT licence](LICENSE-MIT) and the [Apache License 2.0](LICENSE-APACHE), and to follow the [code of conduct](CODE_OF_CONDUCT.md).
