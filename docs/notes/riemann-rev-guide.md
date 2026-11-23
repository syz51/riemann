# The 11-page guide in `nasqret/riemann-rev`: what it is, and what it is not

Question from the owner (23 November 2026): a repository says that it shrinks the proof to 11 pages. Is that claim valid, and is the short text equal to the Lean proof?

Read: the repository `nasqret/riemann-rev` at commit `e9bdf8f4177403b66426f84b0ccbac15a4ad152a` [15](../references.md#reference-15). The saved text of the guide is `sources/dashboard/riemann-rev-guide-e9bdf8f.txt`. An earlier commit of the same repository is our Reference 4, the source of the seven-step route in [00-route.md](00-route.md).

## Result in short

- The repository does not claim an 11-page proof. Its 11-page file, `guide/proof-guide.pdf`, is a guide to the architecture of the proof.
- The guide does not prove the Riemann hypothesis. It proves no step in full. It states each step and says why the next step is needed.
- So the guide is not equal to the Lean proof. It is an outline of the same proof, written from the Lean source and from the author's note.
- The outline is honest about this. The statements that we compared with the pinned Lean source agree with it.
- No short human proof exists yet. The repository says so itself.

## What the repository says about itself

All quotations are from the README or the guide at the commit above [15](../references.md#reference-15).

- README: "A map of an announced proof and a record of who has checked what. It is not a proof, not a referee report and not an endorsement".
- README: "The human-readable mathematics has not been written up yet".
- README: "No human-readable proof exists so far; this repository is one attempt to map the formal one."
- Guide, title: "Its architecture: the statements, the flow, and why each idea calls for the next".
- Guide, page 10: "§§4–7 are read here from the Lean source and from the announcement, not re-derived."
- `lean/Atlas/Architecture.lean`: "This file is a **map**, not a proof of the Riemann hypothesis."

The words "11 pages" and "shrink" do not occur in the README. The page count comes from the PDF: `pdfinfo` reports 11 pages. Page 11 is a table of notation.

## What the 11 pages hold

| Section | Content | Depth |
| --- | --- | --- |
| 1, Reflection | The functional equation moves a zero left of the line to a zero right of it. | Classical; stated, with the reason |
| 2, The statistic | The sum `G(y)` over primes with a ramp weight, and its Mellin transform. | Classical; stated, with formulas |
| 3, A localized Landau theorem | An upper bound for `G` on long intervals excludes zeros right of the line. | A proposition and three ideas; a sketch, not a full proof |
| 4, The estimate I | A chain of theta lifts and Bost's slope inequality give an upper bound for a prime sum. | Described from the Lean source and the author's note |
| 5, The estimate II | Averaging over characters, the host fields. | Described |
| 6, Iwasawa theory | The bound for Galois cohomology on a window. | Described |
| 7, The automorphic foundation | Galois representations of automorphic forms. | Described |
| Last pages | Why each idea needs the next; what is machine-checked; notation. | Summary |

Sections 4 to 7 hold the new arithmetic. By the guide's own count, the implication from the outcome of sections 4 and 6 to the theorem takes 1,421 of the 175,187 modules. The other modules belong to sections 4 to 7. The guide gives them about six pages and re-derives none of them.

## What the repository checks itself

- `lean/Atlas/Architecture.lean` is a skeleton with no imports. Each mathematical part of the proof is a hypothesis: a field of the structures `Reflection`, `Descent`, `Engine` and `Supply`. The theorems prove only that these hypotheses together give the result. A toy model at the end satisfies all hypotheses. The file says: "it says nothing about which model is the real one".
- `lean-mathlib/AtlasZeta.lean` proves one classical step against Mathlib: no zero of zeta right of the line implies Mathlib's `RiemannHypothesis`. This is our step D1.
- We read these two files. We did not compile them.

## What we compared with the pinned Lean source

Source: `leanprover-community/riemann-hypothesis` at `40e56bab` [3](../references.md#reference-3). The guide links to the mirror `Deicyde/riemann-hypothesis` at the same commit hash.

| Guide | Lean declaration, read at the pin | Result |
| --- | --- | --- |
| Proposition of section 3: a zero right of θ shows in every late window `[Y, Y^(1+δ)]` | `Deduction.zeroFree_of_rpow_window`: if for every `Y₀` some `Y ≥ Y₀` has `Gm F y ≤ C * y ^ θ` on `Icc Y (Y ^ (1 + δ))`, then `ZeroFree F θ` | Agree. The Lean form is the contrapositive of the guide's Proposition: a bound on windows that exist arbitrarily late excludes the zero |
| "TopG, the outcome of §4 as one proposition" | `UpperTheory.Top.TopG`, a `def … : Prop`, and `zeroFreeAll_of_topG` | Agree: `TopG` is a proposition, and it implies `ZeroFreeAll` with a host hypothesis |
| "the final assembly `every_character_of_literature_of_vWin`" | The theorem exists at the stated path. It takes `O : OpenLiteratureStatements` and `hV : VWin` | The name and the role agree. We did not read how the archive discharges `O` |
| Section 1 for zeta | `Formalism.VW.rh_of_right`, read earlier in [01-top-levels.md](01-top-levels.md) | Agree |

## What we did not check

- Whether sections 4 to 7 of the guide describe the Lean proofs correctly. This needs a reading of the arithmetic part of the archive.
- The numbers in the guide, for example the exponents and `VWinAt ψ 401`.
- The reports of other people's kernel runs. We ran no check ourselves.
- The two "deformalization" notes, apart from their first pages. See below.

## The two notes that do contain full proofs

The same repository has two other texts. They are closer to "the proof on paper", but each covers a very small part.

- Deformalization 1, `digests/tower-bound/tower-bound.pdf`, 21 pages. It rewrites one cluster: "29 files, 1,193 lines, 42 theorems and lemmas". The algebra is proved in full. Of three arithmetic inputs, "two are stated with a sketch".
- Deformalization 2, `digests/local-nilpotence/local-nilpotence.pdf`, 8 pages. It proves one input of the first note in full. It covers "13 of its 144 declarations" of one unit.
- Both notes say: "That is a claim, and nothing here asserts that the hypothesis is proved."

For scale: the exported proof has 1,484,733 declarations, by the repository's own record. The two notes cover 108 and 27 declarations in their concordances.

## Meaning for this project

- The guide is a good reading aid for the route. It is the long form of the dashboard that [00-route.md](00-route.md) already uses.
- The two notes show a method for our own goal: take one small cluster, write it as ordinary mathematics, and keep a table of the Lean declarations.
- The guide is not a simplification of the proof. A simplification must still prove sections 4 to 7.
