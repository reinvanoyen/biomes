"use strict";

const math = {
	randBetween: function( min, max ) {
		return Math.floor(Math.random() * max) + min;
	},
	randFloatBetween: function( min, max ) {
		return (Math.random() * (max - min) + min);
	},
	minFromArray: function( array ) {
		return Math.min.apply( Math, array );
	},
	maxFromArray: function( array ) {
		return Math.max.apply( Math, array );
	}
};

module.exports = math;