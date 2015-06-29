# math-as-code

This is a reference to ease developers into mathematical notation by showing comparisons with JavaScript code.

Motivation: Academic papers can be intimidating for self-taught graphics programmers. :) 

This guide is not yet finished. If you see errors or want to contribute, please [open a ticket](https://github.com/Jam3/math-as-code/issues) or send a PR.

> **Note**: For brevity, some code examples make use of [npm packages](https://www.npmjs.com/). You can refer to their GitHub repos for implementation details.

# contents

- [sigma](#sigma) - *summation*
- [capital Pi](#capital-pi) - *products of sequences*
- [pipes](#pipes)
  - [absolute](#absolute)
  - [Euclidean norm](#euclidean-norm)
  - [determinant](#determinant)
- [hat](#hat) - *unit vector*
- [more...](#more)

### sigma

The big Greek "E" (Sigma) is for [Summation](https://en.wikipedia.org/wiki/Summation). In other words: summing up some numbers.

![sigma](img/sigma1.png)

Here, `i=1` says to start at `1` (lower bound) and end at `100` (upper bound). The `i` to the right of the "E" tells us what we are summing. In code:

```js
var n = 100
var sum = 0
for (var i = 1; i <= n; i++) {
  sum += i
}
```

The result of `sum` is `5050`.

**Tip:** With whole numbers, this particular pattern can be optimized to the following:

```js
var n = 100
var sum = (n * (n + 1)) / 2
```

Here is another example where the `i`, or the "what to sum", is different:

![sum2](img/sigma2.png)

In code:

```js
var n = 4
var sum = 0
for (var i = 1; i <= n; i++) {
  sum += (2 * i + 1)
}
```

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

### capital Pi

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

Pipes can mean different things depending on the context. Below are three common forms.

#### absolute 

![pipes1](img/pipes1.png)

For a number *x*, `| x |` means the absolute of *x*. In code:

```js
var x = -5
var result = Math.abs(x)
// => 5
```

#### euclidean norm

![pipes2](img/pipes2.png)

For a vector *v*, `| v |` means the [Euclidean norm](https://en.wikipedia.org/wiki/Norm_%28mathematics%29#Euclidean_norm) of *v*. It is also referred to as the "magnitude" or "length" of a vector.

Sometimes this is represented by double-pipes to avoid ambiguity with *absolute* notation. For example:

![pipes4](img/pipes4.png)

Here is an example using an `[x, y, z]` array to represent a 3D vector.

```js
var v = [ 0, 4, -3 ]
length(v)
//=> 5
```

The `length` function:

```js
function length (a) {
  var x = a[0],
      y = a[1],
      z = a[2]
  return Math.sqrt(x*x + y*y + z*z)
}
```

Other implementations:

- [magnitude](https://github.com/mattdesl/magnitude/blob/864ff5a7eb763d34bf154ac5f5332d7601192b70/index.js) - n-dimensional
- [gl-vec2/length](https://github.com/stackgl/gl-vec2/blob/21f460a371540258521fd2f720d80f14e87bd400/length.js) - 2D vector
- [gl-vec3/length](https://github.com/stackgl/gl-vec3/blob/507480fa57ba7c5fb70679cf531175a52c48cf53/length.js) - 3D vector

#### determinant

![pipes3](img/pipes3.png)

For a matrix *A*, `| A |` means the [determinant](https://en.wikipedia.org/wiki/Determinant) of matrix *A*.

Here is an example computing the determinant of a 2x2 matrix, represented by a flat array in column-major format.

```js
var determinant = require('gl-mat4/determinant')

var matrix = [1, 0, 0, 1]
var det = determinant(matrix)
//=> 1
```

Implementations:

- [gl-mat4/determinant](https://github.com/stackgl/gl-mat4/blob/c2e2de728fe7eba592f74cd02266100cc21ec89a/determinant.js) - also see [gl-mat3](https://github.com/stackgl/gl-mat3) and [gl-mat2](https://github.com/stackgl/gl-mat2)
- [ndarray-determinant](https://www.npmjs.com/package/ndarray-determinant)
- [glsl-determinant](https://www.npmjs.com/package/glsl-determinant)
- [robust-determinant](https://www.npmjs.com/package/robust-determinant)
- [robust-determinant-2](https://www.npmjs.com/package/robust-determinant-2) and [robust-determinant-3](https://www.npmjs.com/package/robust-determinant-3), specifically for 2x2 and 3x3 matrices, respectively

#### hat

The "hat" symbol above a character is used to represent a [unit vector](https://en.wikipedia.org/wiki/Unit_vector). For example, here is the unit vector of *a*:

![hat](img/hat.png)

In cartesian space, a unit vector is typically length 1, in the range of -1.0 to 1.0. Often we refer to this as *normalizing* a vector.

```js
var a = [0, 4, -3]
normalize(a)
//=> [ 0, 0.8, -0.6000000000000001 ]
```

Notice, since we are working with floating point values and not using numerically robust operations, we do not get a perfect `-(3/5)` value for the Z component.

Here is the `normalize` function, operating on 3D vectors:

```js
function normalize(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        len = 1 / Math.sqrt(len)
        a[0] = a[0] * len
        a[1] = a[1] * len
        a[2] = a[2] * len
    }
    return a
}
```

Other implementations:

- [gl-vec3/normalize](https://github.com/stackgl/gl-vec3/blob/507480fa57ba7c5fb70679cf531175a52c48cf53/normalize.js) and [gl-vec2/normalize](https://github.com/stackgl/gl-vec2/blob/21f460a371540258521fd2f720d80f14e87bd400/normalize.js)
- [vectors/normalize-nd](https://github.com/hughsk/vectors/blob/master/normalize-nd.js) (n-dimensional)

## more...

Like this guide? Suggest some [more features](https://github.com/Jam3/math-as-code/issues/1) or send us a Pull Request!

## License

MIT, see [LICENSE.md](http://github.com/Jam3/math-as-code/blob/master/LICENSE.md) for details.
