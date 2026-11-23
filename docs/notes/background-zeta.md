# Background: where the zeta function came from

The record behind the site page "Where the zeta function came from". Step 1 speaks of the zeros of the zeta function; this note says what the function is, who made it, and why. Each fact names its source. The page holds the same facts.

## The sum of the inverse squares

- The series 1 + 1/4 + 1/9 + … was known to be convergent before Euler. The question of its exact value "can be traced back at least to" Mengoli's treatise of 1650 [11](../references.md#reference-11).
- Wallis, Leibniz, Stirling, de Moivre, Goldbach and several Bernoullis worked on the problem [11](../references.md#reference-11).
- The problem became widely known after Jakob Bernoulli asked it explicitly in 1689. In the same work, Bernoulli considered the series for an arbitrary rational number s [11](../references.md#reference-11).
- Wallis gave a 3-digit approximation in 1655. Euler gave the 7-digit value 1.644934, in a paper presented in 1731; this needed much computing "because the series converges very slowly" [11](../references.md#reference-11).
- In 1735, Euler, 28 years old, found ζ(2) = π²/6, and for each positive whole number ν the value ζ(2ν) = r π^(2ν), with r a rational number [11](../references.md#reference-11).
- Euler wrote: "quite unexpectedly, I have found an elegant formula for ζ(2), depending upon the quadrature of the circle" (translation by Weil) [11](../references.md#reference-11).
- The discovery "made him famous, perhaps for the first time, among mathematicians in all Europe". His teacher Johann Bernoulli exclaimed that "the most burning desire of his deceased older brother Jakob was now fulfilled" [11](../references.md#reference-11).
- Euler tried through his life, without success, to find a formula for ζ(s) for s an odd integer [11](../references.md#reference-11).
- The notation ζ(s) and the name "zeta function" first appear in Riemann's paper [11](../references.md#reference-11), footnote 46.

## The product over the primes

- Euler's paper *Variae observationes circa series infinitas* is of 1737 and was printed in 1744. It "contains the first printed version of Euler's product for Riemann's zeta function" [12](../references.md#reference-12).
- The product is Theorem 8 of that paper: the product of 1/(1 − p^(−s)) over the primes p is equal to the sum of 1/n^s, for s > 1. "Euler only treats the case where s is a positive integer" [12](../references.md#reference-12).
- Theorem 7 is the case s = 1. Euler's steps: from x = 1 + 1/2 + 1/3 + …, subtract x/2 to remove the even denominators, then a third of the rest to remove the multiples of 3, "and so on until all terms on the right-hand side are deleted". The proof of Theorem 8 "follows the same lines" [12](../references.md#reference-12).
- The page shows these steps for the squares, not for s = 1. The arithmetic of the six parts is an own check. Dividing 1/n² by 4 gives 1/(2n)², so x/4 holds the terms of the even numbers, and (1 − 1/4)x = 1 + 1/9 + 1/25 + 1/49 + 1/81 + …. Dividing 1/n² by 9 gives 1/(3n)², so one ninth of that sum is 1/9 + 1/81 + 1/225 + 1/441 + …, the terms of 3, 9, 15, 21. The difference is (1 − 1/4)(1 − 1/9)x = 1 + 1/25 + 1/49 + 1/121 + …, the terms of 1, 5, 7, 11.
- Since 23 November 2026 the stepper writes each term with its square shown, 1/2² and not 1/4, after the owner's question. The values and the arithmetic are the same; the form shows which whole number each term belongs to and which prime each factor belongs to. Part 5 shows the terms of 1, 5 and 7 only, so that the equation fits a narrow screen; its text names 11 and 13.
- Theorem 19, the last of the paper, is the divergence of the sum of the reciprocals of the primes. As they stand, the statements of Theorems 7 and 19 "are unacceptable"; the strong form is due to Mertens in 1874 [12](../references.md#reference-12).
- The divergence is "in some sense a wide generalization of the fact that the number of primes is infinite", which is Proposition 20 of Book IX of Euclid's *Elements* [11](../references.md#reference-11).
- Euler, in a paper written in 1747 and published in 1751: the order of the primes is "a mystery which human mind will never be able to penetrate" [11](../references.md#reference-11).
- The product formula "was the starting point of Riemann's investigations" [11](../references.md#reference-11).

## Bounded sums, and the primes against the squares


Added on 23 November 2026 after the owner's questions in chat.

- The page shows by blocks of 1, 2, 4, 8 terms that the sum of 1/n² is at most 1 + 1/2 + 1/4 + … = 2, and that each block of the sum of 1/n is at least 1/2. This is an own check: 1/4 + 1/9 ≤ 2/4; the four terms 1/16 to 1/49 are ≤ 4/16; 1/3 + 1/4 ≥ 2/4; the four terms 1/5 to 1/8 are ≥ 4/8. No source is cited for the block method.
- For a general power s, an own check: the block that starts at 2^k has 2^k terms, each at most 1/2^(ks), so the block is at most (2/2^s)^k. For s above 1 the ratio 2/2^s is below 1, so the blocks are bounded by a geometric sum, and the sum of 1/n^s has a value. For s = 1 the ratio is 1. The page states this as "the blocks shrink".
- The page calls the case s = 1 "no power", as the chart does, and says once that this is the power s = 1.
- The divergence of the sum of 1/n has a "14th-century proof" by Nicole Oresme [14](../references.md#reference-14). Whether Oresme used these blocks is not checked; the page only says that he proved the result.
- "Since Σ 1/n = ∞ and Σ 1/p = ∞ while Σ 1/n² < ∞, the primes are 'more dense' among the positive integers than the squares" [13](../references.md#reference-13). The page says "the primes come more often than the squares".
- Reference 13 dates Euler's proof to 1737 and its Theorem 7, and says that Euler knew the rate log(log N); both agree with reference 12.
- The general product on the page, one factor 1/(1 − 1/pˢ) for each prime and s above 1, is Theorem 8 as reference 12 states it. The remark that the term of n divided by 2ˢ is the term of 2n is an own check: 2ˢ × nˢ = (2n)ˢ.
- Correction of a chat answer: a search summary said that the Wikipedia page [14] states "there are more primes than squares". The page has no such sentence. The statement of reference 13 stands.

## From Euler to Riemann

- In a paper written in 1749 and published in 1768, Euler found the functional equation, a relation between ζ(n) and ζ(1 − n). He proved it for every positive integer n and conjectured it for all n (Weil's comment) [11](../references.md#reference-11).
- What the symmetry is, asked by the owner on 23 November 2026:
  - Euler does not write the relation between ζ(n) and ζ(1 − n) itself; "it follows from a relation he writes, as pointed out by Weil" [11](../references.md#reference-11).
  - The formula that Euler writes: (1 − 2ⁿ⁻¹ + 3ⁿ⁻¹ − 4ⁿ⁻¹ + …) / (1 − 2⁻ⁿ + 3⁻ⁿ − 4⁻ⁿ + …) = −(n − 1)! (2ⁿ − 1) / ((2ⁿ⁻¹ − 1) πⁿ) × cos(nπ/2) [11](../references.md#reference-11).
  - Weil's comment: the left side is "formally the quotient" of ζ(1 − n) and ζ(n), "except that Euler had written alternating signs to make the series more tractable; the effect of this is merely to multiply ζ(n) by 1 − 2¹⁻ⁿ, and ζ(1 − n) by 1 − 2ⁿ" [11](../references.md#reference-11).
  - The sum on top has no value in the usual sense. Euler proves the formula for every positive integer n "using the so-called Abel summation to give a meaning to the divergent series in the numerator" [11](../references.md#reference-11).
  - Own remark: s and 1 − s have the sum 1, so they are mirror images about 1/2. For example 2 pairs with −1, and 3 pairs with −2.
  - Own check for n = 2. The top is 1 − 2 + 3 − 4 + …. For x between 0 and 1, 1 − 2x + 3x² − 4x³ + … = 1/(1 + x)², which goes to 1/4 as x goes to 1. The bottom is 1 − 1/4 + 1/9 − … = (1 − 2⁻¹) × π²/6 = π²/12, by Weil's factor and Euler's value π²/6. The quotient is 3/π². The right side is −1 × 3 / (1 × π²) × cos(π) = 3/π². The two sides agree. That the limit as x goes to 1 is what "Abel summation" means is not looked up.
  - Riemann, 1859: with ξ(s) = π^(−s/2) Γ(s/2) ζ(s), the function ξ extends to the whole plane except for poles at 0 and 1, and ξ(s) = ξ(1 − s) [10](../references.md#reference-10). The same theorem says: "It follows that ζ also extends to a meromorphic function on C, which is regular except for a simple pole at s = 1" [10](../references.md#reference-10). So the symmetry holds for complex s too, away from the two poles of ξ, and ζ has a value at every point except 1.
  - Own remark: at s = −1 the term 1/nˢ is n, so the sum would be 1 + 2 + 3 + …. Its partial sums grow without limit, so it has no value in the usual sense. The page says "has no value" on this basis.
  - Own remark: the formula does not always give one value from the other. For n = 3 the factor cos(3π/2) is 0, so the formula says that the value at −2 is 0 and says nothing about the value at 3. The page gives only the direction from 2 to −1.
- What "2 pairs with −1" means, and whether the symmetry gives equal values, asked by the owner on 23 November 2026:
  - Own check: the partner of s is 1 − s. For s = 2 it is −1, for s = 3 it is −2. Both numbers of a pair are at the same distance from 1/2: 2 − 1/2 = 3/2 and 1/2 − (−1) = 3/2.
  - The values of ζ at the two numbers of a pair are linked, not equal. Mathlib, at the commit that the library of the proof builds against [8](../references.md#reference-8): `riemannZeta_one_sub {s : ℂ} (hs : ∀ n : ℕ, s ≠ -n) (hs' : s ≠ 1) : riemannZeta (1 - s) = 2 * (2 * π) ^ (-s) * Gamma s * cos (π * s / 2) * riemannZeta s`.
  - The two values for the pair 2 and −1, same commit: `riemannZeta_two : riemannZeta 2 = (π : ℂ) ^ 2 / 6` and `riemannZeta_neg_nat_eq_bernoulli (k : ℕ) : riemannZeta (-k) = (-1 : ℂ) ^ k * bernoulli (k + 1) / (k + 1)`, with `bernoulli_two : bernoulli 2 = 6⁻¹`. For k = 1 this gives ζ(−1) = −(1/6)/2 = −1/12.
  - Own check that the three statements agree, for s = 2: the factor is 2 · (2π)^(−2) · Γ(2) · cos(π). Γ(2) = 1! = 1 by `Gamma_nat_eq_factorial (n : ℕ) : Gamma (n + 1) = n !`, and cos(π) = −1 by `Complex.cos_pi : cos π = -1`. So the factor is −2/(4π²) = −1/(2π²), and −1/(2π²) · π²/6 = −1/12.
  - Why the rule excludes s = 0, −1, −2, …, looked up on 23 November 2026, same commit: the factor contains Γ(s), and Γ has no value at these points. Mathlib: "At `-n` for `n ∈ ℕ`, the Gamma function is undefined; by convention we assign it the value 0", theorem `Gamma_neg_nat_eq_zero (n : ℕ) : Gamma (-n) = 0`. Checked for s = −1 only: with that convention the right side would be 0, and the left side is ζ(2) = π²/6, which is not 0. So the rule cannot go from the value at −1 to the value at 2. For the other excluded points we did not check that the rule fails; the statement only does not cover them. On s = 1: `riemannZeta_residue_one : Tendsto (fun s ↦ (s - 1) * riemannZeta s) (𝓝[≠] 1) (𝓝 1)` says that (s − 1) ζ(s) goes to 1 as s goes to 1, so ζ(s) grows without limit near 1 and no finite value fits there. Mathlib still assigns `riemannZeta 1` a number by convention, as it does for Γ at −n; the statement of the rule excludes s = 1.
  - Whether the page explains the exceptions, asked by the owner on 23 November 2026: the page now says that the exceptions are points where a piece of the rule has no value, not points where the symmetry is false. It uses the bullet above for Γ and for s = 1, the poles of ξ at 0 and 1 [10](../references.md#reference-10), and section 11 of Euler's paper for n = 1 [19](../references.md#reference-19). Section 11, on the formula at n = 1: "the two other expressions cos(nπ/2) and 2ⁿ⁻¹ − 1, are both zero, with one dividing the other"; Euler then takes the differentials of both and gets 1/(2 log 2). This cause differs from the cause of the exceptions above: in Euler's formula both series have a value at n = 1, and two factors are 0 together. Own remark: 0 and 1 are partners, because 1 − 0 = 1.
  - What Γ is, and whether it is new, asked by the owner on 23 November 2026:
    - Mathlib, file `Analysis/SpecialFunctions/Gamma/Basic.lean` at the same commit [8](../references.md#reference-8), header: "We define this by Euler's integral `Γ(s) = ∫ x in Ioi 0, exp (-x) * x ^ (s - 1)` in the range where this integral converges (i.e., for `0 < s` in the real case, and `0 < re s` in the complex case). We show that this integral satisfies `Γ(1) = 1` and `Γ(s + 1) = s * Γ(s)`; hence we can define `Γ(s)` for all `s` as the unique function satisfying this recurrence and agreeing with Euler's integral in the convergence range. (If `s = -n` for `n ∈ ℕ`, then the function is undefined, and we set it to be `0` by convention.)"
    - Statements read there: `Gamma_add_one (s : ℂ) (h2 : s ≠ 0) : Gamma (s + 1) = s * Gamma s`, `Gamma_one : Gamma 1 = 1`, `Gamma_nat_eq_factorial (n : ℕ) : Gamma (n + 1) = n !`.
    - So Γ is a standard function of Mathlib, not one defined by the proof. Own check: Γ(5) = 4! = 24.
    - History: the Euler Archive record of paper E19, "On transcendental progressions, that is, those whose general terms cannot be given algebraically", gives "Written Date 1729", "Published Date 1738", and the summary: Euler starts from the factorials, "to find the value of the function for a general value of x", and defines [x] by an integral that is "what we know as the Gamma function" [20](../references.md#reference-20). The translators of E352 note that in modern terms [x] = Γ(x + 1) [19](../references.md#reference-19).
    - Own remark, on why Γ has no value at 0: the rule Γ(s + 1) = s Γ(s) at s = 0 would give Γ(1) = 0 × Γ(0), and Γ(1) = 1. At −1 the rule would give Γ(0) = −1 × Γ(−1), and Γ(0) has no value; and so on. Mathlib states the rule only for s ≠ 0.
    - Not checked: who gave the function the name Γ; the page does not say. The paper E19 itself is not read, only its record. The record gives [1/2] as √(π/2), and the translation of E352 gives [1/2] = √π/2; we did not resolve this and do not use the value.
  - Why −1/12 is not a value of the sum, same commit: `zeta_eq_tsum_one_div_nat_cpow {s : ℂ} (hs : 1 < re s) : riemannZeta s = ∑' n : ℕ, 1 / (n : ℂ) ^ s`, with the comment "this is false without the assumption: when `re s ≤ 1` the sum is divergent, and we use a different definition to obtain the analytic continuation to all `s`". So the function equals the sum only where the real part of s is above 1.
  - The form with equal values is the completed function: `completedRiemannZeta_one_sub`, statement 3 below, and Riemann's ξ(s) = ξ(1 − s) [10](../references.md#reference-10).
  - Limits: statements read, proofs not read, nothing compiled. The value −1/12 is a value of the function `riemannZeta`, which Mathlib defines on the whole plane; it is not a value of the sum 1 + 2 + 3 + ….
- How Euler found the symmetry, asked by the owner on 23 November 2026. Read: the English translation of Euler's paper by Willis and Osler, sections 1 to 15, and the translators' notes on sections 14 and 15 [19](../references.md#reference-19). Section numbers are Euler's.
  - Section 1: the paper is about two series with alternating signs, 1 − 2ᵐ + 3ᵐ − 4ᵐ + … and 1 − 1/2ⁿ + 1/3ⁿ − 1/4ⁿ + …. Euler: "I only demonstrate this relation for certain special cases", but the argument reaches "such a degree of certainty that the reader will conclude it very rigorously shown".
  - Section 2: Euler says that the first series has no sum in the usual sense: after 100 terms 1 − 2 + 3 − … is −50, after 101 terms +51. "It is necessary to give to the word sum a more extended meaning." The sum 1 − 2 + 3 − 4 + … is 1/4 because the series comes from expanding 1/(1 + x)² at x = 1.
  - Section 3: the same method for higher powers gives 1/2, 1/4, 0, −2/16, 0, 16/64, 0, … for m = 0, 1, 2, 3, 4, 5, 6, ….
  - Section 4: for the second series Euler knew n = 1 (log 2). For even n he knew the sums without alternating signs, 1 + 1/2ⁿ + 1/3ⁿ + … = Aπ², Bπ⁴, Cπ⁶, … with A = 1/6, and from them the alternating ones: (2 − 1)/2 · Aπ², (2³ − 1)/2³ · Bπ⁴, …. For odd n: "all my effort to find their sum is a failure up to now".
  - Sections 6 to 8: with his general summation formula he shows that the sums of the first series, for odd m, contain the same numbers A, B, C, …, and are 0 for even m greater than 0.
  - Section 9: he divides each series of the first type by the series of the second type with the same number. For n = 2 the quotient is 1 · (2² − 1) / ((2 − 1) π²) = 3/π², which agrees with our own check above.
  - Section 10: he writes one formula with a coefficient N, lists N = +1, 0, −1, 0, +1, … for n = 2, 3, 4, 5, 6, …, and takes N = −cos(πn/2). "For this reason I venture to propose the following conjecture, that for any variable n, the following equation is always valid". "This conjecture will undoubtedly stand out as bold."
  - Sections 11 and 12: he checks n = 1 and n = 0 by a limit. For n = 1 both sides are 1/(2 log 2); for n = 0 both sides are 2 log 2. After section 12: "we have not given a direct demonstration that contains at once all the possible cases".
  - Section 13: with [λ][−λ] = λπ / sin λπ for his factorial notation, he shows that the formula for a negative integer follows from the formula for a positive integer.
  - Section 14: for n = 1/2 the two series are the same, so the quotient is 1, and the formula gives 1 as well. The translators note that this is the only case in the paper where both series converge.
  - Section 15: for n = 3/2 he computes both series numerically and finds 0.380129 / 0.765158 against the formula's 0.4967738. The translators note arithmetic slips in Euler's digits; with correct digits the agreement is closer.
  - The publication data on the translation: "Originally published in Memoires de l'academie des sciences de Berlin 17, 1768, pp. 83-106". The year of writing, 1749, comes from reference 11.
  - Limits: we read a translation, not the French original. Sections 16 to 20 are only skimmed. That the numbers A, B, C are tied to the Bernoulli numbers is not looked up, and the page does not say it.
- Why the line with real part 1/2 is the mirror line, asked by the owner on 23 November 2026:
  - Own check: for s = a + bi, 1 − s = (1 − a) − bi. The real part a becomes 1 − a, and the i part b becomes −b. The point 1/2 is the middle between s and 1 − s, so this is a half turn around 1/2, not a flip across a line.
  - The second symmetry: ζ(conj s) = conj(ζ(s)) for every s, where conj changes the sign of the i part. Mathlib has it as the theorem `riemannZeta_conj (s : ℂ) : riemannZeta (conj s) = conj (riemannZeta s)`, with the reason "ζ has real Dirichlet coefficients" [18](../references.md#reference-18).
  - Own check: the two steps together send a + bi to 1 − (a − bi) = (1 − a) + bi. The height b stays and a becomes 1 − a. This is the flip across the line where the real part is 1/2, and the points with a = 1/2 stay in place.
  - So the value at a + bi is tied to the value at (1 − a) + bi: by the second symmetry to the value at a − bi, and by ξ(s) = ξ(1 − s) [10](../references.md#reference-10) from there to (1 − a) + bi.
  - The zeros in the strip come in mirrored pairs. Checked on 23 November 2026 from four statements of Mathlib, read at the commit that the library of the proof builds against [8](../references.md#reference-8). In Mathlib, Λ is `completedRiemannZeta` and Γℝ(s) is π^(−s/2) Γ(s/2); every function here has a complex number as its value at every s.
    1. `riemannZeta_def_of_ne_zero {s : ℂ} (hs : s ≠ 0) : riemannZeta s = completedRiemannZeta s / Gammaℝ s`.
    2. `Gammaℝ_ne_zero_of_re_pos {s : ℂ} (hs : 0 < re s) : Gammaℝ s ≠ 0`.
    3. `completedRiemannZeta_one_sub (s : ℂ) : completedRiemannZeta (1 - s) = completedRiemannZeta s`.
    4. `riemannZeta_conj (s : ℂ) : riemannZeta (conj s) = conj (riemannZeta s)`.
  - Own derivation. Take s with real part between 0 and 1, both ends excluded. Then s and 1 − s both have a positive real part, so neither is 0.
    - By 1 and 2, ζ(s) is Λ(s) divided by a number that is not 0. So ζ(s) = 0 exactly when Λ(s) = 0. The same holds for 1 − s.
    - By 3, Λ(1 − s) = Λ(s). So ζ(s) = 0 exactly when ζ(1 − s) = 0.
    - By 4, ζ(conj s) is the conjugate of ζ(s), and a number is 0 exactly when its conjugate is 0. So ζ(s) = 0 exactly when ζ(conj s) = 0. This holds for every s.
    - conj s is in the strip too. So ζ(s) = 0 exactly when ζ(1 − conj s) = 0. For s = a + bi, the point 1 − conj s is (1 − a) + bi, the mirror image across the line with real part 1/2.
  - Limits: the four statements are machine-checked in Mathlib; we read the statements, not their proofs, and we did not compile them. The derivation from them is our own, on paper, not checked by Lean. It covers the open strip only.
- "After Euler, the next substantial work on the zeta function was done more than a century later, by Riemann." Weil, in the history of number theory that he wrote, considers that after Euler the subject was dead and that Riemann resurrected it [11](../references.md#reference-11).
- Riemann's paper *On the number of primes less than a given magnitude* is 8 pages long. He wrote it on the occasion of his election to the Berlin Academy on 11 August 1859; every new member was asked to report on recent research [11](../references.md#reference-11).
- Riemann displays Euler's formula as his departure point, considers the function "as a function of a complex variable s", and denotes it by ζ(s) [11](../references.md#reference-11).
- He showed that the function extends to the complex plane except at the point 1, discovered the relation between its zeros and the distribution of the primes, and stated the conjecture now called the Riemann hypothesis [11](../references.md#reference-11).
- The sum and the product converge where the real part of s is above 1 [10](../references.md#reference-10).
- Hadamard and de la Vallée Poussin gave complete proofs of the prime number theorem in 1896; "the outlines of their proofs are based on his sketch" [11](../references.md#reference-11).

## The chart on the page

- The chart computes, for a power s of 1, 2, 3 or 4 and a number N up to 100, the sum of 1/n^s for n up to N and the product of 1/(1 − p^(−s)) for the primes p up to N. No source; the page computes the numbers.
- The limit shown for s = 2, 3 and 4 is the sum of 200 000 terms plus the integral of the rest. For s = 2 it shows 1.6449, which agrees with Euler's 1.644934 above.
- Own explanation, no source: the product over the primes up to N is the sum of 1/n^s over every n that has only these primes as factors. So the product is never below the sum of the first N terms. At N = 1 both are 1; from N = 2 on, the product is above the sum.

## Not checked

- Euler's papers themselves are not read; all statements on them come from the two secondary sources.
- The date of Euler's result on ζ(2): reference 11 gives 1735 (presented 5 December 1735). Other pages give 1734. The page uses 1735.
- Reference 11 has three slips in the part read (see its catalogue entry). The page does not use them. For the exact statement of the hypothesis, the page points to step 1.
