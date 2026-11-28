import { For } from "solid-js";
import { MultiplyPlane } from "../MultiplyPlane";
import { backgroundKicker, href } from "../pages";
import { Stepper, type Part } from "../Stepper";

// Source of the content: docs/notes/background-complex-numbers.md.
const MERINO = "https://math.mit.edu/~dunkel/Teach/18.04_2019S/historic/Merino_2006.pdf";
const ELKIES = "https://people.math.harvard.edu/~elkies/M229.09/zeta1.pdf";
const EULER_E352 = "https://scholarlycommons.pacific.edu/euler-works/352/";
const MATHLIB_ZETA_ZERO =
  "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L150-L152";

// 邦贝利的计算过程。
const CUBIC_ZH: Part[] = [
  {
    title: "一道答案普通的方程",
    equation: tex`x^3 = 15x + 4`,
    text: prose`试着把 $x = 4$ 代进去：左边是 $4 \times 4 \times 4 = 64$，右边是 $60 + 4 = 64$。$4$ 明明白白就是一个实实在在的解，到现在为止一切都很正常。`,
  },
  {
    title: "三次方程通用求根公式",
    equation: tex`\begin{gathered} x = \sqrt[3]{\frac{q}{2} + \sqrt{w}} + \sqrt[3]{\frac{q}{2} - \sqrt{w}} \\ w = \left(\frac{q}{2}\right)^2 - \left(\frac{p}{3}\right)^3 \end{gathered}`,
    text: prose`16 世纪，费罗（del Ferro）与塔尔塔利亚（Tartaglia）先后找到了解所有形如 $x^3 = px + q$ 三次方程的求根公式。符号 $\sqrt[3]{\phantom{x}}$ 表示立方根（三次方等于根号下数值的数）。卡尔达诺（Cardano）于 1545 年将这条公式公之于众。`,
  },
  {
    title: "这条公式为什么成立",
    equation: tex`(u + v)^3 = u^3 + v^3 + 3uv\,(u + v)`,
    text: prose`把未知数拆成 $x = u + v$。对比上面的恒等式，只要找到满足 $3uv = p$ 且 $u^3 + v^3 = q$ 的一对 $u, v$，方程 $x^3 = px + q$ 就自动成立。公式正是这样算出了 $u^3 = \frac{q}{2} + \sqrt{w}$ 和 $v^3 = \frac{q}{2} - \sqrt{w}$：两数之和恰好是 $q$，两数之积恰好是 $\left(\frac{p}{3}\right)^3$，从而 $uv = \frac{p}{3}$。这里用的是现代写法；卡尔达诺在 1545 年也给出了自己的证明。注意推导里要对 $w$ 开平方，所以前提看似必须是 $w \ge 0$。`,
  },
  {
    title: "偏偏在这里卡壳了",
    equation: tex`x = \sqrt[3]{2 + \sqrt{-121}} + \sqrt[3]{2 - \sqrt{-121}}`,
    text: prose`把 $p = 15, q = 4$ 代入，算出 $w = 2^2 - 5^3 = 4 - 125 = -121$。公式要求我们对 $-121$ 开平方！在当时人们眼里，没有任何数的平方是负数，第 3 步的推导瞬间卡死。卡尔达诺在书里干脆绕开了这种情况——可这道方程明明有 $x = 4$ 这个实数解！`,
  },
  {
    title: "邦贝利硬着头皮往下算",
    equation: tex`\left(2 + \sqrt{-1}\right)^3 = 2 + 11\sqrt{-1} = 2 + \sqrt{-121}`,
    text: prose`邦贝利（Bombelli）把 $\sqrt{-1}$ 当成一个遵守普通运算法则的新数，只额外规定一条：它的平方等于 $-1$。按这条规则展开 $\left(2 + \sqrt{-1}\right)^3$，得到 $8 + 12\sqrt{-1} - 6 - \sqrt{-1} = 2 + 11\sqrt{-1}$，正好等于 $2 + \sqrt{-121}$！于是第一个立方根就是 $2 + \sqrt{-1}$，同理第二个立方根是 $2 - \sqrt{-1}$。`,
  },
  {
    title: "“不可能”的部分抵消了",
    equation: tex`x = \left(2 + \sqrt{-1}\right) + \left(2 - \sqrt{-1}\right) = 4`,
    text: prose`两个带着 $\sqrt{-1}$ 的项一正一负抵消得干干净净，剩下的正是我们一开始就知道的答案 $4$！只要允许 $\sqrt{-1}$ 参与普通四则运算，求根公式就能给出正确答案。邦贝利自己起初都将信将疑，直到 1797 年人们才给这套运算找到了严谨的几何根基。通往真实答案的道路，偏偏要借道当时还“不存在”的数——复数就是这样被逼出来的。`,
  },
];

