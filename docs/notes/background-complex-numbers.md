# Background: why complex numbers exist

The record behind the site page "Why complex numbers exist". Step 1 says "for every complex number s"; this note says where those numbers came from and why zeta needs them. Each fact names its source. The page holds the same facts.

## The equation that forced the issue

- Complex numbers arose from cubic equations, not from quadratic ones [9](../references.md#reference-9).
- For x³ = px + q, the formula is x = ∛(q/2 + √w) + ∛(q/2 − √w), where w = (q/2)² − (p/3)³ [9](../references.md#reference-9). The source uses the letter w for the square root itself; the note and the page use it for the number under the root, so that w = −121 in the example.
- Del Ferro had the formula first, and Tartaglia found it later in an independent manner; Cardano names both [9](../references.md#reference-9).
- Cardano published the formula in *Ars Magna* in 1545 [9](../references.md#reference-9).
- For x³ = 15x + 4, the formula gives x = ∛(2 + √−121) + ∛(2 − √−121). Bombelli saw that x = 4 is a solution, set the first cube root equal to a + b√−1, and found a = 2 and b = 1. So x = (2 + √−1) + (2 − √−1) = 4. His book *L'Algebra* is from 1572 [9](../references.md#reference-9).
- Own check of the arithmetic: 4³ = 64 = 15 · 4 + 4. (2 + i)³ = 8 + 12i + 6i² + i³ = 8 + 12i − 6 − i = 2 + 11i, and 11i = √−121.

## Why the formula was trusted, and where it was doubted

The owner asked on 23 November 2026: how were people sure that the formula is correct, and did nobody doubt it when it gave √−121?

- The derivation: put x = u + v into x³ = px + q. Since (u + v)³ = u³ + v³ + 3uv(u + v), the equation holds when 3uv = p and u³ + v³ = q. Then the sum and the product of the two cubes u³ and v³ are known, and a quadratic equation gives them [9](../references.md#reference-9), item 5.
- Own check that the formula gives such u and v: with u³ = q/2 + √w and v³ = q/2 − √w, the sum is q, and the product is (q/2)² − w = (p/3)³, so uv = p/3.
- Own check with a positive w: for x³ = 6x + 9, w = 4.5² − 2³ = 12.25 and √w = 3.5. The cubes are 8 and 1, so x = 2 + 1 = 3, and 27 = 18 + 9.
- Tartaglia told Cardano the formula "but not the proof", and Cardano "was able to reconstruct the proof" [9](../references.md#reference-9), item 4. So the formula had a proof in 1545.
- The derivation takes the square root of w. When w is negative it had no meaning then, so the proof did not cover that case. This is our reading of the derivation, not a quotation.
- The case with a negative w has the name casus irreducibilis. "Cardano avoids discussing this case in Ars Magna" [9](../references.md#reference-9), item 5.
- Cardano came back to it in 1570. Reference 16 says that "in some cases he used imaginary numbers", and that in 1570, "in a new edition of the *Ars magna*", he added a section "De aliza regula", "devoted to the “irreducible case” of the cubic equation, in which Cardano’s rule is extended to imaginary numbers". The same source says that this work "did not give solutions to the irreducible case" [16](../references.md#reference-16). Its own bibliography lists "De aliza regula liber" as a work of Basel, 1570; whether it is a section or a separate book is not checked.
- So people did doubt. Bombelli wrote of his own calculation: "At first, the thing seemed to me to be based more on sophism than on truth, but I searched until I found the proof" [9](../references.md#reference-9), item 7.
- What the calculation of Bombelli shows, by our own check: with the one rule that the square of √−1 is −1, u = 2 + √−1 and v = 2 − √−1 give uv = 4 + 1 = 5 = p/3 and u³ + v³ = (2 + 11√−1) + (2 − 11√−1) = 4 = q. So the two conditions of the derivation hold, and x = u + v = 4 is the known solution.
- That is a proof only if √−1 follows the usual rules of arithmetic. A foundation for that came with Wessel in 1797 (see the dates below).

## The history in dates

- 1545: Cardano, *Ars Magna*. It also has the problem "divide 10 in two parts, the product of which is 40", with the answer 5 + √−15 and 5 − √−15, and the words "putting aside the mental tortures involved" [9](../references.md#reference-9).
- 1572: Bombelli, *L'Algebra*. He wrote that the thing at first seemed "based more on sophism than on truth" [9](../references.md#reference-9).
- 1637: Descartes, *La Géométrie*. He coined the term "imaginary", with the words "in many cases no quantity exists which corresponds to what one imagines" [9](../references.md#reference-9).
- Euler (1707 to 1783) introduced the notation i for √−1, but "did not give a satisfactory foundation for complex numbers" [9](../references.md#reference-9). The source gives no year.
- 1797: Wessel "was the first one to obtain and publish a suitable presentation of complex numbers" [9](../references.md#reference-9). From Bombelli's book in 1572 to this paper is 225 years; the page says "more than two hundred years" with "no satisfactory foundation" on this basis. Wessel's paper was presented to the Royal Danish Academy on 10 March 1797 and published in 1799. It adds directed lines by the parallelogram rule, and multiplies them by adding the angles and multiplying the lengths. It was written in Danish and went unnoticed until 1897 [9](../references.md#reference-9).
- 1806: Argand, a Parisian bookkeeper, printed a pamphlet with the geometric interpretation. His name was not on the title page [9](../references.md#reference-9).
- 1831: Gauss published his geometric representation and introduced the term "complex number" [9](../references.md#reference-9).
- 1859: Riemann showed that zeta extends from the half-plane with real part above 1 to the whole plane, except for a pole at s = 1 [10](../references.md#reference-10).

## Why zeta needs them

- The sum that defines $\zeta(s)$ converges where $\operatorname{Re}(s) > 1$ [10](../references.md#reference-10) (p. 1).
- Apart from the trivial zeros $-2, -4, -6, \dots$, $\zeta(s)$ has no other zeros outside the closed critical strip $0 \le \operatorname{Re}(s) \le 1$ [10](../references.md#reference-10) (p. 2).
- Moreover, $\zeta(s)$ has a simple pole at $s = 1$ and no other poles or zeros on the positive real axis [10](../references.md#reference-10) (p. 7). Consequently, there are no zeros on the real interval $(0, 1)$ either: every zero that the Riemann hypothesis talks about lies off the real line, with a nonzero imaginary part inside the strip $0 \le \operatorname{Re}(s) \le 1$ (own consequence from Elkies [10](../references.md#reference-10), pp. 2 and 7).
- Own geometric remark: on the real line, $s = 1$ splits the line in two, whereas in the two-dimensional complex plane $s = 1$ is an isolated point that paths can go around.
- Own check on the geometric foundation bridge: on the real line, multiplying by $-1$ reverses direction (a $180^\circ$ half turn), and no real number squared produces $-1$ because positive times positive is positive and negative times negative is also positive. Under Wessel's 1797 plane rule (multiply lengths, add angles) [9](../references.md#reference-9), the arrow of length $1$ at $90^\circ$ turns any arrow a quarter turn counterclockwise; doing it twice turns $180^\circ$, landing on $-1$.

## Not checked

- Sources disagree on how far Cardano himself treated the case with a negative number under the root. Reference 9 says he avoids it in *Ars Magna* of 1545. Reference 16 says that in 1570 he extended his rule to imaginary numbers but gave no solutions for the case. Reference 17 says that Cardano "figured out how to solve the so called casus irreducibilis" and "was not happy about the appearance of square roots of negative numbers". The page says only what Reference 9 says: that he avoided the case in the book of 1545.
- The kind of proof in *Ars Magna* (it is often described as geometric, with a cube cut in pieces) is not confirmed from a source that we read. Cardano's own text is not read.
- Which exact words of Cardano belong to the cubic case and which to the problem of chapter 37 is not checked.
- The picture rule "multiplying by i is a quarter turn" follows from the rule of Wessel above: i has length 1 and angle 90°. No separate source.
