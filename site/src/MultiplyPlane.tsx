import { createMemo, createSignal, For, Show } from "solid-js";
import { angle, type Complex, format, length, multiply } from "./complex";

// The picture shows real and imaginary parts from about -3.2 to 3.2. The point
// z stays within distance 1.5 of zero and w within distance 2, so that their
// product stays in the picture.
const SIZE = 360;
const CENTRE = SIZE / 2;
const UNIT = 56;
const Z_LIMIT = 1.5;
const W_LIMIT = 2;
const STEP = 0.25;
const GRID = [-3, -2, -1, 1, 2, 3];
const px = (re: number) => CENTRE + re * UNIT;
const py = (im: number) => CENTRE - im * UNIT;

const ARROWS: Record<string, Complex | undefined> = {
  ArrowLeft: { re: -STEP, im: 0 },
  ArrowRight: { re: STEP, im: 0 },
  ArrowUp: { re: 0, im: STEP },
  ArrowDown: { re: 0, im: -STEP },
};

const PRESETS: { label: string; effect: string; value: Complex }[] = [
  { label: "i", effect: "quarter turn", value: { re: 0, im: 1 } },
  { label: "−1", effect: "half turn", value: { re: -1, im: 0 } },
  { label: "2", effect: "stretch", value: { re: 2, im: 0 } },
  { label: "1 + i", effect: "turn and stretch", value: { re: 1, im: 1 } },
  { label: "0.5", effect: "shrink", value: { re: 0.5, im: 0 } },
];

/** Moves a point to the grid and keeps it in range. Zero has no direction, so it is refused. */
const settle = (raw: Complex, limit: number): Complex | undefined => {
  const z = {
    re: Math.round(raw.re / STEP) * STEP,
    im: Math.round(raw.im / STEP) * STEP,
  };
  const size = length(z);
  if (size === 0) return undefined;
  if (size <= limit) return z;
  return { re: (z.re * limit) / size, im: (z.im * limit) / size };
};

/** The name of a point, placed on the side away from zero so that names do not sit on lines. */
function Name(props: { at: Complex; text: string }) {
  const out = () => 17 / (length(props.at) * UNIT || 1);
  // The name stays inside the picture when the point is at the edge.
  const inside = (at: number, margin: number) =>
    Math.min(SIZE - margin, Math.max(margin, at));
  return (
    <text
      x={inside(px(props.at.re) + props.at.re * UNIT * out(), 24)}
      y={inside(py(props.at.im) - props.at.im * UNIT * out(), 10)}
      text-anchor="middle"
      dominant-baseline="central"
    >
      {props.text}
    </text>
  );
}

/** A point that the reader drags, or moves with the arrow keys. */
function Handle(props: {
  name: string;
  class: string;
  value: Complex;
  onMove: (raw: Complex) => void;
  onRelease: () => void;
}) {
  return (
    <g
      class={["handle", props.class]}
      tabindex="0"
      role="application"
      aria-roledescription="movable point"
      aria-label={`Point ${props.name} at ${format(props.value)}. Arrow keys move it.`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        const svg = event.currentTarget.ownerSVGElement;
        if (!svg) return;
        const box = svg.getBoundingClientRect();
        props.onMove({
          re: (((event.clientX - box.left) / box.width) * SIZE - CENTRE) / UNIT,
          im: (CENTRE - ((event.clientY - box.top) / box.height) * SIZE) / UNIT,
        });
      }}
      onPointerUp={() => props.onRelease()}
      onKeyDown={(event) => {
        const by = ARROWS[event.key];
        if (!by) return;
        event.preventDefault();
        const next = { re: props.value.re + by.re, im: props.value.im + by.im };
        // Zero is refused, so a step that would land on zero goes one step further.
        const onZero = length(next) < STEP / 2;
        props.onMove(
          onZero ? { re: next.re + by.re, im: next.im + by.im } : next,
        );
      }}
    >
      <line x1={px(0)} y1={py(0)} x2={px(props.value.re)} y2={py(props.value.im)} />
      <circle class="grab" cx={px(props.value.re)} cy={py(props.value.im)} r="18" />
      <circle class="dot" cx={px(props.value.re)} cy={py(props.value.im)} r="7" />
      <Name at={props.value} text={props.name} />
    </g>
  );
}

