import { GammaChart } from "./GammaChart";
import { href } from "./pages";

// Source of the content: docs/notes/background-gamma.md.
const EULER_E19 = "http://eulerarchive.maa.org/docs/translations/E019en.pdf";
const EULER_E19_RECORD = "https://scholarlycommons.pacific.edu/euler-works/19/";
const LEGENDRE = "https://archive.org/details/10053610bsb";
const MATHLIB =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions";
const MATHLIB_BASIC = `${MATHLIB}/Gamma/Basic.lean#L11-L21`;
const MATHLIB_HALF = `${MATHLIB}/Gaussian/GaussianIntegral.lean#L306-L307`;
const MATHLIB_ZERO = `${MATHLIB}/Gamma/Deriv.lean#L94-L95`;
const MATHLIB_DIFF = `${MATHLIB}/Gamma/Deriv.lean#L65`;
const MATHLIB_NE_ZERO = `${MATHLIB}/Gamma/Beta.lean#L427`;
const MATHLIB_REFLECTION = `${MATHLIB}/Gamma/Beta.lean#L397-L398`;
const MATHLIB_UNIQUE = `${MATHLIB}/Gamma/BohrMollerup.lean#L305-L309`;

export function GammaPage() {
  return (
    <main class="article">
      <p class="count">Background for step 1</p>
      <h1>The Gamma function</h1>
      <p class="summary">
        The symmetry of the zeta function uses a function with the name Γ (gamma). It is 300 years
        old. It began with one question: what comes between the terms of the list 1, 2, 6, 24, 120?
      </p>

      <section>
        <h2>A list with gaps</h2>
        <p
          innerHTML={prose`Multiply the whole numbers from 1 up to $n$. For $n = 1, 2, 3, 4, 5$ the results are 1, 2, 6, 24 and 120. The result for $n$ has the name factorial of $n$. The list has a term for each whole number. Has it a term for $n = 1/2$? The product "from 1 up to a half" has no meaning, so the question needs a new idea.`}
        />
        <p
          innerHTML={prose`Euler answered it in a paper that he wrote in 1729. His first sentence says where the question came from: he was "prompted by those results concerning series which the celebrated Goldbach has communicated to the Society", and he looked for "a general expression which would give all the terms" of the list. He found an endless product that gives the list at the whole numbers and also has a value between them.`}
        />
        <p
          innerHTML={prose`Then he calculated the term for $n = 1/2$. He found that it "is equal to the square root of the circle whose diameter = 1". The circle here means its area, which is $\pi/4$. So the term is $\sqrt{\pi}/2$, about 0.8862. The number $\pi$ belongs to circles, and the list is about products of whole numbers. Nothing in the question suggested a circle.`}
        />
        <p class="sources">
          Sources: <a href={EULER_E19}>Euler, On transcendental progressions</a>, translated by
          Langton, sections 1, 2 and 17. <a href={EULER_E19_RECORD}>Euler Archive, record of E19</a>
          , for the year 1729. The number 0.8862 is our own arithmetic.
        </p>
      </section>

      <section>
        <h2>Euler's formula</h2>
        <p
          innerHTML={prose`Later in the same paper Euler gave a second formula for the term of index $n$:`}
        />
        <div class="equation" innerHTML={tex`\int_0^1 (-\ln x)^n \, dx`} />
        <p
          innerHTML={prose`The sign $\int$ is an integral: the area under a curve, here between $x = 0$ and $x = 1$. The sign $\ln$ is the natural logarithm. This page does not use either of them again. The important point is that $n$ is now a power, and a power does not have to be a whole number. Euler checked the formula for $n = 3$ and got 6. He wrote that the formula is useful for the terms between the whole numbers.`}
        />
        <p class="sources">
          Source: <a href={EULER_E19}>Euler, On transcendental progressions</a>, sections 14 and 15.
          Euler writes lx for the logarithm.
        </p>
      </section>

      <section>
        <h2>The name, and a shift by 1</h2>
        <p
          innerHTML={prose`Euler did not use the letter $\Gamma$. Legendre did, in a book of 1811. He gave the name "Eulerian integrals" to two integrals that Euler had studied, and he wrote of the second: "nous la représenterons plus généralement par $\Gamma(a)$". In English: we will represent it more generally by $\Gamma(a)$. He adds that he had given this theory before, in a paper for the year 1810. We did not read that paper, so we cannot say that 1811 is the first use.`}
        />
        <p
          innerHTML={prose`Legendre's integral is Euler's with the power $a - 1$ in place of $n$. So $\Gamma(a)$ is the term of index $a - 1$ in Euler's list. That is the reason for a shift that surprises every reader: $\Gamma(5)$ is not 120. It is 24, the product of the whole numbers below 5.`}
        />
        <div class="equation" innerHTML={tex`\Gamma(n + 1) = 1 \cdot 2 \cdot 3 \cdots n`} />
        <p class="sources">
          Source: <a href={LEGENDRE}>Legendre, Exercices de calcul intégral</a>, Paris, 1811, page
          221. We read the quotation on the picture of the page, and the sentence on 1810 in the
          machine text of the scan, where one word is not clear. The comparison of the two integrals
          is our own reading of the two sources.
        </p>
      </section>

      <section>
        <h2>The rules of today</h2>
        <p
          innerHTML={prose`The proof of the Riemann hypothesis builds on the library Mathlib. Mathlib defines $\Gamma$ by an integral of Euler's kind and proves these rules. In them, $s$ may also be a complex number.`}
        />
        <ul>
          <li innerHTML={prose`$\Gamma(1) = 1$.`} />
          <li
            innerHTML={prose`$\Gamma(s + 1) = s \cdot \Gamma(s)$ for every $s$ except 0. One step to the right multiplies the value by $s$.`}
          />
          <li
            innerHTML={prose`$\Gamma(n + 1)$ is the factorial of $n$, for each whole number $n$ from 1. This follows from the two rules above.`}
          />
          <li innerHTML={prose`$\Gamma(1/2) = \sqrt{\pi}$.`} />
        </ul>
        <p
          innerHTML={prose`Our own check against Euler: by the second rule, $\Gamma(3/2)$ is $1/2$ times $\Gamma(1/2)$, which is $\sqrt{\pi}/2$. And $\Gamma(3/2)$ is the term of index $1/2$ in Euler's list. Euler found the same value in 1729.`}
        />
        <p class="sources">
          Sources: <a href={MATHLIB_BASIC}>Mathlib, the file on the Gamma function</a>, the header
          and the theorems Gamma_one, Gamma_add_one and Gamma_nat_eq_factorial.{" "}
          <a href={MATHLIB_HALF}>Mathlib, theorem Gamma_one_half_eq</a>. We read the statements, not
          the proofs.
        </p>
      </section>

      <section>
        <h2>The picture</h2>
        <p
          innerHTML={prose`The chart shows $\Gamma(x)$ for a real number $x$. Move the slider, or press on the chart. The table shows the second rule at work: $x$ times $\Gamma(x)$ is always the same as $\Gamma(x + 1)$.`}
        />
        <GammaChart />
        <p
          innerHTML={prose`Right of 0 the curve is smooth and stays above 0. It goes through the points of the list: 1, 1, 2, 6, 24. Left of 0 the curve is in pieces, and the pieces change sides.`}
        />
        <p class="sources">
          The page computes the values with a standard approximation, and the table rounds them. The
          method is our own choice for the picture. Tests compare it with the rules above.
        </p>
      </section>

      <section>
        <h2>Where Γ has no value</h2>
        <p
          innerHTML={prose`$\Gamma$ has no value at 0, $-1$, $-2$ and so on. Mathlib says so in words: at these points "the function is undefined, and we set it to be 0 by convention". The 0 is a filler that the library needs, because each of its functions must give some answer. It is not a value of the function.`}
        />
        <p
          innerHTML={prose`Mathlib also proves what happens near 0: when $s$ comes close to 0, the product $s \cdot \Gamma(s)$ comes close to 1. So $\Gamma(s)$ is close to $1/s$ there. One divided by a very small number is very large, so the values grow without limit, and no number can be the value at 0. Try 0.05 and $-0.05$ on the chart: the values are near 20 and near $-20$.`}
        />
        <p
          innerHTML={prose`For $-1$, $-2$ and the others we read only the statement that they have no value. The chart shows the same behaviour there. Our own remark on the reason: the rule gives $\Gamma(s) = \Gamma(s + 1)/s$, so a problem at 0 moves one step to the left each time.`}
        />
        <p
          innerHTML={prose`At every other point $\Gamma$ has a value, and that value is never 0.`}
        />
        <p class="sources">
          Sources: <a href={MATHLIB_BASIC}>Mathlib, the header of the file on the Gamma function</a>
          . <a href={MATHLIB_ZERO}>Mathlib, theorem tendsto_self_mul_Gamma_nhds_zero</a>, for the
          behaviour near 0. <a href={MATHLIB_NE_ZERO}>Mathlib, theorem Gamma_ne_zero</a>.{" "}
          <a href={MATHLIB_DIFF}>Mathlib, theorem differentiableAt_Gamma</a>, for the other points.
        </p>
      </section>

      <section>
        <h2>Is it the only answer?</h2>
        <p
          innerHTML={prose`No. Many curves go through the points 1, 1, 2, 6, 24, and a curve can also follow the rule $f(x + 1) = x \cdot f(x)$ and still differ from $\Gamma$ between the whole numbers. Mathlib proves a theorem of Bohr and Mollerup that says what makes $\Gamma$ special. Take a function $f$ on the numbers above 0, with values above 0. Suppose that $f(1) = 1$, that $f(x + 1) = x \cdot f(x)$, and that the logarithm of $f$ is convex: its curve bends upward everywhere. Then $f$ is $\Gamma$.`}
        />
        <p class="sources">
          Source: <a href={MATHLIB_UNIQUE}>Mathlib, theorem eq_Gamma_of_log_convex</a>. The first
          two sentences are our own remark; we did not look up an example of another such curve.
        </p>
      </section>

      <section>
        <h2>Where the zeta function uses it</h2>
        <p>
          The symmetry of the zeta function links the value at <i>s</i> with the value at 1 −{" "}
          <i>s</i>. The factor of that link contains Γ(<i>s</i>). So the rule of the symmetry has no
          meaning where Γ has no value: at 0, −1, −2 and so on. The page{" "}
          <a href={href("zeta")}>Where the zeta function came from</a> gives the rule and its
          exceptions.
        </p>
        <p
          innerHTML={prose`$\Gamma$ has a rule of the same kind for itself. Mathlib calls it Euler's reflection formula:`}
        />
        <div class="equation" innerHTML={tex`\Gamma(s)\,\Gamma(1 - s) = \frac{\pi}{\sin(\pi s)}`} />
        <p
          innerHTML={prose`Here $\sin$ is the sine, a function from the study of angles. This page does not need it further.`}
        />
        <p class="sources">
          Source: <a href={MATHLIB_REFLECTION}>Mathlib, theorem Gamma_mul_Gamma_one_sub</a>.
        </p>
      </section>

      <section>
        <h2>What we did not check</h2>
        <ul>
          <li>We read the statements of Mathlib, not their proofs, and we compiled nothing.</li>
          <li>
            We read sections 1, 2 and 12 to 17 of Euler's paper, in translation, not the Latin.
          </li>
          <li>
            We did not read Legendre's paper for 1810, so the first use of the letter Γ can be
            earlier than the book of 1811.
          </li>
          <li>We did not read the work of Bohr and Mollerup, only Mathlib's statement.</li>
        </ul>
      </section>
    </main>
  );
}
