import { For } from "solid-js";
import { backgroundKicker, href } from "./pages";
import { Stepper, type Part } from "./Stepper";
import { SumProduct } from "./SumProduct";

// Source of the content: docs/notes/background-zeta.md.
const PAPADOPOULOS = "https://arxiv.org/abs/1710.03982";
const VIADER = "https://econ-papers.upf.edu/papers/776.pdf";
const CONRAD = "https://kconrad.math.uconn.edu/math3240s20/handouts/infinitudeofprimes.pdf";
const PRIME_SUM =
  "https://en.wikipedia.org/wiki/Divergence_of_the_sum_of_the_reciprocals_of_the_primes";
const MATHLIB_PIN =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean";
const MATHLIB_VALUES =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/HurwitzZetaValues.lean";
const MATHLIB_BERNOULLI =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/Bernoulli.lean#L209-L211";
const MATHLIB_GAMMA =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Gamma/Basic.lean#L11-L21";
const MATHLIB_CONJ =
  "https://github.com/leanprover-community/mathlib4/blob/90e6eec9fe53b02d431c90718e4a1d22d67a204e/Mathlib/NumberTheory/Harmonic/ZetaAsymp.lean#L454-L460";
const EULER_E352 = "https://scholarlycommons.pacific.edu/euler-works/352/";
const EULER_E19 = "https://scholarlycommons.pacific.edu/euler-works/19/";
const ELKIES = "https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf";
const RIEMANN_1859 = "https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Zeta/EZeta.pdf";
const RIEMANN_1859_DE = "https://de.wikisource.org/wiki/Index:RiemannPrim1859";
const LANDAU_1909_ANN =
  "https://gdz.sub.uni-goettingen.de/download/pdf/PPN235181684_0066/LOG_0047.pdf";
const LANDAU_1909_HANDBUCH = "https://archive.org/details/handbuchderlehre01landuoft";
const TITCHMARSH_1930 = "https://archive.org/details/zetafunctionofri032076mbp";
const MATHLIB_TRIVIAL =
  "https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L172-L180";
const MATHLIB_HURWITZ_TRIVIAL =
  "https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/NumberTheory/LSeries/HurwitzZetaEven.lean#L604-L621";
const SHORTGRH_URL = "https://math.mit.edu/~drew/shortgrh/";
const SCHOENFELD_URL = "https://github.com/AndrewVSutherland/schoenfeld-rh-lean/tree/0e52d7b1";

const SIEVE: Part[] = [
  {
    title: "Start with the sum over all whole numbers",
    equation: tex`x = 1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \frac{1}{5^2} + \frac{1}{6^2} + \cdots`,
    text: prose`Call the sum $x$. It has one term for each whole number $n$, and the term is 1 divided by $n^2$. So the terms are 1, $\frac{1}{4}$, $\frac{1}{9}$, $\frac{1}{16}$ and so on. The example uses squares. The same steps work for each higher power.`,
  },
  {
    title: "Divide every term by 2²",
    titleHtml: prose`Divide every term by $2^2$`,
    equation: tex`\frac{x}{2^2} = \frac{1}{2^2} + \frac{1}{4^2} + \frac{1}{6^2} + \frac{1}{8^2} + \cdots`,
    text: prose`The term of $n$ is 1 divided by $n^2$. Divide it by $2^2$, and it is 1 divided by $(2n)^2$, the term of $2n$. So the new terms belong to 2, 4, 6, 8 and so on. These are exactly the terms of the even numbers in $x$.`,
  },
  {
    title: "Subtract: the even numbers go",
    equation: tex`\left(1 - \frac{1}{2^2}\right) x = 1 + \frac{1}{3^2} + \frac{1}{5^2} + \frac{1}{7^2} + \frac{1}{9^2} + \cdots`,
    text: prose`Take the sum of part 2 away from $x$. On the left, $x$ minus $\frac{x}{2^2}$ is $\left(1 - \frac{1}{2^2}\right)$ times $x$. On the right, each term of an even number leaves. The terms of the odd numbers 1, 3, 5, 7, 9 stay.`,
  },
  {
    title: "Divide the new sum by 3²",
    titleHtml: prose`Divide the new sum by $3^2$`,
    equation: tex`\frac{1}{3^2} \left(1 - \frac{1}{2^2}\right) x = \frac{1}{3^2} + \frac{1}{9^2} + \frac{1}{15^2} + \frac{1}{21^2} + \cdots`,
    text: prose`Divide the term of $n$ by $3^2$, and it is the term of $3n$. So the terms of 1, 3, 5, 7 become the terms of 3, 9, 15, 21. These are exactly the terms of the multiples of 3 that are still in the sum.`,
  },
  {
    title: "Subtract: the multiples of 3 go",
    equation: tex`\left(1 - \frac{1}{2^2}\right) \left(1 - \frac{1}{3^2}\right) x = 1 + \frac{1}{5^2} + \frac{1}{7^2} + \cdots`,
    text: prose`Take the sum of part 4 away from the sum of part 3. On the left, a sum minus $\frac{1}{3^2}$ of itself is $\left(1 - \frac{1}{3^2}\right)$ times the sum. On the right, the terms of 3, 9, 15 and so on leave. The numbers 1, 5, 7 and then 11, 13 stay: no multiple of 2 or 3. The first one after 1 is 5, the next prime.`,
  },
  {
    title: "Go on with every prime",
    equation: tex`\left(1 - \frac{1}{2^2}\right) \left(1 - \frac{1}{3^2}\right) \left(1 - \frac{1}{5^2}\right) \cdots \, x = 1`,
    text: prose`Every whole number above 1 is a multiple of some prime, so its term leaves at some step. Only the term 1 stays. So $x$ is equal to 1 divided by all these factors: one factor for each prime 2, 3, 5, 7 and so on. The sum over all whole numbers is a product over the primes only.`,
  },
];

