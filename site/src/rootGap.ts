// Chromium reserves the width of its widest root sign for every square root,
// and draws a narrower sign for a low content. The rest stays as an empty gap
// after the content, with every math font: "√π /2". No CSS value fits all
// fonts, so this measures the gap of each root and takes it away with a
// margin. In a browser without the gap the measure is 0 and nothing changes.

/** The margin that removes a gap of `gap` pixels, in em so that it follows the font size. */
export function trimMargin(gap: number, fontSize: number): string | undefined {
  // Less than half a pixel is rounding, not a gap.
  if (!(fontSize > 0) || gap < 0.5) return undefined;
  return `${(-gap / fontSize).toFixed(3)}em`;
}

function trim(root: Element) {
  const last = root.lastElementChild;
  if (!(root instanceof MathMLElement) || !last) return;
  const gap = root.getBoundingClientRect().right - last.getBoundingClientRect().right;
  const margin = trimMargin(gap, Number.parseFloat(getComputedStyle(root).fontSize));
  if (margin) root.style.marginRight = margin;
}

/** Trims the roots on the page now and each root that a later page adds. */
export function trimRootGaps(container: Element) {
  const seen = new WeakSet<Element>();
  const run = () => {
    for (const root of container.querySelectorAll("msqrt")) {
      if (seen.has(root)) continue;
      seen.add(root);
      trim(root);
    }
  };
  new MutationObserver(run).observe(container, { childList: true, subtree: true });
  run();
}
