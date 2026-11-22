# The top three levels of the proof

This note traces the main theorem back three levels. Every Lean statement is copied from the pinned repository [7](../references.md#reference-7). The plain-word lines are our reading. A line marked "guess" interprets a name whose definition we have not read.

## Result in short

- The top of the proof is short and readable. The files read are small, and the list is at the end of this note.
- The proof does not treat the zeta function on its own. It proves one statement about all Dirichlet L-functions, and the Riemann hypothesis is the special case of modulus 1.
- Levels 0 to 2 are classical mathematics with short proofs. A reader can check them by hand.
- At level 3 the names become opaque (`Row0b`, `VWin`, `Green`). The hard part of the proof starts there.

## Level 0: the target

Mathlib defines the Riemann hypothesis [6](../references.md#reference-6):

```lean
def RiemannHypothesis : Prop :=
  ∀ (s : ℂ) (_ : riemannZeta s = 0) (_ : ¬∃ n : ℕ, s = -2 * (n + 1)) (_ : s ≠ 1), s.re = 1 / 2
```

In plain words: if zeta is zero at `s`, and `s` is not a trivial zero (−2, −4, …), and `s` is not 1, then the real part of `s` is 1/2.

`Main.lean` proves it in one line [3](../references.md#reference-3):

```lean
theorem riemannHypothesis : RiemannHypothesis := rhOfAll
```

The name `RiemannHypothesis` here is Mathlib's definition. The evidence is `RhOfRight.lean` (level 2): it imports only Mathlib, and it proves a theorem whose conclusion is `RiemannHypothesis`. Lean allows one declaration for each full name, so the library cannot hold a second top-level `RiemannHypothesis`.

One limit: reference [6](../references.md#reference-6) is the Mathlib file at its latest commit. The library's `lake-manifest.json` pins Mathlib at commit `0df444a360eaa60ab8c11dca51a86af692955474`. The definition has the same text at that commit [8](../references.md#reference-8).

## Level 1: `rhOfAll`

File `Supplements/Kernels/MainTheorems.lean`:

```lean
theorem allChi : UpperTheory.EveryCharacter := UpperTheory.FinalTheorems.everyCharacter

theorem rhOfAll : RiemannHypothesis := Formalism.VW.rh_of_every allChi
```

In plain words: the Riemann hypothesis follows from one statement, `EveryCharacter`, by the lemma `rh_of_every`.

## Level 2: the statement `EveryCharacter` and the step down to zeta

File `Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean`:

```lean
def UpperTheory.EveryCharacter : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (s : ℂ), 1 / 2 < s.re → (χ ≠ 1 ∨ s ≠ 1) → DirichletCharacter.LFunction χ s ≠ 0
```

In plain words: take any modulus `N`, any Dirichlet character `χ` of that modulus, and any `s` with real part above 1/2. Then the L-function of `χ` is not zero at `s`. The one excluded case is the trivial character at `s = 1`, where the function has its pole.

This is the generalized Riemann hypothesis for Dirichlet L-functions, in the form "no zeros to the right of the critical line". It uses only Mathlib's `DirichletCharacter` and `LFunction`.

File `Formalism/GammaFactorNonvanishing/CritLine.lean`:

```lean
theorem Formalism.VW.rh_of_every (h : UpperTheory.EveryCharacter) : RiemannHypothesis :=
  Formalism.VW.rh_of_right fun s hs hs1 => by
    have := h 1 (1 : DirichletCharacter ℂ 1) s hs (Or.inr hs1)
    rwa [LFunction_modOne_eq] at this
```

In plain words: use `EveryCharacter` with modulus 1 and the trivial character. That L-function is the zeta function (Mathlib's `LFunction_modOne_eq`). So zeta has no zero with real part above 1/2.

File `Formalism/GammaFactorNonvanishing/RhOfRight.lean`, which imports only Mathlib:

```lean
theorem Formalism.VW.rh_of_right (hz : ∀ s : ℂ, 1 / 2 < s.re → s ≠ 1 → riemannZeta s ≠ 0) : RiemannHypothesis := by
```

In plain words: if zeta has no zero to the right of the line, then all its non-trivial zeros are on the line.

The proof fills the rest of the 62-line file. We read it. It works as follows:

- Take a zero `s` with real part below 1/2. Then `1 − s` has real part above 1/2.
- Mathlib's functional equation `riemannZeta_one_sub` writes zeta at `s` as a product of four factors: a power of 2π, the Gamma function at `1 − s`, a cosine, and zeta at `1 − s`.
- The first two factors are never zero here. Zeta at `1 − s` is not zero, by the hypothesis `hz`.
- The cosine is zero only when `s` is an even integer `-2 * k` [7](../references.md#reference-7). The proof excludes each case: k < 0 contradicts the real part, k = 0 gives `s = 0` where zeta is not zero, and k > 0 is a trivial zero, which the hypothesis `htriv` excludes.
- So the product is not zero, and `s` is not a zero. This contradicts the choice of `s`.

So the trivial zeros are not paired with zeros on the right. They are the zeros of the cosine factor.

`CritLine.lean` also proves the matching fact for every primitive character, `Formalism.VW.critLine`. Its proof is under 20 lines and uses the same symmetry, through Mathlib's `completedLFunction_one_sub`.

## Level 3: where `EveryCharacter` comes from

File `Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean`:

```lean
theorem UpperTheory.FinalTheorems.everyCharacter_of_row (h : UpperTheory.GalStar.Row0b fun h rc => UpperTheory.Zero.LLC.IsRecT h rc) : UpperTheory.EveryCharacter :=
  UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin ⟨h, UpperTheory.Zero.LLC.recTExists, h⟩ (UpperTheory.One.vwin_of_row h)

theorem UpperTheory.FinalTheorems.everyCharacter : UpperTheory.EveryCharacter :=
  UpperTheory.FinalTheorems.everyCharacter_of_row UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter
```

In plain words: `EveryCharacter` follows from one input, called `Row0b`, and that input is supplied by `galoisLocalGlobalStrong_recParameter`. From `Row0b` the proof builds a second object, `VWin`, with `vwin_of_row`. Then `every_character_of_literature_of_vWin` combines them.

Guesses from the names, not checked:

- `Row0b` and `galoisLocalGlobalStrong_recParameter` concern Galois representations and local-global compatibility.
- `LLC` stands for the local Langlands correspondence.
- `VWin` is a statement that some comparison "wins", one case per character.

`EveryCharacter.lean` holds a theorem with the same conclusion. Guess: `every_character_of_literature_of_vWin` uses it. We have not read the file that would show the link, `EveryCharacterOfLiteratureOfVWin.lean`, so `plugAll` is not confirmed as part of the route.

```lean
theorem UpperTheory.Top.plugAll (hG : GlobalTheory.GLq.Green) (hV : UpperTheory.Top.VWin)
    (h : Nonempty (Hyps (fun 𝒞 => Closed 𝒞 fun Fm _ => LinkN Fm) DRS)) : UpperTheory.EveryCharacter :=
  UpperTheory.Top.imprimitive (UpperTheory.Top.plugWin hG hV h)
```

In plain words: three inputs (`Green`, `VWin`, and a package `Hyps`) go into `plugWin`, and the lemma `imprimitive` turns the result into `EveryCharacter`. Guess: `plugWin` gives the statement for primitive characters, and `imprimitive` extends it to all characters.

## How readable are the statements?

Verdict: readable at the top, opaque one level further down.

- Readable example: `EveryCharacter`. It uses only Mathlib terms, and a reader with the definitions can state it in one sentence.
- Opaque example: `everyCharacter_of_row`. Its hypothesis `UpperTheory.GalStar.Row0b fun h rc => UpperTheory.Zero.LLC.IsRecT h rc` cannot be read without the definitions of `Row0b` and `IsRecT`.

So the method works, but below level 3 each name needs its definition before its statement means anything. The next trace must fetch definitions, not only theorems.

## Names that need care

Several names contain `Literature`, `Hypotheses` or `published`, for example `every_character_of_literature_of_vWin` and `published_hypotheses_from_patching_alt`. We have not checked what these names record. One reading is that they formalize results from published papers.

What we know about them:

- `everyCharacter` itself takes no hypothesis. That fact alone does not show that the lemmas below it are proved: a lemma can still rest on an added axiom.
- Inside the library, some of these propositions are passed as hypotheses. For example, `CorGKOf.lean` has `corGK_of (hH : UpperTheory.V.Af.HypothesesH') : U3.CorGK`. So such a lemma is conditional, and a later theorem must supply the hypothesis.
- The dashboard reports that the main theorems rest on only the three standard axioms of Lean (`propext`, `Classical.choice`, `Quot.sound`) [4](../references.md#reference-4). If that report is right, no such proposition is left as an assumption. We have not run this check ourselves.

## Simplification candidates seen here

Two small ones, recorded in [simplifications.md](simplifications.md). They do not shorten the hard part.

## Files read

All from `src/` of the pinned repository:

- `Main.lean`
- `Statements.lean`
- `Supplements/Kernels/MainTheoremsAll.lean`
- `Supplements/Kernels/MainTheoremsCritical.lean`
- `Supplements/Kernels/MainTheorems.lean`
- `Formalism/GammaFactorNonvanishing/CritLine.lean`
- `Formalism/GammaFactorNonvanishing/RhOfRight.lean`
- `Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean`
- `Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean`
- `Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean` (declaration names, and the proofs of `strip` and `zeta`)
- `Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean`
- `Development/AutomorphicArithmetic/AutomorphicVarieties/SmallClassNumbers/CorGKOf.lean` (not on the path to `rhOfAll`)
