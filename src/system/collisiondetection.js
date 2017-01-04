"use strict";

const ECS = require('yagl-ecs');

class CollisionDetection extends ECS.System {

	constructor(world) {

		super();

		this.world = world;
	}

	test(entity) {
		return entity.components.position;
	}

	update(entity) {

		let {position} = entity.components;

		let elevation = 0;
		//let elevation = this.world.getElevationAt( position.x );

		if( position.y >= elevation ) {

			position.y = elevation;

			if(entity.components.velocity) {
				entity.components.velocity.y = 0;
			}

			if(entity.components.collision) {
				entity.components.collision.bottom = true;
			}

		} else {

			if(entity.components.collision) {
				entity.components.collision.bottom = false;
			}
		}
	}

	exit(entity) {}
}

module.exports = CollisionDetection;