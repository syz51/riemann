# The Stepanov determinant step against the classical argument

**Archived-release notice:** Part 2 of this note documents Lean declarations from the original 20 November 2026 17-million-line release (`leanprover-community/riemann-hypothesis`, commit `40e56bab026552e089d7afcfeff08d2defb9c005`) [7](../references.md#reference-7). As of 26 November 2026, the project's primary pinned source is the shorter 25 November 2026 edition (`lsernau/grh-lean`, commit `72fead10`, `grh/`) [37](../references.md#reference-37). Part 1 (Bombieri's classical Stepanov proof) is proof-independent.

The author's note opens its 20-step timeline with "10/6/26: Stepanov determinant" and calls the proof "a descendant of Stepanov's" [1](../references.md#reference-1). This note has three parts:

1. The classical Stepanov method for curves over finite fields, explained from scratch from Enrico Bombieri's 1974 Bourbaki exposition, read in full [23](../references.md#reference-23), with the Diophantine-approximation bridge and a genus-zero example from Machiel van Frankenhuijsen [24](../references.md#reference-24).
2. The Lean declarations in the pinned library (`leanprover-community/riemann-hypothesis`, commit `40e56bab026552e089d7afcfeff08d2defb9c005`) that carry the analogous step [7](../references.md#reference-7), located through the route table [00-route.md](00-route.md).
3. Our own comparison: what matches the classical method, what is new over the integers, and how well the weak pairing in [00-route.md](00-route.md) holds up.

Every Lean statement below is copied verbatim from the pinned commit `40e56bab026552e089d7afcfeff08d2defb9c005` [7](../references.md#reference-7). Plain-word explanations, comparisons and judgements are our own unless cited.

## Result in short

- In the classical setting, the Riemann hypothesis for a smooth curve over a finite field of `q` elements asks for square-root control on its point count: how far the count deviates from `q + 1` [23](../references.md#reference-23).
- Stepanov's idea is to build a nonzero rational function on the curve that vanishes to high order `m` at almost every rational point, and then compare its zeros with its poles: more vanishing order forces fewer points, with `m` chosen near the square root of `q` [23](../references.md#reference-23).
- Bombieri's 1974 proof avoids derivatives altogether: over a field of characteristic `p` when `q` is an even power of `p`, a function made of `p^μ`-th powers and the Frobenius map vanishes automatically to order at least `p^μ` at every fixed point, giving an upper bound once `p^μ` equals the square root of `q` [23](../references.md#reference-23).
- A crucial fact from reading Bombieri in full: an upper bound on the point count alone does **not** prove the Riemann hypothesis for a curve [23](../references.md#reference-23). Bombieri gives an explicit counterexample and obtains the matching lower bound by applying the same upper-bound construction to every element of a Galois cover over the projective line, where the total count is known [23](../references.md#reference-23).
- In the pinned Lean library, no declaration we located is named after Stepanov ([00-route.md](00-route.md)). Instead, the Step D4 declarations we read carry four distinct pieces of the Stepanov blueprint: local divisibility of a `2 × 2` minor from a Frobenius congruence (`key_minor_dvd`), iterated operator chains (`chainOp`, `ChainInt`) of length near the square root of `x` (`RankVal`), Bost's Euclidean slope inequality (`SlopeInequality`, `slopeInequality_of`), and the balance between inert-prime divisibility (`ASK`) and archimedean periods (`MAIN`, `chowla_selberg_period`) [7](../references.md#reference-7).
- Our own judgement: the architectural kinship with Stepanov is real, but two pieces are genuinely different over the integers. First, because integers have no global Frobenius morphism or characteristic `p`, an iterated chain of theta lifts replaces Bombieri's `p^μ`-th power trick. Second, whereas Bombieri needed a Galois cover to turn upper bounds into two-sided bounds [23](../references.md#reference-23), the Lean proof over the integers turns a one-sided upper bound on sparse windows directly into a zero-free half-plane via a localized Landau theorem (`zeroFree_of_rpow_window`, read in [00-route.md](00-route.md)) [7](../references.md#reference-7).

---

## Part 1: The classical Stepanov method in plain words

### From the Riemann hypothesis to counting points on curves

The ordinary Riemann hypothesis asks for optimal square-root control on the count of prime numbers up to a given size [1](../references.md#reference-1). There is a parallel problem in a finite world.

A **finite field** `k = F_q` is a finite number system of `q` elements in which you can add, subtract, multiply and divide by any nonzero element; its size `q = p^α` is always a power of a prime `p`, called the **characteristic** of the field (meaning adding `1` to itself `p` times gives `0`) [23](../references.md#reference-23). For each integer `r ≥ 1`, there is a larger finite field `k_r = F_{q^r}` containing `k` with `q^r` elements [23](../references.md#reference-23).

A **projective non-singular curve** `C` over `k` is the set of solutions to polynomial equations in projective space (so points at infinity are included, and the curve has no sharp corners or self-intersections) [23](../references.md#reference-23). Every such curve has a non-negative integer invariant `g`, its **genus**, which measures its complexity (for instance, the projective line `P^1` has `g = 0`, and an elliptic curve has `g = 1`) [23](../references.md#reference-23) [24](../references.md#reference-24). Write `ν_r(C)` for the number of points of `C` whose coordinates lie in `F_{q^r}` [23](../references.md#reference-23).

Bombieri opens his exposition with three standard facts [23](../references.md#reference-23):

- Formula (1): `ν_r(C) = q^r − ∑_{i=1}^{2g} ω_i^r + 1`, where the `2g` complex numbers `ω_i` are algebraic integers independent of `r`.
- Formula (2), the functional equation: `ω_i ω_{2g-i} = q` (in Bombieri's indexing).
- Formula (3), the **Riemann hypothesis for `C`**: `|ω_i| = q^{1/2}` for every `i`.

Formulas (1) and (2) are consequences of the Riemann–Roch theorem on `C`, while (3) lies deeper [23](../references.md#reference-23). From (1) and (3) follows Weil's bound, formula (4): `|ν_r(C) − (q^r + 1)| ≤ 2g q^{r/2}` [23](../references.md#reference-23). Here `q^r + 1` is the point count of the projective line `P^1` over `F_{q^r}` [23](../references.md#reference-23), and the error term is of square-root size `q^{r/2}`, playing the same role as the square-root error in prime counting.

Before Stepanov, every general proof of (3) followed André Weil's 1948 approach, using either the Jacobian variety of `C` or intersection theory (Riemann–Roch) on the product surface `C × C` [23](../references.md#reference-23). In 1969, S. A. Stepanov found an elementary method for special curves such as hyperelliptic, Kummer and Artin–Schreier coverings of `P^1`, and Wolfgang Schmidt extended it to general curves [23](../references.md#reference-23).

### Stepanov's core idea: zeros versus poles

A **rational function** `f` on `C` is a ratio of polynomials on the curve. At any point of `C`, a nonzero rational function has an integer **order** (`ord f`): positive if `f` vanishes there (a **zero**, counted with its **multiplicity**), negative if `f` blows up there (a **pole**), and zero otherwise [23](../references.md#reference-23). On a projective curve, a fundamental rule holds: a nonzero rational function has the same total number of zeros and poles, counted with multiplicity [23](../references.md#reference-23).

Bombieri summarizes Stepanov's idea on page 235 in three lines [23](../references.md#reference-23): construct a rational function `f` on `C`, not identically zero, such that `f` vanishes to order at least `m` at every `k`-rational point of `C`, except possibly at a fixed set of `m_0` rational points. Counting zeros against poles immediately gives:

```text
m · (ν_1(C) − m_0) ≤ (# zeros of f) = (# poles of f)
```

and therefore:

```text
ν_1(C) ≤ m_0 + (1 / m) · (# poles of f).
```

If one can build such a nonzero `f` whose pole count is not too large, one gets an upper bound on `ν_1(C)` of roughly the same strength as Weil's bound [23](../references.md#reference-23).

In Stepanov's original construction and in Schmidt's general proof, checking that `f` vanishes to order at least `m` required working with derivatives or hyperderivatives of `f` up to order `m − 1`, with `m` ultimately chosen near `q^{1/2}` [23](../references.md#reference-23). Bombieri's 1974 exposition keeps the same zero-versus-pole principle but eliminates derivatives completely [23](../references.md#reference-23).

### Bombieri's derivation-free proof (Theorem 1)

Following a suggestion of Jean-Pierre Serre, Bombieri passes to the algebraic closure `k̄` of `k` [23](../references.md#reference-23). On `C` over `k̄`, the **Frobenius morphism** `φ : C → C` raises coordinates to the `q`-th power [23](../references.md#reference-23). A point `x` lies in `F_q` exactly when `x^q = x`, so `ν_1` is the number of fixed points of `φ`, and `ν_r` is the number of fixed points of `φ^r` [23](../references.md#reference-23).

Assume `q = p^α` where the exponent `α` is **even** (so `q^{1/2} = p^{α/2}` is a power of the characteristic `p`), and assume `q > (g + 1)^4` [23](../references.md#reference-23). Bombieri's **Theorem 1** (page 236) states that under these hypotheses [23](../references.md#reference-23):

```text
ν_1 < q + (2g + 1) q^{1/2} + 1.
```

The proof has four short moves, all verified from pages 236 to 239 of Bombieri [23](../references.md#reference-23):

1. **Pick one base point and measure pole spaces by Riemann–Roch.** If `φ` has no fixed point, `ν_1 = 0` and there is nothing to prove. Otherwise fix one fixed point `x_0`, and for each integer `m ≥ 0` define `R_m` to be the vector space of rational functions on `C` whose only possible pole is at `x_0`, of order at most `m` (written `(f) ≥ −m x_0`). The Riemann–Roch theorem on `C` gives three simple facts:
   - `dim R_m ≤ m + 1`,
   - `dim R_m ≥ m + 1 − g`, with equality when `m > 2g − 2`,
   - `dim R_{m+1} ≤ dim R_m + 1`.
   The third fact guarantees a basis `s_1, …, s_r` of `R_m` whose pole orders at `x_0` are strictly distinct (`ord s_1 < ord s_2 < … < ord s_r`).

2. **Build a space of `p^μ`-th powers with Frobenius.** Fix an integer `μ` with `p^μ` dividing `q`, and integers `l, m ≥ g` satisfying `l p^μ < q`. Let `R_l^{(p^μ)}` be the subspace of `p^μ`-th powers `σ^{p^μ}` with `σ ∈ R_l`, and let `R_m ∘ φ` be the subspace of Frobenius-pulled functions `s ∘ φ` with `s ∈ R_m`. Because `φ(x_0) = x_0`, every `s ∘ φ` has pole order at `x_0` multiplied by `q` (it lies in `R_{mq}` and is a `q`-th power).
   Bombieri's **Key Lemma** (pages 236 to 237) proves that as long as `l p^μ < q`, the products `σ_i^{p^μ} · (s_i ∘ φ)` cannot cancel each other: the natural map `R_l^{(p^μ)} ⊗ (R_m ∘ φ) → R_l^{(p^μ)}(R_m ∘ φ)` is an isomorphism, so the spanned space has dimension `(dim R_l)(dim R_m)` (Bombieri's Corollary, equation (6)). The proof is a single pole-order comparison at `x_0`: if `∑_{i=ρ}^r σ_i^{p^μ}(s_i ∘ φ) ≡ 0` with `σ_ρ ≢ 0`, then because `ord(s_i ∘ φ) = q · ord(s_i)` jumps by at least `q` between basis elements while `ord(σ_i^{p^μ}) ≥ −l p^μ > −q`, the leading term forces `p^μ · ord(σ_ρ) ≥ −l p^μ + q > 0`, making `σ_ρ` vanish at `x_0` with no poles anywhere — impossible for a nonzero function.

3. **Force vanishing at every fixed point by linear algebra (dimension counting).** Because the representation `f = ∑ σ_i^{p^μ}(s_i ∘ φ)` is unique by the Key Lemma, replacing `s_i ∘ φ` by `s_i` defines a well-defined linear map `δ` into `R_{l p^μ + m}`:
   ```text
   δ : ∑ σ_i^{p^μ} (s_i ∘ φ) ↦ ∑ σ_i^{p^μ} s_i.
   ```
   By linear algebra and Riemann–Roch, whenever `(l + 1 − g)(m + 1 − g) > l p^μ + m + 1 − g`, the domain has strictly larger dimension than the target, so `dim ker(δ) > 0` and there exists a nonzero `f ∈ ker(δ)`.
   Now check `f` at any fixed point `x ≠ x_0` of `φ`: since `φ(x) = x`, we have `f(x) = ∑ σ_i^{p^μ}(x) s_i(φ(x)) = (δf)(x) = 0`. Better yet, every `σ_i^{p^μ}` is a `p^μ`-th power, and every `s_i ∘ φ` is a `q`-th power, hence also a `p^μ`-th power because `p^μ` divides `q`. In characteristic `p`, a sum of `p^μ`-th powers is itself a `p^μ`-th power (`(a + b)^{p^μ} = a^{p^μ} + b^{p^μ}`). Therefore `f` is a `p^μ`-th power, so wherever `f` vanishes, it automatically vanishes to order **at least `p^μ`** — no derivatives needed.

4. **Compare zeros and poles, then optimize `p^μ`.** A nonzero `f ∈ ker(δ)` has at least `p^μ (ν_1 − 1)` zeros (at the `ν_1 − 1` fixed points other than `x_0`), and since `f ∈ R_{l p^μ + mq}`, it has at most `l p^μ + m q` poles. Dividing by `p^μ` gives Bombieri's equation (7):
   ```text
   ν_1 ≤ l + m q / p^μ + 1.
   ```
   Notice the trade-off: raising `p^μ` shrinks `m q / p^μ`, while the non-cancellation condition `l p^μ < q` and the dimension condition `(l + 1 − g)(m + 1 − g) > l p^μ + m + 1 − g` push `m` to be at least roughly `p^μ` (and `l` roughly `q / p^μ`, as van Frankenhuijsen shows explicitly in equation (3.8) [24](../references.md#reference-24)). The two terms balance when `p^μ = q / p^μ`, i.e., `p^μ = q^{1/2}` (`μ = α / 2`). Bombieri chooses `μ = α / 2`, `m = p^μ + 2g`, and `l = ⌊(g / (g + 1)) p^μ⌋ + g + 1`; for `q > (g + 1)^4`, all hypotheses hold and equation (7) yields `ν_1 < q + (2g + 1) q^{1/2} + 1`.

**Toy check for genus `g = 0`.** Van Frankenhuijsen gives the explicit genus-zero case in Example 3.5 [24](../references.md#reference-24): on the projective line `P^1`, take `f(X, Y) = X^{p^μ} − Y^{p^μ}`. Restricting to the diagonal `Y = X` gives `0` (that is `δf = 0`), while restricting to the Frobenius graph `Y = X^q` gives `f(X, X^q) = X^{p^μ} − X^{q p^μ}`, which vanishes to order `p^μ` at every `x ∈ F_q` and has a pole of order `q p^μ` at infinity, yielding `p^μ (N_{P^1}(1) − 1) ≤ q p^μ`, hence `N_{P^1}(1) ≤ q + 1`. For higher genus, Riemann–Roch and the kernel of `δ` replace that explicit binomial.

### Why an upper bound alone is not enough, and how Bombieri finishes

A point easy to miss in brief summaries is Section III of Bombieri (pages 239 to 240) [23](../references.md#reference-23). Bombieri notes explicitly that the Theorem 1 argument gives no lower bound for `ν_1`, "while this is needed if we want to deduce the Riemann hypothesis" [23](../references.md#reference-23).

His counterexample is two lines [23](../references.md#reference-23): take `g = 1`, `ω_1 = q`, and `ω_2 = 1`. Then the functional equation `ω_1 ω_2 = q` holds, and `ν_r = q^r − q^r − 1 + 1 = 0` satisfies every upper bound `ν_r ≤ q^r + O(q^{r/2})`, yet `|ω_1| = q ≠ q^{1/2}`, so the Riemann hypothesis fails.

To get the lower bound too, Bombieri argues in two steps [23](../references.md#reference-23):

1. **Galois cover over `P^1` (equations (8) to (10), pages 239 to 240).** Choose a non-constant separable map `C → P^1` and pass to a Galois closure `C' → C → P^1`, where `C' → P^1` has finite Galois group `G` and `C' → C` corresponds to a subgroup `H ⊆ G` (after a finite base-field extension so `G` acts over `k` and `q` is an even power of `p`). For each unramified `k`-rational point `x ∈ P^1` and point `y ∈ C'` above `x`, the Frobenius map acts as some element `η ∈ G`: `φ(y) = η · y`. Write `ν_1(C', η)` for the number of such points with Frobenius substitution `η`.
   Replacing `δ` by the twisted map `δ_η : R_l^{(p^μ)}(R_m ∘ φ) → R_l^{(p^μ)}(R_m ∘ η)` runs the exact same proof for every `η ∈ G` and gives the upper bound (8): `ν_1(C', η) ≤ q + (2g' + 1) q^{1/2} + 1`, where `g'` is the genus of `C'`.
   On the other hand, every unramified point of `P^1(F_q)` has `|G|` points of `C'` above it, so the total across all `η ∈ G` is known (equation (9)):
   ```text
   ∑_{η ∈ G} ν_1(C', η) = |G| · ν_1(P^1) + O(1) = |G|(q + 1) + O(1).
   ```
   Because `|G|` numbers sum to `|G| q + O(1)` and each is at most `q + O(q^{1/2})`, no single term can dip below `q − O(q^{1/2})` either! Hence `ν_1(C', η) = q + O(q^{1/2})` for every `η ∈ G` (equation (10)). Summing over the subgroup `H` (`∑_{η ∈ H} ν_1(C', η) = |H| · ν_1(C) + O(1)`) gives the two-sided bound `ν_1(C) = q + O(q^{1/2})`.

2. **From `ν_r = q^r + O(q^{r/2})` to `|ω_i| = q^{1/2}`.** Bombieri invokes an approximation argument on page 239 [23](../references.md#reference-23). Van Frankenhuijsen proves this step in Lemma 3.1 (page 19) [24](../references.md#reference-24): if `|N_C(nm) − q^{nm} − 1| ≤ B q^{nm(1/2 + ε)}` for every `n`, then by Diophantine approximation there are infinitely many `n` for which every `ω_i^{nm}` has real part at least `(1/2) |ω_i|^{nm}` (so their sum cannot cancel), forcing `(1/2) max_i |ω_i|^{nm} ≤ B q^{nm(1/2 + ε)}`. Letting `n → ∞` gives `|ω_i| ≤ q^{1/2 + ε}` for every `ε > 0`, hence `|ω_i| ≤ q^{1/2}`, and the functional equation `ω_i ω_{2g-i} = q` forces equality `|ω_i| = q^{1/2}` [23](../references.md#reference-23) [24](../references.md#reference-24).

---

## Part 2: The Lean statements in the library that carry this step

As [00-route.md](00-route.md) records, the index (`nasqret/riemann-rev`) has no declaration or section named after Stepanov; our pairing of timeline step 1 ("Stepanov determinant") with Step D4 of the index was marked weak. To test that pairing directly against the pinned source (`leanprover-community/riemann-hypothesis`, commit `40e56bab026552e089d7afcfeff08d2defb9c005`) [7](../references.md#reference-7), we fetched and read ten files from Step D4 and Component 9 of the index.

We have **not** yet traced the chain of proof terms from `every_character_of_literature_of_vWin` (level 4 in [00-route.md](00-route.md)) down into these ten files. Everything below is verified as present verbatim at commit `40e56bab026552e089d7afcfeff08d2defb9c005`, while its exact wiring into `Main.lean` remains to be traced.

### 1. Local divisibility from a Frobenius congruence and a `2 × 2` minor

File `src/Formalism/SharpRestriction/GrowthBounds/CoarseMultiplicity/KeyMinorDvd.lean` (commit `40e56bab026552e089d7afcfeff08d2defb9c005`, lines 132 to 136; read in full) [7](../references.md#reference-7):

```lean
theorem key_minor_dvd {A : Type} [CommRing A] (p : ℕ) (hp : p.Prime) (w : A) (hw : w ^ 2 = (p : A)) (k e : ℕ)
    (u u' : Fin (k + 1) → A) (M N' : Fin (k + 1) → Fin (k + 1) → A)
    (hMN : ∀ b a, ∃ T, M b a ^ (p ^ e) = N' b a + p * T)
    (hu : ∀ b, b ≠ 0 → w ∣ u b) (hu' : ∀ b, b ≠ 0 → w ∣ u' b) (c : Fin (k + 1)) :
    w ∣ (∑ b, u' b * N' b c) * (∑ b, u b * M b 0) ^ (p ^ e) - (∑ b, u' b * N' b 0) * (∑ b, u b * M b c) ^ (p ^ e) := by
```

Its companion theorem in the same file (lines 11 to 16) [7](../references.md#reference-7):

```lean
theorem key_pow_dvd {A : Type} [CommRing A] (p : ℕ) (hp : p.Prime) (w : A) (hw : w ^ 2 = (p : A)) (k e : ℕ)
    (u v : Fin (k + 1) → A) (M N' N : Fin (k + 1) → Fin (k + 1) → A)
    (hMN : ∀ b a, ∃ T, M b a ^ (p ^ e) = N' b a + p * T)
    (hinv : ∀ b b', ∑ a, N' b a * N a b' = if b = b' then 1 else 0)
    (hu : ∀ b, b ≠ 0 → w ∣ u b) (hv0 : w ∣ v 0) :
    w ∣ ∑ a, (∑ b, u b * M b a) ^ (p ^ e) * (∑ b', v b' * N a b') := by
```

In plain words: take a commutative ring `A`, a prime `p`, and an element `w` with `w^2 = p`. Suppose two `(k + 1) × (k + 1)` matrices `M` and `N'` satisfy the Frobenius-power congruence `M b a ^ (p ^ e) ≡ N' b a (mod p)`, and two vectors `u`, `u'` have every entry after index `0` divisible by `w`. Then `w` divides the `2 × 2` determinant (minor) formed from columns `0` and `c` of the vector `u' · N'` and the `p^e`-th power of `u · M`.

We read the 18-line proof of `key_minor_dvd` (lines 138 to 155) [7](../references.md#reference-7): it maps into the quotient ring `A / (w)`. Since `w^2 = p`, both `w` and `p` become `0` there; all terms with `b ≠ 0` drop out; and `M 0 a ^ (p ^ e)` becomes `N' 0 a`, making the two products equal so their difference vanishes modulo `w`. The rest of the file (`kS_ord`, `kW_ord`, `key3Ord`, `key3At`, lines 62 to 226) applies `key_pow_dvd` and `key_minor_dvd` to multivariate polynomial rings over a discrete valuation ring `O` with `S.w ^ 2 = p` and Frobenius congruences `frobCong`, proving `CoarseMultiplicityOrderBound` and `CoarseMultiplicityBoundAtIdentity` (defined in `src/Formalism/SharpRestriction/GrowthBounds/CoarseMultiplicity/KeyOne.lean`, lines 114 to 131, read in full) [7](../references.md#reference-7).

### 2. Chaining operators and preserving integrality (`chainOp`, `ChainInt`)

File `src/Formalism/ThetaLiftIndependence/Statement.lean` (commit `40e56bab026552e089d7afcfeff08d2defb9c005`, lines 10 to 12, 24 to 27, 40 to 45, 148 to 150, 232 to 235, 244 to 251; read in full) [7](../references.md#reference-7):

```lean
def kerOp {R ι κ : Type*} [CommSemiring R] [Fintype ι] (w : ι → R) (K : ι → κ → R)
    (f : ι → R) : κ → R :=
  fun j => ∑ i, w i * f i * K i j
```

```lean
def chainOp {R : Type*} [CommSemiring R] {ι : ℕ → Type*} [∀ j, Fintype (ι j)]
    (w : ∀ j, ι j → R) (K : ∀ j, ι j → ι (j + 1) → R) : (m : ℕ) → (ι 0 → R) → (ι m → R)
  | 0, f => f
  | m + 1, f => kerOp (w m) (K m) (chainOp w K m f)
```

```lean
def ChainInt : Prop :=
  ∀ (R : Type) [CommRing R] (S : Subring R) (ι : ℕ → Type) [∀ j, Fintype (ι j)]
    (w : ∀ j, ι j → R) (K : ∀ j, ι j → ι (j + 1) → R) (D : ℕ → R),
    (∀ j i, D j * w j i ∈ S) → (∀ j a b, K j a b ∈ S) →
    ∀ f : ι 0 → R, (∀ i, f i ∈ S) → ∀ (m : ℕ) (y : ι m),
      (∏ j ∈ Finset.range m, D j) * chainOp w K m f y ∈ S
```

```lean
def thetaLift (h : V →ₗ⋆[K] V →ₗ[K] K) (s : Finset (Submodule (NumberField.RingOfIntegers K) V))
    (f : Submodule (NumberField.RingOfIntegers K) V → ℂ) (τ : ℂ) : ℂ :=
  latLift h s f (fun L => Formalism.HermitianLatticesTheory.thetaL h L 0 τ)
```

In plain words: `kerOp` applies one finite weighted kernel sum (such as a theta lift over a finite set of Hermitian lattice classes, weighted by `1 / |Aut L|`, as defined in `latWt` and `thetaLift` on lines 136 to 150 of the same file [7](../references.md#reference-7)), and `chainOp` iterates it `m` times. `ChainInt` states that if each step's kernel values lie in an integral subring `S` and each step's weights land in `S` once multiplied by a denominator `D j`, then after `m` steps the output lies in `S` once multiplied by `∏_{j < m} D j`.

The same file also states the Hermitian-lattice seesaw identity (`LatSeeSaw`, lines 186 to 198), the Rallis inner-product scaling relation (`RallisHyp`, lines 232 to 235), and the chain-scaling proposition (`ChainScalar`, lines 244 to 251) [7](../references.md#reference-7):

```lean
def RallisHyp {𝕜 E F P : Type*} [RCLike 𝕜] [NormedAddCommGroup E] [InnerProductSpace 𝕜 E]
    [NormedAddCommGroup F] [InnerProductSpace 𝕜 F] (θ : E →ₗ[𝕜] F) (S : Submodule 𝕜 E)
    (Pset : Finset P) (c L : 𝕜) (Z : P → 𝕜) : Prop :=
  ∀ x ∈ S, ∀ y ∈ S, inner 𝕜 (θ x) (θ y) = c * L * (∏ v ∈ Pset, Z v) * inner 𝕜 x y
```

```lean
def ChainScalar : Prop :=
  ∀ (𝕜 : Type) [RCLike 𝕜] (E : ℕ → Type) [∀ j, NormedAddCommGroup (E j)]
    [∀ j, InnerProductSpace 𝕜 (E j)] [∀ j, FiniteDimensional 𝕜 (E j)]
    (T : ∀ j, E (j + 1) →ₗ[𝕜] E j) (S : ∀ j, Submodule 𝕜 (E j)) (c : ℕ → 𝕜),
    (∀ j, ∀ x ∈ S j, T j (LinearMap.adjoint (T j) x) = c j • x) →
    (∀ j, ∀ x ∈ S j, LinearMap.adjoint (T j) x ∈ S (j + 1)) →
    ∀ (m : ℕ), ∀ x ∈ S 0,
      downChain T m (LinearMap.adjoint (downChain T m) x) = (∏ j ∈ Finset.range m, c j) • x
```

Note that `Statement.lean` defines these propositions; we did not read the separate proof files that discharge them.

### 3. The chain length near `√x` (`RankVal`)

File `src/Development/AbelianVarietyTheory/Definitions/GlobalTwisting/PairRowIffQdRows.lean` (commit `40e56bab026552e089d7afcfeff08d2defb9c005`, lines 28 to 32; lines 1 to 80 read) [7](../references.md#reference-7):

```lean
def RankVal (s : Scale) (R : Ranks) : Prop :=
  (s.x ^ (2 + 8 * s.eps) ≤ (R.n : ℝ) ∧ (R.n : ℝ) ≤ 2 * s.x ^ (2 + 8 * s.eps)) ∧
  (Real.sqrt (s.x * s.delta1) ≤ (R.m : ℝ) ∧ (R.m : ℝ) ≤ 2 * Real.sqrt (s.x * s.delta1)) ∧
  (s.x ^ (9 / 2 + 10 * s.eps) ≤ (R.k : ℝ) ∧ (R.k : ℝ) ≤ 2 * s.x ^ (9 / 2 + 10 * s.eps)) ∧
  R.r + R.t = 8 * R.f * R.r + 4 + TOv s * nWv R s
```

In plain words: at scale `s.x`, `RankVal` pins the integer parameter `R.m` between `√(s.x · s.delta1)` and `2 √(s.x · s.delta1)`. This matches the author's note on page 1: "for the von Mangoldt sum of length X, Claude's suggested length of chain of theta lifts, in view of each mimicking multiplicity, was √X" [1](../references.md#reference-1) (we have not read the definitions of `Scale` and `Ranks` to verify the exact formula for `s.delta1`).

### 4. Bost's slope inequality (`SlopeInequality`, `slopeInequality_of`)

A **Euclidean lattice** `L` in a finite-dimensional real inner-product space `E` is a discrete `ℤ`-submodule of `E` (a grid of integer combinations of basis vectors). Its **covolume** `covol L` is the volume of one fundamental box, computed as the square root of the Gram determinant of a `ℤ`-basis; its **degree** is `deg L = −log(covol L)` (so a tighter grid has higher degree); its **slope** is `slope L = deg L / rk L`; and `muMax L` is the supremum of `slope N` over all nonzero sublattices `N ≤ L`.

File `src/Formalism/LatticeSlopes/Statement.lean` (commit `40e56bab026552e089d7afcfeff08d2defb9c005`, lines 15 to 30 and 75 to 81; read in full) [7](../references.md#reference-7):

```lean
def covol (L : Submodule ℤ E) : ℝ :=
  if h : DiscreteTopology L then
    haveI := h
    Real.sqrt (Matrix.gram ℝ (fun i => ((Module.finBasis ℤ L i : L) : E))).det
  else 0

def rk (L : Submodule ℤ E) : ℕ := Module.finrank ℤ L

def deg (L : Submodule ℤ E) : ℝ := -Real.log (covol L)

def slope (L : Submodule ℤ E) : ℝ := deg L / (rk L : ℝ)

def slopes (L : Submodule ℤ E) : Set ℝ :=
  {t | ∃ N : Submodule ℤ E, N ≤ L ∧ N ≠ ⊥ ∧ slope N = t}

def muMax (L : Submodule ℤ E) : ℝ := sSup (slopes L)
```

```lean
def SlopeInequality : Prop :=
  ∀ (E F : Type*) [NormedAddCommGroup E] [InnerProductSpace ℝ E] [FiniteDimensional ℝ E]
    [NormedAddCommGroup F] [InnerProductSpace ℝ F] [FiniteDimensional ℝ F]
    (L : Submodule ℤ E) (M : Submodule ℤ F), DiscreteTopology L → DiscreteTopology M → L ≠ ⊥ →
    ∀ (φ : L →ₗ[ℤ] M) (C : ℝ), Function.Injective φ →
    (∀ x : L, ‖((φ x : M) : F)‖ ≤ C * ‖(x : E)‖) →
    slope L ≤ muMax M + Real.log C
```

File `src/Formalism/LatticeSlopes/LatticeSlopesProofs/SlopeInequality.lean` (commit `40e56bab026552e089d7afcfeff08d2defb9c005`, line 111; read in full) [7](../references.md#reference-7):

```lean
theorem slopeInequality_of (h : SlopeLeMuMax.{v}) : SlopeInequality.{u, v} := by
```

In plain words: if `φ : L → M` is an injective `ℤ`-linear map between Euclidean lattices with operator norm at most `C` (`‖φ(x)‖ ≤ C ‖x‖` for every `x ∈ L`), then `slope L ≤ muMax M + log C`. We read the entire proof of `slopeInequality_of`: it sets `N = range φ ≤ M`, establishes `rk N = rk L = r`, applies the Gram-determinant bound `gram_det_le` (extended from integer to real combinations by density of `ℚ`) to obtain `covol N ≤ C^r · covol L`, takes `−log` and divides by `r` to get `slope L ≤ slope N + log C`, and closes with `slope N ≤ muMax M` from `h : SlopeLeMuMax`.

Why does this play the role of `# zeros ≤ # poles`? Our own explanation: if an injective map `φ : L → M` has image divisible by a large integer `d > 1` (that is, `φ(L) ⊆ d · M`), then `d · M` has covolume `d^r · covol M` and hence `muMax (d · M) = muMax M − log d` (equivalently, dividing `φ` by `d` gives an injective map `L → M` with operator norm `C / d`). Applying `SlopeInequality` then gives `slope L ≤ muMax M + log C − log d`, or `log d ≤ muMax M − slope L + log C`: the logarithm of the divisibility gained at finite places is bounded above by the logarithm of the map's archimedean norm `C` together with the lattice slopes.

### 5. The prime-sum side (`ASK`), the archimedean side (`MAIN`, `chowla_selberg_period`), and `TopG`

File `src/Formalism/SizeWindowBrackets/FirstPrimeNeSecondPrime.lean` (commit `40e56bab026552e089d7afcfeff08d2defb9c005`, lines 72 to 101; read in full) [7](../references.md#reference-7):

```lean
def IsInert (D : ArithData H) (p : ℕ) : Prop :=
  p.Prime ∧ p ≠ 2 ∧ p ≠ D.q1 ∧ p ≠ D.d ∧ ¬ InPhi (D.frob p)

def askP (D : ArithData H) (N : ℕ) (a : ℝ) (t : H) (w : E0 × H → ℝ) (p : ℕ) : ℝ :=
  ∑ i ∈ (Icc 1 N).filter (fun i => ¬ InPhi (i • D.frob p)),
    max (a / (p : ℝ) ^ i - w (partner t (i • D.frob p))) 0

def askD (D : ArithData H) (N : ℕ) (a : ℝ) (t : H) (w : E0 × H → ℝ) : ℝ := by
  classical
  exact ∑ i ∈ Icc 1 N, ∑ g ∈ univ.filter (fun g => g - i • D.frob D.d ∈ D.inertia D.d ∧ ¬ InPhi g),
    max (a / (D.d : ℝ) ^ i - w (partner t g)) 0

def ASK (D : ArithData H) (N : ℕ) (a : ℝ) (t : H) (w : E0 × H → ℝ) : ℝ := by
  classical
  exact (∑ p ∈ (range (N + 1)).filter (IsInert D), 2 * Real.log p * askP D N a t w p)
    + Real.log D.d * askD D N a t w

def MAIN (ell : AddChar (E0 × H) ℂ → ℂ) (a : ℝ) (w : E0 × H → ℝ) : ℂ :=
  (a : ℂ) * (((Real.log a - 1 - Real.eulerMascheroniConstant : ℝ) : ℂ) + ell chC
    - (((1 / ((PhiSet (H := H)).card : ℝ)) * ∑ ρ ∈ PhiSet (H := H), Real.log (w ρ) : ℝ) : ℂ))

def De (D : ArithData H) (ell : AddChar (E0 × H) ℂ → ℂ) (a : ℝ) (t : H) (w : E0 × H → ℝ) : ℂ :=
  (1 / ((PhiSet (H := H)).card : ℂ)) * ∑ g ∈ univ.filter (fun g : E0 × H => ¬ InPhi g),
    ∑ ψ : AddChar (E0 × H) ℂ, starRingEnd ℂ (ψ g) * ((w (partner t g) : ℝ) : ℂ)
      * GPsi D ell ψ (a / w (partner t g))

def AskMainBalance : Prop :=
  ∀ (D : ArithData H), HostFacts D → ∀ (ell : AddChar (E0 × H) ℂ → ℂ) (a : ℝ) (t : H) (w : E0 × H → ℝ),
    0 < a → (∀ ρ, InPhi ρ → 0 < w ρ) → ∀ N : ℕ, (∀ ρ, InPhi ρ → a / w ρ ≤ N) →
      (ASK D N a t w : ℂ) - MAIN ell a w = De D ell a t w
```

In plain words: `ASK` is a sum over primes `p` that are inert (`IsInert`, plus the ramified prime `D.d`), where each prime power `p^i` whose Frobenius element falls outside `PhiSet` contributes `2 log p` times the ramp `max(a / p^i − w(...), 0)`. `MAIN` is the expected archimedean main term, involving `log a − 1 − γ` (`Real.eulerMascheroniConstant`), the character term `ell chC`, and the average of `log (w ρ)` over `PhiSet`. `AskMainBalance` states that `ASK − MAIN` equals `De`, a finite Fourier sum over all characters `ψ` of `E0 × H` of the centred prime sums `GPsi`.

Where do `γ` and `L'(1, χ) / L(1, χ)` enter the archimedean side? File `src/Development/AutomorphicSpectrum/Proofs/GeometryProofs/ChowlaSelbergPeriodStatement.lean` (commit `40e56bab026552e089d7afcfeff08d2defb9c005`, line 9; read in full) [7](../references.md#reference-7):

```lean
theorem _root_.GlobalTheory.T.chowla_selberg_period : ∀ (E : Type) [Field E] [NumberField E] [IsCMField E] (H : Host E) [NeZero H.d] (χ : DirichletCharacter ℂ H.d), IsKroneckerChar χ → ∀ ρ : ℂ, ρ ^ 2 = -(H.d : ℂ) → ∃ (Z : Curve0 H ρ) (x : ℝ), Z.z ≠ 0 ∧ Z.C.HasPeriod x ∧ (x : ℂ) = (Real.eulerMascheroniConstant + Real.log (2 * Real.pi / √H.d) : ℝ) - deriv χ.LFunction 1 / χ.LFunction 1 := by
```

In plain words: for a CM field `E`, a host `H` and the quadratic Kronecker character `χ` modulo `H.d`, there exists an elliptic curve object `Z` with nonzero `Z.z` and real period `x` equal to `γ + log(2π / √(H.d)) − L'(1, χ) / L(1, χ)`.

Finally, we read two assembly theorems from the index's Component 9 at commit `40e56bab026552e089d7afcfeff08d2defb9c005` — `topDesWin` in `src/Development/AutomorphicArithmetic/CharacterBoxes/DesWin.lean` (lines 11 to 22) and `shape_closed_link_n_of_green` in `src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopShape.lean` (line 33) [7](../references.md#reference-7):

```lean
theorem topDesWin (𝒞 𝒞' ℰ : FamClass) (Cabs C0 eD eL : ℝ) (hEx : DesignExists (WithTw (WithSm 𝒞')) C0)
    (h1 : ∀ {eps : ℝ} (Fm : FamP eps), 𝒞' Fm → 𝒞 Fm) (h2 : ∀ {eps : ℝ} (Fm : FamP eps), 𝒞' Fm → ℰ Fm)
    (hV : ∀ {eps : ℝ} (Fm : FamP eps), ℰ Fm → HypV Fm.toFamCore)
    (hN : Closed (Des 𝒞 C0) fun Fm _ => LinkN Fm)
    (hEta : Closed (Des 𝒞 C0) fun Fm _ => LinkEta Fm)
    (hIRR : Closed (Des 𝒞 C0) fun Fm _ => LinkIRR Fm)
    (hZ : Closed (Des 𝒞 C0) fun Fm _ => SmallLevelRankEq Fm)
    (hDIV : Closed (Des 𝒞 C0) fun Fm CH => TuSize Fm → DGamSize Fm → LinkDIVt Fm Cabs CH)
    (hRk : Closed (Des 𝒞 C0) fun Fm CH => ChosenE Fm C0 CH → NuFullF Fm ∧ J.MuRank Fm)
    (hG : Closed (Des 𝒞 C0) fun Fm _ => LinkG Fm)
    (hS : Closed (Des 𝒞 C0) fun Fm _ => TuSize Fm → LinkS Fm C0)
    (hGL : Closed (Des 𝒞 C0) fun Fm CH => TuSize Fm → DGamSize Fm → LinkGLOBAL Fm Cabs CH C0 eD eL) : FamilyClassConnected ℰ := by
```

```lean
theorem UpperTheory.Top.shape_closed_link_n_of_green : GlobalTheory.GLq.Green → _root_.GlobalTheory.Fc.TopShapeAlt True True (fun 𝒞 => Closed 𝒞 fun Fm _ => LinkN Fm) UpperTheory.Top.TopG := by
```

In `TopShape.lean` (line 52), `shape_closed_link_n_of_green` applies `topDesWin` with `Cabs = 2`, `C0 = 3`, `eD = 2`, `eL = 0` to produce `TopG` (already read in [00-route.md](00-route.md), where `zeroFreeAll_of_topG` turns `TopG` into `ZeroFreeAll`) [7](../references.md#reference-7). Because we did not open the intermediate definitions (`LinkDIVt`, `LinkGLOBAL`, `HypV`, `Green`), these two files show only the outer interface of the assembly, not how `key_minor_dvd` and `slopeInequality_of` plug into it.

---

## Part 3: Comparison — what matches, and what is new

Everything in this section is our own judgement, comparing Bombieri's classical proof [23](../references.md#reference-23) (and van Frankenhuijsen's Lemma 3.1 [24](../references.md#reference-24)) with the author's note [1](../references.md#reference-1) and the Lean declarations read in Part 2 [7](../references.md#reference-7).

| Role in the proof | Classical Stepanov–Bombieri (curve `C / F_q`) | Pinned Lean library (over `ℤ`, Step D4) | Match or new? |
| --- | --- | --- | --- |
| Target count bounded from above | Point count `ν_1(C)` of `F_q`-rational points [23](../references.md#reference-23) | Ramp-weighted prime sum `ASK − MAIN = De` (`FirstPrimeNeSecondPrime.lean`) [7](../references.md#reference-7) | Parallel structure |
| Auxiliary object | Nonzero rational function `f ∈ ker(δ)` on `C` [23](../references.md#reference-23) | Injective `ℤ`-linear map between Euclidean lattices built from an `m`-step chain `chainOp` (`ThetaLiftIndependence/Statement.lean`, `LatticeSlopes/Statement.lean`) [7](../references.md#reference-7) | New object |
| Source of high multiplicity | `f` is a `p^μ`-th power in characteristic `p`, so vanishing forces order `≥ p^μ` [23](../references.md#reference-23) | Local Frobenius-congruence minor divisibility (`key_minor_dvd`, `key_pow_dvd`) iterated along `m` theta lifts (`ChainInt`) [1](../references.md#reference-1) [7](../references.md#reference-7) | New mechanism |
| Global balancing inequality | `# zeros of f = # poles of f`, giving `ν_1 ≤ l + m q / p^μ + 1` [23](../references.md#reference-23) | Bost's slope inequality `slope L ≤ muMax M + log C` (`slopeInequality_of`), with archimedean periods (`chowla_selberg_period`) and norms (`RallisHyp`, `ChainScalar`) [7](../references.md#reference-7) | New over number fields |
| Square-root optimization | `p^μ = q^{1/2}` balances the two error scales `p^μ` and `q / p^μ` [23](../references.md#reference-23) [24](../references.md#reference-24) | Chain length `R.m` between `√(s.x · s.delta1)` and `2 √(s.x · s.delta1)` (`RankVal`) [1](../references.md#reference-1) [7](../references.md#reference-7) | Direct match |
| Separating characters / symmetries | Galois cover `C' → C → P^1` with group `G`, running `δ_η` for each `η ∈ G` [23](../references.md#reference-23) | Finite Fourier sum over characters of `E0 × H` (`AskMainBalance`) [7](../references.md#reference-7) | Related tool, different purpose |
| Turning upper bounds into RH | Upper bound alone fails (`ω_1 = q, ω_2 = 1`); Galois cover total `|G|(q + 1) + O(1)` yields lower bound too, then Diophantine approximation [23](../references.md#reference-23) [24](../references.md#reference-24) | Localized Landau theorem (`zeroFree_of_rpow_window`, [00-route.md](00-route.md)) turns a one-sided upper bound on sparse windows directly into `ZeroFree` [7](../references.md#reference-7) | Major divergence |

### What genuinely matches

1. **Upper bound from forced multiplicity.** Both arguments produce an upper bound on an arithmetic count (`ν_1(C)` versus `ASK`) by showing that a nonzero object must vanish to high order (or be divisible by high powers of primes) at the points or primes being counted, and weighing that divisibility against a global size bound [23](../references.md#reference-23) [7](../references.md#reference-7).
2. **Frobenius congruence as the local engine.** Even in the number-field proof, `key_minor_dvd` and `key_pow_dvd` work by reducing modulo `w` (where `w^2 = p`) and using the Frobenius congruence `M b a ^ (p ^ e) = N' b a + p * T` so that `p`-th powers match shifted entries modulo `w` [7](../references.md#reference-7). That local algebraic step is visibly cousin to Bombieri's use of Frobenius on `C` [23](../references.md#reference-23).
3. **Balancing two costs at the square root.** In Bombieri's Theorem 1 (and van Frankenhuijsen's equation (3.8)), choosing `p^μ = q^{1/2}` balances the two error scales `p^μ` and `q / p^μ` to give error `O(q^{1/2})` [23](../references.md#reference-23) [24](../references.md#reference-24). In `RankVal`, the chain length `R.m` is likewise pinned at square-root scale `√(s.x · s.delta1)` [7](../references.md#reference-7), matching the author's description that each lift mimics multiplicity and `√X` lifts are taken for a prime sum of length `X` [1](../references.md#reference-1).

### What is new over the integers

1. **No global characteristic `p` and no `p^μ`-th power trick.** Bombieri's entire proof fits in eight pages because a curve over `F_q` carries a global Frobenius morphism `φ` and lives in characteristic `p`, so any sum of `p^μ`-th powers is automatically a `p^μ`-th power [23](../references.md#reference-23). As van Frankenhuijsen observes at the start of Section 4, `ℚ` has no field of constants and no global Frobenius flow on `Spec ℤ` [24](../references.md#reference-24); as Alpöge writes, "multiplicity is hard to find over the integers, corresponding to something like differentiating whole numbers" [1](../references.md#reference-1). Replacing `p^μ`-th powers with an `m`-step chain of theta lifts (`chainOp`, `ChainInt`), local minor divisibility (`key_minor_dvd`), and period/norm control (`chowla_selberg_period`, `RallisHyp`) is where the new arithmetic enters.
2. **Product formula on a curve versus Bost's slope inequality.** On a curve over `F_q`, `# zeros = # poles` is an exact algebraic identity fed by Riemann–Roch [23](../references.md#reference-23). Over a number field, finite-place divisibility and infinite-place (archimedean) size are joined by Euclidean lattice covolumes and `SlopeInequality` (`slope L ≤ muMax M + log C`), where the infinite-place side supplies Euler's constant `γ` and `L'(1, χ) / L(1, χ)` through `chowla_selberg_period` so that `ASK − MAIN` isolates the centred prime sums `GPsi` [7](../references.md#reference-7).
3. **One-sided bounds really suffice over `ℤ`, unlike over `F_q`.** In Bombieri's proof, an upper bound on `ν_1(C)` cannot prove the Riemann hypothesis on its own: Bombieri's counterexample `ω_1 = q, ω_2 = 1` satisfies every upper bound while failing `|ω_1| = q^{1/2}`, so Bombieri must pass to a Galois cover `C' → P^1` and subtract from `|G|(q + 1) + O(1)` to force a two-sided bound [23](../references.md#reference-23). Over `ℤ`, by contrast, `zeroFree_of_rpow_window` (read in [00-route.md](00-route.md)) proves `ZeroFree F θ` directly from a **one-sided** upper bound `Gm F y ≤ C * y ^ θ` on arbitrarily late intervals `[Y, Y^{1+δ}]` [7](../references.md#reference-7). That replaces Bombieri's Galois-cover lower-bound trick with complex-analytic positivity (Landau's theorem).
4. **Windows instead of every scale.** Bombieri's Theorem 1 holds for every even prime power `q > (g + 1)^4` [23](../references.md#reference-23). In the Lean proof, `zeroFree_of_rpow_window` asks only for arbitrarily late intervals `[Y, Y^{1+δ}]` [7](../references.md#reference-7), matching the index's report that the arithmetic construction succeeds on sparse windows where cohomological defects stay controlled ([00-route.md](00-route.md)).

### Verdict on the pairing in `00-route.md`

Our own judgement: the weak pairing in [00-route.md](00-route.md) between timeline step 1 ("Stepanov determinant") and Step D4 of the index is **confirmed as an architectural kinship, not as a literal name match**. We found no declaration named after Stepanov, and the "10/6/26: Stepanov determinant" entry [1](../references.md#reference-1) reads like the starting idea (still visible locally in the `2 × 2` minor of `key_minor_dvd` and in the Gram determinant `gram_det_le`), which in the finished Lean library is carried by the combination of `key_minor_dvd`, `chainOp`/`ChainInt`, `RankVal`, `slopeInequality_of`, `AskMainBalance` and `chowla_selberg_period` [7](../references.md#reference-7).

---

## What we did not check

- **Wiring into `Main.lean`.** We saw `shape_closed_link_n_of_green` invoke `topDesWin` to produce `TopG`, and `zeroFreeAll_of_topG` turn `TopG` into `ZeroFreeAll`, but we have not traced the proof terms connecting `key_minor_dvd`, `slopeInequality_of`, `ChainInt`, `RankVal`, `AskMainBalance`, and `chowla_selberg_period` into the hypotheses of `topDesWin`, nor have we traced `TopG` into level 4 (`every_character_of_literature_of_vWin` in [00-route.md](00-route.md)).
- **Proofs of the proposition definitions.** We read the proofs of `key_minor_dvd`, `key_pow_dvd`, `kS_ord`, `kW_ord`, `slopeInequality_of`, `topDesWin` and `shape_closed_link_n_of_green`. We did not read the separate proof files that establish `ChainInt`, `LatSeeSaw`, `RallisHyp`, `ChainScalar`, `SlopeLeMuMax`, `AskMainBalance` or `exists_curve0_hasPeriod`.
- **Definitions behind intermediate names.** We did not open the definitions of `Scale`, `Ranks` (including `s.delta1`), `kSkey`, `kWkey`, `liftSubst`, `InWjRg`, `LinkDIVt`, `LinkGLOBAL`, `HypV`, `Green`, `Row0b` or `VWin`.
- **Earlier classical papers.** We did not read Stepanov's 1969 paper or W. M. Schmidt's book; our account of the classical method rests on Bombieri (1974), read in full [23](../references.md#reference-23), and van Frankenhuijsen (2008), Section 3 [24](../references.md#reference-24).
- **Whether an earlier "Stepanov determinant" survives elsewhere in the archive.** We did not search the 175,187 files reported by the library's README [7](../references.md#reference-7) for other determinant constructions beyond the ten files listed below.
- **No Lean kernel check run.** We read the Lean source text only; we did not compile or replay these files.

## Files read in this note

All ten Lean files are from `src/` of `leanprover-community/riemann-hypothesis` at commit `40e56bab026552e089d7afcfeff08d2defb9c005` [7](../references.md#reference-7):

- `Formalism/SharpRestriction/GrowthBounds/CoarseMultiplicity/KeyMinorDvd.lean` (read in full)
- `Formalism/SharpRestriction/GrowthBounds/CoarseMultiplicity/KeyOne.lean` (read in full)
- `Formalism/LatticeSlopes/Statement.lean` (read in full)
- `Formalism/LatticeSlopes/LatticeSlopesProofs/SlopeInequality.lean` (read in full)
- `Formalism/ThetaLiftIndependence/Statement.lean` (read in full)
- `Formalism/SizeWindowBrackets/FirstPrimeNeSecondPrime.lean` (read in full)
- `Development/AutomorphicSpectrum/Proofs/GeometryProofs/ChowlaSelbergPeriodStatement.lean` (read in full)
- `Development/AbelianVarietyTheory/Definitions/GlobalTwisting/PairRowIffQdRows.lean` (lines 1 to 80, including `RankVal`)
- `Development/AutomorphicArithmetic/CharacterBoxes/DesWin.lean` (read in full)
- `Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopShape.lean` (read in full)
