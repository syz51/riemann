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

[3] Levent Alpöge and Claude. **Main.lean, the main theorems of the Lean library**. File `src/Main.lean` in leanprover-community/riemann-hypothesis, commit 40e56bab026552e089d7afcfeff08d2defb9c005. [Original](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Main.lean). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: the file read in full: two imports and five theorems. Its imports, `Statements` and `Supplements.Kernels.MainTheoremsAll`, are read under reference 7. The repository says this commit is the submission exactly as published.

## Reference 4

[4] nasqret. **riemann-rev: status dashboard, guide and map of the formal proof**. GitHub repository README, commit d53b3804bd013df4cf9af3b4087728148c90c9bd. [Original](https://github.com/nasqret/riemann-rev/blob/d53b3804bd013df4cf9af3b4087728148c90c9bd/README.md). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read from the saved copy: the section "The route of the proof" with its seven steps, the two isolated implications and the table of fourteen components, and the lines on axioms. The table of checks was read through a fetch agent's summary. The guide (a PDF) and the ledger of runs are not read. A third-party reading aid, not an authority on the proof. The notes use it as an index of file paths and declaration names only, never as evidence.

## Reference 5

[5] Andrew V. Sutherland. **Overview of the verification of the Lean proof of the generalized Riemann hypothesis**. Web page, MIT. [Original](https://math.mit.edu/~drew/grh/). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read from the saved text: the table of checks, the section "What was verified" with the five statements and the scope, and the first lines on arithmetic consequences. The rest is not read. The title here is a description, not the page's own title.

## Reference 6

[6] Mathlib contributors. **Mathlib.NumberTheory.LSeries.RiemannZeta**. Lean source file in leanprover-community/mathlib4, commit 9c98189ea3eebebb36e263edb82e7ffc6b037303; it holds the definition `RiemannHypothesis`. [Original](https://github.com/leanprover-community/mathlib4/blob/9c98189ea3eebebb36e263edb82e7ffc6b037303/Mathlib/NumberTheory/LSeries/RiemannZeta.lean). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. One definition was read, `RiemannHypothesis`; the rest of the file is saved and not read. The commit is the latest that changed this file, not the Mathlib version the library builds against, which is commit 0df444a360eaa60ab8c11dca51a86af692955474.

## Reference 7

[7] Levent Alpöge and Claude. **The Lean library of the proof, files read by this project**. Files under `src/` in leanprover-community/riemann-hypothesis, commit 40e56bab026552e089d7afcfeff08d2defb9c005. [Original](https://github.com/leanprover-community/riemann-hypothesis/tree/40e56bab026552e089d7afcfeff08d2defb9c005/src). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only, relative to the whole library: fifteen files read, out of 175,187 that the repository's README reports. Fourteen are attached here as texts; the fifteenth, `Main.lean`, is attached to reference 3. Three of the fourteen were fetched on 23 November 2026 from this repository directly: `ZeroFreeAllOfTopG.lean` and `ZeroFreeOfRpowWindow.lean`, read in full, and `EveryCharacterOfLiteratureOfVWin.lean`, of which only lines 215 to 262 and the last theorem were read. The notes that quote the files list them. The repository says this commit is the submission exactly as published. The files were first fetched from the mirror tamnd/riemann-lean and are byte-identical to this commit. Two files outside `src/` are also attached: `lake-manifest.json` at the same commit, read for the Mathlib pin, and the repository's README at the later commit 2dea99006976a5104032e495d7513dee40fbb5ca, read in part. The repository's challenge file `src/Challenge.lean` at that later commit is attached too and was read in full; it is not part of the submission and not in the count of fifteen.

## Reference 8

[8] Mathlib contributors. **Mathlib at the commit the library builds against, files read by this project**. Lean source files in leanprover-community/mathlib4, commit 0df444a360eaa60ab8c11dca51a86af692955474. [Original](https://github.com/leanprover-community/mathlib4/tree/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Three files are saved and attached: `NumberTheory/LSeries/RiemannZeta.lean`, `NumberTheory/LSeries/DirichletContinuation.lean` and `NumberTheory/DirichletCharacter/Basic.lean`. Read in them: the definitions `RiemannHypothesis`, `DirichletCharacter.LFunction` and `IsPrimitive`, and the statements of `LFunction_modOne_eq` and `LFunction_eq_LSeries`. The proofs and the rest of the files are not read. Read on 23 November 2026, from the same commit and not attached: the statements of `riemannZeta_def_of_ne_zero` and `completedRiemannZeta_one_sub` (with its comment) in `NumberTheory/LSeries/RiemannZeta.lean`, the definition `Gammaℝ` and the statement of `Gammaℝ_ne_zero_of_re_pos` in `Analysis/SpecialFunctions/Gamma/Deligne.lean`, and the statement of `riemannZeta_conj` with its comment in `NumberTheory/Harmonic/ZetaAsymp.lean`. Also read on 23 November 2026, same commit, not attached: the statement of `riemannZeta_one_sub` in `NumberTheory/LSeries/RiemannZeta.lean`, the statements of `riemannZeta_two` and `riemannZeta_neg_nat_eq_bernoulli` in `NumberTheory/LSeries/HurwitzZetaValues.lean`, the statement of `bernoulli_two` in `NumberTheory/Bernoulli.lean`, and the statement of `Gamma_nat_eq_factorial` in `Analysis/SpecialFunctions/Gamma/Basic.lean`; also the statements of `Complex.cos_pi` in `Analysis/SpecialFunctions/Trigonometric/Basic.lean`, `Gamma_neg_nat_eq_zero` (with its comment) in `Analysis/SpecialFunctions/Gamma/Basic.lean`, and `zeta_eq_tsum_one_div_nat_cpow` (with its comment) and `differentiableAt_riemannZeta` in `NumberTheory/LSeries/RiemannZeta.lean`.

## Reference 9

[9] Orlando Merino. **A Short History of Complex Numbers**. Course notes, University of Rhode Island, January 2006. [Original](https://math.mit.edu/~dunkel/Teach/18.04_2019S/historic/Merino_2006.pdf). This link is a copy at MIT, not the author's own address. Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. The link is a copy on a course page at MIT. The author's own address, `https://www.math.uri.edu/~merino/spring06/mth562/ShortHistoryComplexNumbers2006.pdf`, returned "not found" on 23 November 2026. Read from the copy: the opening paragraph and items 4 to 8 and 11 to 15 (Cardano, Bombelli, Descartes, Euler, Wessel, Argand, Hamilton, Gauss). Items 1 to 3, 9, 10 and the bibliography are not read. A secondary source: course notes that cite the histories of Burton, Kline and others.

## Reference 10

[10] Noam D. Elkies. **Math 229: Introduction to Analytic Number Theory. The Riemann zeta function and its functional equation**. Course notes, Harvard University. [Original](https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: the opening paragraphs, the definition of ξ(s) before the theorem, and the statement of the theorem marked "Riemann 1859", with the lines on the pole at s = 1, the critical strip and the trivial zeros. The proofs and the exercises are not read.

## Reference 11

[11] Athanase Papadopoulos. **Looking backward: From Euler to Riemann**. arXiv:1710.03982, October 2017. [Original](https://arxiv.org/abs/1710.03982). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: section 6, "The zeta function", from its start to the list of the ideas in Riemann's paper and the paragraph after it (pages 34 to 39), with footnotes 46 to 55. The other sections are not read. A secondary source: a survey that cites Weil's history of number theory for most of these facts. Three slips in the part read: it gives 25 April 1727 for the presentation of Euler's paper of 1737; it says that Riemann's function vanishes at the negative odd integers; it writes the line of the hypothesis as Im(s) = 1/2. The notes do not use these three statements.

## Reference 12

[12] Pelegrí Viader, Lluís Bibiloni and Jaume Paradís. **On a Series of Goldbach and Euler**. Economics Working Paper 776, Universitat Pompeu Fabra, June 2004. [Original](https://econ-papers.upf.edu/papers/776.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: the abstract, the first page of section 1, and section 7, "Epilog", on Theorems 7, 8 and 19 of Euler's paper *Variae observationes circa series infinitas*. Sections 2 to 6, on the theorem of Goldbach and Euler, are not read. A secondary source on Euler's paper; the paper itself (Latin, printed 1744) is not read.

## Reference 13

[13] Keith Conrad. **The Infinitude of the Primes**. Course handout, Math 3240, University of Connecticut, spring 2020. [Original](https://kconrad.math.uconn.edu/math3240s20/handouts/infinitudeofprimes.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: the first lines of section 1 and the end of section 3, "Euler's proof", from equation (3.5) to the remark on the rate log(log N). The handout has no abstract. Sections 2 and 4 are not read. A teaching text, not a historical study.

## Reference 14

[14] Wikipedia contributors. **Divergence of the sum of the reciprocals of the primes**. Wikipedia, revision 1384062561. [Original](https://en.wikipedia.org/wiki/Divergence_of_the_sum_of_the_reciprocals_of_the_primes). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read through a fetch agent, which returned quotes: the lead section and single sentences of the sections "The harmonic series" and "Proofs". The page has no sentence that compares the primes with the squares; a search summary had claimed one. A tertiary source, used for one date only.

## Reference 15

[15] nasqret (Bartosz Naskręcki). **riemann-rev: the guide, the skeleton and the two deformalization notes**. GitHub repository, commit e9bdf8f4177403b66426f84b0ccbac15a4ad152a. [Original](https://github.com/nasqret/riemann-rev/tree/e9bdf8f4177403b66426f84b0ccbac15a4ad152a). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method. Read from a clone at this commit: the opening block and the table of resources of `README.md`; the text of `guide/proof-guide.pdf` (11 pages), in full for pages 1 to 4 and 10, in parts for pages 5 to 9 (the start of section 4's chain, the end of section 7), the end of page 11, and by search for the status statements; the header and the theorem list of `lean/Atlas/Architecture.lean`; the theorem list of `lean-mathlib/AtlasZeta.lean`; the first page of each of the two notes in `digests/`. Four texts are attached: the guide, the README, `Architecture.lean` and `AtlasZeta.lean`. Not compiled, and the figures, the atlas and the book are not read. A third-party reading aid, made with an AI assistant by its own statement; not an authority on the proof.

## Reference 16

[16] Mario Gliozzi. **Cardano, Girolamo**. Complete Dictionary of Scientific Biography, Charles Scribner's Sons, 2008. [Original](https://mathshistory.st-andrews.ac.uk/DSB/Cardan.pdf). This link is a copy at the MacTutor archive of the University of St Andrews, printed from encyclopedia.com. Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read in full: the three pages of the copy (the life, the paragraph on *Ars magna* and "De aliza regula", the bibliography). A tertiary source: a signed dictionary entry by a historian of science. Cardano's own text is not read.

## Reference 17

[17] Artur Ekert. **Complex and Unpredictable Cardano**. arXiv:0806.0485, 2008. [Original](https://arxiv.org/abs/0806.0485). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read from the PDF: the abstract and the end of section 4, from "Both del Ferro and Tartaglia knew" to "as subtle as it was useless". The rest is not read. The abstract calls the paper "purely recreational"; it is used only to record a disagreement between sources, not as evidence.

## Reference 18

[18] Mathlib contributors. **Mathlib.NumberTheory.Harmonic.ZetaAsymp**. Lean source file in leanprover-community/mathlib4, commit 90e6eec9fe53b02d431c90718e4a1d22d67a204e; it holds the theorem `riemannZeta_conj`. [Original](https://github.com/leanprover-community/mathlib4/blob/90e6eec9fe53b02d431c90718e4a1d22d67a204e/Mathlib/NumberTheory/Harmonic/ZetaAsymp.lean#L454-L460). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: the line of the file header on `riemannZeta_conj`, and the statement of the theorem with its comment (lines 454 to 460). The proof and the rest of the file are not read. The commit is the head of the `master` branch on the day of access, not the Mathlib version that the library of the proof builds against; we have not compiled it.
