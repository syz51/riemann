# Simplification candidates

**Archived-release notice:** The entries below document candidates from the original 20 November 2026 17-million-line Lean release (`leanprover-community/riemann-hypothesis`, commit `40e56bab026552e089d7afcfeff08d2defb9c005`) [7](../references.md#reference-7). As of 26 November 2026, the project's primary pinned source is the shorter 25 November 2026 edition (`lsernau/grh-lean`, commit `72fead10`, `grh/`) [37](../references.md#reference-37), where the top-level proof in `grh/src/Main.lean` already drops these duplicate paths.

Each entry names a place where the argument looks longer than it needs to be, the reason, and the Lean declarations it concerns. Statements come from the pinned repository [7](../references.md#reference-7). An entry is a candidate, not a checked simplification.

## 1. The Riemann hypothesis is derived three times

- Where:
  - `rhOfAll` in `Supplements/Kernels/MainTheorems.lean`, by `Formalism.VW.rh_of_every`.
  - `UpperTheory.FinalTheorems.riemannHypothesis` in `Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean`, by `UpperTheory.riemannHypothesis_of_everyCharacter`.
  - `Claim.zeta allChi`, the third part of `claimAll` in `Supplements/Kernels/MainTheorems.lean`. Its lemma `Claim.zeta` is in `CharacterBoxes/ClaimStrip.lean`.
- Reason: all three derive the same statement from `EveryCharacter`. Two routes are redundant.
- Related duplicate: the step from "no zeros on the right" to "zeros on the line" for Dirichlet characters also exists twice. `ClaimStrip.lean` has `Claim.strip`, `Claim.prim_reflect` and `Claim.gamma_ne_zero`. `Formalism/GammaFactorNonvanishing/CritLine.lean` has `Formalism.VW.critLine` and `Formalism.VW.gammaFactor_ne_zero`. We compared the names and statements, not the proofs line by line.
- Size of the gain: small. It removes short lemma chains, not part of the hard argument.

## 2. The statement of the Riemann hypothesis exists in three copies

- Where: Mathlib's `RiemannHypothesis`; `RiemannZetaZerosOnLine` in `Statements.lean`; `Claim.Zeta` in `Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean`. `ClaimStrip.lean` proves `zeta_iff : Zeta ↔ RiemannHypothesis := Iff.rfl`.
- Related duplicate: `Claim.HalfPlane` in the same file has the same text as `UpperTheory.EveryCharacter`.
- Reason: the copies differ only in how they are written.
- Size of the gain: none for the mathematics. It only tidies the top of the library.
