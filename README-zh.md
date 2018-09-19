# math-as-code

> 译注：译者英文与数学水平都非常有限，尝试翻译，如有错误请指正。[英文原版](./README.md) 在此。

这是一份通过对比数学符号和JavaScript代码来帮助开发者更容易了解数学符号的参考。

动机:学术论文可能会吓着自学游戏和图形的程序猿:)

这个指南还没有完成。如果你发现错误或者想要贡献，请[open a ticket](https://github.com/Jam3/math-as-code/issues)或发一个 PR。


> **注意**： 简洁起见，有些代码示例使用了[npm 包](https://www.npmjs.com/)。你可以到他们的GitHub repos来查看实现的详细情况。

# 前言

数学符号可以表示不同的意思，这取决于作者，上下文和所学习的领域（线性代数，集合理论，等等）。这份指南也许不会涵盖符号的*所有*用法。在某些情况，会引用一些真实材料（博客文章,出版物等等）来演示某个符号的实际用法。

更完整的列表，请看[Wikipedia - List of Mathematical Symbols](https://en.wikipedia.org/wiki/List_of_mathematical_symbols)。

简单起见，这里许多的代码示例都操作浮点数值，并不是数字健壮的（numerically robust）。为什么这会是一个问题的更多细节请看[Robust Arithmetic Notes](https://github.com/mikolalysenko/robust-arithmetic-notes) 作者是 Mikola Lysenko。

# 目录

- [变量名约定](#变量名约定)
- [等号 `=` `≈` `≠` `:=`](#等号)
- [平方根与复数 `√` *`i`*](#平方根与复数)
- [点 & 叉 `·` `×` `∘`](#点--叉)
  - [标量乘法](#标量乘法)
  - [向量乘法](#向量乘法)
  - [点乘](#点乘)
  - [叉乘](#叉乘)
- [西格玛 `Σ`](#西格玛sigma) - *求和*
- [大写 Pi `Π`](#大写-pi) - *序列的积*
- [管道 `||`](#管道pipes)
  - [绝对值](#绝对值)
  - [欧几里得模](#欧几里得模)
  - [行列式](#行列式)
- [帽子 **`â`**](#帽子) - *单位向量*
- ["属于" `∈` `∉`](#属于)
- [常见数字集 `ℝ` `ℤ` `ℚ` `ℕ`](#常见数字集)
- [函数 `ƒ`](#函数)
  - [分段函数](#分段函数)
  - [通用函数](#通用函数)
  - [函数符号 `↦` `→`](#函数符号)
- [撇号 `′`](#撇号prime)
- [向下取整和向上取整（floor & ceiling） `⌊` `⌉`](#向下取整和向上取整floor--ceiling)
- [箭头](#箭头)
  - [实质蕴含（material implication） `⇒` `→`](#实质蕴含material-implication)
  - [等式 `<` `≥` `≫`](#等式equality)
  - [与 & 或 `∧` `∨`](#与conjunction--或disjunction)
- [逻辑非 `¬` `~` `!`](#逻辑非logical-negation)
- [区间（intervals）](#区间intervals)
- [更多...](#更多)

## 变量名约定

有很多命名约定取决于上下文和所学领域，他们并不太一致。然而在一些文献中你会发现变量名遵循一些模式，例如：

- *s* - 斜体小写字母用做标量 （例如一个数字）
- **x** - 粗体小写字母用做向量 （例如一个2D点）
- **A** - 粗体大写字母用做矩阵 （例如一个3D变换）
- *θ* - 斜体小写希腊字母用做常量和特殊变量 （例如 [欧拉角 *θ*, *theta*](https://en.wikipedia.org/wiki/Spherical_coordinate_system))

本指南也基于这个格式。

## 等号

有很多符号很像等号 `=` 。这里有些常见的例子：

- `=` 表示相等 （值相同）
- `≠` 表示不相等 （值不同）
- `≈` 表示约等于 （`π ≈ 3.14159`）
- `:=` 表示定义 （A 被定义为 B）

在 JavaScript 中:

```js
// 相等
2 === 3

// 不相等
2 !== 3

// 约等于
almostEqual(Math.PI, 3.14159, 1e-5)

function almostEqual(a, b, epsilon) {
  return Math.abs(a - b) <= epsilon
}
```

你也许看过 `:=`， `=:` 和 `=` 符号用来表示 *定义*。<sup>[1]</sup>

例如，下边定义 *x* 为 2*kj* 的别名。

![equals1](http://latex.codecogs.com/svg.latex?x%20%3A%3D%202kj)

<!-- x := 2kj -->

在 JavaScript 中，我们用 `var` 来 *定义* 变量和提供别名：

```js
var x = 2 * k * j
```

然而，这里的x值是可变的，仅是当时的一个快照。在某些有预处理器语言中的 `#define` 语句才比较接近于数学中的 *定义*。

在JavaScript (ES6) 中，更精确的 *定义* ，应该有点类似这样：

```js
const f = (k, j) => 2 * k * j
```

与此不同的是，下边这句表示的是相等：

![equals2](http://latex.codecogs.com/svg.latex?x%20%3D%202kj)

<!-- x = 2kj -->

上边的等式也可以解释为一个 [断言](https://developer.mozilla.org/en-US/docs/Web/API/console/assert):

```js
console.assert(x === (2 * k * j))
```

## 平方根与复数

一个平方根运算是这种形式:

![squareroot](http://latex.codecogs.com/svg.latex?%5Cleft%28%5Csqrt%7Bx%7D%5Cright%29%5E2%20%3D%20x)

<!-- \left(\sqrt{x}\right)^2 = x -->

在编程语言中我们使用 `sqrt` 函数， 像这样：

```js
var x = 9;
console.log(Math.sqrt(x));
//=> 3
```

复数是 ![complex](http://latex.codecogs.com/svg.latex?a&space;&plus;&space;ib) 形式的表达式， 其中 ![a](http://latex.codecogs.com/svg.latex?a) 是实数部分， ![b](http://latex.codecogs.com/svg.latex?b) 是虚数部分。 虚数 ![i](http://latex.codecogs.com/svg.latex?i) 的定义为：

![imaginary](http://latex.codecogs.com/svg.latex?i%3D%5Csqrt%7B-1%7D).
<!-- i=\sqrt{-1} -->

JavaScript没有内置复数的功能，但有一些库支持复数算法。例如， [mathjs](https://www.npmjs.com/package/mathjs):

```js
var math = require('mathjs')

var a = math.complex(3, -1)
//=> { re: 3, im: -1 }

var b = math.sqrt(-1)
//=> { re: 0, im: -1 }

console.log(math.multiply(a, b).toString())
//=> '1 + 3i'
```

这个库还支持字符串表达式求值， 所以上边的可以写为：

```js
console.log(math.eval('(3 - i) * i').toString())
//=> '1 + 3i'
```

其他实现：

- [immutable-complex](https://www.npmjs.com/package/immutable-complex)
- [complex-js](https://www.npmjs.com/package/complex-js)
- [Numeric-js](http://www.numericjs.com/)

## 点 & 叉

点 `·` 和叉 `×` 符号根据上下文的不同有不同的用法。

他们可能看上去很明显，但在进入下一部分之前，理解他们之间微妙的不同是非常重要的。

#### 标量乘法

两个符号都可以表示简单的标量之间的乘法。下边的写法意思相同：

![dotcross1](http://latex.codecogs.com/svg.latex?5%20%5Ccdot%204%20%3D%205%20%5Ctimes%204)

<!-- 5 \cdot 4 = 5 \times 4 -->

在编程语言中，我们倾向用星号表示相乘：

```js
var result = 5 * 4
```

通常，使用乘法符号只是为了避免意义模糊（例如两个数字之间的）。这里，我们可以完全省略：

![dotcross2](http://latex.codecogs.com/svg.latex?3kj)

<!-- 3kj -->

如果这些变量表示的是标量，则代码应该这样写:

```js
var result = 3 * k * j
```

#### 向量乘法

表示向量和标量之间相乘，或两向量的逐元素相乘（element-wise multiplication），我们不用点 `·` 或叉 `×` 符号。 这些符号在线性代数中有不同的意思，后边讨论。

让我们用之前的例子，但用在向量上。对于向量的逐元素相乘（element-wise vector multiplication）来说，你可能会看到用一个空心点来表示 [Hadamard product](https://en.wikipedia.org/wiki/Hadamard_product_%28matrices%29)。<sup>[2]</sup>

![dotcross3](http://latex.codecogs.com/svg.latex?3%5Cmathbf%7Bk%7D%5Ccirc%5Cmathbf%7Bj%7D)

<!-- 3\mathbf{k}\circ\mathbf{j} -->

某些时候，作者可能会显式定义一个不同的符号，例如圆中点 `⊙` 或实心圈 `●` 。<sup>[3]</sup>

这是对应的代码，使用数组 `[x, y]` 来表示2D向量。

```js
var s = 3
var k = [ 1, 2 ]
var j = [ 2, 3 ]

var tmp = multiply(k, j)
var result = multiplyScalar(tmp, s)
//=> [ 6, 18 ]
```

`multiply` 和 `multiplyScalar` 函数应该这样:

```js
function multiply(a, b) {
  return [ a[0] * b[0], a[1] * b[1] ]
}

function multiplyScalar(a, scalar) {
  return [ a[0] * scalar, a[1] * scalar ]
}
```

同样的，矩阵相乘也不用 `·` 或 `×` 符号。 矩阵乘法会在后边章节提到.

#### 点乘

点符号 `·` 可用来表示两向量之间的 [*点乘*](https://en.wikipedia.org/wiki/Dot_product) 。 由于其值是一个标量，通常被叫做 *标量积（scalar product）* 。

![dotcross4](http://latex.codecogs.com/svg.latex?%5Cmathbf%7Bk%7D%5Ccdot%20%5Cmathbf%7Bj%7D)

<!-- \mathbf{k}\cdot \mathbf{j} -->

这在线性代数和3D向量中是非常常见的，代码类似这样：

```js
var k = [ 0, 1, 0 ]
var j = [ 1, 0, 0 ]

var d = dot(k, j)
//=> 0
```

结果为 `0` 告诉我们两向量互相垂直. 这是3元素向量的 `点乘` 函数:

```js
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
```

#### 叉乘

叉乘符号 `×` 可以用来表示两向量的 [*叉乘*](https://en.wikipedia.org/wiki/Cross_product)。

![dotcross5](http://latex.codecogs.com/svg.latex?%5Cmathbf%7Bk%7D%5Ctimes%20%5Cmathbf%7Bj%7D)

<!-- \mathbf{k}\times \mathbf{j} -->

在代码中，应该是这样:

```js
var k = [ 0, 1, 0 ]
var j = [ 1, 0, 0 ]

var result = cross(k, j)
//=> [ 0, 0, -1 ]
```

这里得到结果为 `[ 0, 0, -1 ]`，这个向量同时垂直于 **k** 和 **j** 。

我们的叉乘 `cross` 函数：

```js
function cross(a, b) {
  var ax = a[0], ay = a[1], az = a[2],
    bx = b[0], by = b[1], bz = b[2]

  var rx = ay * bz - az * by
  var ry = az * bx - ax * bz
  var rz = ax * by - ay * bx
  return [ rx, ry, rz ]
}
```

向量乘法，叉乘，点乘的其他实现：

- [gl-vec3](https://github.com/stackgl/gl-vec3)
- [gl-vec2](https://github.com/stackgl/gl-vec2)
- [vectors](https://github.com/hughsk/vectors) - 包含 n维实现

## 西格玛（sigma） 

大写希腊字母 `Σ` (Sigma) 用来表示 [总和 Summation](https://en.wikipedia.org/wiki/Summation)。 换句话说就是对一些数字求和。

![sigma](http://latex.codecogs.com/svg.latex?%5Csum_%7Bi%3D1%7D%5E%7B100%7Di)

<!-- \sum_{i=1}^{100}i -->

这里, `i=1` 是说从 `1` 西格玛上边的数字`100`为止。这些分别为上下边界。 "E" 右边的 *i* 告诉我们求和的是什么。代码：

```js
var sum = 0
for (var i = 1; i <= 100; i++) {
  sum += i
}
```

`sum` 的结果为 `5050` 。

**提示：** 对于整数，这个特殊形式可以优化为：

```js
var n = 100 // 上边界
var sum = (n * (n + 1)) / 2
```

这里有另一个例子，这里的 *i* ，或 “想要求和的东西” 是不同的：

![sum2](http://latex.codecogs.com/svg.latex?%5Csum_%7Bi%3D1%7D%5E%7B100%7D%282i&plus;1%29)

<!-- \sum_{i=1}^{100}(2i+1) -->

代码：

```js
var sum = 0
for (var i = 1; i <= 100; i++) {
  sum += (2 * i + 1)
}
```

`sum` 的结果为 `10200` 。

这个符号可被嵌套，非常像嵌套一个 `for` 循环。 你应该先求和最右边的西格玛， 除非作者加入括号改变了顺序。然而下边的例子，由于我们处理有限的和，顺序就不重要了。

![sigma3](http://latex.codecogs.com/svg.latex?%5Csum_%7Bi%3D1%7D%5E%7B2%7D%5Csum_%7Bj%3D4%7D%5E%7B6%7D%283ij%29)

<!-- \sum_{i=1}^{2}\sum_{j=4}^{6}(3ij) -->

代码：

```js
var sum = 0
for (var i = 1; i <= 2; i++) {
  for (var j = 4; j <= 6; j++) {
    sum += (3 * i * j)
  }
}
```

这里，`sum` 值为 `135`。

## 大写 Pi

大写 Pi 或 “大Pi” 与 [西格玛](#西格玛sigma) 非常接近， 不同的是我们用乘法取得一系列数字的乘积。 

看下边：

![capitalPi](http://latex.codecogs.com/svg.latex?%5Cprod_%7Bi%3D1%7D%5E%7B6%7Di)

<!-- \prod_{i=1}^{6}i -->

代码应该类似这样：

```js
var value = 1
for (var i = 1; i <= 6; i++) {
  value *= i
}
```

`value` 结果应得到 `720`。

## 管道（pipes）

管道符号，就是 *竖线（bars）*，根据上下文不同，可以表示不同意思。下边的是3种常见用途 [绝对值](#绝对值), [欧几里得模](#欧几里得模), 和 [行列式](#行列式)。

这3种特性都是描述对象的 *长度（length）* 。

#### 绝对值

![pipes1](http://latex.codecogs.com/svg.latex?%5Cleft%20%7C%20x%20%5Cright%20%7C)

<!-- \left | x \right | -->

对于数字 *x*, `|x|` 表示 *x* 的绝对值。代码为：

```js
var x = -5
var result = Math.abs(x)
// => 5
```

#### 欧几里得模（Euclidean norm）

![pipes4](http://latex.codecogs.com/svg.latex?%5Cleft%20%5C%7C%20%5Cmathbf%7Bv%7D%20%5Cright%20%5C%7C)

<!-- \left \| \mathbf{v} \right \| -->

对于向量 **v**， `‖v‖` 是 **v** 的[欧几里得模（Euclidean norm）](https://en.wikipedia.org/wiki/Norm_%28mathematics%29#Euclidean_norm) 。也叫做向量的 "量级（magnitude）" 或 "长度（length）" 。

通常用双竖线表示来避免与*绝对值* 符号混淆，但有些时候也会看见单竖线。

![pipes2](http://latex.codecogs.com/svg.latex?%5Cleft%20%7C%20%5Cmathbf%7Bv%7D%20%5Cright%20%7C)

<!-- \left | \mathbf{v} \right | -->

这里的例子用数组 `[x, y, z]` 来表示一个3D向量。

```js
var v = [ 0, 4, -3 ]
length(v)
//=> 5
```

`length` 函数：

```js
function length (vec) {
  var x = vec[0]
  var y = vec[1]
  var z = vec[2]
  return Math.sqrt(x * x + y * y + z * z)
}
```

其他实现：

- [magnitude](https://github.com/mattdesl/magnitude/blob/864ff5a7eb763d34bf154ac5f5332d7601192b70/index.js) - n-dimensional
- [gl-vec2/length](https://github.com/stackgl/gl-vec2/blob/21f460a371540258521fd2f720d80f14e87bd400/length.js) - 2D vector
- [gl-vec3/length](https://github.com/stackgl/gl-vec3/blob/507480fa57ba7c5fb70679cf531175a52c48cf53/length.js) - 3D vector

#### 行列式

![pipes3](http://latex.codecogs.com/svg.latex?%5Cleft%20%7C%5Cmathbf%7BA%7D%20%5Cright%20%7C)

<!-- \left |\mathbf{A}  \right | -->

对于一个矩阵 **A**， `|A|` 表示矩阵 **A** 的[行列式（determinant）](https://en.wikipedia.org/wiki/Determinant)。

这是一个计算 2x2 矩阵行列式的例子，矩阵用一个column-major格式的扁平数数组表示。

```js
var determinant = require('gl-mat2/determinant')

var matrix = [ 1, 0, 0, 1 ]
var det = determinant(matrix)
//=> 1
```

实现：

- [gl-mat4/determinant](https://github.com/stackgl/gl-mat4/blob/c2e2de728fe7eba592f74cd02266100cc21ec89a/determinant.js) - 也可以看 [gl-mat3](https://github.com/stackgl/gl-mat3) 和 [gl-mat2](https://github.com/stackgl/gl-mat2)
- [ndarray-determinant](https://www.npmjs.com/package/ndarray-determinant)
- [glsl-determinant](https://www.npmjs.com/package/glsl-determinant)
- [robust-determinant](https://www.npmjs.com/package/robust-determinant)
- [robust-determinant-2](https://www.npmjs.com/package/robust-determinant-2) 和 [robust-determinant-3](https://www.npmjs.com/package/robust-determinant-3)，专门 2x2 和 3x3 的矩阵

## 帽子

在几何里，字母上的 “帽子” 符号用来表示一个[单位向量](https://en.wikipedia.org/wiki/Unit_vector)。例如，这是向量 **a** 的单位向量。

![hat](http://latex.codecogs.com/svg.latex?%5Chat%7B%5Cmathbf%7Ba%7D%7D)

<!-- \hat{\mathbf{a}} -->

在笛卡尔空间中，单位向量的长度为1。意思是向量的每个部分都在 -1.0 到 1.0 之间。这里我们 *归一化（normalize）* 一个3D向量为单位向量。

```js
var a = [ 0, 4, -3 ]
normalize(a)
//=> [ 0, 0.8, -0.6 ]
```

这是 `归一化（normalize）` 函数，接收一个3D向量参数：

```js
function normalize(vec) {
  var x = vec[0]
  var y = vec[1]
  var z = vec[2]
  var squaredLength = x * x + y * y + z * z

  if (squaredLength > 0) {
    var length = Math.sqrt(squaredLength)
    vec[0] = vec[0] / length
    vec[1] = vec[1] / length
    vec[2] = vec[2] / length
  }
  return vec
}
```

其他实现：

- [gl-vec3/normalize](https://github.com/stackgl/gl-vec3/blob/507480fa57ba7c5fb70679cf531175a52c48cf53/normalize.js) 和 [gl-vec2/normalize](https://github.com/stackgl/gl-vec2/blob/21f460a371540258521fd2f720d80f14e87bd400/normalize.js)
- [vectors/normalize-nd](https://github.com/hughsk/vectors/blob/master/normalize-nd.js) (n-dimensional)

## 属于

集合理论中，“属于”符号 `∈` 和 `∋` 可以被用来描述某物是否为集合中的一个元素。例如：

![element1](http://latex.codecogs.com/svg.latex?A%3D%5Cleft%20%5C%7B3%2C9%2C14%7D%7B%20%5Cright%20%5C%7D%2C%203%20%5Cin%20A)

<!-- A=\left \{3,9,14}{  \right \}, 3 \in A -->

这里我们有一个数字集 *A* `{ 3, 9, 14 }` 而且我们说 `3` 是“属于”这个集合的。 

在ES5种一个简单的实现应该这样：

```js
var A = [ 3, 9, 14 ]

A.indexOf(3) >= 0
//=> true
```

然而，可以用只能保存唯一值的`Set`，这样更精确。这是ES6的一个特性。

```js
var A = new Set([ 3, 9, 14 ])

A.has(3)
//=> true
```

反向的 `∋` 意义相同，只是顺序改变：

![element2](http://latex.codecogs.com/svg.latex?A%3D%5Cleft%20%5C%7B3%2C9%2C14%7D%7B%20%5Cright%20%5C%7D%2C%20A%20%5Cni%203)

<!-- A=\left \{3,9,14}{  \right \}, A \ni 3 -->

你可以使用 "不属于" 符号 `∉` 和 `∌` 像这样：

![element3](http://latex.codecogs.com/svg.latex?A%3D%5Cleft%20%5C%7B3%2C9%2C14%7D%7B%20%5Cright%20%5C%7D%2C%206%20%5Cnotin%20A)

<!-- A=\left \{3,9,14}{  \right \}, 6 \notin A -->

## 常见数字集

你可能在一些公式中看见一些大[黑板粗体字](https://en.wikipedia.org/wiki/Blackboard_bold)。他们一般是用来描述集合的。

例如，我们可以描述 *k* 是[属于](#属于) `ℝ` 集的一个元素。

![real](http://latex.codecogs.com/svg.latex?k%20%5Cin%20%5Cmathbb%7BR%7D)

<!-- k \in \mathbb{R} -->

下边列出一些常见集和他们的符号。

#### `ℝ` 实数（real numbers）

大 `ℝ` 描述 *实数（real numbers）* 的集合。他们包括整数，有理数，无理数。

JavaScript认为整数和浮点数为相同类型，所以下边将是一个 *k* ∈ ℝ 的简单测试：

```js
function isReal (k) {
  return typeof k === 'number' && isFinite(k);
}
```

*注意：* 实数也是 *有限数（finite）*，*非无限的（not infinite）*

#### `ℚ` 有理数（rational numbers）

有理数是可以被表示为分数，或 *比率*（类似`⅗`）的实数。有理数不能以0作分母。

这意味着所有的整数都是有理数，因为可以看成分母为1。

换句话说无理数就是不能表示为比率的数，例如 π (PI)。

#### `ℤ` 整数（integers）

一个整数，是没有小数部分的实数。可为正也可以为负。

在JavaScript中的简单测试应该这样：

```js
function isInteger (n) {
  return typeof n === 'number' && n % 1 === 0
}
```

#### `ℕ` 自然数（natural numbers）

自然数是正整数或非负整数。取决于所学领域和上下文，集合中可能包含也可能不包含0，所以可以是下边任意一种集合。

```js
{ 0, 1, 2, 3, ... }
{ 1, 2, 3, 4, ... }
```

前者在计算机科学中更常见，例如：

```js
function isNaturalNumber (n) {
  return isInteger(n) && n >= 0
}
```

#### `ℂ` 复数

复数是实数与虚数的组合，被视为2D平面上的一个坐标。更详细的信息请看[A Visual, Intuitive Guide to Imaginary Numbers](http://betterexplained.com/articles/a-visual-intuitive-guide-to-imaginary-numbers/)。

## 函数

[函数](https://en.wikipedia.org/wiki/Function_%28mathematics%29) 是数学的基本特性，其概念很容易转换成代码。

函数把输入输出值联系起来。例如下边是一个函数：

![function1](http://latex.codecogs.com/svg.latex?x%5E%7B2%7D)

<!-- x^{2} -->

我们可以给函数一个 *名字* 。一般来说我们用  `ƒ` 来描述一个函数，但也可以命名为 `A(x)` 或其他什么。

![function2](http://latex.codecogs.com/svg.latex?f%5Cleft%20%28x%20%5Cright%20%29%20%3D%20x%5E%7B2%7D)

<!-- f\left (x  \right ) = x^{2} -->

在代码中，我们可以给函数命名为 `square` 写出来应该类似这样：

```js
function square (x) {
  return Math.pow(x, 2)
}
```

有时函数没有名字，而是直接写出输出值。

![function3](http://latex.codecogs.com/svg.latex?y%20%3D%20x%5E%7B2%7D)

<!-- y = x^{2} -->

在上边的例子中，*x* 是输入值，*y* 是输出值，他们是平方的关系。

像编程语言一样，函数也可以有多个参数。他们在数学中被称为 *arguments*，并且函数接受的参数数量被称为函数的 *arity* 。

![function4](http://latex.codecogs.com/svg.latex?f%28x%2Cy%29%20%3D%20%5Csqrt%7Bx%5E2%20&plus;%20y%5E2%7D)

<!-- f(x,y) = \sqrt{x^2 + y^2} -->

代码：

```js
function length (x, y) {
  return Math.sqrt(x * x + y * y)
}
```

### 分段函数

有些函数根据输入值 *x* 的不同会有不同的关系。

下边的函数 *f* 根据不同的输入值选择两个不同的“子函数”。

![piecewise1](http://latex.codecogs.com/svg.latex?f%28x%29%3D%20%5Cbegin%7Bcases%7D%20%5Cfrac%7Bx%5E2-x%7D%7Bx%7D%2C%26%20%5Ctext%7Bif%20%7D%20x%5Cgeq%201%5C%5C%200%2C%20%26%20%5Ctext%7Botherwise%7D%20%5Cend%7Bcases%7D)

<!--    f(x)= 
\begin{cases}
    \frac{x^2-x}{x},& \text{if } x\geq 1\\
    0, & \text{otherwise}
\end{cases} -->

这非常接近于代码中的`if` / `else`。右边的条件经常被写为**"for x < 0"** 或 **"if x = 0"**。如果条件为true，就使用其左边的函数。

在分段函数中，**"otherwise"** 和 **"elsewhere"** 类似于代码中的 `else` 。

```js
function f (x) {
  if (x >= 1) {
    return (Math.pow(x, 2) - x) / x
  } else {
    return 0
  }
}
```

### 通用函数

有些函数名在数学中是普遍存在的。在一个程序员的角度看，这些应该类似于编程语言中的“内置”函数（就像JavaScript中的 `parseInt` ）。

一个例子就是 *sgn* 函数。这是 *正负号* 函数，或者叫 *符号* 函数。让我们用[分段函数](#分段函数)来描述它：

![sgn](http://latex.codecogs.com/svg.latex?sgn%28x%29%20%3A%3D%20%5Cbegin%7Bcases%7D%20-1%26%20%5Ctext%7Bif%20%7D%20x%20%3C%200%5C%5C%200%2C%20%26%20%5Ctext%7Bif%20%7D%20%7Bx%20%3D%200%7D%5C%5C%201%2C%20%26%20%5Ctext%7Bif%20%7D%20x%20%3E%200%5C%5C%20%5Cend%7Bcases%7D)

<!-- sgn(x) := 
\begin{cases}
    -1& \text{if } x < 0\\
    0, & \text{if } {x = 0}\\
    1, & \text{if } x > 0\\
\end{cases} -->

代码中，应该这样：

```js
function sgn (x) {
  if (x < 0) return -1
  if (x > 0) return 1
  return 0
}
```

此函数作为独立的module在这里[signum](https://github.com/scijs/signum)。

其他类似函数的例子还有: *sin*， *cos*， *tan*。

### 函数符号

在某些著作中，函数可以被更明确的符号定义。例如，让我们回到之前提到的 `square` 函数。

![function2](http://latex.codecogs.com/svg.latex?f%5Cleft%20%28x%20%5Cright%20%29%20%3D%20x%5E%7B2%7D)

<!-- f\left (x  \right ) = x^{2} -->

也可以写为以下形式：

![mapsto](http://latex.codecogs.com/svg.latex?f%20%3A%20x%20%5Cmapsto%20x%5E2)

<!-- f : x \mapsto x^2 -->

带尾巴的箭头通常意思为“映射到”，如，*将x映射到x<sup>2</sup>*

有时，不是很常见，这个符号也用来描述函数的 *domain* 和 *codomain*。对 *ƒ* 更正式的定义可以写为：

![funcnot](http://latex.codecogs.com/svg.latex?%5Cbegin%7Balign*%7D%20f%20%3A%26%5Cmathbb%7BR%7D%20%5Crightarrow%20%5Cmathbb%7BR%7D%5C%5C%20%26x%20%5Cmapsto%20x%5E2%20%5Cend%7Balign*%7D)

<!-- \begin{align*}
f :&\mathbb{R} \rightarrow \mathbb{R}\\
&x \mapsto x^2 
\end{align*}
 -->

函数的 *domain* 和 *codomain* 分别跟他的 *input* 和 *output* 类型有点像。这里有另一个例子，使用了我们之前输出整数的 *sgn* 函数。

![domain2](http://latex.codecogs.com/svg.latex?sgn%20%3A%20%5Cmathbb%7BR%7D%20%5Crightarrow%20%5Cmathbb%7BZ%7D)

<!-- sgn : \mathbb{R} \rightarrow \mathbb{Z} -->

这里的箭头（没有尾巴）用来映射一个 *集合* 到另一个。

在JavaScript和其他动态类型语言中，你也许会用文档 和/或 运行时检查来解释和验证函数的输入/输出。例子：

```js
/**
 * Squares a number.
 * @param  {Number} a real number
 * @return {Number} a real number
 */
function square (a) {
  if (typeof a !== 'number') {
    throw new TypeError('expected a number')
  }
  return Math.pow(a, 2)
}
```

有些工具例如[flowtype](http://flowtype.org/)尝试将静态类型带入到JavaScript中。

其他语言，例如Java，允许真正的方法重载（overloading），它们基于函数输入输出的静态类型。这更接近于数学领域：使用不同 *domain* 的两个函数是不同的。

## 撇号（prime）

撇号 (`′`) 通常用在变量名上，用来描述某物很类似，而不用另起个名来描述它。也可以描述经过一些变换后的“下一个值”。

例如，如果我们有一个2D点 *(x, y)* ，然后旋转它，你会把旋转后的点命名为*(x′, y′)*。 或者将矩阵 **M** 的 *转置矩阵* 命名为 **M′**。

在代码中，我们通常的分配一个描述更详细的变量名，例如`transformedPosition`。

对于一个[函数](#函数)，撇号通常描述为函数的 *导函数（derivative）* 。导函数会在未来的章节解释。我们来看一个之前的函数：

![function2](http://latex.codecogs.com/svg.latex?f%5Cleft%20%28x%20%5Cright%20%29%20%3D%20x%5E%7B2%7D)

<!-- f\left (x  \right ) = x^{2} -->

它的导函数（derivative）可以写为一个带撇号`′`的函数：

![prime1](http://latex.codecogs.com/svg.latex?f%27%28x%29%20%3D%202x)

<!-- f'(x) = 2x -->

代码：

```js
function f (x) {
  return Math.pow(x, 2)
}

function fPrime (x) {
  return 2 * x
}
```

使用多个撇号可以用来表示 二阶导函数（derivative） *ƒ′′* 或 三阶导函数（derivative）*ƒ′′′* ，之后更高的数字，一般作者会用罗马数字 *ƒ*<sup>IV</sup> 或上标数字 *ƒ*<sup>(n)</sup> 表示。

## 向下取整和向上取整（floor & ceiling）

`⌊x⌋` 和 `⌈x⌉` 这种特殊的括号分别用来表示*floor* 和 *ceil* 函数。 

![floor](http://latex.codecogs.com/svg.latex?floor%28x%29%20%3D%20%5Clfloor%20x%20%5Crfloor)

<!-- floor(x) =  \lfloor x \rfloor -->

![ceil](http://latex.codecogs.com/svg.latex?ceil%28x%29%20%3D%20%5Clceil%20x%20%5Crceil)

<!-- ceil(x) =  \lceil x \rceil -->

代码：

```js
Math.floor(x)
Math.ceil(x)
```

当这两个符号混合`⌊x⌉`，它通常表示一个取整到最近的整数的函数。

![round](http://latex.codecogs.com/svg.latex?round%28x%29%20%3D%20%5Clfloor%20x%20%5Crceil)

<!-- round(x) =  \lfloor x \rceil -->

代码：

```js
Math.round(x)
```

## 箭头

箭头通常用来表示[函数符号](#函数符号)。这里还有一些在其他领域中的用法可以看看。

#### 实质蕴含（material implication）

`⇒` 和 `→` 优势被用作表示实质蕴涵（material implication）的逻辑。意思是如果A是true，那么B也是true。

![material1](http://latex.codecogs.com/svg.latex?A%20%5CRightarrow%20B)

<!-- A \Rightarrow B -->

解释为代码应该为：

```js
if (A === true) {
  console.assert(B === true)
}
```

箭头可以是左右任何方向 `⇐` `⇒`，也可以双向`⇔`。当 *A ⇒ B* 并且 *B ⇒ A*，就是他们是相等的：

![material-equiv](http://latex.codecogs.com/svg.latex?A%20%5CLeftrightarrow%20B)

<!-- A \Leftrightarrow B -->

#### 等式（equality）

在数学中， `<` `>` `≤` 和 `≥` 与代码中的使用方法一样：分别为 *小于*, *大于*, *小于等于* 和 *大于等于*。

```js
50 > 2 === true
2 < 10 === true
3 <= 4 === true
4 >= 4 === true
```

偶尔会看到在这些符号上加了一条斜线，来表示 *不*，比如， *k* 不 "大于" *j*.

![ngt](http://latex.codecogs.com/svg.latex?k%20%5Cngtr%20j)

<!-- k \ngtr j -->

 `≪` 和 `≫`通常用来表示 *明显（significant）* 不相等。这是说 *k* 是有[数量级（order of magnitude）](https://en.wikipedia.org/wiki/Order_of_magnitude)的大于 *j*。

![orderofmag](http://latex.codecogs.com/svg.latex?k%20%5Cgg%20j)

<!-- k \gg j -->

在数学中，*数量级（order of magnitude）* 是相当明确的；不只是“相当大的不同”而已。上边的一个简单例子：

```js
orderOfMagnitude(k) > orderOfMagnitude(j)
```

下边是我们的 `orderOfMagnitude` 函数，使用了[Math.trunc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) (ES6)。

```js
function log10(n) {
  // logarithm in base 10
  return Math.log(n) / Math.LN10
}

function orderOfMagnitude (n) {
  return Math.trunc(log10(n))
}
```

<sup>*Note:* This is not numerically robust.</sup>

这里是在ES5下使用[math-trunc](https://www.npmjs.com/package/math-trunc) 的polyfill。

#### 与（conjunction） & 或（disjunction）

另一种箭头在逻辑中的使用是与（conjunction）`∧` 和 或（disjunction） `∨`。他们分别类似于程序员的 `AND` 和 `OR`操作。

下边展示了与（conjunction）`∧`， 逻辑中的`AND`.

![and](http://latex.codecogs.com/svg.latex?k%20%3E%202%20%5Cland%20k%20%3C%204%20%5CLeftrightarrow%20k%20%3D%203)

<!-- k > 2 \land k <  4 \Leftrightarrow k = 3   -->

在JavaScript中，我们使用 `&&` 假设 *k* 是一个自然数，那么这个逻辑意味着k等于3：

```js
if (k > 2 && k < 4) {
  console.assert(k === 3)
}
```

由于双边都相等 `⇔`，所以也说明下边成立：

```js
if (k === 3) {
  console.assert(k > 2 && k < 4)
}
```

下箭头 `∨` 是逻辑或（disjunction），就像 OR 操作符一样。

![logic-or](http://latex.codecogs.com/svg.latex?A%20%5Clor%20B)

<!-- A \lor B -->

代码：

```js
A || B
```

## 逻辑非（logical negation）

有时候，`¬`, `~` 和 `!` 符号都用来表示逻辑 `NOT`。例如，只有在A为false的时候，*¬A* 为true。

这里是一个使用 *not* 符号简单的例子：

![negation](http://latex.codecogs.com/svg.latex?x%20%5Cneq%20y%20%5CLeftrightarrow%20%5Clnot%28x%20%3D%20y%29)

<!-- x \neq y \Leftrightarrow \lnot(x = y) -->

翻译成代码的例子：

```js
if (x !== y) {
  console.assert(!(x === y))
}
```

*注意：* 根据上下文的不同，波浪线 `~` 可以有很多种不同的意思。例如，*行等价（row equivalence）*（矩阵理论）或*相同数量级（same order of magnitude）* （在[等式（equality）](#等式equality)章节讨论过）。

## 区间（intervals）

有时函数会处理被一些值限定范围的实数，这样的约束可以用*区间（interval）*来表示。

例如我们可以表示0和1之间的数，让他们包含或不包含0和1：

- 不包含0或1： ![interval-opened-left-opened-right](http://latex.codecogs.com/svg.latex?%280%2C%201%29)

<!-- (0, 1) -->

- 包含0但不包含1： ![interval-closed-left-opened-right](http://latex.codecogs.com/svg.latex?%5B0%2C%201%29)

<!-- [0, 1) -->

- 不包含0但包含1： ![interval-opened-left-closed-right](http://latex.codecogs.com/svg.latex?%280%2C%201%5D)

<!-- (0, 1] -->

- 包含0和1： ![interval-closed-left-closed-right](http://latex.codecogs.com/svg.latex?%5B0%2C%201%5D)

<!-- [0, 1] -->

例如我们指出一个点 `x` 在3D单位立方体中，我们可以说：

![interval-unit-cube](http://latex.codecogs.com/svg.latex?x%20%5Cin%20%5B0%2C%201%5D%5E3)

<!-- x \in [0, 1]^3 -->

在代码中我们可以用两个元素大小的一维数组表示区间：

```js
var nextafter = require('nextafter')

var a = [nextafter(0, Infinity), nextafter(1, -Infinity)]     // 开区间
var b = [nextafter(0, Infinity), 1]                           // 左闭右开区间
var c = [0, nextafter(1, -Infinity)]                          // 左开右闭区间
var d = [0, 1]                                                // 闭区间
```

区间与集合运算结合符使用：

- *交集（intersection）* e.g. ![interval-intersection](http://latex.codecogs.com/svg.latex?%5B3%2C%205%29%20%5Ccap%20%5B4%2C%206%5D%20%3D%20%5B4%2C%205%29)

<!-- [3, 5) \cap [4, 6] = [4, 5) -->

- *并集（union）* e.g. ![interval-union](http://latex.codecogs.com/svg.latex?%5B3%2C%205%29%20%5Ccup%20%5B4%2C%206%5D%20%3D%20%5B3%2C%206%5D)

<!-- [3, 5) \cup [4, 6] = [3, 6] -->

- *差集（difference）* e.g. ![interval-difference-1](http://latex.codecogs.com/svg.latex?%5B3%2C%205%29%20-%20%5B4%2C%206%5D%20%3D%20%5B3%2C%204%29) 还有 ![interval-difference-2](http://latex.codecogs.com/svg.latex?%5B4%2C%206%5D%20-%20%5B3%2C%205%29%20%3D%20%5B5%2C%206%5D)

<!-- [3, 5) - [4, 6] = [3, 4) -->
<!-- [4, 6] - [3, 5)  = [5, 6] -->

代码:

```js
var Interval = require('interval-arithmetic')
var nextafter = require('nextafter')

var a = Interval(3, nextafter(5, -Infinity))
var b = Interval(4, 6)

Interval.intersection(a, b)
// {lo: 4, hi: 4.999999999999999}

Interval.union(a, b)
// {lo: 3, hi: 6}

Interval.difference(a, b)
// {lo: 3, hi: 3.9999999999999996}

Interval.difference(b, a)
// {lo: 5, hi: 6}
```

见：

- [next-after](https://github.com/scijs/nextafter) 
- [interval-arithmetic](https://github.com/maurizzzio/interval-arithmetic)

## 更多...

喜欢这份指南？提出[更多的特性](https://github.com/Jam3/math-as-code/issues/1)的建议或给我们发Pull Request！

## 贡献

关于怎样贡献详见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## License

MIT, 详见 [LICENSE.md](http://github.com/Jam3/math-as-code/blob/master/LICENSE.md)。

[1]: http://mimosa-pudica.net/improved-oren-nayar.html#images
[2]: http://buzzard.ups.edu/courses/2007spring/projects/million-paper.pdf
[3]: https://www.math.washington.edu/~morrow/464_12/fft.pdf
