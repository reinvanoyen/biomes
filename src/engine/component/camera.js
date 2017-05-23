"use strict";

const Vector2 = require('gl-matrix').vec2;

const Camera = {
	name: 'camera',
	getDefaults: function() {
		return {
			offset: Vector2.fromValues(0.0, 300.0)
		};
	}
};

module.exports = Camera;