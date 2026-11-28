import { GammaChart } from "../GammaChart";
import { backgroundKicker, href } from "../pages";

// Source of the content: docs/notes/background-gamma.md.
const EULER_E19 = "https://scholarlycommons.pacific.edu/euler-works/19/";
const DAVIS_1959 = "https://people.math.osu.edu/gautam.42/S20/DavisGammaFunction.pdf";
const GRONAU_2003 = "https://doi.org/10.5485/TMCS.2003.0008";
const WALLIS_TABLE = "https://www.quadrivium.info/GGB/WallisTable.html";
const EULER_E352 = "https://scholarlycommons.pacific.edu/euler-works/352/";
const EULER_E421 = "https://scholarlycommons.pacific.edu/euler-works/421/";
const LEGENDRE_1810 = "https://www.digitale-sammlungen.de/en/view/bsb10500481?page=599";
const LEGENDRE = "https://archive.org/details/10053610bsb";
const RIEMANN_1859 = "https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Zeta/EZeta.pdf";
const MATHLIB_ROOT =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib";
const MATHLIB = `${MATHLIB_ROOT}/Analysis/SpecialFunctions`;
const MATHLIB_RH = `${MATHLIB_ROOT}/NumberTheory/LSeries/RiemannZeta.lean`;
const MATHLIB_ZETA_ONE_SUB = `${MATHLIB_RH}#L178-L180`;
const MATHLIB_HURWITZ_EVEN = `${MATHLIB_ROOT}/NumberTheory/LSeries/HurwitzZetaEven.lean#L760-L770`;
const MATHLIB_THETA = `${MATHLIB_ROOT}/NumberTheory/ModularForms/JacobiTheta/TwoVariable.lean#L465-L490`;
const MATHLIB_BASIC = `${MATHLIB}/Gamma/Basic.lean#L11-L21`;
const MATHLIB_HALF = `${MATHLIB}/Gaussian/GaussianIntegral.lean#L306-L307`;
const MATHLIB_ZERO = `${MATHLIB}/Gamma/Deriv.lean#L94-L95`;
const MATHLIB_DIFF = `${MATHLIB}/Gamma/Deriv.lean#L65`;
const MATHLIB_NE_ZERO = `${MATHLIB}/Gamma/Beta.lean#L427`;
const MATHLIB_REFLECTION = `${MATHLIB}/Gamma/Beta.lean#L374-L424`;
const MATHLIB_DOUBLING = `${MATHLIB}/Gamma/Beta.lean#L559-L590`;
const MATHLIB_DELIGNE = `${MATHLIB}/Gamma/Deligne.lean#L122-L181`;
const MATHLIB_SINE_PROD = `${MATHLIB}/Trigonometric/EulerSineProd.lean#L271-L293`;
const MATHLIB_UNIQUE = `${MATHLIB}/Gamma/BohrMollerup.lean#L305-L309`;

