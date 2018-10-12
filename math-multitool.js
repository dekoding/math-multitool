const { validate, makeMultiplier, isNumber } = require('./lib/mmlibrary.js');

class MMCalculator {
	constructor(input = []) {
		validate(input);
		this.input = input;
		this.multiplier = makeMultiplier(input);
  	}

	set value(input) {
		validate(input);
		this.input = input;
		this.multiplier = makeMultiplier(input);
	}

	set replaceElement(input) {
		const { index, value } = input;
		if (!isNumber.test(value)) {
			throw `MMCalculator expected number, got ${typeof value}.`;
		}

		if (!this.input[index]) {
			throw `MMCalculator cannot replace nonexistent element.`;
		}

		this.input[index] = value;
		validate(this.input);
		this.multiplier = makeMultiplier(this.input);
	}

	get value() {
	    return this.input;
	}

	get sum() {
		const workingArray = this.input.map(elem => elem * this.multiplier);
		const workingSum = workingArray.reduce((prev, next) => prev + next);
		return workingSum / this.multiplier;
	}

	get product() {
		let product = 0;
		const divisor = Math.pow(this.multiplier, this.input.length);

		this.input.forEach((elem, index) => {
		    if (index === 0) {
		        product += elem * this.multiplier;
		    } else {
		        product *= elem * this.multiplier;
		    }
		});
		return product / divisor;
	}

	get mean() {
		let mean = 0;

		this.input.forEach(elem => {
		    mean += elem * this.multiplier;
		});

		mean = mean / this.input.length;
		return mean / this.multiplier;
	}

	get median() {
		const workingMedian = this.input.map(elem => elem * this.multiplier);
		if (workingMedian.length === 1) { // The array has only one object. Return it.
			return this.input[0];
		} else {
			workingMedian.sort(
				function(a,b) {
					return parseFloat(a) - parseFloat(b);
				}
			);
			const half = Math.floor(workingMedian.length / 2);
			if(workingMedian.length % 2) {
				return workingMedian[half] / this.multiplier;
			} else {
				const low = workingMedian[half - 1];
				const high = workingMedian[half];
				const median = (high + low) / 2;
				return median / this.multiplier;
			}
		}
	}

	get mode() {
		const workingMode = this.input.map(member => member * this.multiplier);
		let max = 0;
		let mode = [];

		let str = workingMode.sort();
		str = '~' + str.join('~~') + '~';
		str.replace( /(~\-?\d+~)\1*/g, function(a, b){
			const m = a.length / b.length;
			if (max <= m ) {
				if (max < m) {mode.length = 0;max = m;}
				mode.push( +b.replace(/~/g,''));
			}
		});
		if (mode.length > 1) {
			if(mode.length === workingMode.length) { // No duplicate entries exist in the array
				return 0;
			} else {
			    return mode.map(elem => elem / this.multiplier);
			}
		} else {
			return mode[0] / this.multiplier;
		}
	}

	get max() {
		return Math.max.apply(Math, this.input);
    }

    get min() {
    	return Math.min.apply(Math, this.input);
	}

	static fractionalize(value) {
		const decLength = (value.toString().split('.')[1] || []).length;
		const multiplier = Math.pow(10, decLength + 1);
		const numerator = Math.round(value * multiplier) / 10;
		const denominator = multiplier / 10;

		return [numerator, denominator];
	}

	static decimalize(numerator, denominator) {
		let decimals = 0;
		const numeratorLength = (numerator.toString().split('.')[1] || []).length;
		const denominatorLength = (denominator.toString().split('.')[1] || []).length;
		if (numeratorLength > decimals && numeratorLength > denominatorLength) {
			decimals = numeratorLength;
		}
		if (denominatorLength > decimals && denominatorLength > numeratorLength) {
			decimals = denominatorLength;
		}
		// Extra precaution
		decimals += 1;

		return ((Math.pow(10, decimals)) * numerator) / ((Math.pow(10, decimals)) * denominator);
	}

	static add() {
		const args = Array.from(arguments);
		validate(args);
		const multiplier = makeMultiplier(args);
		const workingArray = args.map(elem => elem * multiplier);
		const workingSum = workingArray.reduce((prev, next) => prev + next);
		return workingSum / multiplier;
	}

	static subtract(x, y) {
		validate([x, y]);
		const multiplier = makeMultiplier([x, y]);
		return ( x * multiplier ) - ( y * multiplier ) / multiplier;
	}

	static multiply() {
		const args = Array.from(arguments);
		validate(args);
	 	const multiplier = makeMultiplier(args);
		const divisor = Math.pow(multiplier, args.length);

		let product = 0;
		args.forEach((elem, index) => {
		    if (index === 0) {
		        product += elem * multiplier;
		    } else {
		        product *= elem * multiplier;
		    }
		});
		return product / divisor;
	}

	static divide(x, y) {
		validate([x, y]);
		const multiplier = makeMultiplier([x, y]);
		return (x * multiplier) / (y * multiplier);
	}
}

module.exports = MMCalculator;
