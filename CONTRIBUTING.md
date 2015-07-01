## Contributing

### Issues

If you see errors in the math, problems in the wording/language, or issues with how a symbol/equation translates into code, please create an issue.

Please [search existing issues](https://github.com/Jam3/math-as-code/issues) before posting a new one.

### Pull Requests

Pull requests are awesome! :tada: If you are going to be adding a new feature or making major changes, it's best to open a new issue to discuss it before you go ahead and work on the PR.

Some other guidelines:

- Keep PRs clean, and only change parts that are relevant to your feature/fix. Different features/fixes are best submitted as independent PRs.
- Some unicode symbols can be used inline, but overall the goal of this is to demystify the equations commonly found in literature. Please use LaTeX SVGs, see the next point.
- Currently, equations are authored with [this LaTeX editor](http://www.codecogs.com/latex/eqneditor.php), with SVG selected, and images are linked directly to the resulting URL.
- Also include the raw LaTeX as a Markdown comment directly below the image. Comments use the form: `<!-- comment -->`
- Code should be syntax highlighted with `js` and follow [this style guide](https://github.com/feross/standard).
- Please try to maintain the overall writing style in any new changes.


#### LaTeX Example

Here is an example of how a new equation might look in LaTeX:

```md
![piecewise1](http://latex.codecogs.com/svg.latex?f%28x%29%3D%20%5Cbegin%7Bcases%7D%20%5Cfrac%7Bx%5E2-x%7D%7Bx%7D%2C%26%20%5Ctext%7Bif%20%7D%20x%5Cgeq%201%5C%5C%200%2C%20%26%20%5Ctext%7Botherwise%7D%20%5Cend%7Bcases%7D)

<!--    
f(x)= 
\begin{cases}
    \frac{x^2-x}{x},& \text{if } x\geq 1\\
    0, & \text{otherwise}
\end{cases} 
-->
```

The rendered result:

![piecewise1](http://latex.codecogs.com/svg.latex?f%28x%29%3D%20%5Cbegin%7Bcases%7D%20%5Cfrac%7Bx%5E2-x%7D%7Bx%7D%2C%26%20%5Ctext%7Bif%20%7D%20x%5Cgeq%201%5C%5C%200%2C%20%26%20%5Ctext%7Botherwise%7D%20%5Cend%7Bcases%7D)