"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2'),
	math = require('../util/math')
;

class Movement extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.body;
	}

	update(entity) {

		let {position, body} = entity.components;

		let acceleration = body.force.div(body.mass / 10);

		body.velocity = math.vector2Clamp(
			body.velocity.add(acceleration),
			new Vector2( -body.maxVelocity.x, -body.maxVelocity.y ),
			new Vector2( body.maxVelocity.x, body.maxVelocity.y )
		);

		position.value = position.value.add(body.velocity);
	}

	exit(entity) {}
}

module.exports = Movement;