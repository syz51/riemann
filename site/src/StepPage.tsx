import { createMemo, createSignal, For, onSettled, Show } from "solid-js";
import { LeanBlock } from "./LeanBlock";
import { href } from "./pages";
import { Plane } from "./Plane";
import { step1 as step } from "./steps/step1";

/** One step of the walk-through: Lean text, contextual background links, and the picture. */
export function StepPage() {
  const [hovered, setHovered] = createSignal<string | null>(null);
  const [pinned, setPinned] = createSignal<string | null>(null);
  const [focused, setFocused] = createSignal<string | null>(null);

  // Live hover and keyboard focus preview any token freely; leaving or blurring
  // returns to the pinned token so a reader can pin a token and follow its
  // background link in the explanation panel.
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

  onSettled(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && pinned() !== null) setPinned(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main>
      <p class="count">
        Step {step.number} of {step.of}
      </p>
      <h1>{step.title}</h1>
      <p class="summary" innerHTML={step.summary} />

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
          {/* Stack the hint and every explanation in one grid cell so the tallest
              piece sets the card height and the plane below never shifts on hover. */}
          <div id="explanation" class="explanation" aria-live="polite">
            <div
              class={["explanation-slot", { current: activeId() === null }]}
              aria-hidden={activeId() !== null ? "true" : undefined}
            >
              <p class="hint">
                Point at a marked part of the Lean text to preview it, or press it to pin its
                explanation and follow any linked background page.
              </p>
            </div>
            <For each={step.pieces}>
              {(piece) => (
                <div
                  class={["explanation-slot", { current: activeId() === piece.id }]}
                  aria-hidden={activeId() !== piece.id ? "true" : undefined}
                >
                  <h2 innerHTML={piece.title} />
                  <p innerHTML={piece.meaning} />
                  <Show when={piece.background}>
                    {(bg) => (
                      <a class="deeper-link" href={href(bg().route)}>
                        <span class="deeper-title">{bg().label} →</span>
                        <span class="deeper-note">{bg().note}</span>
                      </a>
                    )}
                  </Show>
                </div>
              )}
            </For>
          </div>
          <div class="plane-side">
            <Plane mark={active()?.mark} />
          </div>
        </aside>
      </div>
    </main>
  );
}
