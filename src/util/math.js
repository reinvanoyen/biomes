"use strict";

const math = {
	randBetween: function( min, max ) {
		return Math.floor(Math.random() * max) + min;
	}
};

module.exports = math;