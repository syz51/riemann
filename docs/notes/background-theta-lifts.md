# Background: theta lifts, classical sources, and the Lean definitions

This note verifies two pieces of background for reading the shorter Lean 4 proof of the Generalized Riemann Hypothesis (`lsernau/grh-lean`, commit `72fead102f663d5c7a407964a13dc0cf9d977207`) [37](../references.md#reference-37):

1. What a **theta lift** (theta correspondence) is in the primary literature of Roger Howe [44](../references.md#reference-44) [45](../references.md#reference-45) and Stephen S. Kudla [46](../references.md#reference-46) [47](../references.md#reference-47), including why pairing against a theta kernel transfers symmetries and how the construction simplifies on definite (compact) spaces.
2. How the shorter Lean library defines theta kernels and theta lifts—specifically `New.Space.lift`, `New.Kernel.lift`, `New.thetaKernel`, `New.Data.lowerChain`, `New.Data.goodLift`, and `New.Rows.carrierForm`—and how those formal definitions compare with the classical Howe–Kudla framework [37](../references.md#reference-37).

Every Lean declaration below is copied verbatim from `lsernau/grh-lean` at commit `72fead102f663d5c7a407964a13dc0cf9d977207`, with exact file paths and line numbers [37](../references.md#reference-37). Plain-language explanations and comparisons are our own unless cited.

## Result in short

- **Classical picture.** A theta lift takes a function (or representation) on one classical symmetry group $G$ and produces a function (or representation) on a partner group $G'$ by integrating against a two-variable **theta kernel** $\theta(g, h; \phi)$ built from a quadratic or Hermitian form and a lattice sum [47](../references.md#reference-47). The two groups $(G, G')$ sit inside a single larger symplectic group $\mathrm{Sp}(\mathbb{W})$ as mutual centralizers—a **reductive dual pair**—and act jointly on the **Weil (oscillator) representation** $\omega$ [44](../references.md#reference-44) [46](../references.md#reference-46).
- **Why symmetries transfer.** Because $G$ and $G'$ commute inside $\mathrm{Sp}(\mathbb{W})$, the action of $G$ on the test function $\phi$ moves across the integral onto the input automorphic form $f$, while the action of $G'$ moves onto the output [46](../references.md#reference-46) [47](../references.md#reference-47). In the local representation-theoretic version, Howe's duality theorem pairs irreducible representations $\pi$ of $\widetilde{G}$ bijectively with irreducible representations $\theta(\pi)$ of $\widetilde{G}'$ [44](../references.md#reference-44) [46](../references.md#reference-46).
- **What happens when a space is definite (compact).** When the source quadratic or Hermitian space is definite, its isometry group over $\mathbb{R}$ is compact and the space is anisotropic. Globally, Weil's convergence criterion holds unconditionally [47](../references.md#reference-47); over the reals, Howe showed that the compact-member correspondence reduces to classical invariant theory on spaces of harmonic polynomials in the Fock model [44](../references.md#reference-44).
- **What the Lean library does.** `lsernau/grh-lean` implements **both** the analytic adelic integral (`New.Space.lift`, integrating $\theta(\omega(g, h)\phi)\,y(g)$ over $\Gamma_S \backslash G_S$) and an algebraic finite-class-sum version for definite unitary pairs (`New.Kernel.lift`, using a matrix of Taylor coefficients—jets—of the theta function paired with Schur polynomials, `New.thetaKernel`), and proves in `New.exists_lift_ofAlgForm_eq_smul` that on definite spaces the analytic harmonic lift is a scalar multiple of the algebraic jet lift [37](../references.md#reference-37).

---

## Part 1: Classical theta lifts in Howe and Kudla

### 1.1 The Weil representation and reductive dual pairs

Start with a nondegenerate symplectic vector space $(W, \langle \cdot, \cdot \rangle)$ of dimension $2n$ over a field $F$ (in Kudla's 1996 notes, a non-archimedean local field of characteristic not $2$ [46](../references.md#reference-46), Ch. I.1, p. 3; in Howe's 1989 JAMS paper, $F = \mathbb{R}$ [44](../references.md#reference-44), §1, p. 535). From $(W, \langle \cdot, \cdot \rangle)$ one builds the **Heisenberg group** $H(W) = W \oplus F$ with multiplication

$$(w_1, t_1)(w_2, t_2) = \left(w_1 + w_2,\, t_1 + t_2 + \frac{1}{2}\langle w_1, w_2 \rangle\right),$$

on which the symplectic group $\mathrm{Sp}(W)$ acts by automorphisms fixing the center $Z = \{(0, t)\} \simeq F$ [46](../references.md#reference-46), Ch. I.1, p. 3. Fix a nontrivial additive character $\psi$ of $F$. By the Stone–von Neumann theorem (Kudla [46](../references.md#reference-46), Ch. I.1, Theorem 1.1, p. 3), $H(W)$ has a unique smooth irreducible representation $(\rho_\psi, S)$ with central character $\psi$. Because every $g \in \mathrm{Sp}(W)$ fixes the center, twisting $\rho_\psi$ by $g$ yields an isomorphic representation, so there is an intertwining operator $A(g) \in \mathrm{GL}(S)$ unique up to a scalar in $\mathbb{C}^\times$ [46](../references.md#reference-46), Ch. I.1, p. 4. Lifting this projective representation to the twofold central extension—the **metaplectic group** $\mathrm{Mp}(W)$ (written $\widetilde{\mathrm{Sp}}$ over $\mathbb{R}$ in Howe [44](../references.md#reference-44), §1, p. 535)—gives the **Weil representation** (also called the **oscillator representation**) $(\omega_\psi, S)$ [44](../references.md#reference-44), p. 535; [46](../references.md#reference-46), Ch. I.1, pp. 4–5.

Now consider two reductive subgroups $G, G' \subseteq \mathrm{Sp}(\mathbb{W})$ inside a symplectic group $\mathrm{Sp}(\mathbb{W})$. Kudla gives the definition attributed to Howe ([46](../references.md#reference-46), Ch. II.1, Definition 1.1, p. 29): $(G, G')$ is a **reductive dual pair** if $G$ and $G'$ are mutual centralizers in $\mathrm{Sp}(\mathbb{W})$, meaning

$$\mathrm{Cent}_{\mathrm{Sp}(\mathbb{W})}(G) = G' \quad \text{and} \quad \mathrm{Cent}_{\mathrm{Sp}(\mathbb{W})}(G') = G.$$

The principal family of irreducible dual pairs—**Type I dual pairs**—arises from tensoring two spaces with compatible forms over a division algebra $(D, \iota)$ with involution [46](../references.md#reference-46), Ch. II.1, pp. 29–31:

- Let $(D, \iota)$ be $(F, \mathrm{id})$, a quadratic extension $(E, \sigma)$ with its nontrivial Galois involution, or a quaternion division algebra $(B, \sigma)$ with its main involution.
- Take a finite-dimensional right $D$-vector space $V$ with a nondegenerate $\epsilon$-Hermitian form $(\cdot, \cdot)$ and isometry group $G(V)$, and a left $D$-vector space $W$ with a nondegenerate $\epsilon$-skew-Hermitian form $\langle \cdot, \cdot \rangle$ and isometry group $G(W)$ ($\epsilon = \pm 1$).
- Their tensor product $\mathbb{W} = V \otimes_D W$ carries a nondegenerate $F$-bilinear alternating form $\langle\!\langle x_1 \otimes y_1,\, x_2 \otimes y_2 \rangle\!\rangle = \mathrm{tr}_{D \text{ over } F}\!\left((x_1, x_2)\,\langle y_1, y_2 \rangle^\iota\right)$ (Kudla's text on p. 30 prints the indices as $(x_1, y_1)\langle x_2, y_2 \rangle^\iota$), giving a natural commuting map $G(V) \times G(W) \to \mathrm{Sp}(\mathbb{W})$ [46](../references.md#reference-46), Ch. II.1, pp. 30–31.

Two Type I cases matter most here:

1. When $(D, \iota) = (F, \mathrm{id})$ and $\epsilon = +1$, $V$ is a quadratic (orthogonal) space and $W$ is a symplectic space, giving the orthogonal–symplectic dual pair $(O(V), \mathrm{Sp}(W))$ treated throughout Kudla [46](../references.md#reference-46), Ch. II.3–II.5, pp. 34–40, and [47](../references.md#reference-47), §I.1, pp. 2–3.
2. When $(D, \iota) = (E, \sigma)$ is a quadratic extension, $V$ and $W$ are Hermitian and skew-Hermitian spaces (the latter equivalent to a Hermitian space after multiplying by a purely imaginary scalar), giving the **unitary dual pair** $(U(V), U(W))$—the exact setting of the Lean proof `lsernau/grh-lean` [37](../references.md#reference-37) [46](../references.md#reference-46), Ch. II.1, pp. 29–31.

### 1.2 Why pairing against a theta kernel transfers symmetries

Because the preimages $\widetilde{G}$ and $\widetilde{G}'$ commute inside $\mathrm{Mp}(\mathbb{W})$, restricting the Weil representation $\omega_\psi$ to $\widetilde{G} \times \widetilde{G}'$ lets both groups act on the same space $S$ without interfering with each other [44](../references.md#reference-44), §1, p. 535; [46](../references.md#reference-46), Ch. II.2, p. 32.

**Local mechanism (quotients and Howe duality).** Given an irreducible admissible representation $\pi$ of $\widetilde{G}$, form the maximal quotient $S(\pi)$ of $S$ on which $\widetilde{G}$ acts as a multiple of $\pi$, namely the quotient of $S$ by $N(\pi) = \bigcap_{\lambda \in \mathrm{Hom}_{\widetilde{G}}(S, \pi)} \ker(\lambda)$ [46](../references.md#reference-46), Ch. II.2, p. 32 (and in the archimedean smooth-vector setting, the quotient of $\mathcal{Y}^\infty$ by $\mathcal{Y}_\rho$, Howe [44](../references.md#reference-44), §1, eq. (1.1), p. 536). Because $\widetilde{G}'$ commutes with $\widetilde{G}$, it stabilizes $N(\pi)$ and acts on the quotient, which factors as

$$S(\pi) \simeq \pi \otimes \Theta_\psi(\pi)$$

for a representation $\Theta_\psi(\pi)$ of $\widetilde{G}'$ [46](../references.md#reference-46), Ch. II.2, pp. 32–33 (corresponding to $\rho'_1$ in Howe [44](../references.md#reference-44), eq. (1.1), p. 536).

- **Archimedean Howe duality (Howe 1989 [44](../references.md#reference-44), §1, Theorems 1 and 1A, pp. 535–536).** For any reductive dual pair $(G, G') \subseteq \mathrm{Sp}_{2n}(\mathbb{R})$, the set $\mathcal{R}(\widetilde{G} \cdot \widetilde{G}', \omega)$ of irreducible admissible representations occurring as quotients of the smooth oscillator representation $\omega^\infty$ is the graph of a **bijection** between $\mathcal{R}(\widetilde{G}, \omega)$ and $\mathcal{R}(\widetilde{G}', \omega)$, each pair $\rho \otimes \rho'$ occurring with multiplicity one (Theorem 1). Equivalently, the big theta lift $\rho'_1$ is finitely generated, admissible, and quasisimple, with a unique irreducible quotient $\rho'$ (Theorem 1A).
- **Non-archimedean Howe duality (Kudla 1996 [46](../references.md#reference-46), Ch. II.2, p. 33).** In odd residue characteristic, $\Theta_\psi(\pi)$ is either $0$ or admissible of finite length with a unique irreducible quotient $\theta_\psi(\pi)$, and $\pi \mapsto \theta_\psi(\pi)$ gives a bijection $\mathrm{Howe}_\psi(\widetilde{G}; \widetilde{G}') \xrightarrow{\sim} \mathrm{Howe}_\psi(\widetilde{G}'; \widetilde{G})$.

**Global mechanism (the theta kernel and integral lift).** Globally over a number field $F$ with adele ring $\mathbb{A}$, Kudla writes the construction explicitly in the **Schrödinger model** for $(G, H) = (\mathrm{Sp}(n), O(V))$ with $\dim_F V = m$ even ([47](../references.md#reference-47), §I.1–I.2, pp. 2–4; local Schrödinger formulas also derived in [46](../references.md#reference-46), Ch. II.4, Proposition 4.3, pp. 37–39). The Weil representation acts on Schwartz–Bruhat functions $\phi \in \mathcal{S}(V(\mathbb{A})^n)$ by

$$(\omega(h)\phi)(x) = \phi(h^{-1}x), \quad (\omega(m(a))\phi)(x) = \chi_V(\det a)\,|\det a|_{\mathbb{A}}^{\frac{m}{2}}\,\phi(xa), \quad (\omega(n(b))\phi)(x) = \psi(\mathrm{tr}(b\,Q(x)))\,\phi(x),$$

for $h \in H(\mathbb{A})$, $a \in \mathrm{GL}_n(\mathbb{A})$, and $b \in \mathrm{Sym}_n(\mathbb{A})$, where $Q(x) = \frac{1}{2}(x, x)$ is the quadratic form of $V$ (Kudla [47](../references.md#reference-47), §I.1, eq. (I.1.6), p. 3, where the printed line writes $\chi_V(x)$ as a minor slip for $\chi_V(\det a)$, cf. eq. (I.3.4) on p. 4 and [46](../references.md#reference-46), p. 38).

Summing over the rational lattice points $x \in V(F)^n$ defines the **global theta kernel** ([47](../references.md#reference-47), §I.2, eq. (I.2.1), p. 3):

$$\theta(g, h; \phi) = \sum_{x \in V(F)^n} (\omega(g)\phi)(h^{-1}x).$$

By Poisson summation and the linear action on $V(F)^n$, $\theta(g, h; \phi)$ is left-invariant under both $G(F)$ and $H(F)$ and of moderate growth on $G(F) \backslash G(\mathbb{A})$ and $H(F) \backslash H(\mathbb{A})$ [47](../references.md#reference-47), §I.2, p. 3. Now pair an automorphic cusp form $f$ on $G$ against $\theta(g, h; \phi)$ by integrating over $G(F) \backslash G(\mathbb{A})$ ([47](../references.md#reference-47), §IV.1, eq. (IV.1.17), p. 32):

$$\theta(h; f, \phi) = \int_{G(F) \backslash G(\mathbb{A})} f(g)\,\theta(g, h; \phi)\,dg.$$

This is the **global theta lift** of $f$ to $H$. Notice why symmetries transfer immediately:

- Right-translating the output by $h_0 \in H(\mathbb{A})$ replaces $\phi$ by $\omega(1, h_0)\phi$.
- By invariance of Haar measure $dg$ under right translation $g \mapsto g g_0$ on $G(F) \backslash G(\mathbb{A})$, translating the input form $f$ by $g_0$ is the same as acting on the test function $\phi$ by $\omega(g_0^{-1}, 1)$.
- Consequently, any operator that acts identically on $\phi$ from the $G$-side and from the $H$-side—such as unramified Hecke operators at finite places, or Casimir/weight operators at infinite places—transfers directly from $f$ to $\theta(h; f, \phi)$.

When $f = 1$ is the constant function on $H(F) \backslash H(\mathbb{A})$ (integrating in the reverse direction from $H$ to $G$), the lift reduces to the **theta average** ([47](../references.md#reference-47), §I.2, eq. (I.2.2), p. 3):

$$I(g; \phi) = \int_{H(F) \backslash H(\mathbb{A})} \theta(g, h; \phi)\,dh.$$

Kudla highlights in §I.4, Remark (1) (p. 7) that while Eisenstein series are built from purely local data, the theta integral $I(g; \phi)$ encodes global lattice-point arithmetic through the theta distribution $\phi \mapsto \sum_{x \in V(F)^n} \phi(x)$ [47](../references.md#reference-47).

### 1.3 Definite and compact spaces: why the lift becomes algebraic

Two simplifications happen simultaneously when the quadratic or Hermitian space $V$ is **definite** (so its real isometry group is compact and $V$ has no nonzero isotropic vectors):

1. **Unconditional global convergence and finite class sums.** Weil's convergence criterion (Kudla [47](../references.md#reference-47), §I.2, eq. (I.2.3), p. 4) states that $I(g; \phi)$ converges absolutely for every $\phi$ whenever either (1) $V$ is **anisotropic** or (2) $m - r > n + 1$ (where $r$ is the Witt index of $V$). Every definite space is anisotropic, so convergence holds with no dimension constraint, and the quotient $H(F) \backslash H(\mathbb{A})$ is compact. Moreover, in Rallis's inner product formula for anisotropic $V$ (Kudla [47](../references.md#reference-47), §IV.1, Proposition, eq. (IV.1.18), p. 33), the Petersson inner product of two theta lifts $\theta(h; f_1, \phi_1)$ and $\theta(h; f_2, \phi_2)$ over $H(F) \backslash H(\mathbb{A})$ equals an unregularized doubling integral directly. When a test function is right-invariant under a compact open subgroup $K \subseteq H(\mathbb{A}_f)$ and $H(\mathbb{R})$ is compact, the space of double cosets of $H(\mathbb{A}_f)$ by $H(F)$ on the left and $K$ on the right is finite, turning the adelic integral over $H(F) \backslash H(\mathbb{A})$ into a **finite class sum** (this is precisely how `lsernau/grh-lean` realizes `New.Kernel.lift` via `classIntegral` [37](../references.md#reference-37)).
2. **Archimedean harmonic polynomials and Classical Invariant Theory.** In his 1989 JAMS paper, Howe notes in §1, Remark (b) (p. 536) that when $G$ or $G'$ is **compact**, Theorems 1 and 1A reduce to a version of **Classical Invariant Theory** and serve as the stepping stone to the general archimedean proof [44](../references.md#reference-44). Specifically:
   - In §2 (p. 537, eq. (2.2)), Howe works in the **Fock model**, where the $\widetilde{U}$-finite vectors of the oscillator representation form the polynomial algebra $\mathcal{P} = \mathcal{P}(\mathbb{C}^n)$, and $\omega(\mathfrak{sp}_{\mathbb{C}}) = \mathfrak{sp}^{(1,1)} \oplus \mathfrak{sp}^{(2,0)} \oplus \mathfrak{sp}^{(0,2)}$ acts by degree-preserving Euler operators $\frac{1}{2}\!\left(z_i \frac{\partial}{\partial z_j} + \frac{\partial}{\partial z_j} z_i\right)$, quadratic multiplication $z_i z_j$, and second-order constant-coefficient differential operators $\frac{\partial^2}{\partial z_i \partial z_j}$ [44](../references.md#reference-44).
   - For any dual pair $(L, L')$ with $L \subseteq U$ compact (§3, pp. 541–542), Howe defines the space of **$L$-harmonics** as the polynomials killed by all degree-lowering operators in $\mathfrak{l}'^{(0,2)}$ ([44](../references.md#reference-44), eq. (3.6), p. 541):
     $$\mathcal{H}(L) = \{P \in \mathcal{P} : \ell'(P) = 0 \text{ for all } \ell' \in \mathfrak{l}'^{(0,2)}\}.$$
   - Decomposing $\mathcal{P} = \sum_{\sigma \in \mathcal{R}(L, \omega)} \mathcal{I}_\sigma$ into $L$-isotypic components (eq. (3.7)) and setting $\mathcal{H}(L)_\sigma = \mathcal{H}(L) \cap \mathcal{I}_\sigma$ (eq. (3.8)), Howe states four conclusions derived from Classical Invariant Theory (eq. (3.9)(a)–(d), p. 542, citing his companion *Transactions* paper): $L \times \mathfrak{l}'$ acts irreducibly on each $\mathcal{I}_\sigma$; $\mathcal{H}(L)_\sigma$ consists precisely of the lowest-degree polynomials in $\mathcal{I}_\sigma$; $\mathcal{I}_\sigma = \mathcal{U}(\mathfrak{l}'^{(2,0)}) \cdot \mathcal{H}(L)_\sigma$; and $L$ and $\mathfrak{l}'^{(1,1)}$ generate mutual commutants on $\mathcal{H}(L)$, so $\mathcal{H}(L)_\sigma \simeq \sigma \otimes \tau'$ gives an injection $\sigma \mapsto \tau'$ [44](../references.md#reference-44).
   - When **both** members are compact—as in the unitary dual pair $(M^{(1,1)}, M'^{(1,1)})$ of products of unitary groups $U_p \times U_n$ (Howe [44](../references.md#reference-44), §3, Fact 2 and eqs. (3.11)–(3.13), pp. 540, 542–543)—the polynomial algebra decomposes directly as $\mathcal{P} = \sum \mathcal{I}_{\tau, \tau'}$ into finite-dimensional irreducible modules $\tau \otimes \tau'$, giving an explicit bijection $\tau \leftrightarrow \tau'$ of finite-dimensional algebraic representations. For general pairs $(G, G')$, Howe summarizes in §7(b) (pp. 551–552) that the correspondence $\rho \leftrightarrow \rho'$ is anchored by a bijection $\sigma \leftrightarrow \sigma'$ on the space of **joint harmonics** $\mathcal{H}(\widetilde{K}) \cap \mathcal{H}(\widetilde{K}')$ of lowest polynomial degree [44](../references.md#reference-44).
   - In the abstract and §0 (pp. 539–540) of his companion 1989 *Transactions* paper (written in 1976), Howe states that this viewpoint gives a uniform Weyl-algebra formulation of Hermann Weyl's First Fundamental Theorem of Classical Invariant Theory, spherical harmonics, commuting subalgebras, and the Capelli identity [45](../references.md#reference-45).

### 1.4 Seesaw dual pairs

One more classical tool from Kudla's 1996 notes reappears prominently in `lsernau/grh-lean`: the **seesaw dual pair** ([46](../references.md#reference-46), Ch. IV.1, pp. 59–63). Suppose $(G, G')$ and $(H, H')$ are two reductive dual pairs inside the same symplectic group $\mathrm{Sp}(\mathbb{W})$ with $H \subseteq G$ and therefore $G' \subseteq H' = \mathrm{Cent}_{\mathrm{Sp}(\mathbb{W})}(H)$ [46](../references.md#reference-46), Ch. IV.1, p. 59. The inclusions reverse across the two sides (like a playground seesaw):

```text
G     H'
|  ×  |
H     G'
```

Typical examples come from orthogonal direct sums $V = V_1 \oplus V_2$, giving $(O(V) \supseteq O(V_1) \times O(V_2),\; \mathrm{Sp}(W) \times \mathrm{Sp}(W) \supseteq \mathrm{Sp}(W))$, or symplectic direct sums $W = W_1 \oplus W_2$ (Examples 1.1–1.2, pp. 59–60) [46](../references.md#reference-46). Because both dual pairs share the same ambient Weil representation $\omega_\psi$ on $\mathbb{W}$, restricting from the larger group on one side corresponds to taking a theta lift or period on the other side (Lemmas 1.3–1.4 and Proposition 1.5, pp. 61–63) [46](../references.md#reference-46). In `lsernau/grh-lean`, an iterated seesaw identity (`D.seesaw_identity` in `New/UpperBound/Seesaw/SeesawIdentity.lean`) links the chain of lifts `D.lowerChain` along $Y_0 \to \cdots \to Y_m$ with the composite lift along definite spaces $X_0 \to \cdots \to X_m$ followed by restriction to $Y_m$ [37](../references.md#reference-37).

---

## Part 2: Exact Lean definitions in `lsernau/grh-lean`

All declarations below were read directly from `github.com/lsernau/grh-lean` at commit `72fead102f663d5c7a407964a13dc0cf9d977207` (`grh/`) [37](../references.md#reference-37). Throughout, $E$ is a CM field (`[Field E] [CMType E] [WeilData E]`), `Space E n s` is a pointed Hermitian space of rank `card n` with real signature vector `s : n → ℤˣ`, `G E s` is its adelic unitary group $G_\infty \times G_f$, `Gf E n` is its finite adelic unitary group, and `stdSpace E n` is the standard positive-definite Hermitian space $I_n$ (all signs $+1$) [37](../references.md#reference-37).

### 2.1 Abstract adelic theta kernel and `New.Space.lift`

**File:** `grh/src/Lib/Adelic/AutomorphicForms/Basic.lean`, lines 84–96 [37](../references.md#reference-37):

```lean
structure ThetaKernel {n' : Type} [Fintype n'] [DecidableEq n'] {t : n' → ℤˣ}
    (X : Type*) [NormedAddCommGroup X] [NormedSpace ℂ X]
    (S : Space E n s) (T : Space E n' t) where
  /-- The action of the product of the groups of S and T on X by continuous linear maps. -/
  ω : G E s × G E t →* X →L[ℂ] X
  /-- The linear functional θ on X. -/
  θ : X →L[ℂ] ℂ
  /-- The action `(p, φ) ↦ ω p φ` is jointly continuous. -/
  continuous : Continuous ↿(ω · ·)
  /-- The kernel is invariant under left multiplication by rational points of both groups. -/
  rat_mul {γ : G E s} {γ' : G E t} :
      γ ∈ S.Γ → γ' ∈ T.Γ →
      ∀ (g : G E s) (k : G E t) (φ : X), θ (ω (γ * g, γ' * k) φ) = θ (ω (g, k) φ)
```

For a pair of Hermitian spaces $S, T$ and splitting automorphic characters $a, b$ of $U(1)(\mathbb{A})$, the concrete unitary-pair Weil action and theta kernel are defined in `grh/src/Lib/Weil/DualPair/Defs.lean`, lines 175–187, and packaged as a `ThetaKernel` in `grh/src/Lib/Weil/DualPair/WeilAction.lean`, lines 619–623 [37](../references.md#reference-37):

```lean
-- grh/src/Lib/Weil/DualPair/Defs.lean, lines 175-187
def pairChar : G E s × G E s' →* ℂ :=
  Circle.coeHom.comp ((b⁻¹.1.toMonoidHom.comp G.det).coprod (a.1.toMonoidHom.comp G.det))

def pairWeil : G E s × G E s' →* 𝒮 (S.hom T) →L[ℂ] 𝒮 (S.hom T) where
  toFun p := pairChar a b p • (S.hom T).ω (G.onHom p)
  map_one' := by simp
  map_mul' := by simp [← smul_mul_smul]

def pairTheta (f : 𝒮 (S.hom T)) (p : G E s × G E s') : ℂ := (S.hom T).θ (pairWeil S T a b p f)
```

```lean
-- grh/src/Lib/Weil/DualPair/WeilAction.lean, lines 619-623
abbrev pairThetaKer : ThetaKernel (𝒮 (S.hom T)) S T where
  ω := pairWeil S T a b
  θ := θ (S.hom T)
  continuous := by fun_prop
  rat_mul := by simp_all [← Prod.mk_mul_mk, pairWeil_of_mem_Gamma]
```

Here `pairChar a b (g, h)` is $a(\det h)\,b(\det g)^{-1}$ and `G.onHom (g, h)` acts on $\mathrm{Hom}(S, T)$ by $x \mapsto h x g^{-1}$ [37](../references.md#reference-37).

The **adelic theta lift** `New.Space.lift` and its equivariance law are defined in `grh/src/Lib/Weil/DualPair/ThetaLiftConvergence.lean`, lines 293–294 and 385–386 [37](../references.md#reference-37):

```lean
-- grh/src/Lib/Weil/DualPair/ThetaLiftConvergence.lean, lines 293-294
def Space.lift (φ : X) (y : G E s → ℂ) (h : G E t) : ℂ :=
  ∫ g : G E s, K.θ (K.ω (g, h) φ) * y g ∂S.quotMeasure
```

```lean
-- grh/src/Lib/Weil/DualPair/ThetaLiftConvergence.lean, lines 385-386
lemma lift_equivariant (hy : S.IsAutomorphic y) (φ : X) (k : G E s) (l h : G E t) :
    lift K φ y (h * l) = lift K (K.ω (k, l) φ) (fun g : G E s ↦ y (g * k)) h := by
```

In plain mathematics, `Space.lift K φ y` is the exact unitary analogue of Kudla's eq. (IV.1.17) [47](../references.md#reference-47):

$$(\mathrm{lift}_K(\phi, y))(h) = \int_{\Gamma_S \backslash G_S} \theta(\omega(g, h)\phi)\,y(g)\,dg.$$

In `grh/src/Lib/Weil/Lift.lean`, lines 767–774, `New.formLift` wraps `Space.lift` as a $\mathbb{C}$-bilinear map `X →ₗ[ℂ] S.Form e →ₗ[ℂ] T.Form e'` between spaces of discrete-series automorphic forms, and `New.IsArrow` records that a datum $\phi$ sends forms of type $e$ on $S$ to forms of type $e'$ on $T$ [37](../references.md#reference-37).

### 2.2 Algebraic theta kernel on definite spaces: `New.Kernel`, `New.Kernel.lift`, and `New.thetaKernel`

When both spaces are the standard definite spaces `stdSpace E n` and `stdSpace E n'` ($n < n'$), automorphic forms are encoded as **algebraic modular forms** `AlgForm n κ e`: smooth functions $\phi : G_f(E, n) \to (\mathrm{WeylIndex}\,n\,\kappa \to \mathbb{C})$ satisfying $\phi(\gamma g) = \rho(\gamma)\phi(g)$ for rational $\gamma \in U_n(E)$, with an open right stabilizer [37](../references.md#reference-37).

**File:** `grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean`, lines 133–144, 189–194, 217–218, and 374–380 [37](../references.md#reference-37):

```lean
-- grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean, lines 133-144
structure Kernel (K : Subgroup (Gf E n)) (S : Type*) [AddCommGroup S] [Module ℂ S] where
  /-- The action of the finite points `G_f × G'_f` on the data. -/
  ω : Representation ℂ (Gf E n × Gf E n') S
  /-- The jet map of a datum, a linear map from vectors of rank `n` to vectors of rank `n'`. -/
  jetMap : S →ₗ[ℂ] (WeylIndex n κ → ℂ) →ₗ[ℂ] WeylIndex n' κ → ℂ
  /-- The jet map is equivariant for the rational points `Γ × Γ'`:
  `jetMap (ω (γ, δ) Φ) (weightRep κ e γ v) = weightRep κ ea δ (jetMap Φ v)`. -/
  equivariant (γ : U (stdSpace E n).J) (δ : U (stdSpace E n').J) (Φ : S) (v : WeylIndex n κ → ℂ) :
      jetMap (ω (stdEmbFin γ, stdEmbFin δ) Φ) ((stdSpace E n).weightRep κ e γ v) =
        (stdSpace E n').weightRep κ ea δ (jetMap Φ v)
  /-- Every datum Φ has an open stabiliser: `g ↦ ω g Φ` is invariant under an open subgroup. -/
  isOpen_stabilizer (Φ : S) : (rightStabilizer (ω · Φ)).IsOpen
```

```lean
-- grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean, lines 189-194
def Kernel.lift : S →ₗ[ℂ] AlgForm n κ e →ₗ[ℂ] AlgForm n' κ ea := by
  refine LinearMap.mk₂ ℂ
    (fun Φ φ ↦
      ⟨fun h ↦ classIntegral stdRatPoints K fun g ↦ k.jetMap (k.ω (g, h) Φ) (φ.1 g), ?_,
        fun γ h ↦ ?_⟩)
    (fun Φ Φ' φ ↦ ?_) (fun c Φ φ ↦ ?_) (fun Φ φ φ' ↦ ?_) fun c Φ φ ↦ ?_
```

```lean
-- grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean, lines 217-218
lemma Kernel.lift_equivariant (a : Gf E n) (b : Gf E n') (Φ : S) (φ : AlgForm n κ e) :
    k.lift (k.ω (a, b) Φ) (algFormRep κ e a φ) = algFormRep κ ea b (k.lift Φ φ) := by
```

```lean
-- grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean, lines 374-380
def thetaKernel (hκ : IsLiftWeight n n' κ eb e) (c : ℂ) {a b : AutChar E} {ea : InfinitePlace E → ℤ}
    {ψ ψ' : (w : FinPlace E) → MulChar (ResField w) ℂ} (ha : a.HasWeight ea ψ)
    (hb : b.HasWeight eb ψ') (K : Subgroup (Gf E n)) :
    Kernel n n' κ e ea K ((stdSpace E n).hom (stdSpace E n')).finitePart where
  ω := pairWeilFinite (stdSpace E n) (stdSpace E n') a b
  jetMap := Matrix.toLin'.1 ∘ₗ schurJet κ ∘ₗ jetSeries ((stdSpace E n).hom (stdSpace E n')) c ∘ₗ
    (finitePart ((stdSpace E n).hom (stdSpace E n'))).subtype
```

Read what `thetaKernel` and `Kernel.lift` do in plain words:

- The finite data live in `((stdSpace E n).hom (stdSpace E n')).finitePart`, the span of finite Heisenberg translates of the vacuum in $\mathcal{S}(\mathrm{Hom}(I_n, I_{n'}))$ [37](../references.md#reference-37).
- Instead of integrating over the compact real group $U(n)_{\mathbb{R}}$ at every step, `jetMap` takes the Taylor series `jetSeries _ c f` of the theta function at scale $c$ and extracts its **Schur jet matrix** `schurJet κ`, whose entries pair the Taylor series with the polynomial matrix $S_\kappa(z)$ (`schurCoeffPoly A ξ = Aᵀ S_κ(z) ξ`, lines 99–101, 236–239) [37](../references.md#reference-37).
- `Kernel.lift` then averages `k.jetMap (k.ω (g, h) Φ) (φ.1 g)` over the finite class space $\Gamma \backslash G_f$ via `classIntegral stdRatPoints K` (normalized so $\mathrm{vol}(K) = 1$) [37](../references.md#reference-37).

### 2.3 Bridging the analytic lift and the algebraic jet lift

The file `grh/src/Lib/Weil/CompactLift/DefiniteThetaLift.lean` proves that the two definitions agree on definite spaces (lines 193–204 and 284–289) [37](../references.md#reference-37):

```lean
-- grh/src/Lib/Weil/CompactLift/DefiniteThetaLift.lean, lines 193-204
lemma New.exists_lift_ofAlgForm_eq_smul {E : Type} [Field E] [CMType E]
    {κ : InfinitePlace E → ℕ → ℕ} {l : InfinitePlace E → n → ℤ} {l' : InfinitePlace E → n' → ℤ}
    {ea eb ec : InfinitePlace E → ℤ} [DecidableEq n'] [DecidableEq n] [WeilData E]
    (hl : IsHCParam κ ec l) (hl' : IsHCParam κ ea l') (hκ : IsLiftWeight n n' κ eb ec)
    {c : ℂ} (hc : c ≠ 0) :
    ∃ β : ℂ, ∀ {a b : AutChar E} {ψ ψ' : (w : FinPlace E) → MulChar (ResField w) ℂ}
        (ha : a.HasWeight ea ψ) (hb : b.HasWeight eb ψ') (K : Subgroup (Gf E n)) [IsLevel K]
        (f : ((stdSpace E n).hom (stdSpace E n')).finitePart) (φ : AlgForm n κ ec),
      lift (pairThetaKer (stdSpace E n) (stdSpace E n') a b)
          (integrated ((stdSpace E n).hom (stdSpace E n')) (jointHarmonic ea eb l l' 1 1) f)
          (ofAlgForm l 1 φ) =
        (β / stdLevelIndex K) • ofAlgForm l' 1 ((thetaKernel hκ c ha hb K).lift f φ) := by
```

```lean
-- grh/src/Lib/Weil/CompactLift/DefiniteThetaLift.lean, lines 284-289
lemma isThetaLift_thetaKernel [Nonempty n] [Nonempty n'] [DecidableEq n'] [DecidableEq n]
    {O : Type*} {a : O → (n : Type) → [Fintype n] → AutChar E} {c : ℂ} {K : Subgroup (Gf E n)}
    [IsLevel K] {hκ : IsLiftWeight n n' κ eb e} (hc : c ≠ 0)
    {ψ ψ' : O → (w : FinPlace E) → MulChar (ResField w) ℂ}
    {ha : ∀ o : O, (a o n).HasWeight ea (ψ o)} {hb : ∀ o : O, (a o n').HasWeight eb (ψ' o)} :
    IsThetaLift κ e ea a fun o : O ↦ (thetaKernel hκ c (ha o) (hb o) K).lift := by
```

The proof of `exists_lift_ofAlgForm_eq_smul` shows the exact link to Howe [44](../references.md#reference-44): `exists_smul_schurCoeffPoly_eq_jointHarmonic` (lines 136–142) proves that the archimedean **joint harmonic** `jointHarmonic ea eb l l' 1 1` is a scalar multiple of the Schur Fock polynomial `schurCoeffPoly` evaluated on the highest vectors of weights $l$ and $l'$, so integrating against the joint harmonic over the compact real group extracts precisely a scalar multiple of the Schur jet matrix [37](../references.md#reference-37).

### 2.4 Definite kernel size, $p$-adic gauges, and Galois conjugates (`grh/src/New/UpperBound/Kernels/`)

The three files under `grh/src/New/UpperBound/Kernels/` supply the arithmetic and archimedean estimates for these definite theta kernels [37](../references.md#reference-37):

- `grh/src/New/UpperBound/Kernels/JetConjugatesAndBounds.lean`: realizes the action of $\sigma \in \mathrm{Aut}(\mathbb{C})$ over $K = \mathbb{Q}(\sqrt{-d})$ on jets of theta functions (`exists_isJetConjugation`) and bounds archimedean conjugates of jets and Schur jet matrices (`norm_jet_le_of_isVacuumCombination`, `sqrt_weylNormSq_schurJet_le_of_isVacuumCombination`) [37](../references.md#reference-37).
- `grh/src/New/UpperBound/Kernels/ThetaLiftGauge.lean`: derives $p$-adic gauge bounds for one definite theta lift (`Kernel.raises`, `omega_mem_raises_of_schurJet_le`, `smul_vacuumDatum_mem_standardData`) [37](../references.md#reference-37).
- `grh/src/New/UpperBound/Kernels/DefiniteKernelSize.lean`: proves rational equivariance of `modKernelStdSpace` under `embFin` (`modKernelStdSpace_embFin_mul`, lines 51–62), defines the explicit normalizing constant `modKernelScale` (lines 121–124), and shows that after multiplying by `modKernelScale`, the definite theta kernel is both $p$-integral and bounded at all complex conjugates (`IsModKernelScale`, `exists_ne_zero_isModKernelScale`, lines 329–370) [37](../references.md#reference-37):

```lean
-- grh/src/New/UpperBound/Kernels/DefiniteKernelSize.lean, lines 121-124
noncomputable def modKernelScale (L N : Type) [Fintype L] [Fintype N] {P : Parameters} (D : Data P)
    (d : ℕ) : ℂ :=
  (D.M ^ 2) ^ (2 * Core.numInfPlaces D.E * card (N × L)) *
    P.vacuumScale D.towerExp ^ card (N × L) * (D.M ^ 2 * P.d * P.jetScale D.towerExp) ^ d
```

### 2.5 The four proof-level lifts (`D.lowerChain`, `D.compositeLift`, `D.goodLift`, `Rows.carrierForm`)

In `grh/GUIDE.md`, the glossary groups the main theta lifts used in the proof into four roles [37](../references.md#reference-37):

1. **Chain of lifts along $Y_0 \to \cdots \to Y_m$: `New.Data.lowerChain`** (`grh/src/New/UpperBound/Objects/RowChain.lean`, lines 120–123 and 172–180) [37](../references.md#reference-37):

```lean
-- grh/src/New/UpperBound/Objects/RowChain.lean, lines 120-123
def liftY (ϑ : D.TameChar) (j : ℕ) : D.FormY j →ₗ[ℂ] D.FormY (j + 1) :=
  (stdLevelIndex (levelY ϑ j) : ℂ) •
    formLift (thetaKernelY ϑ j) (typeKernel (D.paramY j) (D.signsY j))
      (typeKernel (D.paramY (j + 1)) (D.signsY (j + 1))) (datumY ϑ j)
```

```lean
-- grh/src/New/UpperBound/Objects/RowChain.lean, lines 172-180
def lowerChainUpTo (ϑ : D.TameChar) (j : ℕ) : D.principalForms (D.spaceY 0) →ₗ[ℂ] D.FormY j :=
  compUpTo (liftY ϑ) j ∘ₗ (D.principalForms (D.spaceY 0)).subtype

def lowerChain (ϑ : D.TameChar) :
    D.principalForms (D.spaceY 0) →ₗ[ℂ] AlgForm (D.Y D.m) D.columnsY (D.lastEntry D.m) :=
  (toAlgForm (D.spaceY D.m) D.isHCParam_paramY).toLinearMap ∘ₗ lowerChainUpTo ϑ D.m
```

Each step `liftY` applies `formLift` (built from `Space.lift`) using the joint harmonic `harmonicY j` at infinity and the indicator of the inclusion $Y_j \hookrightarrow Y_{j+1}$ at the level places (`pointDatumY ϑ j` in `Rows.lean`, lines 377–379) [37](../references.md#reference-37). After $m$ steps the last space $Y_m$ is standard definite (`isStd_spaceY_last` in `Rows.lean`, line 270), so `lowerChain` converts the output into an `AlgForm` on $Y_m$ [37](../references.md#reference-37).

2. **Definite chain along $X_0 \to \cdots \to X_m$ and restriction to $Y_m$: `New.Data.liftKernel` and `New.Data.compositeLift`** (`grh/src/New/UpperBound/Objects/Columns.lean`, lines 849–863 and 992–994) [37](../references.md#reference-37):

```lean
-- grh/src/New/UpperBound/Objects/Columns.lean, lines 849-863
def liftKernel :
    Kernel (D.X j) (D.X (j + 1)) D.columnCount (D.lastEntry j) (D.lastEntry (j + 1))
      (D.levelX j)
      (D.homX j).finitePart := by
  obtain weight :
      (D.chainChar ϑ j.succ).HasWeight (-D.liftWeight j.succ ·)
        (D.liftTamePart (ϑ.pow j.succ) j.succ) :=
    D.hasWeight_liftChar
  exact thetaKernel (D.isLiftWeight_columnCount j) (star ↑D.piMBar * P.jetScale D.towerExp)
    (by
      convert weight.hasWeight_rankTwist (n := D.X j)
      grind [lastEntry, card_X])
    weight.hasWeight_rankTwist (D.levelX j)
```

```lean
-- grh/src/New/UpperBound/Objects/Columns.lean, lines 992-994
noncomputable def compositeLift (ϑ : D.TameChar) (Ψ : D.Translations →₀ ℂ) (φ : D.SourceForm) :
    AlgForm (E := D.E) (D.Y D.m) D.columnsY (D.lastEntry D.m) :=
  restrictToYOfEq D.m_eq_two_mul_varrho_add_two (chainOfTensor ϑ φ (gluedTensor Ψ))
```

Here each step uses the algebraic definite kernel `thetaKernel` (`Kernel.lift`), composed in pairs via `chainOfTensor`, and then restricted from $X_m$ to $Y_m$ [37](../references.md#reference-37).

3. **Single lift from $W_j$ to the definite space $V_j$ on good forms: `New.Data.singleLift` and `New.Data.goodLift`** (`grh/src/New/Determinant/Norms/AdjointThetaLift.lean`, lines 160–164 and 256–261; `grh/src/New/Determinant/Twist/FitTwists.lean`, lines 108–110) [37](../references.md#reference-37):

```lean
-- grh/src/New/Determinant/Norms/AdjointThetaLift.lean, lines 160-164 & 256-261
noncomputable def DescentPair.thetaLift [Nonempty r] {l : NumberField.InfinitePlace E → r → ℤ}
    (hfit : O.FitsParams l) : O.W.Form (typeKernel l O.signs) →ₗ[ℂ] O.FormV :=
  (((stdSpace E n).toAlgForm O.isHCParam_paramV).toLinearMap ∘ₗ formLift O.pairThetaKernel
    (typeKernel l O.signs) (typeKernel O.paramV 1)
    (O.fockDatum (highestVector O.columnCount O.paramV))).codRestrict _ fun y ↦ by ...

noncomputable def Data.singleLift (j : ℕ) :
    D.principalForms (D.spaceW j) →ₗ[ℂ] (D.descentPair ϑ j).FormV :=
  if hj : j ∈ D.LiftIndex then
    ((D.descentPair ϑ j).thetaLift (D.fitsParams_descentPair ϑ ⟨j, hj⟩)).domRestrict
      (D.principalForms (D.spaceW j))
  else 0
```

```lean
-- grh/src/New/Determinant/Twist/FitTwists.lean, lines 108-110
noncomputable abbrev goodLift (ϑ : D.TameChar) (j : ℕ) :
    D.goodForms (D.spaceW j) →ₗ[ℂ] (D.descentPair ϑ j).FormV :=
  D.singleLift ϑ j ∘ₗ (D.goodForms (D.spaceW j)).subtype
```

This is a single theta lift from the rank-$r$ Hermitian space $W_j$ (possibly indefinite) to the rank-$(r + t)$ standard definite space $V_j = I_{r+t}$, restricted to `goodForms` (the image of the idempotent `D.e₀`) [37](../references.md#reference-37).

4. **The carrier form (theta lift of the constant function $1$): `New.Rows.carrierForm`** (`grh/src/New/OneLift/ComparisonOperator/ExchangeData.lean`, lines 120–126) [37](../references.md#reference-37):

```lean
-- grh/src/New/OneLift/ComparisonOperator/ExchangeData.lean, lines 120-126
def carrierForm : G E ((1 : Fin ((2 : ℕ) * m) → ℤˣ) ⊕ᵥ (-1 : Fin m → ℤˣ)) → ℂ :=
  Space.lift
    (pairThetaKer (stdSpace E (Fin m)).neg (signedSpace E (1 ⊕ᵥ -1 : Fin (2 * m) ⊕ Fin m → ℤˣ))
      (upsilonU1 ^ m) 1)
    (modDatum (stdSpace E (Fin m)).neg (signedSpace E (1 ⊕ᵥ -1)) (unitModulus E) 1
      (Fock.polyVector (realSigns E (homSigns (-1) (1 ⊕ᵥ -1)))
        (∏ τ : InfinitePlace E, variableMinor τ Sum.inr id ^ (2 * m)))) fun _ ↦ 1
```

In plain words, `Rows.carrierForm` is literally the unitary analogue of Kudla's theta average $I(g; \phi)$ ([47](../references.md#reference-47), eq. (I.2.2)): it applies `Space.lift` to the constant function `fun _ ↦ 1` on the negative-definite unitary group $U(I_m^-)$, lifting it to the indefinite unitary group of signature $(2m, m)$ with trivial modulus, constant finite datum $1$, and the determinant-power Fock polynomial $\prod_\tau \det(y_\tau^-)^{2m}$ [37](../references.md#reference-37).

---

## Part 3: How the Lean construction compares with Howe and Kudla

| Feature | Classical Howe–Kudla literature [44](../references.md#reference-44) [46](../references.md#reference-46) [47](../references.md#reference-47) | `lsernau/grh-lean` at `72fead10` [37](../references.md#reference-37) |
| --- | --- | --- |
| **Dual pair** | Type I pairs $(O(V), \mathrm{Sp}(W))$ (worked out in detail in Kudla [46](../references.md#reference-46) [47](../references.md#reference-47)) and unitary pairs $(U(V), U(W))$ (defined in Kudla [46](../references.md#reference-46), Ch. II.1; compact pairs $(U_p, U_n)$ in Howe [44](../references.md#reference-44), §3) | Unitary dual pairs $(U(S), U(T))$ over a CM field $E$, acting on $\mathrm{Hom}(S, T)$ via $x \mapsto h x g^{-1}$ twisted by splitting characters $a(\det h)\,b(\det g)^{-1}$ (`pairWeil`, `pairThetaKer`) |
| **Global lift formula** | $\theta(h; f, \phi) = \int_{G(F) \backslash G(\mathbb{A})} f(g)\,\theta(g, h; \phi)\,dg$ (Kudla [47](../references.md#reference-47), eq. (IV.1.17)), and $I(g; \phi)$ for $f = 1$ (eq. (I.2.2)) | `Space.lift K φ y h = ∫ g, K.θ (K.ω (g, h) φ) * y g ∂S.quotMeasure`; `Rows.carrierForm` is the $y = 1$ case |
| **Definite / compact simplification** | Anisotropic convergence (Kudla [47](../references.md#reference-47), eq. (I.2.3)); harmonic polynomials $\mathcal{H}(L)$ and compact unitary duality in the Fock model (Howe [44](../references.md#reference-44), §2–§3, §7(b)) | `Kernel.lift` replaces the adelic integral by a finite `classIntegral` on `AlgForm`, using the Schur jet matrix `schurJet κ (jetSeries _ c f)` (`thetaKernel`); `exists_lift_ofAlgForm_eq_smul` identifies it up to a scalar with `Space.lift` at `jointHarmonic` |
| **Use of Howe duality** | Full bijection $\pi \leftrightarrow \theta(\pi)$ with multiplicity one (Howe [44](../references.md#reference-44), Theorem 1; Kudla [46](../references.md#reference-46), Ch. II.2) | Deliberately avoided where unnecessary: `Lib/Weil/Lift.lean` (lines 50–53) notes that global lifts carry discrete-series types to discrete-series types via explicit `IsHalfEdge` / `IsEdge` / `IsArrow` without proving full Howe duality, and `DefiniteThetaLift.lean` (lines 281–283) notes that `isThetaLift_thetaKernel` captures the consequence of Howe's $(\mathrm{GL}_{n'}, \mathrm{GL}_n)$-duality without stating its multiplicity formula |
| **Seesaw mechanism** | Nested dual pairs $(G \supseteq H, H' \supseteq G')$ sharing one ambient Weil representation (Kudla [46](../references.md#reference-46), Ch. IV.1) | Iterated seesaw (`D.seesaw_identity`) equates `D.lowerChain` composed with the Poincaré series to a scalar multiple of `D.compositeLift` (definite chains restricted from $X_m$ to $Y_m$) |

---

## Not checked

- **Roger Howe, *$\theta$-series and invariant theory*** (*Automorphic Forms, Representations and $L$-functions*, Proc. Sympos. Pure Math., Vol. 33, Part 1, AMS, 1979, pp. 275–285): not opened directly. The AMS website returned a Cloudflare anti-bot challenge (`403`, `cf-mitigated: challenge`), and we did not open any gated or unofficial mirror. Its citation details were verified from the bibliography of Howe's 1989 JAMS paper (`[H2]`, p. 552) [44](../references.md#reference-44) and Kudla's 1992/2002 Kyoto notes (Ref. 13) [47](../references.md#reference-47).
- **Stephen S. Kudla, *Seesaw dual reductive pairs*** (*Automorphic Forms of Several Variables*, Taniguchi Symposium Katata 1983, Progress in Mathematics Vol. 46, Birkhäuser, 1984, pp. 244–268): not opened directly (paywalled publisher volume). The seesaw definition, examples, and mechanism were verified directly from Kudla's own 1996 lecture notes, Ch. IV.1 [46](../references.md#reference-46).
- **Benedict H. Gross, *Algebraic modular forms*** (*Israel Journal of Mathematics*, volume 113, 1999, pages 61–93) and **M. Kashiwara and M. Vergne, *On the Segal–Shale–Weil representation and harmonic polynomials*** (*Inventiones Mathematicae*, volume 44, 1978, pages 1–47): cited as background in `DefiniteThetaLift.lean` [37](../references.md#reference-37) and Howe's bibliography [44](../references.md#reference-44), not opened directly.
- **Unread sections of our directly inspected primary sources:** Sections 4–6 of Howe's 1989 JAMS paper [44](../references.md#reference-44); Sections 1–4 of Howe's 1989 *Transactions* paper [45](../references.md#reference-45); Chapters I.2–I.6, II.3, II.6, III, IV.2–IV.3, V, and VI of Kudla's 1996 notes [46](../references.md#reference-46); Sections II, III, and the remainder of Section IV of Kudla's 1992/2002 Kyoto notes [47](../references.md#reference-47).
- **Lower-level Lean files in `lsernau/grh-lean@72fead10`:** we did not read the underlying construction of `New.Space.θ`, `New.classIntegral`, `New.Seesaw.SeesawIdentity`, or the remaining ~780 Lean files in `grh/` [37](../references.md#reference-37).
