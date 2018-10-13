# Math Multitool Calculator
A collection of simple, handy JavaScript math tools that can be implemented anywhere.

## Installation
`npm install --save math-multitool`

In node:
```JavaScript
const MMCalculator = require('math-multitool');
```

In browsers:
```HTML
<script type="module"- src="./path/to/math-multitool.js"></script>
```

-or-

```JavaScript
import MMCalculator from './path/to/math-multitool.js';
```

## Usage
In plain JavaScript, decimal calculations can be inaccurate:

```JavaScript
const x = [0.1,0.2];

console.log(x[0] + x[1]);    // Returns 0.30000000000000004
console.log(x[0] * x[1]);    // Returns 0.020000000000000004
```

Math Multitool provides a class (MMCalculator) with getters and utility methods that allow you to do things like sum, multiply, average, and get the median of arrays of numbers accurately. With MMCalculator, decimal calculations will be accurate up to 15 digits:

Currently, MMCalculator will perform the following actions:

* Sum
* Multiply
* Divide
* Subtract
* Average (mean, median, and mode)
* Get Minimum
* Get Maximum

### MMCalculator class
The MMCalculator class is initialized with an array of numbers.
```JavaScript
const myArray = [2, 2.5, 5, 5, 4];
const myCalc = new MMCalculator (myArray);

// MMCalculator uses getter syntax to make performing calculations simple:

console.log(myCalc.max);            // Returns 5
console.log(myCalc.min);            // Returns 2

console.log(myCalc.product);        // Returns 500
console.log(myCalc.sum);            // Returns 18.5
console.log(myCalc.mean);           // Returns 3.7
console.log(myCalc.median);         // Returns 4
console.log(myCalc.mode);           // Returns 5
```

To change the array, set the `value` of the calculator object to a new array:

```JavaScript
myCalc.value = [5, 15, 8.7, 103, 0.05];
```

### MMCalculator utility methods
MMCalculator's utility methods are:
* `add(arg1, ...argN)`
* `subtract(arg1, arg2)`
* `multiply(arg1, ...argN)`
* `divide(arg1, arg2)`
* `fractionalize(value)`
* `decimalize(numerator, denominator)`.

Example:
```JavaScript
console.log(MMCalculator.add(0.125, 0.20501)) // Returns exactly 0.33001
```

**Note**: Fractionalize is designed to return fractions with denominators equal to a power of 10. That is to say, rather than returning a fraction of `[1, 2]`, it will always return a fraction of `[5, 10]`.

## Future Plans
I'll add more math functions to math-multitool.js as I can.