export function GammaPageZh() {
  return (
    <main class="article">
      <p class="kicker">{backgroundKicker("gamma", "zh")}</p>
      <h1>伽马函数</h1>
      <p
        class="summary"
        innerHTML={prose`$\zeta$ 函数的对称公式里藏着一个叫 $\Gamma$（伽马）的函数。它已有将近三百年历史，起源于一个听起来像脑筋急转弯的问题：$1, 2, 6, 24, 120$ 这串阶乘之间，空档里应该填什么数？`}
      />

      <div class="article-layout">
        <aside class="article-rail">
          <nav class="page-toc" aria-label="本页目录">
            <p class="page-toc-label">本页目录</p>
            <ol>
              <li>
                <a href={href("gamma", "list-with-gaps")}>填补阶乘之间的空档</a>
              </li>
              <li>
                <a href={href("gamma", "picture")}>交互函数图像</a>
              </li>
              <li>
                <a href={href("gamma", "poles")}>伽马函数的极点</a>
              </li>
              <li>
                <a href={href("gamma", "zeta-link")}>它如何搭起 zeta 的对称桥</a>
              </li>
            </ol>
            <p class="page-toc-back">
              <a href={href("zeta")}>← 回到 zeta 函数</a>
              <a href={href("step-1")}>← 回到第 1 步</a>
            </p>
          </nav>
        </aside>

        <div class="article-content">
          <section id="list-with-gaps">
            <h2>一串留着空档的数</h2>
            <p
              innerHTML={prose`把从 $1$ 到 $n$ 的正整数连乘起来，当 $n = 1, 2, 3, 4, 5$ 时，得到 $1, 2, 6, 24, 120$——这就是 $n$ 的阶乘（$n!$）。这个数列在每个正整数上都有值，可如果我问你：$n = \frac{1}{2}$ 的阶乘该是多少？“把从 $1$ 到 $\frac{1}{2}$ 的整数乘起来”根本说不通，想要给它下定义，就必须换一种新思路。`}
            />
            <p
              innerHTML={prose`1729 年，欧拉在一篇论文里给出了答案。他在开篇第一句话就交代了缘起：他是受到“著名学者哥德巴赫向科学院提交的级数成果的启发”，想寻找“一个能给出该数列所有项的通用表达式”。结果，欧拉构造出了一个无穷乘积——在正整数上它精确给出阶乘，在整数之间的分数点上也能算出确切数值。`}
            />
            <p
              innerHTML={prose`接着，他把 $n = \frac{1}{2}$ 代了进去，惊讶地发现结果“等于直径为 $1$ 的圆面积的平方根”！直径为 $1$ 的圆面积是 $\frac{\pi}{4}$，开平方就是 $\frac{\sqrt{\pi}}{2}$，约等于 $0.8862$。$\pi$ 是圆周率，而原问题明明只是正整数连乘，谁也没想到半个阶乘里竟然藏着一个圆。`}
            />
            <details class="aside-details">
              <summary>
                <span
                  innerHTML={prose`展开看推导：欧拉 1729 年是怎么算出它，又怎么冒出 $\pi$ 的？`}
                />
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`在 1729 年 10 月 13 日写给哥德巴赫的信与论文 E19（第 1 节）里，欧拉虽然略去了草稿细节，但背后的核心直觉非常漂亮：走到很远处时，阶乘数列的行为越来越像一个等比数列。记第 $x$ 项为 $f(x)$，并写 $N! = 1 \cdot 2 \cdots N$：`}
                />
                <ol>
                  <li
                    innerHTML={prose`当 $N$ 极大时，相邻阶乘的比值 $N + 1, N + 2, N + 3$ 几乎相等。对公比固定为 $N + 1$ 的等比数列，往前跨出小数步长 $n$ 就是乘以 $(N + 1)^n$，因此 $f(N + n) \approx N!\,(N + 1)^n$。`}
                  />
                  <li
                    innerHTML={prose`另一方面，严格按阶乘递推公式从 $n$ 往上走 $N$ 步，会依次乘上 $(n + 1)(n + 2)\cdots(n + N)$，精准到达 $f(N + n)$。`}
                  />
                  <li
                    innerHTML={prose`令两式相等，就得到了欧拉给哥德巴赫信中的有限近似；再利用 $(N + 1)^n = \prod_{k = 1}^{N} \left(\frac{k + 1}{k}\right)^n$ 叠缩，便得到欧拉的无穷乘积：`}
                  />
                </ol>
                <div
                  class="equation"
                  innerHTML={tex`\begin{aligned} n! &= \lim_{N \to \infty} \frac{1 \cdot 2 \cdots N}{(1 + n)\cdots(N + n)}(N + 1)^n \\ &= \prod_{k = 1}^{\infty} \frac{k^{1 - n}(k + 1)^n}{k + n} \end{aligned}`}
                />
                <p
                  innerHTML={prose`顺带一提，丹尼尔·伯努利早在一周前（1729 年 10 月 6 日）也独立给哥德巴赫寄去了非常相似的乘积式。把 $n = \frac{1}{2}$ 代入欧拉的无穷乘积，得到的是 $\frac{2 \cdot 4}{3 \cdot 3} \cdot \frac{4 \cdot 6}{5 \cdot 5} \cdot \frac{6 \cdot 8}{7 \cdot 7} \cdots$ 的平方根。而早在 73 年前的 1656 年，沃利斯（John Wallis）就曾通过插值一张类似帕斯卡三角形的面积表，证明了这个无穷乘积正好等于 $\frac{\pi}{4}$（直径为 $1$ 的圆面积）。`}
                />
                <p
                  innerHTML={prose`在 $n = \frac{1}{2}$ 处撞见圆面积后，欧拉断定普通的代数式或指数式根本写不出 $n!$，于是转而去积分里找答案（E19 第 3–15 节）：`}
                />
                <ol>
                  <li>
                    <p
                      innerHTML={prose`把 $(1 - x)^n$（$n$ 为正整数）二项展开，乘上 $x^e$（$e > 0$）后在 $[0, 1]$ 上逐项积分，得到：`}
                    />
                    <div
                      class="equation"
                      innerHTML={tex`\begin{aligned} &\int_0^1 x^e(1 - x)^n\,dx \\ &= \frac{1 \cdot 2 \cdots n}{(e + 1)(e + 2)\cdots(e + n + 1)} \end{aligned}`}
                    />
                  </li>
                  <li
                    innerHTML={prose`令 $e = \frac{f}{g}$，提取因子 $g$ 并把 $f + (n + 1)g$ 移到积分一侧，分母只剩下 $(f + g)(f + 2g)\cdots(f + ng)$。再令 $f = 1$ 且 $g \to 0$，分母整体趋于 $1$，右边就只剩干干净净的 $1 \cdot 2 \cdots n$。`}
                  />
                  <li
                    innerHTML={prose`做换元 $x \mapsto x^{\frac{g}{f + g}}$，被积函数变成 $\frac{1 - x^z}{z}$ 的幂（其中 $z = \frac{g}{f + g} \to 0$），其极限恰好是 $-\ln x$，于是得到欧拉的对数积分 $\int_0^1 (-\ln x)^n\,dx$。（对 $n = 3$，欧拉亲自验算了原函数 $-x(\ln x)^3 + 3x(\ln x)^2 - 6x\ln x + 6x$：在 $x \to 0^+$ 时趋于 $0$，在 $x = 1$ 时正好给出 $6$。）`}
                  />
                </ol>
                <p
                  innerHTML={prose`最后令 $x = e^{-t}$，把区间 $(0, 1)$ 展开成 $(0, \infty)$，积分 $\int_0^1 (-\ln x)^{s - 1}\,dx$ 就原封不动地变成了如今 Mathlib 里的指数积分 $\int_0^\infty e^{-t} t^{s - 1}\,dt$。`}
                />
              </div>
            </details>
            <p
              innerHTML={prose`在今天的 Lean 证明里，证明作者并没有自己重写 $\Gamma$、$\zeta$ 或黎曼猜想的定义——三者全部直接取自社区数学库 Mathlib。在实部大于 $0$（即 $\operatorname{Re}(s) > 0$）的右半平面上，Mathlib 直接用欧拉积分定义 $\Gamma(s)$：`}
            />
            <div class="equation" innerHTML={tex`\Gamma(s) = \int_0^\infty e^{-t} t^{s - 1}\,dt`} />
            <p
              innerHTML={prose`符号 $\int$ 表示积分，也就是曲线下方的面积。读完本页不需要你自己去算积分，抓住最关键的一点就行：$s$ 现在跑到了幂指数的位置上，而指数完全不必是整数。另外，因为指数写成 $s - 1$，它的取值比阶乘整体错开了 $1$ 位——几乎每个初学者都会被这个错位吓一跳：$\Gamma(5)$ 不是 $120$，而是 $24$，也就是 $4!$。`}
            />
            <details class="aside-details">
              <summary>
                <span innerHTML={prose`为什么叫 $\Gamma$，又为什么偏偏错开 $1$ 位？`} />
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`欧拉本人并没有用字母 $\Gamma$，这个符号是勒让德（Legendre）定下来的。1809 年 11 月向法兰西学院宣读、1810 年 8 月刊印的论文里，勒让德指着积分 $\int_0^1 \bigl(\ln\frac{1}{x}\bigr)^{a - 1}\,dx$ 写道：“nous la désignerons par $\Gamma(a)$”（我们将用 $\Gamma(a)$ 来表示它）。在 1811 年的专著里，他把欧拉研究过的两类积分统称为“欧拉积分”，并再次沿用了 $\Gamma(a)$ 这一记号。`}
                />
                <p
                  innerHTML={prose`把欧拉 1729 年积分里的 $n$ 换成 $a - 1$，就使得 $\Gamma(a)$ 对应原来数列的第 $a - 1$ 项，即 $\Gamma(n + 1) = n!$。其实欧拉自己在 1768 年的微积分教材里就已经先用了这个平移，勒让德为它冠上 $\Gamma$ 符号后，这一写法便成了全世界的标准惯例。`}
                />
              </div>
            </details>
            <p
              innerHTML={prose`到了 $\operatorname{Re}(s) \le 0$ 的区域，上面的积分不再收敛，Mathlib 便把递推关系 $\Gamma(s + 1) = s \cdot \Gamma(s)$ 倒过来用，每次往左退 $1$ 步来延拓定义。合在一起，Mathlib 证明了以下几条核心性质：`}
            />
            <ul>
              <li innerHTML={prose`$\Gamma(1) = 1$。`} />
              <li
                innerHTML={prose`只要两边都有定义，就满足 $\Gamma(s + 1) = s \cdot \Gamma(s)$：往右跨一步，函数值乘以 $s$。`}
              />
              <li innerHTML={prose`对任意正整数 $n$，$\Gamma(n + 1) = n!$。这由前两条直接推出。`} />
              <li innerHTML={prose`$\Gamma\!\left(\frac{1}{2}\right) = \sqrt{\pi}$。`} />
            </ul>
            <p
              innerHTML={prose`顺手核对一下欧拉当年的结果：用第二条性质，$\Gamma\!\left(\frac{3}{2}\right) = \frac{1}{2} \cdot \Gamma\!\left(\frac{1}{2}\right) = \frac{\sqrt{\pi}}{2}$。而 $\Gamma\!\left(\frac{3}{2}\right)$ 正是欧拉数列里下标为 $\frac{1}{2}$ 的那一项，与欧拉 1729 年算出的完全一致。`}
            />
            <details class="aside-details">
              <summary>
                <span innerHTML={prose`穿过所有阶乘点的光滑曲线，只有 $\Gamma$ 这一条吗？`} />
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`不是！能穿过 $1, 1, 2, 6, 24$ 的光滑曲线有无数条，甚至有不少曲线也严格满足 $f(x + 1) = x \cdot f(x)$，只是在整数之间偏离了 $\Gamma$。Mathlib 里证明了玻尔–莫勒鲁普定理（Bohr–Mollerup theorem），它补上了唯一缺的那块拼图：只要函数 $f$ 在 $(0, \infty)$ 上恒正、满足 $f(1) = 1$ 与 $f(x + 1) = x \cdot f(x)$，而且 $\ln f$ 是凸函数（图像绝不向下弯），那 $f$ 就必然是 $\Gamma$ 本身。Mathlib 后面正是靠这条唯一性定理证明了勒让德倍元公式。`}
                />
              </div>
            </details>
            <p class="sources">
              参考来源：
              <a href={EULER_E19}>Euler, On transcendental progressions（E19，Euler Archive）</a>
              ，Langton 英译本第 1 至 17 节（及 1729 年档案记录）；
              <a href={GRONAU_2003}>Gronau (2003)</a>，第 45–47 页与第 51–52 页（伯努利与欧拉 1729
              年书信及欧拉 1768 年平移）；<a href={DAVIS_1959}>Davis (1959)</a>，第 852–853 页；
              <a href={WALLIS_TABLE}>Addington 与 Dennis 对沃利斯 1656 年数表的解读</a>（及 Stedall
              载于 Grattan-Guinness 编 Elsevier 2005，第 25–31 页）；
              <a href={LEGENDRE_1810}>Legendre, Mémoires de l'Institut (1809/1810)</a>，第 477 页第
              53 节，及 <a href={LEGENDRE}>Exercices de calcul intégral (1811)</a>，第 221
              页（查阅原版扫描件）；<a href={MATHLIB_BASIC}>Mathlib, Gamma/Basic.lean</a>（文件头、
              Gamma_one、Gamma_add_one、Gamma_nat_eq_factorial）；
              <a href={MATHLIB_RH}>Mathlib, RiemannZeta.lean</a>；
              <a href={MATHLIB_HALF}>Mathlib 定理 Gamma_one_half_eq</a>；以及{" "}
              <a href={MATHLIB_UNIQUE}>Mathlib 定理 eq_Gamma_of_log_convex</a>（对这些 Mathlib
              定理我们核对了陈述，未展开内部证明）。三步乘积重构、0.8862
              数值校验、其他满足递推关系曲线的说明，以及 <span innerHTML={prose`$n = 3$`} /> 与{" "}
              <span innerHTML={prose`$x = e^{-t}$`} /> 换元的 Lean
              验算（lean/RiemannChecks/EulerGamma.lean）为本站自行补充。
            </p>
          </section>

          <section id="picture">
            <h2>直观图像</h2>
            <p
              innerHTML={prose`下图画出了实数轴上的 $\Gamma(x)$。拖动滑块，或直接在图上点击拖拽试试看。下方表格实时验证第二条核心性质：只要 $\Gamma(x)$ 有定义，$x \cdot \Gamma(x)$ 就永远精准等于 $\Gamma(x + 1)$。`}
            />
            <GammaChart />
            <p
              innerHTML={prose`在 $0$ 的右边，曲线光滑流畅且始终位于横轴上方，依次穿过阶乘点 $1, 1, 2, 6, 24$；而在 $0$ 的左边，曲线被竖直虚线劈成一段段 U 形分支，每跨过一个负整数就上下翻转一次符号。`}
            />
            <p class="sources">
              图中函数值由页面内标准近似算法实时算出并在表格中四舍五入，单元测试已将其与上述递推性质核对。
            </p>
          </section>

          <section id="poles">
            <h2 innerHTML={prose`$\Gamma$ 在哪些点没有定义`} />
            <p
              innerHTML={prose`在 $0, -1, -2, -3, \dots$ 这些非正整数点上，$\Gamma$ 没有定义。Mathlib 的注释写得很坦白：在这些点上“函数本来无定义，我们按惯例把返回值设为 $0$”。那个 $0$ 只是形式化数学库为了保证每个函数处处有输出而填进去的占位值，并不是 $\Gamma$ 真正的函数值。`}
            />
            <p
              innerHTML={prose`在 $0$ 附近，Mathlib 证明了 $s \cdot \Gamma(s)$ 趋近于 $1$，也就是说 $\Gamma(s)$ 长得几乎就像 $\frac{1}{s}$：从右边逼近 $0$ 时趋于 $+\infty$，从左边逼近 $0$ 时趋于 $-\infty$（你可以在上图试试 $x = 0.05$ 和 $-0.05$，数值分别是约 $19.47$ 和 $-20.63$）。任何有限的数都填不进 $0$ 处的断口。`}
            />
            <p
              innerHTML={prose`但在除此以外的所有点上——包括像 $-\frac{1}{2}$ 这样的负分数——$\Gamma$ 都有光滑有限的取值，而且永远不等于 $0$。`}
            />
            <details class="aside-details">
              <summary>
                <span
                  innerHTML={prose`展开看原因：为什么 $0, -1, -2, \dots$ 处全部无定义，负分数却完全没问题？`}
                />
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`一切都源于把递推公式 $\Gamma(s + 1) = s \cdot \Gamma(s)$ 倒写成 $\Gamma(s) = \frac{\Gamma(s + 1)}{s}$ 一步步往左推：`}
                />
                <ol>
                  <li>
                    <strong innerHTML={prose`为什么 $0$ 处行不通：`} />
                    <span
                      innerHTML={prose`把 $s = 0$ 代入 $\Gamma(s + 1) = s \cdot \Gamma(s)$，会逼出 $\Gamma(1) = 0 \cdot \Gamma(0)$，也就是 $1 = 0 \cdot \Gamma(0)$——没有任何有限数能满足它。`}
                    />
                  </li>
                  <li>
                    <strong innerHTML={prose`$-1, -2, -3, \dots$ 上的多米诺骨牌：`} />
                    <span
                      innerHTML={prose`当 $s$ 靠近 $-1$ 时，$s + 1$ 就靠近 $0$，于是 $\Gamma(s) = \frac{\Gamma(s + 1)}{s}$ 直接把 $0$ 处的无穷大复制到了 $-1$ 处，同时除以 $s \approx -1$ 使正负号翻转一次（这就是曲线在相邻区间一正一负的原因）。同理，$s$ 靠近 $-2$ 时，$s + 1$ 靠近 $-1$，除以 $s \approx -2$ 又把无穷大传给 $-2$ 并再翻一次号——多米诺骨牌就这样一路倒向所有负整数。`}
                    />
                  </li>
                  <li>
                    <p>
                      <strong>为什么负分数完全没问题：</strong>
                      <span
                        innerHTML={prose`往左退到 $s = -\frac{1}{2}$ 时，右边用到的是完好无损的 $\Gamma\!\left(\frac{1}{2}\right) = \sqrt{\pi}$，完全不会碰到除以 $0$：`}
                      />
                    </p>
                    <div
                      class="equation"
                      innerHTML={tex`\Gamma\!\left(-\frac{1}{2}\right) = \frac{\Gamma\!\left(\dfrac{1}{2}\right)}{-\dfrac{1}{2}} = -2\sqrt{\pi} \approx -3.54`}
                    />
                    <p
                      innerHTML={prose`只要起点不是 $0, -1, -2, \dots$，任意左半平面的点每次往右跳 $1$ 格，迟早都会稳稳落进积分收敛的右半平面 $\operatorname{Re}(s) > 0$；只有非正整数会在半路迎头撞上 $0$。`}
                    />
                  </li>
                </ol>
              </div>
            </details>
            <p class="sources">
              参考来源：<a href={MATHLIB_BASIC}>Mathlib, Gamma/Basic.lean</a>；
              <a href={MATHLIB_ZERO}>Mathlib 定理 tendsto_self_mul_Gamma_nhds_zero</a>；
              <a href={MATHLIB_NE_ZERO}>Mathlib 定理 Gamma_ne_zero</a>；
              <a href={MATHLIB_DIFF}>Mathlib 定理 differentiableAt_Gamma</a>。关于{" "}
              <span innerHTML={prose`$-1, -2, \dots$`} /> 我们仅核对了 Mathlib
              的无定义陈述；多米诺骨牌直观解释与{" "}
              <span innerHTML={prose`$\Gamma\!\left(-\frac{1}{2}\right)$`} />{" "}
              算例由本站直接据递推公式写出。
            </p>
          </section>

          <section id="zeta-link">
            <h2 innerHTML={prose`$\Gamma$ 如何搭起 $\zeta$ 函数的对称桥`} />
            <p
              innerHTML={prose`一个 1729 年为了给阶乘插值而诞生的函数，为什么会在 130 年后突然现身于 $\zeta(s)$ 的对称公式里？秘密在于欧拉积分 $\Gamma(s) = \int_0^\infty e^{-t} t^{s - 1}\,dt$ 是一台神奇的转换器：它能把幂次 $\frac{1}{n^s}$ 变成指数函数 $e^{-nx}$——而指数函数相加，既能凑出干净的闭式和，又天生自带精妙的对称性。`}
            />
            <p
              innerHTML={prose`1859 年，黎曼正是顺着这座桥发现：给 $\zeta(s)$ 配上一个由 $\Gamma$ 构成的“伴随因子”，拼成所谓的完备化 $\zeta$ 函数 $\Lambda(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)\,\zeta(s)$ 后，只要把 $s$ 换成 $1 - s$，函数值居然丝毫不差地相等：$\Lambda(1 - s) = \Lambda(s)$。把 $\zeta(1 - s)$ 单独解出来，再化简那串 $\Gamma$ 的比值，就得到了直接连通 $\zeta(s)$ 与 $\zeta(1 - s)$ 的函数方程：`}
            />
            <div
              class="equation"
              innerHTML={tex`\zeta(1 - s) = 2\,(2\pi)^{-s}\,\Gamma(s)\,\cos\!\left(\frac{\pi s}{2}\right)\,\zeta(s)`}
            />
            <p>
              <span
                innerHTML={prose`这条公式一口气解释了你在 zeta 页面遇到的两大谜题：第一，因为换算因子里直接包含 $\Gamma(s)$，所以原始函数方程会跳过 $\Gamma$ 没有定义的那些点（$0, -1, -2, \dots$，外加 $\zeta$ 自己发散的 $s = 1$，见`}
              />
              <a href={href("zeta", "euler-1749")}>欧拉 1749 年发现的对称线索</a>
              <span
                innerHTML={prose`）；第二，$\Gamma\!\left(\frac{s}{2}\right)$ 的极点迫使 $\zeta(s)$ 在 $-2, -4, -6, \dots$ 处取值为 $0$（见`}
              />
              <a href={href("zeta", "trivial-zeros")}>为什么负偶数都是平凡零点</a>
              ）。
            </p>
            <details class="aside-details">
              <summary>
                <span
                  innerHTML={prose`展开看完整推导：黎曼 1859 年的两套证法与 Mathlib 的形式化路线`}
                />
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`在 1859 年的论文里，黎曼分两步拿下了 $\Lambda(1 - s) = \Lambda(s)$。首先，在 $\Gamma(s)$（黎曼论文里记作 $\Pi(s - 1)$）的积分里令 $t = nx$，得到 $\frac{\Gamma(s)}{n^s} = \int_0^\infty e^{-nx} x^{s - 1}\,dx$；对 $n = 1, 2, 3, \dots$ 求和，积分号里面立刻缩成了一个等比级数：`}
                />
                <div
                  class="equation"
                  innerHTML={tex`\Gamma(s)\,\zeta(s) = \int_0^\infty \frac{x^{s - 1}}{e^x - 1}\,dx`}
                />
                <p
                  innerHTML={prose`接着，黎曼把积分路径弯成一条绕着正实轴 $(0, \infty)$ 的复平面围道，收集 $\frac{1}{e^x - 1}$ 在 $x = \pm 2\pi i n$ 处的极点留数，不仅把 $\zeta(s)$ 延拓到了所有 $s \neq 1$，还一眼看出了真正对称的组合正是 $\Lambda(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)\,\zeta(s)$。用黎曼自己的话说：“函数的这一性质促使我在级数 $\sum \frac{1}{n^s}$ 的通项里用积分 $\Pi\!\left(\frac{s}{2} - 1\right)$ 代替 $\Pi(s - 1)$。”Mathlib 直接形式化了这套更简短的第二证法，再借用勒让德倍元公式与欧拉余元公式（反射公式）完成收尾：`}
                />
                <ol>
                  <li>
                    <p>
                      <strong
                        innerHTML={prose`为什么选 $\Gamma\!\left(\frac{s}{2}\right)$ 和换元 $x = \pi n^2 t$：`}
                      />
                      <span
                        innerHTML={prose`第一证法已经揭示了 $\Gamma_{\mathbb{R}}(s)\,\zeta(s)$ 是对称的，其中 $\Gamma_{\mathbb{R}}(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)$。为了直接从欧拉积分 $\Gamma\!\left(\frac{s}{2}\right) = \int_0^\infty e^{-x}\,x^{\frac{s}{2} - 1}\,dx$（$\operatorname{Re}(s) > 0$）造出这个因子，令 $x = \pi n^2 t$，让 $x^{\frac{s}{2}}$ 恰好提出 $\pi^{\frac{s}{2}} n^s$。除到左边并对 $n = 1, 2, 3, \dots$（$\operatorname{Re}(s) > 1$）求和，立得 $\Lambda(s) = \Gamma_{\mathbb{R}}(s)\,\zeta(s)$：`}
                      />
                    </p>
                    <div
                      class="equation"
                      innerHTML={tex`\Lambda(s) = \pi^{-\frac{s}{2}}\,\Gamma\!\left(\frac{s}{2}\right)\,\zeta(s) = \int_0^\infty \left(\sum_{n = 1}^{\infty} e^{-\pi n^2 t}\right) t^{\frac{s}{2} - 1}\,dt`}
                    />
                  </li>
                  <li>
                    <p>
                      <strong>高斯和的倒数对称性：</strong>
                      <span
                        innerHTML={prose`完整的雅可比 $\theta$ 函数 $\theta(t) = \sum_{n = -\infty}^{\infty} e^{-\pi n^2 t}$ 由泊松求和公式（黎曼直接引用了雅可比的结果）满足 $\theta(t) = \frac{1}{\sqrt{t}}\,\theta\!\left(\frac{1}{t}\right)$。在 $t = 1$ 处把积分拆成 $(0, 1)$ 与 $(1, \infty)$ 两段，并对 $(0, 1)$ 做 $t \mapsto \frac{1}{t}$ 换元，就把 $t \leftrightarrow \frac{1}{t}$ 的对称性直接翻译成了 $s \leftrightarrow 1 - s$ 的精准相等：`}
                      />
                    </p>
                    <div class="equation" innerHTML={tex`\Lambda(1 - s) = \Lambda(s)`} />
                  </li>
                  <li>
                    <p>
                      <strong>分离换算因子：</strong>
                      <span
                        innerHTML={prose`把 $\Lambda(1 - s) = \Lambda(s)$ 两边同除以 $\Gamma_{\mathbb{R}}(1 - s)$，得到 $\zeta(1 - s) = \frac{\Gamma_{\mathbb{R}}(s)}{\Gamma_{\mathbb{R}}(1 - s)}\,\zeta(s)$。为了把半参数合并成单个 $\Gamma(s)$，Mathlib 给分子分母同乘 $\Gamma_{\mathbb{R}}(s + 1)$：`}
                      />
                    </p>
                    <div
                      class="equation"
                      innerHTML={tex`\frac{\Gamma_{\mathbb{R}}(s)}{\Gamma_{\mathbb{R}}(1 - s)} = \frac{\Gamma_{\mathbb{R}}(s)\,\Gamma_{\mathbb{R}}(s + 1)}{\Gamma_{\mathbb{R}}(1 - s)\,\Gamma_{\mathbb{R}}(1 + s)}`}
                    />
                  </li>
                  <li>
                    <p>
                      <strong>化简分子（勒让德倍元公式）：</strong>
                      <span
                        innerHTML={prose`Mathlib 先在正实轴上用前文的玻尔–莫勒鲁普唯一性定理，再通过解析延拓推广到 $\mathbb{C}$，证明了 $\Gamma\!\left(\frac{s}{2}\right)\,\Gamma\!\left(\frac{s}{2} + \frac{1}{2}\right) = 2^{1 - s}\sqrt{\pi}\,\Gamma(s)$。乘上 $\pi^{-\frac{s}{2}}\,\pi^{-\frac{s + 1}{2}}$ 后消掉 $\sqrt{\pi}$，正好留下：`}
                      />
                    </p>
                    <div
                      class="equation"
                      innerHTML={tex`\Gamma_{\mathbb{R}}(s)\,\Gamma_{\mathbb{R}}(s + 1) = 2\,(2\pi)^{-s}\,\Gamma(s)`}
                    />
                  </li>
                  <li>
                    <p>
                      <strong>化简分母（欧拉余元公式）：</strong>
                      <span
                        innerHTML={prose`注意到 $\frac{1 + s}{2} = 1 - \frac{1 - s}{2}$，在 $z = \frac{1 - s}{2}$ 处套用 $\Gamma(z)\,\Gamma(1 - z) = \frac{\pi}{\sin(\pi z)}$，既消掉了 $\pi^{-1}$，又把 $\sin\!\left(\frac{\pi}{2} - \frac{\pi s}{2}\right)$ 变成了 $\cos\!\left(\frac{\pi s}{2}\right)$：`}
                      />
                    </p>
                    <div
                      class="equation"
                      innerHTML={tex`\Gamma_{\mathbb{R}}(1 - s)\,\Gamma_{\mathbb{R}}(1 + s) = \pi^{-1} \cdot \frac{\pi}{\sin\!\left(\frac{\pi(1 - s)}{2}\right)} = \frac{1}{\cos\!\left(\frac{\pi s}{2}\right)}`}
                    />
                  </li>
                  <li>
                    <p>
                      <strong>分子除以分母：</strong>
                      <span
                        innerHTML={prose`把第 4、5 两步一除，就得到 $\frac{\Gamma_{\mathbb{R}}(s)}{\Gamma_{\mathbb{R}}(1 - s)} = 2\,(2\pi)^{-s}\,\Gamma(s)\,\cos\!\left(\frac{\pi s}{2}\right)$——丝毫不差，正是 $\zeta$ 函数方程里的换算因子。`}
                      />
                    </p>
                  </li>
                </ol>
              </div>
            </details>
            <details class="aside-details">
              <summary>
                <span>欧拉余元公式（反射公式）：历史渊源与 Mathlib 证明</span>
              </summary>
              <div class="aside-body">
                <p
                  innerHTML={prose`$\Gamma$ 自己也服从一条优美的 $s \leftrightarrow 1 - s$ 镜像关系——余元公式（又称欧拉反射公式）：`}
                />
                <div
                  class="equation"
                  innerHTML={tex`\Gamma(s)\,\Gamma(1 - s) = \frac{\pi}{\sin(\pi s)}`}
                />
                <p
                  innerHTML={prose`取 $s = \frac{1}{2}$ 立刻给出 $\Gamma\!\left(\frac{1}{2}\right)^2 = \pi$，于是 $\Gamma\!\left(\frac{1}{2}\right) = \sqrt{\pi}$。欧拉在 1749 年的 $\zeta$ 论文 E352（第 13 节，1768 年刊印）里就已经用到了这条恒等式，并在 1772 年的论文 E421（第 43 节）给出了专门的无穷乘积推导（用他的记号 $[\lambda] = \Gamma(\lambda + 1)$ 写作 $[\lambda]\,[-\lambda] = \frac{\lambda\pi}{\sin(\lambda\pi)}$）。Mathlib 的证明分三步：`}
                />
                <ol>
                  <li>
                    <p>
                      <strong innerHTML={prose`$\Gamma$ 的极限表达式：`} />
                      <span
                        innerHTML={prose`对 $\operatorname{Re}(z) > 0$，Mathlib 在欧拉积分里用 $\left(1 - \frac{x}{n}\right)^n$ 逼近 $e^{-x}$ 并运用控制收敛定理（再借 $\Gamma(z + 1) = z\,\Gamma(z)$ 向左延拓），证明 $\Gamma(z)$ 是 $n \to \infty$ 时下式的极限：`}
                      />
                    </p>
                    <div
                      class="equation"
                      innerHTML={tex`\operatorname{GammaSeq}(z, n) = \frac{n^z\,n!}{z\,(z + 1)\,(z + 2)\cdots(z + n)}`}
                    />
                  </li>
                  <li>
                    <p>
                      <strong innerHTML={prose`把 $z$ 与 $1 - z$ 的乘积并到一起：`} />
                      <span
                        innerHTML={prose`在 $\operatorname{GammaSeq}(z, n)\,\operatorname{GammaSeq}(1 - z, n)$ 中，幂次合并成 $n^z \cdot n^{1 - z} = n$；分母把 $(j + 1 + z)$ 与 $(j + 1 - z)$ 配对得到 $(j + 1)^2\left(1 - \frac{z^2}{(j + 1)^2}\right)$，其中的 $(j + 1)^2$ 恰好把 $(n!)^2$ 全部约掉，只剩下：`}
                      />
                    </p>
                    <div
                      class="equation"
                      innerHTML={tex`\operatorname{GammaSeq}(z, n)\,\operatorname{GammaSeq}(1 - z, n) = \frac{n}{n + 1 - z} \cdot \frac{1}{z \prod_{j = 1}^{n} \left(1 - \frac{z^2}{j^2}\right)}`}
                    />
                  </li>
                  <li>
                    <p>
                      <strong>对接欧拉正弦无穷乘积：</strong>
                      <span
                        innerHTML={prose`当 $n \to \infty$ 时，$\frac{n}{n + 1 - z} \to 1$，而欧拉的正弦无穷乘积公式告诉我们 $\pi z \prod_{j = 1}^{n} \left(1 - \frac{z^2}{j^2}\right) \to \sin(\pi z)$（Mathlib 通过对 $\int_0^{\frac{\pi}{2}} \cos(2zx)\cos^{2n}(x)\,dx$ 反复分部积分证出）。取倒数立得 $\frac{\pi}{\sin(\pi z)}$。`}
                      />
                    </p>
                  </li>
                </ol>
              </div>
            </details>
            <p class="sources">
              参考来源：
              <a href={RIEMANN_1859}>
                Riemann, On the Number of Prime Numbers less than a Given Quantity（1859，Wilkins
                英译本）
              </a>
              ，第 1 至 3 页（两套证法与原文引语）；
              <a href={MATHLIB_ZETA_ONE_SUB}>Mathlib 定理 riemannZeta_one_sub</a>；
              <a href={MATHLIB_HURWITZ_EVEN}>Mathlib 引理 hurwitzZetaEven_one_sub</a>；
              <a href={MATHLIB_DELIGNE}>
                Mathlib, Deligne.lean（Gammaℝ_mul_Gammaℝ_add_one 至 inv_Gammaℝ_one_sub）
              </a>
              ；<a href={MATHLIB_THETA}>Mathlib 定理 jacobiTheta₂_functional_equation</a>；
              <a href={MATHLIB_REFLECTION}>
                Mathlib, Gamma/Beta.lean（GammaSeq_mul 与 Gamma_mul_Gamma_one_sub）
              </a>
              ；<a href={MATHLIB_DOUBLING}>Mathlib 定理 Gamma_mul_Gamma_add_half</a>；
              <a href={MATHLIB_SINE_PROD}>Mathlib 定理 tendsto_euler_sin_prod</a>；
              <a href={EULER_E352}>Euler, E352</a>（1749/1768，第 13 节，Willis 与 Osler 英译本）；
              <a href={EULER_E421}>Euler, E421（Euler Archive）</a>，Novi Commentarii academiae
              scientiarum Petropolitanae 16 (1772)，第 120–121 页第 43 节（查阅拉丁文原版扫描件）。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
