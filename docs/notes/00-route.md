# The route of the proof: two outlines compared

Two outlines of the proof exist. This note pairs them.

- The author's note gives a timeline of 20 dated steps [1](../references.md#reference-1). The note says that Claude wrote the timeline, and that the author paraphrases the parts he knows less well.
- The dashboard of the reading project gives a route of seven steps and fourteen components, each linked to Lean declarations [4](../references.md#reference-4).

## Result in short

- The dashboard does not mention the timeline. So every pairing in this note is our judgement, made from shared words and formulas. No source states a pairing.
- The two outlines have different orders. The timeline lists ideas with the date of each. Its dates are not in order: for example, steps 11 and 13 carry the earliest date, 10/6/26. So a step number is not a position in time. The dashboard follows the logic, backwards from the theorem.
- Eleven timeline steps have a strong counterpart. Six have a weak one. Three have none: they look like early ideas that the final proof does not use by that name.
- Six of the fourteen dashboard components have no timeline step. They include the reflection, the conversion from one character to all characters, and the Galois representations.
- The first timeline step, "Stepanov determinant", has no counterpart by name. Its idea appears in dashboard step 4 in a different form.

## The dashboard route

The dashboard reads the proof backwards, from the theorem to its input [4](../references.md#reference-4). The status column quotes the dashboard. We have not run any of these checks.

| Step | Name | In one sentence (dashboard's words) | Status |
| --- | --- | --- | --- |
| D1 | Reflection | "A zero left of the critical line would have a mirror image right of it." | Checked by two kernels; Kernel-checked at the archive pin |
| D2 | The statistic | "A weighted count of primes whose size encodes the zeros." | Kernel-checked at the archive pin |
| D3 | A localized Landau theorem | "An upper bound on long intervals already excludes zeros." | Checked by two kernels; Kernel-checked at the archive pin |
| D4 | The estimate, I: a slope inequality for a chain of theta lifts | "Numbers divisible by many primes cannot be small: an upper bound for a prime sum." | Partly checked |
| D5 | The estimate, II: from the slope inequality to the bound | "Fourier analysis isolates the wanted character with positive weights." | Kernel-checked at the archive pin |
| D6 | The price of divisibility: Iwasawa theory | "The divisibility can fail a little; Galois cohomology measures by how much." | Partly checked |
| D7 | The automorphic foundation | "Galois representations attached to automorphic forms feed both branches." | Source-read |

The dashboard's labels have these meanings [4](../references.md#reference-4):

- "Checked by two kernels": two independent checkers accepted the declarations in runs of the reading project.
- "Kernel-checked at the archive pin": the named declarations passed type, axiom and replay checks.
- "Partly checked": some named declarations are kernel-checked, and the rest are read at the source.
- "Source-read": the statement and proof term were located and read, and not replayed on their own.

All seven steps are part of the complete proof that the kernels accepted. The labels describe additional checks of single steps.

The dashboard also reports two implications checked in isolation [4](../references.md#reference-4). They show where the elementary part of the proof starts:

- A one-sided bound on the prime sum `G` on long intervals implies Mathlib's `RiemannHypothesis`. The theorem is `riemannHypothesis_of_prime_windows`.
- The statement `TopG`, with the window statement `VWinAt` for every primitive character, implies, in the dashboard's words, "RH ∧ half-plane nonvanishing ∧ critical-strip zeros, for every positive modulus". The theorem is `endpoints_of_topG_vWin401`.

So D1, D2 and D3 are classical analysis. The new arithmetic is in D4 to D7.

## The 20 timeline steps and their counterparts

The step text is quoted from the saved text of the note [1](../references.md#reference-1). Some formulas do not survive the text extraction; "…" marks a cut. Every pairing is our judgement. "Strong" means that both outlines use the same named object or formula. "Weak" means that only the general idea matches.

| # | Date | Timeline step (quoted) | Dashboard counterpart | Lean declarations the dashboard names | Pairing |
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
| 13 | 10/6/26 | "Bost slope inequality." | D4: slopes | `slopeInequality_of` | Our judgement, strong: the dashboard names Bost |
| 14 | 11/15/26 | "precise computation of the "cost" of each lift, showing that one would stop at 2/3 a priori, … need for "division"." | D4: the two costs that balance; component 9, the loss exponents | `topDesWin` | Our judgement, weak |
| 15 | 11/15/26 | "Glue together an integral structure across Hecke characters for a "gcd" i.e. extra averaging." | D5: character averaging | `ch_balance`, `Frame.Shares` | Our judgement, weak |
| 16 | 10/14/26 | "Relative trace formula, seen in a different half-plane argument …" | No counterpart found | none | Our judgement |
| 17 | 11/15/26 | "for the classes in H 1 … that we couldn't kill by twisting, fight for a significant weakening of Vandiver." | D6: the cohomology bound; component 11 | `VWinAt`, `VVle` | Our judgement, strong: the same cohomology groups, and the dashboard names Vandiver |
| 18 | 11/15/26 | "computation of covolumes, theta series' index, congruences between lifts and forms." | Component 9 (covolume control) and component 14 (a covolume bound) | `topDesWin`, `every_character_of_literature_of_vWin` | Our judgement, strong for covolumes only |
| 19 | 10/19/26 | "precise choice of the Iwasawa tower, specifically using Behrend!!" | Component 12: auxiliary primes and Behrend towers | `pairEx`, `noRel_image` | Our judgement, strong: the dashboard names Behrend |
| 20 | 11/16/26 | "GRH." | Component 1: the five endpoints | `riemannHypothesis` and the four other theorems of `Main.lean` | Our judgement, strong |

Steps 3, 4 and 16 and part of step 5 read like records of earlier attempts. The note itself calls step 3 the "sign-only proof of Weil and Deligne", which concerns function fields [1](../references.md#reference-1). We have not checked whether the final proof uses them.

## Dashboard parts with no timeline step

- D1, the reflection, and the passage from primitive characters to all characters (components 2 and 3). These are classical. Our note [01-top-levels.md](01-top-levels.md) reads them.
- Component 5, the Mellin transform and positive residues.
- Component 7, the order of choices, and component 10, hosts for every character.
- D7, the Galois representations of automorphic forms (component 13). The dashboard says the archive contains its own formal construction of them and does not cite the literature [4](../references.md#reference-4). The timeline does not name this part, although it is at the base of the dashboard's route.

## What this means for the reading order

- Read forwards from the classical end: D1 is done in [01-top-levels.md](01-top-levels.md), then D2 and D3. These need only complex analysis and prime sums.
- The Stepanov idea belongs with D4. No Lean declaration carries the name, so a study of it must start from the declarations of D4 (`key_minor_dvd`, `slopeInequality_of`), not from a search for "Stepanov".
- D7 is the least examined part: the dashboard marks it "Source-read" only.

## Limits of this note

- The dashboard links lead to `Deicyde/riemann-hypothesis` at commit `40e56bab026552e089d7afcfeff08d2defb9c005`. Our pinned repository [7](../references.md#reference-7) has the same commit hash, so the line ranges in the links apply to our files.
- We read the route section of the dashboard and its table of fourteen components. We did not read the dashboard's guide (a PDF) or its ledger of runs.
- We did not open the Lean declarations named in the table. Each name is copied from the dashboard.
