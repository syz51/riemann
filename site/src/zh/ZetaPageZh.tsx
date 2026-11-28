import { For } from "solid-js";
import { backgroundKicker, href } from "../pages";
import { Stepper, type Part } from "../Stepper";
import { SumProduct } from "../SumProduct";

// Source of the content: docs/notes/background-zeta.md.
const PAPADOPOULOS = "https://arxiv.org/abs/1710.03982";
const VIADER = "https://econ-papers.upf.edu/papers/776.pdf";
const CONRAD = "https://kconrad.math.uconn.edu/math3240s20/handouts/infinitudeofprimes.pdf";
const PRIME_SUM =
  "https://en.wikipedia.org/wiki/Divergence_of_the_sum_of_the_reciprocals_of_the_primes";
const MATHLIB_PIN =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean";
const MATHLIB_VALUES =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/HurwitzZetaValues.lean";
const MATHLIB_BERNOULLI =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/Bernoulli.lean#L209-L211";
const MATHLIB_GAMMA =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Gamma/Basic.lean#L11-L21";
const MATHLIB_CONJ =
  "https://github.com/leanprover-community/mathlib4/blob/90e6eec9fe53b02d431c90718e4a1d22d67a204e/Mathlib/NumberTheory/Harmonic/ZetaAsymp.lean#L454-L460";
const EULER_E352 = "https://scholarlycommons.pacific.edu/euler-works/352/";
const EULER_E19 = "https://scholarlycommons.pacific.edu/euler-works/19/";
const ELKIES = "https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf";
const RIEMANN_1859 = "https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Zeta/EZeta.pdf";
const RIEMANN_1859_DE = "https://de.wikisource.org/wiki/Index:RiemannPrim1859";
const LANDAU_1909_ANN =
  "https://gdz.sub.uni-goettingen.de/download/pdf/PPN235181684_0066/LOG_0047.pdf";
const LANDAU_1909_HANDBUCH = "https://archive.org/details/handbuchderlehre01landuoft";
const TITCHMARSH_1930 = "https://archive.org/details/zetafunctionofri032076mbp";
const MATHLIB_TRIVIAL =
  "https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L172-L180";
const MATHLIB_HURWITZ_TRIVIAL =
  "https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/NumberTheory/LSeries/HurwitzZetaEven.lean#L604-L621";
const SHORTGRH_URL = "https://math.mit.edu/~drew/shortgrh/";
const SCHOENFELD_URL = "https://github.com/AndrewVSutherland/schoenfeld-rh-lean/tree/0e52d7b1";

const SIEVE_ZH: Part[] = [
  {
    title: "从全体平方倒数和出发",
    equation: tex`x = 1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \frac{1}{5^2} + \frac{1}{6^2} + \cdots`,
    text: prose`先把这个无穷和记作 $x$。每个正整数 $n$ 贡献一项 $\frac{1}{n^2}$，也就是 $1, \frac{1}{4}, \frac{1}{9}, \frac{1}{16}, \dots$。这里以平方为例，对任意更大的指数步骤完全相同。`,
  },
  {
    title: "把每一项除以 2²",
    titleHtml: prose`把每一项除以 $2^2$`,
    equation: tex`\frac{x}{2^2} = \frac{1}{2^2} + \frac{1}{4^2} + \frac{1}{6^2} + \frac{1}{8^2} + \cdots`,
    text: prose`$n$ 对应的项 $\frac{1}{n^2}$ 除以 $2^2$ 后变成 $\frac{1}{(2n)^2}$，刚好是 $2n$ 对应的项。于是新级数里剩下的，正好是 $x$ 中所有偶数的项：$2, 4, 6, 8, \dots$。`,
  },
  {
    title: "相减：消去所有偶数",
    equation: tex`\left(1 - \frac{1}{2^2}\right) x = 1 + \frac{1}{3^2} + \frac{1}{5^2} + \frac{1}{7^2} + \frac{1}{9^2} + \cdots`,
    text: prose`用 $x$ 减去第 2 步的式子。左边是 $x - \frac{x}{2^2} = \left(1 - \frac{1}{2^2}\right)x$；右边把所有偶数项筛得干干净净，只留下奇数 $1, 3, 5, 7, 9, \dots$。`,
  },
  {
    title: "把剩下的和除以 3²",
    titleHtml: prose`把剩下的和除以 $3^2$`,
    equation: tex`\frac{1}{3^2} \left(1 - \frac{1}{2^2}\right) x = \frac{1}{3^2} + \frac{1}{9^2} + \frac{1}{15^2} + \frac{1}{21^2} + \cdots`,
    text: prose`同样地，把第 3 步剩下的每一项除以 $3^2$，原来的 $1, 3, 5, 7, \dots$ 就变成了 $3, 9, 15, 21, \dots$——恰好是目前还没被删掉的所有 $3$ 的倍数。`,
  },
  {
    title: "相减：消去 3 的倍数",
    equation: tex`\left(1 - \frac{1}{2^2}\right) \left(1 - \frac{1}{3^2}\right) x = 1 + \frac{1}{5^2} + \frac{1}{7^2} + \cdots`,
    text: prose`用第 3 步减去第 4 步。左边多乘出一个 $\left(1 - \frac{1}{3^2}\right)$；右边 $3, 9, 15, \dots$ 全部退场，剩下的数 $1, 5, 7, 11, 13, \dots$ 既不是 $2$ 的倍数，也不是 $3$ 的倍数——排在 $1$ 之后的第一个数，恰好是下一个素数 $5$！`,
  },
  {
    title: "对每个素数一路筛下去",
    equation: tex`\left(1 - \frac{1}{2^2}\right) \left(1 - \frac{1}{3^2}\right) \left(1 - \frac{1}{5^2}\right) \cdots \, x = 1`,
    text: prose`因为每个大于 $1$ 的整数都能被某个素数整除，所以除 $1$ 之外的每一项迟早都会被筛掉，右边最后只孤零零地剩下 $1$。把左边那串因子全除过去，$x$ 就化成了所有素数的无穷连乘——对全体整数的求和，奇迹般地变成了只与素数有关的乘积！`,
  },
];

