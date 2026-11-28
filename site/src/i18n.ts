import { createSignal } from "solid-js";

export type Lang = "en" | "zh";

const LANG_KEY = "riemann-lang";

const parseLang = (value: string | null | undefined): Lang | undefined => {
  if (!value) return undefined;
  const lower = value.toLowerCase();
  if (lower === "zh" || lower.startsWith("zh-")) return "zh";
  if (lower === "en" || lower.startsWith("en-")) return "en";
  return undefined;
};

export const readInitialLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  const fromQuery = parseLang(new URLSearchParams(window.location.search).get("lang"));
  if (fromQuery) return fromQuery;
  try {
    const stored = parseLang(localStorage.getItem(LANG_KEY));
    if (stored) return stored;
  } catch {
    // Ignore storage errors in restricted environments.
  }
  if (typeof document !== "undefined") {
    const fromDoc = parseLang(document.documentElement.lang);
    if (fromDoc) return fromDoc;
  }
  return parseLang(navigator.language) ?? "en";
};

const [langSignal, setLangSignal] = createSignal<Lang>(readInitialLang());

/** Current display language (`"en"` or `"zh"`). Read inside JSX, memos, or effects. */
export const lang = langSignal;

/** Convenience helper: true when Simplified Chinese mode is active. */
export const isZh = () => langSignal() === "zh";

/** Updates the active language, persists it, syncs `<html lang>` and `?lang=`. */
export const setLang = (next: Lang) => {
  setLangSignal(next);
  if (typeof document !== "undefined") {
    document.documentElement.lang = next === "zh" ? "zh-Hans" : "en";
    document.title =
      next === "zh"
        ? "一步步读懂黎曼猜想的证明"
        : "The proof of the Riemann hypothesis, step by step";
  }
  try {
    localStorage.setItem(LANG_KEY, next);
  } catch {
    // Ignore storage errors in restricted environments.
  }
  if (typeof window !== "undefined") {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(window.history.state, "", url);
    } catch {
      // Ignore History API restrictions on opaque origins.
    }
  }
};
