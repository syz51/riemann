# References

The catalogue of sources. `papers registry build` writes `references.jsonl` from it. Texts are saved under `sources/`, which is not in git.

## Reference 1

[1] Levent Alpöge. **Remark**. Four-page note on the author's website, 20 November 2026. [Original](https://alpo.ge/remark.pdf). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all four pages read in full. The note announces the proof, describes Claude's role, and gives a 20-step dated timeline of the argument. It contains no proof.

## Reference 2

[2] Lean and Mathlib communities. **Lean verification of the Riemann Hypothesis**. Joint statement on the Lean community blog, 21 November 2026. [Original](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: the page read in full. The pages it links (the Xena post on four criteria, Sutherland's overview, the Zulip thread) are separate sources.

## Reference 3

[3] Levent Alpöge and Claude. **Main.lean, the main theorems of the Lean library**. File `lean/src/Main.lean` in the mirror tamnd/riemann-lean, commit af705e0d9a5904326eb0693310e36d9484df7f8f. [Original](https://github.com/tamnd/riemann-lean/blob/af705e0d9a5904326eb0693310e36d9484df7f8f/lean/src/Main.lean). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: the file read in full: two imports and five theorems. Its imports, `Statements` and `Supplements.Kernels.MainTheoremsAll`, are read under reference 7. The mirror says it holds the release of 20 November 2026 without change; that claim is not checked here against the original archive.

## Reference 4

[4] nasqret. **riemann-rev: status dashboard, guide and map of the formal proof**. GitHub repository README, commit d53b3804bd013df4cf9af3b4087728148c90c9bd. [Original](https://github.com/nasqret/riemann-rev/blob/d53b3804bd013df4cf9af3b4087728148c90c9bd/README.md). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. The table of checks was read through a fetch agent's summary; the route of the proof is not read yet. A third-party reading aid, not an authority on the proof.

## Reference 5

[5] Andrew V. Sutherland. **Overview of the verification of the Lean proof of the generalized Riemann hypothesis**. Web page, MIT. [Original](https://math.mit.edu/~drew/grh/). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: metadata.

Inspection: metadata only. The page is saved and not read; the title here is a description, not the page's own title.

## Reference 6

[6] Mathlib contributors. **Mathlib.NumberTheory.LSeries.RiemannZeta**. Lean source file in leanprover-community/mathlib4, commit 9c98189ea3eebebb36e263edb82e7ffc6b037303; it holds the definition `RiemannHypothesis`. [Original](https://github.com/leanprover-community/mathlib4/blob/9c98189ea3eebebb36e263edb82e7ffc6b037303/Mathlib/NumberTheory/LSeries/RiemannZeta.lean). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. One definition was read, `RiemannHypothesis`; the rest of the file is saved and not read. The commit is the latest that changed this file, not the Mathlib version the library builds against.

## Reference 7

[7] Levent Alpöge and Claude. **The Lean library of the proof, files read by this project**. Files under `lean/src/` in the mirror tamnd/riemann-lean, commit af705e0d9a5904326eb0693310e36d9484df7f8f. [Original](https://github.com/tamnd/riemann-lean/tree/af705e0d9a5904326eb0693310e36d9484df7f8f/lean/src). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only, relative to the whole library: twelve files read, out of 175,187 that one mirror reports. Eleven are attached here as texts; the twelfth, `Main.lean`, is attached to reference 3. The notes that quote the files list them. The mirror says it holds the release without change; that claim is not checked here.
