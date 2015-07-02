# math-as-code

This is a reference to ease developers into mathematical notation by showing comparisons with JavaScript code.

Motivation: Academic papers can be intimidating for self-taught game and graphics programmers. :) 

This guide is not yet finished. If you see errors or want to contribute, please [open a ticket](https://github.com/Jam3/math-as-code/issues) or send a PR.

> **Note**: For brevity, some code examples make use of [npm packages](https://www.npmjs.com/). You can refer to their GitHub repos for implementation details.

# foreword

Mathematical symbols can mean different things depending on context and the field of study (linear algebra, set theory, etc). This guide may not cover *all* uses of a symbol, but PRs are welcome.

For a more complete list, refer to [Wikipedia - List of Mathematical Symbols](https://en.wikipedia.org/wiki/List_of_mathematical_symbols). 

For simplicity, many of the code examples here operate on floating point values and are not numerically robust. For more details on why this may be a problem, see [Robust Arithmetic Notes](https://github.com/mikolalysenko/robust-arithmetic-notes) by Mikola Lysenko.

# contents

- [variable name conventions](#variable-name-conventions)
- [equals `=` `≈` `≠` `=:`](#equals-symbols)
- [dot & cross `∙` `×` `∘`](#dot--cross)
  - [scalar multiplication](#scalar-multiplication)
  - [vector multiplication](#vector-multiplication)
  - [dot product](#dot-product)
  - [cross product](#cross-product)
- [sigma `Σ`](#sigma) - *summation*
- [capital Pi `Π`](#capital-pi) - *products of sequences*
- [pipes `||`](#pipes)
  - [absolute](#absolute)
  - [Euclidean norm](#euclidean-norm)
  - [determinant](#determinant)
- [hat **`â`**](#hat) - *unit vector*
- ["element of" `∈` `∉`](#element)
- [function `ƒ`](#function)
  - [piecewise function](#piecewise-function)
- [prime `′`](#prime)
- [quantifiers `∀` `∃` `¬`](#quantifiers)
- [more...](#more)

## variable naming conventions

There are a variety of naming conventions depending on the context and field of study, and they are not always consistent. However, in some of the literature you may find variable names to follow a pattern like so:

- *s* - italic lowercase letters for scalars (e.g. a number)
- **x** - bold lowercase letters for vectors (e.g. a 2D point)
- **A** - bold uppercase letters for matrices (e.g. a 3D transformation)
- *θ* - italic lowercase Greek letters for constants and special variables (e.g. [polar angle *θ*, *theta*](https://en.wikipedia.org/wiki/Spherical_coordinate_system))

This will also be the format of this guide.

## equals symbols

There are a number of symbols resembling the equals sign `=`. Here are three common examples:

- `=` is for equality (values are the same)
- `≠` is for inequality (value are not the same)
- `≈` is for approximately equal to (`π ≈ 3.14159`)

In JavaScript:

```js
// equality
2 === 3

// inequality
2 !== 3

// approximately equal
almostEqual(Math.PI, 3.14159, 1e-5)

function almostEqual(a, b, epsilon) {
  return Math.abs(a - b) <= epsilon
}
```

In mathematics, the `:=` `=:` and `=` symbols are used for *definition*. The following defines *x* to be another name for 2*kj*.

![equals1](img/equals1.png)

<!-- x = 2kj -->

In code, we can use `=` to *define* our variables and provide aliases. The above defines the following:

```js
var x = 2 * k * j
```

```js
var k = x / (2 * j)
```

```js
var j = x / (2 * k)
```

<!--

///// Need a code sample?
///// Maybe better suited in another place?

The `≅` symbol is for [*congruence*](https://en.wikipedia.org/wiki/Congruence_%28geometry%29). For example, here the line segment AB is congruent with the segment CD.

![equals2](img/equals2.png)

 \bar{AB} \cong \bar{CD} -->

## dot & cross

The dot `∙` and cross `×` symbols have different uses depending on context.

They might seem obvious, but it's important to understand the subtle differences before we continue into other sections.

#### scalar multiplication

Both symbols can represent simple multiplication of scalars. The following are equivalent:

![dotcross1](img/dotcross1.png)

In programming languages we tend to use asterisk for multiplication:

```js
var result = 3 * 4
```

With adjacent letter variables, the multiplication sign is typically omitted.

![dotcross2](img/dotcross2.png)

If these variables represent scalars, the code would be:

```js
var result = 3 * k * j
```

#### vector multiplication

To denote multiplication of one vector with a scalar, or element-wise multiplication of a vector with another vector, we do not use the dot `∙` or cross `×` symbols. These have different meanings in linear algebra, discussed shortly.

Let's take our earlier example but apply it to vectors. For element-wise vector multiplication, you might often see an open dot `∘` to represent the [Hadamard product](https://en.wikipedia.org/wiki/Hadamard_product_%28matrices%29).

![dotcross3](img/dotcross3.png)

<!-- 3\mathbf{k}\circ\mathbf{j} -->

Here is how it would look in code, using arrays `[x, y]` to represent the 2D vectors.

```js
var s = 3
var k = [ 1, 2 ]
var j = [ 2, 3 ]

var tmp = multiply(k, j)
var result = multiplyScalar(tmp, s)
//=> [ 6, 18 ]
```

Our `multiply` and `multiplyScalar` functions look like this:

```js
function multiply(a, b) {
  return [ a[0] * b[0], a[1] * b[1] ]
}

function multiplyScalar(a, scalar) {
  return [ a[0] * scalar, a[1] * scalar ]
}
```

Similarly, matrix multiplication typically does not use the dot `∙` or cross symbol `×`. Matrix multiplication will be covered in a later section.

#### dot product

The dot symbol `∙` can be used to denote the [*dot product*](https://en.wikipedia.org/wiki/Dot_product) of two vectors. Sometimes this is called the *scalar product* since it evaluates to a scalar.

![dotcross4](img/dotcross4.png)

<!-- \mathbf{k}\cdot \mathbf{j} -->

It is a very common feature of linear algebra, and with a 3D vector it might look like this:

```js
var k = [ 0, 1, 0 ]
var j = [ 1, 0, 0 ]

var d = dot(k, j)
//=> 0
```

The result `0` tells us our vectors are perpendicular. Our `dot` function:

```js
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
```

#### cross product

The cross symbol `×` can be used to denote the [*cross product*](https://en.wikipedia.org/wiki/Cross_product) of two vectors.

![dotcross5](img/dotcross5.png)

<!-- \mathbf{k}\times \mathbf{j} -->

In code, it would look like this:

```js
var k = [ 0, 1, 0 ]
var j = [ 1, 0, 0 ]

var result = cross(k, j)
//=> [ 0, 0, -1 ]
```

Here, we get `[ 0, 0, -1 ]`, which is perpendicular to both **k** and **j**.

Our `cross` function:

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

For other implementations of vector multiplication, cross product, and dot product:

- [gl-vec3](https://github.com/stackgl/gl-vec3)
- [gl-vec2](https://github.com/stackgl/gl-vec2)
- [vectors](https://github.com/hughsk/vectors) - includes n-dimensional

## sigma 

The big Greek "E" (Sigma) is for [Summation](https://en.wikipedia.org/wiki/Summation). In other words: summing up some numbers.

![sigma](img/sigma1.png)

Here, `i=1` says to start at `1` and end at the number above the Sigma, `100`. These are the lower and upper bounds, respectively. The *i* to the right of the "E" tells us what we are summing. In code:

```js
var sum = 0
for (var i = 1; i <= 100; i++) {
  sum += i
}
```

The result of `sum` is `5050`.

**Tip:** With whole numbers, this particular pattern can be optimized to the following:

```js
var n = 100 // upper bound
var sum = (n * (n + 1)) / 2
```

Here is another example where the *i*, or the "what to sum," is different:

![sum2](img/sigma2.png)

In code:

```js
var sum = 0
for (var i = 1; i <= 100; i++) {
  sum += (2 * i + 1)
}
```

The result of `sum` is `10200`.

The notation can be nested, which is much like nesting a `for` loop. You should evaluate the right-most sigma first, unless the author has enclosed them in parentheses to alter the order. 

![sigma3](img/sigma3.png)

In code:

```js
var sum = 0
for (var i = 1; i <= 2; i++) {
  for (var j = 4; j <= 6; j++) {
    sum += (3 * i * j)
  }
}
```

Here, `sum` will be `135`.

## capital Pi

The capital Pi or "Big Pi" is very similar to [Sigma](#sigma), except we are using multiplication to find the "products of sequences." 

Take the following:

![capitalPi](img/capital-pi1.png)

In code, it might look like this:

```js
var n = 6
var value = 1
for (var i = 1; i <= n; i++) {
  value *= i
}
```

Where `value` will evaluate to `720`.

## pipes

Pipe symbols, known as *bars*, can mean different things depending on the context. Below are three common uses: [absolute](#absolute), [Euclidean norm](#euclidean-norm), and [determinant](#determinant).

These three features all describe the *length* of an object.

#### absolute 

![pipes1](img/pipes1.png)

For a number *x*, `|x|` means the absolute of *x*. In code:

```js
var x = -5
var result = Math.abs(x)
// => 5
```

#### Euclidean norm

![pipes4](img/pipes4.png)

<!-- \left \| \mathbf{v} \right \| -->

For a vector **v**, `‖v‖` is the [Euclidean norm](https://en.wikipedia.org/wiki/Norm_%28mathematics%29#Euclidean_norm) of **v**. It is also referred to as the "magnitude" or "length" of a vector.

Often this is represented by double-bars to avoid ambiguity with the *absolute* notation, but sometimes you may see it with single bars:

![pipes2](img/pipes2.png)

<!-- \left | \mathbf{v} \right | -->

Here is an example using an array `[x, y, z]` to represent a 3D vector.

```js
var v = [ 0, 4, -3 ]
length(v)
//=> 5
```

The `length` function:

```js
function length (vec) {
  var x = vec[0]
  var y = vec[1]
  var z = vec[2]
  return Math.sqrt(x * x + y * y + z * z)
}
```

Other implementations:

- [magnitude](https://github.com/mattdesl/magnitude/blob/864ff5a7eb763d34bf154ac5f5332d7601192b70/index.js) - n-dimensional
- [gl-vec2/length](https://github.com/stackgl/gl-vec2/blob/21f460a371540258521fd2f720d80f14e87bd400/length.js) - 2D vector
- [gl-vec3/length](https://github.com/stackgl/gl-vec3/blob/507480fa57ba7c5fb70679cf531175a52c48cf53/length.js) - 3D vector

#### determinant

![pipes3](img/pipes3.png)

<!-- \left |\mathbf{A}  \right | -->

For a matrix **A**, `|A|` means the [determinant](https://en.wikipedia.org/wiki/Determinant) of matrix **A**.

Here is an example computing the determinant of a 2x2 matrix, represented by a flat array in column-major format.

```js
var determinant = require('gl-mat2/determinant')

var matrix = [ 1, 0, 0, 1 ]
var det = determinant(matrix)
//=> 1
```

Implementations:

- [gl-mat4/determinant](https://github.com/stackgl/gl-mat4/blob/c2e2de728fe7eba592f74cd02266100cc21ec89a/determinant.js) - also see [gl-mat3](https://github.com/stackgl/gl-mat3) and [gl-mat2](https://github.com/stackgl/gl-mat2)
- [ndarray-determinant](https://www.npmjs.com/package/ndarray-determinant)
- [glsl-determinant](https://www.npmjs.com/package/glsl-determinant)
- [robust-determinant](https://www.npmjs.com/package/robust-determinant)
- [robust-determinant-2](https://www.npmjs.com/package/robust-determinant-2) and [robust-determinant-3](https://www.npmjs.com/package/robust-determinant-3), specifically for 2x2 and 3x3 matrices, respectively

## hat

In geometry, the "hat" symbol above a character is used to represent a [unit vector](https://en.wikipedia.org/wiki/Unit_vector). For example, here is the unit vector of **a**:

![hat](img/hat.png)

<!-- \hat{\mathbf{a}} -->

In cartesian space, a unit vector is typically length 1. That means each part of the vector will be in the range of -1.0 to 1.0. Here we *normalize* a 3D vector into a unit vector:

```js
var a = [ 0, 4, -3 ]
normalize(a)
//=> [ 0, 0.8, -0.6 ]
```

Here is the `normalize` function, operating on 3D vectors:

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

Other implementations:

- [gl-vec3/normalize](https://github.com/stackgl/gl-vec3/blob/507480fa57ba7c5fb70679cf531175a52c48cf53/normalize.js) and [gl-vec2/normalize](https://github.com/stackgl/gl-vec2/blob/21f460a371540258521fd2f720d80f14e87bd400/normalize.js)
- [vectors/normalize-nd](https://github.com/hughsk/vectors/blob/master/normalize-nd.js) (n-dimensional)

## element

In set theory, the "element of" symbol `∈` and `∋` can be used to describe whether something is an element of a set. For example:

![element1](img/element1.png)

<!-- A=\left \{3,9,14}{  \right \}, 3 \in A -->

Here we have a set of numbers *A* `{ 3, 9, 14 }` and we are saying `3` is an "element of" that set. 

A simple implementation in ES5 might look like this:

```js
var A = [ 3, 9, 14 ]

A.indexOf(3) >= 0
//=> true
```

However, it would be more accurate to use a `Set` which only holds unique values. This is a feature of ES6.

```js
var A = new Set([ 3, 9, 14 ])

A.has(3)
//=> true
```

The backwards `∋` is the same, but the order changes:

![element2](img/element2.png)

<!-- A=\left \{3,9,14}{  \right \}, A \ni 3 -->

You can also use the "not an element of" symbols `∉` and `∌` like so:

![element3](img/element3.png)

<!-- A=\left \{3,9,14}{  \right \}, 6 \notin A -->

## function

[Functions](https://en.wikipedia.org/wiki/Function_%28mathematics%29) are fundamental features of mathematics, and the concept is fairly easy to translate into code.

A function relates an input to an output value. For example, the following is a function:

![function1](img/function1.png)

<!-- x^{2} -->

We can give this function a *name*. Commonly, we use `ƒ` to describe a function, but it could be named `A(x)` or anything else.

![function2](img/function2.png)

<!-- f\left (x  \right ) = x^{2} -->

In code, we might name it `square` and write it like this:

```js
function square (x) {
  return Math.pow(x, 2)
}
```

Sometimes a function is not named, and instead the output is written.

<!-- y = x^{2} -->

![function3](img/function3.png)

In the above example, *x* is the input, the relationship is *squaring*, and *y* is the output.

Functions can also have multiple parameters, like in a programming language. These are known as *arguments* in mathematics, and the number of arguments a function takes is known as the *arity* of the function.

![function4](img/function4.png)

<!-- f(x,y) = \sqrt{x^2 + y^2} -->

In code:

```js
function length (x, y) {
  return Math.sqrt(x * x + y * y)
}
```

### piecewise function

Some functions will use different relationships depending on the input value, *x*.

The following function *ƒ* chooses between two "sub functions" depending on the input value.

![piecewise1](http://latex.codecogs.com/svg.latex?f%28x%29%3D%20%5Cbegin%7Bcases%7D%20%5Cfrac%7Bx%5E2-x%7D%7Bx%7D%2C%26%20%5Ctext%7Bif%20%7D%20x%5Cgeq%201%5C%5C%200%2C%20%26%20%5Ctext%7Botherwise%7D%20%5Cend%7Bcases%7D)

<!--    f(x)= 
\begin{cases}
    \frac{x^2-x}{x},& \text{if } x\geq 1\\
    0, & \text{otherwise}
\end{cases} -->

This is very similar to `if` / `else` in code. The rightside conditions are often written as **"for x < 0"** or **"if x = 0"**. If the condition is true, the function to the left is used.

In piecewise functions, **"otherwise"** and **"elsewhere"** are analogous to the `else` statement in code.

```js
function f (x) {
  if (x >= 1) {
    return (Math.pow(x, 2) - x) / x
  } else {
    return 0
  }
}
```

## prime

The prime symbol (`′`) is often used in variable names to describe things which are similar, without giving it a different name altogether. It can describe the "next value" after some transformation.

For example, if we take a 2D point *(x, y)* and rotate it, you might name the result *(x′, y′)*. Or, the *transpose* of matrix **M** might be named **M′**.

In code, we typically just assign the variable a more descriptive name, like `transformedPosition`.

For a mathematical [function](#function), the prime symbol often describes the *derivative* of that function. Derivatives will be explained in a future section. Let's take our earlier function:

![function2](img/function2.png)

<!-- f\left (x  \right ) = x^{2} -->

Its derivative could be written with a prime `′` symbol:

![prime1](img/prime1.png)

<!-- f'(x) = 2x -->

In code:

```js
function f (x) {
  return Math.pow(x, 2)
}

function fPrime (x) {
  return 2 * x
}
```

Multiple prime symbols can be used to describe the second derivative *ƒ′′* and third derivative *ƒ′′′*. After this, authors typically express higher orders with roman numerals *ƒ*<sup>IV</sup> or superscript numbers *ƒ*<sup>(n)</sup>.

## quantifiers

Quantifiers are symbols used in mathematical logic statements, such as theorems and proofs. They show up all the time in mathematics. They stand in place of natural, or "human", language phrases.

Quantifiers are usually chained together to create powerful mathematical statements.

They usually look like this:

![quantifiers](http://latex.codecogs.com/svg.latex?%5C%5C%20%5Cforall%20x%20%5Cin%20S%3A%20p%28x%29%5C%5C%20%5Cexists%20y%20%5Cin%20S%3A%20p%28y%29%5C%5C%20z%20%5Cin%20S%2C%20%5Cneg%20p%28z%29)

<!--
\\
\forall x \in S: p(x)\\
\exists y \in S: p(y)\\
z \in S, \neg p(z)
-->

In plain English, the variable is just some element in the set. It can be whatever you like. A predicate is a `function` that takes input(s) and returns a Boolean (`true` or `false`). Take a college-level math course or talk to a mathematician if you want to know more.

For example:

![quantifiers example](http://latex.codecogs.com/svg.latex?%5Cforall%20x%20%5Cin%20%5Ctext%7B%20range%20%7D%20R%20%28%3D%20%280%2C1%29%20%5Csubset%20%5Cmathbb%7BR%7D%29%3A%20%5Cneg%20%5Cexists%20y%20%5Cin%20R%3A%20x%20*%20y%20%3E%201)

This basically states that:
* Let `R` be a range of real numbers from 0 to 1 (non-inclusive)
* Pick any number in `R`, and call it `x`
* It is impossible to find any number `y` in `R` such that `x * y > 1`

If I were to write this as (pseudo-)code it would look like the following:

```js
let claim = forAll(R, function(x) {
  let subclaim = forSome(R, function(y) {
    return x * y > 1
  })

  return !subclaim
})

assert(claim)
```

Here's a run-down of what they mean in plain English:

* `∀`: For __All__
* `∃`: For some, there __Exists__
* `¬`: __Not__, it is false that ...

Now for the code (using ES6/Harmony):

```js
//"For all"
function forAll(setOfThings, predicate) {
  return Array.from(setOfThings).every(predicate)
}

//Or more explicitly...
function forAllParentalAdvisory(setOfThings, predicate) {
  for (let element of setOfThings) {
    if (predicate(element) === false) {
      return false
    }
  }

  return true
}

//"For some" or "there exists"
function forSome(setOfThings, predicate) {
  return Array.from(setOfThings).some(predicate)
}

//"Not" or "negation" -> just use good old `!`
```

## more...

Like this guide? Suggest some [more features](https://github.com/Jam3/math-as-code/issues/1) or send us a Pull Request!

## License

MIT, see [LICENSE.md](http://github.com/Jam3/math-as-code/blob/master/LICENSE.md) for details.
