import { createSignal, Show } from "solid-js";
import { ComplexPage } from "./ComplexPage";
import { StepPage } from "./StepPage";

type Route = "step" | "complex";

// The address after "#" selects the page, so the built site needs no server
// rules and works under any sub-path.
const readRoute = (): Route =>
  location.hash === "#/complex-numbers" ? "complex" : "step";

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
        </nav>
      </header>

      <Show when={route() === "complex"} fallback={<StepPage />}>
        <ComplexPage />
      </Show>
    </>
  );
}
