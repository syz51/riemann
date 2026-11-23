// The Gamma function on the real line, for the chart of the Gamma page.
// The method is the Lanczos approximation with the reflection formula. It is
// our own choice for the picture, not a part of the proof; the tests check it
// against the values and the rules that the page cites.
const G = 7;
const COEFFICIENTS = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
  -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
  1.5056327351493116e-7,
];

/** Γ(x) for a real x. At 0, −1, −2, … the function has no value. */
export function gamma(x: number): number | undefined {
  if (x <= 0 && Number.isInteger(x)) return undefined;
  if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x)!);
  const z = x - 1;
  let sum = COEFFICIENTS[0]!;
  for (let i = 1; i < COEFFICIENTS.length; i++) sum += COEFFICIENTS[i]! / (z + i);
  const t = z + G + 0.5;
  return Math.sqrt(2 * Math.PI) * t ** (z + 0.5) * Math.exp(-t) * sum;
}
