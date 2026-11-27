import { createSignal, Match, onSettled, Show, Switch } from "solid-js";
import { BackgroundPage } from "./BackgroundPage";
import { ComplexPage } from "./ComplexPage";
import { ContentsPage } from "./ContentsPage";
import { GammaPage } from "./GammaPage";
import { PageFoot } from "./PageFoot";
import {
  CATALOG,
  CONTENTS,
  href,
  isBackgroundSection,
  isProofSection,
  parseHash,
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
    const prevRestoration = "scrollRestoration" in history ? history.scrollRestoration : undefined;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    let keyCounter = 0;
    const makeKey = () => `nav-${Date.now()}-${++keyCounter}`;
    const readScrollKey = (): string | undefined => {
      const state = history.state as { scrollKey?: unknown } | null;
      return typeof state?.scrollKey === "string" ? state.scrollKey : undefined;
    };

    const stampKey = (key: string) => {
      const prev =
        history.state && typeof history.state === "object"
          ? (history.state as Record<string, unknown>)
          : {};
      history.replaceState({ ...prev, scrollKey: key }, "");
    };

    const savedScroll = new Map<string, number>();
    let currentKey = readScrollKey() ?? makeKey();
    if (!readScrollKey()) stampKey(currentKey);
    let lastHref = location.href;
    let restoring = false;
    let rafId = 0;

    const scrollToTarget = (
      targetKey: string,
      isHistoryReturn: boolean,
      targetSection: string | undefined,
    ) => {
      cancelAnimationFrame(rafId);
      restoring = true;
      rafId = requestAnimationFrame(() => {
        if (targetKey !== currentKey) return;
        if (isHistoryReturn) {
          window.scrollTo(0, savedScroll.get(targetKey) ?? 0);
        } else if (targetSection) {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: "auto", block: "start" });
          } else {
            window.scrollTo(0, 0);
          }
        } else {
          window.scrollTo(0, 0);
        }
        savedScroll.set(targetKey, window.scrollY);
        restoring = false;
      });
    };

    // Honor an initial deep link such as #/zeta#euler-1749 on first load.
    const initialSection = parseHash(location.hash).section;
    if (initialSection) {
      scrollToTarget(currentKey, false, initialSection);
    } else {
      savedScroll.set(currentKey, window.scrollY);
    }

    const onScroll = () => {
      if (!restoring) savedScroll.set(currentKey, window.scrollY);
    };

    const onNavigate = () => {
      const existingKey = readScrollKey();
      if (location.href === lastHref && existingKey === currentKey) return;
      if (!restoring) savedScroll.set(currentKey, window.scrollY);
      lastHref = location.href;

      const next = parseHash(location.hash);
      const isHistoryReturn = existingKey !== undefined && savedScroll.has(existingKey);

      if (isHistoryReturn) {
        currentKey = existingKey;
      } else {
        currentKey = existingKey ?? makeKey();
        stampKey(currentKey);
      }

      setRoute(next.route);
      scrollToTarget(currentKey, isHistoryReturn, next.section);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onNavigate);
    window.addEventListener("hashchange", onNavigate);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = (event: MediaQueryListEvent) => {
      if (!document.documentElement.dataset.theme) {
        setTheme(event.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onScheme);

    return () => {
      cancelAnimationFrame(rafId);
      if (prevRestoration !== undefined) history.scrollRestoration = prevRestoration;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onNavigate);
      window.removeEventListener("hashchange", onNavigate);
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
            Background
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