const TIMELINE_ZH: { year: string; text: Markup }[] = [
  {
    year: "1545",
    text: prose`卡尔达诺在《大术》（Ars Magna）中发表三次方程求根公式。同书还提出“把 10 拆成两个积为 40 的数”，得到 $5 + \sqrt{-15}$ 与 $5 - \sqrt{-15}$，卡尔达诺感慨算起来“饱受精神折磨”。`,
  },
  {
    year: "1572",
    text: prose`邦贝利在《代数学》（L'Algebra）中算通了 $x^3 = 15x + 4$。他坦言这方法起初看起来“与其说是真理，不如说更像诡辩”。`,
  },
  {
    year: "1637",
    text: prose`笛卡尔为这类根起了“虚构的”（imaginary，中文译作“虚数”）这个名字，意思是现实里没有与之对应的量。这个称呼一直沿用至今。`,
  },
  {
    year: "18 世纪",
    text: prose`欧拉引入字母 $i$ 来表示 $\sqrt{-1}$。`,
  },
  {
    year: "1797",
    text: prose`韦塞尔（Wessel）向丹麦皇家科学院提交论文，把复数画成平面上的箭头：两个箭头相乘，就是长度相乘、角度相加。不过论文用丹麦语发表，直到 1897 年才重新被人注意到。`,
  },
  {
    year: "1806",
    text: prose`巴黎的一位记账员阿尔冈（Argand）自费印了一本小册子，独立提出了同样的平面几何图像，封面甚至没有署自己的名字。`,
  },
  {
    year: "1831",
    text: prose`高斯正式发表复平面的几何解释，并确立了“复数”（complex number）这一名称。`,
  },
  {
    year: "1859",
    text: prose`黎曼证明，$\zeta$ 函数可以光滑地延拓到除去 $s = 1$ 之外的整个复平面。`,
  },
];

