import { createSignal, Match, onSettled, Show, Switch } from "solid-js";
import { BackgroundPage } from "./BackgroundPage";
import { ComplexPage } from "./ComplexPage";
import { ContentsPage } from "./ContentsPage";
import { GammaPage } from "./GammaPage";
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
import { StepPage } from "./StepPage";
import { ZetaPage } from "./ZetaPage";

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
        <a class="brand" href={href(CONTENTS)}>
          <span class="brand-mark" aria-hidden="true" />
          <span class="project">The Riemann Hypothesis</span>
        </a>
        <nav aria-label="Site">
          <a
            href={href(CONTENTS)}
            class={{ active: isProofSection(route()) }}
            aria-current={route() === CONTENTS ? "page" : undefined}
          >
            The Proof
          </a>
          <a
            href={href(CATALOG)}
            class={{ active: isBackgroundSection(route()) }}
            aria-current={route() === CATALOG ? "page" : undefined}
          >
            Background <span class="nav-count">{BACKGROUNDS.length}</span>
          </a>
          <button
            type="button"
            class="theme-toggle"
            aria-label={
              theme() === "dark"
                ? "Color theme: dark. Switch to light theme"
                : "Color theme: light. Switch to dark theme"
            }
            title={theme() === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggleTheme}
          >
            <span aria-hidden="true">{theme() === "dark" ? "☾" : "☀"}</span>{" "}
            <span>{theme() === "dark" ? "Dark" : "Light"}</span>
          </button>
        </nav>
      </header>

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

      <Show when={route() || undefined}>{(page) => <PageFoot route={page()} />}</Show>
      <footer class="site-credit">
        <p>
          A reading of Alpöge's Lean proof ·{" "}
          <a href="https://github.com/syz51/riemann">Notes and sources on GitHub</a>
        </p>
      </footer>
    </>
  );
}
