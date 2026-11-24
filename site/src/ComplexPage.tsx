import { For } from "solid-js";
import { MultiplyPlane } from "./MultiplyPlane";
import { Stepper, type Part } from "./Stepper";

// Source of the content: docs/notes/background-complex-numbers.md.
// The copy at MIT. The author's own address at the University of Rhode Island
// returned "not found" on 23 November 2026.
const MERINO = "https://math.mit.edu/~dunkel/Teach/18.04_2019S/historic/Merino_2006.pdf";
const ELKIES = "https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf";

// The calculation of Bombelli.
const CUBIC: Part[] = [
  {
    title: "An equation with a plain answer",
    equation: tex`x^3 = 15x + 4`,
    text: prose`Try $x = 4$. The left side is $4 \times 4 \times 4 = 64$. The right side is $60 + 4 = 64$. So 4 is a solution, and nothing strange has happened yet.`,
  },
  {
    title: "A formula for every such equation",
    equation: tex`\begin{gathered} x = \sqrt[3]{\frac{q}{2} + \sqrt{w}} + \sqrt[3]{\frac{q}{2} - \sqrt{w}} \\ w = \left(\frac{q}{2}\right)^2 - \left(\frac{p}{3}\right)^3 \end{gathered}`,
    text: prose`In the 1500s, del Ferro and later Tartaglia found a formula for each equation of the form $x^3 = px + q$. The sign $\sqrt[3]{\phantom{x}}$ is the cube root: the number whose third power is the number under the sign. Cardano published the formula in 1545.`,
  },
  {
    title: "Why the formula is right",
    equation: tex`(u + v)^3 = u^3 + v^3 + 3uv\,(u + v)`,
    text: prose`Write $x = u + v$. By the line above, $x^3 = px + q$ holds when $3uv = p$ and $u^3 + v^3 = q$. The formula finds such $u$ and $v$. Their third powers are $q/2 + \sqrt{w}$ and $q/2 - \sqrt{w}$: the sum is $q$, and the product is $(p/3)^3$, so $uv = p/3$. This is the argument in the words of today; Cardano had a proof in 1545. The argument takes the square root of $w$, so it needs a $w$ that is not negative.`,
  },
  {
    title: "The proof stops here",
    equation: tex`x = \sqrt[3]{2 + \sqrt{-121}} + \sqrt[3]{2 - \sqrt{-121}}`,
    text: prose`Here $p = 15$ and $q = 4$. So $w = 2^2 - 5^3 = 4 - 125 = -121$. The formula asks for the square root of $-121$. No number of that time had a negative square, so the argument of part 3 stops. Cardano avoided this case in his book. But the equation has the answer 4.`,
  },
  {
    title: "Bombelli calculates anyway",
    equation: tex`\left(2 + \sqrt{-1}\right)^3 = 2 + 11\sqrt{-1} = 2 + \sqrt{-121}`,
    text: prose`Bombelli treated $\sqrt{-1}$ as a number with one rule: its square is $-1$. With that rule, the third power of $2 + \sqrt{-1}$ is $8 + 12\sqrt{-1} - 6 - \sqrt{-1}$, which is $2 + 11\sqrt{-1}$. So the first cube root is $2 + \sqrt{-1}$. In the same way, the second is $2 - \sqrt{-1}$.`,
  },
  {
    title: "The impossible parts cancel",
    equation: tex`x = \left(2 + \sqrt{-1}\right) + \left(2 - \sqrt{-1}\right) = 4`,
    text: prose`The two pieces with $\sqrt{-1}$ cancel, and the plain answer 4 is left. So the formula gives the right answer, if $\sqrt{-1}$ may follow the usual rules of arithmetic. Bombelli himself doubted the result at first, and a foundation for these rules came only in 1797. The road to a real answer went through numbers that did not exist yet. That is why they were defined.`,
  },
];

