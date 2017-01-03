"use strict";

const ECS = require('yagl-ecs');

class Gravity extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.velocity;
	}

	update(entity) {

		let {velocity} = entity.components;

		velocity.y += .2;
	}

	exit(entity) {}
}

module.exports = Gravity;