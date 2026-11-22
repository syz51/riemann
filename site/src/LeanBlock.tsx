import { For } from "solid-js";
import type { Snippet } from "./steps/types";

type Props = {
  snippet: Snippet;
  active: string | null;
  pinned: string | null;
  onHover: (piece: string | null) => void;
  onFocus: (piece: string | null) => void;
  onPin: (piece: string) => void;
};

/** A Lean snippet whose marked pieces show their meaning on hover, focus or press. */
export function LeanBlock(props: Props) {
  return (
    <figure class="lean">
      <pre>
        <code>
          <For each={props.snippet.tokens}>
            {(token) =>
              typeof token === "string" ? (
                token
              ) : (
                <button
                  type="button"
                  class={["piece", { active: props.active === token.piece }]}
                  aria-pressed={props.pinned === token.piece ? "true" : "false"}
                  onPointerEnter={() => props.onHover(token.piece)}
                  onPointerLeave={() => props.onHover(null)}
                  onFocus={() => props.onFocus(token.piece)}
                  onBlur={() => props.onFocus(null)}
                  onClick={() => props.onPin(token.piece)}
                >
                  {token.text}
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
