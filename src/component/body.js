"use strict";

const Vector2 = require('tnt-vec2');

const Body = {
	name: 'body',
	defaults: {
		velocity: new Vector2(0, 0),
		maxVelocity: new Vector2(15, 15),
		force: new Vector2(0, 0),
		bounciness: .1,
		mass: 50
	}
};

module.exports = Body;