export function ComplexPageZh() {
  return (
    <main class="article">
      <p class="kicker">{backgroundKicker("complex-numbers", "zh")}</p>
      <h1>复数是怎么来的</h1>
      <p class="summary">
        一开始根本没人想要复数。只是人们解一道普通的三次方程时，求根公式偏偏绕不过负数的平方根——硬着头皮算下去，居然还真算出了正确答案。
      </p>

      <div class="article-layout">
        <aside class="article-rail">
          <nav class="page-toc" aria-label="本页目录">
            <p class="page-toc-label">本页目录</p>
            <ol>
              <li>
                <a href={href("complex-numbers", "cubic")}>三次方程里的僵局</a>
              </li>
              <li>
                <a href={href("complex-numbers", "plane")}>旋转与缩放的几何图像</a>
              </li>
              <li>
                <a href={href("complex-numbers", "why-zeta")}>为什么 zeta 离不开复平面</a>
              </li>
              <li>
                <a href={href("complex-numbers", "timeline")}>历史时间线</a>
              </li>
            </ol>
            <p class="page-toc-back">
              <a href={href("step-1")}>← 回到第 1 步</a>
            </p>
          </nav>
        </aside>

        <div class="article-content">
          <section id="cubic">
            <h2>把复数逼出来的那道方程</h2>
            <p
              innerHTML={prose`很多人以为，数学家发明复数只是为了硬给 $x^2 = -1$ 凑一个解。其实完全不是：在 16 世纪，如果一道方程没有普通解，数学家直接说“无解”就完事了。真正让数学家绕不开的，是一道早就知道有普通实数解的三次方程——可解它的通用求根公式，偏偏一头撞进了负数的平方根。`}
            />
            <Stepper parts={CUBIC_ZH} />
            <p class="sources">
              参考来源：<a href={MERINO}>Merino, A Short History of Complex Numbers</a>，第 4 至 7
              节。
            </p>
          </section>

          <section id="plane">
            <h2>直观理解：乘法就是“旋转加缩放”</h2>
            <p
              innerHTML={prose`邦贝利虽然算出了正确答案，但接下来的两百多年里，谁也说不清 $\sqrt{-1}$ 到底是个什么东西。在普通数轴上，乘以 $-1$ 相当于掉头反向——转过一个 $180^\circ$ 的平角。可沿着这条直线走，你找不到任何一种操作，连做两次能变成“掉头”：正数乘正数还是正数，负数乘负数也变成了正数。`}
            />
            <p
              innerHTML={prose`破局的办法，是跳出直线，迈入平面。1797 年，韦塞尔把每个复数画成一根从原点 $0$ 出发的箭头：它既可以用水平分量（实部）和竖直分量（虚部）来定位，也可以用箭头的长度（即复数的模，也常称模长）以及它与横轴正方向的夹角（辐角）来描述。对于复数 $s = a + bi$，数学里用 $\operatorname{Re}(s) = a$ 表示实部（左右位置），用 $\operatorname{Im}(s) = b$ 表示虚部（上下位置）。两个复数相加，就是箭头首尾相接（分量分别相加）；而两个复数相乘，规则极其优雅：模长相乘，辐角相加。`}
            />
            <p
              innerHTML={prose`在这条统一的规则下，$\sqrt{-1}$ 立刻不再神秘：它就是一根长度为 $1$、竖直朝上（夹角 $90^\circ$）的箭头。任何箭头乘以 $i$，效果就是逆时针旋转 $90^\circ$。连乘两次 $i$，总共旋转 $180^\circ$，正好掉头指向 $-1$。就是这幅几何画面，彻底夯实了邦贝利代数的地基（见下方时间线）。`}
            />
            <MultiplyPlane />
            <p class="sources">
              乘法规则参考：<a href={MERINO}>Merino, A Short History of Complex Numbers</a>，第 12
              节。交互图中的具体数值与旋转验证由本站根据韦塞尔规则直接生成。
            </p>
          </section>

          <section id="why-zeta">
            <h2>为什么 zeta 函数离不开复平面</h2>
            <p>
              <span
                innerHTML={prose`在黎曼之前的一个多世纪里，欧拉研究 $\zeta$ 级数时，指数 $s$ 都还只是实数。作为普通无穷级数，$1 + \frac{1}{2^s} + \frac{1}{3^s} + \cdots$ 只有在 $s > 1$ 时才收敛；一旦撞上 $s = 1$，级数就发散到无穷大，像一堵墙把实数轴拦腰截断。1749 年，欧拉其实已经通过交错级数和幂级数极限，试探出了 $s \le 1$ 处的取值（包括 $\frac{1}{2}$、$0$ 和负整数，详见`}
              />
              <a href={href("zeta", "euler-1749")}>zeta 函数的来历</a>
              <span
                innerHTML={prose`），但他始终没有一个覆盖全部 $s$ 的统一证明。到了 1859 年——此时复数已经拥有了完整的复平面图像——黎曼把 $s$ 从实数轴拓展到了整个复平面。在二维平面上，$s = 1$ 不再是一堵挡路的墙，而只是孤零零的一个点，完全可以绕着它走过去！黎曼据此证明，$\zeta(s)$ 可以光滑地延拓到除 $s = 1$ 外的所有复数。`}
              />
            </p>
            <p
              innerHTML={prose`那黎曼猜想能只停留在实数轴上吗？绝对不行。在实数轴上，$\zeta(s)$ 只在 $-2, -4, -6, \dots$ 这些平凡零点处等于 $0$；在 $s = 0$ 处它等于 $-\frac{1}{2}$，而在整个正实轴上（包括 $0$ 和 $1$ 之间）一个零点也没有。黎曼猜想真正关心的所有非平凡零点，全都悬浮在实数轴之外——它们藏在实部介于 $0$ 和 $1$ 之间的竖直带状区域（$0 \le \operatorname{Re}(s) \le 1$）里，虚部全都不为 $0$。没有复平面，这些零点根本无从谈起，黎曼猜想也就无从陈述。`}
            />
            <p class="sources">
              参考来源：<a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>，第 1、2
              页（标作 “Riemann 1859” 的定理）与第 7 页（正实轴上无零点）；
              <a href={EULER_E352}>Euler, E352（1749/1768，Willis 与 Osler 英译本）</a>，第 1 至 15
              节（通过交错级数试探 <span innerHTML={prose`$s \le 1$`} />
              ）；<a href={MATHLIB_ZETA_ZERO}>Mathlib 定理 riemannZeta_zero</a>（
              <span innerHTML={prose`$\zeta(0) = -\frac{1}{2}$`} />
              ）。
            </p>
          </section>

          <section id="timeline">
            <h2>时间线一览</h2>
            <p>
              复数好用归好用，但在两百多年里一直缺一块让人信服的地基——直到人们终于把它画在了平面上。
            </p>
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
              参考来源：<a href={MERINO}>Merino, A Short History of Complex Numbers</a>，第 4 至 8
              节、第 11 至 15 节。1859 年条目另见{" "}
              <a href={ELKIES}>Elkies, Math 229 notes on the zeta function</a>。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
