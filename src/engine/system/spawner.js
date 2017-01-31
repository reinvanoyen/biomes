"use strict";

const ECS = require('yagl-ecs'),
	MessageManager = require('../messaging/messagemanager')
;

class Spawner extends ECS.System {

	constructor(ecs) {

		super();
		this.ecs = ecs;

		/*
		MessageManager.addListener( 'spawner::spawnEntity', e => {

			let entity = new Tree();
			entity.updateComponent('position', {value: Vector2.fromValues(e.x, e.y)});
			this.ecs.addEntity(entity);
		} );
		*/
	}

	test(entity) {
		return false;
	}
}

module.exports = Spawner;