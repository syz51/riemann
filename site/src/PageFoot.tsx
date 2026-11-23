import { Show } from "solid-js";
import { CONTENTS, href, READING_ORDER } from "./pages";

/** The links at the foot of a page: the page before, the page after, and the contents. */
export function PageFoot(props: { route: string }) {
  const index = () => READING_ORDER.findIndex((page) => page.route === props.route);
  const previous = () => READING_ORDER[index() - 1];
  const next = () => READING_ORDER[index() + 1];

  return (
    <nav class="page-foot" aria-label="More pages">
      <Show when={previous()}>
        {(page) => (
          <p>
            <span>Before this</span>
            <a href={href(page().route)} rel="prev">
              {page().label}
            </a>
          </p>
        )}
      </Show>
      <Show when={next()}>
        {(page) => (
          <p>
            <span>After this</span>
            <a href={href(page().route)} rel="next">
              {page().label}
            </a>
          </p>
        )}
      </Show>
      <p>
        <span>All pages</span>
        <a href={href(CONTENTS)}>Contents</a>
      </p>
    </nav>
  );
}
