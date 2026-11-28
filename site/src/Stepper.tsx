import { createEffect, createSignal, For, Show } from "solid-js";
import { isZh } from "./i18n";

/** `equation` comes from a tex literal and `text` from a prose literal (see tex.d.ts). */
export type Part = { title: string; titleHtml?: Markup; equation: Markup; text: Markup };

/** One calculation, shown one part at a time. */
export function Stepper(props: { parts: Part[] }) {
  const [index, setIndex] = createSignal(0);
  const last = () => Math.max(0, props.parts.length - 1);
  const current = () => props.parts[index()];
  let slotsEl: HTMLDivElement | undefined;

  createEffect(
    () => index(),
    () => {
      if (!slotsEl) return;
      for (const eq of slotsEl.querySelectorAll<HTMLElement>(".equation")) {
        eq.scrollLeft = 0;
      }
    },
  );

  return (
    <Show when={props.parts.length > 0}>
      <div class="stepper">
        {/* Announce the active part number and title to screen readers on change. */}
        <p class="sr-only" aria-live="polite">
          {isZh()
            ? `第 ${index() + 1} 步（共 ${props.parts.length} 步）：${current()?.title ?? ""}`
            : `Part ${index() + 1} of ${props.parts.length}: ${current()?.title ?? ""}`}
        </p>
        {/* Two-column desktop layout: the clickable outline rail on the left anchors
            card height with useful navigation instead of blank space, while single-cell
            whole-part stacking on the right keeps 0px layout shift across parts. */}
        <div class="stepper-grid">
          <nav class="stepper-rail" aria-label={isZh() ? "推导步骤" : "Calculation parts"}>
            <For each={props.parts}>
              {(part, at) => (
                <button
                  type="button"
                  class="stepper-step"
                  aria-current={at() === index() ? "step" : undefined}
                  onClick={() => setIndex(at())}
                >
                  <span class="stepper-num">{at() + 1}.</span>
                  <Show when={part.titleHtml} fallback={<span>{part.title}</span>}>
                    {(html) => <span innerHTML={html()} />}
                  </Show>
                </button>
              )}
            </For>
          </nav>
          <div class="stepper-panel">
            <div class="stepper-bar">
              <p class="count">
                {isZh()
                  ? `第 ${index() + 1} / ${props.parts.length} 步`
                  : `Part ${index() + 1} of ${props.parts.length}`}
              </p>
              <div class="controls">
                <button
                  type="button"
                  aria-disabled={index() <= 0 ? "true" : "false"}
                  onClick={() => setIndex(Math.max(0, index() - 1))}
                >
                  {isZh() ? "上一步" : "Back"}
                </button>
                <button
                  type="button"
                  aria-disabled={index() >= last() ? "true" : "false"}
                  onClick={() => setIndex(Math.min(last(), index() + 1))}
                >
                  {isZh() ? "下一步" : "Next part"}
                </button>
              </div>
            </div>
            <div
              ref={(el) => {
                slotsEl = el;
              }}
              class="stepper-slots"
            >
              <For each={props.parts}>
                {(part, at) => (
                  <div
                    class={["part", { current: at() === index() }]}
                    aria-hidden={at() !== index() ? "true" : undefined}
                  >
                    <Show when={part.titleHtml} fallback={<h3>{part.title}</h3>}>
                      {(html) => <h3 innerHTML={html()} />}
                    </Show>
                    <p class="equation" innerHTML={part.equation} />
                    <p innerHTML={part.text} />
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
