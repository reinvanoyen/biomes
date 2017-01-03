"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2')
;

class Physics extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.velocity;
	}

	update(entity) {

		let {position, velocity} = entity.components;

		let positionVec2 = new Vector2(position.x, position.y),
			velocityVec2 = new Vector2(velocity.x, velocity.y)
		;

		let newPositionVec2 = positionVec2.add(velocityVec2);

		position.x = newPositionVec2.x;
		position.y = newPositionVec2.y;
	}

	exit(entity) {}
}

module.exports = Physics;