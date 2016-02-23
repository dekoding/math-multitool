/* ==========================================================================
 * Math Multitool
 * Copyright 2015 by Damon Kaswell.
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
	// Usage
	var usage = "Math Multitool\n" + 
		"--------------\n" + 
		"Usage: array.mm('<options>')\n" + 
		"Available options are:\n" + 
		"  sum\n" + 
		"  multiply\n" + 
		"  average\n" + 
		"  median\n" + 
		"  mode\n" + 
		"  max\n" + 
		"  min\n" + 
		"  all (performs all available calculations";

	// Available options
	var options = [
		"sum",
		"multiply",
		"average",
		"median",
		"mode",
		"max",
		"min",
		"all"
	];

	// Disabled by default
	var enableSum = false;
	var enableMultiply = false;
	var enableAverage = false;
	var enableMedian = false;
	var enableMode = false;
	var enableMax = false;
	var enableMin = false;

	// Options requested and error checking
	if(arguments.length === 0) {
		console.log(usage);
		console.log("No options specified!");
		return;
	}
	for(var i = 0; i < arguments.length; i++) {
		if(options.indexOf(arguments[i]) === 0) enableSum = true;
		else if(options.indexOf(arguments[i]) === 1) enableMultiply = true;
		else if(options.indexOf(arguments[i]) === 2) enableAverage = true;
		else if(options.indexOf(arguments[i]) === 3) enableMedian = true;
		else if(options.indexOf(arguments[i]) === 4) enableMode = true;
		else if(options.indexOf(arguments[i]) === 5) enableMax = true;
		else if(options.indexOf(arguments[i]) === 6) enableMin = true;
		else if(options.indexOf(arguments[i]) === 7) {
			enableSum = true;
			enableMultiply = true;
			enableAverage = true;
			enableMedian = true;
			enableMode = true;
			enableMax = true;
			enableMin = true;
		} else {
			console.log(usage);
			console.log("Unrecognized option '" + argument[i] + "' requested!");
			return;
		}
    }
	if(this.length === 0) {
		console.log(usage);
		console.log("Cannot process empty array!");
		return;
	}

	// Get keys, decimals, and check to make sure none of the array members are objects or strings that can't be converted to numbers.
	var k = Object.keys(this);

	var decimals = 0;

	for (var i = 0; i < this.length; i++) {
		if(options.indexOf(k[i]) === -1) { // Avoid including an mm total.
			if (typeof this[i] === "number") {
				var decLength = (this[i].toString().split('.')[1] || []).length;
				if(decLength > decimals) {
					decimals = decLength;
				}
			} else if (typeof this[i] === "string") {
				var retry = +this[i];
				if(!isNaN(retry)) {
					var decLength = (retry.toString().split('.')[1] || []).length;
					if(decLength > decimals) {
						decimals = decLength;
					}
					this[i] = retry;
				} else {
					console.log("String '" + this[i] + "' in place #" + i + " is not a number and can't be converted to one.");
					return;
				}
			} else {
				console.log("Object in place #" + i + " is not a number or string.");
				return;
			}
		}
	}

	// Now we set a multiplier so we're summing integers, since JavaScript doesn't deal well with decimals.
	if(decimals !== 0) {
		var multiplier = Math.pow(10, decimals);
	} else {
		var multiplier = 1; // Default if none of the numbers are decimals.
	}

	// Sum
	if(enableSum) {
		var sum = 0;
		for (var i = 0; i < this.length; i++) {
			if(options.indexOf(k[i]) === -1) { // Avoid including an mm total.
				var entry = this[i] * multiplier;
				sum += entry;
			}
		}
		this["sum"] = sum/multiplier;
	}

	// Product
	if(enableMultiply) {
		var product = 0;
		var entries = [];
		for(var i = 0; i < this.length; i++) {
			if(options.indexOf(k[i]) === -1) { // Avoid including an mm total.
				var entry = this[i] * multiplier;
				entries.push(entry);
			}
		}

		// Setting a divisor to undo the multiplication.
		var divisor = Math.pow(multiplier, entries.length);

		// Building the total
		for(var i = 0; i < entries.length; i++) {
			if(i === 0) {
				product += +entries[i];
			} else {
				product = product * +entries[i];
			}
		}

		// Finally, we divide the total by the divisor and pass the value to the array.
		this["product"] = product/divisor;
	}

	// Mean
	if(enableAverage) {
		var mean = 0;
		var entries = [];
		for(var i = 0; i < this.length; i++) {
			if(options.indexOf(k[i]) === -1) { // Avoid including an mm total.
				var entry = this[i] * multiplier;
				entries.push(entry);
			}
		}
		for (var i = 0; i < entries.length; i++) {
			mean += entries[i];
		}
		mean = mean/entries.length;
		this["mean"] = mean/multiplier;
	}

	// Median
	if(enableMedian) {
		var entries = [];
		for(var i = 0; i < this.length; i++) {
			if(options.indexOf(k[i]) === -1) { // Avoid including an mm total.
				var entry = this[i] * multiplier;
				entries.push(entry);
			}
		}
		if(entries.length === 1) { // The array has only one object. Return it.
			this["median"] = this[0];
		} else {		
			entries.sort(
				function(a,b) {
					return parseFloat(a) - parseFloat(b);
				}
			);
			var half = Math.floor(entries.length / 2);
			if(entries.length % 2) {
				this["median"] = entries[half] / multiplier;
			} else {
				var low = entries[half - 1];
				var high = entries[half];
				median = (high + low) / 2;
				this["median"] = median / multiplier;
			}
		}
	}

	// Mode
	if(enableMode) {
		var max = 0;
		var mode = [];
		var entries = [];
		for(var i = 0; i < this.length; i++) {
			if(options.indexOf(k[i]) === -1) { // Avoid including an mm total.
				entries.push(this[i] * multiplier);
			}
		}

		var str = entries.sort();
		str = "~" + str.join('~~') + "~";
		str.replace( /(~\-?\d+~)\1*/g, function(a,b){
			var m = a.length / b.length;
			if (max <= m ) {
				if (max < m) {mode = [];max = m;}
				mode.push( +b.replace(/~/g,""));
			}
		});
		if(mode.length > 1) {
			if(mode.length === entries.length) { // No duplicate entries exist in the array
				this["mode"] = 0;
			} else {
				for(var i = 0; i < mode.length; i++) {
					mode[i] = mode[i] / multiplier;
				}
				this["mode"] = mode;
			}
		} else {
			this["mode"] = mode[0] / multiplier;
		}
	}
	// Max and min, courtesy of John Resig's pure, unadulterated genius
	if(enableMax) {
    	this["max"] = Math.max.apply(Math, this);
    }

    if(enableMin) {
    	this["min"] = Math.min.apply(Math, this);
    }
};

/* The mm functions provide quick and easy tools for converting a number to a
 * fraction or reversing the process. Especially handy for dealing elegantly
 * with decimals.
 */

var mm = {
	fractionalize: function(number) {
		var decLength = (number.toString().split('.')[1] || []).length;
		var multiplier = Math.pow(10, decLength + 1);
		var numerator = Math.round(number * multiplier) / 10;
		var denominator = multiplier / 10;

		var fraction = [numerator, denominator];
		return fraction;
	},
	decimalize: function(numerator, denominator) {
		var decimals = 0;
		var numeratorLength = (numerator.toString().split('.')[1] || []).length;
		var denominatorLength = (denominator.toString().split('.')[1] || []).length;
		if (numeratorLength > decimals && numeratorLength > denominatorLength) {
			decimals = numeratorLength;
		}
		if (denominatorLength > decimals && denominatorLength > numeratorLength) {
			decimals = denominatorLength;
		}
		// Extra precaution
		decimals += 1;

		var value = ((Math.pow(10, decimals)) * numerator) / ((Math.pow(10, decimals)) * denominator);
		return value;
	}
};
