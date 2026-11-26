import { GammaChart } from "./GammaChart";
import { backgroundKicker, href } from "./pages";

// Source of the content: docs/notes/background-gamma.md.
const EULER_E19 = "https://scholarlycommons.pacific.edu/euler-works/19/";
const DAVIS_1959 = "https://people.math.osu.edu/gautam.42/S20/DavisGammaFunction.pdf";
const GRONAU_2003 = "https://doi.org/10.5485/TMCS.2003.0008";
const WALLIS_TABLE = "https://www.quadrivium.info/GGB/WallisTable.html";
const EULER_E352 = "https://scholarlycommons.pacific.edu/euler-works/352/";
const EULER_E421 = "https://scholarlycommons.pacific.edu/euler-works/421/";
const LEGENDRE_1810 = "https://www.digitale-sammlungen.de/en/view/bsb10500481?page=599";
const LEGENDRE = "https://archive.org/details/10053610bsb";
const RIEMANN_1859 = "https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Zeta/EZeta.pdf";
const MATHLIB_ROOT =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib";
const MATHLIB = `${MATHLIB_ROOT}/Analysis/SpecialFunctions`;
const MATHLIB_RH = `${MATHLIB_ROOT}/NumberTheory/LSeries/RiemannZeta.lean`;
const MATHLIB_ZETA_ONE_SUB = `${MATHLIB_RH}#L178-L180`;
const MATHLIB_HURWITZ_EVEN = `${MATHLIB_ROOT}/NumberTheory/LSeries/HurwitzZetaEven.lean#L760-L770`;
const MATHLIB_THETA = `${MATHLIB_ROOT}/NumberTheory/ModularForms/JacobiTheta/TwoVariable.lean#L465-L490`;
const MATHLIB_BASIC = `${MATHLIB}/Gamma/Basic.lean#L11-L21`;
const MATHLIB_HALF = `${MATHLIB}/Gaussian/GaussianIntegral.lean#L306-L307`;
const MATHLIB_ZERO = `${MATHLIB}/Gamma/Deriv.lean#L94-L95`;
const MATHLIB_DIFF = `${MATHLIB}/Gamma/Deriv.lean#L65`;
const MATHLIB_NE_ZERO = `${MATHLIB}/Gamma/Beta.lean#L427`;
const MATHLIB_REFLECTION = `${MATHLIB}/Gamma/Beta.lean#L374-L424`;
const MATHLIB_DOUBLING = `${MATHLIB}/Gamma/Beta.lean#L559-L590`;
const MATHLIB_DELIGNE = `${MATHLIB}/Gamma/Deligne.lean#L122-L181`;
const MATHLIB_SINE_PROD = `${MATHLIB}/Trigonometric/EulerSineProd.lean#L271-L293`;
const MATHLIB_UNIQUE = `${MATHLIB}/Gamma/BohrMollerup.lean#L305-L309`;

