import { For, Show } from "solid-js";
import { isZh } from "./i18n";
import { MultiplyPlane } from "./MultiplyPlane";
import { backgroundKicker, href } from "./pages";
import { Stepper, type Part } from "./Stepper";
import { ComplexPageZh } from "./zh/ComplexPageZh";

// Source of the content: docs/notes/background-complex-numbers.md.
// The copy at MIT. The author's own address at the University of Rhode Island
// returned "not found" on 23 November 2026.
const MERINO = "https://math.mit.edu/~dunkel/Teach/18.04_2019S/historic/Merino_2006.pdf";
const ELKIES = "https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf";
const EULER_E352 = "https://scholarlycommons.pacific.edu/euler-works/352/";
const MATHLIB_ZETA_ZERO =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L150-L152";

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
    text: prose`Write $x = u + v$. By the line above, $x^3 = px + q$ holds when $3uv = p$ and $u^3 + v^3 = q$. The formula finds such $u$ and $v$. Their third powers are $\frac{q}{2} + \sqrt{w}$ and $\frac{q}{2} - \sqrt{w}$: the sum is $q$, and the product is $\left(\frac{p}{3}\right)^3$, so $uv = \frac{p}{3}$. This is the argument in the words of today; Cardano had a proof in 1545. The argument takes the square root of $w$, so it needs a $w$ that is not negative.`,
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
    <Show when={!isZh()} fallback={<ComplexPageZh />}>
      <main class="article">
        <p class="kicker">{backgroundKicker("complex-numbers")}</p>
        <h1>Why complex numbers exist</h1>
        <p class="summary">
          Nobody wanted them. A correct formula for ordinary answers passed through the square roots
          of negative numbers, and the answers came out right.
        </p>

        <div class="article-layout">
          <aside class="article-rail">
            <nav class="page-toc" aria-label="On this page">
              <p class="page-toc-label">On this page</p>
              <ol>
                <li>
                  <a href={href("complex-numbers", "cubic")}>The cubic puzzle</a>
                </li>
                <li>
                  <a href={href("complex-numbers", "plane")}>Turn and stretch</a>
                </li>
                <li>
                  <a href={href("complex-numbers", "why-zeta")}>Why zeta needs the plane</a>
                </li>
                <li>
                  <a href={href("complex-numbers", "timeline")}>Dates</a>
                </li>
              </ol>
              <p class="page-toc-back">
                <a href={href("step-1")}>← Back to Step 1</a>
              </p>
            </nav>
          </aside>

          <div class="article-content">
            <section id="cubic">
              <h2>The equation that forced the issue</h2>
              <p
                innerHTML={prose`A common belief is that complex numbers were invented just to force $x^2 = -1$ to have a
            solution. If an equation had no ordinary answer, mathematicians of the 1500s simply
            said it had none. What forced the issue was an equation with a third power that already
            had a plain, ordinary answer — yet the general formula for finding it walked straight
            through the square root of a negative number.`}
              />
              <Stepper parts={CUBIC} />
              <p class="sources">
                Source: <a href={MERINO}>Merino, A Short History of Complex Numbers</a>, items 4 to
                7.
              </p>
            </section>

            <section id="plane">
              <h2>The picture: turn and stretch</h2>
              <p
                innerHTML={prose`Bombelli's calculation produced the right answer, but for more than two centuries nobody
            could say what kind of object $\sqrt{-1}$ actually was. On the ordinary number line,
            multiplying by $-1$ reverses direction — a half turn of $180^\circ$. No step along the
            line can be done twice to make a reversal, because positive times positive is positive
            and negative times negative is positive too.`}
              />
              <p
                innerHTML={prose`The way out was to leave the line for the plane. In 1797, Wessel represented each number
            as an arrow starting at 0, given by its horizontal part (real) and vertical part
            (imaginary), or equivalently by its length and its angle from the right half of the
            horizontal axis. For a complex number $s = a + bi$, mathematicians write
            $\operatorname{Re}(s) = a$ for its real part (“$\operatorname{Re}$” stands for real,
            how far left or right) and $\operatorname{Im}(s) = b$ for its imaginary part
            (“$\operatorname{Im}$” stands for imaginary, how far up or down). To add two arrows,
            add their parts. To multiply them, multiply their lengths and add their angles.`}
              />
              <p
                innerHTML={prose`Under that single rule, $\sqrt{-1}$ stops being a paradox: it is simply the arrow of
            length 1 pointing straight up, at $90^\circ$. Multiplying by it turns any arrow a
            quarter turn counterclockwise. Do it twice and you turn $180^\circ$, landing on $-1$.
            That picture gave Bombelli's arithmetic a solid foundation (see the dates below).`}
              />
              <MultiplyPlane />
              <p class="sources">
                Source for the rule: <a href={MERINO}>Merino, A Short History of Complex Numbers</a>
                , item 12. The numbers in the picture and the quarter-turn check are our own from
                Wessel's rule.
              </p>
            </section>

            <section id="why-zeta">
              <h2>Why the zeta function needs them</h2>
              <p>
                <span
                  innerHTML={prose`For more than a century before Riemann, Euler studied the zeta sum using real powers $s$.
              As an ordinary sum, $1 + \frac{1}{2^s} + \frac{1}{3^s} + \cdots$ converges only for $s$
              above 1; at $s = 1$ it grows without limit, forming a barrier on the real line. In 1749
              Euler did manage to probe $s \le 1$ — including $\frac{1}{2}$, 0, and negative whole
              numbers — by switching to alternating signs and power-series limits (see `}
                />
                <a href={href("zeta", "euler-1749")}>Where the zeta function came from</a>
                <span
                  innerHTML={prose`), yet he had no single proof covering every $s$. In 1859 — after complex numbers had
              gained their geometric plane — Riemann let $s$ move off the line into that plane. In
              two dimensions the point 1 is no longer a wall — it is a single point you can walk
              around — and Riemann showed that $\zeta(s)$ extends smoothly to the entire plane except
              at 1.`}
                />
              </p>
              <p
                innerHTML={prose`Why couldn't the Riemann hypothesis stay on the real line? On the real line, $\zeta(s)$
            has zeros only at the trivial points $-2$, $-4$, $-6$ and so on: it equals $-\frac{1}{2}$
            at 0 and has no zeros anywhere on the positive real axis (including nowhere between 0
            and 1). Every single zero that the hypothesis talks about sits off the real line, inside
            the strip where the real part of $s$ is between 0 and 1 ($0 \le \operatorname{Re}(s) \le 1$),
            with a nonzero imaginary part. Without the complex plane, those zeros do not exist at
            all, and there is no hypothesis to state.`}
              />
              <p class="sources">
                Sources: <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>, pages 1,
                2 (the theorem marked “Riemann 1859”) and 7 (no zeros on the positive real axis);{" "}
                <a href={EULER_E352}>Euler, E352 (1749/1768, Willis and Osler translation)</a>,
                sections 1 to 15 (probing <span innerHTML={prose`$s \le 1$`} /> via alternating
                sums); <a href={MATHLIB_ZETA_ZERO}>Mathlib, theorem riemannZeta_zero</a> (
                <span innerHTML={prose`$\zeta(0) = -\frac{1}{2}$`} />
                ).
              </p>
            </section>

            <section id="timeline">
              <h2>The dates in one list</h2>
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
                Source: <a href={MERINO}>Merino, A Short History of Complex Numbers</a>, items 4 to
                8 and 11 to 15. For 1859:{" "}
                <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </Show>
  );
}
