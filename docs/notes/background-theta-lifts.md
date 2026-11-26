# Background: theta lifts, classical sources, and the Lean definitions

This note verifies two pieces of background for reading the shorter Lean 4 proof of the Generalized Riemann Hypothesis (`lsernau/grh-lean`, commit `72fead102f663d5c7a407964a13dc0cf9d977207`) [37](../references.md#reference-37):

1. What a **theta lift** (theta correspondence) is in the primary literature of Roger Howe [44](../references.md#reference-44) [45](../references.md#reference-45), Stephen S. Kudla [46](../references.md#reference-46) [47](../references.md#reference-47), and Masaki Kashiwara and Michèle Vergne [48](../references.md#reference-48), including why pairing against a theta kernel transfers symmetries, how Howe bootstraps the compact case to general archimedean pairs, and how the construction simplifies on definite (compact) spaces.
2. How the shorter Lean library defines theta distributions, class integrals, theta kernels, theta lifts, and the seesaw identity—specifically `New.Space.θ`, `New.Space.lift`, `New.classIntegral`, `New.Kernel.lift`, `New.thetaKernel`, `New.Data.lowerChain`, `New.Data.compositeLift`, `New.Data.goodLift`, `New.Rows.carrierForm`, and `New.Data.seesaw_identity`—and how those formal definitions compare with the classical Howe–Kudla–Kashiwara–Vergne framework [37](../references.md#reference-37).

Every Lean declaration below is copied verbatim from `lsernau/grh-lean` at commit `72fead102f663d5c7a407964a13dc0cf9d977207`, with exact file paths and line numbers [37](../references.md#reference-37). Plain-language explanations and comparisons are our own unless cited.

## Result in short

- **Classical picture.** A theta lift takes a function (or representation) on one classical symmetry group $G$ and produces a function (or representation) on a partner group $G'$ by integrating against a two-variable **theta kernel** $\theta(g, h; \phi)$ built from a quadratic or Hermitian form and a lattice sum [47](../references.md#reference-47). The two groups $(G, G')$ sit inside a single larger symplectic group $\mathrm{Sp}(\mathbb{W})$ as mutual centralizers—a **reductive dual pair**—and act jointly on the **Weil (oscillator) representation** $\omega$ [44](../references.md#reference-44) [46](../references.md#reference-46).
- **Why symmetries transfer.** Because $G$ and $G'$ commute inside $\mathrm{Sp}(\mathbb{W})$, the action of $G$ on the test function $\phi$ moves across the integral onto the input automorphic form $f$, while the action of $G'$ moves onto the output [46](../references.md#reference-46) [47](../references.md#reference-47). In the local representation-theoretic version, Howe's duality theorem pairs irreducible representations $\pi$ of $\widetilde{G}$ bijectively with irreducible representations $\theta(\pi)$ of $\widetilde{G}'$ [44](../references.md#reference-44) [46](../references.md#reference-46).
- **What happens when a space is definite (compact).** When the source quadratic or Hermitian space is definite, its isometry group over $\mathbb{R}$ is compact and the space is anisotropic. Globally, Weil's convergence criterion holds unconditionally [47](../references.md#reference-47); over the reals, Howe [44](../references.md#reference-44) [45](../references.md#reference-45) and Kashiwara–Vergne [48](../references.md#reference-48) showed that the compact-member correspondence reduces to classical invariant theory on spaces of harmonic and pluriharmonic polynomials.
- **What the Lean library does.** `lsernau/grh-lean` builds `New.Space.θ` without a polarization and proves its rational $\Gamma$-invariance by doubling $V \oplus V^-$ (`theta_omega_ratEmbed`), implements **both** the analytic adelic integral (`New.Space.lift`) and an algebraic finite-class-sum version (`New.Kernel.lift` via `New.classIntegral` and the Schur jet kernel `New.thetaKernel`), proves in `New.exists_lift_ofAlgForm_eq_smul` that they match up to a scalar on definite spaces, and proves `New.Data.seesaw_identity` equating the indefinite chain `D.lowerChain` on Poincaré series to a nonzero multiple of the restricted definite chain `D.compositeLift` [37](../references.md#reference-37).

---

## Part 1: Classical theta lifts in Howe, Kudla, and Kashiwara–Vergne

### 1.1 The Weil representation, metaplectic splitting, and reductive dual pairs

Start with a nondegenerate symplectic vector space $(W, \langle \cdot, \cdot \rangle)$ of dimension $2n$ over a field $F$ (in Kudla's 1996 notes, a non-archimedean local field of characteristic not $2$ [46](../references.md#reference-46), Ch. I.1, p. 3; in Howe's 1989 JAMS paper, $F = \mathbb{R}$ [44](../references.md#reference-44), §1, p. 535). From $(W, \langle \cdot, \cdot \rangle)$ one builds the **Heisenberg group** $H(W) = W \oplus F$ with multiplication

$$(w_1, t_1)(w_2, t_2) = \left(w_1 + w_2,\, t_1 + t_2 + \frac{1}{2}\langle w_1, w_2 \rangle\right),$$

on which the symplectic group $\mathrm{Sp}(W)$ acts by automorphisms fixing the center $Z = \{(0, t)\} \simeq F$ [46](../references.md#reference-46), Ch. I.1, p. 3. Fix a nontrivial additive character $\psi$ of $F$. By the Stone–von Neumann theorem (Kudla [46](../references.md#reference-46), Ch. I.1, Theorem 1.1, p. 3), $H(W)$ has a unique smooth irreducible representation $(\rho_\psi, S)$ with central character $\psi$. Choosing a complete polarization $W = X + Y$ gives the **Schrödinger model** on $\mathcal{S}(X)$ ([46](../references.md#reference-46), Ch. I.2, Lemma 2.2 and Proposition 2.3, pp. 7–10). Because every $g \in \mathrm{Sp}(W)$ fixes the center, twisting $\rho_\psi$ by $g$ yields an intertwining operator $r(g)$ on $\mathcal{S}(X)$ unique up to a scalar, whose 2-cocycle $c_Y(g_1, g_2) = \gamma(\psi \circ L(Y, Y g_1^{-1}, Y g_2^{-1} g_1^{-1}))$ is given by the Weil index of the Leray invariant (Ch. I.3, Theorem 3.1, p. 13) [46](../references.md#reference-46). Rao's reduction replaces $c_Y$ by a $\mu_2$-valued cocycle $c_{\mathrm{Rao}, e}$ independent of $\psi$ (Ch. I.4–I.5, Theorem 4.5 and Corollaries 4.8–4.9, pp. 20–23), yielding the canonical twofold central extension—the **metaplectic group** $\mathrm{Mp}(W)$ (written $\widetilde{\mathrm{Sp}}$ over $\mathbb{R}$ in Howe [44](../references.md#reference-44), §1, p. 535)—and the **Weil representation** (also called the **oscillator representation**, a term Howe proposed in [45](../references.md#reference-45), §2, pp. 548–549, by analogy with the spin representation) $(\omega_\psi, S)$ [44](../references.md#reference-44), p. 535; [46](../references.md#reference-46), Ch. I.1–I.5. Although $\mathrm{Mp}(W)$ splits over the maximal parabolic $P_Y$ stabilizing $Y$ (Ch. I.6, Lemma 6.1, p. 23), it is a nontrivial extension of $\mathrm{Sp}(W)$ (Proposition 6.6, p. 27) [46](../references.md#reference-46).

Now consider two reductive subgroups $G, G' \subseteq \mathrm{Sp}(\mathbb{W})$ inside a symplectic group $\mathrm{Sp}(\mathbb{W})$. Kudla gives the definition attributed to Howe ([46](../references.md#reference-46), Ch. II.1, Definition 1.1, p. 29): $(G, G')$ is a **reductive dual pair** if $G$ and $G'$ are mutual centralizers in $\mathrm{Sp}(\mathbb{W})$, meaning

$$\mathrm{Cent}_{\mathrm{Sp}(\mathbb{W})}(G) = G' \quad \text{and} \quad \mathrm{Cent}_{\mathrm{Sp}(\mathbb{W})}(G') = G.$$

The principal family of irreducible dual pairs—**Type I dual pairs**—arises from tensoring two spaces with compatible forms over a division algebra $(D, \iota)$ with involution [46](../references.md#reference-46), Ch. II.1, pp. 29–31:

- Let $(D, \iota)$ be $(F, \mathrm{id})$, a quadratic extension $(E, \sigma)$ with its nontrivial Galois involution, or a quaternion division algebra $(B, \sigma)$ with its main involution.
- Take a finite-dimensional right $D$-vector space $V$ with a nondegenerate $\epsilon$-Hermitian form $(\cdot, \cdot)$ and isometry group $G(V)$, and a left $D$-vector space $W$ with a nondegenerate $\epsilon$-skew-Hermitian form $\langle \cdot, \cdot \rangle$ and isometry group $G(W)$ ($\epsilon = \pm 1$).
- Their tensor product $\mathbb{W} = V \otimes_D W$ carries a nondegenerate $F$-bilinear alternating form $\langle\!\langle x_1 \otimes y_1,\, x_2 \otimes y_2 \rangle\!\rangle = \mathrm{tr}_{D \text{ over } F}\!\left((x_1, x_2)\,\langle y_1, y_2 \rangle^\iota\right)$ (Kudla's text on p. 30 prints the indices as $(x_1, y_1)\langle x_2, y_2 \rangle^\iota$), giving a natural commuting map $G(V) \times G(W) \to \mathrm{Sp}(\mathbb{W})$ [46](../references.md#reference-46), Ch. II.1, pp. 30–31.

Two Type I cases matter most here:

1. When $(D, \iota) = (F, \mathrm{id})$ and $\epsilon = +1$, $V$ is a quadratic (orthogonal) space and $W$ is a symplectic space, giving the orthogonal–symplectic dual pair $(O(V), \mathrm{Sp}(W))$ treated throughout Kudla [46](../references.md#reference-46), Ch. II.3–II.6, pp. 34–40, and [47](../references.md#reference-47), §I.1, pp. 2–3. Pullback of the twofold metaplectic cover $\mathrm{Mp}^{(2)}(\mathbb{W})$ to $\mathrm{Sp}(W)$ splits if and only if $m = \dim_F V$ is even ([46](../references.md#reference-46), Ch. II.3, Proposition 3.2 and Corollary 3.3, pp. 35–36), and scaling the form by $a \in F^\times$ is equivalent to scaling the additive character: $\omega_{\psi, V_a} = \omega_{\psi_a, V}$ (Ch. II.6, Corollaries 6.1–6.2, p. 40).
2. When $(D, \iota) = (E, \sigma)$ is a quadratic extension, $V$ and $W$ are Hermitian and skew-Hermitian spaces (the latter equivalent to a Hermitian space after multiplying by a purely imaginary scalar), giving the **unitary dual pair** $(U(V), U(W))$—the exact setting of the Lean proof `lsernau/grh-lean` [37](../references.md#reference-37) [46](../references.md#reference-46), Ch. II.1, pp. 29–31. Kudla notes ([46](../references.md#reference-46), Ch. II.4, p. 39) that for every irreducible Type I dual pair other than odd-dimensional $(O(V), \mathrm{Sp}(W))$—hence in particular for every unitary pair $(U(V), U(W))$—the restricted metaplectic extensions $\widetilde{G}$ and $\widetilde{G}'$ always split (with splittings parametrized by splitting characters, as realized by `a`, `b`, and `upsilonU1` in `lsernau/grh-lean` [37](../references.md#reference-37)).

### 1.2 Why pairing against a theta kernel transfers symmetries

Because the preimages $\widetilde{G}$ and $\widetilde{G}'$ commute inside $\mathrm{Mp}(\mathbb{W})$, restricting the Weil representation $\omega_\psi$ to $\widetilde{G} \times \widetilde{G}'$ lets both groups act on the same space $S$ without interfering with each other [44](../references.md#reference-44), §1, p. 535; [46](../references.md#reference-46), Ch. II.2, p. 32.

**Local mechanism (quotients and Howe duality).** Given an irreducible admissible representation $\pi$ of $\widetilde{G}$, form the maximal quotient $S(\pi)$ of $S$ on which $\widetilde{G}$ acts as a multiple of $\pi$, namely the quotient of $S$ by $N(\pi) = \bigcap_{\lambda \in \mathrm{Hom}_{\widetilde{G}}(S, \pi)} \ker(\lambda)$ [46](../references.md#reference-46), Ch. II.2, p. 32 (and in the archimedean smooth-vector setting, the quotient of $\mathcal{Y}^\infty$ by $\mathcal{Y}_\rho$, Howe [44](../references.md#reference-44), §1, eq. (1.1), p. 536). Because $\widetilde{G}'$ commutes with $\widetilde{G}$, it stabilizes $N(\pi)$ and acts on the quotient, which factors as

$$S(\pi) \simeq \pi \otimes \Theta_\psi(\pi)$$

for a representation $\Theta_\psi(\pi)$ of $\widetilde{G}'$ [46](../references.md#reference-46), Ch. II.2, pp. 32–33 (corresponding to $\rho'_1$ in Howe [44](../references.md#reference-44), eq. (1.1), p. 536).

- **Archimedean Howe duality and its bootstrap from compact pairs (Howe 1989 [44](../references.md#reference-44), §§1, 3–6, pp. 535–551).** For any reductive dual pair $(G, G') \subseteq \mathrm{Sp}_{2n}(\mathbb{R})$, the set $\mathcal{R}(\widetilde{G} \cdot \widetilde{G}', \omega)$ of irreducible admissible representations occurring as quotients of the smooth oscillator representation $\omega^\infty$ is the graph of a **bijection** between $\mathcal{R}(\widetilde{G}, \omega)$ and $\mathcal{R}(\widetilde{G}', \omega)$, each pair $\rho \otimes \rho'$ occurring with multiplicity one (Theorem 1). Equivalently, the big theta lift $\rho'_1$ is finitely generated, admissible, and quasisimple, with a unique irreducible quotient $\rho'$ (Theorem 1A). In §§4–6, Howe bootstraps this general theorem from the compact-member case of §3 via a **degree filtration** on the Fock polynomials $\mathcal{P}$:
  - By Lemma 3.3 and Proposition 3.4 (p. 544, eqs. (3.15)–(3.16)), for maximal compact subgroups $(K, K')$ of $(G, G')$, the **joint harmonics** $\mathcal{H}(K)_\sigma \cap \mathcal{H}(K')_{\sigma'}$ sit at the lowest degree of each compact unitary block $\mathcal{J}_{\tau, \tau'}$, make $K$ and $K'$ mutual commutants on $\mathcal{H}(K) \cap \mathcal{H}(K')$, and generate $\mathcal{P} = \mathcal{U}(\mathfrak{g})\mathcal{U}(\mathfrak{g}')(\mathcal{H}(K) \cap \mathcal{H}(K'))$ [44](../references.md#reference-44).
  - For any $(\mathfrak{g} \times \mathfrak{g}', K \cdot K')$-invariant subspace $\mathcal{N} \subseteq \mathcal{P}$, define the degree threshold $\delta(\mathcal{N}) = \max\{d : \mathcal{P}^{(d)} \subseteq \mathcal{N}\}$. Lemma 4.1 (p. 545, eq. (4.1)) shows that $1 + \delta(\mathcal{N}) = \min\{\deg \sigma : \sigma \in \mathcal{R}(K, \text{quotient of }\mathcal{P}\text{ by }\mathcal{N})\} = \min\{\deg \sigma' : \sigma' \in \mathcal{R}(K', \text{quotient of }\mathcal{P}\text{ by }\mathcal{N})\}$ and that every minimal-degree $K$-type $\sigma$ pairs with a unique $K'$-type $\sigma'$ via $\mathcal{H}_{\sigma, \sigma'} = \mathcal{H}(K)_\sigma \cap \mathcal{H}(K')_{\sigma'}$ [44](../references.md#reference-44).
  - Forming the quotient $\mathcal{Z}^{\tau, \tau'}$ of $\mathcal{Y}^{\tau, \tau'} + \mathcal{Y}^{(d)}$ by $\mathcal{Y}^{(d)}$ (where $d = \delta(\mathcal{N}_\rho)$, eq. (4.2), p. 545), Howe shows that the quotient of $\mathcal{P}$ by $\mathcal{N}_\rho$ is a quotient of $\mathcal{Z}^{\tau, \tau'}$ and that on $Z_{\sigma, \sigma'} = \mathrm{Hom}_{K \cdot K'}(\mathcal{H}_{\sigma, \sigma'}, \mathcal{Z}^{\tau, \tau'})$ the identity map $e_0$ is a **simultaneous cyclic vector** for the commuting algebras $\mathcal{U}(\mathfrak{g})^K$ and $\mathcal{U}(\mathfrak{g}')^{K'}$ (eq. (4.8), p. 546) [44](../references.md#reference-44). By Lemma 4.2 (pp. 546–547), two commuting algebras with a simultaneous cyclic vector are full mutual commutants, ruling out two distinct irreducible quotients $\rho \otimes \rho'$ and $\rho \otimes \rho''$ and establishing Theorem 2.1 [44](../references.md#reference-44).
  - Section 5 (pp. 547–550) lists all seven irreducible real families (eqs. (5.1)–(5.2), including $(U_{p,q}, U_{r,s})$ in (5.2)(iii)) and verifies Facts 1–3 in table (5.3) (p. 549), where the auxiliary compact unitary pair $(M^{(1,1)}, M'^{(1,1)})$ for $(U_{p,q}, U_{r,s})$ is $(U_p, U_r) \oplus (U_q, U_r) \oplus (U_p, U_s) \oplus (U_q, U_s)$ [44](../references.md#reference-44). Section 6 (pp. 550–551, Theorem 6.1 and Lemma 6.2) adapts the same degree-filtration argument to the Hilbert-space completion $\overline{\mathcal{P}}$ to prove that the von Neumann algebras generated by $\omega(\widetilde{G})$ and $\omega(\widetilde{G}')$ are mutual commutants [44](../references.md#reference-44).
- **Non-archimedean Howe duality, Witt towers, and unramified functoriality (Kudla 1996 [46](../references.md#reference-46), Chs. II.2, III, V, VI).** In odd residue characteristic, $\Theta_\psi(\pi)$ is either $0$ or admissible of finite length with a unique irreducible quotient $\theta_\psi(\pi)$, and $\pi \mapsto \theta_\psi(\pi)$ gives a bijection $\mathrm{Howe}_\psi(\widetilde{G}; \widetilde{G}') \xrightarrow{\sim} \mathrm{Howe}_\psi(\widetilde{G}'; \widetilde{G})$ (Ch. II.2, p. 33) [46](../references.md#reference-46). Varying one member along a **Witt tower** $V_r = V_0 + V_{r,r}$ (adding hyperbolic planes) reveals four structural laws:
  1. *Persistence and stable range* (Ch. III.4, Propositions 4.1, 4.3, and 4.5, pp. 45–50): once $\Theta(\pi, V_{r_0}) \neq 0$, it stays nonzero for all $r \ge r_0$, and non-vanishing is forced once $r \ge 2n$ (or $n \ge \dim_F V$ in the reverse direction), defining the **first occurrence index** $r(\pi)$ or $n(\pi')$ (Definition 4.6, p. 50) [46](../references.md#reference-46).
  2. *Trivial representation and supercuspidals* (Ch. III.5–III.8, pp. 50–58): Rallis's theorem injects $R_n(V) = \Theta(\mathbf{1}_V, W_n) = \mathcal{S}(V^n)_{O(V)}$ into the degenerate principal series $I_{P_n}^{G_n}(\chi_V^\psi |\det|^{\frac{m}{2} - \frac{n + 1}{2}})$ (Theorem 5.1, p. 51). For any supercuspidal $\pi$, $\Theta(\pi, V_r)$ is irreducible for all $r \ge r(\pi)$, supercuspidal precisely at first occurrence $r = r(\pi)$, and non-supercuspidal for $r > r(\pi)$ (Theorems 6.1–6.2, pp. 52–53); general lifts track Bernstein–Zelevinsky data by adding or cancelling an explicit character "tail" (Theorems 7.1–7.2, pp. 54–56), proved via Kudla's filtrations of Jacquet modules $R_{P_i}(\omega_{n,r})$ and $R_{Q_j}(\omega_{n,r})$ (Theorems 8.1–8.2, pp. 57–58) [46](../references.md#reference-46).
  3. *Conservation and dichotomy across paired Witt towers* (Ch. V.1–V.3, pp. 75–83): for paired towers $V_\chi^\pm$ of fixed quadratic character $\chi$ and parity, Kudla–Rallis's **Conservation Conjecture** predicts $r_\chi^+(\pi) + r_\chi^-(\pi) = 2n$, i.e., $m_\chi^+(\pi) + m_\chi^-(\pi) = 4n + 4$ (Conjecture 1.5, pp. 76–77), implying the **Dichotomy Conjecture** in odd dimension (Conjecture 1.6, p. 77; Kudla notes on p. 75 the analogous unitary dichotomy of Harris–Kudla–Sweet) [46](../references.md#reference-46). Kudla records the lower bound $r_\chi^+(\pi) + r_\chi^-(\pi) \ge 2n$ (Theorem 1.7), exact conservation for $\mathbf{1}_{W_n}$ (Theorem 1.8) and all supercuspidals (Theorem 1.9, p. 78), the orthogonal-side analogue $n(\tilde{\chi} \otimes \tau) + n(\mathrm{sgn}\cdot \tilde{\chi} \otimes \tau) = \dim_F V$ (Conjecture 2.3, p. 79), and the doubling multiplicity-one criterion $\dim \mathrm{Hom}_{G_n \times G_n}(I_{2n}(s_0, \chi), \pi \otimes \pi^\vee) = 1$ (Theorem 3.1, Proposition 3.5, Corollary 3.6, pp. 80–83) [46](../references.md#reference-46).
  4. *Chains of supercuspidals and unramified $L$-group functoriality* (Ch. VI.1–VI.4, pp. 84–106): alternating first occurrences across paired towers generates infinite chains of supercuspidals (Ch. VI.2, pp. 90–93), while at unramified places $K$-fixed vectors correspond explicitly via Satake parameters (Ch. VI.3, Propositions 3.1–3.2, pp. 95–96) and are packaged by Rallis's $L$-group homomorphisms $C : {}^L H \to {}^L G$ (for $1 \le t \le n$) and $C' : {}^L G \to {}^L H$ (for $t \ge n + 1$) (Ch. VI.4, Theorem, pp. 105–106) [46](../references.md#reference-46).

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

Kudla highlights in §I.4, Remark (1) (p. 7) that while Eisenstein series are built from purely local data, the theta integral $I(g; \phi)$ encodes global lattice-point arithmetic through the theta distribution $\phi \mapsto \sum_{x \in V(F)^n} \phi(x)$ [47](../references.md#reference-47). In §§II–IV of his Kyoto notes [47](../references.md#reference-47), Kudla develops the full representation-theoretic and regularized global theory:

- **Coherent vs. incoherent sections and uniqueness (§II.1–II.2, pp. 8–17).** Globally, the restricted tensor product $\Pi_n(V) = \bigotimes_v R_{n,v}(V)$ embeds in the degenerate principal series $I_n(s_0, \chi_V)$ at $s_0 = \frac{m}{2} - \rho_n$ ($\rho_n = \frac{n + 1}{2}$), alongside **incoherent families** $\mathcal{C} = \{U_v\}$ whose local Hasse invariants satisfy $\prod_v \epsilon_v(U_v) = -1$ and therefore come from no global quadratic space $V$ (p. 15). For $0 \le m \le n$, $\dim \mathrm{Hom}_{G(\mathbb{A})}(\Pi_n(V), \mathcal{A}(G)) = 1$, whereas $\mathrm{Hom}_{G(\mathbb{A})}(\Pi_n(\mathcal{C}), \mathcal{A}(G)) = 0$ for $2 \le m \le n + 1$ (Theorem, p. 17) [47](../references.md#reference-47).
- **Regularized Siegel–Weil formulas (§III.1–III.4, pp. 17–28).** Outside Weil's convergence range ($V$ isotropic with $m - r \le n + 1$), $V$ decomposes as $V = V_0 + V_{t,t}$ with complementary space $\dim_F V + \dim_F V_0 = 2n + 2$ (eqs. (III.1.5)–(III.1.6), p. 19), explaining Weil's convergence boundary structurally. Applying Maass's trick with central enveloping-algebra operators $z \in \mathfrak{z}(\mathfrak{g}_v)$ and $z' \in \mathfrak{z}(\mathfrak{h}_v)$ ($\omega(z) = \omega(z')$) kills the degenerate rank-$< r$ terms in the mixed model $\mathcal{S}(V_{\mathrm{an}}(\mathbb{A})^n) \otimes \mathcal{S}(W(\mathbb{A})^r)$ so that $\theta(g, h; \omega(z)\phi)$ decays rapidly on $H(F) \backslash H(\mathbb{A})$ (Theorem and Corollary, pp. 21–22). Dividing $\int_{H(F) \backslash H(\mathbb{A})} \theta(g, h; \omega(z)\phi)\,E(h, s')\,dh$ by the polynomial $P(s'; z)$ defines the regularized theta integral $\mathcal{E}(g, s', \phi)$ (pp. 22–23), whose leading Laurent terms $B_{-1}, B_{-2}$ match the residues $\bar{A}_{-1}$ (for $n + 1 < m \le 2n$) and central values $A_0$ (for odd $n$, $m = n + 1$) of the Siegel Eisenstein series (Corollary, p. 24). Section III.4 (pp. 24–28) gives **second-term identities** relating $A_0(g, \Phi)$ to $B_{-1}$ and $B_{-2}$ for $n = 2, m = 4$ ($s_0 = \frac{1}{2}$) and for spherical split spaces over $\mathbb{Q}$ [47](../references.md#reference-47).
- **Doubling method, Rallis inner product formula, and classical translation (§IV.1–IV.2, pp. 29–41).** Pairing cusp forms $f_1, f_2 \in \pi$ on $G = \mathrm{Sp}(n)$ against the normalized Siegel Eisenstein series on the doubled group $\widetilde{G} = \mathrm{Sp}(2n)$ yields Piatetski-Shapiro and Rallis's doubling identity $Z^*(s, f_1, f_2, \Phi) = L^S\!\left(s + \frac{1}{2}, \pi, \chi, r\right)\langle \pi_S(\Phi(s))f_1, f_2 \rangle$ (eq. (IV.1.15), p. 31). Consequently, any pole of $L^S(s, \pi, \chi, r)$ lies in $\left\{1, 2, \dots, \left\lfloor \frac{n}{2} \right\rfloor + 1\right\}$ and forces a nonzero global theta lift $\Theta_V(\pi) \neq 0$ for a quadratic space $V$ of dimension $m = 2n + 2 - 2s_0$ (Theorems, p. 32), proved via **Rallis's inner product formula** equating the doubling integral of $\bar{I}$ (for anisotropic $V$, eq. (IV.1.18)) or $\bar{B}_{-1}$ (for isotropic $V$ with $z'$, eq. (IV.1.19)) to the Petersson inner product of theta lifts $\int_{H(F) \backslash H(\mathbb{A})} \theta(h; f_1, \phi_1)\,\overline{\theta(h; f_2, \phi_2)}\,dh$ (Proposition, p. 33). Section IV.2 (pp. 33–41) translates $E(g, s, \Phi)$ into classical Siegel Eisenstein series on the Siegel upper half-space $\mathbb{H}_n$ (eqs. (IV.2.22)–(IV.2.24)), characterizes coherence vs. incoherence of level-$1$ series at $s = 0$ by parity ($n \equiv 7 \pmod 8$ coherent, $n \equiv 3 \pmod 8$ incoherent, Proposition, p. 39), and constructs non-trivial automorphic extensions from incoherent sections (pp. 40–41) [47](../references.md#reference-47).

### 1.3 Definite and compact spaces: harmonic and pluriharmonic polynomials

Two simplifications happen simultaneously when the quadratic or Hermitian space $V$ is **definite** (so its real isometry group is compact and $V$ has no nonzero isotropic vectors):

1. **Unconditional global convergence and finite class sums.** Weil's convergence criterion (Kudla [47](../references.md#reference-47), §I.2, eq. (I.2.3), p. 4) states that $I(g; \phi)$ converges absolutely for every $\phi$ whenever either (1) $V$ is **anisotropic** or (2) $m - r > n + 1$ (where $r$ is the Witt index of $V$). Every definite space is anisotropic, so convergence holds with no dimension constraint, and the quotient $H(F) \backslash H(\mathbb{A})$ is compact. Moreover, in Rallis's inner product formula for anisotropic $V$ (Kudla [47](../references.md#reference-47), §IV.1, Proposition, eq. (IV.1.18), p. 33), the Petersson inner product of two theta lifts $\theta(h; f_1, \phi_1)$ and $\theta(h; f_2, \phi_2)$ over $H(F) \backslash H(\mathbb{A})$ equals an unregularized doubling integral directly. When a test function is right-invariant under a compact open subgroup $K \subseteq H(\mathbb{A}_f)$ and $H(\mathbb{R})$ is compact, the space of double cosets of $H(\mathbb{A}_f)$ by $H(F)$ on the left and $K$ on the right is finite, turning the adelic integral over $H(F) \backslash H(\mathbb{A})$ into a **finite class sum** (this is precisely how `lsernau/grh-lean` realizes `New.Kernel.lift` via `New.classIntegral` [37](../references.md#reference-37)).
2. **Archimedean harmonic polynomials and Classical Invariant Theory (Howe [44](../references.md#reference-44) [45](../references.md#reference-45)).** In his 1989 JAMS paper, Howe notes in §1, Remark (b) (p. 536) that when $G$ or $G'$ is **compact**, Theorems 1 and 1A reduce to a version of **Classical Invariant Theory** and serve as the stepping stone to the general archimedean proof [44](../references.md#reference-44). Specifically:
   - In §2 (p. 537, eq. (2.2)), Howe works in the **Fock model**, where the $\widetilde{U}$-finite vectors of the oscillator representation form the polynomial algebra $\mathcal{P} = \mathcal{P}(\mathbb{C}^n)$, and $\omega(\mathfrak{sp}_{\mathbb{C}}) = \mathfrak{sp}^{(1,1)} \oplus \mathfrak{sp}^{(2,0)} \oplus \mathfrak{sp}^{(0,2)}$ acts by degree-preserving Euler operators $\frac{1}{2}\!\left(z_i \frac{\partial}{\partial z_j} + \frac{\partial}{\partial z_j} z_i\right)$, quadratic multiplication $z_i z_j$, and second-order constant-coefficient differential operators $\frac{\partial^2}{\partial z_i \partial z_j}$ [44](../references.md#reference-44).
   - For any dual pair $(L, L')$ with $L \subseteq U$ compact (§3, pp. 541–542), Howe defines the space of **$L$-harmonics** as the polynomials killed by all degree-lowering operators in $\mathfrak{l}'^{(0,2)}$ ([44](../references.md#reference-44), eq. (3.6), p. 541):
     $$\mathcal{H}(L) = \{P \in \mathcal{P} : \ell'(P) = 0 \text{ for all } \ell' \in \mathfrak{l}'^{(0,2)}\}.$$
   - Decomposing $\mathcal{P} = \sum_{\sigma \in \mathcal{R}(L, \omega)} \mathcal{I}_\sigma$ into $L$-isotypic components (eq. (3.7)) and setting $\mathcal{H}(L)_\sigma = \mathcal{H}(L) \cap \mathcal{I}_\sigma$ (eq. (3.8)), Howe states four conclusions derived from Classical Invariant Theory (eq. (3.9)(a)–(d), p. 542, citing his companion *Transactions* paper [45](../references.md#reference-45)): $L \times \mathfrak{l}'$ acts irreducibly on each $\mathcal{I}_\sigma$; $\mathcal{H}(L)_\sigma$ consists precisely of the lowest-degree polynomials in $\mathcal{I}_\sigma$; $\mathcal{I}_\sigma = \mathcal{U}(\mathfrak{l}'^{(2,0)}) \cdot \mathcal{H}(L)_\sigma$; and $L$ and $\mathfrak{l}'^{(1,1)}$ generate mutual commutants on $\mathcal{H}(L)$, so $\mathcal{H}(L)_\sigma \simeq \sigma \otimes \tau'$ gives an injection $\sigma \mapsto \tau'$ [44](../references.md#reference-44).
   - When **both** members are compact—as in the unitary dual pair $(M^{(1,1)}, M'^{(1,1)})$ of products of unitary groups $U_p \times U_n$ (Howe [44](../references.md#reference-44), §3, Fact 2 and eqs. (3.11)–(3.13), pp. 540, 542–543)—the polynomial algebra decomposes directly as $\mathcal{P} = \sum \mathcal{I}_{\tau, \tau'}$ into finite-dimensional irreducible modules $\tau \otimes \tau'$, giving an explicit bijection $\tau \leftrightarrow \tau'$ of finite-dimensional algebraic representations. For general pairs $(G, G')$, Howe summarizes in §7(b) (pp. 551–552) that the correspondence $\rho \leftrightarrow \rho'$ is anchored by a bijection $\sigma \leftrightarrow \sigma'$ on the space of **joint harmonics** $\mathcal{H}(\widetilde{K}) \cap \mathcal{H}(\widetilde{K}')$ of lowest polynomial degree [44](../references.md#reference-44).
   - In his companion 1989 *Transactions* paper (written in 1976) [45](../references.md#reference-45), Howe proves the underlying algebraic theorems in full generality:
     - **§1 (pp. 541–544):** Theorems 1A and 1B span tensor invariants of $\mathrm{GL}_n$, $O_n$, and $\mathrm{Sp}_{2m}$ by permutations of canonical pairings; Theorem 2 extends Weyl's First Fundamental Theorem to the mixed symmetric–exterior algebra $\mathcal{A}(U, W) \simeq S(U) \otimes \Lambda(W)$, proving that $G$-invariants are generated in degree $2$ [45](../references.md#reference-45).
     - **§2 (pp. 544–549):** Forming the Weyl/Clifford endomorphism algebra $\mathrm{End}^\circ(\mathcal{A}(U, W))$ generated by multiplications $M_x$ and derivations/antiderivations $D_{u^*}, D_{w^*}$, Theorem 5 embeds $\mathfrak{g} = \mathfrak{sp}(\widetilde{U}) \oplus \mathfrak{o}(\widetilde{W})$ inside $\mathrm{End}^\circ$ as filtration-preserving derivations, and Theorem 6 proves $\mathrm{Gr}\,\mathrm{End}^\circ(\mathcal{A}(U, W)) \simeq \mathcal{A}(\widetilde{U}, \widetilde{W})$ equivariantly under $\mathrm{Sp}(\widetilde{U}) \times O(\widetilde{W})$ [45](../references.md#reference-45).
     - **§3 (pp. 549–556):** Inside the graded Lie algebra $\mathfrak{gr} = \mathfrak{g} \oplus (\widetilde{U} \otimes \widetilde{W})$, for any classical reductive dual pair $(\Gamma, \Gamma')$, Theorem 7 proves that $\Gamma'$ generates the full algebra of $G$-invariants in $\mathrm{End}^\circ$; Theorem 8 decomposes $\mathcal{A}(U, W) = \bigoplus_{j = 0}^\infty I_j$ into irreducible joint $(G, \Gamma')$-modules $I_j \simeq \sigma_j \otimes \tau_j$ with $\sigma_j \leftrightarrow \tau_j$ bijective; and **Theorem 9** (p. 555) proves separation of variables $I_0 \otimes \mathcal{H} \twoheadrightarrow \mathcal{A}(U, W)$ for the $\Gamma'$-harmonics $\mathcal{H} = \ker \Gamma'^{(0,2)}$, showing that $\mathcal{H}_j = \mathcal{H} \cap I_j$ consists of the lowest-degree elements of $I_j$, is irreducible under $G \times \Gamma'^{(1,1)}$ with a bijective correspondence, and generates $I_j = I_0 \mathcal{H}_j$ cyclically under $\Gamma'^{(2,0)}$ [45](../references.md#reference-45).
     - **§4 (selected examples, pp. 556, 559, 564–568):** §4(a) recovers classical spherical harmonics for $O_n$ from $\Gamma' \simeq \mathfrak{sl}_2 = \mathrm{span}(r^2, \Delta, 4E + 2n)$; §4(b) derives the polynomial de Rham homotopy $2\frac{dd^* + d^* d}{\deg_p + \deg_e} = 1 - P$; and §4(f) interprets the **Capelli identity** as the equality $\alpha(\mathcal{Z}(\Gamma)) = \alpha'(\mathcal{Z}(\Gamma')) = A(\Gamma) \cap A(\Gamma')$, proving eq. (C) and Proposition 3 (pp. 565, 567) giving explicit free polynomial generators $\gamma_l = \sum_{\alpha, \beta} \det(x_{\alpha_j \beta_k})\det\!\left(\frac{\partial}{\partial x_{\alpha_j \beta_k}}\right)$ of $A(\mathfrak{gl}_n) \cap A(\mathfrak{gl}_m)$ [45](../references.md#reference-45).
3. **Pluriharmonic polynomials and explicit unitary highest-weight lifts (Kashiwara and Vergne 1978 [48](../references.md#reference-48)).** Working explicitly with tensor products $L_k = \bigotimes^k L$ of the harmonic (Segal–Shale–Weil) representation for the compact-member pairs $(Mp(n), O(k))$ (Ch. II) and $(U(p, q), U(k))$ (Ch. III), Kashiwara and Vergne realize each irreducible component $L_k(\lambda)$ inside holomorphic vector-valued functions on the Hermitian symmetric domain $D$ via intertwining integrals $\mathcal{F}_\lambda$ against **pluriharmonic polynomials** (Introduction (0.3)–(0.9), pp. 2–5; Ch. III §III.4, Proposition III.4.1, p. 39) [48](../references.md#reference-48):
   - In the orthogonal–symplectic case $(Mp(n), O(k))$ (Introduction eq. (F-7), p. 4; Ch. II §§II.6–II.7, pp. 23, 27), pluriharmonic polynomials on $M(n, k; \mathbb{C})$ satisfy $\Delta_{ij} P = \sum_{\nu = 1}^k \frac{\partial^2 P}{\partial x_{i\nu}\partial x_{j\nu}} = 0$ ($1 \le i \le j \le n$), their joint highest-weight vectors are explicit products of principal minors (Propositions II.6.6 and II.6.11), and $\lambda \mapsto \tau(\lambda)$ is an explicit injection (Theorem II.6.13, Proposition II.6.14) [48](../references.md#reference-48).
   - In the **unitary case** $(U(p, q), U(k))$ (Ch. III §§III.5–III.8, pp. 41–46)—the exact archimedean local model for `lsernau/grh-lean` [37](../references.md#reference-37)—pluriharmonic polynomials on $X = M(p, k; \mathbb{C}) \times M(q, k; \mathbb{C})$ are defined by the system (eq. (III.5.1), p. 41):
     $$(\Delta_{ij} f)(x, y) = \sum_{\nu = 1}^k \frac{\partial^2 f}{\partial x_{i\nu}\,\partial y_{j\nu}} = 0 \qquad (1 \le i \le p,\; 1 \le j \le q).$$
     Kashiwara and Vergne prove the separation-of-variables factorization $\mathbb{C}[X] = \mathbb{C}[x\,{}^t y]\,\mathfrak{H}$ (Lemma III.5.3 and Corollary III.5.4, p. 42), decompose $\mathfrak{H} = \bigoplus_{\lambda \in \Sigma} \mathfrak{H}(\lambda) \otimes V_{\lambda'}$ with $\tau(\lambda)$ irreducible for $\mathrm{GL}(p, \mathbb{C}) \times \mathrm{GL}(q, \mathbb{C})$ (Proposition III.5.6, p. 42), and write every joint highest-weight pluriharmonic polynomial explicitly as a product of minors (Proposition III.6.1, eq. (III.6.2), p. 44):
     $$f(x, y) = \Delta_1^{\alpha_1}(x)\cdots \Delta_i^{\alpha_i}(x)\,\tilde{\Delta}_1^{\beta_1}(y)\cdots \tilde{\Delta}_j^{\beta_j}(y) \qquad (0 \le i \le p,\; 0 \le j \le q,\; i + j \le k).$$
     Theorem III.6.3 (p. 44) gives the exact parameter set $\Sigma$ and injective highest-weight map $\lambda = (n_1, \dots, n_i, 0, \dots, 0, -m_1, \dots, -m_j) \mapsto \tau_1(0, \dots, 0, -m_1, \dots, -m_j) \otimes \tau_2(n_1, \dots, n_i, 0, \dots, 0)$, Theorem III.7.2 (p. 45) decomposes $L_k = \bigoplus_{\lambda \in \Sigma} (\dim V_\lambda)\,L_k(\lambda)$ into irreducible unitary highest-weight representations of $U(p, q)$ of highest weight $\tau(\lambda) \otimes \delta_k$, and §III.8.1 (p. 45) notes that all components belong to the holomorphic discrete series when $k \ge p + q$ [48](../references.md#reference-48). This explicit minor-product construction is directly visible in `lsernau/grh-lean`, where `Rows.carrierForm` uses the determinant-power polynomial $\prod_\tau \det(y_\tau^-)^{2m}$ and `DefiniteThetaLift.lean` identifies `jointHarmonic` with a Schur polynomial `schurCoeffPoly` [37](../references.md#reference-37).

### 1.4 Seesaw dual pairs

One more classical tool from Kudla's 1996 notes reappears prominently in `lsernau/grh-lean`: the **seesaw dual pair** ([46](../references.md#reference-46), Ch. IV.1, pp. 59–63). Suppose $(G, G')$ and $(H, H')$ are two reductive dual pairs inside the same symplectic group $\mathrm{Sp}(\mathbb{W})$ with $H \subseteq G$ and therefore $G' \subseteq H' = \mathrm{Cent}_{\mathrm{Sp}(\mathbb{W})}(H)$ [46](../references.md#reference-46), Ch. IV.1, p. 59. The inclusions reverse across the two sides (like a playground seesaw):

```text
G     H'
|  ×  |
H     G'
```

Typical examples come from orthogonal direct sums $V = V_1 \oplus V_2$, giving $(O(V) \supseteq O(V_1) \times O(V_2),\; \mathrm{Sp}(W) \times \mathrm{Sp}(W) \supseteq \mathrm{Sp}(W))$, or symplectic direct sums $W = W_1 \oplus W_2$ (Examples 1.1–1.2, pp. 59–60) [46](../references.md#reference-46). Because both dual pairs share the same ambient Weil representation $\omega_\psi$ on $\mathbb{W}$, restricting from the larger group on one side corresponds to taking a theta lift or period on the other side (Lemmas 1.3–1.4 and Proposition 1.5, pp. 61–63); in Ch. IV.2–IV.3 (pp. 66–74, Propositions 2.1, 2.3, and 3.1), Kudla combines seesaw identities with orbit filtrations of restricted degenerate principal series $I_n(s, \chi)|_{G_{n_1} \times G_{n_2}}$ and Jacquet module filtrations to prove supercuspidal first-occurrence uniqueness and irreducibility (Theorems III.6.1–III.6.2) [46](../references.md#reference-46). In `lsernau/grh-lean`, an iterated seesaw identity (`New.Data.seesaw_identity` in `grh/src/New/UpperBound/Seesaw/SeesawIdentity.lean`, §2.6 below) links the chain of lifts `D.lowerChain` along $Y_0 \to \cdots \to Y_m$ with the composite lift along definite spaces $X_0 \to \cdots \to X_m$ followed by restriction to $Y_m$ [37](../references.md#reference-37).

---

## Part 2: Exact Lean definitions in `lsernau/grh-lean`

All declarations below were read directly from `github.com/lsernau/grh-lean` at commit `72fead102f663d5c7a407964a13dc0cf9d977207` (`grh/`) [37](../references.md#reference-37). Throughout, $E$ is a CM field (`[Field E] [CMType E] [WeilData E]`), `Space E n s` is a pointed Hermitian space of rank `card n` with real signature vector `s : n → ℤˣ`, `G E s` is its adelic unitary group $G_\infty \times G_f$, `Gf E n` is its finite adelic unitary group, and `stdSpace E n` is the standard positive-definite Hermitian space $I_n$ (all signs $+1$) [37](../references.md#reference-37).

### 2.1 The polarization-free theta functional `New.Space.θ`, its $\Gamma$-invariance, and `New.Space.lift`

Unlike the classical Schrödinger-model definition $\phi \mapsto \sum_{x \in V(F)^n} \phi(x)$, `lsernau/grh-lean` builds the adelic Weil representation on a polarization-free Feichtinger/Segal Banach space `𝒮 V` of integrable functions against the vacuum `vacuumFn` (`grh/src/Lib/Weil/MixedModel/ThetaInvariance.lean`, lines 49–59) [37](../references.md#reference-37). The theta functional `New.Space.θ` is built in two steps in `grh/src/Lib/Weil/Construction/AdelicRepresentation.lean` (lines 808–821, 922–935, and 954–956) [37](../references.md#reference-37):

```lean
-- grh/src/Lib/Weil/Construction/AdelicRepresentation.lean, lines 808-821 & 922-931
def lineTheta (c : ℤˣ) (a : 𝔸 E) : ℂ :=
  (signedSpace E fun _ ↦ c).exists_isThetaFunctional.choose
    (heisenbergOp (fun () ↦ a) IsVacuum.vacElem)

lemma exists_isThetaFunctional_signedSpace :
    ∃ θ : Model (adelicHeisenberg E s) →L[ℂ] ℂ,
      (signedSpace E s).IsThetaFunctional θ ∧
      ∀ x : n → 𝔸 E, θ (heisenbergOp x IsVacuum.vacElem) = ∏ i : n, lineTheta (s i) (x i) := by

def rawTheta : 𝒮 V →L[ℂ] ℂ :=
  if h : ∃ g : G E s, ∀ γ ∈ V.ratVectors, G.adeleMatrix g *ᵥ γ ∈ (signedSpace E s).ratVectors then
    exists_isThetaFunctional_signedSpace.choose ∘L V.ω h.choose
  else
    V.exists_isThetaFunctional.choose

def θ : 𝒮 V →L[ℂ] ℂ := V.rawTheta ∘L V.ϱ 0
```

Read what this construction does in plain words:

- On each rank-$1$ standard line of sign $c = \pm 1$, `lineTheta` picks a bounded functional invariant under rational Heisenberg translations `ϱ γ` ($\gamma \in E$) normalized so that $|\theta(\varrho(x)\,\mathrm{vac})|^2$ has mean $1$ over $\mathbb{A}$ modulo $E$. `exists_isThetaFunctional_signedSpace` fixes the phase on the diagonal standard space `signedSpace E s` so that $\theta(\varrho(x)\,\mathrm{vac}) = \prod_{i} \mathrm{lineTheta}(s_i, x_i)$ [37](../references.md#reference-37).
- For an arbitrary pointed Hermitian space `V : Space E n s`, Landherr's theorem gives an element $g \in G(E, s)$ carrying $V$'s rational vectors into those of `signedSpace E s` (`exists_mapsTo_ratVectors` in `grh/src/Lib/Weil/Construction/CanonicalTheta.lean`, line 90). Transporting along `V.ω g` defines `rawTheta` (independent of $g$ by `theta_omega_eq_of_mapsTo_ratVectors`, `CanonicalTheta.lean`, line 108), and `V.θ := V.rawTheta ∘L V.ϱ 0` equals `V.rawTheta` while making `V.θ f = f 0` hold by definition under the `FunLike (𝒮 V) (n → 𝔸 E) ℂ` coercion `f x := V.rawTheta (V.ϱ x f)` (`AdelicRepresentation.lean`, lines 931–956, 1014) [37](../references.md#reference-37).
- On any Witt splitting $D$ of $V$ as $(l E^p \oplus k E^p) \perp \iota V_0$, Fourier inversion recovers the classical lattice-sum formula in `grh/src/Lib/Weil/MixedModel/ZeroTerm.lean` (lines 722–723): `hasSum_theta_slice` proves `HasSum (fun x : p → E ↦ V₀.θ (D.slice (toAdele ∘ x) f)) (V.θ f)`, where `D.slice x f = D.zeroTerm (V.ϱ (D.lAdelic *ᵥ x) f)` is the mixed-model slice [37](../references.md#reference-37).

**How $\Gamma$-invariance of `New.Space.θ` is proved** (`grh/src/Lib/Weil/MixedModel/ThetaInvariance.lean`, lines 505–630) [37](../references.md#reference-37):

```lean
-- grh/src/Lib/Weil/MixedModel/ThetaInvariance.lean, lines 535-553 & 612-629
lemma theta_omega_ratEmbed_of_splitting (γ : U V.J) [DecidableEq p]
    (D : V.Splitting (stdSpace E Empty) p) (f : 𝒮 V) :
    V.θ (V.ω (V.ratEmbed γ) f) = V.θ f := by
  ...

noncomputable def diagonalSplitting : (V.sum V.neg).Splitting (stdSpace E Empty) n where
  k := fromRows 1 1
  l := fromRows ((2⁻¹ : E) • V.J⁻¹) (-((2⁻¹ : E) • V.J⁻¹))
  i := 0
  ...

lemma theta_omega_ratEmbed (γ : U V.J) (f : 𝒮 V) : V.θ (V.ω (V.ratEmbed γ) f) = V.θ f := by
  ...
```

The proof uses two steps: first, on a completely split space $V = l E^p \oplus k E^p$ (`V₀ = stdSpace E Empty`), any rational $\gamma$ in the Siegel parabolic stabilizing $k$ ($\gamma k = k a$, $a \in \mathrm{GL}_p(E)$) acts on `D.zeroTerm` by $\chi_{\mathbb{A}}(\det a)^{-1} = \upsilon(\det a)^{-1}|\det a|^{\frac{1}{2}} = 1$ (since $\det a \in E^\times$ is rational, `zeroTerm_omega`, line 413), hence preserves every term of `hasSum_theta_slice` (`theta_omega_ratEmbed_of_mul_k`, line 505). Because the two opposite Siegel parabolics $D.\mathrm{siegelParabolic}$ and $D.\mathrm{symm}.\mathrm{siegelParabolic}$ generate $U(V.J)$, every rational $\gamma$ fixes $V.\theta$ on a split space (`theta_omega_ratEmbed_of_splitting`, line 535). Second, for a general (possibly definite or anisotropic) Hermitian space $V$, `theta_omega_ratEmbed` (line 612) **doubles** $V$ to the split space $W = V \oplus V^-$ using `V.diagonalSplitting` (line 550): $(\gamma, 1)$ fixes $W.\theta$, while `exists_theta_boxProd_eq_mul` (line 574) and `exists_theta_boxProd_ne_zero` (line 597) show that $f \mapsto W.\theta(f \boxtimes y)$ is a nonzero scalar multiple $c \cdot V.\theta(f)$; cancelling $c \neq 0$ yields $V.\theta(V.\omega(V.\mathrm{ratEmbed}\,\gamma) f) = V.\theta(f)$ [37](../references.md#reference-37).

The abstract adelic theta kernel is packaged in `grh/src/Lib/Adelic/AutomorphicForms/Basic.lean`, lines 84–96 [37](../references.md#reference-37):

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

### 2.2 Measure-free class integrals (`New.classIntegral`) and algebraic theta kernels (`New.Kernel.lift`, `New.thetaKernel`)

When both spaces are the standard definite spaces `stdSpace E n` and `stdSpace E n'` ($n < n'$), automorphic forms are encoded as **algebraic modular forms** `AlgForm n κ e`: smooth functions $\phi : G_f(E, n) \to (\mathrm{WeylIndex}\,n\,\kappa \to \mathbb{C})$ satisfying $\phi(\gamma g) = \rho(\gamma)\phi(g)$ for rational $\gamma \in U_n(E)$, with an open right stabilizer [37](../references.md#reference-37).

Instead of Haar measure, `lsernau/grh-lean` integrates over $\Gamma \backslash G_f$ by finite weighted double-coset sums in `grh/src/Lib/Adelic/Hecke/Basic.lean` (lines 80 and 132–133) and `grh/src/Lib/Adelic/Hecke/ClassSums.lean` (lines 59–63 and 74–87) [37](../references.md#reference-37):

```lean
-- grh/src/Lib/Adelic/Hecke/Basic.lean, lines 80 & 132-133
def classAut (g : G) : Subgroup G := Γ ⊓ K.comap (MulAut.conj g⁻¹).toMonoidHom

def classSum [Module ℚ W] (Γ K : Subgroup G) (f : G → W) : W :=
  ∑ᶠ c : DoubleCoset.Quotient (Γ : Set G) K, (Nat.card (classAut Γ K c.out) : ℚ)⁻¹ • f c.out
```

```lean
-- grh/src/Lib/Adelic/Hecke/ClassSums.lean, lines 59-63 & 74-87
def rightStabilizer (f : G → W) : Subgroup G where
  carrier := {k : G | ∀ g : G, f (g * k) = f g}
  ...

def classIntegral : W :=
  ((rightStabilizer f).relIndex K : ℚ)⁻¹ • classSum Γ (rightStabilizer f ⊓ K) f

class HasFiniteType : Prop where
  finite_classes : Finite (DoubleCoset.Quotient (Γ : Set G) K)
  finite_aut (g : G) : Finite (classAut Γ K g)
  isOpen : IsOpen (K : Set G)
  isCompact : IsCompact (K : Set G)
```

In plain mathematics, for a function $f : G \to W$ valued in any $\mathbb{Q}$-vector space $W$, let $\mathcal{D}(\Gamma, K)$ denote the set of double cosets of $G$ by $\Gamma$ on the left and $K$ on the right. Then `classSum Γ K f` is the finite weighted sum over $c \in \mathcal{D}(\Gamma, K)$ of $\frac{f(g_c)}{\#(\Gamma \cap g_c K g_c^{-1})}$, and `classIntegral Γ K f` refines the level to $K' = \mathrm{Stab}(f) \cap K$ and divides by the relative index $[K : K']$ so that $\mathrm{vol}(K) = 1$:

$$\mathrm{classIntegral}_{\Gamma, K}(f) = \frac{1}{[K : K']} \sum_{c \in \mathcal{D}(\Gamma, K')} \frac{f(g_c)}{\#(\Gamma \cap g_c K' g_c^{-1})}.$$

When $K \le \mathrm{Stab}(f)$, `classIntegral_eq_classSum` (`ClassSums.lean`, line 173) reduces it directly to `classSum Γ K f`; under `HasFiniteType Γ K`, double counting proves level-change invariance (`classSum_eq_relIndex_smul`, line 265; `classIntegral_eq_inv_smul_classSum`, line 363) as well as additivity and right-translation invariance on smooth left-$\Gamma$-invariant functions (`classIntegral_sum`, line 375) [37](../references.md#reference-37).

Using `classIntegral`, the algebraic theta kernel and definite lift are defined in `grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean`, lines 133–144, 189–194, 217–218, and 374–380 [37](../references.md#reference-37):

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

### 2.6 The iterated seesaw identity (`New.Data.seesaw_identity`)

The file `grh/src/New/UpperBound/Seesaw/SeesawIdentity.lean` (666 lines) links the indefinite lower chain `D.lowerChain` along $Y_0 \to \cdots \to Y_m$ with the definite upper chain `D.compositeLift` along $X_0 \to \cdots \to X_m$ restricted to $Y_m$ [37](../references.md#reference-37):

```lean
-- grh/src/New/UpperBound/Seesaw/SeesawIdentity.lean, lines 173-176 & 201-204
def transposedLiftY (ϑ : D.TameChar) (j : ℕ) : D.ConjFormY (j + 1) →ₗ[ℂ] D.ConjFormY j :=
  (stdLevelIndex (levelY ϑ j) : ℂ) • formLift (thetaKernelY ϑ j).swap
    (star (typeKernel (D.paramY (j + 1)) (D.signsY (j + 1))))
    (star (typeKernel (D.paramY j) (D.signsY j))) (datumY ϑ j)

lemma integral_mul_liftY (ϑ : D.TameChar) {j : ℕ} (hj : j < D.m) (z : D.ConjFormY (j + 1))
    (f : D.FormY j) :
    ∫ h : New.G D.E (D.signsY (j + 1)), z h * liftY ϑ j f h ∂(D.spaceY (j + 1)).quotMeasure =
      ∫ g : New.G D.E (D.signsY j), transposedLiftY ϑ j z g * f g ∂(D.spaceY j).quotMeasure := by
```

```lean
-- grh/src/New/UpperBound/Seesaw/SeesawIdentity.lean, lines 503-504, 540-544 & 624-628
def seesawDatum (ϑ : D.TameChar) : D.ChainTensor :=
  cutSum ϑ (2 * D.ϱ + 2) le_rfl (evaluatedTensor ϑ)

lemma exists_lowerChainUpTo_poincareAt_eq (t : (WeylIndex (D.X 0) D.columnCount → ℂ) →ₗ[ℂ] ℂ)
    (g : GInf D.E (D.signsY 0)) :
    ∃ c₀ : ℂ, ∀ (ϑ : D.TameChar) (φ : D.ramifiedSourceForms),
      lowerChainUpTo ϑ (2 * D.ϱ + 2) (D.poincareAt g t φ) =
        c₀ • restrictToFormY D.m_eq_two_mul_varrho_add_two (chainOfTensor ϑ φ (seesawDatum ϑ)) := by

theorem seesaw_identity {P : Parameters} {D : Data P}
    (t : (WeylIndex (D.X 0) D.columnCount → ℂ) →ₗ[ℂ] ℂ) (g : GInf D.E (D.signsY 0)) :
    ∃ c : ℂˣ, ∀ ϑ : D.Twist, ∃ Ψ : D.Translations →₀ ℂ, IsChainDatum ϑ Ψ ∧
      ∀ φ : D.ramifiedSourceForms,
        lowerChain ϑ (D.poincareAt g t φ) = (c : ℂ) • compositeLift ϑ Ψ φ := by
```

In plain words, the proof moves the Bessel period up the $m = 2\varrho + 2$ steps of `lowerChain` one lift at a time:

1. **Adjoint descent and unfolding.** Pairing `lowerChainUpTo ϑ (k + 1) (D.poincareAt g t φ)` against a conjugate form `z : D.ConjFormY (k + 1)` moves each step `liftY` onto `z` via its transpose `transposedLiftY` (`integral_mul_liftY`, line 201). At $k = 0$, `integral_mul_liftY_poincareAt` (line 358) unfolds the Poincaré series `D.poincareAt g t φ` into a finite sum over `cutPoints ϑ 0` (cosets of `levelY ϑ 0` in `D.chosenLevel`) of the first `unfoldedPeriod` (line 272).
2. **Induction over cut points.** `exists_integral_mul_lowerChainUpTo_eq_cutSum` (line 413) iterates this unfolding for $k = 0, \dots, 2\varrho + 1$, replacing each outer integral by a complex archimedean integral factor $c \in \mathbb{C}$ times the multiplicity-weighted finite sum `cutSum` over $\Omega_0 \times \cdots \times \Omega_k$.
3. **Top identification and admissible datum.** At the definite top space $Y_m$, `exists_integral_eq_mul_inner_restrictToFormY` (line 90) identifies the top Bessel integral with a constant multiple of the inner product against `restrictToFormY`, yielding `exists_lowerChainUpTo_poincareAt_eq` (line 540) with finite tensor `seesawDatum ϑ` (line 503), which is jointly level-invariant (`isInvariant_seesawDatum`, line 509). Finally, `exists_isAdmissibleCombination_seesawDatum` (line 592) expands `seesawDatum ϑ` as a finite linear combination of translated glued vacua `D.gluedVacuum x` whose denominators away from $\vartheta.\mathrm{normQ}$ divide $B^{2m}$ ($B = D.\mathrm{residueMatrixCount}$), and absorbing the scalar into the nonzero unit `c : ℂˣ` yields a chain datum `Ψ` satisfying `lowerChain ϑ (D.poincareAt g t φ) = (c : ℂ) • compositeLift ϑ Ψ φ` (`seesaw_identity`, lines 624–661) [37](../references.md#reference-37).

---

## Part 3: How the Lean construction compares with Howe, Kudla, and Kashiwara–Vergne

| Feature | Classical Howe–Kudla–Kashiwara–Vergne literature [44](../references.md#reference-44) [45](../references.md#reference-45) [46](../references.md#reference-46) [47](../references.md#reference-47) [48](../references.md#reference-48) | `lsernau/grh-lean` at `72fead10` [37](../references.md#reference-37) |
| --- | --- | --- |
| **Dual pair & metaplectic splitting** | Type I pairs $(O(V), \mathrm{Sp}(W))$ (Kudla [46](../references.md#reference-46) [47](../references.md#reference-47)) and unitary pairs $(U(V), U(W))$, whose restricted metaplectic covers always split (Kudla [46](../references.md#reference-46), Ch. II.1, II.4, p. 39; Howe [44](../references.md#reference-44), §5, eq. (5.2)(iii)) | Unitary dual pairs $(U(S), U(T))$ over a CM field $E$, acting on $\mathrm{Hom}(S, T)$ via $x \mapsto h x g^{-1}$ twisted by splitting characters $a(\det h)\,b(\det g)^{-1}$ (`pairWeil`, `pairThetaKer`) |
| **Theta distribution & $\Gamma$-invariance** | Schrödinger-model lattice sum $\theta(g, h; \phi) = \sum_{x \in V(F)^n} (\omega(g)\phi)(h^{-1}x)$ (Kudla [47](../references.md#reference-47), eq. (I.2.1)), $\Gamma$-invariant by Poisson summation | Polarization-free Feichtinger Banach space `𝒮 V`, `Space.θ` transported from `signedSpace E s` via Landherr's theorem (`AdelicRepresentation.lean`, `CanonicalTheta.lean`), slice sum recovered by Fourier inversion (`hasSum_theta_slice`), and $\Gamma$-invariance proved via opposite Siegel parabolics + doubling $V \oplus V^-$ (`theta_omega_ratEmbed`) |
| **Global lift formula** | $\theta(h; f, \phi) = \int_{G(F) \backslash G(\mathbb{A})} f(g)\,\theta(g, h; \phi)\,dg$ (Kudla [47](../references.md#reference-47), eq. (IV.1.17)), and $I(g; \phi)$ for $f = 1$ (eq. (I.2.2)) | `Space.lift K φ y h = ∫ g, K.θ (K.ω (g, h) φ) * y g ∂S.quotMeasure`; `Rows.carrierForm` is the $y = 1$ case |
| **Definite / compact simplification & harmonic polynomials** | Anisotropic convergence (Kudla [47](../references.md#reference-47), eq. (I.2.3)); harmonic polynomials $\mathcal{H}(L)$ and separation of variables (Howe [44](../references.md#reference-44), §§2–4; [45](../references.md#reference-45), Theorem 9); explicit unitary pluriharmonic minor-product highest-weight vectors for $(U(p, q), U(k))$ (Kashiwara–Vergne [48](../references.md#reference-48), Ch. III §§III.5–III.8) | `Kernel.lift` replaces the adelic integral by the measure-free finite `classIntegral` (`Basic.lean`, `ClassSums.lean`) on `AlgForm`, using the Schur jet matrix `schurJet κ (jetSeries _ c f)` (`thetaKernel`); `exists_lift_ofAlgForm_eq_smul` identifies it up to a scalar with `Space.lift` at `jointHarmonic`, and `Rows.carrierForm` uses the minor power $\prod_\tau \det(y_\tau^-)^{2m}$ |
| **Use of Howe duality** | Full bijection $\pi \leftrightarrow \theta(\pi)$ with multiplicity one (Howe [44](../references.md#reference-44), Theorems 1, 2.1, 6.1; Kudla [46](../references.md#reference-46), Ch. II.2) | Deliberately avoided where unnecessary: `Lib/Weil/Lift.lean` (lines 50–53) notes that global lifts carry discrete-series types to discrete-series types via explicit `IsHalfEdge` / `IsEdge` / `IsArrow` without proving full Howe duality, and `DefiniteThetaLift.lean` (lines 281–283) notes that `isThetaLift_thetaKernel` captures the consequence of Howe's $(\mathrm{GL}_{n'}, \mathrm{GL}_n)$-duality without stating its multiplicity formula |
| **Seesaw mechanism** | Nested dual pairs $(G \supseteq H, H' \supseteq G')$ sharing one ambient Weil representation (Kudla [46](../references.md#reference-46), Ch. IV.1–IV.3) | Iterated seesaw (`New.Data.seesaw_identity` in `SeesawIdentity.lean`) unfolds `D.lowerChain` on Poincaré series via `transposedLiftY` and `cutSum` into `c • compositeLift ϑ Ψ` (definite chains restricted from $X_m$ to $Y_m$) with controlled denominators away from $\vartheta.\mathrm{normQ}$ |

---

## Not checked

- **Roger Howe, *$\theta$-series and invariant theory*** (*Automorphic Forms, Representations and $L$-functions*, Proc. Sympos. Pure Math., Vol. 33, Part 1, AMS, 1979, pp. 275–285): not opened directly. The AMS website returned a Cloudflare anti-bot challenge (`403`, `cf-mitigated: challenge`), Peter Trapa's University of Utah Howe directory (`http://www.math.utah.edu/~ptrapa/math-library/howe/`) hosts only Howe's 1989 *JAMS* and *TAMS* papers, and no freely accessible sanctioned copy was found. Its citation details were verified from the bibliographies of Howe [44](../references.md#reference-44) (`[H2]`, p. 552), Kudla [46](../references.md#reference-46) (`[24]`, p. 107), and Kudla [47](../references.md#reference-47) (Ref. 13).
- **Stephen S. Kudla, *Seesaw dual reductive pairs*** (*Automorphic Forms of Several Variables*, Taniguchi Symposium Katata 1983, Progress in Mathematics Vol. 46, Birkhäuser, 1984, pp. 244–268): not opened directly (paywalled publisher volume; Kudla's University of Toronto research webpage `https://www.math.toronto.edu/~skudla/ssk.research.html` posts only his 1992 and later papers). The seesaw definition, examples, and local seesaw identities were verified directly from Kudla's own 1996 lecture notes, Ch. IV.1–IV.3 [46](../references.md#reference-46).
- **Benedict H. Gross, *Algebraic modular forms*** (*Israel Journal of Mathematics*, volume 113, 1999, pages 61–93, `doi:10.1007/BF02780173`): not opened directly (paywalled journal article; citation details confirmed in `grh/src/Lib/Adelic/Hecke/ClassSums.lean`, line 40, and `grh/src/New/UpperBound/Seesaw/SeesawIdentity.lean`, line 48 [37](../references.md#reference-37), and on Gross's Harvard homepage `https://people.math.harvard.edu/~gross/`, where `publications.html` item 64 lists the article without a PDF link and `eprints.html` does not include it; his former UCSD URL `https://mathweb.ucsd.edu/~bgross/` returns `404`, and Celebratio Mathematica has no open PDF for this article). The Lean definitions of `AlgForm` and `classIntegral` were verified directly in `grh/src/Lib/Weil/CompactLift/ThetaKernelDefs.lean` and `grh/src/Lib/Adelic/Hecke/ClassSums.lean` [37](../references.md#reference-37).
- **Unread sections of partially read primary sources:** Examples §4(c)–(e) (pp. 560–564: Kähler/Hodge theory, unitary group cohomology, and adjoint invariants) of Howe's 1989 *Transactions* paper [45](../references.md#reference-45), and unread pages of Kashiwara and Vergne [48](../references.md#reference-48) covering Chapter II §§II.1–II.5 (pp. 10–22), intermediate proof pages in §§II.6–II.7 (pp. 24–26, 28–30), Chapter III §§III.1–III.4 (pp. 32–34, 36–38), and the bibliography (p. 47). (Howe's 1989 *JAMS* paper [44](../references.md#reference-44) and both of Kudla's lecture notes [46](../references.md#reference-46) [47](../references.md#reference-47) have been read in full.)
- **Remaining Lean files in `lsernau/grh-lean@72fead10`:** we did not read the remaining ~775 Lean files in `grh/` or any of the 794 Lean files in `grh-compact/` [37](../references.md#reference-37).
