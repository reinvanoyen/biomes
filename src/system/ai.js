"use strict";

const ECS = require('yagl-ecs');

class AI extends ECS.System {

	test(entity) {
		return entity.components.behavior;
	}

	enter(entity) {
		if(entity.components.velocity) {
			entity.components.velocity.x = .8;
		}
	}

	update(entity) {
		// @TODO
	}
}

module.exports = AI;