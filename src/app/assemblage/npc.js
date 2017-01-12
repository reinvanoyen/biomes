"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Camera = require('../../engine/component/camera'),
	AI = require('../../engine/component/ai'),
	Vector2 = require('tnt-vec2'),
	math = require('../../engine/util/math')
;

class NPC extends ECS.Entity {

	constructor() {

		super( 'npc', [
			Sprite,
			Position,
			Body,
			Collision,
			WalkingBehavior,
			AI,
			Camera
		] );

		this.updateComponent('body', {maxVelocity: new Vector2(math.randBetween(5, 15), 15)})
	}
}

module.exports = NPC;
