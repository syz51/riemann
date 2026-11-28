import { For } from "solid-js";
import { href, STEP_COUNT, STEPS, UPCOMING_STEPS } from "./pages";

const SHORTGRH_URL = "https://math.mit.edu/~drew/shortgrh/";
const SCHOENFELD_URL = "https://github.com/AndrewVSutherland/schoenfeld-rh-lean/tree/0e52d7b1";
const GRH_LEAN_URL =
  "https://github.com/lsernau/grh-lean/tree/72fead102f663d5c7a407964a13dc0cf9d977207";

/** Compact to-scale diagram of the critical strip and critical line for the proof home hero. */
function HeroPlane() {
  // Uniform horizontal scale: 24 units per 1 on the real axis, with Re(s) = 0 at x = 124.
  return (
    <svg
      class="hero-plane"
      viewBox="0 0 212 124"
      role="img"
      aria-label="The complex plane to uniform horizontal scale, with the critical strip from 0 to 1, the dashed critical line at real part one half, non-trivial zeros on that line, the pole at 1, and trivial zeros at minus 2 and minus 4."
    >
      <rect class="hero-field" x="1" y="1" width="210" height="122" rx="7" />
      <rect class="hero-strip" x="124" y="2" width="24" height="120" />
      <line class="hero-axis" x1="12" y1="62" x2="200" y2="62" />
      <line class="hero-axis" x1="124" y1="10" x2="124" y2="114" />
      <line class="hero-line" x1="136" y1="10" x2="136" y2="114" />
      <circle class="hero-zero" cx="136" cy="26" r="3.4" />
      <circle class="hero-zero" cx="136" cy="43" r="3.4" />
      <circle class="hero-zero" cx="136" cy="81" r="3.4" />
      <circle class="hero-zero" cx="136" cy="98" r="3.4" />
      <circle class="hero-trivial" cx="28" cy="62" r="2.7" />
      <circle class="hero-trivial" cx="76" cy="62" r="2.7" />
      <circle class="hero-pole" cx="148" cy="62" r="3.2" />
      <text class="hero-label" x="145" y="22">
        Re(s) =
      </text>
      <text class="hero-frac" x="189" y="17" text-anchor="middle">
        1
      </text>
      <line class="hero-frac-bar" x1="185" y1="19.5" x2="193" y2="19.5" />
      <text class="hero-frac" x="189" y="28" text-anchor="middle">
        2
      </text>
      <text class="hero-tick" x="28" y="76" text-anchor="middle">
        −4
      </text>
      <text class="hero-tick" x="76" y="76" text-anchor="middle">
        −2
      </text>
      <text class="hero-tick" x="148" y="76" text-anchor="middle">
        1
      </text>
    </svg>
  );
}

/** The proof home page: thesis hero and vertical critical-line spine of proof steps. */
export function ContentsPage() {
  const firstStep = STEPS[0];

  return (
    <main class="proof-home">
      <section class="proof-hero">
        <div class="proof-hero-copy">
          <p class="kicker">A top-down reading of Alpöge's Lean 4 proof</p>
          <h1
            innerHTML={prose`Every non-trivial zero lies on $\operatorname{Re}(s) = \frac{1}{2}$`}
          />
          <p
            class="summary"
            innerHTML={prose`Follow the proof straight down from Main.lean, one small step at a time. Whenever a step meets an unfamiliar idea—complex numbers, $\zeta(s)$, or $\Gamma(s)$—branch into it right there, then return to the proof.`}
          />
          {firstStep && (
            <a class="hero-cta" href={href(firstStep.route)}>
              Start Step {firstStep.number}: {firstStep.title} →
            </a>
          )}
        </div>
        <div class="proof-hero-figure">
          <HeroPlane />
        </div>
      </section>

      <section class="spine-section" aria-labelledby="proof-route-heading">
        <div class="spine-head">
          <h2 id="proof-route-heading">The proof route</h2>
          <p class="spine-progress">
            {STEPS.length} of {STEP_COUNT} top-level steps published
          </p>
        </div>

        <ol class="proof-spine">
          <For each={STEPS}>
            {(step) => (
              <li class="spine-item published">
                <a class="spine-card" href={href(step.route)}>
                  <div class="spine-meta">
                    <span class="spine-step">
                      Step {String(step.number).padStart(2, "0")} · {step.level}
                    </span>
                    <span class="spine-badge published">Published</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p innerHTML={step.summary} />
                </a>
              </li>
            )}
          </For>

          <For each={UPCOMING_STEPS}>
            {(step) => (
              <li
                class={[
                  "spine-item",
                  step.status === "Next in walk-through" ? "next-up" : "planned",
                ]}
              >
                <div class="spine-card upcoming">
                  <div class="spine-meta">
                    <span class="spine-step">
                      Step {String(step.number).padStart(2, "0")} · {step.level}
                    </span>
                    <span
                      class={[
                        "spine-badge",
                        step.status === "Next in walk-through" ? "next-up" : "planned",
                      ]}
                    >
                      {step.status}
                    </span>
                  </div>
                  <h3 innerHTML={step.title} />
                  <p innerHTML={step.summary} />
                </div>
              </li>
            )}
          </For>
        </ol>

        <details class="aside-details home-note">
          <summary>How was the proof checked, and why do these zeros matter for primes?</summary>
          <div class="aside-body">
            <p>
              The shorter 25 November 2026 Lean 4 proof (<code>lsernau/grh-lean</code>, commit{" "}
              <code>72fead10</code>) has been verified end-to-end by six independent checkers —
              Lean's default and paranoid kernels plus <code>nanoda</code>, <code>lean4lean</code>,{" "}
              <code>con-leche</code>, and <code>con-ron</code> — using only Lean's three standard
              logical axioms.
            </p>
            <p
              innerHTML={prose`Why care where the zeros of $\zeta(s)$ sit? Because they control how smoothly the prime numbers are spread out. Write $\psi(x)$ (the Greek letter psi) for a weighted count of primes and prime powers up to $x$: for any whole number $n$, $\psi(n)$ is simply $\log(\operatorname{lcm}(1, 2, \dots, n))$, the natural logarithm of the least common multiple of the numbers from 1 to $n$. The Prime Number Theorem says $\psi(x)$ stays near $x$. Putting every non-trivial zero on $\operatorname{Re}(s) = \frac{1}{2}$ pins down how close: for every real number $x \ge 73.2$,`}
            />
            <div
              class="equation"
              innerHTML={tex`\left|\psi(x) - x\right| < \frac{\sqrt{x}\log^2 x}{8\pi}`}
            />
            <p>
              In 1976, Lowell Schoenfeld proved this bound follows from the Riemann hypothesis.
              Andrew Sutherland formalized that equivalence in Lean and checked the bound itself
              end-to-end from the shorter proof across all six checkers.
            </p>
            <p class="sources">
              Sources:{" "}
              <a href={SHORTGRH_URL} target="_blank" rel="noreferrer">
                Sutherland, shortgrh verification report
              </a>
              ;{" "}
              <a href={SCHOENFELD_URL} target="_blank" rel="noreferrer">
                schoenfeld-rh-lean
              </a>
              ;{" "}
              <a href={GRH_LEAN_URL} target="_blank" rel="noreferrer">
                lsernau/grh-lean (commit 72fead10)
              </a>
              .
            </p>
          </div>
        </details>
      </section>
    </main>
  );
}
