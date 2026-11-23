import { createSignal } from "solid-js";

export type Part = { title: string; equation: string; text: string };

/** One calculation, shown one part at a time. */
export function Stepper(props: { parts: Part[] }) {
  const [index, setIndex] = createSignal(0);
  const last = () => props.parts.length - 1;
  const part = () => props.parts[index()]!;

  return (
    <div class="stepper">
      <div class="part" aria-live="polite">
        <p class="count">
          Part {index() + 1} of {props.parts.length}
        </p>
        <h3>{part().title}</h3>
        <p class="equation">{part().equation}</p>
        <p>{part().text}</p>
      </div>
      <div class="controls">
        <button
          type="button"
          aria-disabled={index() === 0 ? "true" : "false"}
          onClick={() => setIndex(Math.max(0, index() - 1))}
        >
          Back
        </button>
        <button
          type="button"
          aria-disabled={index() === last() ? "true" : "false"}
          onClick={() => setIndex(Math.min(last(), index() + 1))}
        >
          Next part
        </button>
      </div>
    </div>
  );
}
