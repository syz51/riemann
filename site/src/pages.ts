import type { Lang } from "./i18n";
import { step1 } from "./steps/step1";
import { step1Zh } from "./steps/step1.zh";

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
  statusLabel?: string;
  title: Markup;
  summary: Markup;
};

/** One background explainer page, linked to where it branches from in the proof. */
export type BackgroundEntry = {
  route: BackgroundRoute;
  title: string;
  summary: Markup;
  /** The step or earlier background page where this concept branches off. */
  from: StepRoute | BackgroundRoute;
  /** Short provenance label for the Background catalog and article kicker. */
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

const STEPS_ZH: StepEntry[] = [
  {
    route: "step-1",
    number: step1Zh.number,
    level: "第 0 层",
    title: step1Zh.title,
    summary: step1Zh.summary,
  },
];

// Planned top-level steps following lsernau/grh-lean (commit 72fead10, grh/GUIDE.md).
export const UPCOMING_STEPS: UpcomingStep[] = [
  {
    number: 2,
    level: "Level 1",
    status: "Next in walk-through",
    title: prose`New.grh and Dirichlet $L$-functions`,
    summary: prose`The proof does not treat $\zeta$ alone: New.grh proves non-vanishing in $\operatorname{Re}(s) > \frac{1}{2}$ for every Dirichlet $L$-function.`,
  },
  {
    number: 3,
    level: "Level 2",
    status: "Planned",
    title: prose`The mirror argument (New.zeta_zeros_on_line)`,
    summary: prose`Why having no zeros with real part above $\frac{1}{2}$ forces every non-trivial zero onto the critical line.`,
  },
  {
    number: 4,
    level: "Level 3",
    status: "Planned",
    title: prose`Three main theorems and star_inequality`,
    summary: prose`Short forms, enough forms, and long integral forms: how MainInequality and OneSidedBound yield New.grh.`,
  },
];

const UPCOMING_STEPS_ZH: UpcomingStep[] = [
  {
    number: 2,
    level: "第 1 层",
    status: "Next in walk-through",
    statusLabel: "下一步预告",
    title: prose`New.grh 与狄利克雷 $L$ 函数`,
    summary: prose`证明并不只盯着 $\zeta$ 这一个函数：New.grh 一口气证明了所有狄利克雷 $L$ 函数在 $\operatorname{Re}(s) > \frac{1}{2}$ 里都没有零点。`,
  },
  {
    number: 3,
    level: "第 2 层",
    status: "Planned",
    statusLabel: "即将更新",
    title: prose`对称收尾（New.zeta_zeros_on_line）`,
    summary: prose`为什么只要 $\operatorname{Re}(s) > \frac{1}{2}$ 没有零点，就能顺理成章把所有非平凡零点钉在临界线上。`,
  },
  {
    number: 4,
    level: "第 3 层",
    status: "Planned",
    statusLabel: "即将更新",
    title: prose`三大核心定理与 star_inequality`,
    summary: prose`短形式、足够多的形式与长积分形式：MainInequality 和 OneSidedBound 如何联手推出 New.grh。`,
  },
];

// The one list of background pages, each tied to where the proof first needs it.
export const BACKGROUNDS: BackgroundEntry[] = [
  {
    route: "complex-numbers",
    title: "Why complex numbers exist",
    summary: prose`Nobody wanted them. A correct formula for ordinary answers passed through the square roots of negative numbers.`,
    from: "step-1",
    originLabel: "From Step 1",
  },
  {
    route: "zeta",
    title: "Where the zeta function came from",
    summary: prose`It began as one sum that nobody could finish. Euler finished it and found that the answer knows about the primes.`,
    from: "step-1",
    originLabel: "From Step 1",
  },
  {
    route: "gamma",
    title: "The Gamma function",
    summary: prose`The symmetry of the zeta function uses $\Gamma$. It fills the gaps of the list 1, 2, 6, 24, 120, and Euler found it in 1729.`,
    from: "zeta",
    originLabel: "From the zeta function",
  },
];

const BACKGROUNDS_ZH: BackgroundEntry[] = [
  {
    route: "complex-numbers",
    title: "复数是怎么来的",
    summary: prose`一开始根本没人想要复数。只是人们解一道普通的三次方程时，求根公式偏偏绕不过负数的平方根——硬算下去，答案居然对了。`,
    from: "step-1",
    originLabel: "源自第 1 步",
  },
  {
    route: "zeta",
    title: "zeta 函数的来历",
    summary: prose`故事始于一道近百年无人算出的无穷级数。欧拉一锤定音，还意外发现它的答案暗藏着全体素数的秘密。`,
    from: "step-1",
    originLabel: "源自第 1 步",
  },
  {
    route: "gamma",
    title: "伽马函数",
    summary: prose`$\zeta$ 函数的对称公式里藏着一个 $\Gamma$。它把 $1, 2, 6, 24, 120$ 这串阶乘之间的空档严丝合缝地填了起来——欧拉在 1729 年找到了它。`,
    from: "zeta",
    originLabel: "源自 zeta 函数",
  },
];

export const stepsFor = (l: Lang): StepEntry[] => (l === "zh" ? STEPS_ZH : STEPS);
export const upcomingStepsFor = (l: Lang): UpcomingStep[] =>
  l === "zh" ? UPCOMING_STEPS_ZH : UPCOMING_STEPS;
export const backgroundsFor = (l: Lang): BackgroundEntry[] =>
  l === "zh" ? BACKGROUNDS_ZH : BACKGROUNDS;

/** The number of steps in the top-level walk-through, written or not. */
export const STEP_COUNT = step1.of;

/** All non-home routes recognized by the router. */
export const ALL_PAGE_ROUTES: PageRoute[] = [
  ...STEPS.map((step) => step.route),
  CATALOG,
  ...BACKGROUNDS.map((page) => page.route),
];

export const href = (route: Route, section?: string) =>
  section ? `#/${route}#${section}` : `#/${route}`;

/** Splits a location hash (`#/zeta#euler-1749`) into its route and optional section id. */
export const parseHash = (hash: string): { route: Route; section?: string } => {
  const body = hash.replace(/^#\/?/, "");
  const split = body.indexOf("#");
  const routePart = split === -1 ? body : body.slice(0, split);
  const sectionPart = split === -1 ? "" : body.slice(split + 1);
  if (routePart === "") {
    return sectionPart ? { route: CONTENTS, section: sectionPart } : { route: CONTENTS };
  }
  const matched = ALL_PAGE_ROUTES.find((candidate) => candidate === routePart);
  if (!matched) return { route: CONTENTS };
  return sectionPart ? { route: matched, section: sectionPart } : { route: matched };
};

/** The route in the address, or the proof home page when no page has it. */
export const routeOf = (hash: string): Route => parseHash(hash).route;

/** The optional section anchor in the address (`#/zeta#euler-1749` -> `euler-1749`). */
export const sectionOf = (hash: string): string | undefined => parseHash(hash).section;

export const isStepRoute = (route: Route): route is StepRoute =>
  STEPS.some((step) => step.route === route);

export const isBackgroundRoute = (route: Route): route is BackgroundRoute =>
  BACKGROUNDS.some((page) => page.route === route);

export const isProofSection = (route: Route): boolean => route === CONTENTS || isStepRoute(route);

export const isBackgroundSection = (route: Route): boolean =>
  route === CATALOG || isBackgroundRoute(route);

export const backgroundOf = (route: BackgroundRoute, l: Lang = "en"): BackgroundEntry | undefined =>
  backgroundsFor(l).find((page) => page.route === route);

/** Direct child background pages that branch off a given page. */
export const childrenOf = (route: StepRoute | BackgroundRoute, l: Lang = "en"): BackgroundEntry[] =>
  backgroundsFor(l).filter((page) => page.from === route);

/** The direct parent link (step or earlier background page) of a background page. */
export const parentLinkOf = (route: BackgroundRoute, l: Lang = "en"): Link | undefined => {
  const entry = backgroundOf(route, l);
  if (!entry) return undefined;
  const step = stepsFor(l).find((s) => s.route === entry.from);
  if (step) {
    return {
      route: step.route,
      label:
        l === "zh" ? `第 ${step.number} 步：${step.title}` : `Step ${step.number}: ${step.title}`,
    };
  }
  const bg = backgroundsFor(l).find((b) => b.route === entry.from);
  if (bg) return { route: bg.route, label: bg.title };
  return undefined;
};

/** Kicker line shown above a background article title, derived from pages.ts. */
export const backgroundKicker = (route: BackgroundRoute, l: Lang = "en"): string => {
  const origin = backgroundOf(route, l)?.originLabel;
  if (l === "zh") return origin ? `数学背景 · ${origin}` : "数学背景";
  return origin ? `Background · ${origin}` : "Background";
};