const TIMELINE: { year: string; text: Markup }[] = [
  {
    year: "1545",
    text: prose`Cardano publishes the formula for cubic equations in his book Ars Magna. The same book splits 10 into two parts with product 40. The parts are $5 + \sqrt{-15}$ and $5 - \sqrt{-15}$, and Cardano writes of “the mental tortures involved”.`,
  },
  {
    year: "1572",
    text: prose`Bombelli's book L'Algebra works through $x^3 = 15x + 4$. He writes that the thing at first seemed “based more on sophism than on truth”.`,
  },
  {
    year: "1637",
    text: prose`Descartes coins the word “imaginary” for such roots. He means that no quantity corresponds to them. The word is still in use.`,
  },
  {
    year: "1700s",
    text: prose`Euler introduces the letter $i$ for $\sqrt{-1}$.`,
  },
  {
    year: "1797",
    text: prose`Wessel's paper is read to the Royal Danish Academy. It treats the numbers as arrows in the plane. To multiply two arrows, add their angles and multiply their lengths. The paper is in Danish, and nobody notices it until 1897.`,
  },
  {
    year: "1806",
    text: prose`Argand, a bookkeeper in Paris, prints the same picture in a small pamphlet. His name is not on the title page.`,
  },
  {
    year: "1831",
    text: prose`Gauss publishes the picture of the plane and introduces the name “complex number”.`,
  },
  {
    year: "1859",
    text: prose`Riemann shows that the zeta function extends to the whole plane, except for the point 1.`,
  },
];

/** Background page: why complex numbers were defined, and why zeta needs them. */
export function ComplexPage() {
  return (
    <main class="article">
      <p class="count">Background for step 1</p>
      <h1>Why complex numbers exist</h1>
      <p class="summary">
        Nobody wanted them. A correct formula for ordinary answers passed through the square roots
        of negative numbers, and the answers came out right.
      </p>

      <section>
        <h2>The equation that forced the issue</h2>
        <p
          innerHTML={prose`A common belief is that complex numbers were made to give the equation $x^2 = -1$ a
            solution. The history is different. They came from equations with a third power.`}
        />
        <Stepper parts={CUBIC} />
        <p class="sources">
          Source: <a href={MERINO}>Merino, A Short History of Complex Numbers</a>, items 4 to 7.
        </p>
      </section>

      <section>
        <h2>From a trick to a point of the plane</h2>
        <p>
          The new numbers worked, but for more than two hundred years they had no satisfactory
          foundation. The answer was a picture.
        </p>
        <ol class="timeline">
          <For each={TIMELINE}>
            {(entry) => (
              <li>
                <span class="year">{entry.year}</span>
                <span innerHTML={entry.text} />
              </li>
            )}
          </For>
        </ol>
        <p class="sources">
          Source: <a href={MERINO}>Merino, A Short History of Complex Numbers</a>, items 4 to 8 and
          11 to 15. For 1859: <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>.
        </p>
      </section>

      <section>
        <h2>The picture: turn and stretch</h2>
        <p>
          A complex number is a point of the plane. Its real part says how far right it is. Its
          imaginary part says how far up. The point also has a length, its distance from zero, and
          an angle, measured from the right half of the horizontal axis.
        </p>
        <p>
          To add two numbers, add the parts. To multiply two numbers, multiply the lengths and add
          the angles. This is the rule in Wessel's paper.
        </p>
        <MultiplyPlane />
        <p class="sources">
          Source for the rule: <a href={MERINO}>Merino, A Short History of Complex Numbers</a>, item
          12. The numbers in the picture are computed on this page.
        </p>
      </section>

      <section>
        <h2>Why the zeta function needs them</h2>
        <p
          innerHTML={prose`Zeta starts as an endless sum. The sum works only where the real part of $s$ is above 1.
            In 1859, Riemann showed that zeta has a meaning on the whole plane, except at the point
            1.`}
        />
        <p
          innerHTML={prose`Apart from the trivial zeros $-2$, $-4$, $-6$, and so on, every zero of zeta has a real
            part from 0 to 1. So each zero that the hypothesis talks about lies where the sum does
            not work. Without the plane, there is no statement to prove.`}
        />
        <p class="sources">
          Source: <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>, the theorem
          marked “Riemann 1859”.
        </p>
      </section>
    </main>
  );
}
