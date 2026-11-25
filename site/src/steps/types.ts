import type { BackgroundRoute } from "../pages";

/** What the picture of the complex plane marks for a piece. */
export type PlaneMark = "plane" | "zeros" | "trivial" | "pole" | "line";

/** Contextual link from a Lean piece to a standalone background explainer. */
export type BackgroundLink = {
  route: BackgroundRoute;
  label: string;
  note: string;
};

/** One part of a Lean snippet that has its own explanation. */
export type Piece<Id extends string = string> = {
  id: Id;
  title: Markup;
  meaning: Markup;
  mark?: PlaneMark;
  background?: BackgroundLink;
};

/** Plain text, or text that belongs to a piece. */
export type Token<Id extends string = string> = string | { piece: Id; text: string };

export type Snippet<Id extends string = string> = {
  heading: string;
  intro: string;
  /** Where the Lean text comes from. */
  source: string;
  tokens: Token<Id>[];
};

export type Step<Id extends string = string> = {
  number: number;
  of: number;
  title: string;
  summary: Markup;
  snippets: Snippet<NoInfer<Id>>[];
  pieces: Piece<Id>[];
  next: string;
};

/**
 * Checks a step at compile time: the ids come from `pieces`, and a token that
 * names another id is a type error.
 */
export const defineStep = <const Id extends string>(step: Step<Id>): Step => step;
