# Simplification candidates

Each entry names a place where the argument or formalization looks longer or heavier than it needs to be, the reason, and the Lean declarations it concerns. An entry is a candidate, not a checked simplification.

## Current shorter edition (`lsernau/grh-lean`, commit `72fead10`)

The project's primary pinned source is the shorter 25 November 2026 readable edition (`grh/` in `lsernau/grh-lean@72fead10`) [37](../references.md#reference-37), which already dropped the top-level duplicate routes listed in the archived section below.

- **Community watch:** As human mathematicians unpack the argument on the public G.R.H. Polymath forum (`https://rh-polymath.zulipchat.com`) [56](../references.md#reference-56) and in `leanprover-community/riemann-hypothesis` (`main`), genuine mathematical shortcuts that emerge there will be logged below once verified directly against the Lean declarations and primary literature.

### S1. External-checker memory and time bottleneck in `New.Variety.tiltTheory`

- **Where:** `New.Variety.tiltTheory` in `grh/src/Lib/PadicComparison/Primitive/PeriodCoefficients.lean`, line 650 (`lsernau/grh-lean@72fead10`, lines 635–675 read directly) [37](../references.md#reference-37).
- **Reason:** In Andrew Sutherland's `shortgrh/` verification [38](../references.md#reference-38), standalone `lean4lean` on `grh/` took 2 h 35 min 5 s and peaked at 332 GB RAM, spending 2 h 12 min on this single definition (so the 128 GB machine A had to stop `lean4lean` without a verdict while all other stages accepted). By contrast, Sutherland reports that `grh-compact/` defines `tiltTheory` differently, and `lean4lean` checked all 204,580 declarations of `grh-compact/` in 28 min 39 s using ~7 GB RAM (and Lean's own default and paranoid kernels check the entire `grh/` export in about half an hour under 8 GB) [38](../references.md#reference-38).
- **Size of the gain:** Verification-engineering and term-size simplification rather than a shorter mathematical proof; replacing or factoring the `grh/` definition along the lines of `grh-compact/` would bring `lean4lean` on the readable edition back into ordinary workstation memory.
- **Not checked:** We have not yet fetched `grh-compact/`'s version of `tiltTheory` to inspect the exact term-level difference.

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
