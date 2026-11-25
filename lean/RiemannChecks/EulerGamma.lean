import Mathlib.Analysis.SpecialFunctions.Gamma.Basic
import Mathlib.Analysis.SpecialFunctions.Log.Deriv
import Mathlib.Analysis.SpecialFunctions.Pow.Asymptotics
import Mathlib.MeasureTheory.Function.JacobianOneDim

/-!
# Euler's logarithmic integral for the Gamma function

Machine-checked companion to `docs/notes/background-gamma.md`:
1. Vanishing of `x * (log x)^k` as `x → 0⁺` (`tendsto_mul_log_pow_zero`).
2. Euler's `n = 3` antiderivative check from E19 §14 (`euler_n_three_deriv`).
3. Equivalence of Euler's logarithmic integral `∫ x in Ioo 0 1, (-log x)^(s - 1)` with
   Mathlib's `Complex.Gamma s` for `0 < s.re` via the substitution `x = exp (-t)`.
4. Corollaries `∫ x in Ioo 0 1, (-log x)^n = n!` for all `n : ℕ`, and `n = 3 → 6`.
-/

namespace RiemannChecks

open Complex Filter MeasureTheory Real Set Topology

/-- For any natural number `k`, `x * (log x)^k → 0` as `x → 0⁺`. -/
theorem tendsto_mul_log_pow_zero (k : ℕ) :
    Tendsto (fun x : ℝ => x * (Real.log x) ^ k) (𝓝[>] 0) (𝓝 0) := by
  have h := Real.tendsto_pow_log_div_mul_add_atTop (1 : ℝ) 0 k one_ne_zero
  have h1 : Tendsto (fun t : ℝ => (Real.log t) ^ k / t) atTop (𝓝 0) := by
    simpa [one_mul, add_zero] using h
  have h2 : Tendsto (fun x : ℝ => (Real.log x⁻¹) ^ k / x⁻¹) (𝓝[>] 0) (𝓝 0) :=
    h1.comp tendsto_inv_nhdsGT_zero
  have h3 : Tendsto (fun x : ℝ => ((-1 : ℝ) ^ k) * ((Real.log x⁻¹) ^ k / x⁻¹)) (𝓝[>] 0) (𝓝 0) := by
    simpa using h2.const_mul ((-1 : ℝ) ^ k)
  refine h3.congr' ?_
  filter_upwards [self_mem_nhdsWithin] with x _
  rw [Real.log_inv, div_inv_eq_mul, neg_eq_neg_one_mul, mul_pow]
  ring_nf
  rw [mul_comm k 2, pow_mul]
  norm_num

/-- Euler's E19 §14 antiderivative check for `n = 3`. -/
theorem euler_n_three_deriv {x : ℝ} (hx : x ≠ 0) :
    HasDerivAt
      (fun x : ℝ => -x * (Real.log x) ^ 3 + 3 * x * (Real.log x) ^ 2 - 6 * x * Real.log x + 6 * x)
      ((-Real.log x) ^ 3) x := by
  have hlog : HasDerivAt Real.log x⁻¹ x := Real.hasDerivAt_log hx
  have hid : HasDerivAt (fun x : ℝ => x) 1 x := hasDerivAt_id x
  have h1 : HasDerivAt (fun x : ℝ => -x * (Real.log x) ^ 3)
      ((-1) * (Real.log x) ^ 3 + (-x) * (3 * (Real.log x) ^ 2 * x⁻¹)) x := by
    simpa using (hid.fun_neg).fun_mul (hlog.fun_pow 3)
  have h2 : HasDerivAt (fun x : ℝ => 3 * x * (Real.log x) ^ 2)
      ((3 * 1) * (Real.log x) ^ 2 + (3 * x) * (2 * (Real.log x) ^ 1 * x⁻¹)) x := by
    simpa using (hid.const_mul 3).fun_mul (hlog.fun_pow 2)
  have h3 : HasDerivAt (fun x : ℝ => 6 * x * Real.log x)
      ((6 * 1) * Real.log x + (6 * x) * x⁻¹) x := by
    simpa using (hid.const_mul 6).fun_mul hlog
  have h4 : HasDerivAt (fun x : ℝ => 6 * x) (6 * 1) x := hid.const_mul 6
  refine (((h1.fun_add h2).fun_sub h3).fun_add h4).congr_deriv ?_
  have hxx : x * x⁻¹ = 1 := mul_inv_cancel₀ hx
  calc
    ((-1) * Real.log x ^ 3 + -x * (3 * Real.log x ^ 2 * x⁻¹)) +
        (3 * 1 * Real.log x ^ 2 + 3 * x * (2 * Real.log x ^ 1 * x⁻¹)) -
        (6 * 1 * Real.log x + 6 * x * x⁻¹) + 6 * 1
      = (-Real.log x) ^ 3 + (x * x⁻¹ - 1) * (-3 * Real.log x ^ 2 + 6 * Real.log x - 6) := by ring
    _ = (-Real.log x) ^ 3 := by rw [hxx]; ring