const TIMELINE_ZH: { year: string; text: Markup }[] = [
  {
    year: "1650",
    text: prose`门戈利（Mengoli）在无穷级数专著中提出求 $1 + \frac{1}{4} + \frac{1}{9} + \cdots$ 精确值的问题。`,
  },
  {
    year: "1689",
    text: prose`雅各布·伯努利公开悬赏此题，使其名震欧洲（即“巴塞尔问题”）；他也同时考察了更高次幂的同类级数。`,
  },
  {
    year: "1735",
    text: prose`年仅 28 岁的欧拉给出震撼答案 $\frac{\pi^2}{6}$，并一举算出了所有偶数次幂的精确公式。`,
  },
  {
    year: "1737",
    text: prose`欧拉在《关于无穷级数的若干观察》中发现欧拉乘积公式，将级数与全体素数直接打通（论文于 1744 年刊印）。`,
  },
  {
    year: "1749",
    text: prose`欧拉发现了函数的对称关系，在整数点上加以证明，并大胆猜想它对所有数都成立（论文于 1768 年刊印）。`,
  },
  {
    year: "1859",
    text: prose`黎曼发表著名的 8 页论文：把 $s$ 拓展为复数，正式命名为 $\zeta(s)$，证明对称公式，并提出了黎曼猜想。`,
  },
  {
    year: "1896",
    text: prose`阿达马与瓦莱·普桑循着黎曼的蓝图，各自独立证明了素数定理，给出了小于 $x$ 的素数个数的渐近规律。`,
  },
];

