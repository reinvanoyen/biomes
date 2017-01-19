"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Camera = require('../../engine/component/camera'),
	AI = require('../../engine/component/ai'),
	math = require('../../engine/util/math'),
	Vector2 = require('gl-matrix').vec2
;

class NPC extends ECS.Entity {

	constructor() {

		super( [
			Sprite,
			Position,
			Body,
			Collision,
			WalkingBehavior,
			AI
		] );

		this.updateComponent( 'position', { value: Vector2.fromValues( 0, -1000 ) } );
	}
}

module.exports = NPC;