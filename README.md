# Multitool
A collection of simple, handy JavaScript functions, objects, prototypes, etc.

## Usage
Right now, the only multitool available is math-multitool.js. It provides an array prototype that allows you to sum, multiply, and average arrays of numbers accurately, including decimals.

#### Example
(Plain JavaScript):

`var x = [0.1,0.2];`
`console.log(x[0] + x[1]);          // Returns 0.30000000000000004`

(With math-multitool):

`x.mm("sum");`
`console.log(x.sum);                // Returns 0.3`

At this time, the available options are "sum", "mutliply", and "average", which append "sum", "product", and "average" objects to the array respectively. To create all at once, use the "all" option.