export function ZetaPageZh() {
  return (
    <main class="article">
      <p class="kicker">{backgroundKicker("zeta", "zh")}</p>
      <h1>zeta 函数的来历</h1>
      <p class="summary">
        故事始于一道近百年没人算得出的无穷级数。欧拉解开了它，顺手把指数换成了任意数，结果意外撬开了一扇直通全体素数的大门。
      </p>

      <div class="article-layout">
        <aside class="article-rail">
          <nav class="page-toc" aria-label="本页目录">
            <p class="page-toc-label">本页目录</p>
            <ol>
              <li>
                <a href={href("zeta", "basel")}>巴塞尔问题与 zeta 定义</a>
              </li>
              <li>
                <a href={href("zeta", "convergence")} innerHTML={prose`$s = 1$ 处的那堵墙`} />
              </li>
              <li>
                <a href={href("zeta", "primes")}>通往素数的密道</a>
              </li>
              <li>
                <a href={href("zeta", "euler-1749")}>欧拉 1749 年的神秘线索</a>
              </li>
              <li>
                <a href={href("zeta", "riemann-1859")}>黎曼的跨墙与镜子（1859）</a>
              </li>
              <li>
                <a href={href("zeta", "trivial-zeros")}>为什么负偶数是平凡零点</a>
              </li>
              <li>
                <a href={href("zeta", "zeros-and-primes")}>零点如何操控素数分布</a>
              </li>
              <li>
                <a href={href("zeta", "timeline")}>历史时间线</a>
              </li>
            </ol>
            <p class="page-toc-back">
              <a href={href("step-1")}>← 回到第 1 步</a>
              <a href={href("gamma")}>继续深入：伽马函数 →</a>
            </p>
          </nav>
        </aside>

        <div class="article-content">
          <section id="basel">
            <h2>一道难倒了近百年的加法题</h2>
            <p
              innerHTML={prose`把所有正整数的平方倒数一路加下去，永不停止（$2^2$ 表示 $2 \times 2 = 4$）：`}
            />
            <p
              class="equation equation-one-line"
              innerHTML={tex`1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \cdots = 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots`}
            />
            <p
              class="equation equation-two-lines"
              innerHTML={tex`\begin{aligned} & 1 + \frac{1}{2^2} + \frac{1}{3^2} + \frac{1}{4^2} + \cdots \\ = \; & 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots \end{aligned}`}
            />
            <p>
              因为后面的项越变越小，这个和不会涨到无穷大，而是会稳稳逼近某个固定的数。欧拉之前人们就已经知道它有极限，却没人算得出它的精确值。沃利斯在
              1655 年算出了前三位；1689
              年雅各布·伯努利公开悬赏求解后，这道题红遍欧洲，莱布尼茨、斯特林、棣莫弗、哥德巴赫和伯努利家族的好几位数学家都曾向它发起冲锋。
            </p>
            <p
              innerHTML={prose`欧拉一开始先硬算出了小数点后六位：$1.644934$。由于级数收敛慢得像蜗牛，光算这几位就费了极大功夫。到了 1735 年，28 岁的欧拉终于发现了惊人的精确值：$\frac{\pi^2}{6}$（其中 $\pi = 3.14159\dots$ 是圆周率）。明明是一堆整数平方的倒数相加，怎么会冒出一个圆来？欧拉自己都在信里感叹，这个结果来得“完全出乎意料”。`}
            />
            <p>
              这一战让欧拉一夜之间名扬全欧。他的老师约翰·伯努利盛赞，自己已故兄长雅各布生前最炽热的夙愿终于圆满了。
            </p>

            <h3 id="powers">把平方换成任意指数</h3>
            <p innerHTML={prose`既然平方算出来了，不妨把分母上的 $2$ 换成任意一个数 $s$：`} />
            <p
              class="equation"
              innerHTML={tex`\zeta(s) = 1 + \frac{1}{2^s} + \frac{1}{3^s} + \frac{1}{4^s} + \frac{1}{5^s} + \cdots`}
            />
            <p
              innerHTML={prose`每挑一个 $s$，就对应一条无穷级数和一个结果；把每个输入 $s$ 对应到一个输出值的规则，就是函数。这就是大名鼎鼎的 zeta 函数，记作希腊字母 $\zeta$。上面那道巴塞尔问题，正好就是 $s = 2$ 的情形。`}
            />
            <p
              innerHTML={prose`雅各布·伯努利早在 1689 年就注意过这类级数；欧拉在 1735 年一举攻克了所有偶数次幂 $s = 2, 4, 6, \dots$，每一个答案都是某个有理分数乘以 $\pi^s$。至于奇数次幂 $3, 5, 7, \dots$，欧拉耗尽毕生心血也没能找到类似公式。顺带一提，欧拉当年并没有用 $\zeta$ 这个记号——它是一百多年后由黎曼正式命名的。`}
            />
            <p class="sources">
              参考来源：
              <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>，第 6
              节及其脚注 46。
            </p>
          </section>

          <section id="convergence">
            <h2>为什么无穷多个数相加也能算出有限值？</h2>
            <p
              innerHTML={prose`一旦让指数 $s$ 动起来，第一个问题立刻浮现：哪些 $s$ 能让这个无穷和加出一个有限的数？无穷多项相加并不一定会飙到无穷大。想象你走向两米外的一堵墙，每一步走完剩下路程的一半：先走 $1$ 米，再走 $\frac{1}{2}$ 米，再走 $\frac{1}{4}$ 米……你可以永远走下去，但永远跨不过两米这堵墙：`}
            />
            <p
              class="equation"
              innerHTML={tex`1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots \; \text{ 永远不会超过 } 2`}
            />
            <p
              innerHTML={prose`所以关键只在于：后面的项缩得够不够快？$s = 1$ 正好是分界线。只要 $s > 1$（比如 $s = 2$），各项缩得足够快，级数就会收敛到一个有限值；一旦降到 $s = 1$（调和级数 $1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots$），总和就会无休止地涨向无穷大——早在 14 世纪，奥雷姆（Oresme）就证明了这一点。正因如此，单靠原始级数来写，$\zeta(s)$ 只能在 $s > 1$ 的地盘上有定义。`}
            />
            <details class="aside-details">
              <summary>
                <span
                  innerHTML={prose`手动验算：为什么 $s = 2$ 卡在 $2$ 以下，而 $s = 1$ 会无限飙升？`}
                />
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`对 $s = 2$，把级数按 $1, 2, 4, 8, \dots$ 项分组。第一组只有 $1$；第二组 $\frac{1}{4} + \frac{1}{9}$ 里每一项都不超过 $\frac{1}{4}$，两项合起来不超过 $\frac{1}{2}$；第三组从 $\frac{1}{16}$ 到 $\frac{1}{49}$ 共四项，每项不超过 $\frac{1}{16}$，合起来不超过 $\frac{1}{4}$；下一组八项合起来不超过 $\frac{1}{8}$。每一组都比前面那场“半步走墙”的步子还小，所以总和绝对跨不过 $2$。`}
                />
                <p
                  innerHTML={prose`换成 $s = 1$（调和级数 $1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots$），用完全一样的分组却会得出截然相反的结论！留着开头的 $1 + \frac{1}{2}$ 不动：$\frac{1}{3} + \frac{1}{4}$ 每项都至少是 $\frac{1}{4}$，合起来至少是 $\frac{1}{2}$；接下来的四项 $\frac{1}{5}$ 到 $\frac{1}{8}$ 每项都至少是 $\frac{1}{8}$，合起来又至少是 $\frac{1}{2}$。每组至少贡献一个 $\frac{1}{2}$，而且分组永无止境，所以总和必然冲向无穷大。`}
                />
              </div>
            </details>
            <p class="sources">
              分组估算可直接手算验证。关于奥雷姆的证明见{" "}
              <a href={PRIME_SUM}>
                Wikipedia, Divergence of the sum of the reciprocals of the primes
              </a>
              。
            </p>
          </section>

          <section id="primes">
            <h2>通往素数的密道</h2>
            <p
              innerHTML={prose`素数是大于 $1$、只能被 $1$ 和自身整除的整数：$2, 3, 5, 7, 11, \dots$。所有大于 $1$ 的整数都是由素数相乘搭出来的，可素数自身的排布却显得杂乱无章。欧拉曾在 1747 年感叹，素数的序列“是一个人类心智永远无法参透的谜团”。`}
            />
            <p>
              可早在十年前的 1737 年，欧拉自己就已经敲开了一道通往素数世界的密门：这个对
              <strong>全体正整数</strong>求和的级数，竟然严丝合缝地等于一个只遍历
              <strong>全体素数</strong>的无穷乘积！
            </p>
            <Stepper parts={SIEVE_ZH} />
            <p
              innerHTML={prose`把上面的 $2^2, 3^2, 5^2$ 换成任意指数 $2^s, 3^s, 5^s$，每一步推导丝毫不变——因为 $\frac{1}{n^s}$ 除以 $2^s$ 依然正好是 $\frac{1}{(2n)^s}$。于是对任意 $s > 1$，我们得到了著名的欧拉乘积公式：`}
            />
            <p
              class="equation"
              innerHTML={tex`\zeta(s) = \frac{1}{1 - \dfrac{1}{2^s}} \times \frac{1}{1 - \dfrac{1}{3^s}} \times \frac{1}{1 - \dfrac{1}{5^s}} \times \frac{1}{1 - \dfrac{1}{7^s}} \times \cdots`}
            />
            <p
              innerHTML={prose`每一个素数贡献一个因子，一个不多、一个不少。注意上面的筛法要求级数本身先得是个有限数——如果 $x$ 根本不是有限值，你就不能随便把 $\frac{x}{2^2}$ 从 $x$ 里减掉。`}
            />
            <p
              innerHTML={prose`欧拉也大胆地把这套手法套在了发散的 $s = 1$（$1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots$）上，由此推断：哪怕只把素数的倒数加起来，$\frac{1}{2} + \frac{1}{3} + \frac{1}{5} + \frac{1}{7} + \frac{1}{11} + \cdots$ 依然会发散到无穷大！按现代严格标准，直接操作发散级数不算完备证明，但欧拉的直觉完全正确——梅滕斯（Mertens）在 1874 年给出了它的精确渐近形式。`}
            />
            <p
              innerHTML={prose`这比古希腊欧几里得证明的“素数有无穷多个”深刻得多。拿平方数一对比就明白了：平方数也有无穷多个，但它们的倒数和 $1 + \frac{1}{4} + \frac{1}{9} + \cdots$ 会收敛到有限值 $\frac{\pi^2}{6}$；而素数的倒数和 $\frac{1}{2} + \frac{1}{3} + \frac{1}{5} + \cdots$ 却发散到无穷！两个数列都永无止境，但素数比平方数稠密得多——欧几里得的结论分不出两者差别，欧拉的结论一眼就看穿了。`}
            />
            <h3 id="sum-product">亲眼看看：求和与素数连乘如何汇合</h3>
            <p
              innerHTML={prose`下面的交互图会一直算到你指定的上限 $N$：一条折线把 $1$ 到 $N$ 的所有整数项加起来，另一条折线只把不超过 $N$ 的素数因子乘起来。拖动 $N$，看看两条线如何奔向同一个目标。`}
            />
            <SumProduct />
            <p
              innerHTML={prose`你会发现，从 $N = 2$ 起，素数连乘始终跑在整数求和的前面！原因很直观：把不超过 $N$ 的素数因子展开相乘时，所有只由这些素数拼出来的合数（包括很多远远大于 $N$ 的数）已经提前被算进去了。如果选“调和级数（$\frac{1}{n}$）”，则根本没有天花板，两条线都会一边放慢脚步、一边永不停歇地往上爬。`}
            />
            <p class="sources">
              参考来源：
              <a href={VIADER}>Viader, Bibiloni and Paradís, On a series of Goldbach and Euler</a>
              ，第 1、7 节（1737 年论文、筛法步骤与梅滕斯结果）；
              <a href={PAPADOPOULOS}>Papadopoulos</a>，第 6 节（欧几里得与欧拉原话）；
              <a href={CONRAD}>Conrad, The infinitude of the primes</a>，第 3
              节（素数与平方数的对比）。第一篇文献以{" "}
              <span innerHTML={prose`$1 + \frac{1}{2} + \frac{1}{3} + \cdots$`} />{" "}
              演示筛法，本页以平方项改写，图中所有数值均在页面内实时算出。
            </p>
          </section>

          <section id="euler-1749">
            <h2>欧拉 1749 年撞见的神秘线索</h2>
            <p
              innerHTML={prose`这时欧拉已经搞定了所有偶数次幂 $s = 2, 4, 6, \dots$，也打通了通往素数的密道，可奇数次幂 $3, 5, 7, \dots$ 依然纹丝不动。为了在各次幂之间寻找规律，1749 年他把收敛的级数（$s > 1$）与发散的交错级数放在一起对比——竟然撞见了一条隐藏的镜面对称律，把每个数 $s$ 和 $1 - s$ 两两配成了一对！`}
            />
            <p
              innerHTML={prose`比如 $2$ 的搭档是 $1 - 2 = -1$，$3$ 的搭档是 $1 - 3 = -2$。每一对数都正好站在 $\frac{1}{2}$ 的左右两侧、距离相等——就像以 $\frac{1}{2}$ 为镜面照出来的镜像。`}
            />
            <p
              innerHTML={prose`这条对称律并不是说两个搭档处的函数值直接相等，而是说它们由一个只依赖 $s$ 的换算因子紧紧绑在一起：$1 - s$ 处的值，等于 $s$ 处的值乘以这个换算因子。拿 $2$ 和 $-1$ 这对搭档来试：$s = 2$ 处的值是 $\frac{\pi^2}{6}$（约 $1.645$），对应的换算因子是 $-\frac{1}{2\pi^2}$，两数一乘，$\pi^2$ 刚好消掉，直接得出 $-1$ 处的搭档值：$-\frac{1}{12}$！`}
            />
            <p
              innerHTML={prose`这个结果瞬间抛出了一个大谜团：在 $s = -1$ 处，原始级数写出来可是 $1 + 2 + 3 + \cdots$，明显一路狂飙到无穷大，按常规加法根本不可能等于 $-\frac{1}{12}$。欧拉当时绕道交错级数（比如 $1 - 2 + 3 - 4 + \cdots$），借幂级数极限赋予它们数值，在整数点上证明了他的对称律（处理 $n = 1$ 时还通过极限化解了 $\frac{0}{0}$ 型），并大胆猜想它对任意实数 $s$ 都成立。他在 $n = 0, \frac{1}{2}, \frac{3}{2}$ 上都验算通过，但也坦承自己拿不出一个覆盖所有情况的统一证明。`}
            />
            <details class="aside-details">
              <summary>
                <span>展开看细节：欧拉 1749 年是怎么一步步猜出这条对称律的？</span>
              </summary>
              <div class="aside-body">
                <p>
                  欧拉不是先证出公式再看结果，而是先在数字里发现了惊人的花纹，大胆猜出规律，再反复拿特例检验。下面顺着他原论文的思路走一遍：
                </p>
                <ol>
                  <li
                    innerHTML={prose`他挑出两族正负交错的级数：一族越加越大，$1 - 2^m + 3^m - 4^m + \cdots$；另一族越加越小，$1 - \frac{1}{2^n} + \frac{1}{3^n} - \frac{1}{4^n} + \cdots$。`}
                  />
                  <li
                    innerHTML={prose`越加越大的那族按常规没有和，欧拉自己也明说这一点。他用幂级数给它赋值：对较小的 $x$，$1 - 2x + 3x^2 - 4x^3 + \cdots$ 精确等于 $\frac{1}{(1 + x)^2}$；把 $x = 1$ 代进去得到 $\frac{1}{4}$，于是他就取 $\frac{1}{4}$ 作为 $1 - 2 + 3 - 4 + \cdots$ 的值，并说明这里的“和”需要“更广义的理解”。`}
                  />
                  <li
                    innerHTML={prose`偶数次幂的收敛和 $1 + \frac{1}{2^n} + \frac{1}{3^n} + \cdots$ 他早已算完（都是某个有理分数乘 $\pi^n$），交错版也随之得出。接着他惊讶地发现：奇数次幂 $m$ 的发散交错和里竟然藏着同一批有理分数，而正偶数次幂 $m$ 的发散交错和竟然全等于 $0$！`}
                  />
                  <li
                    innerHTML={prose`于是他把指数为 $m = n - 1$ 的发散交错和，除以指数为 $n$ 的收敛交错和。当 $n$ 为偶数时，那批复杂的有理分数竟然上下全约掉了！例如 $n = 2$ 时，用 $1 - 2 + 3 - \cdots$ 除以 $1 - \frac{1}{2^2} + \frac{1}{3^2} - \cdots$，结果干净得不可思议：$\frac{3}{\pi^2}$。而对大于 $1$ 的奇数 $n$，分子是 $0$，比值直接是 $0$。`}
                  />
                  <li
                    innerHTML={prose`把 $n = 2, 3, 4, 5, 6, \dots$ 的结果排成一排，他发现它们可以统一写成一条公式乘上一个系数 $N$，而 $N$ 依次取 $+1, 0, -1, 0, +1, \dots$——他一眼认出，这正是 $-\cos\!\left(\frac{n\pi}{2}\right)$！`}
                  />
                  <li
                    innerHTML={prose`随后他提笔写道：“我斗胆提出如下猜想”——这条公式对任意实数 $n$ 都成立。他自己都形容这个猜想颇为大胆。`}
                  />
                  <li
                    innerHTML={prose`接着他开始疯狂验算：$n = 1$ 和 $n = 0$ 成立；负整数也能由正整数推出；$n = \frac{1}{2}$ 时两边都是 $1$；甚至对 $n = \frac{3}{2}$，他把两边硬算到了小数点后好几位，结果居然严丝合缝！`}
                  />
                </ol>
                <p>
                  欧拉坦白说自己没有能一口气证完所有情形的方法——那个真正的统一证明，要等到 1859
                  年的黎曼。
                </p>
              </div>
            </details>
            <p class="sources">
              参考来源：
              <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>，第 6
              节；
              <a href={EULER_E352}>
                Euler, Remarks on a beautiful relation between direct as well as reciprocal power
                series（E352，Euler Archive）
              </a>
              ，Willis 与 Osler 英译本第 1 至 15 节（其中第 11 节处理{" "}
              <span innerHTML={prose`$n = 1$`} />
              ）；<a href={MATHLIB_PIN}>Mathlib 定理 riemannZeta_one_sub</a>（
              <span innerHTML={prose`$s = 2$`} /> 处的换算因子{" "}
              <span innerHTML={prose`$-\frac{1}{2\pi^2}$`} />
              ）；<a href={MATHLIB_VALUES}>Mathlib, HurwitzZetaValues.lean</a> 与{" "}
              <a href={MATHLIB_BERNOULLI}>定理 bernoulli_two</a>（
              <span innerHTML={prose`$2$ 与 $-1$`} /> 处的取值）。
            </p>
          </section>

          <section id="riemann-1859">
            <h2>百年之后：黎曼跨过那堵墙（1859）</h2>
            <p
              innerHTML={prose`欧拉之后整整一百多年，几乎没有人再在这个函数上往前迈出实质一步。数学家韦伊（André Weil）在数论史里写道，这个课题当时几乎已经死了，是黎曼亲手让它起死回生。摆在面前的有两大难题：第一，如何跨过 $s = 1$ 那堵墙，给整个区域里的函数赋予严格意义？第二，如何把欧拉的素数乘积，真正变成一把数素数的精密工具？`}
            />
            <p>
              1859
              年，黎曼当选柏林科学院通讯院士，提交了一篇只有八页纸的划时代报告——《论小于给定数值的素数个数》。报告直接从欧拉的素数乘积起笔，做出了三件改变数学史的大事：
            </p>
            <ul>
              <li
                innerHTML={prose`他把自变量 $s$ 放进复平面，并正式把这个函数命名为 $\zeta(s)$。`}
              />
              <li
                innerHTML={prose`他证明了 $\zeta(s)$ 可以唯一、光滑地解析延拓到除 $s = 1$ 之外的整个复平面，并对所有复数 $s$ 彻底证出了欧拉的 $s \leftrightarrow 1 - s$ 对称公式。这也一次性解开了欧拉留下的谜团：$-\frac{1}{12}$ 是这个延拓后的函数在 $s = -1$ 处的取值，而不是发散级数 $1 + 2 + 3 + \cdots$ 普通意义下的和。`}
              />
              <li
                innerHTML={prose`他发现函数等于 $0$ 的那些点（零点）精确掌控着素数的分布起伏，并猜想了所有非平凡零点的位置——这就是黎曼猜想。`}
              />
            </ul>
            <p
              innerHTML={prose`黎曼的证明还一并解释了为什么欧拉的原始换算因子看起来那么歪斜、还会跳过某些点。黎曼发现，只要给 $\zeta(s)$ 乘上一个由 $\Gamma$（伽马）函数搭出来的伴随因子，得到的“完备函数”在 $s$ 与 $1 - s$ 两处竟然严格相等，而且全平面只有两个坏点：$0$ 和 $1$（恰好互为镜像！）。把 $\Gamma$ 挪到等号一边后，$\Gamma(s)$ 就钻进了 $\zeta(s)$ 与 $\zeta(1 - s)$ 的换算因子里——因此这条原始换算式必须避开 $s = 1$（$\zeta$ 在此发散）以及 $s = 0, -1, -2, \dots$（$\Gamma$ 在此无定义；所以能从 $2$ 算出 $-1$，却不能倒着从 $-1$ 推回 $2$）。这些例外只是换算因子里的某个零件无定义，并不是对称性本身失效了。`}
            />
            <p
              innerHTML={prose`更奇妙的是，$\Gamma$ 函数压根不是为这道题发明的：欧拉早在 1729 年就创造了它，用来在正整数之间平滑填补阶乘 $1 \cdot 2 \cdot 3 \cdots n$ 的空档（现代记号往右挪了 $1$ 位，所以 $\Gamma(5) = 1 \cdot 2 \cdot 3 \cdot 4 = 24$，且在 $0, -1, -2, \dots$ 处无定义）。`}
            />
            <p>
              <a href={href("gamma")}>伽马函数</a>
              那一页详细讲了它的来历、极点的成因，以及黎曼如何借它的积分证出了{" "}
              <span innerHTML={prose`$\zeta(s)$`} /> 的对称性。
            </p>
            <p
              innerHTML={prose`黎曼的复数对称律也立刻说明了：为什么黎曼猜想偏偏盯着竖直线 $\operatorname{Re}(s) = \frac{1}{2}$？在临界带 $0 < \operatorname{Re}(s) < 1$ 里，$\zeta(s)$ 的零点总是以这条线为镜面两两成对出现：只要 $a + bi$ 是零点，在它正对面同等高度的 $(1 - a) + bi$ 也必然是零点。而黎曼猜想断定，除了负偶数那些平凡零点之外，每一个零点都刚好踩在镜面 $\operatorname{Re}(s) = \frac{1}{2}$ 上——自己就是自己的镜像！`}
            />
            <details class="aside-details">
              <summary>
                <span
                  innerHTML={prose`展开看几何：$s \mapsto 1 - s$ 怎么变成了关于 $\operatorname{Re}(s) = \frac{1}{2}$ 的左右镜像？`}
                />
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`对复数 $s = a + bi$ 来说，直接算 $1 - s = (1 - a) - bi$ 其实同时翻转了左右和上下——它是绕着点 $\frac{1}{2}$ 旋转 $180^\circ$（中心对称），还不只是关于竖线的左右镜面对称。`}
                />
                <p
                  innerHTML={prose`好在 $\zeta$ 的级数系数全是实数，所以它天生还满足第二条对称律（上下镜像）：把虚部变号会让函数值取共轭，因此只要 $a + bi$ 是零点，它的上下镜像 $a - bi$ 也一定是零点。把“绕 $\frac{1}{2}$ 中心对称”和“上下翻转”这两步合起来，正好把 $a + bi$ 送到了 $(1 - a) + bi$——高度 $b$ 完全不变，纯粹关于 $\operatorname{Re}(s) = \frac{1}{2}$ 左右对称！在 $0 < \operatorname{Re}(s) < 1$ 内，连接 $\zeta$ 与完备函数的 $\Gamma$ 因子处处不为 $0$，于是 $\zeta$ 的零点原原本本地继承了这种左右配对。`}
                />
              </div>
            </details>
            <p class="sources">
              参考来源：
              <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>，第 6
              节；
              <a href={RIEMANN_1859}>
                Riemann, On the Number of Prime Numbers less than a Given Quantity（1859，Wilkins
                英译本）
              </a>
              ，第 1 至 3 页；<a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>
              （收敛域、完备函数在 <span innerHTML={prose`$0$ 与 $1$`} /> 的极点及黎曼对称律）；
              <a href={MATHLIB_CONJ}>Mathlib 定理 riemannZeta_conj</a>（共轭对称律）；
              <a href={MATHLIB_PIN}>Mathlib 固定提交下的 RiemannZeta.lean</a>
              （零点镜像配对的四条引理与 riemannZeta_one_sub）；
              <a href={MATHLIB_GAMMA}>Mathlib, Gamma/Basic.lean 文件头</a>；以及{" "}
              <a href={EULER_E19}>Euler Archive 论文 E19 记录</a>（1729 年）。
            </p>
          </section>

          <section id="trivial-zeros">
            <h2>为什么负偶数都叫“平凡零点”？</h2>
            <p>
              <span
                innerHTML={prose`回头看黎曼猜想的正式表述，它一开头就特意把 $s = -2, -4, -6, \dots$ 排除了出去。有了上面刚介绍的完备函数 $\Lambda(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)\,\zeta(s)$（见`}
              />
              <a href={href("zeta", "riemann-1859")}>黎曼 1859 年的对称公式</a>
              <span
                innerHTML={prose`），只需要两行代数，就能看透为什么 $\zeta(s)$ 在这些点上非得等于 $0$ 不可。把 $\zeta(s)$ 单独解出来：`}
              />
            </p>
            <p
              class="equation"
              innerHTML={tex`\zeta(s) = \frac{\Lambda(s)}{\pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)}`}
            />
            <p>
              <span
                innerHTML={prose`现在代入 $s = -2, -4, -6, \dots$，此时 $\frac{s}{2}$ 正好落在 $-1, -2, -3, \dots$ 上。由对称律 $\Lambda(s) = \Lambda(1 - s)$，分子依次等于 $\Lambda(3), \Lambda(5), \Lambda(7), \dots$，全都是妥妥的有限非零数；可分母上的 $\Gamma\!\left(\frac{s}{2}\right)$ 在每个负整数处都飙升到了无穷大（见`}
              />
              <a href={href("gamma", "poles")}>伽马函数的极点</a>
              <span
                innerHTML={prose`）。有限数除以无穷大等于 $0$——于是为了保住整个乘积 $\Lambda(s)$ 不爆掉，$\zeta(s)$ 被迫在 $-2, -4, -6, \dots$ 处一律归零！`}
              />
            </p>
            <p
              innerHTML={prose`那 $s = 0$ 呢？$\frac{s}{2} = 0$ 时 $\Gamma$ 不也爆掉了吗？没错，但 $s = 0$ 恰好也是分子 $\Lambda(s)$ 的两个极点之一（$0$ 和 $1$）。分子分母两个无穷大旗鼓相当、互相抵消，留下的不是 $0$，而是有限非零值 $\zeta(0) = -\frac{1}{2}$。`}
            />
            <details class="aside-details">
              <summary>
                <span>展开看细节：黎曼 1859 年的原证法、余弦速算，以及 Lean 里的写法</span>
              </summary>
              <div class="aside-body">
                <p>
                  <strong>黎曼 1859 年的原证法：</strong>
                  <span
                    innerHTML={prose`就在把 $\zeta(s)$ 延拓到全复平面的那一段里，黎曼把积分 $\int_0^\infty \frac{x^{s - 1}}{e^x - 1}\,dx$ 掰成一条绕着 $(0, \infty)$ 的复围道（他写作 $\Pi(s - 1)$ 来表示 $\Gamma(s)$）：`}
                  />
                </p>
                <p
                  class="equation"
                  innerHTML={tex`\begin{aligned} &2\sin(\pi s)\,\Pi(s - 1)\,\zeta(s) \\ &= i \int_\infty^\infty \frac{(-x)^{s - 1}}{e^x - 1}\,dx \end{aligned}`}
                />
                <p>
                  <span
                    innerHTML={prose`他紧接着指出（1859 年柏林科学院月报第 672 页），这条公式立刻表明 $\zeta(s)$ 在除 $1$ 外处处单值有限，“并且当 $s$ 等于负偶数时取值为零”（德文原文：`}
                  />
                  <em>
                    <span
                      innerHTML={prose`“daſs sie verschwindet, wenn $s$ gleich einer negativen geraden Zahl ist”`}
                    />
                  </em>
                  <span
                    innerHTML={prose`）。其实更早的 1749 年，欧拉在尚未严格延拓 $\zeta(s)$ 之前，就已经算出正偶数 $m$ 对应的交错级数 $1 - 2^m + 3^m - 4^m + \cdots$ 等于 $0$。`}
                  />
                </p>
                <p>
                  <strong>余弦速算法：</strong>
                  <span innerHTML={prose`看直接联系 $\zeta(s)$ 与 $\zeta(1 - s)$ 的函数方程：`} />
                </p>
                <p
                  class="equation"
                  innerHTML={tex`\zeta(1 - s) = 2\,(2\pi)^{-s}\,\Gamma(s)\,\cos\!\left(\frac{\pi s}{2}\right)\,\zeta(s),`}
                />
                <p
                  innerHTML={prose`只要代入大于 $1$ 的奇数 $s = 3, 5, 7, \dots$，左边的 $1 - s$ 正好就是 $-2, -4, -6, \dots$；右边除了余弦外每个因子都是有限数，而 $\cos\!\left(\frac{3\pi}{2}\right) = \cos\!\left(\frac{5\pi}{2}\right) = \cdots = 0$，一秒钟就锁死 $\zeta(-2) = \zeta(-4) = \zeta(-6) = \cdots = 0$！（$s = 1$ 除外，因为 $\zeta(1)$ 发散。）`}
                />
                <p>
                  <strong>Lean 今天的证法：</strong>Mathlib 里的定理{" "}
                  <code>riemannZeta_neg_two_mul_nat_add_one</code>{" "}
                  <span
                    innerHTML={prose`直接用 $\frac{\Lambda(s)}{\pi^{-\frac{s}{2}}\Gamma\!\left(\frac{s}{2}\right)}$ 四行就证出了 $\zeta(-2(n + 1)) = 0$，再配合`}
                  />{" "}
                  <code>differentiableAt_hurwitzZetaEven</code>{" "}
                  <span
                    innerHTML={prose`证明 $\zeta$ 在这些点光滑可微，确认 $0$ 就是货真价实的解析极限。`}
                  />
                </p>
              </div>
            </details>
            <p
              innerHTML={prose`数学家把它们叫做“平凡零点”，并不是说它们没用，而是因为找到它们根本不需要任何关于素数的深刻洞见——它们纯粹是 $\Gamma$ 函数的极点机械“压”出来的副产品。真正暗藏素数分布玄机的，全都是被困在临界带 $0 \le \operatorname{Re}(s) \le 1$ 里的那些非平凡零点。`}
            />
            <p>
              <span
                innerHTML={prose`有意思的是，黎曼本人在 1859 年并没有用过“平凡”（trivial）这个词——他只是顺手记下了负偶数零点，并把 $\xi(t)$ 的零点称作“根”（德文 `}
              />
              <em>Wurzeln</em>
              <span
                innerHTML={prose`）。半个世纪后，朗道（Edmund Landau）在 1908–1909 年的论文与名著 `}
              />
              <em>Handbuch</em>
              <span innerHTML={prose` 中，针对狄利克雷 $L$ 函数使用了“平凡零点”（`} />
              <em>triviale Nullstellen</em>
              <span
                innerHTML={prose`），以此区分“$< 0$ 的平凡根”和“藏在 $0 < \operatorname{Re}(s) < 1$ 带状区域里的神秘根”；不过单论 $\zeta(s)$ 时，朗道乃至 1930 年的蒂奇马什（Titchmarsh）依然习惯直接区分 $-2, -4, -6, \dots$ 上的“实零点”与临界带内的“复零点”。`}
              />
            </p>
            <p class="sources">
              参考来源：
              <a href={RIEMANN_1859_DE}>
                Riemann, Ueber die Anzahl der Primzahlen unter einer gegebenen Grösse（1859
                柏林科学院月报第 672 页）
              </a>{" "}
              及 <a href={RIEMANN_1859}>Wilkins 英译本（第 2–3 页）</a>；
              <a href={LANDAU_1909_ANN}>
                Landau, Math. Ann. 66（1909，落款 1908 年 6 月），第 437、440 页
              </a>
              ；
              <a href={LANDAU_1909_HANDBUCH}>
                Landau, Handbuch der Lehre von der Verteilung der Primzahlen（1909），第 1 卷第
                70、128、130 节
              </a>
              ；
              <a href={TITCHMARSH_1930}>
                Titchmarsh, The Zeta-Function of Riemann（1930），第 2–3 页
              </a>
              ；<a href={MATHLIB_TRIVIAL}>Mathlib, riemannZeta_neg_two_mul_nat_add_one</a> 与{" "}
              <a href={MATHLIB_HURWITZ_TRIVIAL}>hurwitzZetaEven_neg_two_mul_nat_add_one</a>。
            </p>
          </section>

          <section id="zeros-and-primes">
            <h2>零点为什么能掌控素数的分布？</h2>
            <p>
              <a href={href("zeta", "primes")}>前面 1737 年的欧拉乘积公式</a>
              <span
                innerHTML={prose`虽然把 $\zeta(s)$ 和素数绑在了一起，但它最多只告诉我们“素数永远用不完”。在 1859 年论文的后半篇，黎曼给欧拉乘积取对数再做反演，把 $\zeta(s)$ 彻底改造成了一台精确计算“小于 $x$ 的素数有多少个”的神奇机器。`}
              />
            </p>
            <p
              innerHTML={prose`在黎曼的显式公式里，一条平滑曲线 $\operatorname{Li}(x)$ 负责勾勒素数个数的主趋势，而 $\zeta(s)$ 的每一个非平凡零点 $\rho = \beta + i\gamma$，都会在主趋势之上叠加一道由 $x^\rho$ 构成的波纹：`}
            />
            <p
              class="equation"
              innerHTML={tex`\begin{aligned} x^{\beta + i\gamma} &= x^{\beta} \cdot x^{i\gamma} \\ &= x^{\beta}\bigl(\cos(\gamma\log x) + i\sin(\gamma\log x)\bigr) \end{aligned}`}
            />
            <p
              innerHTML={prose`妙就妙在，零点的横纵坐标在这道波纹里各司其职、分工明明白白：纵坐标（虚部 $\gamma$）决定了波纹的频率——素数分布围绕平均值上下摆动得有多快；横坐标（实部 $\beta$）则决定了波纹的振幅——误差项会像 $x^{\beta}$ 那么大！`}
            />
            <p
              innerHTML={prose`现在把前面那面“镜子”拿回来：因为非平凡零点总是以 $\beta$ 和 $1 - \beta$ 成对出现，你永远不可能把所有零点都推到 $\frac{1}{2}$ 左边——只要把一个零点往左推一点，它的双胞胎镜像就会自动往右跑，那道镜像波纹的振幅立刻会超过 $x^{\frac{1}{2}} = \sqrt{x}$！因此，把所有非平凡零点全部钉死在 $\operatorname{Re}(s) = \frac{1}{2}$ 这条临界线上，就是自然界所能允许的最紧凑结果——每一道波纹的振幅都被死死压在 $\sqrt{x}$ 量级。`}
            />
            <details class="aside-details">
              <summary>
                <span>展开看公式：黎曼 1859 年的波纹公式与舍恩菲尔德显式素数界限</span>
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`黎曼用 $f(x) = F(x) + \frac{1}{2} F\!\left(x^{\frac{1}{2}}\right) + \frac{1}{3} F\!\left(x^{\frac{1}{3}}\right) + \cdots$ 表示小于 $x$ 的素数及素数幂的加权计数（其中 $F(x)$ 为素数计数）。对 $\frac{\log\zeta(s)}{s}$ 做积分反演，他得到了著名的显式公式（1859，英译本第 8–9 页）；求导之后，素数密度就化成了一条光滑曲线减去所有零点 $\frac{1}{2} \pm i\alpha$ 贡献的余弦波之和：`}
                />
                <p
                  class="equation"
                  innerHTML={tex`\frac{1}{\log x} - 2\sum_{\alpha} \frac{\cos(\alpha\log x)\,x^{-\frac{1}{2}}}{\log x}`}
                />
                <p
                  innerHTML={prose`黎曼指出，光滑主项 $\operatorname{Li}(x)$ 与真实素数个数的偏差“只有 $x^{\frac{1}{2}}$ 量级”，而那些周期振荡项恰恰解释了“素数密度在不同区间忽疏忽密的局部起伏”。`}
                />
                <p
                  innerHTML={prose`现代数论里最常用的是切比雪夫加权素数计数函数 $\psi(x)$。对任意正整数 $n$，它有一个超好记的等价写法：$\psi(n) = \log(\operatorname{lcm}(1, 2, \dots, n))$，也就是 $1$ 到 $n$ 的最小公倍数的自然对数。每当 $n$ 跨过一个素数 $p$（或素数幂 $p^k$），最小公倍数就乘上一个 $p$，它的对数就正好往上跳一格 $\log p$。给每个素数赋权 $\log p$ 恰好抵消了素数按 $\frac{1}{\log x}$ 变稀疏的速度，让 $\psi(x)$ 几乎贴着直线 $y = x$ 笔直往上走。`}
                />
                <p
                  innerHTML={prose`1976 年，洛厄尔·舍恩菲尔德（Lowell Schoenfeld）证明，黎曼猜想等价于一条完全显式的不等式——所谓“显式”，就是连常数都算得清清楚楚、随便代个具体数字就能直接用，不再是含糊的“当 $x$ 足够大时”：`}
                />
                <p
                  class="equation"
                  innerHTML={tex`\left|\psi(x) - x\right| < \frac{\sqrt{x}\log^2 x}{8\pi} \quad (x \ge 73.2).`}
                />
                <p
                  innerHTML={prose`感受一下这个精度有多惊人：代入 $x = 1{,}000{,}000$，右边算出来大约只有 $7{,}594$（四舍五入）——误差不到 $x$ 的 $0.8\%$！安德鲁·萨瑟兰（Andrew Sutherland）已经直接基于精简版证明，在 Lean 里把舍恩菲尔德等价定理和这条界限本身全都端到端机检通过了。`}
                />
              </div>
            </details>
            <p class="sources">
              参考来源：
              <a href={RIEMANN_1859}>
                Riemann, On the Number of Prime Numbers less than a Given Quantity（1859，Wilkins
                英译本）
              </a>
              ，第 4 至 9 页（PDF 第 5 至 10 页）；
              <a href={SHORTGRH_URL}>Sutherland, shortgrh 验证报告</a> 与{" "}
              <a href={SCHOENFELD_URL}>schoenfeld-rh-lean</a>（舍恩菲尔德 1976 年显式界限）。
            </p>
          </section>

          <section id="timeline">
            <h2>时间线一览</h2>
            <ol class="timeline">
              <For each={TIMELINE_ZH}>
                {(entry) => (
                  <li>
                    <span class="year">{entry.year}</span>
                    <span innerHTML={entry.text} />
                  </li>
                )}
              </For>
            </ol>
            <p class="sources">
              参考来源：
              <a href={PAPADOPOULOS}>Papadopoulos, Looking backward: from Euler to Riemann</a>，第 6
              节。1737 年与 1744 年条目另见 <a href={VIADER}>Viader, Bibiloni and Paradís</a>。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
