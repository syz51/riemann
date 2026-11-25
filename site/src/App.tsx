import { createSignal, lazy, Loading, Match, onSettled, Show, Switch } from "solid-js";
import { ContentsPage } from "./ContentsPage";
import { PageFoot } from "./PageFoot";
import {
  BACKGROUNDS,
  CATALOG,
  CONTENTS,
  href,
  isBackgroundSection,
  isProofSection,
  routeOf,
} from "./pages";

const StepPage = lazy(() => import("./StepPage").then((m) => ({ default: m.StepPage })));
const BackgroundPage = lazy(() =>
  import("./BackgroundPage").then((m) => ({ default: m.BackgroundPage })),
);
const ComplexPage = lazy(() => import("./ComplexPage").then((m) => ({ default: m.ComplexPage })));
const ZetaPage = lazy(() => import("./ZetaPage").then((m) => ({ default: m.ZetaPage })));
const GammaPage = lazy(() => import("./GammaPage").then((m) => ({ default: m.GammaPage })));

type Theme = "light" | "dark";
const THEME_KEY = "riemann-theme";

const readInitialTheme = (): Theme => {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function App() {
  // The address after "#" selects the page, so the built site needs no server
  // rules and works under any sub-path.
  const [route, setRoute] = createSignal(routeOf(location.hash));
  const [theme, setTheme] = createSignal<Theme>(readInitialTheme());

  onSettled(() => {
    const onHash = () => {
      setRoute(routeOf(location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = (event: MediaQueryListEvent) => {
      if (!document.documentElement.dataset.theme) {
        setTheme(event.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onScheme);

    return () => {
      window.removeEventListener("hashchange", onHash);
      media.removeEventListener("change", onScheme);
    };
  });

  const toggleTheme = () => {
    const next: Theme = theme() === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore storage errors in restricted environments; DOM theme still updates.
    }
  };

  return (
    <>
      <header class="site">
        <div class="site-identity">
          <a class="brand" href={href(CONTENTS)}>
            <span class="brand-mark" aria-hidden="true" />
            <span class="project">The Riemann hypothesis, step by step</span>
          </a>
          <p class="about">
            A reading of Alpöge's Lean proof.{" "}
            <a href="https://github.com/syz51/riemann">Notes and sources</a>
          </p>
        </div>
        <nav aria-label="Site">
          <a href={href(CONTENTS)} aria-current={isProofSection(route()) ? "page" : undefined}>
            The Proof
          </a>
          <a href={href(CATALOG)} aria-current={isBackgroundSection(route()) ? "page" : undefined}>
            Background <span class="nav-count">{BACKGROUNDS.length}</span>
          </a>
          <button
            type="button"
            class="theme-toggle"
            aria-label={theme() === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggleTheme}
          >
            {theme() === "dark" ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

      <Loading fallback={null}>
        <Switch fallback={<ContentsPage />}>
          <Match when={route() === "step-1"}>
            <StepPage />
          </Match>
          <Match when={route() === CATALOG}>
            <BackgroundPage />
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
      </Loading>

      <Show when={route() || undefined}>{(page) => <PageFoot route={page()} />}</Show>
    </>
  );
}
