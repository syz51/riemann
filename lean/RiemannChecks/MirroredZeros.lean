import Mathlib.NumberTheory.LSeries.RiemannZeta
import Mathlib.NumberTheory.Harmonic.ZetaAsymp

/-!
# Mirrored zeros of the Riemann zeta function in the open critical strip

Machine-checked companion to `docs/notes/background-zeta.md` (`riemann-33`).
Combines four Mathlib statements at the pinned Mathlib commit (`0df444a3`) to show that
zeros of `riemannZeta` in the open strip `0 < s.re < 1` come in mirrored pairs across
the critical line `Re(s) = 1 / 2`.
-/

namespace RiemannChecks

open Complex

/-- In the open critical strip `0 < s.re < 1`, `ζ(s) = 0` iff `ζ(1 - s) = 0`. -/
theorem riemannZeta_zero_iff_one_sub {s : ℂ} (h0 : 0 < s.re) (h1 : s.re < 1) :
    riemannZeta s = 0 ↔ riemannZeta (1 - s) = 0 := by
  have hs0 : s ≠ 0 := fun h => by simp [h] at h0
  have h1s_re : 0 < (1 - s).re := by simp [sub_re]; linarith
  have h1s0 : 1 - s ≠ 0 := fun h => by simp [h] at h1s_re
  rw [riemannZeta_def_of_ne_zero hs0, riemannZeta_def_of_ne_zero h1s0,
    div_eq_zero_iff, div_eq_zero_iff, completedRiemannZeta_one_sub]
  simp [Gammaℝ_ne_zero_of_re_pos h0, Gammaℝ_ne_zero_of_re_pos h1s_re]

/-- In the open critical strip `0 < s.re < 1`, zeros of `ζ` come in mirrored pairs
across the critical line `Re(s) = 1 / 2`: `ζ(s) = 0` iff `ζ(1 - conj s) = 0`. -/
theorem riemannZeta_zero_iff_one_sub_conj {s : ℂ} (h0 : 0 < s.re) (h1 : s.re < 1) :
    riemannZeta s = 0 ↔ riemannZeta (1 - starRingEnd ℂ s) = 0 := by
  have hconj : riemannZeta s = 0 ↔ riemannZeta (starRingEnd ℂ s) = 0 := by
    rw [riemannZeta_conj]
    exact (map_eq_zero (starRingEnd ℂ)).symm
  have h0' : 0 < (starRingEnd ℂ s).re := by simpa using h0
  have h1' : (starRingEnd ℂ s).re < 1 := by simpa using h1
  exact hconj.trans (riemannZeta_zero_iff_one_sub h0' h1')

#print axioms riemannZeta_zero_iff_one_sub_conj

end RiemannChecks
