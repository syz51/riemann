import { createSignal, For, Show } from "solid-js";
import { gamma } from "./gamma";

// The chart: Γ(x) for a real x from −4 to 5. The values are computed on the page.
const X_MIN = -4;
const X_MAX = 5;
const Y_MIN = -8;
const Y_MAX = 26;
const WIDTH = 600;
const HEIGHT = 340;
const LEFT = 40;
const RIGHT = 16;
const TOP = 12;
const BOTTOM = 38;
const PLOT_W = WIDTH - LEFT - RIGHT;
const PLOT_H = HEIGHT - TOP - BOTTOM;
// The slider counts in twentieths, so that each whole number is an exact stop.
const PER_UNIT = 20;

const X_TICKS = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const Y_TICKS = [-5, 0, 5, 10, 15, 20, 25];
const POLES = [-4, -3, -2, -1, 0];
const FACTORIALS = [1, 2, 3, 4, 5];
const LABELLED = [4, 5];

const x = (value: number) => LEFT + ((value - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
const y = (value: number) => TOP + ((Y_MAX - value) / (Y_MAX - Y_MIN)) * PLOT_H;

// One piece of the curve for each stretch between two points without a value.
// A value far outside the chart is cut to its edge region; the clip hides it.
const CURVE = [...POLES.slice(1), X_MAX]
  .map((end, piece) => {
    const from = POLES[piece]!;
    // Close to a point without a value the curve is steep, so the samples
    // there are much closer together than in the middle.
    const near = [1e-6, 1e-5, 1e-4, 1e-3, 0.0025, 0.005];
    const offsets = [...near];
    for (let i = 1; i < (end - from) * 100; i++) offsets.push(i / 100);
    if (end === X_MAX) offsets.push(end - from);
    else offsets.push(...near.map((gap) => end - from - gap).reverse());
    const points = offsets.map((offset) => {
      const at = from + offset;
      const value = Math.max(Y_MIN - 20, Math.min(Y_MAX + 20, gamma(at)!));
      return `${x(at).toFixed(2)},${y(value).toFixed(2)}`;
    });
    return `M${points.join("L")}`;
  })
  .join("");

const minus = (text: string) => text.replace("-", "−");
const digits = (value: number) => minus(value.toFixed(4));
const NONE = "No value";

export function GammaChart() {
  const [step, setStep] = createSignal(2.5 * PER_UNIT);
  const at = () => step() / PER_UNIT;
  const value = () => gamma(at());
  const next = () => gamma(at() + 1);
  const atText = () => minus(String(at()));
  const show = (number: number | undefined) => (number === undefined ? NONE : digits(number));
  const inside = () => {
    const current = value();
    return current !== undefined && current >= Y_MIN && current <= Y_MAX ? current : undefined;
  };

  // A press or a drag on the picture moves the chosen point, as the slider does.
  const choose = (event: PointerEvent & { currentTarget: SVGSVGElement }) => {
    const box = event.currentTarget.getBoundingClientRect();
    const unit = ((event.clientX - box.left) / box.width) * WIDTH;
    const chosen = X_MIN + ((unit - LEFT) / PLOT_W) * (X_MAX - X_MIN);
    setStep(Math.round(Math.max(X_MIN, Math.min(X_MAX, chosen)) * PER_UNIT));
  };

  return (
    <div class="sumprod gamma-chart">
      <label class="slider">
        <span>
          <span innerHTML={prose`The number $x =$`} /> <strong>{atText()}</strong>
        </span>
        <input
          type="range"
          min={X_MIN * PER_UNIT}
          max={X_MAX * PER_UNIT}
          step="1"
          value={step()}
          aria-valuetext={atText()}
          onInput={(event) => setStep(Number(event.currentTarget.value))}
        />
      </label>

      <ul class="legend">
        <li class="sum" innerHTML={prose`$\Gamma(x)$`} />
        <li class="point">Whole numbers: 1, 1, 2, 6, 24</li>
        <li class="target" innerHTML={prose`$\Gamma$ has no value here`} />
      </ul>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Chart of the Gamma function from x = −4 to x = 5. At x = ${atText()}, ${
          value() === undefined
            ? "the function has no value"
            : `the value is about ${show(value())}`
        }.`}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          choose(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) choose(event);
        }}
      >
        <defs>
          <clipPath id="gamma-plot">
            <rect x={LEFT} y={TOP} width={PLOT_W} height={PLOT_H} />
          </clipPath>
        </defs>
        <For each={Y_TICKS}>
          {(tick) => (
            <>
              <line
                class={tick === 0 ? "grid zero" : "grid"}
                x1={LEFT}
                x2={WIDTH - RIGHT}
                y1={y(tick)}
                y2={y(tick)}
              />
              <text
                class="tick"
                x={LEFT - 8}
                y={y(tick)}
                dominant-baseline="central"
                text-anchor="end"
              >
                {minus(String(tick))}
              </text>
            </>
          )}
        </For>
        <For each={X_TICKS}>
          {(tick) => (
            <text
              class="tick"
              x={x(tick)}
              y={HEIGHT - BOTTOM + 10}
              dominant-baseline="hanging"
              text-anchor="middle"
            >
              {minus(String(tick))}
            </text>
          )}
        </For>
        <text class="tick title" x={LEFT + PLOT_W / 2} y={HEIGHT - 4} text-anchor="middle">
          x
        </text>

        <For each={POLES}>
          {(pole) => (
            <line class="target" x1={x(pole)} x2={x(pole)} y1={TOP} y2={HEIGHT - BOTTOM} />
          )}
        </For>
        <line class="guide" x1={x(at())} x2={x(at())} y1={TOP} y2={HEIGHT - BOTTOM} />
        <path class="sum" d={CURVE} clip-path="url(#gamma-plot)" />
        <For each={FACTORIALS}>
          {(n) => <circle class="sum" cx={x(n)} cy={y(gamma(n)!)} r="4.5" />}
        </For>
        <For each={LABELLED}>
          {(n) => (
            <text class="direct" x={x(n) - 9} y={y(gamma(n)!) - 4} text-anchor="end">
              Γ({n}) = {gamma(n)!.toFixed(0)}
            </text>
          )}
        </For>
        <Show when={inside() !== undefined}>
          <circle class="product" cx={x(at())} cy={y(inside() ?? 0)} r="5.5" />
        </Show>
      </svg>

      <table>
        <caption>
          <span innerHTML={prose`The values at $x =$`} /> {atText()}, rounded
        </caption>
        <tbody>
          <tr>
            <th scope="row" innerHTML={prose`$\Gamma(x)$`} />
            <td>{show(value())}</td>
          </tr>
          <tr>
            <th scope="row" innerHTML={prose`$x$ times $\Gamma(x)$`} />
            <td>{value() === undefined ? NONE : digits(at() * value()!)}</td>
          </tr>
          <tr>
            <th scope="row" innerHTML={prose`$\Gamma(x + 1)$`} />
            <td>{show(next())}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