export function GammaPage() {
  return (
    <main class="article">
      <p class="kicker">{backgroundKicker("gamma")}</p>
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
          innerHTML={prose`Finding a circle area inside the $n = \frac{1}{2}$ term was a clue: it told Euler that
            no ordinary algebraic or exponential formula could capture $n!$ between whole numbers,
            so he went looking for an area — an integral — instead. Later in the same 1729 paper,
            he turned his product into this second formula for the term of index $n$:`}
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
                innerHTML={prose`Writing $e = \frac{f}{g}$ (for positive numbers $f$ and $g$), scaling out $g$, and moving the last factor $f + (n + 1)g$ to the integral side leaves the denominator $(f + g)(f + 2g)\cdots(f + ng)$. Setting $f = 1$ and letting $g \to 0$ collapses that denominator to 1, leaving pure $1 \cdot 2 \cdots n$.`}
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
          innerHTML={prose`The proof of the Riemann hypothesis does not define $\Gamma$, $\zeta$, or the statement of the hypothesis itself: all three come directly from Mathlib, Lean's community mathematics library. Where the real part of $s$ is above 0 (written $\operatorname{Re}(s) > 0$), the exponential integral converges, and Mathlib defines $\Gamma(s)$ by`}
        />
        <div class="equation" innerHTML={tex`\Gamma(s) = \int_0^\infty e^{-t} t^{s - 1}\,dt`} />
        <p
          innerHTML={prose`Mathlib calls this "Euler's integral", and it is the exact same shifted function as
            Legendre's $\Gamma(s)$: substituting $x = e^{-t}$ unfolds $(0, 1)$ into $(0, \infty)$
            and turns $\int_0^1 (-\ln x)^{s - 1}\,dx$ identically into
            $\int_0^\infty e^{-t} t^{s - 1}\,dt$. Writing it with an exponential $e^{-t}$ is also
            what will let $\Gamma$ connect to the zeta function below. For points at and to the
            left of 0 ($\operatorname{Re}(s) \le 0$), the integral no longer converges, so Mathlib
            uses the recurrence rule $\Gamma(s + 1) = s \cdot \Gamma(s)$ in reverse, stepping
            backwards by 1. Together, Mathlib proves these rules:`}
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
          innerHTML={prose`Near 0, Mathlib proves that $s \cdot \Gamma(s)$ comes close to 1, so $\Gamma(s)$ behaves like $\frac{1}{s}$ there: it shoots up to $+\infty$ on the right and plunges to $-\infty$ on the left (try 0.05 and $-0.05$ on the chart: about 19.47 and $-20.63$). No finite number can fit at 0.`}
        />
        <p
          innerHTML={prose`At every other point — including negative fractions such as $-\frac{1}{2}$ — $\Gamma$ has a finite value, and that value is never 0.`}
        />
        <details class="aside-details">
          <summary>
            <span
              innerHTML={prose`Why do 0, $-1$, $-2$, $\dots$ fail while negative fractions work?`}
            />
          </summary>
          <div class="aside-body">
            <p
              innerHTML={prose`Everything follows from stepping backwards with the rule $\Gamma(s + 1) = s \cdot \Gamma(s)$, rearranged as $\Gamma(s) = \frac{\Gamma(s + 1)}{s}$:`}
            />
            <ol>
              <li>
                <strong>Why 0 fails:</strong>{" "}
                <span
                  innerHTML={prose`putting $s = 0$ into $\Gamma(s + 1) = s \cdot \Gamma(s)$ would require $\Gamma(1) = 0 \cdot \Gamma(0)$, that is, $1 = 0 \cdot \Gamma(0)$ — impossible for any finite number.`}
                />
              </li>
              <li>
                <strong innerHTML={prose`The domino chain at $-1$, $-2$, $-3$, $\dots$:`} />{" "}
                <span
                  innerHTML={prose`for $s$ near $-1$, the shifted point $s + 1$ is near 0, so $\Gamma(s) = \frac{\Gamma(s + 1)}{s}$ copies the blow-up near 0 to $-1$ and divides by $s \approx -1$ (flipping the sign, which is why the curve switches sides on the chart). Likewise, for $s$ near $-2$, $s + 1$ is near $-1$, so dividing by $s \approx -2$ passes the blow-up to $-2$ and flips the sign again — and so on for every negative whole number.`}
                />
              </li>
              <li>
                <p>
                  <strong>Why negative fractions are fine:</strong>{" "}
                  <span
                    innerHTML={prose`stepping backwards to $s = -\frac{1}{2}$ uses $\Gamma\!\left(\frac{1}{2}\right) = \sqrt{\pi}$ cleanly with no division by 0:`}
                  />
                </p>
                <div
                  class="equation"
                  innerHTML={tex`\Gamma\!\left(-\frac{1}{2}\right) = \frac{\Gamma\!\left(\dfrac{1}{2}\right)}{-\dfrac{1}{2}} = -2\sqrt{\pi} \approx -3.54`}
                />
                <p
                  innerHTML={prose`Starting from any point with $\operatorname{Re}(s) \le 0$ other than 0, $-1$, $-2$, $\dots$, stepping right by 1 eventually lands safely in the region $\operatorname{Re}(s) > 0$ where the integral converges. Only 0, $-1$, $-2$, $\dots$ collide with 0 along the way.`}
                />
              </li>
            </ol>
          </div>
        </details>
        <p class="sources">
          Sources: <a href={MATHLIB_BASIC}>Mathlib, the header of the file on the Gamma function</a>
          ; <a href={MATHLIB_ZERO}>Mathlib, theorem tendsto_self_mul_Gamma_nhds_zero</a>, for the
          behaviour near 0; <a href={MATHLIB_NE_ZERO}>Mathlib, theorem Gamma_ne_zero</a>;{" "}
          <a href={MATHLIB_DIFF}>Mathlib, theorem differentiableAt_Gamma</a>, for the other points.
          For <span innerHTML={prose`$-1$, $-2$, $\dots$`} /> we read only the Mathlib statement
          that they have no value; the domino-step explanation and the{" "}
          <span innerHTML={prose`$\Gamma\!\left(-\frac{1}{2}\right)$`} /> check are our own algebra
          from the recurrence rule.
        </p>
      </section>

      <section>
        <h2>Is it the only answer?</h2>
        <p
          innerHTML={prose`We filled the gaps of 1, 2, 6, 24, 120 using one integral formula — so a natural
            question is whether someone else could draw a different smooth curve through those same
            points that still obeys $f(x + 1) = x \cdot f(x)$. The answer is yes: the recurrence
            alone does not pin down what happens between whole numbers. Mathlib proves a theorem of
            Bohr and Mollerup that adds the one missing smoothness condition. Take a function $f$ on
            the numbers above 0, with values above 0. Suppose that $f(1) = 1$, that
            $f(x + 1) = x \cdot f(x)$, and that the logarithm of $f$ is convex: its curve never
            bends downward. Then $f$ must be $\Gamma$. (Mathlib uses this exact uniqueness theorem
            below to prove the doubling rule that simplifies $\zeta$'s symmetry.)`}
        />
        <p class="sources">
          Source: <a href={MATHLIB_UNIQUE}>Mathlib, theorem eq_Gamma_of_log_convex</a>. The opening
          remark on other curves is our own; we did not look up an explicit example.
        </p>
      </section>

      <section>
        <h2>Where the zeta function uses it</h2>
        <p
          innerHTML={prose`Why does a function invented in 1729 to fill gaps between factorials show up 130 years
            later inside the symmetry of the zeta function? Because Euler's integral
            $\Gamma(s) = \int_0^\infty e^{-t} t^{s - 1}\,dt$ turns a power $\frac{1}{n^s}$ into an
            exponential $e^{-nx}$ — and sums of exponentials have simple closed forms and exact
            symmetries.`}
        />
        <p
          innerHTML={prose`In his 1859 paper, Riemann did not pull the completed zeta function out of thin air. He
            started with ordinary $\Gamma(s)$ (written $\Pi(s - 1)$ in his paper): substituting
            $t = nx$ gives $\frac{\Gamma(s)}{n^s} = \int_0^\infty e^{-nx} x^{s - 1}\,dx$, so summing
            over $n = 1, 2, 3, \dots$ collapses $\zeta(s)$ into an ordinary geometric series inside
            the integral:`}
        />
        <div
          class="equation"
          innerHTML={tex`\Gamma(s)\,\zeta(s) = \int_0^\infty \frac{x^{s - 1}}{e^x - 1}\,dx`}
        />
        <p
          innerHTML={prose`By turning that integral into a loop around $(0, \infty)$ and collecting the poles of
            $\frac{1}{e^x - 1}$ at $x = \pm 2\pi i n$, Riemann proved that $\zeta(s)$ extends to the
            whole complex plane except $s = 1$, and discovered something surprising: the truly
            symmetric combination is not $\Gamma(s)\zeta(s)$, but
            $\Lambda(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)\,\zeta(s)$, which
            stays unchanged when $s$ is replaced by $1 - s$.`}
        />
        <p
          innerHTML={prose`That clue — in his own words, “This property of the function induced me to introduce, in
            place of $\Pi(s - 1)$, the integral $\Pi\!\left(\frac{s}{2} - 1\right)$ into the general
            term of the series $\sum \frac{1}{n^s}$” — led him directly to his shorter second proof,
            where substituting $x = \pi n^2 t$ turns $\zeta(s)$ into Jacobi's theta sum
            $\sum_{n = 1}^{\infty} e^{-\pi n^2 t}$ and makes $\Lambda(1 - s) = \Lambda(s)$
            immediate.`}
        />
        <p
          innerHTML={prose`Once $\Lambda(1 - s) = \Lambda(s)$ is established, solving for $\zeta(1 - s)$ leaves a
            ratio of two half-argument Gamma factors. Simplifying that ratio back into a single
            $\Gamma(s)$ needs $\Gamma$'s own $s \leftrightarrow 1 - s$ mirror law — Euler's
            reflection formula:`}
        />
        <div class="equation" innerHTML={tex`\Gamma(s)\,\Gamma(1 - s) = \frac{\pi}{\sin(\pi s)}`} />
        <p
          innerHTML={prose`Here $\sin$ is the sine from trigonometry. Setting $s = \frac{1}{2}$ gives
            $\Gamma\!\left(\frac{1}{2}\right)^2 = \pi$, so $\Gamma\!\left(\frac{1}{2}\right) = \sqrt{\pi}$.
            Euler already used this identity in his 1749 zeta paper E352 (section 13, published
            1768) and gave its dedicated infinite-product derivation in E421 (1772, section 43),
            writing $[\lambda]\,[-\lambda] = \frac{\lambda\pi}{\sin(\lambda\pi)}$ in his shifted
            notation $[\lambda] = \Gamma(\lambda + 1)$.`}
        />
        <p
          innerHTML={prose`Combining Euler's reflection formula with Legendre's doubling formula collapses the ratio
            from $\Lambda(1 - s) = \Lambda(s)$ into the explicit conversion factor linking
            $\zeta(s)$ and $\zeta(1 - s)$:`}
        />
        <div
          class="equation"
          innerHTML={tex`\zeta(1 - s) = 2\,(2\pi)^{-s}\,\Gamma(s)\,\cos\!\left(\frac{\pi s}{2}\right)\,\zeta(s)`}
        />
        <p>
          <span
            innerHTML={prose`Because $\Gamma(s)$ sits in that factor, the rule has no meaning where $\Gamma$ has no
              value: at 0, $-1$, $-2$ and so on (and at 1, where $\zeta$ itself blows up). The page `}
          />
          <a href={href("zeta")}>Where the zeta function came from</a> gives the numerical examples
          and exceptions.
        </p>
        <details class="aside-details">
          <summary>
            <span
              innerHTML={prose`How $\Gamma$ produces the zeta conversion factor (step by step)`}
            />
          </summary>
          <div class="aside-body">
            <p
              innerHTML={prose`Mathlib formalizes Riemann's shorter second proof directly — starting with the
                $\Gamma\!\left(\frac{s}{2}\right)$ substitution that his first proof revealed — and
                then applies Legendre doubling and Euler reflection to read off
                $2\,(2\pi)^{-s}\,\Gamma(s)\,\cos\!\left(\frac{\pi s}{2}\right)$:`}
            />
            <ol>
              <li>
                <p>
                  <strong
                    innerHTML={prose`Why $\Gamma\!\left(\frac{s}{2}\right)$ and $x = \pi n^2 t$:`}
                  />{" "}
                  <span
                    innerHTML={prose`Riemann's first proof via $\Gamma(s)\zeta(s) = \int_0^\infty \frac{x^{s - 1}}{e^x - 1}\,dx$
                      showed that $\Gamma_{\mathbb{R}}(s)\,\zeta(s)$ is symmetric, where
                      $\Gamma_{\mathbb{R}}(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)$.
                      To build that multiplier directly from Euler's integral
                      $\Gamma\!\left(\frac{s}{2}\right) = \int_0^\infty e^{-x}\,x^{\frac{s}{2} - 1}\,dx$
                      (for $\operatorname{Re}(s) > 0$), substitute $x = \pi n^2 t$ so that
                      $x^{\frac{s}{2}}$ pulls out $\pi^{\frac{s}{2}} n^s$. Dividing through and
                      summing over $n = 1, 2, 3, \dots$ (for $\operatorname{Re}(s) > 1$) yields
                      $\Lambda(s) = \Gamma_{\mathbb{R}}(s)\,\zeta(s)$:`}
                  />
                </p>
                <div
                  class="equation"
                  innerHTML={tex`\Lambda(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)\,\zeta(s) = \int_0^\infty \left(\sum_{n = 1}^{\infty} e^{-\pi n^2 t}\right) t^{\frac{s}{2} - 1}\,dt`}
                />
              </li>
              <li>
                <p>
                  <strong>Symmetry of the Gaussian sum:</strong>{" "}
                  <span
                    innerHTML={prose`the full sum $\theta(t) = \sum_{n = -\infty}^{\infty} e^{-\pi n^2 t}$ satisfies $\theta(t) = \frac{1}{\sqrt{t}}\,\theta\!\left(\frac{1}{t}\right)$ by Poisson summation (which Riemann cited from Jacobi). Splitting the integral at $t = 1$ and substituting $t \mapsto \frac{1}{t}$ on $(0, 1)$ turns that $t \leftrightarrow \frac{1}{t}$ symmetry into exact equality under $s \leftrightarrow 1 - s$:`}
                  />
                </p>
                <div class="equation" innerHTML={tex`\Lambda(1 - s) = \Lambda(s)`} />
              </li>
              <li>
                <p>
                  <strong>Isolate the conversion factor:</strong>{" "}
                  <span
                    innerHTML={prose`dividing $\Lambda(1 - s) = \Lambda(s)$ by $\Gamma_{\mathbb{R}}(1 - s)$ gives $\zeta(1 - s) = \frac{\Gamma_{\mathbb{R}}(s)}{\Gamma_{\mathbb{R}}(1 - s)}\,\zeta(s)$. To replace the half-arguments by a single $\Gamma(s)$, Mathlib multiplies top and bottom by $\Gamma_{\mathbb{R}}(s + 1)$:`}
                  />
                </p>
                <div
                  class="equation"
                  innerHTML={tex`\frac{\Gamma_{\mathbb{R}}(s)}{\Gamma_{\mathbb{R}}(1 - s)} = \frac{\Gamma_{\mathbb{R}}(s)\,\Gamma_{\mathbb{R}}(s + 1)}{\Gamma_{\mathbb{R}}(1 - s)\,\Gamma_{\mathbb{R}}(1 + s)}`}
                />
              </li>
              <li>
                <p>
                  <strong>Numerator (Legendre's doubling formula):</strong>{" "}
                  <span
                    innerHTML={prose`Mathlib uses Bohr–Mollerup uniqueness (above) on positive reals, then analytic continuation to $\mathbb{C}$, to prove $\Gamma\!\left(\frac{s}{2}\right)\,\Gamma\!\left(\frac{s}{2} + \frac{1}{2}\right) = 2^{1 - s}\sqrt{\pi}\,\Gamma(s)$. Multiplying by $\pi^{-\frac{s}{2}}\,\pi^{-\frac{s + 1}{2}}$ cancels $\sqrt{\pi}$ and leaves:`}
                  />
                </p>
                <div
                  class="equation"
                  innerHTML={tex`\Gamma_{\mathbb{R}}(s)\,\Gamma_{\mathbb{R}}(s + 1) = 2\,(2\pi)^{-s}\,\Gamma(s)`}
                />
              </li>
              <li>
                <p>
                  <strong>Denominator (Euler's reflection formula):</strong>{" "}
                  <span
                    innerHTML={prose`because $\frac{1 + s}{2} = 1 - \frac{1 - s}{2}$, applying $\Gamma(z)\,\Gamma(1 - z) = \frac{\pi}{\sin(\pi z)}$ at $z = \frac{1 - s}{2}$ cancels $\pi^{-1}$ and turns $\sin\!\left(\frac{\pi}{2} - \frac{\pi s}{2}\right)$ into $\cos\!\left(\frac{\pi s}{2}\right)$:`}
                  />
                </p>
                <div
                  class="equation"
                  innerHTML={tex`\Gamma_{\mathbb{R}}(1 - s)\,\Gamma_{\mathbb{R}}(1 + s) = \pi^{-1} \cdot \frac{\pi}{\sin\!\left(\frac{\pi(1 - s)}{2}\right)} = \frac{1}{\cos\!\left(\frac{\pi s}{2}\right)}`}
                />
              </li>
              <li>
                <p>
                  <strong>Divide numerator by denominator:</strong>{" "}
                  <span
                    innerHTML={prose`combining steps 4 and 5 yields $\frac{\Gamma_{\mathbb{R}}(s)}{\Gamma_{\mathbb{R}}(1 - s)} = 2\,(2\pi)^{-s}\,\Gamma(s)\,\cos\!\left(\frac{\pi s}{2}\right)$, which is the exact conversion factor in the zeta symmetry.`}
                  />
                </p>
              </li>
            </ol>
          </div>
        </details>
        <details class="aside-details">
          <summary>
            <span>How Mathlib proves Euler's reflection formula</span>
          </summary>
          <div class="aside-body">
            <ol>
              <li>
                <p>
                  <strong innerHTML={prose`Limit formula for $\Gamma$:`} />{" "}
                  <span
                    innerHTML={prose`for $\operatorname{Re}(z) > 0$, Mathlib approximates $e^{-x}$ by $\left(1 - \frac{x}{n}\right)^n$ inside Euler's integral and applies dominated convergence (then shifts left by 1 using $\Gamma(z + 1) = z\,\Gamma(z)$) to show $\Gamma(z)$ is the limit as $n \to \infty$ of:`}
                  />
                </p>
                <div
                  class="equation"
                  innerHTML={tex`\operatorname{GammaSeq}(z, n) = \frac{n^z\,n!}{z\,(z + 1)\,(z + 2)\cdots(z + n)}`}
                />
              </li>
              <li>
                <p>
                  <strong innerHTML={prose`Multiply the $z$ and $1 - z$ products:`} />{" "}
                  <span
                    innerHTML={prose`in $\operatorname{GammaSeq}(z, n)\,\operatorname{GammaSeq}(1 - z, n)$, the powers $n^z \cdot n^{1 - z} = n$ combine, and pairing $(j + 1 + z)$ with $(j + 1 - z)$ gives $(j + 1)^2\left(1 - \frac{z^2}{(j + 1)^2}\right)$. The factors $(j + 1)^2$ cancel $(n!)^2$, leaving:`}
                  />
                </p>
                <div
                  class="equation"
                  innerHTML={tex`\operatorname{GammaSeq}(z, n)\,\operatorname{GammaSeq}(1 - z, n) = \frac{n}{n + 1 - z} \cdot \frac{1}{z \prod_{j = 1}^{n} \left(1 - \frac{z^2}{j^2}\right)}`}
                />
              </li>
              <li>
                <p>
                  <strong>Match to Euler's sine product:</strong>{" "}
                  <span
                    innerHTML={prose`as $n \to \infty$, $\frac{n}{n + 1 - z} \to 1$, and Euler's infinite product for the sine gives $\pi z \prod_{j = 1}^{n} \left(1 - \frac{z^2}{j^2}\right) \to \sin(\pi z)$ (proved in Mathlib by repeated integration by parts on $\int_0^{\frac{\pi}{2}} \cos(2zx)\cos^{2n}(x)\,dx$). Taking the reciprocal gives $\frac{\pi}{\sin(\pi z)}$.`}
                  />
                </p>
              </li>
            </ol>
          </div>
        </details>
        <p class="sources">
          Sources:{" "}
          <a href={RIEMANN_1859}>
            Riemann, On the Number of Prime Numbers less than a Given Quantity (1859, Wilkins
            translation)
          </a>
          , pages 1 to 3 (both proofs and the motivation quote);{" "}
          <a href={MATHLIB_ZETA_ONE_SUB}>Mathlib, theorem riemannZeta_one_sub</a>;{" "}
          <a href={MATHLIB_HURWITZ_EVEN}>Mathlib, lemma hurwitzZetaEven_one_sub</a>;{" "}
          <a href={MATHLIB_DELIGNE}>
            Mathlib, Deligne.lean (Gammaℝ_mul_Gammaℝ_add_one to inv_Gammaℝ_one_sub)
          </a>
          ; <a href={MATHLIB_THETA}>Mathlib, theorem jacobiTheta₂_functional_equation</a>;{" "}
          <a href={MATHLIB_REFLECTION}>
            Mathlib, Gamma/Beta.lean (GammaSeq_mul and Gamma_mul_Gamma_one_sub)
          </a>
          ; <a href={MATHLIB_DOUBLING}>Mathlib, theorem Gamma_mul_Gamma_add_half</a>;{" "}
          <a href={MATHLIB_SINE_PROD}>Mathlib, theorem tendsto_euler_sin_prod</a>;{" "}
          <a href={EULER_E352}>Euler, E352</a> (1749/1768, section 13, Willis and Osler
          translation); <a href={EULER_E421}>Euler, E421 (Euler Archive)</a>, Novi Commentarii
          academiae scientiarum Petropolitanae 16 (1772), pages 120 to 121, section 43 (read on the
          Latin scan).
        </p>
      </section>
    </main>
  );
}
