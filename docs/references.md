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

Inspection depth: abstract.

Inspection: abstract only. Five files are saved and attached: `NumberTheory/LSeries/RiemannZeta.lean`, `NumberTheory/LSeries/DirichletContinuation.lean`, `NumberTheory/DirichletCharacter/Basic.lean`, `Analysis/SpecialFunctions/Gamma/Basic.lean` and `Analysis/SpecialFunctions/Gamma/Beta.lean`. Read in them: the definitions `RiemannHypothesis`, `DirichletCharacter.LFunction` and `IsPrimitive`, and the statements of `LFunction_modOne_eq` and `LFunction_eq_LSeries`. The proofs and the rest of the files are not read. Read on 23 November 2026, from the same commit and not attached: the statements of `riemannZeta_def_of_ne_zero` and `completedRiemannZeta_one_sub` (with its comment) in `NumberTheory/LSeries/RiemannZeta.lean`, the definition `Gammaℝ` and the statement of `Gammaℝ_ne_zero_of_re_pos` in `Analysis/SpecialFunctions/Gamma/Deligne.lean`, and the statement of `riemannZeta_conj` with its comment in `NumberTheory/Harmonic/ZetaAsymp.lean`. Also read on 23 November 2026, same commit: the statement of `riemannZeta_one_sub` in `NumberTheory/LSeries/RiemannZeta.lean`, the statements of `riemannZeta_two` and `riemannZeta_neg_nat_eq_bernoulli` in `NumberTheory/LSeries/HurwitzZetaValues.lean`, the statement of `bernoulli_two` in `NumberTheory/Bernoulli.lean`, and the header and the statements of `Gamma_nat_eq_factorial`, `Gamma_one` and `Gamma_add_one` in `Analysis/SpecialFunctions/Gamma/Basic.lean` (now attached); also the statements of `Complex.cos_pi` in `Analysis/SpecialFunctions/Trigonometric/Basic.lean`, `Gamma_neg_nat_eq_zero` (with its comment) in `Analysis/SpecialFunctions/Gamma/Basic.lean`, and `zeta_eq_tsum_one_div_nat_cpow` (with its comment) and `riemannZeta_residue_one` in `NumberTheory/LSeries/RiemannZeta.lean`. For the Gamma page, on 23 November 2026, statements read in `Analysis/SpecialFunctions/Gamma/Basic.lean` (`GammaIntegral`, `Gamma_pos_of_pos`, and the real and complex `Gamma_ne_zero` and `Gamma_eq_zero_iff`), `Gamma/Deriv.lean` (`differentiableAt_Gamma`, `tendsto_self_mul_Gamma_nhds_zero` and its comment), `Gamma/Beta.lean` (`Gamma_mul_Gamma_one_sub`, `Gamma_ne_zero`), `Gamma/BohrMollerup.lean` (`eq_Gamma_of_log_convex` and its comment) and `Gaussian/GaussianIntegral.lean` (`Real.Gamma_one_half_eq`, `Complex.Gamma_one_half_eq`). On 24 November 2026, searched all six files in `Analysis/SpecialFunctions/Gamma/` (`Basic.lean`, `Beta.lean`, `BohrMollerup.lean`, `Deligne.lean`, `Deriv.lean`, `Digamma.lean`) and `MeasureTheory/Integral/Gamma.lean` at this commit: found no statement equating `Gamma` to Euler's logarithmic integral, and confirmed `Gamma/Beta.lean` (now attached) cites no Euler paper for `Gamma_mul_Gamma_one_sub`. Statements and comments only; no proof read.

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

