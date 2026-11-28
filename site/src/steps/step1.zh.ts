import { defineStep } from "./types";

// Source of the content: lsernau/grh-lean (commit 72fead10), grh/src/Main.lean and
// grh/src/New/Main.lean, plus docs/notes/03-grh-statements.md for `s ≠ 1`.
export const step1Zh = defineStep({
  number: 1,
  of: 4,
  title: "Lean 到底证明了什么",
  summary: prose`除了那些“平凡零点”之外，$\zeta$ 函数的所有零点，实部都等于 $\frac{1}{2}$。`,
  snippets: [
    {
      heading: "命题本身",
      intro:
        "这就是 Lean 眼里“黎曼猜想”的正式写法。它直接来自 Lean 的公共数学库 Mathlib，并非证明作者自己改写的版本。",
      source:
        "来自 Mathlib（Mathlib/NumberTheory/LSeries/RiemannZeta.lean），为方便阅读加入了换行。",
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
      heading: "主文件里给出的证明",
      intro:
        "Lean 写定理的固定顺序是：theorem、定理名、命题内容、证明过程。注意 Lean 里函数作用在参数上直接用空格隔开（写作 f x），所以左边是简短的收尾步骤，右边才是真正庞大的主证明。",
      source: "来自 lsernau/grh-lean（提交 72fead10）的 grh/src/Main.lean，为方便阅读加入了换行。",
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
      title: prose`给一个数学命题起名字`,
      meaning: prose`这一行只是把“黎曼猜想”这个命题定义出来。在 Lean 里，“:”读作“是 / 具有类型”，“:=”读作“定义为”，而 Prop 表示“一个非真即假的数学命题”。这里还没有开始证明。`,
    },
    {
      id: "forall",
      title: prose`对任意一个复数 $s$`,
      meaning: prose`符号 $\forall$ 表示“对任意”，$\mathbb{C}$ 是全体复数的集合。把复数想象成平面上的一个点：实部决定它的左右位置，虚部决定它的上下位置。逗号前面括号里的都是对 $s$ 的前提条件，逗号后面则是要推出的结论。`,
      mark: "plane",
      background: {
        route: "complex-numbers",
        label: "复数是怎么来的",
        note: "数学背景 · 一道三次方程的求根公式，怎么逼出了负数的平方根",
      },
    },
    {
      id: "zero",
      title: prose`条件一：$s$ 是 $\zeta$ 函数的零点`,
      meaning: prose`意思是 $\zeta$ 函数在 $s$ 处的取值等于 $0$。图中的实心点标出了一部分这样的零点；括号里的下划线表示这里只用到“它是零点”这个条件，不需要给这条前提单独起名字。每一个非平凡零点，都像一道波纹，精确控制着素数的分布规律。`,
      mark: "zeros",
      background: {
        route: "zeta",
        label: "zeta 函数的来历",
        note: "数学背景 · 从欧拉算出的级数出发，也可以直接在页首跳转到对称性与零点",
      },
    },
    {
      id: "trivial",
      title: prose`条件二：$s$ 不是平凡零点`,
      meaning: prose`符号 $\neg$ 表示“非”，$\exists$ 表示“存在”，$\mathbb{N}$ 是自然数 $0, 1, 2, \dots$——合起来读作“不存在自然数 $n$ 使得 $s = -2(n + 1)$”（写成 $n + 1$ 是为了跳过 $0$，因为 $\zeta(0) = -\frac{1}{2}$）。在 $-2, -4, -6, \dots$ 这些负偶数点上，$\zeta$ 之所以等于 $0$，纯粹是因为配套的伽马因子在这些位置趋于无穷，迫使 $\zeta$ 取值为 $0$，所以命题先把这些“平凡零点”排除在外。`,
      mark: "trivial",
      background: {
        route: "zeta",
        section: "trivial-zeros",
        label: "为什么负偶数都是平凡零点",
        note: "数学背景 · 伽马函数的极点怎么制造出这些零点、黎曼 1859 年的证明与名称由来",
      },
    },
    {
      id: "pole",
      title: prose`条件三：$s$ 不等于 $1$`,
      meaning: prose`$\zeta$ 函数在 $s = 1$ 处有一个极点：越靠近 $1$，函数值就趋于无穷大，因此这里本来没有有限的定义值。但 Lean 里的每个函数都必须对所有输入返回一个值，所以 Mathlib 给 $s = 1$ 按惯例补了一个占位值；加上这条条件，就是把这个例外点排除出去。`,
      mark: "pole",
      background: {
        route: "zeta",
        section: "convergence",
        label: "zeta 函数的来历",
        note: "数学背景 · 为什么它在 1 附近发散到无穷，又是怎么延拓到整个复平面的",
      },
    },
    {
      id: "line",
      title: prose`结论：$s$ 的实部等于 $\frac{1}{2}$`,
      meaning: prose`代码里的 s.re 就是 $s$ 的实部（数学里常写作 $\operatorname{Re}(s)$，表示点 $s$ 在复平面上的左右位置）。也就是说，$s$ 一定落在这条穿过 $\frac{1}{2}$ 的竖直线上——这就是大名鼎鼎的“临界线”。`,
      mark: "line",
    },
    {
      id: "name",
      title: prose`定理的名称`,
      meaning: prose`项目里其他文件就可以通过这个名字直接引用这条已经证完的定理。`,
    },
    {
      id: "statement",
      title: prose`要证明的命题`,
      meaning: prose`它直接指向前面定义的那个命题。因为这个定义在证明出现之前就早已写进了 Mathlib，所以证明作者无法偷偷改弱命题来降低难度。`,
    },
    {
      id: "mirror",
      title: prose`对称收尾：顺手把左半边也排掉`,
      meaning: prose`这只是经典的收尾一步（在 New/Main.lean 里只有短短 16 行），并不是证明最难的地方。只要手里已经有了“$\frac{1}{2}$ 右边没有零点”的结论，利用黎曼函数方程的 $s \mapsto 1 - s$ 对称性，就能顺势把 $\frac{1}{2}$ 左边也一起排除，将所有非平凡零点全部限定在 $\operatorname{Re}(s) = \frac{1}{2}$ 这条临界线上。`,
      mark: "line",
      background: {
        route: "zeta",
        section: "riemann-1859",
        label: "zeta 函数的来历",
        note: "数学背景 · 为什么这条对称性会把临界线两侧的零点两两配对",
      },
    },
    {
      id: "proof",
      title: prose`真正的主证明：$\frac{1}{2}$ 右边没有零点`,
      meaning: prose`整份 30 万行证明几乎全都在这里。这里的 “grh” 指的是广义黎曼猜想（Generalized Riemann Hypothesis，具体针对狄利克雷 $L$ 函数这一更大的函数族，我们会在第 2 步展开）：New.grh 证明了在 $\operatorname{Re}(s) > \frac{1}{2}$ 的区域里（除去 $s = 1$ 的极点），无论是 $\zeta$ 还是任意一个狄利克雷 $L$ 函数都绝不会等于 $0$。既然左半边靠对称性即可自动排除，证明右半边没有零点就是整个证明最核心的难关。`,
    },
  ],
  next: prose`第 2 步我们会打开 New.grh，认识狄利克雷 $L$ 函数。这份证明从头到尾都不是只针对 $\zeta$ 一个函数，而是对整个函数族统一证明右半平面无零点——$\zeta$ 只是其中最简单的特例。`,
});
