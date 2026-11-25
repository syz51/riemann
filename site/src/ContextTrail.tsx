import { For, Show } from "solid-js";
import { backgroundOf, type BackgroundRoute, href, rootStepOf, trailOf } from "./pages";

/** Breadcrumb trail showing where a background page branches off from the proof. */
export function ContextTrail(props: { route: BackgroundRoute }) {
  const current = () => backgroundOf(props.route);
  const trail = () => trailOf(props.route);
  const rootStep = () => rootStepOf(props.route);

  return (
    <nav class="context-trail" aria-label="Proof path">
      <ol>
        <For each={trail()}>
          {(crumb) => (
            <li>
              <a href={href(crumb.route)}>{crumb.label}</a>
            </li>
          )}
        </For>
        <Show when={current()}>{(entry) => <li aria-current="page">{entry().shortTitle}</li>}</Show>
      </ol>
      <Show when={rootStep()}>
        {(step) => (
          <a class="trail-return" href={href(step().route)}>
            ← Return to Step {step().number}
          </a>
        )}
      </Show>
    </nav>
  );
}
