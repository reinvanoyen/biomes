"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	WalkingBehavior = require('../../engine/component/walkingbehavior')
;

class NPC extends ECS.Entity {

	constructor() {

		super( 'npc', [
			Sprite,
			Position,
			Body,
			Collision,
			WalkingBehavior
		] );
	}
}

module.exports = NPC;