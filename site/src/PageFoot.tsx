import { For, Show } from "solid-js";
import { isZh, lang } from "./i18n";
import {
  CATALOG,
  childrenOf,
  CONTENTS,
  href,
  isBackgroundRoute,
  isStepRoute,
  type PageRoute,
  parentLinkOf,
  stepsFor,
} from "./pages";

/** Context-aware footer navigation separating the proof spine from background branches. */
export function PageFoot(props: { route: PageRoute }) {
  const steps = () => stepsFor(lang());
  const stepIndex = () =>
    isStepRoute(props.route) ? steps().findIndex((step) => step.route === props.route) : -1;
  const previousStep = () => (stepIndex() > 0 ? steps()[stepIndex() - 1] : undefined);
  const nextStep = () =>
    stepIndex() >= 0 && stepIndex() < steps().length - 1 ? steps()[stepIndex() + 1] : undefined;

  const parent = () =>
    isBackgroundRoute(props.route) ? parentLinkOf(props.route, lang()) : undefined;
  const branches = () => (isBackgroundRoute(props.route) ? childrenOf(props.route, lang()) : []);

  return (
    <nav class="page-foot" aria-label={isZh() ? "更多页面" : "More pages"}>
      <Show when={isStepRoute(props.route)}>
        <Show when={previousStep()}>
          {(step) => (
            <p>
              <span>{isZh() ? "上一步" : "Previous step"}</span>
              <a href={href(step().route)} rel="prev">
                {isZh()
                  ? `第 ${step().number} 步：${step().title}`
                  : `Step ${step().number}: ${step().title}`}
              </a>
            </p>
          )}
        </Show>
        <Show when={nextStep()}>
          {(step) => (
            <p>
              <span>{isZh() ? "下一步" : "Next step"}</span>
              <a href={href(step().route)} rel="next">
                {isZh()
                  ? `第 ${step().number} 步：${step().title}`
                  : `Step ${step().number}: ${step().title}`}
              </a>
            </p>
          )}
        </Show>
        <p>
          <span>{isZh() ? "证明总览" : "Proof overview"}</span>
          <a href={href(CONTENTS)}>{isZh() ? "证明路线" : "The Proof"}</a>
        </p>
        <p class="foot-end">
          <span>{isZh() ? "全部背景" : "All primers"}</span>
          <a href={href(CATALOG)}>{isZh() ? "数学背景目录" : "Background catalog"}</a>
        </p>
      </Show>

      <Show when={isBackgroundRoute(props.route)}>
        <Show when={parent()}>
          {(origin) => (
            <p>
              <span>{isZh() ? "出自哪里" : "Where this came up"}</span>
              <a href={href(origin().route)} rel="prev">
                {origin().label}
              </a>
            </p>
          )}
        </Show>
        <For each={branches()}>
          {(child) => (
            <p>
              <span>{isZh() ? "继续深入" : "Go deeper"}</span>
              <a href={href(child.route)} rel="next">
                {child.title}
              </a>
            </p>
          )}
        </For>
        <p>
          <span>{isZh() ? "全部背景" : "All primers"}</span>
          <a href={href(CATALOG)}>{isZh() ? "数学背景目录" : "Background catalog"}</a>
        </p>
      </Show>

      <Show when={props.route === CATALOG}>
        <p>
          <span>{isZh() ? "回到主线" : "Back to the main thread"}</span>
          <a href={href(CONTENTS)}>{isZh() ? "证明路线" : "The Proof"}</a>
        </p>
      </Show>
    </nav>
  );
}
