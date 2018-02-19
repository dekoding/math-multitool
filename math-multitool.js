/* ==========================================================================
 * Math Multitool
 * Copyright 2018 by Damon Kaswell.
 * This JavaScript library is free to use under the MIT License.
 * ==========================================================================
 *
 * Math Multitool allows you to quickly and easily perform a wide range of
 * accurate mathematical calculations on numbers and arrays of numbers (or
 * strings that can be converted into numbers).
 *
 * For more information, go to https://github.com/GoodDamon/multitool
 */

/* This array prototype allows you to take an array of numbers and sum them,
 * multiply them, find their mean, median, and mode, and get the largest and
 * smallest value.
 */
Array.prototype.mm = function() {
	// Usage.
	const usage = `
	    Math Multitool\n
		--------------\n
		Usage: array.mm('<option>' [, '<option2>', <option3>...])\n
		Available options are:\n
		sum\n
		multiply\n
		average\n
		median\n
		mode\n
		max\n
		min\n
		all (performs all available calculations
	`;
	
	// Empty arrays exit with an error.
	if (this.length === 0) {
		console.log(usage);
		console.error('Error: Array is empty.');
		return;
	}

	// Available options
	const options = [
		'sum',
		'multiply',
		'average',
		'median',
		'mode',
		'max',
		'min',
		'all'
	];

	// Disabled by default
	const enabled = [ false, false, false, false, false, false, false, false ];

	// Process arguments
	const args = Array.from(arguments);
	args.forEach(argument => {
	    const index = options.findIndex(member => member === argument);
	    if (index === -1) {
	        console.log(usage);
			console.log(`Unrecognized option: ${argument}.`);
	        return;
	    }
	    
	    enabled[index] = true;
	});

	// Get decimals, and check to make sure none of the array members are objects or strings that can't be converted to numbers.
	let decimals = 0;
	
	const working = [];
	
	this.forEach((member, index) => {
		if (typeof member === 'number') {
		    working.push(member);
			const decLength = (member.toString().split('.')[1] || []).length;
			if(decLength > decimals) {
				decimals = decLength;
			}
		} else if (typeof member === 'string') {
			const retry = +member;
			if (!isNaN(retry)) {
			    working.push(retry);
				const decLength = (retry.toString().split('.')[1] || []).length;
				if (decLength > decimals) {
					decimals = decLength;
				}
			} else {
				console.error(`Array member ${member} at position ${index} is not a number and can't be converted to one.`);
				return;
			}
		} else {
			console.error(`Array member ${member} at position ${index} is not a number and can't be converted to one.`);
			return;
		}
	});

	// Set a multiplier to cancel decimals.
	const multiplier = decimals !== 0 ? Math.pow(10, decimals) : 1;
	
	// Create the result object.
	let result = {};

	// Sum
	if (enabled[0] || enabled[7]) {
	    const sum = working.reduce((prev, next) => prev + next);
	    result['sum'] = sum;
	}

	// Product
	if (enabled[1] || enabled[7]) {
		let product = 0;

		// Set a divisor to undo the multiplication.
		const divisor = Math.pow(multiplier, working.length);

		// Building the total
		working.forEach((member, index) => {
		    if (index === 0) {
		        product += member;
		    } else {
		        product *= member;
		    }
		});

		// Divide the total by the divisor and pass the value to the result object.
		result['product'] = product/divisor;
	}

	// Mean
	if (enabled[2] || enabled[7]) {
		let mean = 0;
		
		working.forEach(member => {
		    mean += member * multiplier;
		});

		mean = mean/working.length;
		result['mean'] = mean/multiplier;
	}

	// Median
	if(enabled[3] || enabled[7]) {
	    const workingMedian = working.map(member => member * multiplier);
		if (workingMedian.length === 1) { // The array has only one object. Return it.
			result['median'] = working[0];
		} else {
			workingMedian.sort(
				function(a,b) {
					return parseFloat(a) - parseFloat(b);
				}
			);
			const half = Math.floor(workingMedian.length / 2);
			if(workingMedian.length % 2) {
				result['median'] = workingMedian[half] / multiplier;
			} else {
				const low = workingMedian[half - 1];
				const high = workingMedian[half];
				const median = (high + low) / 2;
				result['median'] = median / multiplier;
			}
		}
	}

	// Mode
	if(enabled[4] || enabled[7]) {
	    const workingMode = working.map(member => member * multiplier);
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
				result['mode'] = 0;
			} else {
			    result['mode'] = mode.map(member => member / multiplier);
			}
		} else {
			result['mode'] = mode[0] / multiplier;
		}
	}
	
	// Max and min, courtesy of John Resig's pure, unadulterated genius
	if(enabled[5] || enabled[7]) {
    	result['max'] = Math.max.apply(Math, working);
    }

    if(enabled[6] || enabled[7]) {
    	result['min'] = Math.min.apply(Math, working);
    }
    
    return result;
};

/* The mm functions provide quick and easy tools for converting a number to a
 * fraction or reversing the process. Especially handy for dealing elegantly
 * with decimals.
 */

const mm = {
	fractionalize: function(number) {
		const decLength = (number.toString().split('.')[1] || []).length;
		const multiplier = Math.pow(10, decLength + 1);
		const numerator = Math.round(number * multiplier) / 10;
		const denominator = multiplier / 10;

		return [numerator, denominator];
	},
	decimalize: function(numerator, denominator) {
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
};
