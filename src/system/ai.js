"use strict";

const ECS = require('yagl-ecs');

class AI extends ECS.System {

	test(entity) {
		return entity.components.walkingbehavior;
	}

	update(entity) {

		let {walkingbehavior} = entity.components;

		if( walkingbehavior.state == 'idle' ) {

			if( entity.components.body ) {
				entity.components.body.velocity.x = .3;
			}
		}
	}
}
//
module.exports = AI;