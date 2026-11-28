import { createSignal, For, Show } from "solid-js";
import { isZh, lang } from "./i18n";
import { href, STEP_COUNT, stepsFor, upcomingStepsFor } from "./pages";

const SHORTGRH_URL = "https://math.mit.edu/~drew/shortgrh/";
const SCHOENFELD_URL = "https://github.com/AndrewVSutherland/schoenfeld-rh-lean/tree/0e52d7b1";
const GRH_LEAN_URL =
  "https://github.com/lsernau/grh-lean/tree/72fead102f663d5c7a407964a13dc0cf9d977207";

type AxiomId = "propext" | "choice" | "quot";

const AXIOMS: ReadonlyArray<{
  id: AxiomId;
  code: string;
  zhName: string;
  enName: string;
  enNote: Markup;
  zhNote: Markup;
}> = [
  {
    id: "propext",
    code: "propext",
    zhName: "命题外延性",
    enName: "Propositional extensionality",
    enNote: prose`Logically equivalent statements ($a \leftrightarrow b$) count as equal ($a = b$) — taken for granted in ordinary math, stated explicitly in Lean's type theory.`,
    zhNote: prose`若两个命题逻辑等价（$a \leftrightarrow b$），就视作同一个命题（$a = b$）。日常数学默认如此，但在 Lean 的类型论里需要显式声明。`,
  },
  {
    id: "choice",
    code: "Classical.choice",
    zhName: "选择公理",
    enName: "Axiom of choice",
    enNote: prose`From any nonempty set or type, you may pick an element. In Lean, the law of excluded middle ($P \lor \neg P$) and proof by contradiction also rely on this axiom.`,
    zhNote: prose`只要一个集合（类型）非空，就能从中取出一个元素。在 Lean 里，排中律（$P \lor \neg P$）与反证法也都依赖这条公理。`,
  },
  {
    id: "quot",
    code: "Quot.sound",
    zhName: "商类型健全性",
    enName: "Quotient soundness",
    enNote: prose`Objects equivalent under a relation become equal in the quotient — how Lean identifies equivalent representations, such as Cauchy sequences for real numbers.`,
    zhNote: prose`按某种等价关系视为等价的对象，在商类型中即相等——Lean 正是靠它把等价表示“粘合”为同一对象（例如用等价柯西序列构造实数）。`,
  },
];

function AxiomsStrip() {
  const [openId, setOpenId] = createSignal<AxiomId | null>(null);
  const active = () => AXIOMS.find((item) => item.id === openId());
  const toggle = (id: AxiomId) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div
      class="home-fact-strip"
      onKeyDown={(event) => {
        if (event.key === "Escape" && openId() !== null) {
          setOpenId(null);
        }
      }}
    >
      <p class="home-fact-strip-label">
        {isZh()
          ? "仅用到 Lean 经典数学内置的三条标准基础公理（无额外假设，点击可看说明）"
          : "Only Lean's 3 standard classical axioms (no extra assumptions; click any)"}
      </p>
      <div
        class="home-fact-axioms"
        role="group"
        aria-label={isZh() ? "Lean 基础公理" : "Lean axioms"}
      >
        <For each={AXIOMS}>
          {(ax) => (
            <button
              type="button"
              class={["axiom-item", { active: openId() === ax.id }]}
              aria-expanded={openId() === ax.id ? "true" : "false"}
              aria-controls="home-axiom-note"
              onClick={() => toggle(ax.id)}
            >
              <Show when={isZh()}>
                <span>{ax.zhName}</span>
              </Show>
              <code>{ax.code}</code>
            </button>
          )}
        </For>
      </div>
      <Show when={active()}>
        {(ax) => (
          <div id="home-axiom-note" class="axiom-note" aria-live="polite">
            <div class="axiom-note-head">
              <strong>{isZh() ? ax().zhName : ax().enName}</strong>
              <button
                type="button"
                class="axiom-note-close"
                aria-label={isZh() ? "收起公理说明" : "Close axiom note"}
                onClick={() => setOpenId(null)}
              >
                ×
              </button>
            </div>
            <p innerHTML={isZh() ? ax().zhNote : ax().enNote} />
          </div>
        )}
      </Show>
    </div>
  );
}

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
      <text class="hero-frac" x="189" y="16" text-anchor="middle">
        1
      </text>
      <line class="hero-frac-bar" x1="185" y1="19.5" x2="193" y2="19.5" />
      <text class="hero-frac" x="189" y="29" text-anchor="middle">
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
              ? "自上而下拆解 Alpöge 的 Lean 4 证明"
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
          <h2>{isZh() ? "已通过 6 个 Lean 内核的独立校验" : "Checked by 6 Lean proof checkers"}</h2>
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
                <AxiomsStrip />
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
            <AxiomsStrip />
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
          <h2>{isZh() ? "锁住素数的误差" : "They pin down the prime count"}</h2>
          <Show
            when={isZh()}
            fallback={
              <p>
                <span
                  innerHTML={prose`Each non-trivial zero adds an error wave to the prime count, with amplitude set by its real part. Putting every zero on $\operatorname{Re}(s) = \frac{1}{2}$ locks that error to the $\sqrt{x}$ scale — written via `}
                />
                <a
                  href={href("zeta", "chebyshev-psi")}
                  innerHTML={prose`Chebyshev's weighted prime count $\psi(x)$`}
                />
                <span innerHTML={prose` (checked end-to-end in Lean):`} />
              </p>
            }
          >
            <p>
              <span
                innerHTML={prose`每个非平凡零点都会在素数计数上叠加一道误差波，实部决定波幅。全部零点落在 $\operatorname{Re}(s) = \frac{1}{2}$ 上，就把偏差锁在 $\sqrt{x}$ 量级——以`}
              />
              <a
                href={href("zeta", "chebyshev-psi")}
                innerHTML={prose`切比雪夫加权素数计数 $\psi(x)$`}
              />
              <span innerHTML={prose` 写出（Lean 已端到端校验）：`} />
            </p>
          </Show>
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
              {isZh() ? "舍恩菲尔德显式界（Lean）" : "Schoenfeld bound in Lean"}
            </a>
          </p>
        </article>
      </section>

      <section class="spine-section" aria-labelledby="proof-route-heading">
        <div class="spine-head">
          <h2 id="proof-route-heading">{isZh() ? "证明路线图" : "The proof route"}</h2>
          <p class="spine-progress">
            {isZh()
              ? `主线共 ${STEP_COUNT} 步，已发布 ${steps().length} 步`
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
