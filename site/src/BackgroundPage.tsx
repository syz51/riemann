import { For, Show } from "solid-js";
import { isZh, lang } from "./i18n";
import { backgroundsFor, childrenOf, href, parentLinkOf } from "./pages";

/** Catalog of all standalone background explainers, tied to where they appear in the proof. */
export function BackgroundPage() {
  const backgrounds = () => backgroundsFor(lang());

  return (
    <main class="article catalog">
      <p class="kicker">{isZh() ? "数学背景目录" : "Background catalog"}</p>
      <h1>{isZh() ? "数学背景" : "Mathematical background"}</h1>
      <p class="summary">
        {isZh()
          ? "你完全不必先读完这些页面再看证明。每一篇背景都直接挂在证明第一次用到它的地方，随用随看。"
          : "You do not need to read these before starting the proof. Each page is also linked inline right where the proof first meets the idea."}
      </p>

      <ol class="bg-grid">
        <For each={backgrounds()}>
          {(page) => {
            const parent = () => parentLinkOf(page.route, lang());
            const nextTopics = () => childrenOf(page.route, lang());
            return (
              <li class="bg-card">
                <p class="bg-origin">{page.originLabel}</p>
                <h2>
                  <a href={href(page.route)}>{page.title}</a>
                </h2>
                <p class="bg-summary" innerHTML={page.summary} />
                <div class="bg-links">
                  <Show when={parent()}>
                    {(origin) => (
                      <p class="bg-meta">
                        {isZh() ? "首次出现于 " : "Appears in "}
                        <a href={href(origin().route)}>{origin().label}</a>
                      </p>
                    )}
                  </Show>
                  <Show when={nextTopics().length > 0}>
                    <p class="bg-meta">
                      {isZh() ? "继续延伸至 " : "Leads onward to "}
                      <For each={nextTopics()}>
                        {(child, index) => (
                          <>
                            <Show when={index() > 0}>{isZh() ? "、" : ", "}</Show>
                            <a href={href(child.route)}>{child.title}</a>
                          </>
                        )}
                      </For>
                    </p>
                  </Show>
                </div>
              </li>
            );
          }}
        </For>
      </ol>
    </main>
  );
}
