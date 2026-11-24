import { For, Show } from "solid-js";
import { href, STEP_COUNT, STEPS } from "./pages";

export function ContentsPage() {
  return (
    <main class="article contents">
      <h1>Contents</h1>
      <p class="summary">
        The walk-through goes one small step at a time. Below each step are the background pages
        that it needs. Read them first if the subject is new to you.
      </p>

      <ol class="steps">
        <For each={STEPS}>
          {(step) => (
            <li>
              <p class="count">Step {step.number}</p>
              <h2>
                <a href={href(step.route)}>{step.title}</a>
              </h2>
              <p innerHTML={step.summary} />
              <Show when={step.background.length > 0}>
                <h3>Background for this step</h3>
                <ul>
                  <For each={step.background}>
                    {(page) => (
                      <li>
                        <a href={href(page.route)}>{page.title}</a>
                        <span>{page.summary}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </li>
          )}
        </For>
      </ol>

      <Show when={STEPS.length < STEP_COUNT}>
        <p class="pending">
          {STEPS.length} of {STEP_COUNT} steps are written. The other steps come later.
        </p>
      </Show>
    </main>
  );
}
