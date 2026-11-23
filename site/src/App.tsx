import { createSignal, Match, Show, Switch } from "solid-js";
import { ComplexPage } from "./ComplexPage";
import { GammaPage } from "./GammaPage";
import { ContentsPage } from "./ContentsPage";
import { PageFoot } from "./PageFoot";
import { CONTENTS, href, routeOf } from "./pages";
import { StepPage } from "./StepPage";
import { ZetaPage } from "./ZetaPage";

export function App() {
  // The address after "#" selects the page, so the built site needs no server
  // rules and works under any sub-path.
  const [route, setRoute] = createSignal(routeOf(location.hash));
  window.addEventListener("hashchange", () => {
    setRoute(routeOf(location.hash));
    window.scrollTo(0, 0);
  });

  return (
    <>
      <header class="site">
        <div>
          <p class="project">The proof of the Riemann hypothesis, step by step</p>
          <p class="about">
            A reading of Alpöge's Lean proof, one small step at a time.{" "}
            <a href="https://github.com/syz51/riemann">Notes and sources</a>
          </p>
        </div>
        {/* One link, whatever the number of pages: the list is on the contents page. */}
        <nav aria-label="Site">
          <a href={href(CONTENTS)} aria-current={route() === CONTENTS ? "page" : undefined}>
            Contents
          </a>
        </nav>
      </header>

      <Switch fallback={<ContentsPage />}>
        <Match when={route() === "step-1"}>
          <StepPage />
        </Match>
        <Match when={route() === "complex-numbers"}>
          <ComplexPage />
        </Match>
        <Match when={route() === "zeta"}>
          <ZetaPage />
        </Match>
        <Match when={route() === "gamma"}>
          <GammaPage />
        </Match>
      </Switch>

      <Show when={route() || undefined}>{(page) => <PageFoot route={page()} />}</Show>
    </>
  );
}
