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
      intro: "The pattern is: theorem, then a name, then the statement, then the proof.",
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
      meaning: prose`This line gives a name to a statement. Prop means “a statement that is true or false”. Nothing is proved here.`,
    },
    {
      id: "forall",
      title: prose`For every complex number $s$`,
      meaning: prose`The symbol $\forall$ means “for every”. $\mathbb{C}$ is the set of complex numbers. A complex number is a point of the plane: it has a real part (left to right) and an imaginary part (bottom to top).`,
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
      meaning: prose`The zeta function is zero at $s$. The picture shows some of these points. The underscore means that the condition has no name of its own.`,
      mark: "zeros",
      background: {
        route: "zeta",
        label: "Where the zeta function came from",
        note: "Background · Euler's Basel sum, the prime product, and the symmetry",
      },
    },
    {
      id: "trivial",
      title: prose`Second condition: $s$ is not a trivial zero`,
      meaning: prose`$\mathbb{N}$ is the set of the numbers 0, 1, 2, and so on. So $-2 \cdot (n + 1)$ gives $-2$, $-4$, $-6$, and so on. Zeta is zero at each of them. These zeros are well understood, and the statement leaves them out.`,
      mark: "trivial",
    },
    {
      id: "pole",
      title: prose`Third condition: $s$ is not 1`,
      meaning: prose`Zeta has a pole at 1: it grows without limit near that point, so it has no natural value there. A Lean function must give a value for every input, so Mathlib's zeta has a value at 1 by convention. This condition keeps that point out of the statement.`,
      mark: "pole",
      background: {
        route: "zeta",
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
      title: prose`The mirror step: from half-plane to critical line`,
      meaning: prose`New.zeta_zeros_on_line (in New/Main.lean) uses the symmetry of the completed zeta function under $s \mapsto 1 - s$. Once no zero lies to the right of $\frac{1}{2}$, none can lie to the left either, so every non-trivial zero has real part $\frac{1}{2}$.`,
      mark: "line",
      background: {
        route: "zeta",
        label: "Where the zeta function came from",
        note: "Background · why the symmetry pairs up zeros across the critical line",
      },
    },
    {
      id: "proof",
      title: prose`The main theorem: non-vanishing for all Dirichlet $L$-functions`,
      meaning: prose`New.grh proves that no Dirichlet $L$-function vanishes anywhere with real part above $\frac{1}{2}$ (the pole at 1 excepted). Lean checks that applying New.zeta_zeros_on_line to New.grh proves Mathlib's RiemannHypothesis. Step 2 opens New.grh.`,
    },
  ],
  next: prose`Step 2 opens New.grh. The proof never works on $\zeta$ alone: it proves non-vanishing in the right half-plane for the whole family of Dirichlet $L$-functions, and $\zeta$ is the modulus-1 member.`,
});
