import { For } from "solid-js";
import { colourLean } from "./leanColours";
import type { Snippet } from "./steps/types";

type Props = {
  snippet: Snippet;
  active: string | null;
  pinned: string | null;
  onHover: (piece: string | null) => void;
  onFocus: (piece: string | null) => void;
  onPin: (piece: string) => void;
};

/** Lean text with its keywords, types and numbers coloured. */
function Lean(props: { text: string }) {
  return (
    <For each={colourLean(props.text)}>
      {(run) => (run.role ? <span class={run.role}>{run.text}</span> : run.text)}
    </For>
  );
}

/** A Lean snippet whose marked pieces show their meaning on hover, focus or press. */
export function LeanBlock(props: Props) {
  return (
    <figure class="lean">
      <pre>
        <code>
          <For each={props.snippet.tokens}>
            {(token) =>
              typeof token === "string" ? (
                <Lean text={token} />
              ) : (
                <button
                  type="button"
                  class={["piece", { active: props.active === token.piece }]}
                  aria-pressed={props.pinned === token.piece ? "true" : "false"}
                  onPointerEnter={(event) => {
                    if (
                      event.pointerType === "mouse" &&
                      window.matchMedia("(min-width: 52rem)").matches
                    ) {
                      props.onHover(token.piece);
                    }
                  }}
                  onPointerLeave={() => props.onHover(null)}
                  onFocus={(event) => {
                    if (event.currentTarget.matches(":focus-visible")) {
                      props.onFocus(token.piece);
                    }
                  }}
                  onBlur={() => props.onFocus(null)}
                  onClick={() => props.onPin(token.piece)}
                >
                  <Lean text={token.text} />
                </button>
              )
            }
          </For>
        </code>
      </pre>
      <figcaption>{props.snippet.source}</figcaption>
    </figure>
  );
}
