'use strict';

export default class Utilities {
	static getMax(a, b) {
		return (a > b) ? a : b;
	}

	static getMin(a, b) {
		return (a < b) ? a : b;
	}

	static isNear(num1, num2, maxDif = 0) {
		return (num1 === num2) ||
			(num1 > num2 && num1 <= num2 + maxDif) ||
			(num1 < num2 && num1 >= num2 - maxDif);
	}
}

