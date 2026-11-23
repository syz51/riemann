import { For } from "solid-js";
import { Stepper, type Part } from "./Stepper";
import { SumProduct } from "./SumProduct";

// Source of the content: docs/notes/background-zeta.md.
const PAPADOPOULOS = "https://arxiv.org/abs/1710.03982";
const VIADER = "https://econ-papers.upf.edu/papers/776.pdf";
const ELKIES = "https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf";

const SIEVE: Part[] = [
  {
    title: "Start with the sum over all whole numbers",
    equation: "x = 1 + 1/4 + 1/9 + 1/16 + 1/25 + 1/36 + …",
    text: "Call the sum x. It has one term for each whole number n, and the term is 1 divided by n × n. The example uses squares. The same steps work for each higher power.",
  },
  {
    title: "Divide every term by 4",
    equation: "x/4 = 1/4 + 1/16 + 1/36 + 1/64 + …",
    text: "The number 4 is the square of 2. The term of n is 1 divided by n × n. Divide it by 4, and it is 1 divided by 2n × 2n, the term of 2n. So the new terms belong to 2, 4, 6, 8 and so on. These are exactly the terms of the even numbers in x.",
  },
  {
    title: "Subtract: the even numbers go",
    equation: "(1 − 1/4) x = 1 + 1/9 + 1/25 + 1/49 + 1/81 + …",
    text: "Take x/4 away from x. On the left, x minus a quarter of x is (1 − 1/4) times x. On the right, each term of an even number leaves. The terms of the odd numbers 1, 3, 5, 7, 9 stay.",
  },
  {
    title: "Divide the new sum by 9",
    equation: "(1 − 1/4) x / 9 = 1/9 + 1/81 + 1/225 + 1/441 + …",
    text: "The number 9 is the square of 3. Divide the term of n by 9, and it is the term of 3n. So the terms of 1, 3, 5, 7 become the terms of 3, 9, 15, 21. These are exactly the terms of the multiples of 3 that are still in the sum.",
  },
  {
    title: "Subtract: the multiples of 3 go",
    equation: "(1 − 1/4)(1 − 1/9) x = 1 + 1/25 + 1/49 + 1/121 + …",
    text: "Take the sum of part 4 away from the sum of part 3. On the left, a sum minus one ninth of itself is (1 − 1/9) times the sum. On the right, the terms 1/9, 1/81, 1/225 and so on leave. The numbers 1, 5, 7, 11 stay: no multiple of 2 or 3. The first one after 1 is 5, the next prime.",
  },
  {
    title: "Go on with every prime",
    equation: "(1 − 1/4)(1 − 1/9)(1 − 1/25) … x = 1",
    text: "Every whole number above 1 is a multiple of some prime, so its term leaves at some step. Only the term 1 stays. So x is equal to 1 divided by all these factors. The sum over all whole numbers is a product over the primes only.",
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
        It began as one sum that nobody could finish. Euler finished it, asked
        the same question for other powers, and found that the answer knows
        about the primes.
      </p>

      <section>
        <h2>A sum that nobody could finish</h2>
        <p>Add 1 divided by each square number, and never stop:</p>
        <p class="equation">1 + 1/4 + 1/9 + 1/16 + 1/25 + …</p>
        <p>
          The terms shrink fast, so the sum does not grow without limit. It
          comes closer and closer to one value. Before Euler, this was known.
          The exact value was not. Wallis gave three digits of it in 1655.
          Jakob Bernoulli asked for the value in print in 1689, and the
          problem became famous. Leibniz, Stirling, de Moivre, Goldbach and
          several Bernoullis worked on it.
        </p>
        <p>
          Euler first calculated seven digits, 1.644934. This was hard work,
          because the sum comes close to its value very slowly. In 1735, at
          the age of 28, he found the exact value. It is π × π divided by 6,
          where π is the number of the circle, 3.14159…. Nobody expected a
          circle in a sum of square numbers. Euler wrote that he had found
          the formula “quite unexpectedly”.
        </p>
        <p>
          The result made him famous among mathematicians across Europe. His teacher Johann
          Bernoulli said that the most burning desire of his dead brother
          Jakob was now fulfilled.
        </p>
        <p class="sources">
          Source:{" "}
          <a href={PAPADOPOULOS}>
            Papadopoulos, Looking backward: from Euler to Riemann
          </a>
          , section 6.
        </p>
      </section>

      <section>
        <h2>One sum for each power</h2>
        <p>
          Now replace the squares by another power. Write s for the power:
        </p>
        <p class="equation">ζ(s) = 1 + 1/2ˢ + 1/3ˢ + 1/4ˢ + 1/5ˢ + …</p>
        <p>
          Each choice of s gives one sum, and so one value. A rule that turns
          each number s into one value is a function. This function is the
          zeta function, and ζ is the Greek letter zeta. The sum above is the
          case s = 2.
        </p>
        <p>
          Jakob Bernoulli had looked at these sums in 1689. Euler found the
          value for each even power in 1735. Each value is a fraction times a
          power of π. For the odd powers 3, 5, 7 and so on, he tried through
          his whole life to find a formula, and did not find one.
        </p>
        <p>
          Euler did not use the letter ζ. The name and the letter come from
          Riemann, more than a hundred years later.
        </p>
        <p class="sources">
          Source:{" "}
          <a href={PAPADOPOULOS}>
            Papadopoulos, Looking backward: from Euler to Riemann
          </a>
          , section 6 and its footnote 46.
        </p>
      </section>

      <section>
        <h2>The link to the primes</h2>
        <p>
          A prime is a whole number above 1 that only 1 and itself divide: 2,
          3, 5, 7, 11 and so on. Each whole number above 1 is a product of
          primes. The primes look as if they come without a pattern. Euler
          wrote in 1747 that their order is “a mystery which human mind will
          never be able to penetrate”.
        </p>
        <p>
          Ten years before, in 1737, he had found a door. The sum over all
          whole numbers is equal to a product that has one factor for each
          prime.
        </p>
        <Stepper parts={SIEVE} />
        <p>
          Euler used the same steps on the sum 1 + 1/2 + 1/3 + 1/4 + …, which
          grows without limit. From this he concluded that the sum over the
          primes only, 1/2 + 1/3 + 1/5 + 1/7 + 1/11 + …, also grows without
          limit. This says more than “there are infinitely many primes”,
          which was known from Euclid. By the rules of today, his steps with
          sums that have no value are not a proof. Mertens gave the exact
          form of the result in 1874.
        </p>
        <p class="sources">
          Sources:{" "}
          <a href={VIADER}>
            Viader, Bibiloni and Paradís, On a series of Goldbach and Euler
          </a>
          , sections 1 and 7, for the 1737 paper and its steps.{" "}
          <a href={PAPADOPOULOS}>Papadopoulos</a>, section 6, for the rest. The
          source shows the steps for the sum 1 + 1/2 + 1/3 + …; the squares
          here follow the same lines.
        </p>
      </section>

      <section>
        <h2>The picture: the sum and the product</h2>
        <p>
          The chart counts up to a number N. The sum takes the terms of the
          whole numbers up to N. The product takes one factor for each prime
          up to N. Move N and watch both come close to the same value.
        </p>
        <SumProduct />
        <p>
          The product is never behind the sum, and from N = 2 on it is ahead. The factors of the primes up
          to N already hold every number that is built from these primes, also
          numbers above N. With “No power”, there is no value to come close
          to: both lines go up without limit, but more and more slowly.
        </p>
        <p class="sources">
          The numbers in the chart are computed on this page. The formula is
          the one of the section above.
        </p>
      </section>

      <section>
        <h2>A hundred years later: Riemann</h2>
        <p>
          In 1749, Euler found one more thing: a symmetry that links the value
          at s to the value at 1 − s. He proved it for whole numbers and
          conjectured it for the rest. After Euler, nobody did substantial
          work on the function for more than a century. The mathematician
          Weil, in his history of number theory, wrote that the subject was dead, and that Riemann brought it back
          to life.
        </p>
        <p>
          In 1859, Riemann was elected to the Berlin Academy. Each new member
          had to report on recent research. His report is 8 pages long, and
          its title is “On the number of primes less than a given magnitude”.
          It starts from Euler's formula: the sum on one side, the product
          over the primes on the other.
        </p>
        <p>Riemann changed three things.</p>
        <ul>
          <li>
            He let s be a complex number, and gave the function the name ζ(s).
          </li>
          <li>
            He showed that the function has a meaning on the whole plane,
            except at the point 1. The sum alone works only where the real
            part of s is above 1.
          </li>
          <li>
            He found that the zeros of the function, the points where its
            value is 0, are tied to how the primes are spread.
          </li>
        </ul>
        <p>
          Then he conjectured where those zeros are. That conjecture is the
          Riemann hypothesis.
        </p>
        <p class="sources">
          Sources:{" "}
          <a href={PAPADOPOULOS}>
            Papadopoulos, Looking backward: from Euler to Riemann
          </a>
          , section 6.{" "}
          <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>, for
          where the sum works.
        </p>
        <p>
          <a href="#/complex-numbers">Read why complex numbers exist</a>, or{" "}
          <a href="#/">go to step 1: what exactly was proved</a>.
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
          Source:{" "}
          <a href={PAPADOPOULOS}>
            Papadopoulos, Looking backward: from Euler to Riemann
          </a>
          , section 6. For 1737 and 1744:{" "}
          <a href={VIADER}>Viader, Bibiloni and Paradís</a>.
        </p>
      </section>
    </main>
  );
}
