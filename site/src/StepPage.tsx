import { createMemo, createSignal, For, Show } from "solid-js";
import { LeanBlock } from "./LeanBlock";
import { href } from "./pages";
import { Plane } from "./Plane";
import { step1 as step } from "./steps/step1";

/** One step of the walk-through: Lean text, contextual background links, and the picture. */
export function StepPage() {
  const [lastHovered, setLastHovered] = createSignal<string | null>(null);
  const [pinned, setPinned] = createSignal<string | null>(null);
  const [focused, setFocused] = createSignal<string | null>(null);

  // Keep the most recently inspected piece visible when moving the pointer or
  // tabbing from a Lean token into the explanation card to follow a background link.
  // A pinned piece holds its place until unpinned or another piece is pressed.
  const activeId = createMemo(() => pinned() ?? focused() ?? lastHovered());
  const active = createMemo(() => step.pieces.find((piece) => piece.id === activeId()));

  const handleHover = (piece: string | null) => {
    if (piece !== null) setLastHovered(piece);
  };

  const handleFocus = (piece: string | null) => {
    setFocused(piece);
    if (piece !== null) setLastHovered(piece);
  };

  const togglePin = (piece: string) => {
    if (pinned() === piece) {
      // Pressing an already-pinned piece closes the explanation cleanly,
      // including on touch screens where the button retains focus.
      setPinned(null);
      setFocused(null);
      setLastHovered(null);
    } else {
      setPinned(piece);
      setLastHovered(piece);
    }
  };

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
                  onHover={handleHover}
                  onFocus={handleFocus}
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
                  Point at a marked part of the Lean text to inspect it, or press it to pin its
                  explanation and any linked background page.
                </p>
              }
            >
              {(piece) => (
                <>
                  <h2 innerHTML={piece().title} />
                  <p innerHTML={piece().meaning} />
                  <Show when={piece().background}>
                    {(bg) => (
                      <a class="deeper-link" href={href(bg().route)}>
                        <span class="deeper-title">{bg().label} →</span>
                        <span class="deeper-note">{bg().note}</span>
                      </a>
                    )}
                  </Show>
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
