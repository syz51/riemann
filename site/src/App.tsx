import { createSignal, Match, Switch } from "solid-js";
import { ComplexPage } from "./ComplexPage";
import { StepPage } from "./StepPage";
import { ZetaPage } from "./ZetaPage";

type Route = "step" | "complex" | "zeta";

// The address after "#" selects the page, so the built site needs no server
// rules and works under any sub-path.
const readRoute = (): Route => {
  if (location.hash === "#/complex-numbers") return "complex";
  if (location.hash === "#/zeta") return "zeta";
  return "step";
};

export function App() {
  const [route, setRoute] = createSignal(readRoute());
  window.addEventListener("hashchange", () => {
    setRoute(readRoute());
    window.scrollTo(0, 0);
  });
  const current = (page: Route) => (route() === page ? "page" : undefined);

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
        <nav aria-label="Pages">
          <a href="#/" aria-current={current("step")}>
            Step 1
          </a>
          <a href="#/complex-numbers" aria-current={current("complex")}>
            Background: complex numbers
          </a>
          <a href="#/zeta" aria-current={current("zeta")}>
            Background: the zeta function
          </a>
        </nav>
      </header>

      <Switch fallback={<StepPage />}>
        <Match when={route() === "complex"}>
          <ComplexPage />
        </Match>
        <Match when={route() === "zeta"}>
          <ZetaPage />
        </Match>
      </Switch>
    </>
  );
}
