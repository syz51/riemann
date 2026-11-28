import { For, Show } from "solid-js";
import { isZh, lang } from "./i18n";
import { href, STEP_COUNT, stepsFor, upcomingStepsFor } from "./pages";

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
      aria-label={
        isZh()
          ? "按统一横向比例绘制的复平面：0 到 1 之间为临界带，实部 1/2 处的虚线为临界线，线上标有非平凡零点，实轴 1 处为极点，−2 与 −4 处为平凡零点。"
          : "The complex plane to uniform horizontal scale, with the critical strip from 0 to 1, the dashed critical line at real part one half, non-trivial zeros on that line, the pole at 1, and trivial zeros at minus 2 and minus 4."
      }
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
  const steps = () => stepsFor(lang());
  const upcoming = () => upcomingStepsFor(lang());
  const firstStep = () => steps()[0];

  return (
    <main class="proof-home">
      <section class="proof-hero">
        <div class="proof-hero-copy">
          <p class="kicker">
            {isZh()
              ? "自顶向下拆解 Alpöge 的 Lean 4 证明"
              : "A top-down reading of Alpöge's Lean 4 proof"}
          </p>
          <h1
            innerHTML={
              isZh()
                ? prose`所有非平凡零点，全都落在 $\operatorname{Re}(s) = \frac{1}{2}$ 上`
                : prose`Every non-trivial zero lies on $\operatorname{Re}(s) = \frac{1}{2}$`
            }
          />
          <p
            class="summary"
            innerHTML={
              isZh()
                ? prose`从主文件 Main.lean 出发，顺着证明结构一步步往下拆。每当遇到陌生概念——复数、$\zeta(s)$ 或 $\Gamma(s)$——当场点开背景页补课，读懂后再无缝回到证明主线。`
                : prose`Follow the proof straight down from Main.lean, one small step at a time. Whenever a step meets an unfamiliar idea—complex numbers, $\zeta(s)$, or $\Gamma(s)$—branch into it right there, then return to the proof.`
            }
          />
          <Show when={firstStep()}>
            {(step) => (
              <a class="hero-cta" href={href(step().route)}>
                {isZh()
                  ? `进入第 ${step().number} 步：${step().title} →`
                  : `Start Step ${step().number}: ${step().title} →`}
              </a>
            )}
          </Show>
        </div>
        <div class="proof-hero-figure">
          <HeroPlane />
        </div>
      </section>

      <section
        class="home-facts"
        aria-label={
          isZh() ? "独立形式化验证与素数分布意义" : "Proof verification and prime-number payoff"
        }
      >
        <article class="home-fact">
          <p class="home-fact-kicker">{isZh() ? "独立形式化检验" : "Independent verification"}</p>
          <h2>{isZh() ? "通过 6 个 Lean 验证内核检查" : "Checked by 6 Lean proof checkers"}</h2>
          <Show
            when={isZh()}
            fallback={
              <>
                <p>
                  The shorter 25 November 2026 proof (<code>lsernau/grh-lean</code>, commit{" "}
                  <code>72fead10</code>) passed Lean's default and paranoid kernels plus{" "}
                  <code>nanoda</code>, <code>lean4lean</code>, <code>con-leche</code>, and{" "}
                  <code>con-ron</code> across both the readable (300k lines) and compact (76k lines)
                  editions.
                </p>
                <p class="home-fact-strip">
                  <span>Axioms used:</span> <code>propext</code> · <code>Classical.choice</code> ·{" "}
                  <code>Quot.sound</code>
                </p>
                <p class="home-fact-links">
                  <a href={SHORTGRH_URL} target="_blank" rel="noreferrer">
                    Verification report →
                  </a>{" "}
                  ·{" "}
                  <a href={GRH_LEAN_URL} target="_blank" rel="noreferrer">
                    Lean source (72fead10)
                  </a>
                </p>
              </>
            }
          >
            <p>
              2026 年 11 月 25 日发布的精简版证明（<code>lsernau/grh-lean</code>，提交{" "}
              <code>72fead10</code>）在可读版（30 万行）与压缩版（7.6 万行）上，全部通过了 Lean
              默认内核、严格内核，以及 <code>nanoda</code>、<code>lean4lean</code>、
              <code>con-leche</code> 和 <code>con-ron</code> 的独立校验。
            </p>
            <p class="home-fact-strip">
              <span>仅依赖三条标准公理：</span> <code>propext</code> · <code>Classical.choice</code>{" "}
              · <code>Quot.sound</code>
            </p>
            <p class="home-fact-links">
              <a href={SHORTGRH_URL} target="_blank" rel="noreferrer">
                验证报告 →
              </a>{" "}
              ·{" "}
              <a href={GRH_LEAN_URL} target="_blank" rel="noreferrer">
                Lean 源码（72fead10）
              </a>
            </p>
          </Show>
        </article>

        <article class="home-fact">
          <p class="home-fact-kicker">{isZh() ? "零点为什么这么重要" : "Why the zeros matter"}</p>
          <h2>{isZh() ? "它们把素数的误差牢牢锁住" : "They pin down the prime count"}</h2>
          <p
            innerHTML={
              isZh()
                ? prose`每个非平凡零点都像一道加在素数计数上的波纹。把它们全部钉在 $\operatorname{Re}(s) = \frac{1}{2}$ 上，就能让切比雪夫加权素数计数函数 $\psi(x)$ 紧贴直线 $x$，这条显式界限也已在 Lean 中端到端验完：`
                : prose`Each zero acts like a wave in the prime count. Putting them all on $\operatorname{Re}(s) = \frac{1}{2}$ forces Chebyshev's weighted prime count $\psi(x)$ to stay tightly close to $x$ — checked end-to-end in Lean:`
            }
          />
          <p
            class="home-fact-eq"
            innerHTML={tex`\left|\psi(x) - x\right| < \frac{\sqrt{x}\log^2 x}{8\pi} \quad (x \ge 73.2)`}
          />
          <p class="home-fact-links">
            <a href={href("zeta", "zeros-and-primes")}>
              {isZh() ? "零点如何控制素数分布 →" : "How zeros control the primes →"}
            </a>{" "}
            ·{" "}
            <a href={SCHOENFELD_URL} target="_blank" rel="noreferrer">
              {isZh() ? "Schoenfeld 显式界限（Lean）" : "Schoenfeld bound in Lean"}
            </a>
          </p>
        </article>
      </section>

      <section class="spine-section" aria-labelledby="proof-route-heading">
        <div class="spine-head">
          <h2 id="proof-route-heading">{isZh() ? "证明路线图" : "The proof route"}</h2>
          <p class="spine-progress">
            {isZh()
              ? `顶层主线共 ${STEP_COUNT} 步，已发布 ${steps().length} 步`
              : `${steps().length} of ${STEP_COUNT} top-level steps published`}
          </p>
        </div>

        <ol class="proof-spine">
          <For each={steps()}>
            {(step) => (
              <li class="spine-item published">
                <a class="spine-card" href={href(step.route)}>
                  <div class="spine-meta">
                    <span class="spine-step">
                      {isZh()
                        ? `第 ${String(step.number).padStart(2, "0")} 步 · ${step.level}`
                        : `Step ${String(step.number).padStart(2, "0")} · ${step.level}`}
                    </span>
                    <span class="spine-badge published">{isZh() ? "已发布" : "Published"}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p innerHTML={step.summary} />
                </a>
              </li>
            )}
          </For>

          <For each={upcoming()}>
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
                      {isZh()
                        ? `第 ${String(step.number).padStart(2, "0")} 步 · ${step.level}`
                        : `Step ${String(step.number).padStart(2, "0")} · ${step.level}`}
                    </span>
                    <span
                      class={[
                        "spine-badge",
                        step.status === "Next in walk-through" ? "next-up" : "planned",
                      ]}
                    >
                      {step.statusLabel ?? step.status}
                    </span>
                  </div>
                  <h3 innerHTML={step.title} />
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
