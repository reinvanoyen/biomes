"use strict";

const Vector2 = require('gl-matrix').vec2;

const Body = {
	name: 'body',
	getDefaults: function() {
		return {
			velocity: Vector2.fromValues(0.0, 0.0),
			maxVelocity: Vector2.fromValues(10.0, 15.0),
			force: Vector2.fromValues(0.0, 0.0),
			acceleration: Vector2.fromValues(0, 0),
			mass: Vector2.fromValues(1.0, 1.0),
			bounciness: 0
		};
	}
};

module.exports = Body;