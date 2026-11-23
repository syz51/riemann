# Background: the Gamma function

Record for the page `site/src/GammaPage.tsx`. The owner asked on 23 November 2026 what Γ is, and then asked for more research and a page of its own. Each statement below names the source that was read. A remark of our own is marked "own". Statements of Mathlib are read at commit 0df444a3, the commit that the library of the proof builds against [8](../references.md#reference-8); the proofs are not read and nothing is compiled.

## Where it came from

- Euler, paper E19, in Langton's translation [21](../references.md#reference-21). The year of writing, 1729, is from the catalogue record [20](../references.md#reference-20), not from the paper.
  - Section 1: "Recently, prompted by those results concerning series which the celebrated Goldbach has communicated to the Society, I was looking for a general expression which would give all the terms of the progression 1 + 1 · 2 + 1 · 2 · 3 + 1 · 2 · 3 · 4 + etc." He found an endless product.
  - Section 2: with a product of Wallis for the area of the circle, "we can conclude that the term of index 1/2 is equal to the square root of the circle whose diameter = 1".
  - Section 14: "the general term of the sequence 1, 2, 6, 24, 120, 720 etc. is ∫ dx (−lx)ⁿ". Check by Euler for n = 3: "what will remain is 6, which is the third term". The integral is taken from x = 0 to x = 1 (he puts x = 0, then x = 1).
  - Section 15: the method "is very useful for getting the terms of fractional index".
  - Section 17: "let the circumference of this circle be p; the area will be = ¼p, so that ∫ dx √(−lx) gives ½√p". For diameter 1 the circumference is π, so the term of index 1/2 is √π/2.
  - Own arithmetic: √π/2 ≈ 0.8862. The area of a circle of diameter 1 is π/4, and its square root is √π/2, so sections 2 and 17 agree.
  - The catalogue record [20] gives the value as √(π/2). The paper does not say that; the record is wrong on this point.

## The name Γ

- Legendre, Exercices de calcul intégral, 1811, page 221 [22](../references.md#reference-22), read on the picture of the page: "j'ai cru qu'il me serait permis de donner plus spécialement le nom d'intégrales Eulériennes, à deux sortes de transcendantes". Of the second, ∫ dx (log 1/x)^(a−1) between x = 0 and x = 1: "Euler représente cette intégrale par le symbole [p/q], en supposant que a soit égal à la fraction rationnelle p/q; nous la représenterons plus généralement par Γ (a), et nous regarderons Γ (a) comme une fonction continue de a."
- The next sentence, in the machine text of the scan only: he gives the theory as he gave it before "dans les Mémoires de l'Institut, pour l'année 1810". One word of that sentence is not legible in the machine text.
- Own reading of the two sources: log(1/x) is −log x, so Legendre's integral is Euler's with the power a − 1 in place of n. So Γ(a) is Euler's term of index a − 1. This gives the shift: Γ(n + 1) = 1 · 2 ⋯ n.

## The rules, from Mathlib

- Header of `Gamma/Basic.lean`: "We define this by Euler's integral `Γ(s) = ∫ x in Ioi 0, exp (-x) * x ^ (s - 1)` in the range where this integral converges". "We show that this integral satisfies `Γ(1) = 1` and `Γ(s + 1) = s * Γ(s)`; hence we can define `Γ(s)` for all `s` as the unique function satisfying this recurrence and agreeing with Euler's integral in the convergence range. (If `s = -n` for `n ∈ ℕ`, then the function is undefined, and we set it to be `0` by convention.)"
- `Gamma_one : Gamma 1 = 1`. `Gamma_add_one (s : ℂ) (h2 : s ≠ 0) : Gamma (s + 1) = s * Gamma s`. `Gamma_nat_eq_factorial (n : ℕ) : Gamma (n + 1) = n !`.
- `Real.Gamma_one_half_eq : Real.Gamma (1 / 2) = √π`, with the comment "The special-value formula `Γ(1/2) = √π`, which is equivalent to the Gaussian integral".
- Own check: by `Gamma_add_one`, Γ(3/2) = (1/2) Γ(1/2) = √π/2. This is Euler's term of index 1/2. The two sources agree.
- Not checked: that Mathlib's integral, with exp(−x) and x from 0 to infinity, equals Euler's integral with the logarithm. Mathlib calls its integral "Euler's integral"; we did not read a statement that links the two forms. The page says "an integral of Euler's kind" only.

## Where Γ has no value

- No value at 0, −1, −2, …: the header above. `Gamma_neg_nat_eq_zero (n : ℕ) : Gamma (-n) = 0` is the convention value, not a value of the function.
- Near 0: `tendsto_self_mul_Gamma_nhds_zero : Tendsto (fun z : ℂ => z * Gamma z) (𝓝[≠] 0) (𝓝 1)`, with the comment "At `s = 0`, the Gamma function has a simple pole with residue 1". In plain words: as z comes close to 0, z Γ(z) comes close to 1. Own conclusion: Γ(z) is close to 1/z there, so its size grows without limit.
- At the other points: `differentiableAt_Gamma (s : ℂ) (hs : ∀ m : ℕ, s ≠ -m) : DifferentiableAt ℂ Gamma s`. `Gamma_ne_zero {s : ℂ} (hs : ∀ m : ℕ, s ≠ -m) : Gamma s ≠ 0`.
- Own remark, for −1, −2, …: the rule gives Γ(s) = Γ(s + 1)/s, so the behaviour at 0 moves one step to the left each time. We read no Mathlib statement on the behaviour near −1, −2, ….
- `Real.Gamma_pos_of_pos {s : ℝ} (hs : 0 < s) : 0 < Gamma s`: above 0 the values are above 0.

## Is it the only extension

- `eq_Gamma_of_log_convex`, with the comment "The **Bohr-Mollerup theorem**: the Gamma function is the *unique* log-convex, positive-valued function on the positive reals which satisfies `f 1 = 1` and `f (x + 1) = x * f x` for all `x`."
- Own remark: other functions go through the factorial points, and some also satisfy the rule. We did not look up an example. The work of Bohr and Mollerup is not read.

## The reflection formula

- `Gamma_mul_Gamma_one_sub (z : ℂ) : Gamma z * Gamma (1 - z) = π / sin (π * z)`, with the comment "Euler's reflection formula". We did not look up where Euler gave it.
- The factor of the zeta symmetry contains Γ(s): `riemannZeta_one_sub`, in [background-zeta.md](background-zeta.md).

## The chart

- `site/src/gamma.ts` computes Γ(x) for a real x by the Lanczos approximation (g = 7, nine coefficients) and the reflection formula. Own choice, not from a source that was read; the coefficients are the widely used ones and are written from memory. `site/src/gamma.test.ts` checks the result against the facts above: the factorials up to 10!, Γ(1/2) = √π, Γ(3/2) = √π/2, the rule Γ(x + 1) = x Γ(x) also below 0, and x Γ(x) ≈ 1 near 0.
- Own numbers on the page: Γ(0.05) ≈ 19.47 and Γ(−0.05) ≈ −20.63, from this code.

## Not checked

- The proofs in Mathlib; nothing is compiled.
- Euler's Latin text, and sections 18 to 29 of the translation.
- Legendre's paper in the Mémoires de l'Institut for 1810. So the first use of the letter Γ can be earlier than the book of 1811. The rest of the book is not read.
- The work of Bohr and Mollerup.
- The equality of Mathlib's integral and Euler's integral with the logarithm.
- Where Euler gave the reflection formula.
