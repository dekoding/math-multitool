const isNumber =  /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
const validate = (input) => {
    if (!Array.isArray(input)) {
        throw `MMCalculator: Expected array, got ${typeof input}.`;
    }

    input.forEach((elem, index) => {
        elem = +elem; // Turn strings like "0.142" into numbers
        if (!isNumber.test(elem)) {
            throw `MMCalculator: "${elem}" at position ${index} is not a number.`;
        }
    });

    // Return true if we get here.
    return true;
}

const makeMultiplier = (input) => {
    let count = 0;
    input.forEach(elem => {
        const decLength = (elem.toString().split('.')[1] || []).length;
        if(decLength > count) {
            count = decLength;
        }
    });
    return count !== 0 ? Math.pow(10, count) : 1;
}

module.exports = { validate, makeMultiplier, isNumber };
