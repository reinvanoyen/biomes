"use strict";

const ECS = require('yagl-ecs'),
	MessageManager = require('../messaging/messagemanager'),
	Tree = require('../../app/assemblage/tree'),
	Vector2 = require('gl-matrix').vec2
;

class Spawner extends ECS.System {

	constructor(ecs) {

		super();
		this.ecs = ecs;

		MessageManager.addListener( 'world::spawnEntity', e => {

			let entity = new Tree( -1 );

			entity.updateComponent('position', {
				value: e.position
			} );

			this.ecs.addEntity(entity);
		} );
	}

	test(entity) {
		return false;
	}
}

module.exports = Spawner;