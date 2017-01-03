"use strict";

const ECS = require('yagl-ecs');

class CollisionDetection extends ECS.System {

	test(entity) {
		return entity.components.position;
	}

	update(entity) {

		let {position} = entity.components;

		if( position.y >= 300 ) {

			position.y = 300;

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