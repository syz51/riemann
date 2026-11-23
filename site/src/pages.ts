import { step1 } from "./steps/step1";

/** A page that explains something a step needs. */
export type Background = { route: string; title: string; summary: string };

/** One step of the walk-through, with the background pages that it needs. */
export type StepEntry = {
  route: string;
  number: number;
  title: string;
  summary: string;
  background: Background[];
};

// The one list of all pages. The contents page and the links at the foot of
// each page come from it. A new page needs an entry here and a <Match> in App.
export const STEPS: StepEntry[] = [
  {
    route: "step-1",
    number: step1.number,
    title: step1.title,
    summary: step1.summary,
    background: [
      {
        route: "complex-numbers",
        title: "Why complex numbers exist",
        summary:
          "Nobody wanted them. A correct formula for ordinary answers passed through the square roots of negative numbers.",
      },
      {
        route: "zeta",
        title: "Where the zeta function came from",
        summary:
          "It began as one sum that nobody could finish. Euler finished it and found that the answer knows about the primes.",
      },
    ],
  },
];

/** The number of steps in the whole walk-through, written or not. */
export const STEP_COUNT = step1.of;

export type Link = { route: string; label: string };

/** All pages in reading order: the background of a step, then the step. */
export const READING_ORDER: Link[] = STEPS.flatMap((step) => [
  ...step.background.map((page) => ({ route: page.route, label: page.title })),
  { route: step.route, label: `Step ${step.number}: ${step.title}` },
]);

/** The contents page has the empty route. */
export const CONTENTS = "";

export const href = (route: string) => `#/${route}`;

/** The route in the address, or the contents page when no page has it. */
export const routeOf = (hash: string) => {
  const route = hash.replace(/^#\/?/, "");
  return READING_ORDER.some((page) => page.route === route) ? route : CONTENTS;
};
