"use strict";

const ECS = require('yagl-ecs'),
	MessageManager = require('../core/messagemanager')
;

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

		if( position.y >= elevation ) {

			if(entity.components.collision && ! entity.components.collision.bottom) {

				MessageManager.trigger('collision::onGround', {
					entity: entity
				});

				entity.components.collision.bottom = true;
			}

		} else {

			if(entity.components.collision && entity.components.collision.bottom) {

				MessageManager.trigger('collision::offGround', {
					entity: entity
				});

				entity.components.collision.bottom = false;
			}
		}
	}

	exit(entity) {}
}

module.exports = CollisionDetection;