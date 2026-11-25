import { step1 } from "./steps/step1";

/** Proof walk-through step routes. */
export type StepRoute = "step-1";

/** Standalone background explainer routes. */
export type BackgroundRoute = "complex-numbers" | "zeta" | "gamma";

/** The Background catalog route. */
export const CATALOG = "background";

/** The Proof home page has the empty route. */
export const CONTENTS = "";

/** Any non-home page route. */
export type PageRoute = StepRoute | BackgroundRoute | typeof CATALOG;

/** Any route in the application. */
export type Route = PageRoute | typeof CONTENTS;

/** One published step of the proof walk-through. */
export type StepEntry = {
  route: StepRoute;
  number: number;
  level: string;
  title: string;
  summary: Markup;
};

/** One planned step shown along the proof spine on the home page. */
export type UpcomingStep = {
  number: number;
  level: string;
  status: "Next in walk-through" | "Planned";
  title: string;
  summary: Markup;
};

/** One background explainer page, linked to where it branches from in the proof. */
export type BackgroundEntry = {
  route: BackgroundRoute;
  title: string;
  shortTitle: string;
  summary: Markup;
  /** The step or earlier background page where this concept branches off. */
  from: StepRoute | BackgroundRoute;
  /** Short provenance label for the Background catalog. */
  originLabel: string;
};

export type Link = { route: Route; label: string };

// The one list of published proof steps. A new step needs its route in
// StepRoute, an entry here, and a <Match> in App.tsx.
export const STEPS: StepEntry[] = [
  {
    route: "step-1",
    number: step1.number,
    level: "Level 0",
    title: step1.title,
    summary: step1.summary,
  },
];

// Planned top-level steps from docs/notes/01-top-levels.md.
export const UPCOMING_STEPS: UpcomingStep[] = [
  {
    number: 2,
    level: "Levels 1–2",
    status: "Next in walk-through",
    title: "rhOfAll and EveryCharacter",
    summary: prose`The proof does not treat $\zeta$ alone: it proves non-vanishing for every Dirichlet $L$-function.`,
  },
  {
    number: 3,
    level: "Level 2",
    status: "Planned",
    title: "The mirror argument (rh_of_right)",
    summary: prose`Why having no zeros with real part above $\frac{1}{2}$ forces every non-trivial zero onto the critical line.`,
  },
  {
    number: 4,
    level: "Levels 3–4",
    status: "Planned",
    title: "Where the names turn opaque",
    summary: prose`Row0b, VWin, and the boundary where classical analysis ends and the new arithmetic begins.`,
  },
];

// The one list of background pages, each tied to where the proof first needs it.
export const BACKGROUNDS: BackgroundEntry[] = [
  {
    route: "complex-numbers",
    title: "Why complex numbers exist",
    shortTitle: "Complex numbers",
    summary: prose`Nobody wanted them. A correct formula for ordinary answers passed through the square roots of negative numbers.`,
    from: "step-1",
    originLabel: "From Step 1",
  },
  {
    route: "zeta",
    title: "Where the zeta function came from",
    shortTitle: "The zeta function",
    summary: prose`It began as one sum that nobody could finish. Euler finished it and found that the answer knows about the primes.`,
    from: "step-1",
    originLabel: "From Step 1",
  },
  {
    route: "gamma",
    title: "The Gamma function",
    shortTitle: "The Gamma function",
    summary: prose`The symmetry of the zeta function uses $\Gamma$. It fills the gaps of the list 1, 2, 6, 24, 120, and Euler found it in 1729.`,
    from: "zeta",
    originLabel: "From the zeta function",
  },
];

/** The number of steps in the top-level walk-through, written or not. */
export const STEP_COUNT = step1.of;

/** All non-home routes recognized by the router. */
export const ALL_PAGE_ROUTES: PageRoute[] = [
  ...STEPS.map((step) => step.route),
  CATALOG,
  ...BACKGROUNDS.map((page) => page.route),
];

export const href = (route: Route) => `#/${route}`;

/** The route in the address, or the proof home page when no page has it. */
export const routeOf = (hash: string): Route => {
  const route = hash.replace(/^#\/?/, "");
  return ALL_PAGE_ROUTES.find((candidate) => candidate === route) ?? CONTENTS;
};

export const isStepRoute = (route: Route): route is StepRoute =>
  STEPS.some((step) => step.route === route);

export const isBackgroundRoute = (route: Route): route is BackgroundRoute =>
  BACKGROUNDS.some((page) => page.route === route);

export const isProofSection = (route: Route): boolean => route === CONTENTS || isStepRoute(route);

export const isBackgroundSection = (route: Route): boolean =>
  route === CATALOG || isBackgroundRoute(route);

export const stepOf = (route: StepRoute): StepEntry | undefined =>
  STEPS.find((step) => step.route === route);

export const backgroundOf = (route: BackgroundRoute): BackgroundEntry | undefined =>
  BACKGROUNDS.find((page) => page.route === route);

/** Direct child background pages that branch off a given page. */
export const childrenOf = (route: StepRoute | BackgroundRoute): BackgroundEntry[] =>
  BACKGROUNDS.filter((page) => page.from === route);

/** The direct parent link (step or earlier background page) of a background page. */
export const parentLinkOf = (route: BackgroundRoute): Link | undefined => {
  const entry = backgroundOf(route);
  if (!entry) return undefined;
  const step = STEPS.find((s) => s.route === entry.from);
  if (step) return { route: step.route, label: `Step ${step.number}: ${step.title}` };
  const bg = BACKGROUNDS.find((b) => b.route === entry.from);
  if (bg) return { route: bg.route, label: bg.title };
  return undefined;
};

/** The ordered ancestor trail for a background page, starting from The Proof. */
export const trailOf = (route: BackgroundRoute): Link[] => {
  const chain: Link[] = [];
  let cursor: StepRoute | BackgroundRoute | undefined = backgroundOf(route)?.from;
  const seen = new Set<Route>();
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    const step = STEPS.find((s) => s.route === cursor);
    if (step) {
      chain.unshift({ route: step.route, label: `Step ${step.number}` });
      break;
    }
    const bg = BACKGROUNDS.find((b) => b.route === cursor);
    if (!bg) break;
    chain.unshift({ route: bg.route, label: bg.shortTitle });
    cursor = bg.from;
  }
  return [{ route: CONTENTS, label: "The Proof" }, ...chain];
};

/** The root proof step that a background page ultimately branches from. */
export const rootStepOf = (route: BackgroundRoute): StepEntry | undefined => {
  let cursor: StepRoute | BackgroundRoute | undefined = backgroundOf(route)?.from;
  const seen = new Set<Route>();
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    const step = STEPS.find((s) => s.route === cursor);
    if (step) return step;
    cursor = BACKGROUNDS.find((b) => b.route === cursor)?.from;
  }
  return undefined;
};
