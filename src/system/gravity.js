"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2')
;

class Gravity extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.body;
	}

	update(entity) {

		let {body} = entity.components;
		body.velocity = body.velocity.add(new Vector2(0, .3));
	}

	exit(entity) {}
}

module.exports = Gravity;