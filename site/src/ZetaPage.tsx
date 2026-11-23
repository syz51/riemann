import { For } from "solid-js";
import { Stepper, type Part } from "./Stepper";
import { SumProduct } from "./SumProduct";

// Source of the content: docs/notes/background-zeta.md.
const PAPADOPOULOS = "https://arxiv.org/abs/1710.03982";
const VIADER = "https://econ-papers.upf.edu/papers/776.pdf";
const CONRAD = "https://kconrad.math.uconn.edu/math3240s20/handouts/infinitudeofprimes.pdf";
const PRIME_SUM =
  "https://en.wikipedia.org/wiki/Divergence_of_the_sum_of_the_reciprocals_of_the_primes";
const ELKIES = "https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf";

const SIEVE: Part[] = [
  {
    title: "Start with the sum over all whole numbers",
    equation: tex`x = 1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \frac{1}{5^2} + \frac{1}{6^2} + \cdots`,
    text: "Call the sum x. It has one term for each whole number n, and the term is 1 divided by n². So the terms are 1, 1/4, 1/9, 1/16 and so on. The example uses squares. The same steps work for each higher power.",
  },
  {
    title: "Divide every term by 2²",
    equation: tex`\frac{x}{2^2} = \frac{1}{2^2} + \frac{1}{4^2} + \frac{1}{6^2} + \frac{1}{8^2} + \cdots`,
    text: "The term of n is 1 divided by n². Divide it by 2², and it is 1 divided by (2n)², the term of 2n. So the new terms belong to 2, 4, 6, 8 and so on. These are exactly the terms of the even numbers in x.",
  },
  {
    title: "Subtract: the even numbers go",
    equation: tex`\left(1 - \frac{1}{2^2}\right) x = 1 + \frac{1}{3^2} + \frac{1}{5^2} + \frac{1}{7^2} + \frac{1}{9^2} + \cdots`,
    text: "Take the sum of part 2 away from x. On the left, x minus x/2² is (1 − 1/2²) times x. On the right, each term of an even number leaves. The terms of the odd numbers 1, 3, 5, 7, 9 stay.",
  },
  {
    title: "Divide the new sum by 3²",
    equation: tex`\frac{1}{3^2} \left(1 - \frac{1}{2^2}\right) x = \frac{1}{3^2} + \frac{1}{9^2} + \frac{1}{15^2} + \frac{1}{21^2} + \cdots`,
    text: "Divide the term of n by 3², and it is the term of 3n. So the terms of 1, 3, 5, 7 become the terms of 3, 9, 15, 21. These are exactly the terms of the multiples of 3 that are still in the sum.",
  },
  {
    title: "Subtract: the multiples of 3 go",
    equation: tex`\left(1 - \frac{1}{2^2}\right) \left(1 - \frac{1}{3^2}\right) x = 1 + \frac{1}{5^2} + \frac{1}{7^2} + \cdots`,
    text: "Take the sum of part 4 away from the sum of part 3. On the left, a sum minus 1/3² of itself is (1 − 1/3²) times the sum. On the right, the terms of 3, 9, 15 and so on leave. The numbers 1, 5, 7 and then 11, 13 stay: no multiple of 2 or 3. The first one after 1 is 5, the next prime.",
  },
  {
    title: "Go on with every prime",
    equation: tex`\left(1 - \frac{1}{2^2}\right) \left(1 - \frac{1}{3^2}\right) \left(1 - \frac{1}{5^2}\right) \cdots \, x = 1`,
    text: "Every whole number above 1 is a multiple of some prime, so its term leaves at some step. Only the term 1 stays. So x is equal to 1 divided by all these factors: one factor for each prime 2, 3, 5, 7 and so on. The sum over all whole numbers is a product over the primes only.",
  },
];

const TIMELINE: { year: string; text: string }[] = [
  {
    year: "1650",
    text: "Mengoli's book on endless sums. The question of the exact value of 1 + 1/4 + 1/9 + … goes back at least to this book.",
  },
  {
    year: "1689",
    text: "Jakob Bernoulli asks for the value in print. After this, the problem is widely known. He also looks at the same sum with other powers.",
  },
  {
    year: "1735",
    text: "Euler, 28 years old, finds the value: π × π divided by 6. He also finds the value for every even power.",
  },
  {
    year: "1737",
    text: "Euler's paper “Various observations about infinite series” has the product over the primes. It is printed in 1744.",
  },
  {
    year: "1749",
    text: "Euler writes down a symmetry of the function. He proves it for whole numbers and conjectures it for all numbers. The paper is printed in 1768.",
  },
  {
    year: "1859",
    text: "Riemann's paper of 8 pages. The number s becomes a complex number, the function gets the name ζ(s), and the hypothesis is stated.",
  },
  {
    year: "1896",
    text: "Hadamard and de la Vallée Poussin prove the law for the number of primes below a given size. Their proofs follow Riemann's sketch.",
  },
];

