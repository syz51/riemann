import { createSignal, Show } from "solid-js";

/** `equation` comes from a tex literal and `text` from a prose literal (see tex.d.ts). */
export type Part = { title: string; titleHtml?: Markup; equation: Markup; text: Markup };

/** One calculation, shown one part at a time. */
export function Stepper(props: { parts: Part[] }) {
  const [index, setIndex] = createSignal(0);
  const last = () => props.parts.length - 1;
  const current = () => props.parts[index()];

  return (
    <div class="stepper">
      {/* Announce the active part number and title to screen readers on change. */}
      <p class="sr-only" aria-live="polite">
        Part {index() + 1} of {props.parts.length}: {current()?.title}
      </p>
      {/* Keep navigation in a fixed top bar so Back / Next part never shift under the
          pointer, while the body below sizes naturally to the current part with no blank space. */}
      <div class="stepper-bar">
        <p class="count">
          Part {index() + 1} of {props.parts.length}
        </p>
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
      <Show when={current()}>
        {(part) => (
          <div class="part">
            <Show when={part().titleHtml} fallback={<h3>{part().title}</h3>}>
              {(html) => <h3 innerHTML={html()} />}
            </Show>
            <p class="equation" innerHTML={part().equation} />
            <p innerHTML={part().text} />
          </div>
        )}
      </Show>
    </div>
  );
}
