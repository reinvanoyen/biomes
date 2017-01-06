"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2')
;

class Force extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.body;
	}

	update(entity) {

		let {body} = entity.components;
		body.force = body.force.add(new Vector2(0, .2));
	}

	exit(entity) {}
}

module.exports = Force;