import { For } from "solid-js";
import { href, STEP_COUNT, STEPS, UPCOMING_STEPS } from "./pages";

/** Compact diagram of the critical strip and critical line for the proof home hero. */
function HeroPlane() {
  return (
    <svg
      class="hero-plane"
      viewBox="0 0 184 124"
      role="img"
      aria-label="The complex plane with the critical strip from 0 to 1, the dashed critical line at real part one half, non-trivial zeros on that line, and trivial zeros at minus 2 and minus 4."
    >
      <rect class="hero-field" x="1" y="1" width="182" height="122" rx="7" />
      <rect class="hero-strip" x="92" y="2" width="48" height="120" />
      <line class="hero-axis" x1="12" y1="62" x2="172" y2="62" />
      <line class="hero-axis" x1="92" y1="10" x2="92" y2="114" />
      <line class="hero-line" x1="116" y1="10" x2="116" y2="114" />
      <circle class="hero-zero" cx="116" cy="26" r="3.6" />
      <circle class="hero-zero" cx="116" cy="43" r="3.6" />
      <circle class="hero-zero" cx="116" cy="81" r="3.6" />
      <circle class="hero-zero" cx="116" cy="98" r="3.6" />
      <circle class="hero-trivial" cx="44" cy="62" r="2.7" />
      <circle class="hero-trivial" cx="68" cy="62" r="2.7" />
      <circle class="hero-pole" cx="140" cy="62" r="3.3" />
      <text class="hero-label" x="121" y="22">
        Re(s) =
      </text>
      <text class="hero-frac" x="165" y="17" text-anchor="middle">
        1
      </text>
      <line class="hero-frac-bar" x1="161" y1="19.5" x2="169" y2="19.5" />
      <text class="hero-frac" x="165" y="28" text-anchor="middle">
        2
      </text>
      <text class="hero-tick" x="44" y="76" text-anchor="middle">
        −4
      </text>
      <text class="hero-tick" x="68" y="76" text-anchor="middle">
        −2
      </text>
      <text class="hero-tick" x="140" y="76" text-anchor="middle">
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
                <div class="spine-card upcoming" aria-disabled="true">
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
                  <h3>{step.title}</h3>
                  <p innerHTML={step.summary} />
                </div>
              </li>
            )}
          </For>
        </ol>
      </section>
    </main>
  );
}
