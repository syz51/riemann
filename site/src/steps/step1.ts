import { defineStep } from "./types";

// Source of the content: lsernau/grh-lean (commit 72fead10), grh/src/Main.lean and
// grh/src/New/Main.lean, plus docs/notes/03-grh-statements.md for `s ≠ 1`.
export const step1 = defineStep({
  number: 1,
  of: 4,
  title: "What exactly was proved",
  summary: prose`Every zero of the zeta function, apart from the trivial ones, has real part $\frac{1}{2}$.`,
  snippets: [
    {
      heading: "The statement",
      intro:
        "This is the Riemann hypothesis as Lean reads it. It comes from Mathlib, the shared mathematics library of Lean. The author of the proof did not write it.",
      source: "Mathlib, Mathlib/NumberTheory/LSeries/RiemannZeta.lean. Line breaks added.",
      tokens: [
        { piece: "def", text: "def RiemannHypothesis : Prop" },
        " :=\n  ",
        { piece: "forall", text: "∀ (s : ℂ)" },
        " ",
        { piece: "zero", text: "(_ : riemannZeta s = 0)" },
        "\n    ",
        { piece: "trivial", text: "(_ : ¬∃ n : ℕ, s = -2 * (n + 1))" },
        " ",
        { piece: "pole", text: "(_ : s ≠ 1)" },
        ",\n    ",
        { piece: "line", text: "s.re = 1 / 2" },
      ],
    },
    {
      heading: "The proof, as the main file gives it",
      intro:
        "The pattern is: theorem, name, statement, then proof. In Lean, applying a function to an input is written with a space (f x), so the short finishing step sits on the left and the giant main proof sits on the right.",
      source: "grh/src/Main.lean of lsernau/grh-lean (commit 72fead10). Line break added.",
      tokens: [
        "theorem ",
        { piece: "name", text: "riemannHypothesis" },
        " : ",
        { piece: "statement", text: "RiemannHypothesis" },
        " :=\n  ",
        { piece: "mirror", text: "New.zeta_zeros_on_line" },
        " ",
        { piece: "proof", text: "New.grh" },
      ],
    },
  ],
  pieces: [
    {
      id: "def",
      title: prose`A name for a statement`,
      meaning: prose`This line gives a name to a statement. In Lean, “:” means “is a” (or “has type”) and “:=” means “is defined as”. Prop means “a statement that is true or false”. Nothing is proved here.`,
    },
    {
      id: "forall",
      title: prose`For every complex number $s$`,
      meaning: prose`The symbol $\forall$ means “for every”, and $\mathbb{C}$ is the set of complex numbers. A complex number is a point of the plane: it has a real part (how far left or right it sits) and an imaginary part (how far up or down). Everything in parentheses before the comma is a condition on $s$; what comes after the comma is the conclusion.`,
      mark: "plane",
      background: {
        route: "complex-numbers",
        label: "Why complex numbers exist",
        note: "Background · how a cubic formula forced square roots of negative numbers",
      },
    },
    {
      id: "zero",
      title: prose`First condition: $s$ is a zero`,
      meaning: prose`The zeta function is zero at $s$. The picture shows some of these points, and the underscore means the condition has no name of its own. Each non-trivial zero acts like a wave controlling how the prime numbers are spread out.`,
      mark: "zeros",
      background: {
        route: "zeta",
        label: "Where the zeta function came from",
        note: "Background · start from Euler's sum, or jump to symmetry and zeros at the top of the page",
      },
    },
    {
      id: "trivial",
      title: prose`Second condition: $s$ is not a trivial zero`,
      meaning: prose`The symbol $\neg$ means “not”, $\exists$ means “there exists”, and $\mathbb{N}$ is $0, 1, 2, \dots$ — so this reads “there is no whole number $n$ with $s = -2(n + 1)$” (the $+1$ skips 0, where $\zeta(0) = -\frac{1}{2}$). At $-2, -4, -6, \dots$, zeta vanishes simply because the Gamma factor blows up there, so the statement leaves these “trivial” zeros out.`,
      mark: "trivial",
      background: {
        route: "zeta",
        section: "trivial-zeros",
        label: "Why −2, −4, −6 are trivial zeros",
        note: "Background · how Gamma's poles force them, Riemann's 1859 proof, and where the name came from",
      },
    },
    {
      id: "pole",
      title: prose`Third condition: $s$ is not 1`,
      meaning: prose`Zeta has a pole at 1: it grows without limit near that point, so it has no natural value there. A Lean function must give a value for every input, so Mathlib's zeta has a value at 1 by convention. This condition keeps that point out of the statement.`,
      mark: "pole",
      background: {
        route: "zeta",
        section: "convergence",
        label: "Where the zeta function came from",
        note: "Background · why zeta grows without limit near 1 and extends across the plane",
      },
    },
    {
      id: "line",
      title: prose`Conclusion: the real part of $s$ is $\frac{1}{2}$`,
      meaning: prose`s.re is the real part of $s$ (written $\operatorname{Re}(s)$ in mathematics, for “real part” — how far left or right $s$ sits in the plane). So $s$ is on the vertical line through $\frac{1}{2}$. This line is the critical line.`,
      mark: "line",
    },
    {
      id: "name",
      title: prose`The name of the theorem`,
      meaning: prose`Other files use this name to refer to the theorem.`,
    },
    {
      id: "statement",
      title: prose`The statement that is proved`,
      meaning: prose`This is the name defined above. Mathlib had this definition before the proof existed. So the author could not change the statement to make it easier to prove.`,
    },
    {
      id: "mirror",
      title: prose`The mirror wrap-up: ruling out the left side too`,
      meaning: prose`This is only the short classical finishing step (16 lines in New/Main.lean), not the hard part. It takes a proof that no zero lies to the right of $\frac{1}{2}$ and uses Riemann's symmetry sending $s$ to $1 - s$ (written $s \mapsto 1 - s$) to rule out the left side too — pinching every non-trivial zero onto $\operatorname{Re}(s) = \frac{1}{2}$.`,
      mark: "line",
      background: {
        route: "zeta",
        section: "riemann-1859",
        label: "Where the zeta function came from",
        note: "Background · why the symmetry pairs up zeros across the critical line",
      },
    },
    {
      id: "proof",
      title: prose`The real proof: no zeros to the right of $\frac{1}{2}$`,
      meaning: prose`Almost the entire 300,000-line proof lives here. Here “grh” stands for the Generalized Riemann Hypothesis (specifically for Dirichlet $L$-functions, a wider family introduced in Step 2): New.grh proves that neither $\zeta$ nor any Dirichlet $L$-function vanishes anywhere with $\operatorname{Re}(s) > \frac{1}{2}$, ignoring the pole at 1. Because symmetry handles the left half for free, ruling out the right half is the whole hard job.`,
    },
  ],
  next: prose`Step 2 opens New.grh and introduces Dirichlet $L$-functions. The proof never works on $\zeta$ alone: it proves non-vanishing in the right half-plane for that whole family at once, and $\zeta$ is its simplest member.`,
});
