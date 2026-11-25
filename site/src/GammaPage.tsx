import { ContextTrail } from "./ContextTrail";
import { GammaChart } from "./GammaChart";
import { href } from "./pages";

// Source of the content: docs/notes/background-gamma.md.
const EULER_E19 = "https://scholarlycommons.pacific.edu/euler-works/19/";
const DAVIS_1959 = "https://people.math.osu.edu/gautam.42/S20/DavisGammaFunction.pdf";
const GRONAU_2003 = "https://doi.org/10.5485/TMCS.2003.0008";
const WALLIS_TABLE = "https://www.quadrivium.info/GGB/WallisTable.html";
const EULER_E421 = "https://scholarlycommons.pacific.edu/euler-works/421/";
const LEGENDRE_1810 = "https://www.digitale-sammlungen.de/en/view/bsb10500481?page=599";
const LEGENDRE = "https://archive.org/details/10053610bsb";
const MATHLIB =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions";
const MATHLIB_RH =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean";
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
      <ContextTrail route="gamma" />
      <h1>The Gamma function</h1>
      <p
        class="summary"
        innerHTML={prose`The symmetry of the zeta function uses a function with the name $\Gamma$ (gamma). It is 300 years old. It began with one question: what comes between the terms of the list 1, 2, 6, 24, 120?`}
      />

      <section>
        <h2>A list with gaps</h2>
        <p
          innerHTML={prose`Multiply the whole numbers from 1 up to $n$. For $n = 1, 2, 3, 4, 5$ the results are 1, 2, 6, 24 and 120. The result for $n$ has the name factorial of $n$. The list has a term for each whole number. Has it a term for $n = \frac{1}{2}$? The product "from 1 up to a half" has no meaning, so the question needs a new idea.`}
        />
        <p
          innerHTML={prose`Euler answered it in a paper that he wrote in 1729. His first sentence says where the question came from: he was "prompted by those results concerning series which the celebrated Goldbach has communicated to the Society", and he looked for "a general expression which would give all the terms" of the list. He found an endless product that gives the list at the whole numbers and also has a value between them.`}
        />
        <p
          innerHTML={prose`Then he calculated the term for $n = \frac{1}{2}$. He found that it "is equal to the square root of the circle whose diameter = 1". The circle here means its area, which is $\frac{\pi}{4}$. So the term is $\frac{\sqrt{\pi}}{2}$, about 0.8862. The number $\pi$ belongs to circles, and the list is about products of whole numbers. Nothing in the question suggested a circle.`}
        />
        <details class="aside-details">
          <summary>
            <span
              innerHTML={prose`How did Euler find the product, and where did $\pi$ come from?`}
            />
          </summary>
          <div class="aside-body">
            <p
              innerHTML={prose`In both his October 13, 1729 letter to Goldbach and E19 §1, Euler states the guiding idea without printing the scratchwork: continued far out, the factorial list behaves like a geometric progression. Write $f(x)$ for the term of index $x$, and $N! = 1 \cdot 2 \cdots N$ for the factorial of a whole number $N$. Here is how that idea leads to his formula:`}
            />
            <ol>
              <li
                innerHTML={prose`Far out at a huge whole number $N$, consecutive factorial ratios $N + 1$, $N + 2$, $N + 3$ are nearly equal. A geometric progression with fixed ratio $N + 1$ multiplies by $(N + 1)^n$ over a fractional step $n$, so $f(N + n) \approx N!\,(N + 1)^n$.`}
              />
              <li
                innerHTML={prose`On the other hand, applying the exact factorial rule $N$ times downward from $N + n$ to $n$ multiplies $f(n)$ by $(n + 1)(n + 2)\cdots(n + N)$, giving $f(N + n)$.`}
              />
              <li
                innerHTML={prose`Setting both expressions equal gives Euler's finite approximation from his Goldbach letter, and writing $(N + 1)^n = \prod_{k = 1}^{N} \left(\frac{k + 1}{k}\right)^n$ folds it into his endless product:`}
              />
            </ol>
            <div
              class="equation"
              innerHTML={tex`\begin{aligned} n! &= \lim_{N \to \infty} \frac{1 \cdot 2 \cdots N}{(1 + n)\cdots(N + n)}(N + 1)^n \\ &= \prod_{k = 1}^{\infty} \frac{k^{1 - n}(k + 1)^n}{k + n} \end{aligned}`}
            />
            <p
              innerHTML={prose`Daniel Bernoulli independently sent Goldbach a closely related product one week earlier, on October 6, 1729.`}
            />
            <p
              innerHTML={prose`Plugging $n = \frac{1}{2}$ into Euler's product yields the square root of $\frac{2 \cdot 4}{3 \cdot 3} \cdot \frac{4 \cdot 6}{5 \cdot 5} \cdot \frac{6 \cdot 8}{7 \cdot 7} \cdots$. Seventy-three years earlier, in 1656, John Wallis had shown — by interpolating a table of areas that forms Pascal's triangle — that this exact endless product equals $\frac{\pi}{4}$, the area of a circle of diameter 1.`}
            />
          </div>
        </details>
        <p class="sources">
          Sources:{" "}
          <a href={EULER_E19}>Euler, On transcendental progressions (E19, Euler Archive)</a>,
          translated by Langton, sections 1, 2 and 17 (and catalogue record for the year 1729);{" "}
          <a href={GRONAU_2003}>Gronau (2003)</a>, pages 45 to 47, for Daniel Bernoulli's October 6
          and Euler's October 13, 1729 letters; <a href={DAVIS_1959}>Davis (1959)</a>, pages 852 to
          853; and <a href={WALLIS_TABLE}>Addington and Dennis on Wallis's 1656 table</a> (with
          Stedall in Grattan-Guinness, ed., Elsevier 2005, pages 25 to 31). The three-step algebraic
          reconstruction and 0.8862 are our own.
        </p>
      </section>

      <section>
        <h2>Euler's formula</h2>
        <p
          innerHTML={prose`Later in the same paper Euler gave a second formula for the term of index $n$:`}
        />
        <div class="equation" innerHTML={tex`\int_0^1 (-\ln x)^n \, dx`} />
        <p
          innerHTML={prose`The sign $\int$ is an integral: the area under a curve, here between $x = 0$ and $x = 1$. The sign $\ln$ is the natural logarithm. You do not need to compute integrals to read the rest of this page. The important point is that $n$ is now a power, and a power does not have to be a whole number. Euler checked the formula for $n = 3$ and got 6. He wrote that the formula is useful for the terms between the whole numbers.`}
        />
        <details class="aside-details">
          <summary>
            <span>How did Euler turn the product into this integral?</span>
          </summary>
          <div class="aside-body">
            <p
              innerHTML={prose`Seeing a circle area in the $n = \frac{1}{2}$ term convinced Euler that no algebraic or exponential formula could express $n!$, so he looked for an integral whose value gives a fraction of factorials (E19 §§3–14):`}
            />
            <ol>
              <li>
                <p
                  innerHTML={prose`Expanding $(1 - x)^n$ for a whole number $n$ and integrating term by term over $[0, 1]$ gave, for any positive exponent $e$:`}
                />
                <div
                  class="equation"
                  innerHTML={tex`\begin{aligned} &\int_0^1 x^e(1 - x)^n\,dx \\ &= \frac{1 \cdot 2 \cdots n}{(e + 1)(e + 2)\cdots(e + n + 1)} \end{aligned}`}
                />
              </li>
              <li
                innerHTML={prose`Writing $e = \frac{f}{g}$ (for positive numbers $f$ and $g$) and scaling out $g$ turned the denominator into $(f + g)(f + 2g)\cdots(f + ng)$. Setting $f = 1$ and letting $g \to 0$ collapses that whole denominator to 1, leaving pure $1 \cdot 2 \cdots n$.`}
              />
              <li
                innerHTML={prose`Under the substitution $x \mapsto x^{\frac{g}{f + g}}$, the integrand contains $\frac{1 - x^z}{z}$ with $z = \frac{g}{f + g} \to 0$, whose limit is $-\ln x$. That yields $\int_0^1 (-\ln x)^n\,dx$.`}
              />
            </ol>
            <p
              innerHTML={prose`To test $n = 3$, Euler wrote down the antiderivative $-x(\ln x)^3 + 3x(\ln x)^2 - 6x\ln x + 6x$. Every term vanishes as $x \to 0^+$, and at $x = 1$ (where $\ln 1 = 0$) only 6 remains.`}
            />
          </div>
        </details>
        <p class="sources">
          Source: <a href={EULER_E19}>Euler, On transcendental progressions (E19, Euler Archive)</a>
          , sections 3 to 15 (Euler writes lx for the logarithm).{" "}
          <span
            innerHTML={prose`Our own Lean check (lean/RiemannChecks/EulerGamma.lean) verifies the $n = 3$ derivative and $x \to 0^+$ limit.`}
          />
        </p>
      </section>

      <section>
        <h2>The name, and a shift by 1</h2>
        <p
          innerHTML={prose`Euler did not use the letter $\Gamma$. Legendre did. In a memoir read to the Institut de France in November 1809 and printed in August 1810, he wrote of the integral $\int_0^1 \bigl(\ln\frac{1}{x}\bigr)^{a - 1}\,dx$: "nous la désignerons par $\Gamma(a)$" — we will denote it by $\Gamma(a)$. In his book of 1811 he gave the name "Eulerian integrals" to two integrals that Euler had studied, and repeated the notation: "nous la représenterons plus généralement par $\Gamma(a)$".`}
        />
        <p
          innerHTML={prose`That shifted form matches Euler's 1729 integral with the power $a - 1$ in place of $n$, so $\Gamma(a)$ is the term of index $a - 1$ in Euler's list. (Euler himself had already introduced that parameter shift in his 1768 calculus textbook; Legendre gave it the symbol $\Gamma$ and made the convention standard.) That is the reason for a shift that surprises every reader: $\Gamma(5)$ is not 120. It is 24, the product of the whole numbers below 5.`}
        />
        <div class="equation" innerHTML={tex`\Gamma(n + 1) = 1 \cdot 2 \cdot 3 \cdots n`} />
        <p class="sources">
          Sources:{" "}
          <a href={LEGENDRE_1810}>Legendre, Recherches sur diverses sortes d'intégrales définies</a>
          , Mémoires de l'Institut (Année 1809, printed August 1810), page 477, section 53;{" "}
          <a href={LEGENDRE}>Legendre, Exercices de calcul intégral</a>, Paris, 1811, page 221; and{" "}
          <a href={GRONAU_2003}>Gronau (2003)</a>, pages 51 to 52, for Euler's 1768 shift. Both
          Legendre quotations were read on the page scans.
        </p>
      </section>

      <section>
        <h2>The rules of today</h2>
        <p
          innerHTML={prose`The proof of the Riemann hypothesis does not define $\Gamma$, $\zeta$, or the statement of the hypothesis itself: all three come directly from Mathlib, Lean's community mathematics library. For complex numbers with $\operatorname{Re}(s) > 0$, Mathlib defines $\Gamma(s)$ by the exponential integral`}
        />
        <div class="equation" innerHTML={tex`\Gamma(s) = \int_0^\infty e^{-t} t^{s - 1}\,dt`} />
        <p
          innerHTML={prose`Mathlib calls this "Euler's integral", but it is the exact same shifted function as Legendre's $\Gamma(s)$: substituting $x = e^{-t}$ turns $\int_0^1 (-\ln x)^{s - 1}\,dx$ identically into $\int_0^\infty e^{-t} t^{s - 1}\,dt$. Mathlib then extends $\Gamma(s)$ to the rest of the complex plane and proves these rules:`}
        />
        <ul>
          <li innerHTML={prose`$\Gamma(1) = 1$.`} />
          <li
            innerHTML={prose`$\Gamma(s + 1) = s \cdot \Gamma(s)$, where both values exist. One step to the right multiplies the value by $s$.`}
          />
          <li
            innerHTML={prose`$\Gamma(n + 1)$ is the factorial of $n$, for each whole number $n$ from 1. This follows from the two rules above.`}
          />
          <li innerHTML={prose`$\Gamma\!\left(\frac{1}{2}\right) = \sqrt{\pi}$.`} />
        </ul>
        <p
          innerHTML={prose`Our own check against Euler: by the second rule, $\Gamma\!\left(\frac{3}{2}\right)$ is $\frac{1}{2}$ times $\Gamma\!\left(\frac{1}{2}\right)$, which is $\frac{\sqrt{\pi}}{2}$. And $\Gamma\!\left(\frac{3}{2}\right)$ is the term of index $\frac{1}{2}$ in Euler's list. Euler found the same value in 1729.`}
        />
        <p class="sources">
          Sources: <a href={MATHLIB_BASIC}>Mathlib, the file on the Gamma function</a>, the header
          and the theorems Gamma_one, Gamma_add_one and Gamma_nat_eq_factorial;{" "}
          <a href={MATHLIB_RH}>Mathlib, RiemannZeta.lean</a>, for the definitions of{" "}
          <span innerHTML={prose`$\zeta$`} /> and RiemannHypothesis;{" "}
          <a href={MATHLIB_HALF}>Mathlib, theorem Gamma_one_half_eq</a>. We read the statements, not
          the internal Mathlib proofs.{" "}
          <span
            innerHTML={prose`Our own Lean proof (lean/RiemannChecks/EulerGamma.lean) checks against Mathlib at this commit that substituting $x = e^{-t}$ turns $\int_0^1 (-\ln x)^{s - 1}\,dx$ into Mathlib's $\Gamma(s)$ for $\operatorname{Re}(s) > 0$.`}
          />
        </p>
      </section>

      <section>
        <h2>The picture</h2>
        <p
          innerHTML={prose`The chart shows $\Gamma(x)$ for a real number $x$. Move the slider, or press on the chart. The table shows the second rule at work: $x$ times $\Gamma(x)$ is the same as $\Gamma(x + 1)$, wherever $\Gamma(x)$ has a value.`}
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
        <h2 innerHTML={prose`Where $\Gamma$ has no value`} />
        <p
          innerHTML={prose`$\Gamma$ has no value at 0, $-1$, $-2$ and so on. Mathlib says so in words: at these points "the function is undefined, and we set it to be 0 by convention". The 0 is a filler that the library needs, because each of its functions must give some answer. It is not a value of the function.`}
        />
        <p
          innerHTML={prose`Mathlib also proves what happens near 0: when $s$ comes close to 0, the product $s \cdot \Gamma(s)$ comes close to 1. So $\Gamma(s)$ is close to $\frac{1}{s}$ there. One divided by a very small number is very large, so the values grow without limit, and no number can be the value at 0. Try 0.05 and $-0.05$ on the chart: the values are near 20 and near $-20$.`}
        />
        <p
          innerHTML={prose`For $-1$, $-2$ and the others we read only the statement that they have no value. The chart shows the same behaviour there. Our own remark on the reason: the rule gives $\Gamma(s) = \frac{\Gamma(s + 1)}{s}$, so a problem at 0 moves one step to the left each time.`}
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
          <span
            innerHTML={prose`The symmetry of the zeta function links the value at $s$ with the value at $1 - s$. The factor of that link contains $\Gamma(s)$. So the rule of the symmetry has no meaning where $\Gamma$ has no value: at 0, $-1$, $-2$ and so on. The page `}
          />
          <a href={href("zeta")}>Where the zeta function came from</a> gives the rule and its
          exceptions.
        </p>
        <p
          innerHTML={prose`$\Gamma$ has a rule of the same kind for itself. Mathlib calls it Euler's reflection formula:`}
        />
        <div class="equation" innerHTML={tex`\Gamma(s)\,\Gamma(1 - s) = \frac{\pi}{\sin(\pi s)}`} />
        <p
          innerHTML={prose`Here $\sin$ is the sine, a function from the study of angles. Euler stated and derived this identity in his 1772 paper E421 (section 43), writing $[\lambda]\,[-\lambda] = \frac{\lambda\pi}{\sin(\lambda\pi)}$ in his bracket notation $[\lambda] = \Gamma(\lambda + 1)$. This page does not need it further.`}
        />
        <p class="sources">
          Sources: <a href={MATHLIB_REFLECTION}>Mathlib, theorem Gamma_mul_Gamma_one_sub</a>;{" "}
          <a href={EULER_E421}>Euler, E421 (Euler Archive)</a>, Novi Commentarii academiae
          scientiarum Petropolitanae 16 (1772), pages 120 to 121, section 43 (read on the Latin
          scan).
        </p>
      </section>
    </main>
  );
}