/** Two movable points z and w, and their product: lengths multiply, angles add. */
export function MultiplyPlane() {
  const [z, setZ] = createSignal<Complex>({ re: 1.25, im: 0.5 });
  const [w, setW] = createSignal<Complex>({ re: 0, im: 1 });
  const product = createMemo(() => multiply(z(), w()));
  const angleSum = createMemo(() => angle(z()) + angle(w()));
  // z can move to the product only when the product is in the range of z.
  const productFits = createMemo(() => {
    const size = length(product());
    return size >= STEP - 1e-9 && size <= Z_LIMIT + 1e-9;
  });
  const moveZ = (raw: Complex) => {
    const next = settle(raw, Z_LIMIT);
    if (next) setZ(next);
  };
  const moveW = (raw: Complex) => {
    const next = settle(raw, W_LIMIT);
    if (next) setW(next);
  };
  // The point that the reader did not move last is drawn on top. So when one
  // point is dropped on the other, the next press takes the other one.
  const handles = {
    z: { name: "z", value: z, onMove: moveZ },
    w: { name: "w", value: w, onMove: moveW },
  };
  const [order, setOrder] = createSignal([handles.w, handles.z]);

  return (
    <div class="multiply">
      <figure class="multiply-plane">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="group"
          aria-label="The complex plane with three points: z, w and their product."
        >
          <rect class="field" x="1" y="1" width={SIZE - 2} height={SIZE - 2} rx="6" />
          <For each={GRID}>
            {(n) => (
              <>
                <line class="grid" x1={px(n)} y1="0" x2={px(n)} y2={SIZE} />
                <line class="grid" x1="0" y1={py(n)} x2={SIZE} y2={py(n)} />
              </>
            )}
          </For>
          <line class="axis" x1="0" y1={py(0)} x2={SIZE} y2={py(0)} />
          <line class="axis" x1={px(0)} y1="0" x2={px(0)} y2={SIZE} />
          <text class="tick" x={px(1)} y={py(0) + 15} text-anchor="middle">
            1
          </text>
          <text class="tick" x={px(0) - 7} y={py(1) + 14} text-anchor="end">
            i
          </text>

          <g class="product">
            <line x1={px(0)} y1={py(0)} x2={px(product().re)} y2={py(product().im)} />
            <rect
              x={px(product().re) - 6}
              y={py(product().im) - 6}
              width="12"
              height="12"
            />
            <Name at={product()} text="z × w" />
          </g>
          <For each={order()}>
            {(handle) => (
              <Handle
                name={handle.name}
                class={handle.name}
                value={handle.value()}
                onMove={handle.onMove}
                onRelease={() =>
                  setOrder(
                    handle === handles.z
                      ? [handles.z, handles.w]
                      : [handles.w, handles.z],
                  )
                }
              />
            )}
          </For>
        </svg>
        <figcaption>
          Drag z or w, or select a point and use the arrow keys. The square
          point is the product.
        </figcaption>
      </figure>

      <div class="multiply-side">
        <table>
          <thead>
            <tr>
              <th scope="col">Point</th>
              <th scope="col">Number</th>
              <th scope="col">Length</th>
              <th scope="col">Angle</th>
            </tr>
          </thead>
          <tbody>
            <For
              each={[
                { name: "z", class: "z", value: z },
                { name: "w", class: "w", value: w },
                { name: "z × w", class: "product", value: product },
              ]}
            >
              {(row) => (
                <tr class={row.class}>
                  <th scope="row">{row.name}</th>
                  <td>{format(row.value())}</td>
                  <td>{length(row.value()).toFixed(2)}</td>
                  <td>{Math.round(angle(row.value()))}°</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <p class="rule">
          Lengths multiply: {length(z()).toFixed(2)} × {length(w()).toFixed(2)} ≈{" "}
          {length(product()).toFixed(2)}.
          <br />
          Angles add: {Math.round(angle(z()))}° + {Math.round(angle(w()))}° ≈{" "}
          {Math.round(angleSum())}°
          {angleSum() >= 360
            ? `, which is the same direction as ${Math.round(angle(product()))}°.`
            : "."}
          <br />
          <span class="note">The values shown are rounded.</span>
        </p>

        <p class="label" id="w-presets">
          Set w to
        </p>
        <div class="presets" role="group" aria-labelledby="w-presets">
          <For each={PRESETS}>
            {(preset) => (
              <button type="button" onClick={() => setW(preset.value)}>
                <span class="value">{preset.label}</span> {preset.effect}
              </button>
            )}
          </For>
        </div>
        <button
          type="button"
          class="again"
          aria-disabled={productFits() ? "false" : "true"}
          onClick={() => {
            if (productFits()) setZ(product());
          }}
        >
          Move z to z × w
        </button>
        <Show when={!productFits()}>
          <p class="note">
            Not possible now: in this picture, the length of z stays between{" "}
            {STEP} and {Z_LIMIT}.
          </p>
        </Show>
        <p class="hint">
          Set w to i and press this button two times. Two quarter turns make a
          half turn, so z lands on −z. This is the rule i × i = −1 as a picture.
        </p>
      </div>
    </div>
  );
}
