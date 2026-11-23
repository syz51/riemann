import { createMemo, createSignal, For, Show } from "solid-js";

// The chart: the sum over the whole numbers up to N, and the product over the
// primes up to N, for one power s. Both are computed on the page.
const MAX = 100;
const WIDTH = 600;
const HEIGHT = 300;
const LEFT = 44;
const RIGHT = 16;
const TOP = 14;
const BOTTOM = 38;
const PLOT_W = WIDTH - LEFT - RIGHT;
const PLOT_H = HEIGHT - TOP - BOTTOM;
const X_TICKS = [1, 25, 50, 75, 100];
const Y_STEPS = [0.02, 0.05, 0.1, 0.2, 0.5, 1, 2];

const POWERS: { s: number; label: string; term: string }[] = [
  { s: 2, label: "Squares", term: "1/n²" },
  { s: 3, label: "Third powers", term: "1/n³" },
  { s: 4, label: "Fourth powers", term: "1/n⁴" },
  { s: 1, label: "No power", term: "1/n" },
];

const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

const PRIMES = Array.from({ length: MAX }, (_, i) => i + 1).filter(isPrime);

/** sums[n] and products[n] for n from 1 to MAX; index 0 is not used. */
function series(s: number) {
  const sums = [0];
  const products = [1];
  for (let n = 1; n <= MAX; n++) {
    sums.push(sums[n - 1]! + n ** -s);
    products.push(isPrime(n) ? products[n - 1]! / (1 - n ** -s) : products[n - 1]!);
  }
  return { sums, products };
}

/** The value that the sum approaches. For s = 1 there is none. */
function limit(s: number): number | undefined {
  if (s === 1) return undefined;
  const terms = 200_000;
  let sum = 0;
  for (let n = terms; n >= 1; n--) sum += n ** -s;
  // The rest of the sum, after `terms` terms, is close to this integral.
  return sum + terms ** (1 - s) / (s - 1);
}

const x = (n: number) => LEFT + ((n - 1) / (MAX - 1)) * PLOT_W;

export function SumProduct() {
  const [power, setPower] = createSignal(POWERS[0]!);
  const [count, setCount] = createSignal(20);

  const data = createMemo(() => series(power().s));
  const target = createMemo(() => limit(power().s));
  const top = createMemo(() => (target() ?? data().products[MAX]!) * 1.02);
  const y = (value: number) => TOP + (1 - (value - 1) / (top() - 1)) * PLOT_H;

  const yTicks = createMemo(() => {
    const range = top() - 1;
    const step = Y_STEPS.find((candidate) => range / candidate <= 5) ?? 2;
    const ticks: number[] = [];
    for (let value = 1; value <= top(); value += step) ticks.push(value);
    return ticks;
  });

  // A value holds from one whole number to the next, so the line has steps.
  const path = (values: number[]) => {
    let d = `M${x(1)},${y(values[1]!)}`;
    for (let n = 2; n <= count(); n++) d += `H${x(n)}V${y(values[n]!)}`;
    return d;
  };

  const sum = () => data().sums[count()]!;
  const product = () => data().products[count()]!;
  const used = () => PRIMES.filter((prime) => prime <= count());
  const digits = (value: number) => value.toFixed(4);

  return (
    <div class="sumprod">
      <p class="label" id="power-choice">
        Terms of the sum
      </p>
      <div class="presets" role="group" aria-labelledby="power-choice">
        <For each={POWERS}>
          {(choice) => (
            <button
              type="button"
              aria-pressed={power() === choice ? "true" : "false"}
              onClick={() => setPower(choice)}
            >
              <span class="value">{choice.term}</span> {choice.label}
            </button>
          )}
        </For>
      </div>

      <label class="slider">
        <span>
          Count up to N = <strong>{count()}</strong>
        </span>
        <input
          type="range"
          min="1"
          max={MAX}
          step="1"
          value={count()}
          onInput={(event) => setCount(Number(event.currentTarget.value))}
        />
      </label>

      <ul class="legend">
        <li class="sum">Sum over the whole numbers up to N</li>
        <li class="product">Product over the primes up to N</li>
        <Show when={target() !== undefined}>
          <li class="target">The value that both approach</li>
        </Show>
      </ul>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Chart for the terms ${power().term}. At N = ${count()}, the sum is about ${digits(sum())} and the product is about ${digits(product())}.`}
      >
        <For each={yTicks()}>
          {(tick) => (
            <>
              <line class="grid" x1={LEFT} x2={WIDTH - RIGHT} y1={y(tick)} y2={y(tick)} />
              <text class="tick" x={LEFT - 8} y={y(tick) + 4} text-anchor="end">
                {Number(tick.toFixed(2))}
              </text>
            </>
          )}
        </For>
        <For each={X_TICKS}>
          {(tick) => (
            <text class="tick" x={x(tick)} y={HEIGHT - BOTTOM + 18} text-anchor="middle">
              {tick}
            </text>
          )}
        </For>
        <text class="tick title" x={LEFT + PLOT_W / 2} y={HEIGHT - 4} text-anchor="middle">
          N
        </text>

        <Show when={target()}>
          {(value) => (
            <line class="target" x1={LEFT} x2={WIDTH - RIGHT} y1={y(value())} y2={y(value())} />
          )}
        </Show>
        <line class="guide" x1={x(count())} x2={x(count())} y1={TOP} y2={HEIGHT - BOTTOM} />
        <path class="sum" d={path(data().sums)} />
        <path class="product" d={path(data().products)} />
        <circle class="sum" cx={x(count())} cy={y(sum())} r="4.5" />
        <circle class="product" cx={x(count())} cy={y(product())} r="4.5" />
      </svg>

      <table>
        <caption>The values at N = {count()}, rounded</caption>
        <tbody>
          <tr>
            <th scope="row">Sum of the first {count()} terms</th>
            <td>{digits(sum())}</td>
          </tr>
          <tr>
            <th scope="row">
              Product over {used().length} {used().length === 1 ? "prime" : "primes"}
              <Show when={used().length > 0}>
                {" "}
                ({used().length > 4
                  ? `2, 3, 5, … , ${used()[used().length - 1]}`
                  : used().join(", ")})
              </Show>
            </th>
            <td>{digits(product())}</td>
          </tr>
          <tr>
            <th scope="row">The value that both approach</th>
            <td>
              <Show when={target()} fallback="None. Both grow without limit.">
                {(value) => digits(value())}
              </Show>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
