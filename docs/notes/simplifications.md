# Simplification candidates

Each entry names a place where the argument looks longer than it needs to be, the reason, and the Lean declarations it concerns. Statements come from the pinned mirror [7](../references.md#reference-7). An entry is a candidate, not a checked simplification.

## 1. The Riemann hypothesis is derived twice

- Where: `rhOfAll` in `Supplements/Kernels/MainTheorems.lean`, and `UpperTheory.FinalTheorems.riemannHypothesis` in `Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean`.
- Reason: both derive `RiemannHypothesis` from `EveryCharacter`, by two different lemmas, `Formalism.VW.rh_of_every` and `UpperTheory.riemannHypothesis_of_everyCharacter`. One route is redundant.
- Size of the gain: small. It removes one short lemma chain, not part of the hard argument.

## 2. The statement of the Riemann hypothesis exists in three copies

- Where: Mathlib's `RiemannHypothesis`; `RiemannZetaZerosOnLine` in `Statements.lean`; `Claim.Zeta` in `Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean`, with `zeta_iff : Zeta ↔ RiemannHypothesis := Iff.rfl`.
- Reason: the copies differ only in how they are written.
- Size of the gain: none for the mathematics. It only tidies the top of the library.
