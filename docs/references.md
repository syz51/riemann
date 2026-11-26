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

Inspection: abstract only, relative to the whole library: twenty-five files read, out of 175,187 that the repository's README reports. Twenty-four are attached here as texts; the twenty-fifth, `Main.lean`, is attached to reference 3. Three were fetched directly from this repository on 23 November 2026 for [riemann-rev-guide.md](notes/riemann-rev-guide.md) and [00-route.md](notes/00-route.md): `ZeroFreeAllOfTopG.lean` and `ZeroFreeOfRpowWindow.lean`, read in full, and `EveryCharacterOfLiteratureOfVWin.lean`, of which only lines 215 to 262 and the last theorem were read. Ten more were fetched directly from this repository on 23 November 2026 for [02-stepanov.md](notes/02-stepanov.md): `KeyMinorDvd.lean`, `KeyOne.lean`, `Formalism/LatticeSlopes/Statement.lean`, `SlopeInequality.lean`, `Formalism/ThetaLiftIndependence/Statement.lean`, `FirstPrimeNeSecondPrime.lean`, `ChowlaSelbergPeriodStatement.lean`, `DesWin.lean`, and `TopShape.lean` (all nine read in full), and `PairRowIffQdRows.lean` (lines 1 to 80 read, including `RankVal`). The notes that quote the files list them. The repository says this commit is the submission exactly as published. The first twelve files were initially fetched from the mirror tamnd/riemann-lean and are byte-identical to this commit; the remaining thirteen were fetched directly from leanprover-community/riemann-hypothesis. Two files outside `src/` are also attached: `lake-manifest.json` at the same commit, read for the Mathlib pin, and the repository's README at the later commit 2dea99006976a5104032e495d7513dee40fbb5ca, read in part. The repository's challenge file `src/Challenge.lean` at that later commit is attached too and was read in full; it is not part of the submission and not in the count of twenty-five.

## Reference 8