/-- The map `t ↦ exp (-t)` sends `(0, ∞)` bijectively onto `(0, 1)`. -/
private lemma image_exp_neg_Ioi : (fun t : ℝ => Real.exp (-t)) '' Ioi 0 = Ioo 0 1 := by
  ext x
  simp only [mem_image, mem_Ioi, mem_Ioo]
  constructor
  · rintro ⟨t, ht, rfl⟩
    exact ⟨Real.exp_pos (-t), Real.exp_lt_one_iff.mpr (by linarith)⟩
  · rintro ⟨hx0, hx1⟩
    refine ⟨-Real.log x, ?_, ?_⟩
    · have : Real.log x < 0 := Real.log_neg hx0 hx1
      linarith
    · simp [Real.exp_log hx0]

/-- Change of variables `x = exp (-t)` turns Euler's logarithmic integral into
Mathlib's `Complex.Gamma s` for every complex `s` with `0 < s.re`. -/
theorem euler_log_integral_eq_Gamma {s : ℂ} (hs : 0 < s.re) :
    ∫ x in Ioo (0 : ℝ) 1, ((-Real.log x : ℝ) : ℂ) ^ (s - 1) = Complex.Gamma s := by
  rw [Complex.Gamma_eq_integral hs, Complex.GammaIntegral]
  rw [← image_exp_neg_Ioi]
  have hderiv : ∀ t ∈ Ioi (0 : ℝ), HasDerivWithinAt (fun t : ℝ => Real.exp (-t)) (-Real.exp (-t)) (Ioi 0) t := by
    intro t _
    have h : HasDerivAt (fun t : ℝ => Real.exp (-t)) (Real.exp (-t) * (-1)) t :=
      (Real.hasDerivAt_exp (-t)).comp t (hasDerivAt_id t).fun_neg
    simpa using h.hasDerivWithinAt
  have hinj : InjOn (fun t : ℝ => Real.exp (-t)) (Ioi 0) := by
    intro a _ b _ hab
    have := Real.exp_injective hab
    linarith
  rw [MeasureTheory.integral_image_eq_integral_abs_deriv_smul measurableSet_Ioi hderiv hinj]
  refine MeasureTheory.setIntegral_congr_fun measurableSet_Ioi fun t _ => ?_
  rw [abs_neg, abs_of_pos (Real.exp_pos (-t)), Real.log_exp, neg_neg, Complex.real_smul]

/-- For every natural number `n`, Euler's integral `∫ x in (0, 1), (-log x)^n` equals `n!`. -/
theorem euler_log_integral_nat (n : ℕ) :
    ∫ x in Ioo (0 : ℝ) 1, (-Real.log x) ^ n = (n.factorial : ℝ) := by
  have hs : 0 < ((n : ℂ) + 1).re := by simp; positivity
  have hC := euler_log_integral_eq_Gamma hs
  rw [Complex.Gamma_nat_eq_factorial] at hC
  have hcast :
      ∫ x in Ioo (0 : ℝ) 1, ((-Real.log x : ℝ) : ℂ) ^ (((n : ℂ) + 1) - 1) =
        (((∫ x in Ioo (0 : ℝ) 1, (-Real.log x) ^ n : ℝ) : ℂ)) := by
    have hfun :
        ∫ x in Ioo (0 : ℝ) 1, ((-Real.log x : ℝ) : ℂ) ^ (((n : ℂ) + 1) - 1) =
          ∫ x in Ioo (0 : ℝ) 1, (((-Real.log x) ^ n : ℝ) : ℂ) := by
      refine MeasureTheory.setIntegral_congr_fun measurableSet_Ioo fun x _ => ?_
      simp [Complex.cpow_natCast]
    rw [hfun]
    simpa using (integral_ofReal (𝕜 := ℂ) (f := fun x : ℝ => (-Real.log x) ^ n) (μ := volume.restrict (Ioo (0 : ℝ) 1)))
  rw [hcast] at hC
  exact_mod_cast hC

/-- Euler's explicit check for `n = 3` (E19 §14): `∫ x in (0, 1), (-log x)^3 = 6`. -/
theorem euler_log_integral_three :
    ∫ x in Ioo (0 : ℝ) 1, (-Real.log x) ^ 3 = 6 := by
  simpa [Nat.factorial] using euler_log_integral_nat 3

#print axioms tendsto_mul_log_pow_zero
#print axioms euler_n_three_deriv
#print axioms euler_log_integral_eq_Gamma
#print axioms euler_log_integral_nat
#print axioms euler_log_integral_three

end RiemannChecks
