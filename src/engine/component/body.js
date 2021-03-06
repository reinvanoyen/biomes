"use strict";

const Vector2 = require('gl-matrix').vec2;

const Body = {
	name: 'body',
	getDefaults: function() {
		return {
			velocity: Vector2.fromValues(0.0, 0.0),
			maxVelocity: Vector2.fromValues(15.0, 15.0),
			force: Vector2.fromValues(0.0, 0.0),
			acceleration: Vector2.fromValues(0, 0),
			mass: .5,
			bounciness: .5
		};
	}
};

module.exports = Body;