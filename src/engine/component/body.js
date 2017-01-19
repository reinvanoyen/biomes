"use strict";

const glMatrix = require('gl-matrix');

const Body = {
	name: 'body',
	getDefaults: function() {
		return {
			velocity: glMatrix.vec2.fromValues(0.0, 0.0),
			maxVelocity: glMatrix.vec2.fromValues(10.0, 15.0),
			force: glMatrix.vec2.fromValues(0.0, 0.0),
			acceleration: glMatrix.vec2.fromValues(0, 0),
			mass: glMatrix.vec2.fromValues(5.0, 5.0),
			bounciness: 0
		};
	}
};

module.exports = Body;