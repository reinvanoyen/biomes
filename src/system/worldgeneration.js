"use strict";

const ECS = require('yagl-ecs'),
	input = require('../input'),
	World = require('../world/world')
;

class WorldGeneration extends ECS.System {

	constructor(stage, seed) {
		super();
		this.stage = stage;
		this.world = new World(seed, this.stage, 10, 3000);
	}

	test(entity) {
		return entity.components.camera && entity.components.position;
	}

	update(entity) {

		let {position} = entity.components;

		this.world.render(position.x, position.y);
	}

	exit(entity) {}
}

module.exports = WorldGeneration;