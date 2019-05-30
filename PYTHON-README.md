# math-as-code (Python version)

>[Chinese translation of javascript version (中文版)](./README-zh.md)  
>[JavaScript version (English)](./README.md)

This is a reference to ease developers into mathematical notation by showing comparisons with Python code.

Motivation: Academic papers can be intimidating for self-taught graphics programmers and data wranglers :) 

This guide is not yet finished. If you see errors or want to contribute, please [open a ticket](https://github.com/Jam3/math-as-code/issues) or send a PR.

> **Note**: There will be some discussion of vectorization with [numpy](https://www.numpy.org/). 

> **Note**: We're only looking at `python3`, if there are significant differences with `python2` please bring them up in issues. 


# foreword

Mathematical symbols can mean different things depending on the author, context and the field of study (linear algebra, set theory, etc). This guide may not cover *all* uses of a symbol. In some cases, real-world references (blog posts, publications, etc) will be cited to demonstrate how a symbol might appear in the wild.

For a more complete list, refer to [Wikipedia - List of Mathematical Symbols](https://en.wikipedia.org/wiki/List_of_mathematical_symbols). 

For simplicity, many of the code examples here operate on floating point values and are not numerically robust. For more details on why this may be a problem, see [Robust Arithmetic Notes](https://github.com/mikolalysenko/robust-arithmetic-notes) by Mikola Lysenko.

# contents

- [variable name conventions](#variable-name-conventions)
- [equals `=` `≈` `≠` `:=`](#equals-symbols)
- [square root and complex numbers `√` *`i`*](#square-root-and-complex-numbers)
- [dot & cross `·` `×` `∘`](#dot--cross)
  - [scalar multiplication](#scalar-multiplication)
  - [vector multiplication](#vector-multiplication)
  - [dot product](#dot-product)
  - [cross product](#cross-product)
- [sigma `Σ`](#sigma) - *summation*
- [capital Pi `Π`](#capital-pi) - *products of sequences*
- [pipes `||`](#pipes)
  - [absolute value](#absolute-value)
  - [Euclidean norm](#euclidean-norm)
  - [determinant](#determinant)
- [hat **`â`**](#hat) - *unit vector*
- ["element of" `∈` `∉`](#element)
- [common number sets `ℝ` `ℤ` `ℚ` `ℕ`](#common-number-sets)
- [function `ƒ`](#function)
  - [piecewise function](#piecewise-function)
  - [common functions](#common-functions)
  - [function notation `↦` `→`](#function-notation)
- [prime `′`](#prime)
- [floor & ceiling `⌊` `⌉`](#floor--ceiling)
- [arrows](#arrows)
  - [material implication `⇒` `→`](#material-implication)
  - [equality `<` `≥` `≫`](#equality)
  - [conjunction & disjunction `∧` `∨`](#conjunction--disjunction)
- [logical negation `¬` `~` `!`](#logical-negation)
- [intervals](#intervals)
- [more...](#more)

## variable name conventions

There are a variety of naming conventions depending on the context and field of study, and they are not always consistent. However, in some of the literature you may find variable names to follow a pattern like so:

- *s* - italic lowercase letters for scalars (e.g. a number)
- **x** - bold lowercase letters for vectors (e.g. a 2D point)
- **A** - bold uppercase letters for matrices (e.g. a 3D transformation)
- *θ* - italic lowercase Greek letters for constants and special variables (e.g. [polar angle *θ*, *theta*](https://en.wikipedia.org/wiki/Spherical_coordinate_system))

This will also be the format of this guide.

### Numpy
Numpy is a powerful **array programming** library, which in python can be
interpreted as a **domain specific language** (DSL). Sometimes it's helpful to
think of math in python as two languages sharing a namespace, with special
[syntax sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) to access one or
the other. This will be important in our vectors and matrices section, because
*slightly different python syntax means different speeds at large input*. The
convention is `import numpy as np`, so when you see `np.something` you know that
we're working in numpy.  

## equals symbols

There are a number of symbols resembling the equals sign `=`. Here are a few common examples:

- `=` is for equality (values are the same)
- `≠` is for inequality (value are not the same)
- `≈` is for approximately equal to (`π ≈ 3.14159`)
- `:=` is for definition (A is defined as B)

In Python:

```python
## equality
2 == 3

## inequality
2 != 3

## approximately equal
import math
math.isclose(math.pi, 3.14159) # math.isclose doesn't have a third argument for tolerance, so this is false

from numpy.testing import assert_almost_equal
assert_almost_equal(math.pi, 3.14159, 1e-5) # we gave it a the tolerance we want, 5 decimal places. 
# This is actually a unit test, equivalent to "assert isclose(x,y)", read on for more. 

def almost_equal(x, y, epsilon=7): 
  ''' you can make your own! 
  in numpy, 1e-7 is the default epsilon
  '''
  return abs(x - y) < 10 ** -epsilon

```

> **Read more**: programmers got this idea from the [epsilon-delta definition of limit][1]

**Note**: subclasses of [`unittest.TestCase`](https://docs.python.org/3/library/unittest.html) come with their own `assertAlmostEqual`.

**Warning**: *please* don't use exact `==` equality on floats! 

In mathematical notation, you might see the `:=`, `=:` and `=` symbols being used for *definition*.<sup>[2]</sup>

For example, the following defines *x* to be another name for 2*kj*.

![equals1](http://latex.codecogs.com/svg.latex?x%20%3A%3D%202kj)

<!-- x := 2kj -->

In python, we *define* our variables and provide aliases with `=`. 

```python
x = 2 * k * j
```
*Assignment* in python is generally *mutable* besides special cases like `Tuple`. 

> **Note**: Some languages have pre-processor `#define` statements, which are closer to a mathematical *define*. 

Notice that `def` is a form of `:=` as well. 
```python
def plus(x, y): 
  return x + y
```

The following, on the other hand, represents equality:

![equals2](http://latex.codecogs.com/svg.latex?x%20%3D%202kj)

<!-- x = 2kj -->

**Important**: the difference between `=` and `==` can be more obvious in code than it is in math literature! In python, a `=` is an *instruction*. You're telling the machine to interact with the namespace, add something to it or change something in it. In python, when you write `==` you're asking the machine "may I have a `bool`?". In math, the former case is *either* covered by `:=` or `=`, while the latter case is *usually* `=`, and you might have to do some disambiguating in your reading. 

In math, when I write 1 + 1 = 2 I'm making a *judgment*. It's not that i'm asking the world (or the chalkboard) for a bool, it's that I'm keeping track of my beliefs. This distinction is the foundation of *unit tests* or *assertions*. 

```python

# assert in python takes an expression that lands in bool and a string to be printed if it turns out false. 
assert plus(1, 1) == 2, "DANGER: PHYSICS IS BROKEN. PLEASE STAY INSIDE. "
```

It's important to know *when a falsehood ought to crash a program* vs. when you just want a boolean value. To understand this better, read [this][3].  




## square root and complex numbers

A square root operation is of the form:

![squareroot](http://latex.codecogs.com/svg.latex?%5Cleft%28%5Csqrt%7Bx%7D%5Cright%29%5E2%20%3D%20x)

<!-- \left(\sqrt{x}\right)^2 = x -->

In programming we use a `sqrt` function, like so: 

```python
import math
print(math.sqrt(2))
# Out: 1.4142135623730951

import numpy as np
print(np.sqrt(2))
# Out: 1.4142135623730951

```

Complex numbers are expressions of the form ![complex](http://latex.codecogs.com/svg.latex?a&space;&plus;&space;ib), where ![a](http://latex.codecogs.com/svg.latex?a) is the real part and ![b](http://latex.codecogs.com/svg.latex?b) is the imaginary part. The imaginary number ![i](http://latex.codecogs.com/svg.latex?i) is defined as:

![imaginary](http://latex.codecogs.com/svg.latex?i%3D%5Csqrt%7B-1%7D).
<!-- i=\sqrt{-1} -->

Vanilla python has a `complex` constructor, and a standard module `cmath` for working with them. 

```python
complex(1,1)
# Out: (1+1j)s

math.sqrt(complex(1,1))
# TypeError: can't convert complex to float

import cmath
cmath.sqrt(complex(1,1))
# Out: (1.09868411346781+0.45508986056222733j)

# you need numpy to get conjugate
np.conj(complex(0.5,0.5))
# Out: (0.5-0.5j)

# we can represent the basic meaning of the imaginary unit like so
assert cmath.sqrt(complex(-1, 0)) == complex(0,1)
```

As you can see, it uses `j` to denote the imaginary unit, instead of `i`. 

The **conjugate** of a complex number is **flipping the sign of the imaginary part**. 

If `z` is a python `complex` number, `z.real` gets the real part (exactly as an
object attribute) and `z.imag` gets the imaginary part. 

Just as complex numbers can be interpreted as a sort of wrapper around tuples of
reals, a complex number data type wraps two floats. Numpy uses this to implement
complex numbers of different sizes/precisions. 

The syntax is close enough to `cmath`, but it comes with the power and
convenience of numpy. Importantly, other numpy methods are better at *casting*
to and from complex. 


observe the following [cube roots of unity](https://www.math-only-math.com/the-cube-roots-of-unity.html)
```python
z1 = 0.5 * np.complex(-1, math.sqrt(3)) # Numpy's constructor is basically the same.  
z2 = np.conj(z1) # but numpy gives us a conjugation function, while the standard module does not. 

assert math.isclose(z1**3, z2**3)
# TypeError: can't convert complex to float

np.testing.assert_almost_equal(z1**3, z2**3)
```
[Read on about numpy's complex numbers](https://docs.scipy.org/doc/numpy/user/basics.types.html)

## dot & cross

The dot `·` and cross `×` symbols have different uses depending on context.

They might seem obvious, but it's important to understand the subtle differences before we continue into other sections.

#### scalar multiplication

Both symbols can represent simple multiplication of scalars. The following are equivalent:

![dotcross1](http://latex.codecogs.com/svg.latex?5%20%5Ccdot%204%20%3D%205%20%5Ctimes%204)

<!-- 5 \cdot 4 = 5 \times 4 -->

In programming languages we tend to use asterisk for multiplication:

```python
result = 5 * 4
```

Often, the multiplication sign is only used to avoid ambiguity (e.g. between two numbers). Here, we can omit it entirely:

![dotcross2](http://latex.codecogs.com/svg.latex?3kj)

<!-- 3kj -->

If these variables represent scalars, the code would be:

```python
result = 3 * k * j
```

#### vector multiplication

To denote multiplication of one vector with a scalar, or element-wise multiplication of a vector with another vector, we typically do not use the dot `·` or cross `×` symbols. These have different meanings in linear algebra, discussed shortly.

Let's take our earlier example but apply it to vectors. For element-wise vector multiplication, you might see an open dot `∘` to represent the [Hadamard product](https://en.wikipedia.org/wiki/Hadamard_product_%28matrices%29).<sup>[2]</sup>

![dotcross3](http://latex.codecogs.com/svg.latex?3%5Cmathbf%7Bk%7D%5Ccirc%5Cmathbf%7Bj%7D)

<!-- 3\mathbf{k}\circ\mathbf{j} -->

In other instances, the author might explicitly define a different notation, such as a circled dot `⊙` or a filled circle `●`.<sup>[3]</sup>

Here is how it would look in code, using arrays `[x, y]` to represent the 2D vectors.

```python
s = 3
k = [1, 2]
j = [2, 3]

tmp = multiply(k, j)
result = multiply_scalar(tmp, s)
# Out: [6, 18]
```

Our `multiply` and `multiply_scalar` functions look like this:

```python
def multiply(a, b):
  return [aa * bb for aa,bb in zip(a,b)


def multiply_scalar(scalar, a):
  return [scalar * aa for aa in a]

```

Similarly, matrix multiplication typically does not use the dot `·` or cross symbol `×`. 

Numpy's broadcasted syntax for scaling looks like this: 

```python
def multiply_scalar(scalar, a): 
  return scalar * np.array(a)
```

#### dot product

The dot symbol `·` can be used to denote the [*dot product*](https://en.wikipedia.org/wiki/Dot_product) of two vectors. Sometimes this is called the *scalar product* since it evaluates to a scalar.

![dotcross4](http://latex.codecogs.com/svg.latex?%5Cmathbf%7Bk%7D%5Ccdot%20%5Cmathbf%7Bj%7D)

<!-- \mathbf{k}\cdot \mathbf{j} -->

It is a very common feature of linear algebra, and with a 3D vector it might look like this:

```python
k = [0, 1, 0]
j = [1, 0, 0]

d = np.dot(k, j)
# Out: 0
```

The result `0` tells us our vectors are perpendicular. Here is a `dot` function for 3-component vectors:

```python
def dot(a, b):
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
```

#### cross product

The cross symbol `×` can be used to denote the [*cross product*](https://en.wikipedia.org/wiki/Cross_product) of two vectors.

![dotcross5](http://latex.codecogs.com/svg.latex?%5Cmathbf%7Bk%7D%5Ctimes%20%5Cmathbf%7Bj%7D)

<!-- \mathbf{k}\times \mathbf{j} -->

In code, it would look like this:

```python
k = [0, 1, 0]
j = [1, 0, 0]

result = cross(k, j)
# Out: [ 0, 0, -1 ]
```

Here, we get `[0, 0, -1]`, which is perpendicular to both **k** and **j**.

Our `cross` function:

```python
def cross(a, b): 
  ''' take two 3D vectors and return their cross product. '''
  rx = a[1] * b[2] - a[2] * b[1]
  ry = a[2] * b[0] - a[0] * b[2]
  rz = a[0] * b[1] - a[1] * b[0]
  return rx, ry, rz
```

It's good to practice and grok these operations, but in real life you'll use
Numpy. 

## sigma 

The big Greek `Σ` (Sigma) is for [Summation](https://en.wikipedia.org/wiki/Summation). In other words: summing up some numbers.

![sigma](http://latex.codecogs.com/svg.latex?%5Csum_%7Bi%3D1%7D%5E%7B100%7Di)

<!-- \sum_{i=1}^{100}i -->

Here, `i=1` says to start at `1` and end at the number above the Sigma, `100`. These are the lower and upper bounds, respectively. The *i* to the right of the "E" tells us what we are summing. In code:

Hence, the big sigma is the `for` keyword. 
```python
sum([k for k in range(100)])
# Out: 5050
```

**Tip:** With whole numbers, this particular pattern can be optimized to the
following (and try to [grok the
proof](http://mathcentral.uregina.ca/QQ/database/QQ.02.06/jo1.html). The legend
of how Gauss discovered I can only describe as "typical programmer antics"):

```python
def sum_to_n(n):
  ''' return the sum of integers from 0 to n'''
  return 0.5 * n * (n + 1)
```

Here is another example where the *i*, or the "what to sum," is different:

![sum2](http://latex.codecogs.com/svg.latex?%5Csum_%7Bi%3D1%7D%5E%7B100%7D%282i&plus;1%29)

<!-- \sum_{i=1}^{100}(2i+1) -->

In code:

```python
sum([2*k + 1 for k in range(100)])
# Out: 10000
```

**important**: `range` in python has an *inclusive lower bound and exclusive
upper bound*, meaning that `... for k in range(100)` is equivalent to `the sum of
... for k=0 to k=n`. 

If you're still not absolutely fluent in indexing for these applications, spend some time with [Trev Tutor](https://youtu.be/TDpQSa3hJRw) on youtube.

The notation can be nested, which is much like nesting a `for` loop. You should
evaluate the right-most sigma first, unless the author has enclosed them in
parentheses to alter the order. However, in the following case, since we are
dealing with finite sums, the order does not matter.

![sigma3](http://latex.codecogs.com/svg.latex?%5Csum_%7Bi%3D1%7D%5E%7B2%7D%5Csum_%7Bj%3D4%7D%5E%7B6%7D%283ij%29)

<!-- \sum_{i=1}^{2}\sum_{j=4}^{6}(3ij) -->

In code:

```python
sum(
  [sum([3*i*j 
        for j 
        in range(4,7)]) 
   for i 
   in range(1,3)])
# Out: 135
```


## capital Pi

The capital Pi or "Big Pi" is very similar to [Sigma](#sigma), except we are using multiplication to find the product of a sequence of values. 

Take the following:

![capitalPi](http://latex.codecogs.com/svg.latex?%5Cprod_%7Bi%3D1%7D%5E%7B6%7Di)

<!-- \prod_{i=1}^{6}i -->

This was removed from vanilla python for python 3, but it's easy to recover with
a generalization of the list accumulator. 
```python
def times(x, y): 
  ''' first, give a name to the multiplication operator '''
  return x * y

from functools import reduce

reduce(times, range(1,7))
# Out: 720
```

With reduce, you can actually repeatedly apply a binary function to items of a
list and accumulate the value _for any binary operator_. Python gives `and` and
`or` out of the box like `sum`, but keep `reduce` in mind if you encounter a
less common binary operator out in the wild. 

Note that in Numpy arrays, the syntax is different (and product is given out of
the box)

```python
import numpy as np

xs = np.array([2*k + 1 for k in range(100)])
ys = np.array(range(1,7))

xs.sum()
# Out: 10000

ys.prod()
# Out: 720
```
which is better on larger input, but you're always welcome to use functions for
ordinary lists as you please. 

## pipes

Pipe symbols, known as *bars*, can mean different things depending on the
context. Below are three common uses: [absolute value](#absolute-value),
[Euclidean norm](#euclidean-norm), and [determinant](#determinant).

These three features all describe the *length* of an object.

#### absolute value 

![pipes1](http://latex.codecogs.com/svg.latex?%5Cleft%20%7C%20x%20%5Cright%20%7C)

<!-- \left | x \right | -->

For a number *x*, `|x|` means the absolute value of *x*. In code:

```python
x = -5
abs(x)
# Out: 5
```
#### Euclidean norm

![pipes4](http://latex.codecogs.com/svg.latex?%5Cleft%20%5C%7C%20%5Cmathbf%7Bv%7D%20%5Cright%20%5C%7C)

<!-- \left \| \mathbf{v} \right \| -->

For a vector **v**, `‖v‖` is the [Euclidean norm](https://en.wikipedia.org/wiki/Norm_%28mathematics%29#Euclidean_norm) of **v**. It is also referred to as the "magnitude" or "length" of a vector.

Often this is represented by double-bars to avoid ambiguity with the *absolute value* notation, but sometimes you may see it with single bars:

![pipes2](http://latex.codecogs.com/svg.latex?%5Cleft%20%7C%20%5Cmathbf%7Bv%7D%20%5Cright%20%7C)

<!-- \left | \mathbf{v} \right | -->

Here is an example using an array `[x, y, z]` to represent a 3D vector.

```python
v = [0, 4, -3]
length(v)
# Out: 5.0

```

The `length** function:

```python
def length(vec):
  x = vec[0]
  y = vec[1]
  z = vec[2]
  return math.sqrt(x**2 + y**2 + z**2)
```

The implementation for arbitrary length'd vectors is left as an exercise for the
reader. 

In practice, you'll probably use the following numpy call 

```python
np.linalg.norm([0, 4, -3])
# Out: 5.0
```

Resources: 
- [numpy.linalg docs](get link to numpy.linalg docs)

#### determinant

![pipes3](http://latex.codecogs.com/svg.latex?%5Cleft%20%7C%5Cmathbf%7BA%7D%20%5Cright%20%7C)

<!-- \left |\mathbf{A}  \right | -->

For a matrix **A**, `|A|` means the
[determinant](https://en.wikipedia.org/wiki/Determinant) of matrix **A**.

Here is an example computing the determinant of a 2x2 identity matrix

```python
ident_2 = [[1, 0], 
           [0, 1]]

np.linalg.det(ident_2)
# Out: 1
```

You should watch [3blue1brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab), but in short if a matrix (list of list of numbers)
is interpreted as hitting a **coordinate system** with a
*squisher-stretcher-rotater*, the determinant of that matrix is the **measure of
how much the unit area/volume of the coordinate system got
squished-stretched-rotated**.

```python
np.linalg.det(np.identity(100)) # the determinant of the 100 x 100 identity matrix is still one, because the identity matrix doesn't squish, stretch, or rotate at all. 
# Out: 1.0

np.linalg.det(np.array([[0, -1], [1, 0]])) # 90 degree rotation. 
# Out: 1.0

```

The second matrix was the [**2D rotation**](https://en.wikipedia.org/wiki/Rotation_matrix) at 90 degrees. 

## hat

In geometry, the "hat" symbol above a character is used to represent a [unit vector](https://en.wikipedia.org/wiki/Unit_vector). For example, here is the unit vector of **a**:

![hat](http://latex.codecogs.com/svg.latex?%5Chat%7B%5Cmathbf%7Ba%7D%7D)

<!-- \hat{\mathbf{a}} -->

In Cartesian space, a unit vector is typically length 1. That means each part of the vector will be in the range of -1.0 to 1.0. Here we *normalize* a 3D vector into a unit vector:

```python
a = [ 0, 4, -3 ]
normalize(a)
# Out: [ 0, 0.8, -0.6 ]
```

If a vector is that which has magnitude and direction, normalization of a vector
is the operation that deletes magnitude and preserves direction. 

Here is the `normalize` function, operating on 3D vectors:

```python
def normalize(vec):
  x = vec[0]
  y = vec[1]
  z = vec[2]
  squaredLength = x * x + y * y + z * z

  if (squaredLength > 0):
    length = math.sqrt(squaredLength)
    vec[0] = x / length
    vec[1] = y / length
    vec[2] = z / length
  
  return vec
```

Which Numpy's **broadcasting** syntax sugar can do in fewer lines

You should try to generalize this to vectors of arbitrary length yourself,
before reading this...

Go, I mean it! 

```python
def normalize(vec):
  ''' *sigh* if you don't do it yourself you'll never learn! '''
  vec = np.array(vec) # ensure that input is casted to numpy
  length = np.linalg.norm(vec)
  if length > 0:
    return vec / length
```
Notice that **broadcasting** here is just short for `[x / length for x in vec]`.
But it's actually **faster** on large input, because arrays. 

[*Read* the Numpy docs. *BE* the Numpy docs](https://docs.scipy.org/doc/numpy/reference/routines.linalg.html)


## element

In set theory, the "element of" symbol `∈` and `∋` can be used to describe whether something is an element of a *set*. For example:

![element1](http://latex.codecogs.com/svg.latex?A%3D%5Cleft%20%5C%7B3%2C9%2C14%7D%7B%20%5Cright%20%5C%7D%2C%203%20%5Cin%20A)

<!-- A=\left \{3,9,14}{  \right \}, 3 \in A -->

Here we have a set of numbers *A* = `{ 3, 9, 14 }` and we are saying `3` is an "element of" that set. 

The `in` keyword plays the role of the elementhood function, giving a bool. 

```python
A = [ 3, 9, 14 ]

3 in A
# Out: True
```

Python also has `set`. You can wrap any iterable or generator with the `set` keyword to delete
repeats. 

```python
set([3,3,3,2,4,3,3,3,1,2,4,5,3])
# Out: {1, 2, 3, 4, 5}

3 in set(range(1, 20, 4))
# Out: False
```

The backwards `∋` is the same, but the order changes:

![element2](http://latex.codecogs.com/svg.latex?A%3D%5Cleft%20%5C%7B3%2C9%2C14%7D%7B%20%5Cright%20%5C%7D%2C%20A%20%5Cni%203)

<!-- A=\left \{3,9,14}{  \right \}, A \ni 3 -->

You can also use the "not an element of" symbols `∉` and `∌` like so:

![element3](http://latex.codecogs.com/svg.latex?A%3D%5Cleft%20%5C%7B3%2C9%2C14%7D%7B%20%5Cright%20%5C%7D%2C%206%20%5Cnotin%20A)

<!-- A=\left \{3,9,14}{  \right \}, 6 \notin A -->

Which you know is represented by the convenient `not` keyword in python. 

## common number sets

You may see some some large [Blackboard](https://en.wikipedia.org/wiki/Blackboard_bold) letters among equations. Often, these are used to describe sets.

For example, we might describe *k* to be an [element of](#element) the set `ℝ`. 

![real](http://latex.codecogs.com/svg.latex?k%20%5Cin%20%5Cmathbb%7BR%7D)

<!-- k \in \mathbb{R} -->

Listed below are a few common sets and their symbols.

#### `ℝ` real numbers

The large `ℝ` describes the set of *real numbers*. These include integers, as well as rational and irrational numbers.

Computers approximate `ℝ` with `float`. 

You can use `isinstance` to check "*k* ∈ ℝ", where float and `ℝ` aren't *really*
the same thing but the intuition is close enough.  

```python
isinstance(np.pi, float)
# Out: True
```

Again, you may elevate that bool to an `assertion` that makes-or-breaks the whole program
with the `assert` keyword when you see fit. 

[Excellent resource on floats in python](https://youtu.be/zguLmgYWhM0)

#### `ℚ` rational numbers

Rational numbers are real numbers that can be expressed as a fraction, or
*ratio*. Rational numbers cannot have zero as a denominator.

Imagine taking `ℝ` and removing radicals (like `np.sqrt`) and logarithms (in a
family called
[transcendentals](https://en.wikipedia.org/wiki/Transcendental_function)),
that's basically what `ℚ` is, at least enough for a rough first approximation. 

This also means that all integers are rational numbers, since the denominator can be expressed as 1.

An irrational number, on the other hand, is one that cannot be expressed as a ratio, like π (`math.pi`). 

A reason a programmer might care about the difference between Q and R is in the
design of unit tests--- *fractions are terminating decimals*, and sometimes when
you're a 100% sure that a number will be a basic rational (like counting change,
`0.25, 0.10, 0.05`, etc.), you're allowed to use `==` in unit tests rather than
`isclose` or `assert_almost_equal`. The point is that you know not to use exact
equality `==` when anything like `sqrt` or `log` is involved!  

You can work with rationals without dividing them into floatiness with the
[`fractions` standard module](https://docs.python.org/3.7/library/fractions.html)

#### `ℤ` integers

An integer is a whole number. Just imagine starting from zero and one and
building out an inventory with addition and subtraction. 

An integer has no division, no decimals. 

```python
assert isinstance(8/7, int), "GO DIRECTLY TO JAIL"
```

#### `ℕ` natural numbers

A natural number, a non-negative integer. 

This is actually the only set invented by the [flying spaghetti monster](https://www.brainyquote.com/quotes/leopold_kronecker_338745): as for the
others, humans have themselves to blame. 

Depending on the context and field of study, the set may or may not **start with zero**.

...ok but, between you and me, **they 200% start with zero**. 

`ℕ` also happens to be the first **inductive construction** in the [study of
datatypes](https://en.wikipedia.org/wiki/Semantics_(computer_science)), consisting of a single axiom ("Zero is a `ℕ`") and a single
inference rule ("if `n` is a `ℕ` then `n + 1` is also a `ℕ`")

`ℕ` is not a datatype in python, we can't use *typechecking* to disambiguate `int`
from `non-negative int`, but in a pinch you could easily write up something that
combines `x >= 0` judgments with `isinstance(x, int)`.

#### `ℂ` complex numbers

As we saw earlier, the complex numbers are a particular wrapper around tuples of
reals. 

A complex number is a combination of a real and imaginary number, viewed as a co-ordinate in the 2D plane. For more info, see [A Visual, Intuitive Guide to Imaginary Numbers](http://betterexplained.com/articles/a-visual-intuitive-guide-to-imaginary-numbers/).

We can say `ℂ = {a + b*i | a,b ∈ ℝ}`, which is a notation called

## Set builder notation 

Pythoners have a name for *set builder notation*; and the name is comprehension

- `{ }`: delimiter around iterable (curlybois for `dict` or `set`, `[` for list)
- `a + b * i`: an expression (for instance, earlier when we made a list of odd numbers this
  expression was `2*k + 1`) to be evaluated for each item in source list. 
- `|`: `for`
- `a,b ∈ ℝ`: this just shows that `a,b` are drawn from a particular place, in
  this case the real numbers. 
  
So if you've been writing Python listcomps, that definition of the complex
numbers wasn't so bad! Say it with me this time 

`ℂ = {a + b*i | a,b ∈ ℝ}``

**inhaaaaaaless** *unison* "C IS THE SET OF a + b*i FOR REAL NUMBERS a AND b"

If you want, you can draw up a grainy picture of an *interval* of ℂ with `zip`
and `np.linspace`, and of course list comprehension.  

```python
j = np.complex(0,1)

R = np.linspace(-2, 2, 100)

{a + b * j for a,b in zip(R, R)}
# too much to print but try it yourself. 
```

## functions

[Functions](https://en.wikipedia.org/wiki/Function_%28mathematics%29) are fundamental features of mathematics, and the concept is fairly easy to translate into code.

A **function** transforms an input into an output value. For example, the following is a function:

![function1](http://latex.codecogs.com/svg.latex?x%5E%7B2%7D)

<!-- x^{2} -->

We can give this function a *name*. Commonly, we use `ƒ` to describe a function, but it could be named `A` or anything else.

![function2](http://latex.codecogs.com/svg.latex?f%5Cleft%20%28x%20%5Cright%20%29%20%3D%20x%5E%7B2%7D)

<!-- f\left (x  \right ) = x^{2} -->

In code, we might name it `square` and write it like this:

```python
def square(x): 
  return math.pow(x, 2)

```

Sometimes a function is not named, and instead the output is written.

![function3](http://latex.codecogs.com/svg.latex?y%20%3D%20x%5E%7B2%7D)

<!-- y = x^{2} -->

In the above example, *x* is the input, the transformation is *squaring*, and *y*
is the output. We can express this as an equation because, conventionally, we
think of *x* as input and *y* as output. 

But we have a stronger idea called **anonymous functions** to generalize this. 

Just as we can name strings `x = "Alonzo"` then call them with their names *or*
we can just pass string *literals*, we also have **function literals**. 

Math first, then python: 

`x ↦ x^2` is equivalent to the equational description above. 

Nearly identical, but very different to the untrained eye, is `λx.x^2`, hence
the python keyword 
```python
lambda x: x**2
```

Functions can also have multiple parameters, like in a programming language. These are known as *arguments* in mathematics, and the number of arguments a function takes is known as the *arity* of the function.

![function4](http://latex.codecogs.com/svg.latex?f%28x%2Cy%29%20%3D%20%5Csqrt%7Bx%5E2%20&plus;%20y%5E2%7D)

<!-- f(x,y) = \sqrt{x^2 + y^2} -->

### dictionaries are functions

Sometimes mathematicians, like software developers, need to specify *maps* by
*enumerating each input-output pair** when there is no expression that computes
output from input.

**Note**: formally, mathematicians require that **functions not be ambiguous***,
so when you have a function and you have an input, there can be no uncertainty
as to what the output should be; you mustn't be confused about whether an apple
is red or purple (in introductory algebra courses this is called
the "vertical line test", but it applies to all maps). Notice that the
implementation of hash maps already guarantees this in the case of dictionaries!
Notice also that we make no such requirement on
*outputs*, both an apple *and* a banana can land on purple! With caveats like
these, we can [study the properties of different kinds of functions](https://en.wikipedia.org/wiki/Bijection,_injection_and_surjection)
into different kinds, important in compression and security engineering.

### piecewise function

Some functions will use different relationships depending on the input value, *x*.

The following function *ƒ* chooses between two "sub functions" depending on the input value.

![piecewise1](http://latex.codecogs.com/svg.latex?f%28x%29%3D%20%5Cbegin%7Bcases%7D%20%5Cfrac%7Bx%5E2-x%7D%7Bx%7D%2C%26%20%5Ctext%7Bif%20%7D%20x%5Cgeq%201%5C%5C%200%2C%20%26%20%5Ctext%7Botherwise%7D%20%5Cend%7Bcases%7D)

<!--    f(x)= 
\begin{cases}
    \frac{x^2-x}{x},& \text{if } x\geq 1\\
    0, & \text{otherwise}
\end{cases} -->

This is very similar to `if` / `else` in code. The right-side conditions are often written as **"for x < 0"** or **"if x = 0"**. If the condition is true, the function to the left is used.

In piecewise functions, **"otherwise"** and **"elsewhere"** are analogous to the `else` statement in code.

```python
def f(x):
  if (x >= 1):
    return (math.pow(x, 2) - x) / x
  else:
    return 0

```

### common functions

There are some function names that are ubiquitous in mathematics. For a programmer, these might be analogous to functions "built-in" to the language (like `parseInt` in JavaScript).

One such example is the *sgn* function. This is the *signum* or *sign* function. Let's use [piecewise function](#piecewise-function) notation to describe it:

![sgn](http://latex.codecogs.com/svg.latex?sgn%28x%29%20%3A%3D%20%5Cbegin%7Bcases%7D%20-1%26%20%5Ctext%7Bif%20%7D%20x%20%3C%200%5C%5C%200%2C%20%26%20%5Ctext%7Bif%20%7D%20%7Bx%20%3D%200%7D%5C%5C%201%2C%20%26%20%5Ctext%7Bif%20%7D%20x%20%3E%200%5C%5C%20%5Cend%7Bcases%7D)

<!-- sgn(x) := 
\begin{cases}
    -1& \text{if } x < 0\\
    0, & \text{if } {x = 0}\\
    1, & \text{if } x > 0\\
\end{cases} -->

In code, it might look like this:

```python
def signum(x):
  if (x < 0):
    return -1
  elif (x > 0):
    return 1
  else: 
    return 0
```

See [signum](https://github.com/scijs/signum) for this function as a module.

Other examples of such functions: *sin*, *cos*, *tan*.

### function notation

In some literature, functions may be defined with more explicit notation. For example, let's go back to the `square` function we mentioned earlier:

![function2](http://latex.codecogs.com/svg.latex?f%5Cleft%20%28x%20%5Cright%20%29%20%3D%20x%5E%7B2%7D)

<!-- f\left (x  \right ) = x^{2} -->

It might also be written in the following form:

![mapsto](http://latex.codecogs.com/svg.latex?f%20%3A%20x%20%5Cmapsto%20x%5E2)

<!-- f : x \mapsto x^2 -->

The arrow here with a tail typically means "maps to," as in *x maps to x<sup>2</sup>*. 

Sometimes, when it isn't obvious, the notation will also describe the *domain* and *codomain* of the function. A more formal definition of *ƒ* might be written as:

![funcnot](http://latex.codecogs.com/svg.latex?%5Cbegin%7Balign*%7D%20f%20%3A%26%5Cmathbb%7BR%7D%20%5Crightarrow%20%5Cmathbb%7BR%7D%5C%5C%20%26x%20%5Cmapsto%20x%5E2%20%5Cend%7Balign*%7D)

<!-- \begin{align*}
f :&\mathbb{R} \rightarrow \mathbb{R}\\
&x \mapsto x^2 
\end{align*}
 -->

A function's *domain* and *codomain* is a bit like its *input* and *output* types, respectively. Here's another example, using our earlier *sgn* function, which outputs an integer:

![domain2](http://latex.codecogs.com/svg.latex?sgn%20%3A%20%5Cmathbb%7BR%7D%20%5Crightarrow%20%5Cmathbb%7BZ%7D)

<!-- sgn : \mathbb{R} \rightarrow \mathbb{Z} -->

The arrow here (without a tail) is used to map one *set* to another.

In Python and other dynamically typed languages, you might use documentation and/or runtime checks to explain and validate a function's input/output. Example:

```python
def square_ints(k): 
  ''' FEED ME INTEGER '''
  try: 
    assert isinstance(k, int), "I HUNGER FOR AN INTEGER! "
    return math.pow(k, 2)
  except AssertionError as e:
    raise e
```

The python of a more glorious future as described in
[pep484](https://www.python.org/dev/peps/pep-0484/) proposes a static type
checker for Python, but no one's proposed anything shrewd enough to *prevent
code with type errors from compiling* for Python yet.

As we will see in the following sample of `pep484` Python, the set
interpretation of domain and codomain makes way for a *types* interpretation of
domain and codomain

```python
def square(x: float) -> float: 
  ''' a pep484 annotation isn't that different from if i declared in the docstring; 
  
  input/domain: a float
  output/codomain: another float 
  '''
  return x**2
```

Other languages, like Java, allow for true method overloading based on the
static types of a function's input/output. This is closer to mathematics: two
functions are not the same if they use a different *domain*. This is also called
*polymorphism* and it explains why `'literally' + 'alonzo'` concats two strings
together but `1 + 1` is addition on numbers. 

## prime

The prime symbol (`′`) is often used in variable names to describe things which are similar, without giving it a different name altogether. It can describe the "next value" after some transformation.

For example, if we take a 2D point *(x, y)* and rotate it, you might name the result *(x′, y′)*. Or, the *transpose* of matrix **M** might be named **M′**.

In code, we typically just assign the variable a more descriptive name, like `transformedPosition`.

For a mathematical [function](#function), the prime symbol often describes the *derivative* of that function. Derivatives will be explained in a future section. Let's take our earlier function:

![function2](http://latex.codecogs.com/svg.latex?f%5Cleft%20%28x%20%5Cright%20%29%20%3D%20x%5E%7B2%7D)

<!-- f\left (x  \right ) = x^{2} -->

Its derivative could be written with a prime `′` symbol:

![prime1](http://latex.codecogs.com/svg.latex?f%27%28x%29%20%3D%202x)

<!-- f'(x) = 2x -->

In code:

```python
def f(x): 
  return Math.pow(x, 2)

def f_prime(x):
  return 2 * x
```

Multiple prime symbols can be used to describe the second derivative *ƒ′′* and third derivative *ƒ′′′*. After this, authors typically express higher orders with roman numerals *ƒ*<sup>IV</sup> or superscript numbers *ƒ*<sup>(n)</sup>.

## floor & ceiling

The special brackets `⌊x⌋` and `⌈x⌉` represent the *floor* and *ceil* functions, respectively.

![floor](http://latex.codecogs.com/svg.latex?floor%28x%29%20%3D%20%5Clfloor%20x%20%5Crfloor)

<!-- floor(x) =  \lfloor x \rfloor -->

![ceil](http://latex.codecogs.com/svg.latex?ceil%28x%29%20%3D%20%5Clceil%20x%20%5Crceil)

<!-- ceil(x) =  \lceil x \rceil -->

In code:

```python
math.floor(4.8)
math.ceil(3.1)
np.floor(4.9)
np.ceil(3.001)
```

> **Note**: the Numpy version returns a float, in the above example `4.0`,
> rather than the int `4`

When the two symbols are mixed `⌊x⌉`, it typically represents a function that rounds to the nearest integer:

![round](http://latex.codecogs.com/svg.latex?round%28x%29%20%3D%20%5Clfloor%20x%20%5Crceil)

<!-- round(x) =  \lfloor x \rceil -->

Python automatically gives you a keyword `round` to call on a number. 

## arrows

Arrows are often used in [function notation](#function-notation). Here are a few other areas you might see them.

#### material implication

Arrows like `⇒` and `→` are sometimes used in logic for *material implication.* That is, if A is true, then B is also true.

![material1](http://latex.codecogs.com/svg.latex?A%20%5CRightarrow%20B)

<!-- A \Rightarrow B -->

Interpreting this as code might look like this:

```python
def if_A_then_B:
  if A:
    assert B, "alas, not A!"
    return B
```

The arrows can go in either direction `⇐` `⇒`, or both `⇔`. When *A ⇒ B* and *B ⇒ A*, they are said to be equivalent:

![material-equiv](http://latex.codecogs.com/svg.latex?A%20%5CLeftrightarrow%20B)

<!-- A \Leftrightarrow B -->

#### inequality

In math, the `<` `>` `≤` and `≥` are typically used in the same way we use them in code: *less than*, *greater than*, *less than or equal to* and *greater than or equal to*, respectively.

```python
assert 50 > 2
assert 2 < 10
assert 3 <= 4
assert 4 >= 4
```

On rare occasions you might see a slash through these symbols, to describe *not*. As in, *k* is "not greater than" *j*.

![ngt](http://latex.codecogs.com/svg.latex?k%20%5Cngtr%20j)

<!-- k \ngtr j -->

The `≪` and `≫` are sometimes used to represent *significant* inequality. That
is, *k* is an [order of
magnitude](https://en.wikipedia.org/wiki/Order_of_magnitude) larger than *j*.
Sometimes read "beats", when I say `x^k ≫ log(x)` what I'm really saying is that
"polynomial functions grow an order of magnitude faster than logarithms; in a
word, the polynomial *beats* the logarithm."

![orderofmag](http://latex.codecogs.com/svg.latex?k%20%5Cgg%20j)

<!-- k \gg j -->

#### conjunction & disjunction

Another use of arrows in logic is conjunction `∧` and disjunction `∨`. They are analogous to a programmer's `AND` and `OR` operators, respectively.

The following shows conjunction `∧`, the logical `AND`.

![and](http://latex.codecogs.com/svg.latex?k%20%3E%202%20%5Cland%20k%20%3C%204%20%5CLeftrightarrow%20k%20%3D%203)

<!-- k > 2 \land k <  4 \Leftrightarrow k = 3   -->

In Python, we just say `and`. Assuming *k* is a natural number, the logic implies that *k* is 3:

```python
lambda k: if (k > 2 and k < 4): assert k == 3, "Exercise: can this error ever be raised?"
```

Since both sides are equivalent `⇔`, it also implies the following:

```python
lambda k: if (k == 3): assert (k > 2 and k < 4), "I mean it, think through this exercise."
```

The down arrow `∨` is logical disjunction, like the OR operator.

![logic-or](http://latex.codecogs.com/svg.latex?A%20%5Clor%20B)

<!-- A \lor B -->

In Python, we have the `or` keyword. Like and, it is a function that will trade
you one bool for two bools. 

## logical negation

Occasionally, the `¬`, `~` and `!` symbols are used to represent logical `NOT`. For example, *¬A* is only true if A is false.

Here is a simple example using the *not* symbol:

![negation](http://latex.codecogs.com/svg.latex?x%20%5Cneq%20y%20%5CLeftrightarrow%20%5Clnot%28x%20%3D%20y%29)

<!-- x \neq y \Leftrightarrow \lnot(x = y) -->

An example of how we might interpret this in code:

```python
lambda x, y: if (x != y): assert not x == y, "arrr, buried treasure lost forever. "
```

*Note:* The tilde `~` has many different meanings depending on context. For example, *row equivalence* (matrix theory) or *same order of magnitude* (discussed in [equality](#equality)).

## intervals

Sometimes a function deals with real numbers restricted to some range of values, such a constraint can be represented using an *interval*

For example we can represent the numbers between zero and one including/not including zero and/or one as:

- Not including zero or one: ![interval-opened-left-opened-right](http://latex.codecogs.com/svg.latex?%280%2C%201%29)

<!-- (0, 1) -->

- Including zero or but not one: ![interval-closed-left-opened-right](http://latex.codecogs.com/svg.latex?%5B0%2C%201%29)

<!-- [0, 1) -->

- Not including zero but including one: ![interval-opened-left-closed-right](http://latex.codecogs.com/svg.latex?%280%2C%201%5D)

<!-- (0, 1] -->

- Including zero and one: ![interval-closed-left-closed-right](http://latex.codecogs.com/svg.latex?%5B0%2C%201%5D)

<!-- [0, 1] -->

For example we to indicate that a point `x` is in the unit cube in 3D we say:

![interval-unit-cube](http://latex.codecogs.com/svg.latex?x%20%5Cin%20%5B0%2C%201%5D%5E3)

<!-- x \in [0, 1]^3 -->

In Python, we have to be sensitive about **inclusive vs. exclusive boundaries**
in generators like `range`, but you already know that. 

if you want to play with *infinite lists* in Python, learn more about [generators](https://jeffknupp.com/blog/2013/04/07/improve-your-python-yield-and-generators-explained/)


Intervals are used in conjunction with set operations:

- *intersection* e.g. ![interval-intersection](http://latex.codecogs.com/svg.latex?%5B3%2C%205%29%20%5Ccap%20%5B4%2C%206%5D%20%3D%20%5B4%2C%205%29)

<!-- [3, 5) \cap [4, 6] = [4, 5) -->

- *union* e.g. ![interval-union](http://latex.codecogs.com/svg.latex?%5B3%2C%205%29%20%5Ccup%20%5B4%2C%206%5D%20%3D%20%5B3%2C%206%5D)

<!-- [3, 5) \cup [4, 6] = [3, 6] -->

- *difference* e.g. ![interval-difference-1](http://latex.codecogs.com/svg.latex?%5B3%2C%205%29%20-%20%5B4%2C%206%5D%20%3D%20%5B3%2C%204%29) and ![interval-difference-2](http://latex.codecogs.com/svg.latex?%5B4%2C%206%5D%20-%20%5B3%2C%205%29%20%3D%20%5B5%2C%206%5D)

<!-- [3, 5) - [4, 6] = [3, 4) -->
<!-- [4, 6] - [3, 5)  = [5, 6] -->

Integer versions in basic python look like this

```python
# intersection of two int intervals
[x for x in range(3,5) if x in range(4, 6+1)]
# Out: [4]

# Union of two int intervals
[x for x in range(20) if x in range(3, 5) or x in range(4, 6+1)]
# Out: [3, 4, 5, 6]

# Set difference
[x for x in range(3, 5) if x not in range(4, 6+1)]
# Out: [3]

[x for x in range(4, 6+1) if x not in range(3, 5)]
# Out: [5, 6]
```

Using `np.linspace`, we can approximate what the real versions would look like. 

```python
R = np.linspace(-1, 9, 100)

# intersection of two float intervals
[x for x in R if 3 <= x < 5 and 4 <= x <= 6]

# Union of two float intervals
[x for x in R if 3 <= x < 5 or 4 <= x <= 6]

# set differences of two float intervals. 
[x for x in R if 3 <= x < 5 and not (4 <= x <= 6)]

[x for x in R if 4 <= x <= 6 and not (3 <= x < 5)]
```

You should definitely run these in repl and try to wrap your head around them. 



## more...

Like this guide? Suggest some [more features](https://github.com/Jam3/math-as-code/issues/1) or send us a Pull Request!

## Contributing

For details on how to contribute, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT, see [LICENSE.md](http://github.com/Jam3/math-as-code/blob/master/LICENSE.md) for details.

[1]: https://en.wikipedia.org/wiki/(%CE%B5,_%CE%B4)-definition_of_limit
[2]: http://mimosa-pudica.net/improved-oren-nayar.html#images
[3]: https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach
[4]: http://buzzard.ups.edu/courses/2007spring/projects/million-paper.pdf
[5]: https://www.math.washington.edu/~morrow/464_12/fft.pdf