/** Background page: what the zeta function is, and who made it and why. */
export function ZetaPage() {
  return (
    <main class="article">
      <p class="count">Background for step 1</p>
      <h1>Where the zeta function came from</h1>
      <p class="summary">
        It began as one sum that nobody could finish. Euler finished it, asked the same question for
        other powers, and found that the answer knows about the primes.
      </p>

      <section>
        <h2>A sum that nobody could finish</h2>
        <p>
          Add 1 divided by each square number, and never stop. The square of 2, written 2², is 2 × 2
          = 4:
        </p>
        <p
          class="equation"
          innerHTML={tex`1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \cdots = 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots`}
        />
        <p>
          The terms shrink fast, so the sum does not grow without limit. It comes closer and closer
          to one value. Before Euler, this was known. The exact value was not. Wallis gave three
          digits of it in 1655. Jakob Bernoulli asked for the value in print in 1689, and the
          problem became famous. Leibniz, Stirling, de Moivre, Goldbach and several Bernoullis
          worked on it.
        </p>
        <p>
          Euler first calculated seven digits, 1.644934. This was hard work, because the sum comes
          close to its value very slowly. In 1735, at the age of 28, he found the exact value. It is
          π × π divided by 6, where π is the number of the circle, 3.14159…. Nobody expected a
          circle in a sum of square numbers. Euler wrote that he had found the formula “quite
          unexpectedly”.
        </p>
        <p>
          The result made him famous among mathematicians across Europe. His teacher Johann
          Bernoulli said that the most burning desire of his dead brother Jakob was now fulfilled.
        </p>
        <p class="sources">
          Source: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6.
        </p>
      </section>

      <section>
        <h2>One sum for each power</h2>
        <p>Now replace the squares by another power. Write s for the power:</p>
        <p
          class="equation"
          innerHTML={tex`\zeta(s) = 1 + \frac{1}{2^s} + \frac{1}{3^s} + \frac{1}{4^s} + \frac{1}{5^s} + \cdots`}
        />
        <p>
          Each choice of s gives one sum, and so one value. A rule that turns each number s into one
          value is a function. This function is the zeta function, and ζ is the Greek letter zeta.
          The sum above is the case s = 2.
        </p>
        <p>
          Jakob Bernoulli had looked at these sums in 1689. Euler found the value for each even
          power in 1735. Each value is a fraction times a power of π. For the odd powers 3, 5, 7 and
          so on, he tried through his whole life to find a formula, and did not find one.
        </p>
        <p>
          Euler did not use the letter ζ. The name and the letter come from Riemann, more than a
          hundred years later.
        </p>
        <p class="sources">
          Source: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6 and its footnote 46.
        </p>
      </section>

      <section>
        <h2>Why an endless sum can have a value</h2>
        <p>
          A sum with endlessly many terms does not always grow without limit. Walk to a wall that is
          2 metres away, and let each step cover half of the distance that is left: 1 metre, then
          1/2, then 1/4. You take endlessly many steps and never pass the wall.
        </p>
        <p
          class="equation"
          innerHTML={tex`1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots \quad \text{never passes} \quad 2`}
        />
        <p>
          So the question for each power is: do the terms shrink fast enough? For the squares they
          do. Put the terms in blocks of 1, 2, 4, 8 terms and so on. The two terms 1/4 + 1/9 are
          each at most 1/4, so together at most 1/2. The four terms from 1/16 to 1/49 are each at
          most 1/16, so together at most 1/4. The next eight are together at most 1/8. The blocks
          are no larger than the steps to the wall, so the sum never passes 2.
        </p>
        <p>
          With no power, which is the power s = 1, the terms are 1, 1/2, 1/3, 1/4 and so on. Blocks
          of the same sizes now give the opposite result. Keep 1 and 1/2 as they are. The two terms
          1/3 + 1/4 are each at least 1/4, so together at least 1/2. The four terms from 1/5 to 1/8
          are each at least 1/8, so together at least 1/2 again. Each block adds at least 1/2, and
          the blocks never end. This sum grows without limit. Oresme proved this in the 14th
          century.
        </p>
        <p>
          The power 1 is the border. For each power s above 1, the blocks shrink and the sum has a
          value. This is why ζ(s), as a sum, is defined for s above 1 only.
        </p>
        <p class="sources">
          The block sums are arithmetic that you can check by hand. For Oresme:{" "}
          <a href={PRIME_SUM}>Wikipedia, Divergence of the sum of the reciprocals of the primes</a>.
        </p>
      </section>

      <section>
        <h2>The link to the primes</h2>
        <p>
          A prime is a whole number above 1 that only 1 and itself divide: 2, 3, 5, 7, 11 and so on.
          Each whole number above 1 is a product of primes. The primes look as if they come without
          a pattern. Euler wrote in 1747 that their order is “a mystery which human mind will never
          be able to penetrate”.
        </p>
        <p>
          Ten years before, in 1737, he had found a door. The sum, which has one term for each whole
          number, is equal to a product that has one factor for each prime.
        </p>
        <Stepper parts={SIEVE} />
        <p>
          For another power s, divide by 2ˢ, then by 3ˢ, then by 5ˢ, in place of 2², 3² and 5². The
          steps stay the same, because the term of n divided by 2ˢ is the term of 2n. The result,
          for each power s above 1:
        </p>
        <p
          class="equation"
          innerHTML={tex`\zeta(s) = \frac{1}{1 - \dfrac{1}{2^s}} \times \frac{1}{1 - \dfrac{1}{3^s}} \times \frac{1}{1 - \dfrac{1}{5^s}} \times \frac{1}{1 - \dfrac{1}{7^s}} \times \cdots`}
        />
        <p>
          There is one factor for each prime, and no other factor. The steps need the sum to have a
          value: you cannot take x/2² away from x when x is not a number.
        </p>
        <p>
          Euler used the same steps also with no power, on the sum 1 + 1/2 + 1/3 + 1/4 + …, which
          grows without limit. From this he concluded that the sum over the primes only, 1/2 + 1/3 +
          1/5 + 1/7 + 1/11 + …, also grows without limit. By the rules of today, his steps with sums
          that have no value are not a proof. The result is true: Mertens gave its exact form in
          1874.
        </p>
        <p>
          This says more than “there are infinitely many primes”, which was known from Euclid. The
          squares show why. There are infinitely many squares too, but the sum 1 + 1/4 + 1/9 + … has
          a value. The sum 1/2 + 1/3 + 1/5 + … has none. So both lists never end, but the primes
          come more often than the squares. Euclid's result cannot tell the two lists apart. Euler's
          result can.
        </p>
        <p class="sources">
          Sources:{" "}
          <a href={VIADER}>Viader, Bibiloni and Paradís, On a series of Goldbach and Euler</a>,
          sections 1 and 7, for the 1737 paper, its steps and Mertens.{" "}
          <a href={PAPADOPOULOS}>Papadopoulos</a>, section 6, for Euclid and the words of Euler.{" "}
          <a href={CONRAD}>Conrad, The infinitude of the primes</a>, section 3, for the primes
          against the squares. The first source shows the steps for the sum 1 + 1/2 + 1/3 + …; the
          squares here follow the same lines.
        </p>
      </section>

      <section>
        <h2>The picture: the sum and the product</h2>
        <p>
          The chart counts up to a number N. The sum takes the terms of the whole numbers up to N.
          The product takes one factor for each prime up to N. Move N and watch both come close to
          the same value.
        </p>
        <SumProduct />
        <p>
          The product is never behind the sum, and from N = 2 on it is ahead. The factors of the
          primes up to N already hold every number that is built from these primes, also numbers
          above N. With “No power”, there is no value to come close to: both lines go up without
          limit, but more and more slowly.
        </p>
        <p class="sources">
          The numbers in the chart are computed on this page. The formula is the one of the section
          above.
        </p>
      </section>

      <section>
        <h2>A hundred years later: Riemann</h2>
        <p>
          In 1749, Euler found one more thing: a symmetry that links the value at s to the value at
          1 − s. He proved it for whole numbers and conjectured it for the rest. After Euler, nobody
          did substantial work on the function for more than a century. The mathematician Weil, in
          his history of number theory, wrote that the subject was dead, and that Riemann brought it
          back to life.
        </p>
        <p>
          In 1859, Riemann was elected to the Berlin Academy. Each new member had to report on
          recent research. His report is 8 pages long, and its title is “On the number of primes
          less than a given magnitude”. It starts from Euler's formula: the sum on one side, the
          product over the primes on the other.
        </p>
        <p>Riemann changed three things.</p>
        <ul>
          <li>He let s be a complex number, and gave the function the name ζ(s).</li>
          <li>
            He showed that the function has a meaning on the whole plane, except at the point 1. The
            sum alone works only where the real part of s is above 1.
          </li>
          <li>
            He found that the zeros of the function, the points where its value is 0, are tied to
            how the primes are spread.
          </li>
        </ul>
        <p>Then he conjectured where those zeros are. That conjecture is the Riemann hypothesis.</p>
        <p class="sources">
          Sources: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6. <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>, for where the
          sum works.
        </p>
      </section>

      <section>
        <h2>The dates in one list</h2>
        <ol class="timeline">
          <For each={TIMELINE}>
            {(entry) => (
              <li>
                <span class="year">{entry.year}</span>
                <span>{entry.text}</span>
              </li>
            )}
          </For>
        </ol>
        <p class="sources">
          Source: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6. For 1737 and 1744: <a href={VIADER}>Viader, Bibiloni and Paradís</a>.
        </p>
      </section>
    </main>
  );
}