[8] Mathlib contributors. **Mathlib at the commit the library builds against, files read by this project**. Lean source files in leanprover-community/mathlib4, commit 0df444a360eaa60ab8c11dca51a86af692955474. [Original](https://github.com/leanprover-community/mathlib4/tree/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib). Accessed 22 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Five files are saved and attached: `NumberTheory/LSeries/RiemannZeta.lean`, `NumberTheory/LSeries/DirichletContinuation.lean`, `NumberTheory/DirichletCharacter/Basic.lean`, `Analysis/SpecialFunctions/Gamma/Basic.lean` and `Analysis/SpecialFunctions/Gamma/Beta.lean`. Read in them: the definitions `RiemannHypothesis`, `DirichletCharacter.LFunction` and `IsPrimitive`, and the statements of `LFunction_modOne_eq` and `LFunction_eq_LSeries`. Read on 23 November 2026, from the same commit and not attached: the statements of `riemannZeta_def_of_ne_zero` and `completedRiemannZeta_one_sub` (with its comment) in `NumberTheory/LSeries/RiemannZeta.lean`, the definition `Gammaℝ` and the statement of `Gammaℝ_ne_zero_of_re_pos` in `Analysis/SpecialFunctions/Gamma/Deligne.lean`, and the statement of `riemannZeta_conj` with its comment in `NumberTheory/Harmonic/ZetaAsymp.lean`. Also read on 23 November 2026, same commit: the statement of `riemannZeta_one_sub` in `NumberTheory/LSeries/RiemannZeta.lean`, the statements of `riemannZeta_two` and `riemannZeta_neg_nat_eq_bernoulli` in `NumberTheory/LSeries/HurwitzZetaValues.lean`, the statement of `bernoulli_two` in `NumberTheory/Bernoulli.lean`, and the header and the statements of `Gamma_nat_eq_factorial`, `Gamma_one` and `Gamma_add_one` in `Analysis/SpecialFunctions/Gamma/Basic.lean` (now attached); also the statements of `Complex.cos_pi` in `Analysis/SpecialFunctions/Trigonometric/Basic.lean`, `Gamma_neg_nat_eq_zero` (with its comment) in `Analysis/SpecialFunctions/Gamma/Basic.lean`, and `zeta_eq_tsum_one_div_nat_cpow` (with its comment) and `riemannZeta_residue_one` in `NumberTheory/LSeries/RiemannZeta.lean`. For the Gamma page, on 23 November 2026, statements read in `Analysis/SpecialFunctions/Gamma/Basic.lean` (`GammaIntegral`, `Gamma_pos_of_pos`, and the real and complex `Gamma_ne_zero` and `Gamma_eq_zero_iff`), `Gamma/Deriv.lean` (`differentiableAt_Gamma`, `tendsto_self_mul_Gamma_nhds_zero` and its comment), `Gamma/Beta.lean` (`Gamma_mul_Gamma_one_sub`, `Gamma_ne_zero`), `Gamma/BohrMollerup.lean` (`eq_Gamma_of_log_convex` and its comment) and `Gaussian/GaussianIntegral.lean` (`Real.Gamma_one_half_eq`, `Complex.Gamma_one_half_eq`). On 24 November 2026, searched all six files in `Analysis/SpecialFunctions/Gamma/` (`Basic.lean`, `Beta.lean`, `BohrMollerup.lean`, `Deligne.lean`, `Deriv.lean`, `Digamma.lean`) and `MeasureTheory/Integral/Gamma.lean` at this commit: found no statement equating `Gamma` to Euler's logarithmic integral, and confirmed `Gamma/Beta.lean` (now attached) cites no Euler paper for `Gamma_mul_Gamma_one_sub`. On 26 November 2026, read full proof bodies at this commit for `GammaSeq_tendsto_Gamma`, `GammaSeq_mul`, `Gamma_mul_Gamma_one_sub`, and `Gamma_mul_Gamma_add_half` in `Analysis/SpecialFunctions/Gamma/Beta.lean`, `doublingGamma_eq_Gamma` and `Gamma_mul_Gamma_add_half_of_pos` in `Analysis/SpecialFunctions/Gamma/BohrMollerup.lean`, `Complex.tendsto_euler_sin_prod` in `Analysis/SpecialFunctions/Trigonometric/EulerSineProd.lean`, `Gammaℝ_mul_Gammaℝ_add_one`, `Gammaℝ_one_sub_mul_Gammaℝ_one_add`, `Gammaℝ_div_Gammaℝ_one_sub`, and `inv_Gammaℝ_one_sub` in `Analysis/SpecialFunctions/Gamma/Deligne.lean`, `jacobiTheta₂_functional_equation` in `NumberTheory/ModularForms/JacobiTheta/TwoVariable.lean`, `evenKernel_functional_equation`, `hasSum_int_completedCosZeta`, and `hurwitzZetaEven_one_sub` in `NumberTheory/LSeries/HurwitzZetaEven.lean`, `riemannZeta_one_sub` and `riemannZeta_zero` in `NumberTheory/LSeries/RiemannZeta.lean`, `Complex.tsum_exp_neg_quadratic` and its decay lemmas in `Analysis/SpecialFunctions/Gaussian/PoissonSummation.lean`, `fourier_gaussian_pi'`, `integral_cexp_quadratic`, and `integral_cexp_neg_mul_sq_add_real_mul_I` in `Analysis/SpecialFunctions/Gaussian/FourierTransform.lean`, `integral_gaussian_complex` in `Analysis/SpecialFunctions/Gaussian/GaussianIntegral.lean`, `Real.tsum_eq_tsum_fourier_of_rpow_decay`, `Real.tsum_eq_tsum_fourier`, and `Real.fourierCoeff_tsum_comp_add` in `Analysis/Fourier/PoissonSummation.lean`, and the full Mellin-continuation file `NumberTheory/LSeries/AbstractFuncEq.lean` (`WeakFEPair`, `functional_equation_aux`, `f_modif`, `g_modif`, `toStrongFEPair`, `f_modif_aux2`, `Λ₀`, `Λ`, `differentiable_Λ₀`, `hasMellin`, `functional_equation₀`, `functional_equation`, `Λ_residue_k`, `Λ_residue_zero`). Lower-level proofs in `Analysis/MellinTransform.lean` and `Analysis/Fourier/AddCircle.lean` remain unread.

## Reference 9

[9] Orlando Merino. **A Short History of Complex Numbers**. Course notes, University of Rhode Island, January 2006. [Original](https://math.mit.edu/~dunkel/Teach/18.04_2019S/historic/Merino_2006.pdf). This link is a copy at MIT, not the author's own address. Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all five pages read in full from the MIT copy on 24 November 2026 (abstract, items 1 to 16, and the bibliography; extracted text attached). The author's own address, `https://www.math.uri.edu/~merino/spring06/mth562/ShortHistoryComplexNumbers2006.pdf`, returned "not found" on 23 November 2026. A secondary source: course notes that cite the histories of Burton, Kline, van der Waerden and others.

## Reference 10

[10] Noam D. Elkies. **Math 229: Introduction to Analytic Number Theory. The Riemann zeta function and its functional equation**. Course notes, Harvard University. [Original](https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all eight pages read in full on 24 November 2026 (analytic continuation of ζ, definition of ξ(s), statement and proof of Riemann's 1859 functional equation via Gamma/Beta functions, theta transformation and Poisson summation, remarks on Dedekind zeta functions, and exercises 1 to 12; extracted text attached).

## Reference 11

[11] Athanase Papadopoulos. **Looking backward: From Euler to Riemann**. arXiv:1710.03982, October 2017. [Original](https://arxiv.org/abs/1710.03982). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: section 6, "The zeta function", from its start to the list of the ideas in Riemann's paper and the paragraph after it (pages 34 to 39), with footnotes 46 to 55. The other sections are not read. A secondary source: a survey that cites Weil's history of number theory for most of these facts. Three slips in the part read: it gives 25 April 1727 for the presentation of Euler's paper of 1737; it says that Riemann's function vanishes at the negative odd integers; it writes the line of the hypothesis as Im(s) = 1/2. The notes do not use these three statements.

## Reference 12

[12] Pelegrí Viader, Lluís Bibiloni and Jaume Paradís. **On a Series of Goldbach and Euler**. Economics Working Paper 776, Universitat Pompeu Fabra, June 2004. [Original](https://econ-papers.upf.edu/papers/776.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all 1,007 lines read/verified (abstract, first page of section 1, and section 7 read 23 November 2026; full file scanned 26 November 2026 confirming zero mentions of E19, factorial interpolation, Wallis, 1729, or Daniel Bernoulli — the single `gamma` at line 338 is the Euler–Mascheroni constant $\gamma$, and all Bernoulli mentions refer to Jakob and Johann Bernoulli). Exclusively about the Goldbach–Euler series $\sum_{m, n \ge 2} \frac{1}{m^n - 1} = 1$ and Euler's 1737 paper E72 (*Variae observationes circa series infinitas*, printed 1744; Theorems 7, 8 and 19). A secondary source on Euler's paper; E72 itself (Latin) is not read.

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

## Reference 19

[19] Leonhard Euler. **Remarks on a beautiful relation between direct as well as reciprocal power series (E352)**. Translation with notes by Lucas Willis and Thomas J. Osler, Rowan University, 1 August 2006. [Original](https://scholarlycommons.pacific.edu/euler-works/352/). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read: the translators' introduction, sections 1 to 15 of the translated paper, and the translators' notes on sections 13 to 15 (from the Euler Archive PDF `http://eulerarchive.maa.org/docs/translations/E352.pdf`; the site links the official HTTPS Euler Archive page at University of the Pacific, which hosts the same translation). On 26 November 2026, also read pages 94 to 97 (§§10 to 13) visually on the 1768 French original scan (`http://eulerarchive.maa.org/docs/originals/E352.pdf`, *Mémoires de l'académie des sciences de Berlin* 17, 1761 [1768], pp. 83–106), verifying on pp. 96–97 Euler's statement *"une observation, que j'ai prouvée ailleurs levera cet obstacle. Prenant ce signe $[\lambda]$, pour marquer ce produit: $1 \cdot 2 \cdot 3 \dots \lambda$, j'ai démontré qu'il y a toujours $[\lambda]\cdot[-\lambda] = \frac{\lambda\pi}{\sin\lambda\pi}$"*. Sections 16 to 20 and the rest of the French print are skimmed or unread. A primary source. The translators mark the errors that they found in Euler's digits.

## Reference 20

[20] Euler Archive. **Record of E19: De progressionibus transcendentibus seu quarum termini generales algebraice dari nequeunt**. Catalogue record, University of the Pacific Scholarly Commons. [Original](https://scholarlycommons.pacific.edu/euler-works/19/). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: the whole record (English title, content summary, written date 1729, published date 1738, source citation Commentarii academiae scientiarum Petropolitanae, volume 5, pages 36 to 57). A catalogue record, a secondary source; Euler's paper and its translations are not read.

## Reference 21

[21] Leonhard Euler. **On transcendental progressions, that is, those whose general terms cannot be given algebraically (E19)**. Translated from the Latin by Stacy G. Langton, University of San Diego. Original in Commentarii academiae scientiarum Petropolitanae 5 (1730/1), 1738, pages 36 to 57. [Original](http://eulerarchive.maa.org/docs/translations/E019en.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: full translation read (summary and sections 1 to 29 of Langton's translation from the Euler Archive PDF; the site links the official HTTPS Euler Archive page at `https://scholarlycommons.pacific.edu/euler-works/19/` [20], which hosts the same translation: §§1, 2, 12–17 read 23 November 2026; §§18–29 read 24 November 2026; §§3–11 read 26 November 2026). A primary source in translation; the Latin original is not read. Sections 3 to 13 show how Euler moved from the Beta integral $\int_0^1 x^e(1 - x)^n\,dx$ via $e = \frac{f}{g}$, the substitution $x \mapsto x^{\frac{g}{f + g}}$, and the limit $\frac{1 - x^z}{z} \to -\ln x$ ($z \to 0$) to $\int_0^1 (-\ln x)^n\,dx$. Section 17 gives the term of index $\frac{1}{2}$ as half the square root of the circumference $p$ of a circle of diameter $1$, which is $\frac{\sqrt{\pi}}{2}$; the catalogue record [20] gives $\sqrt{\frac{\pi}{2}}$, which does not agree with the paper. Sections 18 to 29 treat ratios of progressions, algebraic-curve quadratures for fractional indices, iterated integrals, and fractional differentials, without introducing the letter $\Gamma$ or the reflection formula.

## Reference 22

[22] Adrien-Marie Legendre. **Exercices de calcul intégral sur divers ordres de transcendantes et sur les quadratures**. Paris, Courcier, 1811. Scan of the copy of the Bayerische Staatsbibliothek, Internet Archive item 10053610bsb. [Original](https://archive.org/details/10053610bsb). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: the picture of page 221 (leaf 228 of the scan), upper two thirds, which opens the second part, "Des intégrales Eulériennes", and has the sentence "nous la représenterons plus généralement par Γ (a), et nous regarderons Γ (a) comme une fonction continue de a". The next sentence, on the Mémoires de l'Institut for the year 1810, is read only in the machine text of the scan, where one word is not legible. The machine text prints the letter Γ as T or I, so it is not evidence for the letter; the picture is. The rest of the book is not read. A primary source.

## Reference 23

[23] Enrico Bombieri. **Counting points on curves over finite fields (d'après S. A. Stepanov)**. Lecture Notes in Mathematics 383, Springer-Verlag, 1974 (Séminaire Bourbaki, 25e année, 1972/73, Exposé 430, June 1973, pages 234 to 241). [Original](https://www.numdam.org/item/SB_1972-1973__15__234_0/). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all eight content pages (pages 234 to 241) read in full from the NUMDAM scan (rendered to PNG and inspected visually; the embedded OCR text is attached). Because the embedded OCR text alters or drops several mathematical symbols, every formula cited in our notes was checked against the scanned page images. A primary exposition of Stepanov's method and Bombieri's derivation-free proof.

## Reference 24

[24] Machiel van Frankenhuijsen. **The Riemann Hypothesis for Function Fields over a Finite Field**. arXiv:0806.0044v2, June 2008. [Original](https://arxiv.org/abs/0806.0044). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read Section 3 in full (pages 19 to 25: Lemma 3.1 on Diophantine approximation, Section 3.2 on the graph of Frobenius and Example 3.5, Sections 3.3 and 3.4 on Galois covers and Theorem 3.8) and the opening paragraph of Section 4. Sections 1, 2 and the rest of Section 4 are not read. A modern exposition of Bombieri's proof.

## Reference 25

[25] Adrien-Marie Legendre. **Recherches sur diverses sortes d'intégrales définies**. Mémoires de la Classe des Sciences Mathématiques et Physiques de l'Institut de France, Année 1809, Paris, Baudouin / Garnery, August 1810, pages 416 to 509 (read 13 November 1809). Scan of the Bayerische Staatsbibliothek, MDZ item bsb10500481. [Original](https://www.digitale-sammlungen.de/en/view/bsb10500481?page=599). Accessed 24 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read visually on the BSB scan images: title page (leaf 7, "ANNÉE 1809", "AOUT, M. DCCC. X."), page 416 (leaf 538, title and "Lu le 13 novembre 1809"), page 477 (leaf 599, section 53 introducing "nous la désignerons par Γ (a)" and equation (γ)), page 478 (leaf 600), and page 485 (leaf 607). Official BSB hOCR text for those leaves is attached; all formulas and the letter Γ were checked on the scanned images. The rest of the memoir is not read. A primary source.

## Reference 26

[26] Leonhard Euler. **Evolutio formulae integralis ∫ x^(f−1) dx (lx)^(m/n) integratione a valore x = 0 ad x = 1 extensa (E421)**. Novi Commentarii academiae scientiarum Petropolitanae, volume 16, 1772, pages 91 to 139. Original Latin scan from the Euler Archive. [Original](https://scholarlycommons.pacific.edu/euler-works/421/). Accessed 24 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read visually on the Euler Archive Latin scan (`http://eulerarchive.maa.org/docs/originals/E421.pdf`; the site links the official HTTPS Euler Archive page at University of the Pacific): page 91 (title page, PDF page 1) and Scholion section 43 on pages 120 to 121 (PDF pages 30 to 31), which states `[λ] · [−λ] = λ π / sin(λ π)` and derives it from Euler's infinite products. Pages 122, 124 and 126 skimmed; the rest of the paper is not read. A primary source.

## Reference 27

[27] Leonhard Euler. **Lettre I: Euler à Goldbach (13 October 1729)**. Printed in P. H. Fuss, *Correspondance mathématique et physique de quelques célèbres géomètres du XVIIIème siècle*, Tome I, Saint Petersburg, 1843, pages 3 to 7. Scan from the Euler Archive (`OO0715.pdf`). [Original](http://eulerarchive.maa.org/correspondence/letters/OO0715.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read pages 3 to 5 directly on the Euler Archive scan: Euler's infinite product for $m!$ (p. 3), his $n$-factor truncation $\frac{1 \cdot 2 \cdots n}{(1 + m)\cdots(n + m)}(n + 1)^m$ (p. 4), his stated foundation *"haec series $1, 2, 6, 24, \text{etc.}$ in infinitum continuata tandem evadit geometrica"* (p. 4), his remark that Daniel Bernoulli independently found nearly the same finite approximation (p. 4), and his $m = \frac{1}{2}$ evaluation giving $\frac{\sqrt{\pi}}{2} \approx 0.8862269$ (p. 5). The rest of the letter (pages 6 to 7) is not read. A primary source.

## Reference 28

[28] Daniel Bernoulli. **Lettre XLVII: D. Bernoulli à Goldbach (6 October 1729)**. Printed in P. H. Fuss, *Correspondance mathématique et physique de quelques célèbres géomètres du XVIIIème siècle*, Tome II, Saint Petersburg, 1843, pages 324 to 325. Public-domain scan of Lettre XLVII by Bruce Arnold hosted on Peter Luschny's factorial history page. [Original](http://www.luschny.de/math/factorial/DanielBernoulliLetterToGoldbach-1729-10-06.jpg). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read the header (`St.-Pétersbourg ce 6 octobre 1729`) and postscript (*P.S.*) directly on the cropped scan: Bernoulli's factorial interpolation formula $\left(A + \frac{x}{2}\right)^{x - 1}\left(\frac{2}{1 + x}\cdot\frac{3}{2 + x}\cdots\frac{A}{A - 1 + x}\right)$ and his two numerical examples ($x = \frac{3}{2}, A = 8$ giving $1.3005$, and $x = 3, A = 16$ giving $6\frac{1}{204}$). The full bound-volume viewer of Fuss Tome II was not downloaded, so the printed page numbers 324 to 325 rely on Luschny's citation. A primary source.

## Reference 29

[29] Detlef Gronau. **Why is the gamma function so as it is?**. *Teaching Mathematics and Computer Science*, volume 1, issue 1, 2003, pages 43 to 53. [Original](https://doi.org/10.5485/TMCS.2003.0008). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all 11 pages read directly from the journal PDF (`https://ojs.lib.unideb.hu/tmcs/article/download/14684/12586`; canonical HTTPS DOI links to the official article page). Covers Daniel Bernoulli's October 6, 1729 letter (pp. 45–46, eqs. (5)–(6), including his numerical slip at $x = \frac{3}{2}, A = 8$ and faster numerical convergence than Euler's product), Euler's October 13, 1729 letter (pp. 46–47, eqs. (7)–(8)), Wallis's algebraic integral (p. 49), and Euler's own parameter shift between E19 (1729/1730) and *Institutionum calculi integralis* Vol. I (1768, caput IX, p. 240) from which Legendre's $\Gamma(a) = \int_0^1 \left(\ln \frac{1}{x}\right)^{a - 1}\,dx$ followed (pp. 51–52). A scholarly secondary source.

## Reference 30

[30] Philip J. Davis. **Leonhard Euler's Integral: A Historical Profile of the Gamma Function**. *The American Mathematical Monthly*, volume 66, number 10, December 1959, pages 849 to 869. Copy hosted at Ohio State University. [Original](https://people.math.osu.edu/gautam.42/S20/DavisGammaFunction.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read pages 852 to 853 (PDF pages 3 to 4) on Euler's 1729 infinite product, finite truncation (eq. (3)), and the observation that Euler omitted the derivation scaffolding. The rest of the article is not read. A scholarly secondary source.

## Reference 31

[31] Ed Sandifer. **How Euler Did It: Gamma the Function**. MAA Online column, September 2007. [Original](http://eulerarchive.maa.org/hedi/HEDI-2007-09.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read pages 1 to 2 on the brevity of Euler's October 1729 letter to Goldbach and on why grouping the factors as $\frac{k^{1 - n}(k + 1)^n}{k + n}$ makes the infinite product converge as written. The rest of the column is not read. A scholarly secondary source.

## Reference 32

[32] Jacqueline Stedall. **John Wallis, Arithmetica infinitorum (1656)**. Elsevier, 2005, Chapter 2 in I. Grattan-Guinness (ed.), *Landmark Writings in Western Mathematics 1640–1940*, pages 23 to 32. [Original](http://reparti.free.fr/grattan-guinness2005.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read pages 25 to 31 directly: Wallis's discrete power-sum rules (Propositions 1, 19, 20, 39, 40), his interpolation table for $\left[\int_0^1 \left(1 - x^{\frac{1}{p}}\right)^q\,dx\right]^{-1}$, why $p = q = \frac{1}{2}$ yields $\square = \frac{4}{\pi}$, his half-integer row and decreasing consecutive-ratio squeeze yielding $\square = \frac{3 \times 3 \times 5 \times 5 \times 7 \times 7 \cdots}{2 \times 4 \times 4 \times 6 \times 6 \times 8 \cdots}$ in Proposition 191 (p. 27, eq. (7)), and Newton's 1664–1665 discovery of the general binomial theorem from reading Wallis's table (pp. 30–31). Wallis's 1656 Latin text itself was not opened directly. A scholarly secondary source.

## Reference 33

[33] Ed Sandifer. **How Euler Did It: Wallis's formula**. MAA Online column, November 2004. [Original](http://eulerarchive.maa.org/hedi/HEDI-2004-11.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all three pages read directly. Traces Euler's integration-by-parts derivation of Wallis's product in *Institutiones calculi integralis* Vol. 1, Problem 43, §356 (1768; Sandifer's reference list prints `[E242]`, whereas Vol. 1 is Eneström E342) via $\int_0^1 \frac{x^{m - 1}\,dx}{\sqrt{1 - x^2}} = \frac{m + 1}{m} \int_0^1 \frac{x^{m + 1}\,dx}{\sqrt{1 - x^2}}$ and an informal infinite-$i$ ratio step, noting that rigorous limit/squeeze justification belonged to 19th-century analysis. A scholarly secondary source.

## Reference 34

[34] Johan Wästlund. **An elementary proof of Wallis' product formula for pi**. Linköping Studies in Mathematics No. 2, February 2005. [Original](https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A375184). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read page 1 of the PDF (`https://liu.diva-portal.org/smash/get/diva2:375184/FULLTEXT01`; this record links the fast-loading DiVA landing page) confirming that most modern textbook proofs of Wallis's product evaluate a definite integral such as $\int_0^{\frac{\pi}{2}} (\sin x)^n\,dx$, without naming a first author. The rest of the paper is not read. A scholarly secondary source.

## Reference 35

[35] Susan Addington and David Dennis. **Wallis's table of characteristic ratios**. Quadrivium, 2009 (updated 28 January 2018). [Original](https://www.quadrivium.info/GGB/WallisTable.html). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: full page read directly over HTTPS. Explains Wallis's 1656 interpolation table with columns $p$ and rows $q$, notes that the integer entries are Pascal's triangle $\binom{p + q}{p}$ and that $p = q = \frac{1}{2}$ corresponds to the quarter circle, and notes Newton's discovery of the binomial series from reading Wallis. Slip noted: the prose describes the table entry as "area under the curve to the area of the circumscribed unit square", whereas the binomial entries $\binom{p + q}{p} \ge 1$ are the reciprocal ratio (square divided by area under the curve), as verified against Stedall [32]. A teaching exposition.

## Reference 36

[36] Robin Whitty. **Theorem of the Day: Wallis's Product**. Theorem of the Day, one-page summary sheet. [Original](https://www.theoremoftheday.org/Binomial/WallisProduct/TotDWallis.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: full one-page PDF read directly over HTTPS. Confirms Wallis derived his product in Proposition 191 of *Arithmetica Infinitorum* (1656) via his method of interpolation and cites Jacqueline Stedall's 2004 Springer translation. A teaching summary sheet.

## Reference 37

[37] Lucas Sernau and Levent Alpöge. **GRH for Dirichlet L-functions, in Lean 4 (shorter edition)**. GitHub repository `lsernau/grh-lean` (with Claude and Anthropic colleagues), commit `72fead102f663d5c7a407964a13dc0cf9d977207`, released 25 November 2026. [Original](https://github.com/lsernau/grh-lean/tree/72fead102f663d5c7a407964a13dc0cf9d977207). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Fetched and read directly from commit `72fead102f663d5c7a407964a13dc0cf9d977207` on 26 November 2026: top-level `README.md`, `grh/README.md`, `grh/lean-toolchain` (`leanprover/lean4:v4.35.0`), the `mathlib` entry of `grh/lake-manifest.json` (commit `56a005855ea17e0b0958f73ec801ae140b0a1679`), `grh/src/Main.lean` (all 22 lines, including `theorem riemannHypothesis : RiemannHypothesis := New.zeta_zeros_on_line New.grh`), `grh/src/Statements.lean` (all 16 lines), `grh/src/New/Main.lean` (all 65 lines: `New.zeros_on_line` and `New.zeta_zeros_on_line`), `grh/GUIDE.md`, and in full the three single-file architecture/citation indices `grh/CONTENTS.md` (1,232 lines covering 801 `Lib/` and `New/` modules), `grh/INDEX.md` (371 lines recording 495 `Lib` files / 177,492 lines and 308 `New`+`Main`+`Statements` files / 122,410 lines = 803 files, 299,902 lines), and `grh/REFERENCES.md` (368 lines auditing 228 literature citations plus 122 unchecked files). Also fetched and read individually on 26 November 2026 for [background-theta-lifts.md](notes/background-theta-lifts.md): `grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean` (full, 421 lines), `grh/src/Lib/Weil/CompactLift/DefiniteThetaLift.lean` (full, 351 lines), `grh/src/New/UpperBound/Kernels/DefiniteKernelSize.lean` (full, 374 lines), `grh/src/New/UpperBound/Objects/RowChain.lean` (full, 457 lines), `grh/src/Lib/Weil/Construction/CanonicalTheta.lean` (full, 227 lines), `grh/src/Lib/Weil/MixedModel/ThetaInvariance.lean` (full, 642 lines), `grh/src/Lib/Adelic/Hecke/Basic.lean` (full, 420 lines), `grh/src/New/UpperBound/Seesaw/SeesawIdentity.lean` (full, 666 lines), and targeted sections/definitions in `grh/src/Lib/Adelic/AutomorphicForms/Basic.lean` (`ThetaKernel`), `grh/src/Lib/Weil/Construction/AdelicRepresentation.lean` (lines 800–1020: `lineTheta`, `exists_isThetaFunctional_signedSpace`, `Space.rawTheta`, `Space.θ`, `Space.isThetaFunctional_rawTheta`, `FunLike (𝒮 V)`), `grh/src/Lib/Weil/MixedModel/ZeroTerm.lean` (lines 680–780: `tsum_enorm_slice_le`, `hasSum_theta_slice`, `zeroTerm_ne_zero`), `grh/src/Lib/Adelic/Hecke/ClassSums.lean` (lines 1–719: `rightStabilizer`, `classIntegral`, `HasFiniteType`, `classIntegral_eq_classSum`, `classSum_eq_relIndex_smul`, `classIntegral_eq_classSum_mul`, `classIntegral_eq_inv_smul_classSum`, `classIntegral_sum`), `grh/src/Lib/Weil/DualPair/Defs.lean` (`pairChar`, `pairWeil`, `pairTheta`, `modKernel`), `grh/src/Lib/Weil/DualPair/WeilAction.lean` (`pairThetaKer`), `grh/src/Lib/Weil/DualPair/ThetaLiftConvergence.lean` (`Space.lift`, `lift_equivariant`, `liftBilin`), `grh/src/Lib/Weil/Lift.lean` (`formLift`, `IsArrow`), `grh/src/New/UpperBound/Kernels/ThetaLiftGauge.lean`, `grh/src/New/UpperBound/Kernels/JetConjugatesAndBounds.lean`, `grh/src/New/UpperBound/Objects/Rows.lean`, `grh/src/New/UpperBound/Objects/Columns.lean` (`liftKernel`, `compositeLift`), `grh/src/New/Determinant/Norms/AdjointThetaLift.lean` (`DescentPair.thetaLift`, `Data.singleLift`), `grh/src/New/Determinant/Twist/FitTwists.lean` (`Data.goodLift`), and `grh/src/New/OneLift/ComparisonOperator/ExchangeData.lean` (`Rows.carrierForm`). In total, 26 of 803 Lean source files in `grh/` were read in full or in part; the remaining 777 Lean files in `grh/` and all 794 Lean files in `grh-compact/` were not read. Primary Lean source repository for the shorter edition.

## Reference 38

[38] Andrew V. Sutherland. **Verification files for the shorter Lean proof of RH and GRH**. MIT verification page for `lsernau/grh-lean` commit `72fead10` (last updated 26 November 2026, 00:15 UTC). [Original](https://math.mit.edu/~drew/shortgrh/). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: full page read directly over HTTPS on 26 November 2026. Records that both `grh/` (803 files, ~300,000 lines of code) and `grh-compact/` (794 files, ~76,000 lines of code) passed sandboxed `lake build` (9,852 and 9,843 jobs, no errors), `#print axioms` (`propext`, `Classical.choice`, `Quot.sound` only), full kernel module replay, byte-identical exports across two machines, `nanoda`, `con-leche`, and `con-ron` (including `--compare` against `Challenge.lean`), Lean default and paranoid kernels on the exports, and `lean4lean` on the compact edition; notes that as of 2026-11-26 00:15 UTC, `lake comparator --paranoid` (on both editions across two machines) and standalone `lean4lean` on the readable edition were still running. Independent third-party verification report.

## Reference 39

[39] Leonhard Euler. **Lettre III: Euler à Goldbach (8 January 1730)**. Printed in P. H. Fuss, *Correspondance mathématique et physique de quelques célèbres géomètres du XVIIIème siècle*, Tome I, Saint Petersburg, 1843, pages 11 to 18. Scan from the Euler Archive (`OO0717.pdf`). [Original](http://eulerarchive.maa.org/correspondence/letters/OO0717.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all five PDF pages (printed pages 11 to 18) read visually on the Euler Archive scan. Euler introduces the logarithmic integral $\int_0^1 (-\ln x)^n\,dx$ (pp. 13, 15), reduces fractional indices to algebraic-curve quadratures (p. 15), and states the Beta-integral interpolation formula for $(f + g)(f + 2g)\cdots(f + ng)$ (p. 16), with no sine product or reflection formula. A primary source.

## Reference 40

[40] Leonhard Euler. **De productis ex infinitis factoribus ortis (E122)**. *Commentarii academiae scientiarum Petropolitanae*, volume 11 (1739), 1750, pages 3 to 31 (written 1739; *Opera Omnia*, Series 1, Volume 14, pages 260 to 290). Euler Archive record, original Latin scan (`E122.pdf`), and German translation by Alexander Aycock (`E122de.pdf`, Euler-Kreis Mainz). [Original](https://scholarlycommons.pacific.edu/euler-works/122/). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all 50 sections read in full in Aycock's German translation (`http://eulerarchive.maa.org/docs/translations/E122de.pdf`), and key pages verified visually on the 1750 Latin scan (`http://eulerarchive.maa.org/docs/originals/E122.pdf`): title page (p. 3), §§12–14 (p. 10), §§42–43 (p. 27), §§44–46 (pp. 28–29), and §§47–50 (pp. 30–31). Confirms zero occurrences of $\sin$, $\cos$, or any trigonometric function in E122. In §12 (p. 10) and §45 (p. 29) Euler proves $\pi = 2ag \int_0^1 \frac{x^{a - 1}\,dx}{\sqrt{1 - x^{2g}}} \cdot \int_0^1 \frac{x^{a + g - 1}\,dx}{\sqrt{1 - x^{2g}}}$; in §42 (p. 27) he evaluates $\int_0^1 x^{m - 1}\,dx\,(1 - x^n)^{-\frac{m}{n}}$ as the infinite product $\frac{1}{n - m}\cdot\frac{n \cdot n \cdot 2n \cdot 2n \cdot 3n \cdot 3n \cdots}{m(2n - m)(m + n)(3n - m)(m + 2n)(4n - m)\cdots}$ (Aycock's p. 28 typesetting misprints $(2n - m)$ twice; the 1750 Latin print on p. 27 prints $(3n - m)$ correctly), without identifying it with $\frac{\pi}{n\sin\!\left(\frac{m\pi}{n}\right)}$; and in §§47, 49 (pp. 30–31) he derives Beta-integral ratio identities with complementary exponents $c + h + 1 = 0$. A primary source.

## Reference 41

[41] Leonhard Euler. **Introductio in analysin infinitorum, Tomus primus (E101)**. Lausanne, M.-M. Bousquet, 1748 (written 1745; *Opera Omnia*, Series 1, Volume 8). Euler Archive record (`https://scholarlycommons.pacific.edu/euler-works/101/`) and Ian Bruce's parallel Latin–English edition of Chapters IX and XI (archived from `17centurymaths.com`). [Original](https://scholarlycommons.pacific.edu/euler-works/101/). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only relative to the full book. Read Chapters IX (§§143–162) and XI (§§184–194) in full in Ian Bruce's parallel Latin–English PDFs (via Internet Archive `https://web.archive.org/web/2023/http://www.17centurymaths.com/contents/euler/introductiontoanalysisvolone/ch9vol1.pdf` and `ch11vol1.pdf`), checking both the English translation and the appended Latin text of §§158, 184, and 185. Chapter IX §158 derives $\sin z = z\prod_{k = 1}^{\infty}\left(1 - \frac{z^2}{k^2\pi^2}\right)$ and Chapter XI §§184–185 writes $\frac{\pi}{2} = \frac{n}{m}\sin\!\left(\frac{m\pi}{2n}\right)\cdot\frac{2n}{2n - m}\cdot\frac{2n}{2n + m}\cdot\frac{4n}{4n - m}\cdot\frac{4n}{4n + m}\cdots$; neither chapter mentions Beta integrals, factorial interpolation, or the reflection formula. The remaining chapters of Volume 1 and all of Volume 2 are not read. A primary source.

## Reference 42

[42] Alexander Aycock. **Euler and the Multiplication Formula for the Gamma-Function**. arXiv:1901.03400, January 2019 (later published in *Euleriana*, volume 1, issue 2, 2021, pages 197 to 204). [Original](https://arxiv.org/abs/1901.03400). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all eight pages read directly from the arXiv PDF. Notes Euler's Beta-integral notation in E321 (§3, 1766) and E421 (§44, 1772), cites E421 §43 for Euler's reflection formula $[\lambda]\,[-\lambda] = \frac{\pi\lambda}{\sin(\pi\lambda)}$, cites E101 §240 and E562 §7 for the finite product for $\sin(n\phi)$, and proves that E421 §53 is equivalent to Gauss's multiplication formula. A scholarly secondary source.

## Reference 43

[43] Bernhard Riemann. **On the Number of Prime Numbers less than a Given Quantity (Ueber die Anzahl der Primzahlen unter einer gegebenen Grösse)**. *Monatsberichte der Berliner Akademie*, November 1859. Translated from the German by David R. Wilkins, Trinity College Dublin, December 1998. [Original](https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Zeta/EZeta.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read PDF pages 1 to 4 directly (title page and translated pages 1 to 3): Riemann's opening from Euler's product, his first proof starting from $\int_0^\infty e^{-nx} x^{s - 1}\,dx = \frac{\Pi(s - 1)}{n^s}$ (where $\Pi(s - 1) = \Gamma(s)$) to get $\Pi(s - 1)\zeta(s) = \int_0^\infty \frac{x^{s - 1}}{e^x - 1}\,dx$ and deforming a contour around $(0, \infty)$ to pick up residues at $\pm 2\pi i n$, revealing that $\Pi\!\left(\frac{s}{2} - 1\right)\pi^{-\frac{s}{2}}\zeta(s)$ is symmetric under $s \leftrightarrow 1 - s$; and his second proof opening with the motivation *"This property of the function induced me to introduce, in place of $\Pi(s - 1)$, the integral $\Pi\!\left(\frac{s}{2} - 1\right)$ into the general term of the series $\sum \frac{1}{n^s}$, whereby one obtains a very convenient expression for the function $\zeta(s)$"*, giving $\psi(x) = \sum_{n = 1}^{\infty} e^{-n^2\pi x}$ and citing `(Jacobi, Fund. S. 184)` for $2\psi(x) + 1 = x^{-\frac{1}{2}}\!\left(2\psi\!\left(\frac{1}{x}\right) + 1\right)$. Translated pages 4 to 9 (PDF pages 5 to 10) and the 1859 German original scan are not read. A primary source in translation.

## Reference 44

[44] Roger Howe. **Transcending Classical Invariant Theory**. *Journal of the American Mathematical Society*, volume 2, number 3, July 1989, pages 535 to 552. [Original](https://doi.org/10.1090/S0894-0347-1989-0985172-6). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all eighteen pages (pp. 535–552) read visually on rendered images of the scanned JSTOR PDF copy hosted at the University of Utah (`http://www.math.utah.edu/~ptrapa/math-library/howe/howe-transcending-JAMS.pdf`; canonical HTTPS DOI links to the AMS version of record): §1 Introduction (pp. 535–536, Theorems 1 and 1A, eq. (1.1), Remarks (a)–(d), including Remark (b) reducing the compact-member case to Classical Invariant Theory), §2 Algebraic formulation (pp. 537–538, Fock model $\mathcal{P}(\mathbb{C}^n)$, eqs. (2.1)–(2.6), Theorem 2.1, Lemma 2.2), §3 Structure of $\mathcal{P}$ as $\mathfrak{g} \oplus \mathfrak{g}'$ module (pp. 539–544, Facts 1–3, $L$-harmonics $\mathcal{H}(L)$ in eq. (3.6), compact-member properties (3.9)(a)–(d), Proposition 3.1, compact unitary pair $(M^{(1,1)}, M'^{(1,1)})$ decomposition in eqs. (3.11)–(3.13), Lemmas 3.2–3.3 on joint harmonics $\mathcal{H}(K)_\sigma \cap \mathcal{H}(K')_{\sigma'}$ in eq. (3.15), and Proposition 3.4 generating $\mathcal{P}$ from joint harmonics in eq. (3.16)), §4 Proof of Theorem 2.1 (pp. 544–547, degree threshold $\delta(\mathcal{N})$ and Lemma 4.1, quotient $\mathcal{Z}^{\tau, \tau'}$ in eq. (4.2), simultaneous cyclic vector $e_0$ for $\mathcal{U}(\mathfrak{g})^K$ and $\mathcal{U}(\mathfrak{g}')^{K'}$ in eq. (4.8), Lemma 4.2 on mutual commutants, uniqueness of irreducible quotient, quasisimplicity and admissibility), §5 Structure of noncompact dual pairs (pp. 547–550, classification of all seven real irreducible families in eqs. (5.1)–(5.2) and table (5.3) on p. 549 verifying Facts 1–3), §6 Unitary version (pp. 550–551, Theorem 6.1 proving that the von Neumann algebras of $\omega(\widetilde{G})$ and $\omega(\widetilde{G}')$ are mutual commutants via the Hilbert-space quotient $\overline{\mathcal{Z}}^{\tau, \tau'}$ and Lemma 6.2), and §7 Concluding remarks and References (pp. 551–552, including remark (b) on joint harmonics $\mathcal{H}(\widetilde{K}) \cap \mathcal{H}(\widetilde{K}')$). A primary source.

## Reference 45

[45] Roger Howe. **Remarks on Classical Invariant Theory**. *Transactions of the American Mathematical Society*, volume 313, number 2, June 1989, pages 539 to 570 (written 1976). [Original](https://doi.org/10.1090/S0002-9947-1989-0986027-X). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all thirty-two pages (pp. 539–570) read visually on rendered images of the scanned PDF copy hosted at the University of Utah (`http://www.math.utah.edu/~ptrapa/math-library/howe/howe-remarks-invariant-theory-TAMS-1989.pdf`; canonical HTTPS DOI links to the AMS version of record): Abstract and §0 Introduction (pp. 539–541); §1 Invariants (pp. 541–544, Theorems 1A and 1B on tensor invariants for $\mathrm{GL}_n$, $O_n$, and $\mathrm{Sp}_{2m}$, and Theorem 2 extending Weyl's First Fundamental Theorem to $\mathcal{A}(U, W) \simeq S(U) \otimes \Lambda(W)$); §2 Quantum algebra (pp. 544–549, Weyl/Clifford endomorphism algebra $\mathrm{End}^\circ(\mathcal{A}(U, W))$, Theorems 5–6 identifying $\mathrm{Gr}\,\mathrm{End}^\circ(\mathcal{A}(U, W)) \simeq \mathcal{A}(\widetilde{U}, \widetilde{W})$ equivariantly under $\mathrm{Sp}(\widetilde{U}) \times O(\widetilde{W})$, and the Remark on pp. 548–549 introducing the term *oscillator representation*); §3 Duality (pp. 549–556, graded Lie algebra $\mathfrak{gr} = \mathfrak{g} \oplus (\widetilde{U} \otimes \widetilde{W})$ and reductive dual pairs $(\Gamma, \Gamma')$, Theorem 7 generating $G$-invariants in $\mathrm{End}^\circ$ by $\Gamma'$, Theorem 8 isotypic decomposition $I_j \simeq \sigma_j \otimes \tau_j$, and Theorem 9 on $\Gamma'$-harmonics $\mathcal{H} = \ker \Gamma'^{(0,2)}$ and separation of variables $I_0 \otimes \mathcal{H} \twoheadrightarrow \mathcal{A}(U, W)$); §4 Examples in full (pp. 556–568: §4(a) classical spherical harmonics for $O_n$ with $\Gamma' \simeq \mathfrak{sl}_2$ and $\mathcal{P}_m \simeq \bigoplus_{0 \le 2k \le m} r^{2k}\mathcal{H}_{m - 2k}$, pp. 556–557; §4(b) Hodge/Lefschetz decomposition on $\Lambda(V_{\mathbb{C}})$ via Kähler $\mathfrak{gl}_2 = \mathrm{span}(L, \Lambda, \deg^+ + \deg^- - n, \deg^+ - \deg^-)$ and primitive forms ${}^\circ\Lambda^{p,q}$, pp. 557–558; §4(c) polynomial de Rham / Koszul complex with $2\{d, d^*\} = \deg_p + \deg_e$, homotopy $2\frac{dd^* + d^* d}{\deg_p + \deg_e} = 1 - P$, Poincaré lemma, and hook Young diagrams, pp. 558–560; §4(d) cohomology of the unitary group via symmetric/skew $(\mathrm{GL}(V), \mathrm{GL}(D))$ duality on $S(V \otimes D)$ and $\Lambda(V \otimes D)$ and self-conjugate Young diagrams, pp. 560–561; §4(e) symmetric adjoint invariants for $\mathrm{Sp}(V)$ via Propositions 1–2 decomposing $S^n(S^2(V))$ and $S^n(\Lambda^2(V))$ into even-row and even-column Young diagrams, pp. 561–564; and §4(f) Capelli identities, pp. 564–568, showing $\alpha(\mathcal{Z}(\Gamma)) = \alpha'(\mathcal{Z}(\Gamma')) = A(\Gamma) \cap A(\Gamma')$, eq. (C), and Proposition 3 giving the free polynomial generators $\gamma_l$ of $A(\mathfrak{gl}_n) \cap A(\mathfrak{gl}_m)$); and §5 Concluding remarks, Postscript, and References (pp. 568–570, connecting compact-member dual pairs to Kashiwara–Vergne [48] and $\mathrm{GL}_n \times \mathrm{GL}_m$ duality to Cauchy's Lemma and Zhelobenko). A primary source.

## Reference 46

[46] Stephen S. Kudla. **Notes on the Local Theta Correspondence**. Lecture notes for the European School in Group Theory, Schloß Hirschberg, September 1996 (110 pages, University of Maryland; hosted on the author's University of Toronto webpage). [Original](https://www.math.toronto.edu/~skudla/castle.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all six chapters (pp. 1–110) read directly from the author's PDF: Introduction (pp. 1–2); Chapter I §§I.1–I.6 (pp. 3–28, Heisenberg group $H(W) = W \oplus F$, Stone–von Neumann Theorem 1.1, Schrödinger models Lemma 2.2 and Proposition 2.3, Leray invariant and Weil index cocycle Theorem 3.1, Rao's $\mu_2$-valued cocycle reduction Theorem 4.5 and Corollaries 4.8–4.9, parabolic splitting Lemma 6.1, and nontriviality of $\mathrm{Mp}(W)$ Proposition 6.6); Chapter II §§II.1–II.6 (pp. 29–40, Definition 1.1 of reductive dual pairs as mutual commutants in $\mathrm{Sp}(\mathbb{W})$, Type I dual pairs including $(O(V), \mathrm{Sp}(W))$ and unitary pairs $(U(V), U(W))$, Type II pairs, maximal $\pi$-isotypic quotient $S(\pi) \simeq \pi \otimes \Theta_\psi(\pi)$ and Howe Duality Principle, restriction and splitting of the metaplectic cover Proposition 3.2 and Corollary 3.3, explicit Schrödinger model Proposition 4.3, and scaling identity $\omega_{\psi, V_a} = \omega_{\psi_a, V}$ Corollaries 6.1–6.2); Chapter III §§III.1–III.8 (pp. 41–58, Witt towers, parabolic subgroups, Bernstein–Zelevinsky classification, persistence and stable range Propositions 4.1, 4.3, 4.5, first occurrence indices Definition 4.6, Rallis's embedding of the trivial representation's lift Theorem 5.1, supercuspidal first occurrence and irreducibility Theorems 6.1–6.2, Bernstein–Zelevinsky compatibility Theorems 7.1–7.2, and Jacquet module filtrations Theorems 8.1–8.2); Chapter IV §§IV.1–IV.3 (pp. 59–74, seesaw dual pairs Examples 1.1–1.2, Lemmas 1.3–1.4, Proposition 1.5, orbit filtrations of restricted degenerate principal series Propositions 2.1 and 2.3, and seesaw proofs of Theorems III.6.1–III.6.2 via Proposition 3.1); Chapter V §§V.1–V.3 (pp. 75–83, Conservation and Dichotomy Conjectures 1.5, 1.6, and 2.3, Theorems 1.7–1.9, and the doubling multiplicity-one criterion Theorem 3.1, Proposition 3.5, and Corollary 3.6); and Chapter VI §§VI.1–VI.4 (pp. 84–110, low-dimensional examples, chains of supercuspidals, unramified Satake parameter matching Propositions 3.1–3.2, and Rallis's $L$-group functoriality theorem pp. 105–106). A primary exposition.

## Reference 47

[47] Stephen S. Kudla. **Some Extensions of the Siegel-Weil Formula**. Expanded lecture notes from RIMS, Kyoto (January 1992; version dated 7 January 2002, 43 pages, hosted on the author's University of Toronto webpage). [Original](https://www.math.toronto.edu/~skudla/kyoto.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all four sections and references (pp. 1–43) read directly from the author's PDF: Introduction (pp. 1–2); §I.1–I.4 (pp. 2–8, adelic dual pair $(\mathrm{Sp}(n), O(V))$, Schrödinger model eq. (I.1.6), global theta kernel $\theta(g, h; \phi)$ eq. (I.2.1), theta average $I(g; \phi)$ eq. (I.2.2), Weil's convergence criterion eq. (I.2.3), Siegel Eisenstein series, convergent Siegel–Weil formulas, and Remark (1)); §II.1–II.2 (pp. 8–17, Rallis's local embedding $R_n(V) = \mathcal{S}(V^n)_{O(V)} \hookrightarrow I_n(s_0, \chi_V)$, local reducibility and complementary spaces $V_\pm = V_{0,\pm} + V_{r,r}$ with $m + m_0 = 2n + 2$, real Harish-Chandra submodules $R_n(p, q)$, global $\Pi_n(V)$ and incoherent families $\Pi_n(\mathcal{C})$, and the global uniqueness theorem on p. 17); §III.1–III.4 (pp. 17–28, poles and residues $\bar{A}_{-1}$ and central values $\bar{A}_0$ of normalized Siegel Eisenstein series $E^*(g, s, \Phi)$, Maass central-operator regularization $\mathcal{E}(g, s', \phi)$ in the mixed model $\mathcal{S}(V_{\mathrm{an}}(\mathbb{A})^n) \otimes \mathcal{S}(W(\mathbb{A})^r)$, extended Siegel–Weil first-term identities on p. 24, and second-term identities for $n = 2, m = 4$ and spherical split spaces on pp. 24–28); and §IV.1–IV.2 (pp. 29–41, Piatetski-Shapiro–Rallis doubling integral eq. (IV.1.15), poles of $L^S(s, \pi, \chi, r)$ forcing non-vanishing theta lifts $\Theta_V(\pi) \neq 0$, global theta lift eq. (IV.1.17), Rallis inner product formula for anisotropic $V$ in eq. (IV.1.18) and regularized isotropic $V$ in eq. (IV.1.19), translation to classical Siegel Eisenstein series on $\mathbb{H}_n$ in eqs. (IV.2.22)–(IV.2.24), coherence parity criteria on p. 39, and non-trivial automorphic extensions from incoherent sections on pp. 40–41). A primary survey/research exposition.

## Reference 48

[48] Masaki Kashiwara and Michèle Vergne. **On the Segal-Shale-Weil Representations and Harmonic Polynomials**. *Inventiones mathematicae*, volume 44, 1978, pages 1 to 47. Open-access digitized scan from the Göttinger Digitalisierungszentrum (SUB Göttingen, `PPN356556735_0044`, `LOG_0008`). [Original](https://gdz.sub.uni-goettingen.de/download/pdf/PPN356556735_0044/LOG_0008.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all forty-seven pages (pp. 1–47) read visually on rendered images of the open-access SUB Göttingen GDZ scan (also indexed at EuDML `http://eudml.org/doc/142517` and PURL `https://resolver.sub.uni-goettingen.de/purl?PPN356556735_0044`): Introduction (0.1)–(0.11) (pp. 1–6, tensor products $L_k = \bigotimes^k L$ of the harmonic representation of $Mp(n)$ and $U(p, q)$, pluriharmonic polynomials eq. (F-7), intertwining integral eq. (F-3), and roadmap of Chapters I–III); Chapter I §§I.1–I.3 (pp. 6–9, Harish-Chandra unitary highest-weight modules and holomorphic sections $\mathcal{O}(\Lambda)$); Chapter II §§II.1–II.8 (pp. 10–31, orthogonal–symplectic pair $(Mp(n), O(k))$: Schrödinger model $L_k$ on $L^2(M_{n,k})$ and commuting $O(k)$-decomposition in §§II.1–II.2, holomorphic sections $\mathcal{O}(D, V_\tau)$ on the Siegel upper half-plane via Cayley transform $\mathbf{c}$ and two-sheeted cover $G_2$ in §II.3 Proposition II.3.3, intertwining integral $\mathcal{F}_I$ in §II.4 Lemma II.4.3, Proposition II.4.4, Lemma II.4.5, and cone Fourier–Laplace pushforward (4.6), pluriharmonic system $\Delta_{ij} f = 0$, separation of variables $\mathbb{C}[M_{n,k}] = \mathfrak{H}\cdot\mathbb{C}[x\,{}^t x]$, Gaussian–Fischer inner product Lemma II.5.5, irreducibility of $\tau(\lambda)$ on $\mathfrak{H}(\lambda)$ Proposition II.5.7, and injectivity of $\mathcal{F}_\lambda$ Proposition II.5.12 in §II.5, explicit minor-product highest-weight pluriharmonic polynomials and highest-weight map $\lambda \mapsto \tau(\lambda)$ for odd $k = 2l + 1$ and even $k = 2l$ in §II.6 Propositions II.6.6 and II.6.11, Corollaries II.6.7 and II.6.12, Theorems II.6.9 and II.6.13, and Proposition II.6.14, full decomposition $L_k = \bigoplus_{\lambda \in \Sigma} (\dim V_\lambda) L_k(\lambda)$ in §II.7 Theorem II.7.2, and holomorphic discrete series threshold $k \ge 2n + 1$, reproducing kernel $K_\lambda(z, w)$ Lemma II.8.5 and Corollary II.8.6, and weight classification Theorem II.8.8 in §II.8); Chapter III §§III.1–III.8 (pp. 31–47, unitary dual pair $(U(p, q), U(k))$: mixed Schrödinger–Bargmann–Fock model $\mathscr{L}_k$ on $M(q, k; \mathbb{C}) \times M(r, k; \mathbb{C})$ and commuting $U(k)$-action in §§III.1–III.2, holomorphic sections on the Siegel domain of type II in §III.3, unitary intertwining integral $\mathcal{F}(P)$ in §III.4 Proposition III.4.1 and Lemma III.4.2, pluriharmonic system $(\Delta_{ij} f)(x, y) = 0$ on $X = M(p, k; \mathbb{C}) \times M(q, k; \mathbb{C})$ in eq. (III.5.1), separation of variables $\mathbb{C}[X] = \mathbb{C}[x\,{}^t y]\,\mathfrak{H}$ in Lemma III.5.3 and Corollary III.5.4, irreducibility of $\tau(\lambda)$ on $\mathfrak{H}(\lambda)$ in Proposition III.5.6, minor-product highest-weight vectors $\Delta_1^{\alpha_1}(x)\cdots \Delta_i^{\alpha_i}(x)\,\tilde{\Delta}_1^{\beta_1}(y)\cdots \tilde{\Delta}_j^{\beta_j}(y)$ in Proposition III.6.1 eq. (III.6.2), explicit parameter set $\Sigma$ and injective correspondence $\lambda \mapsto \tau(\lambda)$ in Theorem III.6.3, unitary decomposition $L_k = \bigoplus_{\lambda \in \Sigma} (\dim V_\lambda)\,L_k(\lambda)$ in Theorem III.7.2, holomorphic discrete series criterion $k \ge p + q$ in §III.8.1, and the concluding Conjecture and 20-item References list citing Howe's preprint [45] on p. 47). A primary source.
