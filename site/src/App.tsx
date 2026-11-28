import { createEffect, createSignal, Match, onSettled, Show, Switch } from "solid-js";
import { BackgroundPage } from "./BackgroundPage";
import { ComplexPage } from "./ComplexPage";
import { ContentsPage } from "./ContentsPage";
import { GammaPage } from "./GammaPage";
import { isZh, lang, setLang } from "./i18n";
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
const SCROLL_KEY = "riemann-scroll";
const MAX_SAVED_SCROLL = 64;

const loadSavedScroll = (): Map<string, number> => {
  const map = new Map<string, number>();
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (!raw) return map;
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === "number" && Number.isFinite(v)) map.set(k, v);
      }
    }
  } catch {
    // Ignore storage/parse errors in restricted environments; in-memory Map still works.
  }
  return map;
};

const persistSavedScroll = (map: Map<string, number>) => {
  while (map.size > MAX_SAVED_SCROLL) {
    const oldest = map.keys().next().value;
    if (oldest === undefined) break;
    map.delete(oldest);
  }
  try {
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify(Object.fromEntries(map)));
  } catch {
    // Ignore storage errors in restricted environments.
  }
};

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
      try {
        const prev =
          history.state && typeof history.state === "object"
            ? (history.state as Record<string, unknown>)
            : {};
        history.replaceState({ ...prev, scrollKey: key }, "");
      } catch {
        // Ignore History API restrictions (opaque origin / rate limit); routing still works.
      }
    };

    const savedScroll = loadSavedScroll();
    const recordScroll = (key: string, y: number) => {
      savedScroll.delete(key);
      savedScroll.set(key, y);
      persistSavedScroll(savedScroll);
    };

    const initialExistingKey = readScrollKey();
    const hasInitialSaved = initialExistingKey !== undefined && savedScroll.has(initialExistingKey);
    let currentKey = initialExistingKey ?? makeKey();
    if (!initialExistingKey) stampKey(currentKey);
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
        recordScroll(targetKey, window.scrollY);
        restoring = false;
      });
    };

    // Restore saved position on reload / non-bfcache Back, or honor a fresh deep link.
    const initialSection = parseHash(location.hash).section;
    if (hasInitialSaved) {
      scrollToTarget(currentKey, true, undefined);
    } else if (initialSection) {
      scrollToTarget(currentKey, false, initialSection);
    } else {
      recordScroll(currentKey, window.scrollY);
    }

    const onScroll = () => {
      if (!restoring) recordScroll(currentKey, window.scrollY);
    };

    const onNavigate = () => {
      const existingKey = readScrollKey();
      if (location.href === lastHref && existingKey === currentKey) return;
      if (!restoring) recordScroll(currentKey, window.scrollY);
      lastHref = location.href;

      const next = parseHash(location.hash);
      const isHistoryReturn = existingKey !== undefined && savedScroll.has(existingKey);

      if (isHistoryReturn) {
        currentKey = existingKey;
      } else {
        currentKey = existingKey ?? makeKey();
        if (!existingKey) stampKey(currentKey);
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

  createEffect(
    () => lang(),
    (current) => {
      document.documentElement.lang = current === "zh" ? "zh-Hans" : "en";
      document.title =
        current === "zh"
          ? "一步步读懂黎曼猜想的证明"
          : "The proof of the Riemann hypothesis, step by step";
    },
  );

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
          <span class="project">{isZh() ? "黎曼猜想" : "The Riemann Hypothesis"}</span>
        </a>
        <nav aria-label={isZh() ? "网站导航" : "Site"}>
          <a
            href={href(CONTENTS)}
            class={{ active: isProofSection(route()) }}
            aria-current={route() === CONTENTS ? "page" : undefined}
          >
            {isZh() ? "证明路线" : "The Proof"}
          </a>
          <a
            href={href(CATALOG)}
            class={{ active: isBackgroundSection(route()) }}
            aria-current={route() === CATALOG ? "page" : undefined}
          >
            {isZh() ? "数学背景" : "Background"}
          </a>
          <div class="lang-toggle" role="group" aria-label={isZh() ? "切换语言" : "Language"}>
            <button
              type="button"
              aria-pressed={!isZh() ? "true" : "false"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              aria-pressed={isZh() ? "true" : "false"}
              onClick={() => setLang("zh")}
            >
              中文
            </button>
          </div>
          <button
            type="button"
            class="theme-toggle"
            aria-label={
              isZh()
                ? theme() === "dark"
                  ? "当前深色主题，点击切换为浅色"
                  : "当前浅色主题，点击切换为深色"
                : theme() === "dark"
                  ? "Color theme: dark. Switch to light theme"
                  : "Color theme: light. Switch to dark theme"
            }
            title={
              isZh()
                ? theme() === "dark"
                  ? "切换为浅色主题"
                  : "切换为深色主题"
                : theme() === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
            }
            onClick={toggleTheme}
          >
            <span aria-hidden="true">{theme() === "dark" ? "☾" : "☀"}</span>{" "}
            <span>
              {isZh()
                ? theme() === "dark"
                  ? "深色"
                  : "浅色"
                : theme() === "dark"
                  ? "Dark"
                  : "Light"}
            </span>
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
          <Show
            when={isZh()}
            fallback={
              <>
                A reading of Alpöge's Lean proof ·{" "}
                <a href="https://github.com/syz51/riemann">Notes and sources on GitHub</a>
              </>
            }
          >
            Alpöge 的 Lean 证明精读笔记 ·{" "}
            <a href="https://github.com/syz51/riemann">GitHub 笔记与文献索引</a>
          </Show>
        </p>
      </footer>
    </>
  );
}
