/* ==========================================================================
 * Math Multitool
 * Copyright 2015 by Damon Kaswell.
 * This JavaScript library is free to use under the MIT License.
 * ==========================================================================
 * 
 * This prototype allows you to quickly and easily perform a wide range of
 * accurate mathematical calculations on arrays of numbers (or strings that
 * can be converted into numbers).
 *
 * For more information, go to https://github.com/GoodDamon/multitool
 */

Array.prototype.mm = function(type) {
	if(type !== "sum" && type !== "multiply" && type !== "average" && type !== "all") {
		console.log("Math Multitool\n--------------\nUsage: array.mm('<type>')\nAvailable types are:\n  sum\n  multiply\n  average");
		return;
	}
	var k = Object.keys(this);

	var decimals = 0;

	// First we replace strings with numbers and get the longest decimal length
	for (var i = 0; i < this.length; i++) {
		if(k[i] !== "total") { // Avoid including a "total" if one already exists.
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
	if(type === "sum" || type === "all") {
		var sum = 0;
		for (var i = 0; i < this.length; i++) {
			if(k[i] !== "sum" && k[i] !== "product" && k[i] !== "average") { // Again, avoid including a "total" if one already exists.
				var entry = this[i] * multiplier;
				sum += entry;
			}
		}
		this["sum"] = sum/multiplier;
	}

	// Product
	if(type === "multiply" || type === "all") {
		var product = 0;
		var entries = [];
		for(var i = 0; i < this.length; i++) {
			if(k[i] !== "sum" && k[i] !== "product" && k[i] !== "average") { // Again, avoid including a "total" if one already exists.
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

	// Average
	if(type === "average" || type === "all") {
		var average = 0;
		var entries = [];
		for(var i = 0; i < this.length; i++) {
			if(k[i] !== "total") { // Again, avoid including a "total" if one already exists.
				var entry = this[i] * multiplier;
				entries.push(entry);
			}
		}
		for (var i = 0; i < entries.length; i++) {
			average += entries[i];
		}
		average = average/entries.length;
		this["average"] = average/multiplier;
	}
}