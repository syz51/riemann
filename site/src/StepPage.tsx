import { createMemo, createSignal, For, Show } from "solid-js";
import { LeanBlock } from "./LeanBlock";
import { href } from "./pages";
import { Plane } from "./Plane";
import { step1 as step } from "./steps/step1";

/** One step of the walk-through: Lean text, its explanations and the picture. */
export function StepPage() {
  const [hovered, setHovered] = createSignal<string | null>(null);
  const [pinned, setPinned] = createSignal<string | null>(null);
  const [focused, setFocused] = createSignal<string | null>(null);
  // The pointer wins over keyboard focus, and both win over the pinned piece.
  const activeId = createMemo(() => hovered() ?? focused() ?? pinned());
  const active = createMemo(() => step.pieces.find((piece) => piece.id === activeId()));
  const togglePin = (piece: string) => {
    if (pinned() === piece) {
      // A press that releases the pin also drops the focus state, so that the
      // explanation closes on a touch screen, where the button keeps focus.
      setPinned(null);
      setFocused(null);
    } else {
      setPinned(piece);
    }
  };

  return (
    <main>
      <p class="count">
        Step {step.number} of {step.of}
      </p>
      <h1>{step.title}</h1>
      <p class="summary">{step.summary}</p>
      <p class="aside-link">
        New to complex numbers? Read <a href={href("complex-numbers")}>why complex numbers exist</a>{" "}
        first. New to the zeta function? Read{" "}
        <a href={href("zeta")}>where the zeta function came from</a>.
      </p>

      <div class="columns">
        <div class="reading">
          <For each={step.snippets}>
            {(snippet, index) => (
              <section>
                <h2>{snippet.heading}</h2>
                <p>{snippet.intro}</p>
                <LeanBlock
                  snippet={snippet}
                  active={activeId()}
                  pinned={pinned()}
                  onHover={setHovered}
                  onFocus={setFocused}
                  onPin={togglePin}
                />
                <Show when={index() === 0}>
                  <div class="plane-inline">
                    <Plane mark={active()?.mark} />
                  </div>
                </Show>
              </section>
            )}
          </For>
          <section class="next">
            <h2>Next</h2>
            <p>{step.next}</p>
          </section>
        </div>

        <aside class="side">
          <div id="explanation" class="explanation" aria-live="polite">
            <Show
              when={active()}
              fallback={
                <p class="hint">
                  Point at a marked part of the Lean text, or press it to keep its explanation open.
                </p>
              }
            >
              {(piece) => (
                <>
                  <h2>{piece().title}</h2>
                  <p>{piece().meaning}</p>
                </>
              )}
            </Show>
          </div>
          <div class="plane-side">
            <Plane mark={active()?.mark} />
          </div>
        </aside>
      </div>
    </main>
  );
}