[19] Leonhard Euler. **Remarks on a beautiful relation between direct as well as reciprocal power series (E352)**. Translation with notes by Lucas Willis and Thomas J. Osler, Rowan University, 1 August 2006. [Original](http://eulerarchive.maa.org/docs/translations/E352.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read: the translators' introduction, sections 1 to 15 of the translated paper, and the translators' notes on sections 14 and 15. Sections 16 to 20 and the other notes are skimmed only. A primary source in translation; the French original (Mémoires de l'académie des sciences de Berlin 17, 1768, pages 83 to 106) is not read. The translators mark the errors that they found in Euler's digits.

## Reference 20

[20] Euler Archive. **Record of E19: De progressionibus transcendentibus seu quarum termini generales algebraice dari nequeunt**. Catalogue record, University of the Pacific Scholarly Commons. [Original](https://scholarlycommons.pacific.edu/euler-works/19/). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read: the whole record (English title, content summary, written date 1729, published date 1738, source citation Commentarii academiae scientiarum Petropolitanae, volume 5, pages 36 to 57). A catalogue record, a secondary source; Euler's paper and its translations are not read.

## Reference 21

[21] Leonhard Euler. **On transcendental progressions, that is, those whose general terms cannot be given algebraically (E19)**. Translated from the Latin by Stacy G. Langton, University of San Diego. Original in Commentarii academiae scientiarum Petropolitanae 5 (1730/1), 1738, pages 36 to 57. [Original](http://eulerarchive.maa.org/docs/translations/E019en.pdf). Accessed 23 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: full translation read (summary and sections 1 to 29 of Langton's translation: §§1, 2, 12–17 read 23 November 2026; §§18–29 read 24 November 2026; §§3–11 read 26 November 2026). A primary source in translation; the Latin original is not read. Sections 3 to 13 show how Euler moved from the Beta integral $\int_0^1 x^e(1 - x)^n\,dx$ via $e = \frac{f}{g}$, the substitution $x \mapsto x^{\frac{g}{f + g}}$, and the limit $\frac{1 - x^z}{z} \to -\ln x$ ($z \to 0$) to $\int_0^1 (-\ln x)^n\,dx$. Section 17 gives the term of index $\frac{1}{2}$ as half the square root of the circumference $p$ of a circle of diameter $1$, which is $\frac{\sqrt{\pi}}{2}$; the catalogue record [20] gives $\sqrt{\frac{\pi}{2}}$, which does not agree with the paper. Sections 18 to 29 treat ratios of progressions, algebraic-curve quadratures for fractional indices, iterated integrals, and fractional differentials, without introducing the letter $\Gamma$ or the reflection formula.

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

[26] Leonhard Euler. **Evolutio formulae integralis ∫ x^(f−1) dx (lx)^(m/n) integratione a valore x = 0 ad x = 1 extensa (E421)**. Novi Commentarii academiae scientiarum Petropolitanae, volume 16, 1772, pages 91 to 139. Original Latin scan from the Euler Archive. [Original](http://eulerarchive.maa.org/docs/originals/E421.pdf). Accessed 24 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read visually on the scan: page 91 (title page, PDF page 1) and Scholion section 43 on pages 120 to 121 (PDF pages 30 to 31), which states `[λ] · [−λ] = λ π / sin(λ π)` and derives it from Euler's infinite products. Pages 122, 124 and 126 skimmed; the rest of the paper is not read. A primary source.

## Reference 27

[27] Leonhard Euler. **Lettre I: Euler à Goldbach (13 October 1729)**. Printed in P. H. Fuss, *Correspondance mathématique et physique de quelques célèbres géomètres du XVIIIème siècle*, Tome I, St. Petersburg, 1843, pages 3 to 7. Scan from the Euler Archive (`OO0715.pdf`). [Original](http://eulerarchive.maa.org/correspondence/letters/OO0715.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read pages 3 to 5 directly on the Euler Archive scan: Euler's infinite product for $m!$ (p. 3), his $n$-factor truncation $\frac{1 \cdot 2 \cdots n}{(1 + m)\cdots(n + m)}(n + 1)^m$ (p. 4), his stated foundation *"haec series $1, 2, 6, 24, \text{etc.}$ in infinitum continuata tandem evadit geometrica"* (p. 4), his remark that Daniel Bernoulli independently found nearly the same finite approximation (p. 4), and his $m = \frac{1}{2}$ evaluation giving $\frac{\sqrt{\pi}}{2} \approx 0.8862269$ (p. 5). The rest of the letter (pages 6 to 7) is not read. A primary source.

## Reference 28

[28] Daniel Bernoulli. **Lettre XLVII: D. Bernoulli à Goldbach (6 October 1729)**. Printed in P. H. Fuss, *Correspondance mathématique et physique de quelques célèbres géomètres du XVIIIème siècle*, Tome II, St. Petersburg, 1843, pages 324 to 325. Public-domain scan of Lettre XLVII by Bruce Arnold hosted on Peter Luschny's factorial history page. [Original](http://www.luschny.de/math/factorial/DanielBernoulliLetterToGoldbach-1729-10-06.jpg). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read the header (`St.-Pétersbourg ce 6 octobre 1729`) and postscript (*P.S.*) directly on the cropped scan: Bernoulli's factorial interpolation formula $\left(A + \frac{x}{2}\right)^{x - 1}\left(\frac{2}{1 + x}\cdot\frac{3}{2 + x}\cdots\frac{A}{A - 1 + x}\right)$ and his two numerical examples ($x = \frac{3}{2}, A = 8$ giving $1.3005$, and $x = 3, A = 16$ giving $6\frac{1}{204}$). The full bound-volume viewer of Fuss Tome II was not downloaded, so the printed page numbers 324 to 325 rely on Luschny's citation. A primary source.

## Reference 29

[29] Detlef Gronau. **Why is the gamma function so as it is?**. *Teaching Mathematics and Computer Science*, volume 1, issue 1, 2003, pages 43 to 53. [Original](https://ojs.lib.unideb.hu/tmcs/article/download/14684/12586). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all 11 pages read directly from the journal PDF. Covers Daniel Bernoulli's October 6, 1729 letter (pp. 45–46, eqs. (5)–(6), including his numerical slip at $x = \frac{3}{2}, A = 8$ and faster numerical convergence than Euler's product), Euler's October 13, 1729 letter (pp. 46–47, eqs. (7)–(8)), Wallis's algebraic integral (p. 49), and Euler's own parameter shift between E19 (1729/1730) and *Institutionum calculi integralis* Vol. I (1768, caput IX, p. 240) from which Legendre's $\Gamma(a) = \int_0^1 \left(\ln \frac{1}{x}\right)^{a - 1}\,dx$ followed (pp. 51–52). A scholarly secondary source.

## Reference 30

[30] Philip J. Davis. **Leonhard Euler's Integral: A Historical Profile of the Gamma Function**. *The American Mathematical Monthly*, volume 66, number 10, December 1959, pages 849 to 869. Copy hosted at Ohio State University. [Original](https://people.math.osu.edu/gautam.42/S20/DavisGammaFunction.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read pages 852 to 853 (PDF pages 3 to 4) on Euler's 1729 infinite product, finite truncation (eq. (3)), and the observation that Euler omitted the derivation scaffolding. The rest of the article is not read. A scholarly secondary source.

## Reference 31

[31] Ed Sandifer. **How Euler Did It: Gamma the Function**. MAA Online column, September 2007. [Original](http://eulerarchive.maa.org/hedi/HEDI-2007-09.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read pages 1 to 2 on the brevity of Euler's October 1729 letter to Goldbach and on why grouping the factors as $\frac{k^{1 - n}(k + 1)^n}{k + n}$ makes the infinite product converge as written. The rest of the column is not read. A scholarly secondary source.

## Reference 32

[32] Jacqueline Stedall. **John Wallis, Arithmetica infinitorum (1656)**. Chapter 2 in I. Grattan-Guinness (ed.), *Landmark Writings in Western Mathematics 1640–1940*, Elsevier, 2005, pages 23 to 32. [Original](http://reparti.free.fr/grattan-guinness2005.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: method.

Inspection: method level. Read pages 25 to 31 directly: Wallis's discrete power-sum rules (Propositions 1, 19, 20, 39, 40), his interpolation table for $\left[\int_0^1 \left(1 - x^{\frac{1}{p}}\right)^q\,dx\right]^{-1}$, why $p = q = \frac{1}{2}$ yields $\square = \frac{4}{\pi}$, his half-integer row and decreasing consecutive-ratio squeeze yielding $\square = \frac{3 \times 3 \times 5 \times 5 \times 7 \times 7 \cdots}{2 \times 4 \times 4 \times 6 \times 6 \times 8 \cdots}$ in Proposition 191 (p. 27, eq. (7)), and Newton's 1664–1665 discovery of the general binomial theorem from reading Wallis's table (pp. 30–31). Wallis's 1656 Latin text itself was not opened directly. A scholarly secondary source.

## Reference 33

[33] Ed Sandifer. **How Euler Did It: Wallis's formula**. MAA Online column, November 2004. [Original](http://eulerarchive.maa.org/hedi/HEDI-2004-11.pdf). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: full.

Inspection: all three pages read directly. Traces Euler's integration-by-parts derivation of Wallis's product in *Institutiones calculi integralis* Vol. 1, Problem 43, §356 (1768; Sandifer's reference list prints `[E242]`, whereas Vol. 1 is Eneström E342) via $\int_0^1 \frac{x^{m - 1}\,dx}{\sqrt{1 - x^2}} = \frac{m + 1}{m} \int_0^1 \frac{x^{m + 1}\,dx}{\sqrt{1 - x^2}}$ and an informal infinite-$i$ ratio step, noting that rigorous limit/squeeze justification belonged to 19th-century analysis. A scholarly secondary source.

## Reference 34

[34] Johan Wästlund. **An elementary proof of Wallis' product formula for pi**. Linköping Studies in Mathematics No. 2, February 2005. [Original](https://liu.diva-portal.org/smash/get/diva2:375184/FULLTEXT01). Accessed 26 November 2026, Asia/Tokyo.

Inspection depth: abstract.

Inspection: abstract only. Read page 1 confirming that most modern textbook proofs of Wallis's product evaluate a definite integral such as $\int_0^{\frac{\pi}{2}} (\sin x)^n\,dx$, without naming a first author. The rest of the paper is not read. A scholarly secondary source.
