"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2')
;

class Physics extends ECS.System {

	constructor(world) {

		super();
		this.world = world;
	}

	test(entity) {
		return entity.components.position && entity.components.body;
	}

	update(entity) {

		let {position, body} = entity.components;

		if( entity.components.collision && entity.components.collision.bottom ) {
			position.y = this.world.getWorldElevation(position.x);
			body.velocity.y = 0;
		}
	}

	exit(entity) {}
}

module.exports = Physics;