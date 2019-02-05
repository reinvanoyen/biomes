"use strict";

const ECS = require('yagl-ecs');

class CollisionDetection extends ECS.System {

	constructor(world) {

		super();
		this.world = world;
	}

	test(entity) {
		return entity.components.position && entity.components.collision;
	}

	update(entity) {

		let {position} = entity.components;

		let elevation = this.world.getWorldElevation(position.value[0]);

    if (position.value[1] >= elevation) {
      entity.components.collision.bottom = true;
    } else {
      entity.components.collision.bottom = false;
    }
	}

	exit(entity) {}
}

module.exports = CollisionDetection;