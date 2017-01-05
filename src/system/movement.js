"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2')
;

class Movement extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.body;
	}

	update(entity) {

		let {position, body} = entity.components;

		let positionVec2 = new Vector2(position.x, position.y);
		body.velocity = body.velocity.add(body.acceleration);
		let newPositionVec2 = positionVec2.add(body.velocity);

		position.x = newPositionVec2.x;
		position.y = newPositionVec2.y;
	}

	exit(entity) {}
}

module.exports = Movement;