const TIMELINE: { year: string; text: Markup }[] = [
  {
    year: "1650",
    text: prose`Mengoli's book on endless sums. The question of the exact value of $1 + \frac{1}{4} + \frac{1}{9} + \cdots$ goes back at least to this book.`,
  },
  {
    year: "1689",
    text: prose`Jakob Bernoulli asks for the value in print. After this, the problem is widely known. He also looks at the same sum with other powers.`,
  },
  {
    year: "1735",
    text: prose`Euler, 28 years old, finds the value: $\pi \times \pi$ divided by 6. He also finds the value for every even power.`,
  },
  {
    year: "1737",
    text: prose`Euler's paper “Various observations about infinite series” has the product over the primes. It is printed in 1744.`,
  },
  {
    year: "1749",
    text: prose`Euler writes down a symmetry of the function. He proves it for whole numbers and conjectures it for all numbers. The paper is printed in 1768.`,
  },
  {
    year: "1859",
    text: prose`Riemann's paper of 8 pages. The number $s$ becomes a complex number, the function gets the name $\zeta(s)$, and the hypothesis is stated.`,
  },
  {
    year: "1896",
    text: prose`Hadamard and de la Vallée Poussin prove the law for the number of primes below a given size. Their proofs follow Riemann's sketch.`,
  },
];

