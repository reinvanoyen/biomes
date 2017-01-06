"use strict";

const Vector2 = require('tnt-vec2');

const math = {
	randBetween: function( min, max ) {
		return Math.floor(Math.random() * max) + min;
	},
	randFloatBetween: function( min, max ) {
		return (Math.random() * (max - min) + min);
	},
	vector2Clamp: function( v, min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		return new Vector2(
			Math.max( min.x, Math.min( max.x, v.x ) ),
			Math.max( min.y, Math.min( max.y, v.y ) )
		);
	}
};

module.exports = math;