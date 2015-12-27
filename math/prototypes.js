/* This prototype allows you to sum the numbers in an array. Once an array has been summed, a new
 * member of the array called "total" will be added to the array. It's smart enough to convert
 * strings in quotes into JavaScript number types if the strings are numbers.
 *
 * USAGE EXAMPLE:
 *
 * var myNum = [3, "4.4", 10];
 * myNum.sum();
 * console.log(myNum.total);                                // Returns 17.4;
 *
 * var mySecondNum = [0.002312, 2000.1, 0.2]
 * mySecondNum.sum();
 * console.log(mySecondNum.total);                          // Returns 2000.302312
 */

Array.prototype.sum = function() {
	var k = Object.keys(this);
	var total = 0;

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
				if (typeof retry === "number" && retry !== "NaN") {
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

	// Next we multiply everything by the multiplier and add it to the total
	for (var i = 0; i < this.length; i++) {
		if(k[i] !== "total") { // Again, avoid including a "total" if one already exists.
			var entry = this[i] * multiplier;
			total += entry
		}
	}

	// Finally, we divide the total by the multiplier and pass the value to the array.
    this["total"] = total/multiplier;
}
