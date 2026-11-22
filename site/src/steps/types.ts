/** What the picture of the complex plane marks for a piece. */
export type PlaneMark = "plane" | "zeros" | "trivial" | "pole" | "line";

/** One part of a Lean snippet that has its own explanation. */
export type Piece = {
  id: string;
  title: string;
  meaning: string;
  mark?: PlaneMark;
};

/** Plain text, or text that belongs to a piece. */
export type Token = string | { piece: string; text: string };

export type Snippet = {
  heading: string;
  intro: string;
  /** Where the Lean text comes from. */
  source: string;
  tokens: Token[];
};

export type Step = {
  number: number;
  of: number;
  title: string;
  summary: string;
  snippets: Snippet[];
  pieces: Piece[];
  next: string;
};
