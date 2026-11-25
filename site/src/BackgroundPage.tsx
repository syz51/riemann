import { For, Show } from "solid-js";
import { BACKGROUNDS, childrenOf, href, parentLinkOf } from "./pages";

/** Catalog of all standalone background explainers, tied to where they appear in the proof. */
export function BackgroundPage() {
  return (
    <main class="article catalog">
      <p class="kicker">Background catalog</p>
      <h1>Mathematical background</h1>
      <p class="summary">
        You do not need to read these before starting the proof. Each page is also linked inline
        right where the proof first meets the idea.
      </p>

      <ol class="bg-grid">
        <For each={BACKGROUNDS}>
          {(page) => {
            const parent = () => parentLinkOf(page.route);
            const nextTopics = () => childrenOf(page.route);
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
                        Appears in <a href={href(origin().route)}>{origin().label}</a>
                      </p>
                    )}
                  </Show>
                  <Show when={nextTopics().length > 0}>
                    <p class="bg-meta">
                      Leads onward to{" "}
                      <For each={nextTopics()}>
                        {(child, index) => (
                          <>
                            <Show when={index() > 0}>{", "}</Show>
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
