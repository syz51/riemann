/** A complex number: `re` is the real part, `im` the imaginary part. */
export type Complex = { re: number; im: number };

export const multiply = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});

/** The distance from 0. */
export const length = (z: Complex) => Math.hypot(z.re, z.im);

/** The angle from the positive real axis, in degrees from 0 up to 360. */
export const angle = (z: Complex) => {
  const degrees = (Math.atan2(z.im, z.re) * 180) / Math.PI;
  return degrees < 0 ? degrees + 360 : degrees;
};

const trim = (value: number) => String(Number(value.toFixed(2))).replace("-", "−");

/** Text such as "1.5 − 0.25i", "2", "i" or "−i". */
export const format = (z: Complex) => {
  const re = Number(z.re.toFixed(2));
  const im = Number(z.im.toFixed(2));
  if (im === 0) return trim(re);
  const size = Math.abs(im) === 1 ? "" : trim(Math.abs(im));
  if (re === 0) return `${im < 0 ? "−" : ""}${size}i`;
  return `${trim(re)} ${im < 0 ? "−" : "+"} ${size}i`;
};
