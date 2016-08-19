"use strict";

var ECS = require('yagl-ecs'),
	PIXI = require('pixi.js'),
	noise = require('../util/noise'),
	input = require('../input'),
	World = require('../world/world')
;

class WorldGenerationSystem extends ECS.System {

	constructor(stage, seed) {

		super();

		this.stage = stage;
		this.world = new World( seed, this.stage, 10, 3000 );
	}

	test(entity) {

		return ( entity.components.cam && entity.components.pos );
	}

	update(entity) {

		let {pos} = entity.components;

		this.world.render( pos.x, pos.y );
	}

	exit(entity) {}
}

module.exports = WorldGenerationSystem;