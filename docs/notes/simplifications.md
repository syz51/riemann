# Simplification candidates

Each entry names a place where the argument or formalization looks longer or heavier than it needs to be, the reason, and the Lean declarations it concerns. An entry is a candidate, not a checked simplification.

## Current shorter edition (`lsernau/grh-lean`, commit `72fead10`)

The project's primary pinned source is the shorter 25 November 2026 readable edition (`grh/` in `lsernau/grh-lean@72fead10`) [37](../references.md#reference-37), which already dropped the top-level duplicate routes listed in the archived section below.

- **Community watch:** As human mathematicians unpack the argument on the public G.R.H. Polymath forum (`https://rh-polymath.zulipchat.com`) [56](../references.md#reference-56) and in `leanprover-community/riemann-hypothesis` (`main`), genuine mathematical shortcuts that emerge there will be logged below once verified directly against the Lean declarations and primary literature.

### S1. External-checker memory and time bottleneck in `New.Variety.tiltTheory`

- **Where:** `New.Variety.tiltTheory` in `grh/src/Lib/PadicComparison/Primitive/PeriodCoefficients.lean`, lines 650–690 (with same-file helpers `PadicTest.tiltNearZeros` at lines 508–509 and `le_ker_of_tiltNearZeros_le_ker`, `perfectRing_quotient_tiltNearZeros`, `mem_nearZeros_of_rTensor_eq_zero` at lines 561–637; whole file read directly), compared against `tiltTheory` in `grh-compact/src/Lib/PadicComparison/Primitive/TiltedTheory.lean`, lines 47 and 51–76 (whole file read directly) at `lsernau/grh-lean@72fead10` [37](../references.md#reference-37).
- **Source comparison:** Both editions prove the **same mathematics** with the same signature (`Theory (genericTestOver Ω)` for coefficients $R \mapsto R^\flat \otimes_{\mathcal{O}^\flat} M$) [37](../references.md#reference-37). Both bind a local `let J c I := ...` and a local `have` from the quotient-sieve lemma [37](../references.md#reference-37). The structural difference is that `grh/` factors out a separate top-level `def PadicTest.tiltNearZeros` and three standalone helper lemmas (each taking `[ThePrime p]` and stated in terms of `c.tiltNearZeros I`), yet still redefines a local `let J` inside `tiltTheory` and passes `J c I`-typed terms into those `c.tiltNearZeros I`-typed helpers (with explicit `CommAlgCat.of OFlat (c.TiltRing ⧸ J c I)`), whereas `grh-compact/` has no `tiltNearZeros` definition or standalone helper lemmas and inlines all three arguments directly under the single local `J c I` [37](../references.md#reference-37).
- **Root cause (verified 28 November 2026):** In Andrew Sutherland's `shortgrh/` verification [38](../references.md#reference-38), bundled `lean4lean` (Lean `v4.35.0`) on `grh/` took 2 h 35 min 05 s and peaked at 331,950,400 kB ($\approx 316.6\text{ GiB} \approx 332\text{ GB}$), spending 7,917,635 ms ($\approx 2\text{ h }12\text{ min}$) on `New.Variety.tiltTheory` (whereas `grh-compact/` checked all 204,580 declarations in 28 min 39 s at 7,261,224 kB $\approx 6.92\text{ GiB}$, with `tiltTheory` taking $< 1\text{ s}$, and Lean's own C++ kernel checked the full `grh/` export in 29 min 29 s under 8 GB) [38](../references.md#reference-38). Open PR `digama0/lean4lean#71` [57](../references.md#reference-57) (referencing `leanprover/lean4#14806` [58](../references.md#reference-58)) traced `New.Variety.tiltTheory` in the published export and showed that the blowup is a **`lean4lean` kernel caching pathology**, not a mathematical defect: unpatched `lean4lean` guards its `EquivManager` union-find behind a hash-inequality test (`useHash && e1.hash != e2.hash`), so terms on $\mathbb{C}_p$ built over distinct proof-irrelevant `Fact p.Prime` proofs miss the cache on every re-encounter; re-deciding them poisons `whnfCoreCache` with fully unfolded `(PadicAlgCl.valued p h₁).1`, causing a subsequent query against a third variant `h₂` to unfold and compare two copies of the metric structure of $\mathbb{C}_p$ ($> 10^7$ `isDefEqCore'` calls per 100 s) [57](../references.md#reference-57). Replacing `EquivManager` with Lean 4's pair-set cache drops `New.Variety.tiltTheory` in `lean4lean` to 0.24–0.27 s (matching Lean `v4.36.0`'s kernel at 0.19–0.22 s) and the whole readable export to 40 min 03 s at 6.2 GiB [57](../references.md#reference-57).
- **Size of the gain:** Purely a kernel-checker / term-elaboration issue, with zero mathematical simplification. Fixing `lean4lean` upstream (`digama0/lean4lean#71` [57](../references.md#reference-57)) resolves it without touching `grh/`; as a workaround for the unpatched `v4.35.0` `lean4lean` binary, eliminating the duplicate `let J` / `tiltNearZeros` split or inlining along the lines of `grh-compact/` avoids triggering the pathology [37](../references.md#reference-37) [38](../references.md#reference-38).
- **Not checked:** We did not download the multi-hundred-megabyte `.ndjson.zst` exports or run `lean4lean` locally, so we have not directly traced in the exported terms which exact subterms of `grh/` introduce the three distinct `Fact p.Prime` proofs (`h₀`, `h₁`, `h₂`) nor independently re-run the benchmarks reported in open PR `digama0/lean4lean#71` [57](../references.md#reference-57).

---

## Archived original release (20 November 2026, 17M lines)

**Archived-release notice:** The entries below document candidates from the original 20 November 2026 17-million-line Lean release (`leanprover-community/riemann-hypothesis`, commit `40e56bab026552e089d7afcfeff08d2defb9c005`) [7](../references.md#reference-7). As of 26 November 2026, the project's primary pinned source is the shorter 25 November 2026 edition (`lsernau/grh-lean`, commit `72fead10`, `grh/`) [37](../references.md#reference-37), where the top-level proof in `grh/src/Main.lean` already drops these duplicate paths.

### 1. The Riemann hypothesis is derived three times

- Where:
  - `rhOfAll` in `Supplements/Kernels/MainTheorems.lean`, by `Formalism.VW.rh_of_every`.
  - `UpperTheory.FinalTheorems.riemannHypothesis` in `Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean`, by `UpperTheory.riemannHypothesis_of_everyCharacter`.
  - `Claim.zeta allChi`, the third part of `claimAll` in `Supplements/Kernels/MainTheorems.lean`. Its lemma `Claim.zeta` is in `CharacterBoxes/ClaimStrip.lean`.
- Reason: all three derive the same statement from `EveryCharacter`. Two routes are redundant.
- Related duplicate: the step from "no zeros on the right" to "zeros on the line" for Dirichlet characters also exists twice. `ClaimStrip.lean` has `Claim.strip`, `Claim.prim_reflect` and `Claim.gamma_ne_zero`. `Formalism/GammaFactorNonvanishing/CritLine.lean` has `Formalism.VW.critLine` and `Formalism.VW.gammaFactor_ne_zero`. We compared the names and statements, not the proofs line by line.
- Size of the gain: small. It removes short lemma chains, not part of the hard argument.

### 2. The statement of the Riemann hypothesis exists in three copies

- Where: Mathlib's `RiemannHypothesis`; `RiemannZetaZerosOnLine` in `Statements.lean`; `Claim.Zeta` in `Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean`. `ClaimStrip.lean` proves `zeta_iff : Zeta ↔ RiemannHypothesis := Iff.rfl`.
- Related duplicate: `Claim.HalfPlane` in the same file has the same text as `UpperTheory.EveryCharacter`.
- Reason: the copies differ only in how they are written.
- Size of the gain: none for the mathematics. It only tidies the top of the library.
