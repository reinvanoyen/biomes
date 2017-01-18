"use strict";

const Vector2 = require('gl-matrix').vec2;

const Body = {
	name: 'body',
	defaults: {
		velocity: Vector2.fromValues(0, 0),
		maxVelocity: Vector2.fromValues(10, 15),
		force: Vector2.fromValues(0, 0),
		bounciness: 0,
		mass: Vector2.fromValues(5, 5)
	}
};

module.exports = Body;