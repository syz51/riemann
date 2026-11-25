import { For, Show } from "solid-js";
import {
  CATALOG,
  childrenOf,
  CONTENTS,
  href,
  isBackgroundRoute,
  isStepRoute,
  type PageRoute,
  parentLinkOf,
  STEPS,
} from "./pages";

/** Context-aware footer navigation separating the proof spine from background branches. */
export function PageFoot(props: { route: PageRoute }) {
  const stepIndex = () =>
    isStepRoute(props.route) ? STEPS.findIndex((step) => step.route === props.route) : -1;
  const previousStep = () => (stepIndex() > 0 ? STEPS[stepIndex() - 1] : undefined);
  const nextStep = () =>
    stepIndex() >= 0 && stepIndex() < STEPS.length - 1 ? STEPS[stepIndex() + 1] : undefined;

  const parent = () => (isBackgroundRoute(props.route) ? parentLinkOf(props.route) : undefined);
  const branches = () => (isBackgroundRoute(props.route) ? childrenOf(props.route) : []);

  return (
    <nav class="page-foot" aria-label="More pages">
      <Show when={isStepRoute(props.route)}>
        <Show when={previousStep()}>
          {(step) => (
            <p>
              <span>Previous step</span>
              <a href={href(step().route)} rel="prev">
                Step {step().number}: {step().title}
              </a>
            </p>
          )}
        </Show>
        <Show when={nextStep()}>
          {(step) => (
            <p>
              <span>Next step</span>
              <a href={href(step().route)} rel="next">
                Step {step().number}: {step().title}
              </a>
            </p>
          )}
        </Show>
        <p>
          <span>Proof overview</span>
          <a href={href(CONTENTS)}>The Proof</a>
        </p>
        <p class="foot-end">
          <span>All primers</span>
          <a href={href(CATALOG)}>Background catalog</a>
        </p>
      </Show>

      <Show when={isBackgroundRoute(props.route)}>
        <Show when={parent()}>
          {(origin) => (
            <p>
              <span>Where this came up</span>
              <a href={href(origin().route)} rel="prev">
                {origin().label}
              </a>
            </p>
          )}
        </Show>
        <For each={branches()}>
          {(child) => (
            <p>
              <span>Go deeper</span>
              <a href={href(child.route)} rel="next">
                {child.title}
              </a>
            </p>
          )}
        </For>
        <p class="foot-end">
          <span>All primers</span>
          <a href={href(CATALOG)}>Background catalog</a>
        </p>
      </Show>

      <Show when={props.route === CATALOG}>
        <p>
          <span>Back to the main thread</span>
          <a href={href(CONTENTS)}>The Proof</a>
        </p>
      </Show>
    </nav>
  );
}