/** Background page: what the zeta function is, and who made it and why. */
export function ZetaPage() {
  return (
    <main class="article">
      <p class="kicker">{backgroundKicker("zeta")}</p>
      <h1>Where the zeta function came from</h1>
      <p class="summary">
        It began as one sum that nobody could finish. Euler finished it, asked the same question for
        other powers, and found that the answer knows about the primes.
      </p>

      <nav class="page-toc" aria-label="On this page">
        <p class="page-toc-label">On this page</p>
        <ol>
          <li>
            <a href={href("zeta", "basel")}>The sum</a>
          </li>
          <li>
            <a href={href("zeta", "convergence")}>The wall at 1</a>
          </li>
          <li>
            <a href={href("zeta", "primes")}>Link to the primes</a>
          </li>
          <li>
            <a href={href("zeta", "euler-1749")}>Euler's 1749 clue</a>
          </li>
          <li>
            <a href={href("zeta", "riemann-1859")}>Riemann's mirror (1859)</a>
          </li>
          <li>
            <a href={href("zeta", "trivial-zeros")}>Trivial zeros</a>
          </li>
          <li>
            <a href={href("zeta", "zeros-and-primes")}>Zeros and primes</a>
          </li>
          <li>
            <a href={href("zeta", "timeline")}>Dates</a>
          </li>
        </ol>
      </nav>

      <section id="basel">
        <h2>A sum that nobody could finish</h2>
        <p
          innerHTML={prose`Add 1 divided by each square number, and never stop. The square of 2, written $2^2$, is
            $2 \times 2 = 4$:`}
        />
        {/* One line where it fits; two lines on a phone, so no side scroll is needed. */}
        <p
          class="equation equation-one-line"
          innerHTML={tex`1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \cdots = 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots`}
        />
        <p
          class="equation equation-two-lines"
          innerHTML={tex`\begin{aligned} & 1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \cdots \\ = \; & 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots \end{aligned}`}
        />
        <p>
          The terms shrink fast, so the sum does not grow without limit. It comes closer and closer
          to one value. Before Euler, this was known. The exact value was not. Wallis gave three
          digits of it in 1655. Jakob Bernoulli asked for the value in print in 1689, and the
          problem became famous. Leibniz, Stirling, de Moivre, Goldbach and several Bernoullis
          worked on it.
        </p>
        <p
          innerHTML={prose`Euler first calculated seven digits, 1.644934. This was hard work, because the sum comes
            close to its value very slowly. In 1735, at the age of 28, he found the exact value. It
            is $\pi \times \pi$ divided by 6, where $\pi$ is the number of the circle, 3.14159….
            Nobody expected a circle in a sum of square numbers. Euler wrote that he had found the
            formula “quite unexpectedly”.`}
        />
        <p>
          The result made him famous among mathematicians across Europe. His teacher Johann
          Bernoulli said that the most burning desire of his dead brother Jakob was now fulfilled.
        </p>

        <h3 id="powers">One sum for each power</h3>
        <p innerHTML={prose`Now replace the squares by another power. Write $s$ for the power:`} />
        <p
          class="equation"
          innerHTML={tex`\zeta(s) = 1 + \frac{1}{2^s} + \frac{1}{3^s} + \frac{1}{4^s} + \frac{1}{5^s} + \cdots`}
        />
        <p
          innerHTML={prose`Each choice of $s$ gives one sum, and so one value. A rule that turns each number $s$
            into one value is a function. This function is the zeta function, and $\zeta$ is the
            Greek letter zeta. The sum above is the case $s = 2$.`}
        />
        <p
          innerHTML={prose`Jakob Bernoulli had looked at these sums in 1689. Euler found the value for each even
            power in 1735. Each value is a fraction times a power of $\pi$. For the odd powers 3, 5,
            7 and so on, he tried through his whole life to find a formula, and did not find one.
            Euler did not use the letter $\zeta$: the name and letter come from Riemann, more than a
            hundred years later.`}
        />
        <p class="sources">
          Source: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6 and its footnote 46.
        </p>
      </section>

      <section id="convergence">
        <h2>Why an endless sum can have a value</h2>
        <p
          innerHTML={prose`Once you let the power $s$ vary, the first question is: for which powers does this
            endless sum even add up to a finite number? A sum with endlessly many terms does not
            always grow without limit. Walk to a wall that is 2 metres away, and let each step
            cover half of the distance that is left: 1 metre, then $\frac{1}{2}$, then
            $\frac{1}{4}$. You take endlessly many steps and never pass the wall.`}
        />
        <p
          class="equation"
          innerHTML={tex`1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots \; \text{ never passes } 2`}
        />
        <p
          innerHTML={prose`So the question for each power is: do the terms shrink fast enough? The power 1 is the border. For the squares ($s = 2$) and every power $s$ above 1, the terms shrink fast enough for the sum to have a value. For $s = 1$ (no power), the sum $1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots$ grows without limit — a result Oresme proved in the 14th century. This is why $\zeta(s)$, as a sum, is defined for $s$ above 1 only.`}
        />
        <details class="aside-details">
          <summary>
            <span
              innerHTML={prose`Check by hand: why $s = 2$ stops below 2, while $s = 1$ grows without limit`}
            />
          </summary>
          <div class="aside-body">
            <p
              innerHTML={prose`For the squares ($s = 2$), put the terms in blocks of 1, 2, 4, 8 terms and so on. The two terms $\frac{1}{4} + \frac{1}{9}$ are each at most $\frac{1}{4}$, so together at most $\frac{1}{2}$. The four terms from $\frac{1}{16}$ to $\frac{1}{49}$ are each at most $\frac{1}{16}$, so together at most $\frac{1}{4}$. The next eight are together at most $\frac{1}{8}$. The blocks are no larger than the steps to the wall, so the sum never passes 2.`}
            />
            <p
              innerHTML={prose`With no power ($s = 1$), the terms are 1, $\frac{1}{2}$, $\frac{1}{3}$, $\frac{1}{4}$ and so on. Blocks of the same sizes now give the opposite result. Keep 1 and $\frac{1}{2}$ as they are. The two terms $\frac{1}{3} + \frac{1}{4}$ are each at least $\frac{1}{4}$, so together at least $\frac{1}{2}$. The four terms from $\frac{1}{5}$ to $\frac{1}{8}$ are each at least $\frac{1}{8}$, so together at least $\frac{1}{2}$ again. Each block adds at least $\frac{1}{2}$, and the blocks never end, so this sum grows without limit.`}
            />
          </div>
        </details>
        <p class="sources">
          The block sums are arithmetic that you can check by hand. For Oresme:{" "}
          <a href={PRIME_SUM}>Wikipedia, Divergence of the sum of the reciprocals of the primes</a>.
        </p>
      </section>

      <section id="primes">
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
        <p
          innerHTML={prose`For another power $s$, divide by $2^s$, then by $3^s$, then by $5^s$, in place of $2^2$,
            $3^2$ and $5^2$. The steps stay the same, because the term of $n$ divided by $2^s$ is
            the term of $2n$. The result, for each power $s$ above 1:`}
        />
        <p
          class="equation"
          innerHTML={tex`\zeta(s) = \frac{1}{1 - \dfrac{1}{2^s}} \times \frac{1}{1 - \dfrac{1}{3^s}} \times \frac{1}{1 - \dfrac{1}{5^s}} \times \frac{1}{1 - \dfrac{1}{7^s}} \times \cdots`}
        />
        <p
          innerHTML={prose`There is one factor for each prime, and no other factor. The steps need the sum to have
            a value: you cannot take $\frac{x}{2^2}$ away from $x$ when $x$ is not a number.`}
        />
        <p
          innerHTML={prose`Euler used the same steps also with no power, on the sum $1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots$,
            which grows without limit. From this he concluded that the sum over the primes only,
            $\frac{1}{2} + \frac{1}{3} + \frac{1}{5} + \frac{1}{7} + \frac{1}{11} + \cdots$, also grows without limit. By the rules of
            today, his steps with sums that have no value are not a proof. The result is true:
            Mertens gave its exact form in 1874.`}
        />
        <p
          innerHTML={prose`This says more than “there are infinitely many primes”, which was known from Euclid. The
            squares show why. There are infinitely many squares too, but the sum $1 + \frac{1}{4} + \frac{1}{9} +
            \cdots$ has a value. The sum $\frac{1}{2} + \frac{1}{3} + \frac{1}{5} + \cdots$ has none. So both lists never
            end, but the primes come more often than the squares. Euclid's result cannot tell the
            two lists apart. Euler's result can.`}
        />
        <h3 id="sum-product">Watch the sum and the product meet</h3>
        <p
          innerHTML={prose`The chart counts up to a number $N$. The sum takes the terms of the whole numbers up to
            $N$. The product takes one factor for each prime up to $N$. Move $N$ and watch both come
            close to the same value.`}
        />
        <SumProduct />
        <p
          innerHTML={prose`The product is never behind the sum, and from $N = 2$ on it is ahead. The factors of the
            primes up to $N$ already hold every number that is built from these primes, also numbers
            above $N$. With “No power”, there is no value to come close to: both lines go up without
            limit, but more and more slowly.`}
        />
        <p class="sources">
          Sources:{" "}
          <a href={VIADER}>Viader, Bibiloni and Paradís, On a series of Goldbach and Euler</a>,
          sections 1 and 7, for the 1737 paper, its steps and Mertens.{" "}
          <a href={PAPADOPOULOS}>Papadopoulos</a>, section 6, for Euclid and the words of Euler.{" "}
          <a href={CONRAD}>Conrad, The infinitude of the primes</a>, section 3, for the primes
          against the squares. The first source shows the steps for the sum{" "}
          <span innerHTML={prose`$1 + \frac{1}{2} + \frac{1}{3} + \cdots$;`} /> the squares here
          follow the same lines, and the numbers in the chart are computed on this page.
        </p>
      </section>

      <section id="euler-1749">
        <h2>A clue Euler could not prove (1749)</h2>
        <p
          innerHTML={prose`Euler now knew $\zeta(s)$ for every even power $s = 2, 4, 6, \dots$ and had linked the
            sum to the primes, yet every odd power $3, 5, 7, \dots$ still defeated him. Looking for
            patterns across powers, in 1749 he compared his shrinking sums ($s > 1$) against growing
            sums with alternating signs — and stumbled on a hidden symmetry that pairs each number
            $s$ with $1 - s$.`}
        />
        <p
          innerHTML={prose`The partner of 2 is $1 - 2 = -1$, and the partner of 3 is $1 - 3 = -2$. The two numbers
            of a pair sit at the same distance from $\frac{1}{2}$, on opposite sides: mirror images
            with the mirror at $\frac{1}{2}$.`}
        />
        <p
          innerHTML={prose`The symmetry does not say that the two values of a pair are equal. It says they are
            linked: the value at $1 - s$ equals the value at $s$ times a specific conversion factor
            that depends on $s$. Take the pair 2 and $-1$. The value at 2 is $\frac{\pi^2}{6}$
            (about 1.645), and the factor for $s = 2$ is $-\frac{1}{2\pi^2}$. Multiplying them
            gives $-\frac{1}{12}$ as the partner value at $-1$.`}
        />
        <p
          innerHTML={prose`That result created a puzzle. At $s = -1$, the original sum would be $1 + 2 + 3 + \cdots$,
            which grows without limit and has no sum in the usual sense. Euler worked instead with
            alternating sums such as $1 - 2 + 3 - 4 + \cdots$, gave them a value through power-series
            limits, proved his rule for whole numbers (handling $n = 1$ by a limit where two factors
            vanished together to give 0 divided by 0), and boldly conjectured it for every $s$. He
            tested it at $n = 0, \frac{1}{2}, \frac{3}{2}$, yet admitted he had no single proof for
            all cases.`}
        />
        <details class="aside-details">
          <summary>
            <span>How did Euler guess the symmetry in 1749?</span>
          </summary>
          <div class="aside-body">
            <p>
              Euler did not get the symmetry from a proof. He saw a pattern in numbers, guessed a
              rule, and then tested the rule. The steps below follow his paper.
            </p>
            <ol>
              <li
                innerHTML={prose`He took two families of sums with alternating signs. One grows:
                  $1 - 2^m + 3^m - 4^m + \cdots$. The other shrinks: $1 - \frac{1}{2^n} + \frac{1}{3^n} - \frac{1}{4^n} + \cdots$.`}
              />
              <li
                innerHTML={prose`The growing sums have no value in the usual sense, and Euler said so. He gave them
                  one in this way: for small $x$, the sum $1 - 2x + 3x^2 - 4x^3 + \cdots$ is $\frac{1}{(1 + x)^2}$.
                  At $x = 1$ this formula gives $\frac{1}{4}$, so he took $\frac{1}{4}$ as the value of $1 - 2 + 3 - 4 + \cdots$.
                  He wrote that the word “sum” needs “a more extended meaning” here.`}
              />
              <li
                innerHTML={prose`He already knew the sums $1 + \frac{1}{2^n} + \frac{1}{3^n} + \cdots$ for even $n$: each is a
                  fraction times $\pi^n$. The shrinking sums follow from them. Then he found that the
                  growing sums with odd $m$ contain the same fractions, and that the growing sums
                  with even $m$ above 0 are 0.`}
              />
              <li
                innerHTML={prose`So he divided the growing sum with power $m = n - 1$ by the shrinking sum with
                  power $n$. For even $n$ the fraction drops out. For $n = 2$ this is
                  $1 - 2 + 3 - \cdots$ divided by $1 - \frac{1}{2^2} + \frac{1}{3^2} - \cdots$, and the result is $\frac{3}{\pi^2}$.
                  For odd $n$ above 1 the growing sum is 0, so the result is 0.`}
              />
              <li
                innerHTML={prose`He wrote the results for $n = 2, 3, 4, 5, 6$ and so on as one rule times a number $N$.
                  The values of $N$ were $+1, 0, -1, 0, +1$ and so on. He saw that $-\cos\!\left(\frac{n\pi}{2}\right)$ gives
                  exactly these values.`}
              />
              <li
                innerHTML={prose`He then wrote: “I venture to propose the following conjecture”, that the rule holds for
                  every $n$. He called the conjecture bold.`}
              />
              <li
                innerHTML={prose`He tested it. It held for $n = 1$ and $n = 0$. He showed that the negative whole
                  numbers follow from the positive ones. For $n = \frac{1}{2}$ both sides are 1. For $n = \frac{3}{2}$
                  he computed both sides to several decimal places, and they agreed.`}
              />
            </ol>
            <p>
              Euler stated that he had no single proof for every case. Riemann gave that proof in
              1859.
            </p>
          </div>
        </details>
        <p class="sources">
          Sources: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6;{" "}
          <a href={EULER_E352}>
            Euler, Remarks on a beautiful relation between direct as well as reciprocal power series
            (E352, Euler Archive)
          </a>
          , translated by Willis and Osler, sections 1 to 15 (including section 11 for{" "}
          <span innerHTML={prose`$n = 1$`} />
          ); <a href={MATHLIB_PIN}>Mathlib, theorem riemannZeta_one_sub</a> (for the conversion
          factor <span innerHTML={prose`$-\frac{1}{2\pi^2}$`} /> at{" "}
          <span innerHTML={prose`$s = 2$`} />
          ); <a href={MATHLIB_VALUES}>Mathlib, values of the function</a> and{" "}
          <a href={MATHLIB_BERNOULLI}>the theorem bernoulli_two</a>, for the values at 2 and{" "}
          <span innerHTML={prose`$-1$.`} />
        </p>
      </section>

      <section id="riemann-1859">
        <h2>A hundred years later: Riemann crosses the wall</h2>
        <p>
          After Euler, nobody did substantial work on the function for more than a century. The
          mathematician Weil, in his history of number theory, wrote that the subject was dead, and
          that Riemann brought it back to life. Two big questions remained open: how to give the
          function a rigorous meaning past the wall at 1 where the sum fails, and how to turn
          Euler's prime product into a way to count primes.
        </p>
        <p>
          In 1859, Riemann was elected to the Berlin Academy and submitted an 8-page report, “On the
          number of primes less than a given magnitude”. It starts straight from Euler's prime
          product, and changes three things:
        </p>
        <ul>
          <li
            innerHTML={prose`He let $s$ be a complex number, and gave the function the name $\zeta(s)$.`}
          />
          <li
            innerHTML={prose`He showed that $\zeta(s)$ extends smoothly to the whole complex plane except at 1, and
              proved Euler's $s \leftrightarrow 1 - s$ symmetry for every complex $s$. That resolves
              Euler's puzzle: $-\frac{1}{12}$ belongs to this extended function at $s = -1$, not to
              the divergent sum $1 + 2 + 3 + \cdots$.`}
          />
          <li>
            He discovered that the zeros of the function, the points where its value is 0, control
            how the primes are spread — and conjectured where those zeros lie. That conjecture is
            the Riemann hypothesis.
          </li>
        </ul>
        <p
          innerHTML={prose`Riemann's proof also explains why the raw conversion factor looks so asymmetric and leaves
            out certain points. He found that multiplying $\zeta(s)$ by a companion factor built from
            the function $\Gamma$ (gamma) produces a completed function whose values at $s$ and
            $1 - s$ are literally equal, with only two bad points: 0 and 1 (partners of each other).
            Moving $\Gamma$ onto one side puts $\Gamma(s)$ inside the conversion factor between
            $\zeta(s)$ and $\zeta(1 - s)$, so that raw rule skips $s = 1$ (where $\zeta$ blows up)
            and $s = 0, -1, -2, \dots$ (where $\Gamma$ has no value — which is why it gives the
            value at $-1$ from 2, but cannot run backwards from $-1$ to 2). Those exceptions are
            points where a piece of the rule has no value, not points where the symmetry fails.`}
        />
        <p
          innerHTML={prose`The function $\Gamma$ was not invented for this proof. Euler had already created it in
            1729 to extend the factorial $1 \cdot 2 \cdot 3 \cdots n$ between whole numbers (shifted
            by 1 in modern notation, so $\Gamma(5) = 1 \cdot 2 \cdot 3 \cdot 4 = 24$, with no value
            at 0, $-1$, $-2$ and so on).`}
        />
        <p>
          The page <a href={href("gamma")}>The Gamma function</a> explains its history, why it has
          no value at those points, and how Riemann used its integral to prove the symmetry of{" "}
          <span innerHTML={prose`$\zeta(s)$.`} />
        </p>
        <p
          innerHTML={prose`Riemann's complex symmetry also explains why the Riemann hypothesis focuses on the
            vertical line $\operatorname{Re}(s) = \frac{1}{2}$ (here $\operatorname{Re}$ stands for
            “real part”, how far left or right $s$ sits). Inside the strip $0 < \operatorname{Re}(s) < 1$,
            the zeros of $\zeta(s)$ always come in mirrored pairs across that line: whenever a zero sits
            at $a + bi$, a twin zero sits at $(1 - a) + bi$ at the exact same height on the opposite
            side. The Riemann hypothesis says that apart from the negative even zeros, every zero sits
            right on the mirror line $\operatorname{Re}(s) = \frac{1}{2}$, where it is its own mirror image.`}
        />
        <details class="aside-details">
          <summary>
            <span
              innerHTML={prose`Why $s \mapsto 1 - s$ becomes a vertical mirror across $\operatorname{Re}(s) = \frac{1}{2}$`}
            />
          </summary>
          <div class="aside-body">
            <p
              innerHTML={prose`For a complex number $s = a + bi$, the partner $1 - s = (1 - a) - bi$ flips both
                left-to-right and up-to-down — a half turn around the point $\frac{1}{2}$, not yet a
                mirror across a line.`}
            />
            <p
              innerHTML={prose`Because $\zeta$ has real coefficients, it also obeys a second symmetry: flipping the
                sign of the $i$ part sends $\zeta(a + bi)$ to the conjugate of $\zeta(a + bi)$, so
                $a - bi$ is a zero whenever $a + bi$ is. Combining both symmetries sends $a + bi$ to
                $(1 - a) + bi$ — the exact same height $b$, mirrored across $\operatorname{Re}(s) = \frac{1}{2}$.
                Inside $0 < \operatorname{Re}(s) < 1$, the $\Gamma$ factor between $\zeta$ and its
                completed form is never 0, so the zeros of $\zeta$ inherit that exact pairing.`}
            />
          </div>
        </details>
        <p class="sources">
          Sources: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6;{" "}
          <a href={RIEMANN_1859}>
            Riemann, On the Number of Prime Numbers less than a Given Quantity (1859, Wilkins
            translation)
          </a>
          , pages 1 to 3; <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>, for
          where the sum works, the poles of the completed function at 0 and 1, and Riemann's
          symmetry; <a href={MATHLIB_CONJ}>Mathlib, theorem riemannZeta_conj</a>, for the second
          symmetry; <a href={MATHLIB_PIN}>Mathlib at the commit the proof builds against</a> (four
          statements for the mirrored pairs of zeros, and riemannZeta_one_sub for the conversion
          factor); <a href={MATHLIB_GAMMA}>Mathlib, the header of the file on the Gamma function</a>
          ; and <a href={EULER_E19}>Euler Archive, record of paper E19</a>, for the year 1729.
        </p>
      </section>

      <section id="trivial-zeros">
        <h2>Why the negative even numbers are “trivial” zeros</h2>
        <p>
          <span
            innerHTML={prose`The statement of the Riemann hypothesis explicitly leaves out $s = -2, -4, -6$ and so on.
              Once you have Riemann's completed symmetry $\Lambda(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)\,\zeta(s)$
              (introduced in `}
          />
          <a href={href("zeta", "riemann-1859")}>Riemann's 1859 symmetry above</a>
          <span
            innerHTML={prose`), you can see in two lines why $\zeta(s)$ has to be 0 at every one of those points.
              Rearrange the completed function to solve for $\zeta(s)$:`}
          />
        </p>
        <p
          class="equation"
          innerHTML={tex`\zeta(s) = \frac{\Lambda(s)}{\pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)}`}
        />
        <p>
          <span
            innerHTML={prose`Now plug in $s = -2, -4, -6, \dots$ (so $\frac{s}{2}$ lands on $-1, -2, -3, \dots$). Because
              $\Lambda(s) = \Lambda(1 - s)$, the top equals $\Lambda(3), \Lambda(5), \Lambda(7), \dots$ —
              all completely finite, nonzero numbers. Meanwhile, the bottom factor $\Gamma\!\left(\frac{s}{2}\right)$
              blows up to infinity at every negative whole number (see `}
          />
          <a href={href("gamma", "poles")}>Where Gamma has no value</a>
          <span
            innerHTML={prose`). A finite number divided by infinity is 0, so $\zeta(s)$ is forced to vanish at
              $-2, -4, -6, \dots$ simply to keep the completed product finite.`}
          />
        </p>
        <p
          innerHTML={prose`What about $s = 0$, where $\frac{s}{2} = 0$ also makes $\Gamma$ blow up? At $s = 0$ the top
            $\Lambda(s)$ blows up too (0 and 1 are its two poles). Those two infinities cancel each other out,
            leaving the finite nonzero value $\zeta(0) = -\frac{1}{2}$ instead of 0.`}
        />
        <details class="aside-details">
          <summary>
            <span>How Riemann proved it in 1859, the cosine shortcut, and Lean's proof</span>
          </summary>
          <div class="aside-body">
            <p>
              <strong>Riemann's 1859 proof:</strong>{" "}
              <span
                innerHTML={prose`In the very paragraph where he extended $\zeta(s)$ to all complex numbers, Riemann bent $\int_0^\infty \frac{x^{s - 1}}{e^x - 1}\,dx$ into a contour loop around $(0, \infty)$ (writing $\Pi(s - 1)$ for $\Gamma(s)$):`}
              />
            </p>
            <p
              class="equation"
              innerHTML={tex`\begin{aligned} &2\sin(\pi s)\,\Pi(s - 1)\,\zeta(s) \\ &= i \int_\infty^\infty \frac{(-x)^{s - 1}}{e^x - 1}\,dx \end{aligned}`}
            />
            <p>
              <span
                innerHTML={prose`He immediately noted (1859 Monatsberichte, p. 672) that this formula shows $\zeta(s)$ is single-valued and finite everywhere except 1, “as well as that it vanishes when $s$ is equal to a negative even integer” (`}
              />
              <em>
                <span
                  innerHTML={prose`“daſs sie verschwindet, wenn $s$ gleich einer negativen geraden Zahl ist”`}
                />
              </em>
              <span
                innerHTML={prose`). Earlier, in 1749, Euler had already found that the alternating series $1 - 2^m + 3^m - 4^m + \cdots$ evaluates to 0 for positive even $m$, without rigorously defining $\zeta(s)$ past $s = 1$.`}
              />
            </p>
            <p>
              <strong>The cosine shortcut:</strong>{" "}
              <span
                innerHTML={prose`In the direct symmetry rule linking $\zeta(s)$ and $\zeta(1 - s)$,`}
              />
            </p>
            <p
              class="equation"
              innerHTML={tex`\zeta(1 - s) = 2\,(2\pi)^{-s}\,\Gamma(s)\,\cos\!\left(\frac{\pi s}{2}\right)\,\zeta(s),`}
            />
            <p
              innerHTML={prose`plugging in any odd whole number $s = 3, 5, 7, \dots$ sends $1 - s$ to $-2, -4, -6, \dots$.
                Every other factor on the right is finite, while $\cos\!\left(\frac{3\pi}{2}\right) = \cos\!\left(\frac{5\pi}{2}\right) = \cdots = 0$,
                forcing $\zeta(-2) = \zeta(-4) = \zeta(-6) = \cdots = 0$ at once. ($s = 1$ is excluded because $\zeta(1)$ blows up.)`}
            />
            <p>
              <strong>In Lean today:</strong> Mathlib's theorem{" "}
              <code>riemannZeta_neg_two_mul_nat_add_one</code>{" "}
              <span
                innerHTML={prose`proves $\zeta(-2(n + 1)) = 0$ directly from $\frac{\Lambda(s)}{\pi^{-\frac{s}{2}}\Gamma\!\left(\frac{s}{2}\right)}$ in four lines, and`}
              />{" "}
              <code>differentiableAt_hurwitzZetaEven</code>{" "}
              <span
                innerHTML={prose`proves $\zeta$ is smooth at those points — confirming that 0 is the genuine analytic limit.`}
              />
            </p>
          </div>
        </details>
        <p
          innerHTML={prose`These zeros are called “trivial” not because they are unimportant, but because nothing deep about
            prime numbers is needed to find them: they drop out mechanically from the poles of $\Gamma$. Every other
            zero of $\zeta(s)$ is trapped inside the strip $0 \le \operatorname{Re}(s) \le 1$, where the irregularities
            of the primes live.`}
        />
        <p>
          <span
            innerHTML={prose`Riemann himself never used the word “trivial” in 1859 — he simply noted the negative even zeros and called the zeros of $\xi(t)$ “roots” (`}
          />
          <em>Wurzeln</em>
          <span innerHTML={prose`). Half a century later, in his 1908–1909 papers and `} />
          <em>Handbuch</em>
          <span innerHTML={prose`, Edmund Landau used “trivial zeros” (`} />
          <em>triviale Nullstellen</em>
          <span
            innerHTML={prose`) for Dirichlet $L$-functions to separate “the trivial roots $< 0$” from “the mysterious roots in the strip $0 < \operatorname{Re}(s) < 1$” — while for $\zeta(s)$ alone, Landau and even Titchmarsh in 1930 still simply contrasted the “real” zeros at $-2, -4, -6, \dots$ with the “complex” zeros in the strip.`}
          />
        </p>
        <p class="sources">
          Sources:{" "}
          <a href={RIEMANN_1859_DE}>
            Riemann, Ueber die Anzahl der Primzahlen unter einer gegebenen Grösse (1859
            Monatsberichte, p. 672)
          </a>{" "}
          and <a href={RIEMANN_1859}>Wilkins translation (pp. 2–3)</a>;{" "}
          <a href={LANDAU_1909_ANN}>Landau, Math. Ann. 66 (1909, signed June 1908), pp. 437, 440</a>
          ;{" "}
          <a href={LANDAU_1909_HANDBUCH}>
            Landau, Handbuch der Lehre von der Verteilung der Primzahlen (1909), Vol. 1 §§ 70, 128,
            130
          </a>
          ; <a href={TITCHMARSH_1930}>Titchmarsh, The Zeta-Function of Riemann (1930), pp. 2–3</a>;{" "}
          <a href={MATHLIB_TRIVIAL}>Mathlib, riemannZeta_neg_two_mul_nat_add_one</a> and{" "}
          <a href={MATHLIB_HURWITZ_TRIVIAL}>hurwitzZetaEven_neg_two_mul_nat_add_one</a>.
        </p>
      </section>

      <section id="zeros-and-primes">
        <h2>Why the zeros control the primes</h2>
        <p>
          <a href={href("zeta", "primes")}>Euler's 1737 product above</a>{" "}
          <span
            innerHTML={prose`already tied $\zeta(s)$ to the primes, but it only said the primes never run out.
              In the second half of his 1859 paper, Riemann took the logarithm of Euler's product and inverted it to turn
              $\zeta(s)$ into an exact formula for counting how many primes lie below any number $x$.`}
          />
        </p>
        <p
          innerHTML={prose`In Riemann's formula, a smooth curve $\operatorname{Li}(x)$ gives the main trend for the prime count,
            and every non-trivial zero $\rho = \beta + i\gamma$ of $\zeta(s)$ adds a wave built from $x^\rho$:`}
        />
        <p
          class="equation"
          innerHTML={tex`\begin{aligned} x^{\beta + i\gamma} &= x^{\beta} \cdot x^{i\gamma} \\ &= x^{\beta}\bigl(\cos(\gamma\log x) + i\sin(\gamma\log x)\bigr) \end{aligned}`}
        />
        <p
          innerHTML={prose`The two coordinates of each zero play two completely different roles in that wave. The vertical
            coordinate (the imaginary part $\gamma$) sets the frequency — how quickly the prime count wobbles above
            and below its average. The horizontal coordinate (the real part $\beta$) sets the height of the wave:
            it grows like $x^{\beta}$.`}
        />
        <p
          innerHTML={prose`Because mirrored zeros come in pairs at $\beta$ and $1 - \beta$, you can never push all of them
            to the left of $\frac{1}{2}$: moving one zero left automatically pushes its twin to the right, making
            that twin's wave taller than $x^{\frac{1}{2}} = \sqrt{x}$. Putting every non-trivial zero right on the
            mirror line $\operatorname{Re}(s) = \frac{1}{2}$ is the sharpest possible outcome — it keeps every wave
            as small as $\sqrt{x}$.`}
        />
        <details class="aside-details">
          <summary>
            <span>Riemann's 1859 wave formula and Schoenfeld's explicit prime bound</span>
          </summary>
          <div class="aside-body">
            <p
              innerHTML={prose`Riemann wrote $f(x) = F(x) + \frac{1}{2} F\!\left(x^{\frac{1}{2}}\right) + \frac{1}{3} F\!\left(x^{\frac{1}{3}}\right) + \cdots$
                for a weighted count of primes and prime powers below $x$ (where $F(x)$ counts primes). Inverting
                $\frac{\log\zeta(s)}{s}$ gave his explicit formula (1859, translated pp. 8–9), whose derivative turns
                the density of primes into a smooth curve minus a sum of cosine waves over the zeros $\frac{1}{2} \pm i\alpha$:`}
            />
            <p
              class="equation"
              innerHTML={tex`\frac{1}{\log x} - 2\sum_{\alpha} \frac{\cos(\alpha\log x)\,x^{-\frac{1}{2}}}{\log x}`}
            />
            <p
              innerHTML={prose`He noted that the smooth curve $\operatorname{Li}(x)$ agrees with the prime count “up to
                quantities of the order $x^{\frac{1}{2}}$”, while the periodic terms explain “the increase and decrease
                in the density of the primes from place to place”.`}
            />
            <p
              innerHTML={prose`In modern form, mathematicians often use Chebyshev's weighted prime count $\psi(x)$. For any whole number $n$, $\psi(n) = \log(\operatorname{lcm}(1, 2, \dots, n))$, the natural log of the least common multiple of 1 through $n$. Every time $n$ hits a prime $p$ (or a prime power $p^k$), that least common multiple multiplies by $p$, so its log jumps up by $\log p$. Giving each prime weight $\log p$ cancels how primes thin out like $\frac{1}{\log x}$, making $\psi(x)$ climb right along the straight line $y = x$.`}
            />
            <p
              innerHTML={prose`In 1976, Lowell Schoenfeld proved that the Riemann hypothesis is equivalent to an explicit bound — meaning real numbers you can plug straight into, not just “eventually small” with an unknown constant:`}
            />
            <p
              class="equation"
              innerHTML={tex`\left|\psi(x) - x\right| < \frac{\sqrt{x}\log^2 x}{8\pi} \quad (x \ge 73.2).`}
            />
            <p
              innerHTML={prose`To get a feel for the scale, at $x = 1{,}000{,}000$ the right side is about $7{,}594$ (rounded) — less than $0.8\%$ of $x$. Andrew Sutherland has already machine-checked both Schoenfeld's equivalence and the bound itself end-to-end in Lean directly from the shorter proof.`}
            />
          </div>
        </details>
        <p class="sources">
          Sources:{" "}
          <a href={RIEMANN_1859}>
            Riemann, On the Number of Prime Numbers less than a Given Quantity (1859, Wilkins
            translation)
          </a>
          , pages 4 to 9 (PDF pages 5 to 10);{" "}
          <a href={SHORTGRH_URL}>Sutherland, shortgrh verification report</a> and{" "}
          <a href={SCHOENFELD_URL}>schoenfeld-rh-lean</a> (for Schoenfeld's 1976 explicit bound).
        </p>
      </section>

      <section id="timeline">
        <h2>The dates in one list</h2>
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
          Source: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6. For 1737 and 1744: <a href={VIADER}>Viader, Bibiloni and Paradís</a>.
        </p>
      </section>
    </main>
  );
}
