"use strict";

const math = {
	randBetween: function( min, max ) {
		return Math.floor(Math.random() * max) + min;
	},
	randFloatBetween: function( min, max ) {
		return (Math.random() * (max - min) + min);
	}
};

module.exports = math;