import { createSignal, For } from "solid-js";

/** `equation` comes from a tex literal and `text` from a prose literal (see tex.d.ts). */
export type Part = { title: string; equation: Markup; text: Markup };

/** One calculation, shown one part at a time. */
export function Stepper(props: { parts: Part[] }) {
  const [index, setIndex] = createSignal(0);
  const last = () => props.parts.length - 1;

  return (
    <div class="stepper">
      {/* Every part is on the page, one upon the other, and only one shows. So the box has
          the height of the tallest part, and nothing moves when the part changes. */}
      <div class="parts" aria-live="polite">
        <For each={props.parts}>
          {(part, at) => (
            <div class={at() === index() ? "part current" : "part"}>
              <p class="count">
                Part {at() + 1} of {props.parts.length}
              </p>
              <h3>{part.title}</h3>
              <p class="equation" innerHTML={part.equation} />
              <p innerHTML={part.text} />
            </div>
          )}
        </For>
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
