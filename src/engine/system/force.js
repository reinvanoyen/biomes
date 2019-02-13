"use strict";

const ECS = require('yagl-ecs');
const Vector2 = require('gl-matrix').vec2;

class Force extends ECS.System {

	test(entity) {
		return entity.components.body;
	}

	update(entity) {

		let { body } = entity.components;

		Vector2.add(body.force, body.force, Vector2.fromValues(0, .9));
	}

	exit(entity) {}
}

module.exports = Force;