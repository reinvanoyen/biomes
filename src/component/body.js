"use strict";

const Vector2 = require('tnt-vec2');

const Body = {
	name: 'body',
	defaults: {
		velocity: new Vector2(0, 0),
		acceleration: new Vector2(0, 0),
		mass: 100
	}
};

/*
*     location = vec2(0, 0),
 velocity = vec2(0, 0),
 acceleration = vec2(0, 0),
 force = vec2(0, -0.1),
 mass = 100,

 * */

module.exports = Body;