"use strict";

const ECS = require('yagl-ecs');

class AI extends ECS.System {

	test(entity) {
		return entity.components.behavior;
	}

	update(entity) {

		let {behavior} = entity.components;

		if( behavior.state == 'idle' ) {
			if( entity.components.sprite ) {
				entity.sprite.alpha = .5;
			}
		} else {
			if( entity.components.sprite ) {
				entity.sprite.alpha = 1;
			}
		}
	}
}

module.exports = AI;