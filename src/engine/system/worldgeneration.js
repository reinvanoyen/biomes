"use strict";

const ECS = require('yagl-ecs'),
	input = require('../input'),
	World = require('../world/world')
;

class WorldGeneration extends ECS.System {

	constructor(seed) {
		super();
		this.world = new World(seed);
	}

	test(entity) {
		return entity.components.camera && entity.components.position;
	}

	update(entity) {
		this.world.render( entity.components.position.value );
	}

	exit(entity) {}
}

module.exports = WorldGeneration;