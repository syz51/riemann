import { For } from "solid-js";
import { isZh } from "./i18n";
import type { PlaneMark } from "./steps/types";

// The picture shows real parts from -8.25 to 4.25 and imaginary parts from -40
// to 40. The vertical scale is compressed, so that the first zeros fit.
const WIDTH = 500;
const HEIGHT = 300;
const x = (re: number) => 30 + (re + 7.5) * 40;
const y = (im: number) => HEIGHT / 2 - im * 3.75;

// Imaginary parts of the first five zeros above the real axis, to two decimals.
const ZERO_HEIGHTS = [14.13, 21.02, 25.01, 30.42, 32.94];
const NONTRIVIAL = ZERO_HEIGHTS.flatMap((t) => [t, -t]);
const TRIVIAL = [-2, -4, -6];
const RE_TICKS = [-6, -4, -2, 2, 3];
const IM_TICKS = [-30, -20, -10, 10, 20, 30];

/** The complex plane with the zeros of zeta, the point 1 and the critical line. */
export function Plane(props: { mark: PlaneMark | undefined }) {
  const on = (...marks: PlaneMark[]) => props.mark !== undefined && marks.includes(props.mark);

  return (
    <figure class="plane">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={
          isZh()
            ? "复平面示意图。平凡零点位于实轴上的 −2、−4 和 −6；其余标出的非平凡零点都落在穿过实部 1/2 的竖直线上；实轴上的空心点标记了 s = 1。"
            : "The complex plane. The trivial zeros are at minus 2, minus 4 and minus 6 on the real axis. The other zeros shown are on the vertical line through one half. The point 1 is marked on the real axis."
        }
      >
        <rect
          class={["field", { on: on("plane") }]}
          x="1"
          y="1"
          width={WIDTH - 2}
          height={HEIGHT - 2}
          rx="6"
        />
        <rect class="strip" x={x(0)} y="1" width={x(1) - x(0)} height={HEIGHT - 2} />

        <line class="axis" x1="0" y1={y(0)} x2={WIDTH} y2={y(0)} />
        <line class="axis" x1={x(0)} y1="0" x2={x(0)} y2={HEIGHT} />
        <For each={RE_TICKS}>
          {(re) => (
            <text class="tick" x={x(re)} y={y(0) + 16} text-anchor="middle">
              {re < 0 ? `−${-re}` : re}
            </text>
          )}
        </For>
        <For each={IM_TICKS}>
          {(im) => (
            <text class="tick" x={x(0) - 6} y={y(im) + 4} text-anchor="end">
              {im < 0 ? `−${-im}` : im}
            </text>
          )}
        </For>
        <text class="tick" x={WIDTH - 8} y={y(0) - 8} text-anchor="end">
          {isZh() ? "实部" : "real part"}
        </text>
        <text class="tick" x={x(0) - 6} y="14" text-anchor="end">
          {isZh() ? "虚部" : "imaginary part"}
        </text>

        <g class={["critical", { on: on("line") }]}>
          <line x1={x(0.5)} y1="0" x2={x(0.5)} y2={HEIGHT} />
          <text x={x(0.5) + 8} y="18">
            {isZh() ? "实部" : "real part"}
          </text>
          <text x={isZh() ? x(0.5) + 39 : x(0.5) + 64} y="12" font-size="10" text-anchor="middle">
            1
          </text>
          <line
            class="frac-bar"
            x1={isZh() ? x(0.5) + 34 : x(0.5) + 59}
            y1="14.5"
            x2={isZh() ? x(0.5) + 44 : x(0.5) + 69}
            y2="14.5"
          />
          <text x={isZh() ? x(0.5) + 39 : x(0.5) + 64} y="24" font-size="10" text-anchor="middle">
            2
          </text>
        </g>

        <g class={["zeros", { on: on("zeros") }]}>
          <For each={NONTRIVIAL}>{(im) => <circle cx={x(0.5)} cy={y(im)} r="4" />}</For>
        </g>
        <g class={["zeros", { on: on("zeros", "trivial") }]}>
          <For each={TRIVIAL}>{(re) => <circle cx={x(re)} cy={y(0)} r="4" />}</For>
        </g>

        <g class={["pole", { on: on("pole") }]}>
          <circle cx={x(1)} cy={y(0)} r="5" />
          <text x={x(1) + 9} y={y(0) - 9}>
            s = 1
          </text>
        </g>
      </svg>
      <figcaption
        innerHTML={
          isZh()
            ? prose`实心点是 $\zeta$ 函数的零点，空心点是极点 $s = 1$；浅蓝竖带是从实部 $0$ 到实部 $1$ 的临界带。为装下前几个零点，纵轴比例经过了压缩。`
            : prose`Filled points are zeros of zeta. The open point is $s = 1$. The shaded band is the critical strip, from real part 0 to real part 1. The vertical scale is compressed.`
        }
      />
    </figure>
  );
}
