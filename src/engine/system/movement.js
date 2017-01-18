"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('gl-matrix').vec2
;

class Movement extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.body;
	}

	update(entity) {

		let {position, body} = entity.components;

		let acceleration = Vector2.fromValues(0, 0);

		Vector2.divide( acceleration, body.force, body.mass );
		Vector2.add( body.velocity, body.velocity, acceleration );

		// Clamp velocity
		//Vector2.min( body.velocity, body.velocity, body.maxVelocity );

		/*
		let reversedMaxVelocity = Vector2.create();
		Vector2.negate( reversedMaxVelocity, body.maxVelocity );

		Vector2.max( body.velocity, body.velocity, reversedMaxVelocity );
		Vector2.min( body.velocity, body.velocity, body.maxVelocity );
		*/

		// Apply velocity
		Vector2.add( position.value, position.value, body.velocity );
	}

	exit(entity) {}
}

module.exports = Movement;