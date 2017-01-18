"use strict";

const Vector2 = require('gl-matrix').vec2;

const Position = {
	name: 'position',
	defaults: {
		value: Vector2.fromValues(0, 0)
	}
};

module.exports = Position;