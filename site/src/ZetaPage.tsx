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

      <section>
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
        <p class="sources">
          Source: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6.
        </p>
      </section>

      <section>
        <h2>One sum for each power</h2>
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
            7 and so on, he tried through his whole life to find a formula, and did not find one.`}
        />
        <p
          innerHTML={prose`Euler did not use the letter $\zeta$. The name and the letter come from Riemann, more
            than a hundred years later.`}
        />
        <p class="sources">
          Source: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6 and its footnote 46.
        </p>
      </section>

      <section>
        <h2>Why an endless sum can have a value</h2>
        <p
          innerHTML={prose`A sum with endlessly many terms does not always grow without limit. Walk to a wall that
            is 2 metres away, and let each step cover half of the distance that is left: 1 metre,
            then $\frac{1}{2}$, then $\frac{1}{4}$. You take endlessly many steps and never pass the wall.`}
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
        <p class="sources">
          Sources:{" "}
          <a href={VIADER}>Viader, Bibiloni and Paradís, On a series of Goldbach and Euler</a>,
          sections 1 and 7, for the 1737 paper, its steps and Mertens.{" "}
          <a href={PAPADOPOULOS}>Papadopoulos</a>, section 6, for Euclid and the words of Euler.{" "}
          <a href={CONRAD}>Conrad, The infinitude of the primes</a>, section 3, for the primes
          against the squares. The first source shows the steps for the sum{" "}
          <span innerHTML={prose`$1 + \frac{1}{2} + \frac{1}{3} + \cdots$;`} /> the squares here
          follow the same lines.
        </p>
      </section>

      <section>
        <h2>The picture: the sum and the product</h2>
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
          The numbers in the chart are computed on this page. The formula is the one of the section
          above.
        </p>
      </section>

      <section>
        <h2>A hundred years later: Riemann</h2>
        <p
          innerHTML={prose`In 1749, Euler found one more thing: a symmetry that links the value at $s$ to the value
            at $1 - s$. He proved it for whole numbers and conjectured it for the rest.`}
        />
        <p
          innerHTML={prose`The partner of a number $s$ is $1 - s$. The partner of 2 is $1 - 2 = -1$, and the
            partner of 3 is $1 - 3 = -2$. The two numbers of a pair are at the same distance from $\frac{1}{2}$,
            on opposite sides. So they are mirror images, with the mirror at $\frac{1}{2}$.`}
        />
        <p
          innerHTML={prose`The symmetry does not say that the two values of a pair are equal. It says that they are
            linked: the value at $1 - s$ is the value at $s$ times a known factor, and the factor
            depends on $s$. This rule works for every $s$ except 1, 0, $-1$, $-2$ and so on. So it
            gives the value at $-1$ from the value at 2, but not the other way. Take the pair 2 and $-1$. The value at 2 is $\frac{\pi^2}{6}$, about 1.645. The
            factor for $s = 2$ is $-\frac{1}{2\pi^2}$. The product is $-\frac{1}{12}$, and that is the value at
            $-1$. One form of the function does have equal values: Riemann multiplied the function
            by a certain factor, and the result has the same value at $s$ and at $1 - s$.`}
        />
        <p
          innerHTML={prose`The exceptions do not mean that the symmetry is false at those points. They are points
            where a piece of the rule has no value. The factor contains a function called $\Gamma$,
            and $\Gamma$ has no value at 0, $-1$, $-2$ and so on. At 1 the function itself has no
            finite value: it grows without limit near 1. Riemann's form with equal values has only
            two such points, 0 and 1, and they are partners of each other. Euler met a related
            thing, with a different cause. For $n = 1$ two parts of his rule are both 0, so the
            rule gave 0 divided by 0. He took a limit, and the limit agreed with the known value.`}
        />
        <p
          innerHTML={prose`The function $\Gamma$ (gamma) is not new, and it was not made for this proof. It extends
            the factorial $1 \cdot 2 \cdot 3 \cdots n$ to numbers that are not whole. Euler introduced
            it in a paper that he wrote in 1729, with a different notation. For a whole number
            $n$ above 1, $\Gamma(n)$ is the product of the whole numbers below $n$: $\Gamma(5)$
            is $1 \cdot 2 \cdot 3 \cdot 4 = 24$. The function has no value at 0, $-1$, $-2$
            and so on.`}
        />
        <p>
          The page <a href={href("gamma")}>The Gamma function</a> has its history, its rules, a
          chart, and the reason why it has no value at these points.
        </p>
        <p
          innerHTML={prose`The value at $-1$ is strange, because at $-1$ the sum would be $1 + 2 + 3 + \cdots$, and
            that sum has no value. The number $-\frac{1}{12}$ belongs to the function that has a meaning
            on the whole plane, not to the sum. Euler worked with sums of
            alternating signs, such as $1 - 2 + 3 - 4 + \cdots$, and used a special way of summing
            to give them a meaning. In 1859, Riemann proved the symmetry for complex numbers $s$ as well.`}
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
        <p
          innerHTML={prose`For a complex number $s = a + bi$, the step from $s$ to $1 - s$ gives $(1 - a) - bi$. That
            is a half turn around the point $\frac{1}{2}$, not a flip across a line. The function has a
            second symmetry: the value at $a - bi$ is the value at $a + bi$ with the sign of its
            $i$ part changed. The two symmetries together tie the value at $a + bi$ to the value at
            $(1 - a) + bi$. These two points have the same height $b$, and they are mirror images
            across the line where the real part is $\frac{1}{2}$. The factor between
            the function and its symmetric form is never 0 in the strip where the real part is
            between 0 and 1. So in that strip the zeros come in mirrored pairs: if $a + bi$
            is a zero, then $(1 - a) + bi$ is a zero too. The Riemann hypothesis says that every
            zero of the function lies on the line itself, apart from the known zeros at $-2$,
            $-4$, $-6$ and so on. Then each zero in the strip is its own mirror image.`}
        />
        <p>
          After Euler, nobody did substantial work on the function for more than a century. The
          mathematician Weil, in his history of number theory, wrote that the subject was dead, and
          that Riemann brought it back to life.
        </p>
        <p>
          In 1859, Riemann was elected to the Berlin Academy. Each new member had to report on
          recent research. His report is 8 pages long, and its title is “On the number of primes
          less than a given magnitude”. It starts from Euler's formula: the sum on one side, the
          product over the primes on the other.
        </p>
        <p>Riemann changed three things.</p>
        <ul>
          <li
            innerHTML={prose`He let $s$ be a complex number, and gave the function the name $\zeta(s)$.`}
          />
          <li
            innerHTML={prose`He showed that the function has a meaning on the whole plane, except at the point 1.
              The sum alone works only where the real part of $s$ is above 1.`}
          />
          <li>
            He found that the zeros of the function, the points where its value is 0, are tied to
            how the primes are spread.
          </li>
        </ul>
        <p>Then he conjectured where those zeros are. That conjecture is the Riemann hypothesis.</p>
        <p class="sources">
          Sources: <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>,
          section 6. <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>, for where the
          sum works and for the symmetry that Riemann proved.{" "}
          <a href={EULER_E352}>
            Euler, Remarks on a beautiful relation between direct as well as reciprocal power series
            (E352, Euler Archive)
          </a>
          , translated by Willis and Osler, sections 1 to 15, for how Euler found the symmetry.{" "}
          <a href={MATHLIB_CONJ}>Mathlib, theorem riemannZeta_conj</a>, for the second symmetry.{" "}
          <a href={MATHLIB_PIN}>Mathlib at the commit the proof builds against</a>: four statements
          for the mirrored pairs of zeros, and the theorem riemannZeta_one_sub for the factor that
          links the two values of a pair. The steps are in the project note.{" "}
          <a href={MATHLIB_VALUES}>Mathlib, values of the function</a>, for the values at 2 and at{" "}
          <span innerHTML={prose`$-1$; the value at $-1$ also uses `} />
          <a href={MATHLIB_BERNOULLI}>the theorem bernoulli_two</a>.{" "}
          <a href={MATHLIB_GAMMA}>Mathlib, the header of the file on the Gamma function</a>, for
          what <span innerHTML={prose`$\Gamma$`} /> is and for the points where it has no value.{" "}
          <a href={EULER_E19}>Euler Archive, record of paper E19</a>, for the year 1729. Elkies also
          gives the two special points of Riemann's form, and section 11 of Euler's paper gives the{" "}
          <span innerHTML={prose`case $n = 1$.`} />
        </p>
      </section>

      <section>
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
