const MMCalculator = require('./math-multitool.js');

const myArray = [2, 2.5, 5, 5, 4];

const myCalc = new MMCalculator (myArray);

console.log('Class getters');
console.log('Numbers used: ', JSON.stringify(myArray));
console.log('Max: ', myCalc.max);
console.log('Min: ', myCalc.min);

console.log('Product:', myCalc.product);
console.log('Sum: ', myCalc.sum);
console.log('Mean: ', myCalc.mean);
console.log('Median: ', myCalc.median);
console.log('Mode: ', myCalc.mode);

console.log('\nUtility methods');
console.log('4 + 3 = ', MMCalculator.add(4,3));
console.log('0.2 + 0.1 = ', MMCalculator.add(0.2,0.1));
console.log('4 * 3 * 2 = ', MMCalculator.multiply(4,3,2));
console.log('0.4 / 0.2 = ', MMCalculator.divide(0.4,0.2));
console.log('10 - 5 = ', MMCalculator.subtract(10,5));
