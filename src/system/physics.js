"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2')
;

class Physics extends ECS.System {

	constructor() {

		super();
	}

	test(entity) {
		return entity.components.position && entity.components.body;
	}

	update(entity) {

		let {position, body} = entity.components;

		if( entity.components.collision && entity.components.collision.bottom ) {
			position.y = 0;
			body.velocity.y = 0;
		}
	}

	exit(entity) {}
}

module.exports = Physics;