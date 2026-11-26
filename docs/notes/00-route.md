# The route of the proof

**Archived-release notice:** This note documents the original 20 November 2026 17-million-line Lean release (`leanprover-community/riemann-hypothesis`, commit `40e56bab026552e089d7afcfeff08d2defb9c005`) [7](../references.md#reference-7). As of 26 November 2026, the project's primary pinned source is the shorter 25 November 2026 edition (`lsernau/grh-lean`, commit `72fead10`, `grh/`) [37](../references.md#reference-37).

This note gives the route of the proof in two parts.

- Part 1 is the route that we read ourselves in the Lean library at the pinned commit [7](../references.md#reference-7). Only this part is evidence.
- Part 2 is an index: the outline of another reading project [4](../references.md#reference-4), paired with the author's timeline of 20 steps [1](../references.md#reference-1). It tells us where to look. It is not evidence for any statement about the proof.

## The rule of evidence

- A statement about the proof counts only when we read the Lean declaration behind it at the pin.
- The reading project `nasqret/riemann-rev` is a third-party aid. Our check of its guide found an outline, not a proof: see [riemann-rev-guide.md](riemann-rev-guide.md). So we use its file paths and declaration names as an index only.
- A name from the index is "not opened" until we read its declaration. The tables below say which names are opened.
- Reports of checks that other people ran are quoted as reports, from the person who ran them, and marked as not run by us.

## Result in short

- We read the route from the main theorem down four levels. Each level names the declaration that the level above uses. The trace stops at three declarations that we have not opened.
- Levels 0 to 2 are classical and short. Level 3 takes an input named `Row0b`. Its name and the name of the declaration that supplies it suggest Galois representations. We have not read its definition.
- We read two more theorems that the index names, `zeroFreeAll_of_topG` and `zeroFree_of_rpow_window`. We have not confirmed that they are on the path from the main theorem.
- The index and the timeline do not mention each other. Every pairing in Part 2 is our judgement, made from shared words and formulas.
- The first timeline step, "Stepanov determinant", has no counterpart by name in the index.

## Part 1: the route that we read

Each row is a declaration in `src/` of the pinned repository. "Uses" lists the declarations that its proof term names. The full statements are in [01-top-levels.md](01-top-levels.md).

| Level | Declaration | File | What it states | Uses |
| --- | --- | --- | --- | --- |
| 0 | `riemannHypothesis` | `Main.lean` | Mathlib's `RiemannHypothesis` | `rhOfAll` |
| 1 | `rhOfAll` | `Supplements/Kernels/MainTheorems.lean` | The same statement | `Formalism.VW.rh_of_every`, `allChi` |
| 1 | `allChi` | the same file | `UpperTheory.EveryCharacter`: no Dirichlet L-function has a zero with real part above 1/2 | `UpperTheory.FinalTheorems.everyCharacter` |
| 2 | `Formalism.VW.rh_of_every` | `Formalism/GammaFactorNonvanishing/CritLine.lean` | `EveryCharacter` implies `RiemannHypothesis` | `Formalism.VW.rh_of_right`, Mathlib's `LFunction_modOne_eq` |
| 2 | `Formalism.VW.rh_of_right` | `Formalism/GammaFactorNonvanishing/RhOfRight.lean` | No zero of zeta right of the line implies `RiemannHypothesis` | Mathlib only: the functional equation `riemannZeta_one_sub` |
| 3 | `UpperTheory.FinalTheorems.everyCharacter` | `Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean` | `EveryCharacter`, with no hypothesis | `everyCharacter_of_row`, `UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter` |
| 3 | `UpperTheory.FinalTheorems.everyCharacter_of_row` | the same file | The statement `Row0b` implies `EveryCharacter` | `every_character_of_literature_of_vWin`, `UpperTheory.One.vwin_of_row`, `UpperTheory.Zero.LLC.recTExists` |
| 4 | `UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin` | `Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/EveryCharacterOfLiteratureOfVWin.lean` | A package `OpenLiteratureStatements` and the statement `VWin` imply `EveryCharacter` | `UpperTheory.Lit.every_character_of_theta_integrals_local_matching`, and many theorems named `…_of_literature` |

Where the trace stops:

- `UpperTheory.Lit.every_character_of_theta_integrals_local_matching`: not opened. The theorem of level 4 passes all its inputs to it.
- `UpperTheory.One.vwin_of_row`: not opened. It supplies `VWin` from `Row0b`.
- `UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter`: not opened. It supplies `Row0b`.
- The definitions of `Row0b`, `VWin` and `IsRecT`: not read. So we cannot yet say in plain words what level 3 assumes.

So we know the first-hand route to level 4 only. We do not yet know from our own reading where the classical analysis ends and where the new arithmetic starts.

### Two theorems read that are not yet joined to the route

The index names both. We read their files in full. We have not found them from the top by following proof terms, so their place on the route is not confirmed.

File `Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ZeroFreeOfRpowWindow.lean`:

```lean
theorem zeroFree_of_rpow_window (F : CharFamily) {θ δ C : ℝ} (hθ : 0 < θ) (hθ1 : θ < 1) (hδ : 0 < δ)
    (h : ∀ Y₀ : ℝ, ∃ Y : ℝ, Y₀ ≤ Y ∧ ∀ y ∈ Set.Icc Y (Y ^ (1 + δ)), Gm F y ≤ C * y ^ θ) :
    ZeroFree F θ :=
  lemmaL F hθ hθ1 hδ (windowHyp_of_rpow F hδ h)
```

In plain words: take a number `θ` between 0 and 1. Suppose that, beyond every starting point, some interval from `Y` to `Y ^ (1 + δ)` exists on which the quantity `Gm F y` is at most `C * y ^ θ`. Then the conclusion `ZeroFree F θ` holds. We have not read the definitions of `Gm`, `CharFamily` and `ZeroFree`, or the proofs of `lemmaL` and `windowHyp_of_rpow`.

File `Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean`:

```lean
def TopG : Prop :=
  ∀ (la : ℝ) (G : FReq), 1 < la → HostExW la G.req →
    (∀ {eps : ℝ} (Fm : FamP eps), G.cls la Fm → HypV Fm.toFamCore) → FamilyClassConnected (G.cls la)

theorem zeroFreeAll_of_topG {la : ℝ} (hla : 1 < la) (h : TopG) (hS : ∀ ψ : PChar, HostExW la (GChi ψ).req) : ZeroFreeAll := by
```

In plain words: the statement `TopG`, with one more input for every character `ψ`, implies `ZeroFreeAll`. We have not read the definitions of the names inside `TopG`, so we cannot yet say what `TopG` means.

## Part 2: the index (not evidence)

This part records what the reading project's README says [4](../references.md#reference-4). We copy its words and its declaration names so that we know where to look. Nothing in this part is confirmed unless a line says that we opened the declaration.

### The index's route of seven steps

The index reads the proof backwards, from the theorem to its input.

| Step | Name | In one sentence (the index's words) |
| --- | --- | --- |
| D1 | Reflection | "A zero left of the critical line would have a mirror image right of it." |
| D2 | The statistic | "A weighted count of primes whose size encodes the zeros." |
| D3 | A localized Landau theorem | "An upper bound on long intervals already excludes zeros." |
| D4 | The estimate, I: a slope inequality for a chain of theta lifts | "Numbers divisible by many primes cannot be small: an upper bound for a prime sum." |
| D5 | The estimate, II: from the slope inequality to the bound | "Fourier analysis isolates the wanted character with positive weights." |
| D6 | The price of divisibility: Iwasawa theory | "The divisibility can fail a little; Galois cohomology measures by how much." |
| D7 | The automorphic foundation | "Galois representations attached to automorphic forms feed both branches." |

The index also puts labels on these steps for checks that the reading project ran. We do not repeat the labels: they are that project's claims about its own runs, and we cannot confirm them.

The index names two theorems that would show where the elementary part starts. Both are not opened:

- `riemannHypothesis_of_prime_windows`. The index says that a one-sided bound on a prime sum `G` on long intervals implies Mathlib's `RiemannHypothesis`.
- `endpoints_of_topG_vWin401`. The index says that `TopG`, with the statement `VWinAt` for every primitive character, implies the main theorems.

The index says that D1, D2 and D3 are classical analysis and that the new arithmetic is in D4 to D7. Our own reading confirms this for D1 only (level 2 in Part 1).

### The 20 timeline steps and the index

The step text is quoted from the saved text of the author's note [1](../references.md#reference-1). The note says that Claude wrote the timeline, and that the author paraphrases the parts he knows less well. Some formulas do not survive the text extraction; "…" marks a cut. The dates are not in order: steps 11 and 13 carry the earliest date, 10/6/26. So a step number is not a position in time.

Every pairing is our judgement. "Strong" means that both outlines use the same named object or formula. "Weak" means that only the general idea matches. The declaration names are copied from the index. We opened four entries: `zeroFree_of_rpow_window` (step 6), `TopG` (step 10), `every_character_of_literature_of_vWin` (step 18), and the theorems of `Main.lean` (step 20). The others are not opened.

| # | Date | Timeline step (quoted) | Counterpart in the index | Declaration names in the index | Pairing |
| --- | --- | --- | --- | --- | --- |
| 1 | 10/6/26 | "Stepanov determinant." | D4, as the idea only | none by this name | Our judgement, weak |
| 2 | 10/9/26 | "Dp ≡ 0 on a CM curve for p inert in K, D the invariant derivation, …" | D4: divisibility at the primes inert in K | `key_minor_dvd` | Our judgement, strong |
| 3 | 10/19/26+ | "qN = M k + R, using x1 · x2 + · · · + xk−1 · xk , wanting "automorphy" of N …" | No counterpart found | none | Our judgement |
| 4 | 10/6/26+ | "W (1S ) ≥ 0 via a determinant, interpret as Stepanov with multiplicity one again; bootstrap!!" | No counterpart found | none | Our judgement |
| 5 | 10/20/26 | "definitively switch to Λ aka …" (a sum of Λ(n) with the weight X/n − 1) | D2: the statistic `G`; component 4 | `Deduction.G`, `Gz`, `Gm` | Our judgement, strong: the same formula |
| 6 | 10/8/26 | "W 1(0,1] + (∼ X η ) · 1(0,1/X] ≥ 0 gives > 1 − η." | D3: a one-sided bound excludes zeros | `zeroFree_of_rpow_window` | Our judgement, weak |
| 7 | 10/14/26 | "Determinants for W (·)'s containing the desired periods, indeed GGP periods, …" | D4: periods | `chowla_selberg_period` | Our judgement, weak |
| 8 | 11/15/26 | "Iterated theta lifts U (X0 ) → U (X1 ) → · · · → U (Xm ) between totally definite unitary groups, … wins multiplicity m. Time to take m like X. . ." (the extracted text misplaces a root sign; we read "m like √X") | D4: the chain of theta lifts; component 9 | `ChainInt`, `topDesWin` | Our judgement, strong |
| 9 | 11/15/26 | "Norms of the lifts and level and cancellation of order-m terms with proven divisibility via Chowla-Selberg, Weyl, and Siegel mass." | D4: periods and sizes | `chowla_selberg_period`, `RankVal` | Our judgement, strong |
| 10 | 11/15/26 | "Sufficient lower bound on divisibility of the m-fold iterated lift." | D4: integrality and local divisibility | `ChainInt`, `key_minor_dvd`, `TopG` | Our judgement, strong |
| 11 | 10/6/26 | "Iwasawa tower via analogy to pigeonhole on Fqn /Fq ." | D6: Iwasawa theory and a pigeonhole argument; component 11 | `VWinAt`, `window1` | Our judgement, strong |
| 12 | 11/15/26 | "Seesaw: the period of the iterated lift is a Bessel period independent of the Hecke characters, Rallis." | D4, or component 14 ("agreement of theta integrals") | `ChainInt` (its file is in `Formalism/ThetaLiftIndependence/`) | Our judgement, weak |
| 13 | 10/6/26 | "Bost slope inequality." | D4: slopes | `slopeInequality_of` | Our judgement, strong: the index names Bost |
| 14 | 11/15/26 | "precise computation of the "cost" of each lift, showing that one would stop at 2/3 a priori, … need for "division"." | D4: the two costs that balance; component 9, the loss exponents | `topDesWin` | Our judgement, weak |
| 15 | 11/15/26 | "Glue together an integral structure across Hecke characters for a "gcd" i.e. extra averaging." | D5: character averaging | `ch_balance`, `Frame.Shares` | Our judgement, weak |
| 16 | 10/14/26 | "Relative trace formula, seen in a different half-plane argument …" | No counterpart found | none | Our judgement |
| 17 | 11/15/26 | "for the classes in H 1 … that we couldn't kill by twisting, fight for a significant weakening of Vandiver." | D6: the cohomology bound; component 11 | `VWinAt`, `VVle` | Our judgement, strong: the same cohomology groups, and the index names Vandiver |
| 18 | 11/15/26 | "computation of covolumes, theta series' index, congruences between lifts and forms." | Component 9 (covolume control) and component 14 (a covolume bound) | `topDesWin`, `every_character_of_literature_of_vWin` | Our judgement, strong for covolumes only |
| 19 | 10/19/26 | "precise choice of the Iwasawa tower, specifically using Behrend!!" | Component 12: auxiliary primes and Behrend towers | `pairEx`, `noRel_image` | Our judgement, strong: the index names Behrend |
| 20 | 11/16/26 | "GRH." | Component 1: the five endpoints | `riemannHypothesis` and the four other theorems of `Main.lean` | Our judgement, strong |

Steps 3, 4 and 16 and part of step 5 read like records of earlier attempts. The note itself calls step 3 the "sign-only proof of Weil and Deligne", which concerns function fields [1](../references.md#reference-1). We have not checked whether the final proof uses them.

Counts for this table: eleven timeline steps have a strong counterpart, six have a weak one, and three have none.

### Parts of the index with no timeline step

- D1, the reflection, and the passage from primitive characters to all characters (components 2 and 3). We read the reflection ourselves: level 2 in Part 1.
- Component 5, the Mellin transform and positive residues.
- Component 7, the order of choices, and component 10, hosts for every character.
- D7, the Galois representations of automorphic forms (component 13). The index says that the archive contains its own formal construction of them. We have not confirmed this. Our own reading shows only that level 3 takes the input `Row0b` from a declaration named `galoisLocalGlobalStrong_recParameter`.

## What this means for the reading order

- The reading goes down from the top by proof terms, one level at a time. The next declarations to open are the three where the trace stops, and the definitions of `Row0b` and `VWin`.
- The index is a search aid for this work. When it names a declaration, we open the declaration and write what we read.
- The Stepanov idea has no Lean declaration by that name in the index. Our weak pairing puts it with step D4 of the index, whose declaration names include `key_minor_dvd` and `slopeInequality_of`. The link to Stepanov is our judgement, not the index's. Both declarations are not opened.

## Limits of this note

- The first-hand route covers levels 0 to 4. That is eight declarations in six files. The repository's README reports 175,187 files [7](../references.md#reference-7).
- "Uses" lists the names in each proof term. It does not list what those names use in turn.
- The level 4 theorem is the last theorem of an 814-line file. We read its statement and proof term, and lines 215 to 262 of the file. We did not read the rest of that file.
- We read the route section of the index and its table of fourteen components at commit `d53b3804bd013df4cf9af3b4087728148c90c9bd`. The index's links lead to `Deicyde/riemann-hypothesis` at the same commit hash as our pin, so its line ranges apply to our files.
- A later version of the reading project has an 11-page guide. Our verdict on it is in [riemann-rev-guide.md](riemann-rev-guide.md).
