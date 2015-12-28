# Multitool
A collection of simple, handy JavaScript functions, objects, prototypes, etc.

## Usage
Right now, the only multitool available is math-multitool.js. It provides an array prototype that allows you to sum, multiply, average, and get the median of arrays of numbers accurately, including decimals, up to fifteen decimal digits.

The syntax for math-multitool is:
`array.mm(options);`

...where *options* is one or more of:
* "sum"
* "multiply"
* "average"
* "median"

#### Example
In plain JavaScript, decimal arithmetic can be inaccurate:

```var x = [0.1,0.2];

console.log(x[0] + x[1]);			// Returns 0.30000000000000004

console.log(x[0] * x[1]);			// Returns 0.020000000000000004```

With math-multitool, decimal calculations will be accurate up to 15 digits:

```x.mm("sum", "multiply");

console.log(x.sum);					// Returns 0.3

console.log(x.product);				// Returns 0.02```

## Plans
I'll add more math functions to math-multitool.js as I can, and more useful utilities that take new developers far too long to figure out will be added soon.
