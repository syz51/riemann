import { defineStep } from "./types";

// Source of the content: docs/notes/01-top-levels.md, "Level 0: the target", and
// docs/notes/03-grh-statements.md for the reason behind `s ≠ 1`.
export const step1 = defineStep({
  number: 1,
  of: 4,
  title: "What exactly was proved",
  summary: "Every zero of the zeta function, apart from the trivial ones, has real part 1/2.",
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
      source: "src/Main.lean of the proof library.",
      tokens: [
        "theorem ",
        { piece: "name", text: "riemannHypothesis" },
        " : ",
        { piece: "statement", text: "RiemannHypothesis" },
        " := ",
        { piece: "proof", text: "rhOfAll" },
      ],
    },
  ],
  pieces: [
    {
      id: "def",
      title: "A name for a statement",
      meaning:
        "This line gives a name to a statement. Prop means “a statement that is true or false”. Nothing is proved here.",
    },
    {
      id: "forall",
      title: "For every complex number s",
      meaning:
        "The symbol ∀ means “for every”. ℂ is the set of complex numbers. A complex number is a point of the plane: it has a real part (left to right) and an imaginary part (bottom to top).",
      mark: "plane",
    },
    {
      id: "zero",
      title: "First condition: s is a zero",
      meaning:
        "The zeta function is zero at s. The picture shows some of these points. The underscore means that the condition has no name of its own.",
      mark: "zeros",
    },
    {
      id: "trivial",
      title: "Second condition: s is not a trivial zero",
      meaning:
        "ℕ is the set of the numbers 0, 1, 2, and so on. So −2 · (n + 1) gives −2, −4, −6, and so on. Zeta is zero at each of them. These zeros are well understood, and the statement leaves them out.",
      mark: "trivial",
    },
    {
      id: "pole",
      title: "Third condition: s is not 1",
      meaning:
        "Zeta has a pole at 1: it grows without limit near that point, so it has no natural value there. A Lean function must give a value for every input, so Mathlib's zeta has a value at 1 by convention. This condition keeps that point out of the statement.",
      mark: "pole",
    },
    {
      id: "line",
      title: "Conclusion: the real part of s is 1/2",
      meaning:
        "s.re is the real part of s. So s is on the vertical line through 1/2. This line is the critical line.",
      mark: "line",
    },
    {
      id: "name",
      title: "The name of the theorem",
      meaning: "Other files use this name to refer to the theorem.",
    },
    {
      id: "statement",
      title: "The statement that is proved",
      meaning:
        "This is the name defined above. Mathlib had this definition before the proof existed. So the author could not change the statement to make it easier to prove.",
    },
    {
      id: "proof",
      title: "The proof is one name",
      meaning:
        "The line says only that the proof is elsewhere, under the name rhOfAll. Lean checks that rhOfAll proves exactly this statement. Step 2 opens rhOfAll.",
    },
  ],
  next: "Step 2 shows what rhOfAll is. The proof never works on zeta alone. It proves a larger statement about a whole family of functions, and zeta is one member.",
});
