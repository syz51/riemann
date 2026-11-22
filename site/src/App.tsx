import { createMemo, createSignal, For, Show } from "solid-js";
import { LeanBlock } from "./LeanBlock";
import { Plane } from "./Plane";
import { step1 as step } from "./steps/step1";

export function App() {
  const [hovered, setHovered] = createSignal<string | null>(null);
  const [pinned, setPinned] = createSignal<string | null>(null);
  const activeId = createMemo(() => hovered() ?? pinned());
  const active = createMemo(() =>
    step.pieces.find((piece) => piece.id === activeId()),
  );
  const togglePin = (piece: string) =>
    setPinned((current) => (current === piece ? null : piece));

  return (
    <>
      <header class="site">
        <p class="project">The proof of the Riemann hypothesis, step by step</p>
        <p class="about">
          A reading of Alpöge's Lean proof, one small step at a time.{" "}
          <a href="https://github.com/syz51/riemann">Notes and sources</a>
        </p>
      </header>

      <main>
        <p class="count">
          Step {step.number} of {step.of}
        </p>
        <h1>{step.title}</h1>
        <p class="summary">{step.summary}</p>

        <div class="columns">
          <div class="reading">
            <For each={step.snippets}>
              {(snippet) => (
                <section>
                  <h2>{snippet.heading}</h2>
                  <p>{snippet.intro}</p>
                  <LeanBlock
                    snippet={snippet}
                    active={activeId()}
                    pinned={pinned()}
                    onHover={setHovered}
                    onPin={togglePin}
                  />
                </section>
              )}
            </For>
          </div>

          <aside class="side">
            <div id="explanation" class="explanation" aria-live="polite">
              <Show
                when={active()}
                fallback={
                  <p class="hint">
                    Point at a marked part of the Lean text, or press it to
                    keep its explanation open.
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
            <Plane mark={active()?.mark} />
          </aside>
        </div>

        <section class="next">
          <h2>Next</h2>
          <p>{step.next}</p>
        </section>
      </main>
    </>
  );
}
