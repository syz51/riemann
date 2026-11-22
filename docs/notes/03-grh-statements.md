# The four other statements of `Main.lean`

`Main.lean` proves five theorems [3](../references.md#reference-3). The first has Mathlib's type `RiemannHypothesis`. This note reads the types of the other four: what each says, what it rests on, and who has checked it.

## Result in short

- All four definitions use Mathlib terms only. The library adds no definition of its own to them.
- One is the Riemann hypothesis written out again. Three are forms of the generalized Riemann hypothesis for Dirichlet L-functions.
- The three forms are the usual statement and two variants of it. The classical argument shows that they agree; the note explains why below.
- The joint statement of the Lean and Mathlib maintainers certifies the Riemann hypothesis statement only [2](../references.md#reference-2). The checks that cover all five theorems are Sutherland's [5](../references.md#reference-5) and the reading project's [4](../references.md#reference-4).
- "Generalized" here means Dirichlet L-functions only. Other families of L-functions are not covered [5](../references.md#reference-5).

## The four definitions

File `src/Statements.lean` of the pinned repository, commit `40e56bab026552e089d7afcfeff08d2defb9c005` [7](../references.md#reference-7). The file has 16 lines and one import, `Mathlib`.

```lean
def RiemannZetaZerosOnLine : Prop :=
  ∀ s : ℂ, riemannZeta s = 0 → (¬∃ n : ℕ, s = -2 * ((n : ℂ) + 1)) → s ≠ 1 → s.re = 1 / 2

def DirichletLNonvanishingRightOfHalf : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (s : ℂ),
    1 / 2 < s.re → (χ ≠ 1 ∨ s ≠ 1) → DirichletCharacter.LFunction χ s ≠ 0

def DirichletLZerosOnLine : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (s : ℂ),
    0 < s.re → s.re < 1 → DirichletCharacter.LFunction χ s = 0 → s.re = 1 / 2

def PrimitiveDirichletLZerosOnLine : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N), χ.IsPrimitive →
    ∀ s : ℂ, 0 < s.re → s.re < 1 → DirichletCharacter.LFunction χ s = 0 → s.re = 1 / 2
```

| Definition | In plain words | Rests on |
| --- | --- | --- |
| `RiemannZetaZerosOnLine` | The Riemann hypothesis, written out. | Mathlib only: `riemannZeta` |
| `DirichletLNonvanishingRightOfHalf` | No Dirichlet L-function has a zero with real part above 1/2. | Mathlib only: `DirichletCharacter`, `DirichletCharacter.LFunction` |
| `DirichletLZerosOnLine` | Every zero of a Dirichlet L-function inside the critical strip is on the critical line. | Mathlib only: the same two |
| `PrimitiveDirichletLZerosOnLine` | The same, for primitive characters only. | Mathlib only: the same two, and `IsPrimitive` |

Evidence for "Mathlib only": the file imports nothing else, so no other definition can be in scope. Sutherland's overview says the same of the four notions [5](../references.md#reference-5).

## The Mathlib terms, explained

We read these definitions in Mathlib at commit `0df444a360eaa60ab8c11dca51a86af692955474`, the version the library builds against [8](../references.md#reference-8).

- **Dirichlet character.** Fix a whole number `N ≥ 1`, the modulus. A Dirichlet character `χ` gives a complex number to each whole number. The value depends only on the remainder modulo `N`, it is multiplicative (`χ(ab) = χ(a)χ(b)`), and it is 0 when the number shares a factor with `N`. `DirichletCharacter ℂ N` is the type of these characters. `[NeZero N]` says that `N` is not 0.
- **The trivial character.** `χ = 1` is the character with value 1 on every number that shares no factor with `N`. For `N = 1` it is the constant 1.
- **L-function.** For real part of `s` above 1, `L(χ, s)` is the sum of `χ(n) / n^s` over all `n ≥ 1`. For `χ = 1` and `N = 1` this is the zeta function. Mathlib's `DirichletCharacter.LFunction` is this function extended to all complex `s`. Mathlib's lemma `LFunction_eq_LSeries` states the agreement for real part above 1, and `LFunction_modOne_eq` states that modulus 1 gives `riemannZeta`.
- **Primitive.** A character modulo `N` is primitive when it does not come from a character of a smaller modulus. Mathlib writes this as `conductor χ = n`.
- **The condition `χ ≠ 1 ∨ s ≠ 1`.** The L-function of the trivial character has a pole at `s = 1`, like zeta. A Lean function must have a value everywhere, so it has some conventional value at the pole. The condition excludes that one point. Sutherland gives the same reason for `s ≠ 1` in the zeta statement [5](../references.md#reference-5).

## How the statements relate

**`RiemannZetaZerosOnLine` and `RiemannHypothesis`.** The two texts differ in one place: `-2 * ((n : ℂ) + 1)` against `-2 * (n + 1)`. The first writes out the conversion of `n` to a complex number, which Lean inserts by itself in the second. Sutherland states that Lean accepts the two as equal by definition [5](../references.md#reference-5). In `Main.lean` the same term `rhOfAll` proves both theorems, which shows the same fact.

**The three Dirichlet statements.** The usual statement of the generalized Riemann hypothesis is the primitive one, `PrimitiveDirichletLZerosOnLine`. Sutherland calls it "the form in which the Generalized Riemann Hypothesis for Dirichlet L-functions is usually stated" [5](../references.md#reference-5).

The other two relate to it as follows. These are classical facts, and we mark them as our explanation:

- *All characters, not only primitive ones* (`DirichletLZerosOnLine`). A non-primitive character comes from a primitive one of smaller modulus. Its L-function is the primitive L-function times finitely many factors `1 − χ(p)/p^s`. Such a factor is zero only at points with real part 0. So inside the strip, where the real part is above 0, both functions have the same zeros. The statement for all characters therefore says nothing more than the primitive one.
- *No zeros on the right* (`DirichletLNonvanishingRightOfHalf`). For a primitive character, the functional equation pairs the zeros of `L(χ, s)` in the strip with the zeros of the L-function of the conjugate character at `1 − s`. So "no zero to the right of the line" excludes zeros to the left as well. For a non-primitive character, first move the zero to its primitive character, as in the bullet above. This is the reflection step that [01-top-levels.md](01-top-levels.md) reads for zeta.

In the library, the proof goes in this direction: it proves the "no zeros on the right" form first (`allChi`), and derives the other two from it (`claimAll.2.1` and `critAll`). The lemmas are `Claim.strip` in `ClaimStrip.lean` and `Formalism.VW.critLine` in `CritLine.lean`. We read the proof of `Claim.strip`. It uses both facts above: `prim_zero` moves a zero to the primitive character, and `prim_reflect` reflects it.

None of the three statements speaks about zeros with real part 0 or below. Those are the trivial zeros and the zeros of the extra factors, which the hypothesis does not concern.

## Who has checked these statements

The danger for a formal proof is a theorem whose statement does not say what its name says. The check against it is a "challenge" file: a separate file that states the theorems and imports only Mathlib. A comparison tool then confirms that the proof proves exactly those statements.

| Check | Covers | Result as reported | Source |
| --- | --- | --- | --- |
| Joint statement of the Lean and Mathlib maintainers | The Riemann hypothesis statement only | Two tools, comparator and con-leche, confirm that the theorem is "exactly Mathlib's statement of the Riemann Hypothesis" | [2](../references.md#reference-2) |
| Sutherland, con-leche in compare mode | All five theorems | "all five theorems "justified by the solution"" | [5](../references.md#reference-5) |
| Sutherland, con-ron in compare mode | All five theorems | The same result | [5](../references.md#reference-5) |
| Sutherland, lake comparator | All five theorems | Listed as running: statement comparison and axiom check passed in one run, kernel stages in progress | [5](../references.md#reference-5) |
| Sutherland, axioms of the five theorems | All five theorems | Only `propext`, `Classical.choice`, `Quot.sound` | [5](../references.md#reference-5) |
| Reading project, comparison with the challenge | All five theorems | "All five canonical statements matched" | [4](../references.md#reference-4) |

We ran none of these checks. Two things we did compare ourselves:

- The four definitions in the community repository's challenge file `src/Challenge.lean` have the same text as those in `Statements.lean`. We read the challenge at commit `2dea99006976a5104032e495d7513dee40fbb5ca` [7](../references.md#reference-7).
- Mathlib's definition `RiemannHypothesis` has the same text at the pinned Mathlib commit [8](../references.md#reference-8) and at the later commit of reference [6](../references.md#reference-6).

## Limits of this note

- The challenge file has the same definitions as the library's own `Statements.lean`. So the comparison shows that the proofs prove these statements. It does not show that the statements are the right mathematics. That rests on reading them, as this note does, and on Mathlib's definitions of `riemannZeta` and `LFunction`, which we did not read below their statements.
- Sutherland describes one more check that does not depend on Mathlib's definition of zeta: the proof combined with a formalization of Robin's and Lagarias's criteria [5](../references.md#reference-5). We have not read that part.
- The scope is Dirichlet L-functions. Sutherland states that Dedekind zeta functions, Hecke L-functions and automorphic L-functions in general are not among the checked statements [5](../references.md#reference-5).
- Early news reports named one more check of the statement, by Elliot Glazer. The joint statement [2](../references.md#reference-2), the dashboard [4](../references.md#reference-4) and Sutherland's overview [5](../references.md#reference-5) do not contain that name, so this note does not cover it.
